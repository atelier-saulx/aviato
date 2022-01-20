import path from "path";
import fs from "fs-extra";
import { getIncrementedVersion } from "./get-version";

async function writeVersionToPackageJson(filePath: string, version: string) {
  const current = await fs.readJSON(filePath);

  current.version = version;

  await fs.writeJSON(filePath, current, { spaces: 2 });
}

export async function setPackagesVersion(
  version: string,
  type: "patch" | "minor" | "major"
) {
  const incrementedVersion = getIncrementedVersion(version, {
    type,
  });

  const src = path.join(__dirname, "../packages");

  const folders = (await fs.readdir(src)).filter((folder) => {
    return fs.pathExistsSync(path.join(src, folder, "/package.json"));
  });

  await Promise.all(
    folders.map((folder) =>
      writeVersionToPackageJson(
        path.join(src, folder, "/package.json"),
        incrementedVersion
      )
    )
  );

  await writeVersionToPackageJson(
    path.join(__dirname, "../package.json"),
    incrementedVersion
  );
}
