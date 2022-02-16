/* eslint-disable no-console */

import path from "path";
import { execa } from "execa";
import chalk from "chalk";
import fs from "fs-extra";

const packagePath = path.resolve(process.env.PWD || "");
const packageJsonPath = path.join(packagePath, "/package.json");

const packageJson = fs.readJSONSync(packageJsonPath);
const packageName = packageJson.name;

const logInfo = console.log.bind(console);
const logError = console.error.bind(console);

const triggerBuild = () => {
  execa("esno", ["../../scripts/build/build", "--watch"], {
    stdio: "inherit",
    cwd: packagePath,
  }).catch((error) => {
    logError("Something went wrong: ", error);
  });
};

logInfo(`Started up watcher in ${chalk.green(packageName)}`);

triggerBuild();
