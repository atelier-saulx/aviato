import path from "path";
import simpleGit from "simple-git";
import open from "open";
import githubRelease from "new-github-release-url";
import chalk from "chalk";
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import { execa } from "execa";
import { prompt } from "enquirer";
import { publishAllPackagesInRepository } from "./publish-packages";
import { updatePackageVersionsInRepository } from "./update-versions";
import { FormatOptions, getIncrementedVersion, MapPrompts } from "./utilities";
import { Answers } from "types";

const packageJson = require("../package.json");

const git = simpleGit();

export type ReleaseOptions = {
  type: string;
  tag: string;
  skipBuild: boolean;
  skipVersion: boolean;
  skipPublish: boolean;
  skipCommit: boolean;
  force: boolean;
};

const { argv }: { argv: any } = yargs(hideBin(process.argv))
  .option("type", {
    type: "string",
    default: "patch",
    description: "Type",
  })
  .option("tag", {
    type: "string",
    default: "latest",
    description: "Tag",
  })
  .option("skip-build", {
    type: "boolean",
    default: false,
    description: "Skip build step.",
  })
  .option("skip-version", {
    type: "boolean",
    default: false,
    description: "Skip version increment step.",
  })
  .option("skip-publish", {
    type: "boolean",
    default: false,
    description: "Skip publish step.",
  })
  .option("skip-commit", {
    type: "boolean",
    default: false,
    description: "Skip commit step.",
  })
  .option("force", {
    type: "boolean",
    default: false,
    description: "Force release.",
  })
  .example([
    ["$0 minor", "Release minor update."],
    ["$0 --type minor", "Release minor update."],
    ["$0 --tag latest", "Release patch with latest tag."],
    ["$0 --skip-build", "Skip building packages."],
    ["$0 --skip-publish", "Skip publishing packages."],
    ["$0 --skip-version", "Skip incrementing package versions."],
    ["$0 --skip-commit", "Skip committing changes to Git."],
    ["$0 --force", "Do not prompt while releasing."],
  ]);

const getBranch = async () => {
  const currentBranch = await git.raw("rev-parse", "--abbrev-ref", "HEAD");
  return currentBranch.trim();
};

