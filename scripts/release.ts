import path from "path";
import simpleGit from "simple-git";
import open from "open";
import yargs from "yargs/yargs";
import githubRelease from "new-github-release-url";
import { hideBin } from "yargs/helpers";
import { execa } from "execa";
import { publishAllPackagesInRepository } from "./publish-packages";
import { updatePackageVersionsInRepository } from "./update-versions";
import { getIncrementedVersion } from "./get-version";

// @ts-ignore
import packageJson from "../package.json";

const git = simpleGit();

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
  .example([
    ["$0 --skip-build", "Skip building packages."],
    ["$0 minor", "Release minor update."],
    ["$0 --type minor", "Release minor update."],
    ["$0 --tag latest", "Release patch with latest tag."],
  ]);

(async () => {
  const status = await git.status();

  if (status.files.length !== 0) {
    console.error("Working tree is not clean");
    process.exit(1);
  }

  const {
    type,
    tag,
    skipBuild,
    skipVersion: skipVersionIncrement,
    skipPublish,
    skipCommit,
  } = argv;

  const releaseType = argv._[0] ?? type;

  console.info(`\n  Releasing packages! \n`);

  /**
   * Build project to ensure latest changes are present
   */
  if (!skipBuild) {
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
  if (!skipVersionIncrement) {
    targetVersion = getIncrementedVersion({
      version: packageJson.version,
      type: releaseType,
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
  if (!skipPublish) {
    await publishAllPackagesInRepository({
      version: targetVersion,
      tag,
    });
  }

  /**
   * Stage and commit + push target version
   */
  if (!skipCommit) {
    await git.add([
      path.join(__dirname, "../packages"),
      path.join(__dirname, "../apps"),
      path.join(__dirname, "../package.json"),
    ]);

    await git.commit(`[release] Version: ${targetVersion}`);
  }

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

  console.info(`\n  Released version ${targetVersion} successfully! \n`);
})();
