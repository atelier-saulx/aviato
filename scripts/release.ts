import path from "path";
import simpleGit from "simple-git";
import open from "open";
import { Command } from "commander";
import githubRelease from "new-github-release-url";
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
  .option("-b, --no-build", "Skip building", false)
  .option("-v, --no-version", "Skip version increment step", false)
  .option("-p, --no-publish", "Skip publish step", false)
  .option("-c, --no-commit", "Skip commit step", false)
  .action((releaseType) => {
    if (INCREMENT_TYPES.includes(releaseType)) {
      targetReleaseType = releaseType;
    }
  });

program.parse(process.argv);

const options: ReleaseOptions = program.opts();

(async () => {
  const status = await git.status();

  if (status.files.length !== 0) {
    console.error("Working tree is not clean");
    process.exit(1);
  }

  const {
    tag,
    build: createBuild,
    version: incrementVersion,
    publish: publishChanges,
    commit: commitChanges,
  } = options;

  console.info(`\n  Releasing packages! \n`);

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
})();
