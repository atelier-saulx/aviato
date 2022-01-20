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

  await writeVersionToPackageJson(
    path.join(__dirname, "../package.json"),
    incrementedVersion
  );

  await writeVersionToPackageJson(
    path.join(__dirname, "../packages/ui/package.json"),
    incrementedVersion
  );

  await writeVersionToPackageJson(
    path.join(__dirname, "../packages/utils/package.json"),
    incrementedVersion
  );
}
