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
import { Answers, ReleaseType } from "types";
import {
  FormatOptions,
  getIncrementedVersion,
  MapPrompts,
  validateReleaseType,
} from "./utilities";

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
  dryRun: boolean;
};

const { argv }: { argv: any } = yargs(hideBin(process.argv))
  .option("type", {
    type: "string",
    default: "patch",
    description: "Type <patch|minor|major>",
  })
  .option("tag", {
    type: "string",
    default: "latest",
    description: "Release tag",
  })
  .option("skip-build", {
    type: "boolean",
    default: false,
    description: "Skip build step",
  })
  .option("skip-version", {
    type: "boolean",
    default: false,
    description: "Skip version increment step",
  })
  .option("skip-publish", {
    type: "boolean",
    default: false,
    description: "Skip publish step",
  })
  .option("skip-commit", {
    type: "boolean",
    default: false,
    description: "Skip commit step",
  })
  .option("force", {
    type: "boolean",
    default: false,
    description: "Ignore interactivity",
  })
  .option("dry-run", {
    type: "boolean",
    default: false,
    description: "Dry-run release",
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
    ["$0 --dry-run", "Only build, do nothing else."],
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
    force: hideInteractivity,
    dryRun: isDryRun,
  } = argv as ReleaseOptions;

  const inputType = argv._[0] ?? type;
  let releaseType = validateReleaseType(inputType);
  let targetVersion = packageJson.version;

  let incrementedVersion = getIncrementedVersion({
    version: packageJson.version,
    type: releaseType,
  });

  let shouldTriggerBuild = Boolean(skipBuild) === false;
  let shouldIncrementVersion = Boolean(skipVersion) === false;
  let shouldPublishChanges = Boolean(skipPublish) === false;
  let shouldCommitChanges = Boolean(skipCommit) === false;
  let shouldShowQuestions = hideInteractivity === false;

  console.info(`\n  Releasing Aviato...`);

  const printReleaseOptions = () => {
    const printedOptions = {
      releaseType: shouldIncrementVersion ? releaseType : "override",
      releaseTag,
      triggerBuild: shouldTriggerBuild,
      incrementVersion: shouldIncrementVersion,
      publishChanges: shouldPublishChanges,
      commitChanges: shouldCommitChanges,
      currentVersion: packageJson.version,
      targetVersion: shouldIncrementVersion
        ? incrementedVersion
        : packageJson.version,
    };

    console.info(`\n  ${chalk.bold("[ Release Options ]")} \n`);
    FormatOptions(printedOptions).forEach(([message, value]) => {
      console.info(`  ${chalk.white(message)}: ${chalk.bold.yellow(value)}`);
    });
    console.info(`\n`);
  };

  /**
   * Escape hatch: Do you want interactivity?
   */
  if (shouldShowQuestions) {
    await prompt<{
      makeInteractive: boolean;
    }>({
      message: "Configure release options?",
      name: "makeInteractive",
      type: "toggle",
      initial: true,
      enabled: "Yes",
      disabled: "No",
    } as any).then(({ makeInteractive }) => {
      shouldShowQuestions = makeInteractive;
    });
  }

  /**
   * Configure release interactively. Ignore by using `yarn release --force`
   */
  if (shouldShowQuestions) {
    await prompt<{ chosenReleaseType: ReleaseType }>([
      {
        type: "select",
        name: "chosenReleaseType",
        message: "Select release type",
        initial: 0,
        choices: [
          { name: "patch", message: "Patch" },
          { name: "minor", message: "Minor" },
          { name: "major", message: "Major" },
        ],
      },
    ]).then(({ chosenReleaseType }) => {
      releaseType = chosenReleaseType;

      incrementedVersion = getIncrementedVersion({
        version: packageJson.version,
        type: releaseType,
      });
    });

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

    printReleaseOptions();
  } else {
    printReleaseOptions();
  }

  await prompt<{
    shouldRelease: boolean;
  }>({
    message: "Do you want to to release?",
    name: "shouldRelease",
    type: "toggle",
    initial: true,
    enabled: "Yes",
    disabled: "No",
  } as any).then(({ shouldRelease }) => {
    if (!shouldRelease) {
      console.info("User aborted the release.");
      process.exit(0);
    }
  });

  /**
   * Build project to ensure latest changes are present
   */
  if (shouldTriggerBuild) {
    try {
      await execa("yarn", ["build"], { stdio: "inherit" });
    } catch (error) {
      console.log(error);
      throw "Error encountered when building project.";
    }
  }

  if (isDryRun) {
    console.info("Aborted. This was a dry run release.");
    process.exit(0);
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

function getErrorMessage(input: any) {
  const fallbackMessage = "Unknown error";
  const rootMessage = input?.message ?? input ?? "";
  const errorMessage = rootMessage !== "" ? rootMessage : fallbackMessage;
  return errorMessage;
}
