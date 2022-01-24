import chalk from "chalk";

/**
 * Bump / incrememt version with patch, minor or major.
 *
 * @param version - input version, in the format of `{major}.{minor}.{patch}`
 * @param options - publish type - { major | minor | patch }
 * @returns string
 */
export function getIncrementedVersion({
  version,
  type,
}: {
  version: string;
  type: string;
}): string {
  const INCREMENT_TYPES: string[] = ["patch", "minor", "major"];

  if (!INCREMENT_TYPES.includes(type)) {
    const errorMessage = `Incorrect version type: ${chalk.red(
      type
    )}, it should be one of these values: ${INCREMENT_TYPES.join(", ")}`;

    console.error(errorMessage);

    process.exit(1);
  }

  const updateVersion = (raw: string): string => {
    const splitVersion = raw.split(".");

    if (type === "patch") {
      splitVersion[2] = (parseInt(splitVersion[2], 10) + 1).toString();
    }

    if (type === "minor") {
      splitVersion[1] = (parseInt(splitVersion[1], 10) + 1).toString();
      splitVersion[2] = "0";
    }

    if (type === "major") {
      splitVersion[0] = (parseInt(splitVersion[0], 10) + 1).toString();
      splitVersion[1] = "0";
      splitVersion[2] = "0";
    }

    return splitVersion.join(".");
  };

  try {
    return updateVersion(version);
  } catch (error) {
    console.error("Failed to update version");
    process.exit(1);
  }
}
