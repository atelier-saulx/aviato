import path from "path";
import chalk from "chalk";
import fs from "fs-extra";
import { execa } from "execa";

export async function publishAllPackages(
  tag: string,
  incrementedVersion: string
) {
  /**
   * Publish all public packages
   */
  const packages = path.join(__dirname, "../packages");

  const packageFolders = (await fs.readdir(packages)).filter((folder) => {
    return fs.pathExistsSync(path.join(packages, folder, "/package.json"));
  });

  await Promise.all(
    packageFolders.map(async (folder) => {
      const packageJson = await fs.readJSON(
        path.join(packages, folder, "/package.json")
      );

      if (packageJson.private) {
        return console.log(
          `- Private package ${chalk.cyan(packageJson.name)} was skipped`
        );
      }

      await publishPackage({
        path: path.join(packages, folder),
        name: packageJson.name,
        version: incrementedVersion,
        tag,
      });
    })
  );

  /**
   * Publish all public apps
   */
  const apps = path.join(__dirname, "../apps");

  const appFolders = (await fs.readdir(apps)).filter((folder) => {
    return fs.pathExistsSync(path.join(apps, folder, "/package.json"));
  });

  await Promise.all(
    appFolders.map(async (folder) => {
      const packageJson = await fs.readJSON(
        path.join(apps, folder, "/package.json")
      );

      if (packageJson.private) {
        return console.log(
          `- Private package ${chalk.cyan(packageJson.name)} was skipped`
        );
      }

      await publishPackage({
        path: path.join(apps, folder),
        name: packageJson.name,
        version: incrementedVersion,
        tag,
      });
    })
  );
}

export async function publishPackage({
  path,
  name,
  version,
  tag,
}: {
  path: string;
  name: string;
  version: string;
  tag: string;
}) {
  try {
    await execa("npm", ["publish", path, "--access", "public", "--tag", tag], {
      stdio: "inherit",
      cwd: path,
    });

    console.log(`- Package ${chalk.cyan(name)} was published`);
  } catch (error) {
    console.error(`Failed to publish package ${chalk.red(name)}`);
    process.stdout.write(chalk.red`${error.message}\n`);
    process.exit(1);
  }
}
