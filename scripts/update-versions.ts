import path from "path";
import fs from "fs-extra";

async function writeVersionToPackageJson(filePath: string, version: string) {
  const packageJson = await fs.readJSON(filePath);

  packageJson.version = version;

  await fs.writeJSON(filePath, packageJson, { spaces: 2 });
}

export async function updateAllPackageVersions(version: string) {
  const src = path.join(__dirname, "../packages");

  const folders = (await fs.readdir(src)).filter((folder) => {
    return fs.pathExistsSync(path.join(src, folder, "/package.json"));
  });

  await Promise.all(
    folders.map((folder) =>
      writeVersionToPackageJson(
        path.join(src, folder, "/package.json"),
        version
      )
    )
  );

  await writeVersionToPackageJson(
    path.join(__dirname, "../package.json"),
    version
  );
}
