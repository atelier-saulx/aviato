import path from "path";
import simpleGit from "simple-git";
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import { execa } from "execa";
import { publishPackage } from "./publish-package";

const git = simpleGit();

const { argv }: { argv: any } = yargs(hideBin(process.argv))
  .option("tag", {
    type: "string",
    default: "latest",
    description: "Tag",
  })
  .example([["$0 minor --tag latest", "Release with latest tag."]]);

(async () => {
  const status = await git.status();

  const { tag } = argv;

  // if (status.files.length !== 0) {
  //   console.error("Working tree is not clean");
  //   process.exit(1);
  // }

  console.info(`Releasing packages \n`);

  try {
    await execa("yarn", ["build"], { stdio: "inherit" });
  } catch (error) {
    console.error("Build failed");
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

  console.info(`Released successfully! \n`);
})();