async function releaseProject() {
  const currentBranch = await getBranch();
  if (currentBranch !== "main") {
    throw `Incorrect branch: ${currentBranch}. We only release from main branch.`;
  }

  const status = await git.status();
  if (status.files.length !== 0) {
    throw "You have unstaged changes in git. To release, commit or stash all changes.";
  }

  const {
    type,
    tag: releaseTag,
    skipBuild,
    skipVersion,
    skipPublish,
    skipCommit,
    force,
  } = argv as ReleaseOptions;

  const inputType = argv._[0] ?? type;
  const releaseType = validateReleaseType(inputType);
  let targetVersion = packageJson.version;

  const incrementedVersion = getIncrementedVersion({
    version: packageJson.version,
    type: releaseType,
  });

  let shouldTriggerBuild = Boolean(skipBuild) === false;
  let shouldIncrementVersion = Boolean(skipVersion) === false;
  let shouldPublishChanges = Boolean(skipPublish) === false;
  let shouldCommitChanges = Boolean(skipCommit) === false;
  let shouldShowQuestions = Boolean(force) === true;

  const printedOptions = {
    releaseType,
    releaseTag,
    shouldTriggerBuild,
    shouldIncrementVersion,
    shouldPublishChanges,
    shouldCommitChanges,
    currentVersion: packageJson.version,
    incrementedVersion,
  };

  console.info(`\n  Releasing Aviato...`);
  console.info(`\n  ${chalk.bold("[ Release Options ]")} \n`);

  FormatOptions(printedOptions).forEach(([message, value]) => {
    console.info(`  ${chalk.white(message)}: ${chalk.bold.yellow(value)}`);
  });

  console.info(`\n`);

  /**
   * Escape hatch: Do you want to cancel this release?
   */
  await prompt<{
    shouldRelease: boolean;
  }>({
    message: "Proceed to release?",
    name: "shouldRelease",
    type: "confirm",
    initial: true,
  }).then(({ shouldRelease }) => {
    if (!shouldRelease) {
      console.info("User aborted the release.");
      process.exit(0);
    }
  });

  /**
   * Escape hatch: Do you want interactivity?
   */
  await prompt<{
    makeInteractive: boolean;
  }>({
    message: "Make release interactive?",
    name: "makeInteractive",
    type: "confirm",
    initial: true,
  }).then(({ makeInteractive }) => {
    shouldShowQuestions = makeInteractive;
  });

  /**
   * Configure release interactively. Ignore by using `yarn release --force`
   */
  if (shouldShowQuestions) {
    const Questions = MapPrompts({
      triggerBuild: "Trigger full project build?",
      incrementVersion: `Increment project version from ${packageJson.version} to ${incrementedVersion}?`,
      publishChangesToNPM: "Publish release to NPM?",
      commitChanges: "Commit changes to Git?",
    });

    await prompt<Answers>(Questions).then((answers) => {
      const {
        triggerBuild,
        incrementVersion,
        publishChangesToNPM,
        commitChanges,
      } = answers;

      shouldTriggerBuild = triggerBuild;
      shouldIncrementVersion = incrementVersion;
      shouldPublishChanges = publishChangesToNPM;
      shouldCommitChanges = commitChanges;
    });
  }

  /**
   * Build project to ensure latest changes are present
   */
  if (shouldTriggerBuild) {
    try {
      await execa("yarn", ["build"], { stdio: "inherit" });
    } catch (error) {
      throw "Error encountered when building project.";
    }
  }

  /**
   * Increment all packages in project
   */
  if (shouldIncrementVersion) {
    targetVersion = incrementedVersion;

    try {
      await updatePackageVersionsInRepository({
        version: targetVersion,
      });
    } catch (error) {
      throw "There was an error updating package versions";
    }
  }

  /**
   * Publish all public packages in repository
   */
  if (shouldPublishChanges) {
    await publishAllPackagesInRepository({
      version: targetVersion,
      tag: releaseTag,
    }).catch(() => {
      throw "Publishing to NPM failed.";
    });

    console.info(`\n  Released version ${targetVersion} successfully! \n`);
  }

  /**
   * Stage and commit + push target version
   */
  if (shouldCommitChanges) {
    await git.add([
      path.join(__dirname, "../packages"),
      path.join(__dirname, "../apps"),
      path.join(__dirname, "../package.json"),
    ]);

    await git.commit(`[release] Version: ${targetVersion}`);

    await git.push();

    await git.addAnnotatedTag(
      targetVersion,
      `[release] Version: ${targetVersion}`
    );

    /**
     * Open up a browser tab within github to publish new release
     */
    open(
      githubRelease({
        user: "atelier-saulx",
        repo: "aviato-ui",
        tag: targetVersion,
        title: targetVersion,
      })
    );
  }

  console.info(`\n  The release process has finished. \n`);
}

(async () => {
  try {
    await releaseProject();
  } catch (error) {
    console.error("Release failed. Error: %o. \n", getErrorMessage(error));
    return process.exit(1);
  }
})();

function validateReleaseType(input: string): string {
  const INCREMENT_TYPES: string[] = ["patch", "minor", "major"];
  if (!INCREMENT_TYPES.includes(input)) {
    const errorMessage = `Incorrect release type: ${chalk.red(
      input
    )}, it should be one of these values: ${INCREMENT_TYPES.join(", ")}`;

    console.error(errorMessage);
    throw "Invalid release arguments";
  }

  return input;
}

function getErrorMessage(input: any) {
  const fallbackMessage = "Unknown error";
  const rootMessage = input?.message ?? input ?? "";
  const errorMessage = rootMessage !== "" ? rootMessage : fallbackMessage;
  return errorMessage;
}
