import path from "path";
import simpleGit from "simple-git";
import open from "open";
import { Command } from "commander";
import githubRelease from "new-github-release-url";
import chalk from "chalk";
import { execa } from "execa";
import { publishAllPackagesInRepository } from "./publish-packages";
import { updatePackageVersionsInRepository } from "./update-versions";
import { getIncrementedVersion } from "./get-version";

// @ts-ignore
import packageJson from "../package.json";

const git = simpleGit();

const program = new Command();

export type ReleaseOptions = {
  tag: string;
  build: boolean;
  version: boolean;
  publish: boolean;
  commit: boolean;
};

const INCREMENT_TYPES: string[] = ["patch", "minor", "major"];

let targetReleaseType = "patch";

program
  .version("0.1.0")
  .argument("[release-type]", "Type of release", "patch")
  .option("-T, --tag <type>", "Release tag name", "latest")
  .option("-b, --no-build", "Skip building")
  .option("-V, --no-version", "Skip version increment step")
  .option("-p, --no-publish", "Skip publish step")
  .option("-c, --no-commit", "Skip commit step")
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

  // if (status.files.length !== 0) {
  //   console.error("Working tree is not clean");
  //   process.exit(1);
  // }

  console.info(`\n  Releasing Aviato...`);
  console.info(`\n  Release type: ${chalk.blueBright(targetReleaseType)}`);

  await timeout(1000);

  const {
    tag,
    build: createBuild = true,
    version: incrementVersion = true,
    publish: publishChanges = true,
    commit: commitChanges = true,
  } = options;

  console.info("\n Options: ", {
    createBuild,
    incrementVersion,
    publishChanges,
    commitChanges,
  });

  /**
   * Build project to ensure latest changes are present
   */
  if (createBuild) {
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
  console.log(">>>>>> incrementVersion: ", incrementVersion);
  if (incrementVersion) {
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
  if (publishChanges) {
    await publishAllPackagesInRepository({
      version: targetVersion,
      tag,
    });

    console.info(`\n  Released version ${targetVersion} successfully! \n`);
  }

  /**
   * Stage and commit + push target version
   */
  if (commitChanges) {
    await git.add([
      path.join(__dirname, "../packages"),
      path.join(__dirname, "../apps"),
      path.join(__dirname, "../package.json"),
    ]);

    await git.commit(`[release] Version: ${targetVersion}`);

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

function timeout(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
