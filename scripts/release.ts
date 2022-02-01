import path from "path";
import simpleGit from "simple-git";
import open from "open";
import { Command } from "commander";
import githubRelease from "new-github-release-url";
import chalk from "chalk";
import { execa } from "execa";
import { prompt } from "enquirer";
import { publishAllPackagesInRepository } from "./publish-packages";
import { updatePackageVersionsInRepository } from "./update-versions";
import { getIncrementedVersion } from "./get-version";

// @ts-ignore
import packageJson from "../package.json";

const git = simpleGit();

const program = new Command();

export type ReleaseOptions = {
  tag: string;
  skipBuild: boolean;
  skipVersion: boolean;
  skipPublish: boolean;
  skipCommit: boolean;
};

const INCREMENT_TYPES: string[] = ["patch", "minor", "major"];

let targetReleaseType = "patch";

program
  .version("0.1.1")
  .argument("[release-type]", "Type of release", "patch")
  .option("-T, --tag <type>", "Release tag name", "latest")
  .option("-b, --skipBuild", "Skip building", false)
  .option("-V, --skipVersion", "Skip version increment step", false)
  .option("-p, --skipPublish", "Skip publish step", true)
  .option("-c, --skipCommit", "Skip commit step", false)
  .action((releaseType) => {
    if (!INCREMENT_TYPES.includes(releaseType)) {
      const errorMessage = `Incorrect release type: ${chalk.red(
        releaseType
      )}, it should be one of these values: ${INCREMENT_TYPES.join(", ")}`;

      console.error(errorMessage);
      process.exit(1);
    }

    targetReleaseType = releaseType;
  });

program.parse(process.argv);

const options: ReleaseOptions = program.opts();

(async () => {
  const status = await git.status();

  if (status.files.length !== 0) {
    console.error("Working tree is not clean");
    process.exit(1);
  }

  console.info(`\n  Releasing Aviato...`);
  console.info(`\n  Release type: ${chalk.blueBright(targetReleaseType)}`);

  const { tag, skipBuild, skipVersion, skipPublish, skipCommit } = options;

  let shouldTriggerBuild = Boolean(skipBuild) === false;
  let shouldIncrementVersion = Boolean(skipVersion) === false;
  let shouldPublishToNPM = Boolean(skipPublish) === false;
  let shouldCommitChanges = Boolean(skipCommit) === false;

  const printedOptions = {
    tag,
    shouldTriggerBuild,
    shouldIncrementVersion,
    shouldPublishToNPM,
    shouldCommitChanges,
  };

  console.info(`\n Options: %o \n`, printedOptions);

  await prompt({
    type: "confirm",
    name: "shouldRelease",
    message: "Confirm release?",
  }).then(({ shouldRelease }: any) => {
    if (!shouldRelease) {
      console.info("User aborted the release.");

      return process.exit(0);
    }
  });

  /**
   * Build project to ensure latest changes are present
   */
  if (shouldTriggerBuild) {
    try {
      await execa("yarn", ["build"], { stdio: "inherit" });
    } catch (error) {
      console.error("Release failed, error: ", error);
      process.exit(1);
    }
  }

  let targetVersion = packageJson.version;

  /**
   * Increment all packages in project
   */
  if (shouldIncrementVersion) {
    targetVersion = getIncrementedVersion({
      version: packageJson.version,
      type: targetReleaseType,
    });

    try {
      await updatePackageVersionsInRepository({
        version: targetVersion,
      });
    } catch (error) {
      console.error("Release failed, error: ", error);
      process.exit(1);
    }
  }

  console.info(`\n  Target version: ${chalk.greenBright(targetVersion)}`);

  /**
   * Publish all public packages in repository
   */
  if (shouldPublishToNPM) {
    await prompt({
      type: "confirm",
      name: "publishChangesToNPM",
      message: "Publish release to NPM?",
    }).then(async ({ publishChangesToNPM }: any) => {
      if (publishChangesToNPM) {
        await publishAllPackagesInRepository({
          version: targetVersion,
          tag,
        });

        console.info(`\n  Released version ${targetVersion} successfully! \n`);
      }
    });
  }

  /**
   * Stage and commit + push target version
   */
  if (shouldCommitChanges) {
    await prompt({
      type: "confirm",
      name: "commitChanges",
      message: "Commit changes to Git?",
    }).then(async ({ commitChanges }: any) => {
      if (commitChanges) {
        await git.add([
          path.join(__dirname, "../packages"),
          path.join(__dirname, "../apps"),
          path.join(__dirname, "../package.json"),
        ]);

        await git.commit(`[release] Version: ${targetVersion}`);
      }
    });

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

  console.info(`\n  Release process has finished. \n`);
})();

export function timeout(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
