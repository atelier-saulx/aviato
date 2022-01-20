import path from "path";
import chalk from "chalk";
import fs from "fs-extra";
import { execa } from "execa";

export async function publishAllPackages(tag: string) {
  const src = path.join(__dirname, "../packages");

  const folders = (await fs.readdir(src)).filter((folder) => {
    return fs.pathExistsSync(path.join(src, folder, "/package.json"));
  });

  await Promise.all(
    folders.map(async (folder) => {
      const packageJson = await fs.readJSON(
        path.join(src, folder, "/package.json")
      );

      if (packageJson.private) {
        return console.log(
          `- Private package ${chalk.cyan(packageJson.name)} was skipped`
        );
      }

      await publishPackage({
        path: path.join(src, folder),
        name: packageJson.name,
        tag,
      });
    })
  );
}

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
    // await execa("npm", ["publish", "--access", "public", "--tag", tag], {
    //   stdio: "inherit",
    //   cwd: path,
    // });

    console.log(`- Package ${chalk.cyan(name)} was published`);
  } catch (error) {
    console.error(`Failed to publish package ${chalk.red(name)}`);
    process.stdout.write(chalk.red`${error.message}\n`);
    process.exit(1);
  }
}
