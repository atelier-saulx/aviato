import path from "path";
import generateDts from "./generate-dts";

async function generateTypes() {
  const packagePath = path.resolve(process.env.PWD || "");
  await generateDts(packagePath);
}

(() => {
  generateTypes();
})();
