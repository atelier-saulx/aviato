import fs from "fs-extra";
import chalk from "chalk";
import path from "path";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import compile from "./compile";
import generateDts from "./generate-dts";

import { createPackageConfig } from "./create-package-config";
import { getDirectories } from "../utilities";

const { argv }: { argv: any } = yargs(hideBin(process.argv))
  .option("is-watching", {
    type: "boolean",
    default: false,
    description: "Is user watching?",
  })
  .example([["$0 --is-watching", "User is watching."]]);

export type BuildOptions = {
  isWatching: boolean;
};

const { isWatching } = argv as BuildOptions;

async function buildPackage({ isWatching = false }: { isWatching?: boolean }) {
  const packagePath = path.resolve(process.env.PWD || "");
  const packageJsonPath = path.join(packagePath, "/package.json");

  const packageJson = await fs.readJSON(packageJsonPath);
  const packageName = packageJson.name;

  console.info(`Building package ${chalk.cyan(packageName)}`);

  if (!isWatching) {
    const distPath = path.join(packagePath, "dist");
    await cleanupDistFolder(distPath);
  }

  try {
    const startTime = Date.now();

    const targetFormats = ["es", "cjs"];

    for (const format of targetFormats) {
      const configOptions: any = {
        basePath: packagePath,
        format,
      };

      const config = await createPackageConfig(configOptions);

      console.info(`Building to ${chalk.cyan(format)} format...`);

      await compile(config);
    }

    await generateDts(packagePath);

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
    await fs.mkdir(distPath, { recursive: true });
  } else {
    const dirsInFolder = await getDirectories(`${distPath}/`);

    const emptyDirPromises = dirsInFolder.map((directory) => {
      const directoryPath = path.resolve(distPath, directory);
      return fs.emptyDir(directoryPath);
    });

    await Promise.all(emptyDirPromises);
  }
}

(() => {
  buildPackage({ isWatching });
})();
