import { readdirSync, readFileSync, statSync, writeFileSync } from "fs";
import path from "path";

function disableTscInDirectory(directory: string): void {
  const files = readdirSync(directory);

  for (const file of files) {
    const fullPath = path.join(directory, file);
    if (statSync(fullPath).isDirectory()) {
      disableTscInDirectory(fullPath);
    } else if (file.endsWith(".ts")) {
      const content = readFileSync(fullPath, "utf8");
      if (!content.startsWith("// @ts-nocheck")) {
        writeFileSync(fullPath, `// @ts-nocheck\n${content}`, "utf8");
      }
    }
  }
}

export default disableTscInDirectory;
