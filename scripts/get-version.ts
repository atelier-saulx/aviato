import chalk from "chalk";

const VERSION_INCREMENT: string[] = ["patch", "minor", "major"];

export function getIncrementedVersion(
  version: string,
  options: { type: string }
): string {
  const { type } = options;

  if (!VERSION_INCREMENT.includes(options.type)) {
    console.error(
      `Incorrect version type: ${chalk.red(
        options.type
      )}, it should be one of these values: ${VERSION_INCREMENT.join(", ")}`
    );

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
    console.error("Failed to parse core package.json");
    process.exit(1);
  }
}
