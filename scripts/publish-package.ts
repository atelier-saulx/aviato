import chalk from "chalk";
import { execa } from "execa";

export async function publishPackage({
  path,
  name,
  tag,
}: {
  path: string;
  name: string;
  tag: string;
}) {
  try {
    // await (execa as any)("npm", ["publish", path, "--tag", tag]);
    // await execa("yarn", ["release"]);

    console.log(`Package ${chalk.cyan(name)} was published`);
  } catch (error) {
    console.error(`Failed to publish package ${chalk.red(name)}`);
    process.stdout.write(chalk.red`${error.message}\n`);
    process.exit(1);
  }
}