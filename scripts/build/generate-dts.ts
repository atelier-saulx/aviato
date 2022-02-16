import fg from "fast-glob";
import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import { execa } from "execa";

export default async function generateDts(packagePath: string) {
  console.info("Generating types...");

  const startTime = Date.now();

  const packageJsonPath = path.join(packagePath, "/package.json");
  const packageJson = await fs.readJSON(packageJsonPath);
  const packageName = packageJson.name;

  await execa(
    "yarn",
    [
      "tsc",
      "--project",
      "tsconfig.build.json",
      "--declaration",
      "--emitDeclarationOnly",
      "--outDir",
      "./dist/types.d",
    ],
    {
      cwd: packagePath,
    }
  );

  const files = await fg(["lib/**/*.js"], { cwd: packagePath });

  await Promise.all(
    files.map((file) => fs.remove(path.join(packagePath, file)))
  );

  console.info(
    `Types for ${chalk.cyan(packageName)} were created in ${chalk.green(
      `${((Date.now() - startTime) / 1000).toFixed(2)}s`
    )}`
  );
}
