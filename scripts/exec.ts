import path from "path";
import fs from "fs-extra";
import process from "process";
import { execa } from "execa";

const args = process.argv.slice(2);

const targetCommand = args[0] || "none";
const targetProject = args[1] || "none";

async function exec() {
  const isMissingCommand = targetCommand === "none";
  if (isMissingCommand) {
    console.log("Missing command.");
    return process.exit(1);
  }

  const isMissingProject = targetProject === "none";
  if (isMissingProject) {
    console.log("Missing target project.");
    return process.exit(1);
  }

  const scriptPath = process.argv[1];
  const rootPath = path.resolve(scriptPath, "../../");
  const projectPath = path.resolve(rootPath, targetProject);

  const folderExists = fs.existsSync(projectPath);
  if (!folderExists) {
    console.log("Folder does not exist: ", projectPath);
    return process.exit(1);
  }

  const commandPath = path.resolve(
    rootPath,
    "scripts",
    "build",
    `${targetCommand}.ts`
  );

  const commandExists = fs.existsSync(commandPath);
  if (!commandExists) {
    console.log("Command does not exist: ", targetCommand);
    return process.exit(1);
  }

  execa("esno", [`../../scripts/build/${targetCommand}`], {
    stdio: "inherit",
  }).catch((error) => {
    console.error("Something went wrong: ", error);
  });
}

(() => {
  exec();
})();
