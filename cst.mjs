import fs from "fs";
import path from "path";

const folderPath = path.join(".sst", "artifacts");

fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
  if (err) {
    console.error("Error reading folder:", err);
    return;
  }

  const subfolders = files.filter((file) => file.isDirectory());

  subfolders.forEach((subfolder) => {
    const subfolderPath = path.join(
      folderPath,
      subfolder.name,
      "packages",
      "functions",
      "src"
    );

    fs.readdir(subfolderPath, (err, files) => {
      if (err) {
        console.error("Error reading subfolder:", err);
        return;
      }

      const mjsFiles = files.filter((file) => file.endsWith(".mjs"));

      fs.stat(path.join(subfolderPath, mjsFiles[0]), (err, stats) => {
        if (err) {
          console.error("Error getting subfolder stats:", err);
          return;
        }

        const result = `Folder: ${subfolder.name}\n Size: ${
          stats.size
        } bytes \n Lambda: ${mjsFiles.join(", ")}\n`;
        console.log(
          stats.size > 20000000 ? `\x1b[31m ${result}` : `\x1b[32m ${result}`
        );
      });
    });
  });
});
