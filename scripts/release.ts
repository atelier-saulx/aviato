import path from "path";
import simpleGit from "simple-git";
import open from "open";
import yargs from "yargs/yargs";
import githubRelease from "new-github-release-url";
import { hideBin } from "yargs/helpers";
import { execa } from "execa";
import { publishAllPackages } from "./publish-packages";
import { updateAllPackageVersions } from "./update-versions";
import packageJson from "../package.json";
import { getIncrementedVersion } from "./get-version";

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
  .example([
    ["$0 minor", "Release minor update"],
    ["$0 --type minor", "Release minor update."],
    ["$0 --tag latest", "Release patch with latest tag."],
  ]);

(async () => {
  const status = await git.status();

  // if (status.files.length !== 0) {
  //   console.error("Working tree is not clean");
  //   process.exit(1);
  // }

  const { type, tag } = argv;

  console.info(`Releasing packages \n`);

  try {
    await execa("yarn", ["build"], { stdio: "inherit" });
  } catch (error) {
    console.error("Build failed - error: ", error);
    process.exit(1);
  }

  const releaseType = argv._[0] ?? type;
  const incrementedVersion = getIncrementedVersion(packageJson.version, {
    type: releaseType,
  });

  try {
    await updateAllPackageVersions(incrementedVersion);
  } catch (error) {
    console.error("Build failed - error: ", error);
    process.exit(1);
  }

  await publishAllPackages(tag);

  await git.add([
    path.join(__dirname, "../packages"),
    path.join(__dirname, "../package.json"),
  ]);

  // await git.commit(`[release] Version: ${incrementedVersion}`);

  open(
    githubRelease({
      user: "atelier-saulx",
      repo: "aviato-ui",
      tag: incrementedVersion,
      title: incrementedVersion,
    })
  );

  console.info(`\n  Released successfully! \n`);
})();
