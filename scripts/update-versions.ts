import path from "path";
import fs from "fs-extra";

async function writeVersionToPackageJson(filePath: string, version: string) {
  const packageJson = await fs.readJSON(filePath);

  packageJson.version = version;

  await fs.writeJSON(filePath, packageJson, { spaces: 2 });
}

export async function updateAllPackageVersions(version: string) {
  /**
   * Update package versions
   */
  const packages = path.join(__dirname, "../packages");

  const packageFolders = (await fs.readdir(packages)).filter((folder) => {
    return fs.pathExistsSync(path.join(packages, folder, "/package.json"));
  });

  await Promise.all(
    packageFolders.map((folder) =>
      writeVersionToPackageJson(
        path.join(packages, folder, "/package.json"),
        version
      )
    )
  );

  /**
   * Update app versions
   */
  const apps = path.join(__dirname, "../apps");

  const appFolders = (await fs.readdir(apps)).filter((folder) => {
    return fs.pathExistsSync(path.join(apps, folder, "/package.json"));
  });

  await Promise.all(
    appFolders.map((folder) =>
      writeVersionToPackageJson(
        path.join(apps, folder, "/package.json"),
        version
      )
    )
  );

  /**
   * Update root package version
   */
  await writeVersionToPackageJson(
    path.join(__dirname, "../package.json"),
    version
  );
}
