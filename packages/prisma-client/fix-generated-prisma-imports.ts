import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.resolve(__dirname, "./dist");

function fixImports(filePath: string) {
  let content = fs.readFileSync(filePath, "utf8");

  if (filePath.endsWith(".cjs")) {
    content = content.replace('require("generated/prisma")', 'require("./generated/prisma")');
  } else {
    // We need to use a Regex here because index.d.ts uses single-quotes whereas index.js uses double-quotes. Because who needs consistency, am I right?
    content = content.replace(/from ['"]generated\/prisma['"]/g, 'from "./generated/prisma"');
  }

  fs.writeFileSync(filePath, content);
}

function walk(dir: string) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      walk(fullPath);
    } else if (
      fullPath.endsWith(".d.ts") ||
      fullPath.endsWith(".d.cts") ||
      fullPath.endsWith(".js") ||
      fullPath.endsWith(".cjs")
    ) {
      fixImports(fullPath);
    }
  }
}

walk(distDir);
