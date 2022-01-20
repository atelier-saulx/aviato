import path from "path";
import simpleGit from "simple-git";
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import { execa } from "execa";
import { publishPackage } from "./publish-package";
import { setPackagesVersion } from "./update-version";
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
  .example([["$0 --type minor --tag latest", "Release with latest tag."]]);

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

  try {
    const releaseType = argv._[0] ?? type;
    await setPackagesVersion(packageJson.version, releaseType);
  } catch (error) {
    console.error("Build failed - error: ", error);
    process.exit(1);
  }

  await publishPackage({
    path: path.join(__dirname, "../packages/ui"),
    name: "@aviato/ui",
    tag,
  });

  await publishPackage({
    path: path.join(__dirname, "../packages/utils"),
    name: "@aviato/utils",
    tag,
  });

  await git.add([path.join(__dirname, "../packages")]);

  console.info(`\n  Released successfully! \n`);
})();
