import fs from "fs-extra";
import chalk from "chalk";
import path from "path";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import { build, Options } from "tsup";
import { getDirectories } from "../utilities";
import { generateDts } from "./generate-dts";

const { argv }: { argv: any } = yargs(hideBin(process.argv))
  .option("watch", {
    type: "boolean",
    default: false,
    description: "Is user watching?",
  })
  .example([["$0 --watch", "User is watching."]]);

export type BuildOptions = {
  watch: boolean;
};

const { watch } = argv as BuildOptions;

const generateDTS = async () => {
  const packagePath = path.resolve(process.env.PWD || "");
  await generateDts(packagePath);
};

/**
 * Not yet working, figure out why...
 */
const dtsAviatoPlugin = {
  name: "dtsAviatoPlugin",

  setup(build) {
    build.onEnd((result) => {
      process.stdout.write(`Build ended with ${result.errors.length} errors`);
    });
  },

  // buildStart: async () => {
  //   await generateDTS();
  // },
};

async function buildPackage({ isWatching = false }: { isWatching?: boolean }) {
  const packagePath = path.resolve(process.env.PWD || "");
  const packageJsonPath = path.join(packagePath, "/package.json");

  const packageJson = await fs.readJSON(packageJsonPath);
  const packageName = packageJson.name;

  console.info(`Building package ${chalk.cyan(packageName)}`);

  console.log("Version 1");

  if (!isWatching) {
    const distPath = path.join(packagePath, "dist");
    await fs.emptyDir(distPath);
    await cleanupDistFolder(distPath);
  }

  try {
    const startTime = Date.now();

    const entryFile = path.resolve(packagePath, "src", "index.ts");

    const buildOptions: Options = {
      platform: "browser",
      entry: [entryFile],
      format: ["esm", "cjs", "iife"],
      clean: !isWatching,
      splitting: true,
      sourcemap: isWatching,
      minify: !isWatching,
      external: ["react"],
      watch: isWatching,
      onSuccess: "esno ../../scripts/exec types packages/utils",
      dts: false,
      plugins: [dtsAviatoPlugin],
      env: {
        NODE_ENV: isWatching ? "development" : "production",
      },
    };

    await build(buildOptions);

    console.info(
      `Package ${chalk.cyan(packageName)} was built in ${chalk.green(
        `${((Date.now() - startTime) / 1000).toFixed(2)}s`
      )}`
    );
  } catch (error: any) {
    console.error(`Failed to compile package: ${chalk.cyan(packageName)}`);
    process.stdout.write(`${error.toString("minimal")}\n`);
    process.exit(1);
  }
}

async function cleanupDistFolder(distPath: string) {
  if (!fs.existsSync(distPath)) {
    return await fs.mkdir(distPath, { recursive: true });
  }

  const dirsInFolder = await getDirectories(`${distPath}/`);

  const emptyDirPromises = dirsInFolder.map((directory) => {
    const directoryPath = path.resolve(distPath, directory);
    return fs.emptyDir(directoryPath);
  });

  await Promise.all(emptyDirPromises);
}

(() => {
  buildPackage({ isWatching: watch });
})();
