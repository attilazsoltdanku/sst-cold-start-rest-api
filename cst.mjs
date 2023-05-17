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

        fs.readFile(path.join(subfolderPath, mjsFiles[0]), (err, data) => {
          if (err) {
            console.error("Error reading file:", err);
            return;
          }
          const term = "// node_modules/";

          const nodeModules = getNodeModules(data.toString().split(term));
          const mostFrequentModules = countMostUsedNodeModules(nodeModules);
          const termCount = Object.keys(nodeModules).length;

          const result = `Lambda: ${mjsFiles.join(", ")}\n Size: ${
            stats.size / 1000000
          } megabytes \n Imported modules: ${termCount} \n Most used libs: ${mostFrequentModules}\n`;
          console.log(
            stats.size > 20000000 ? `\x1b[31m ${result}` : `\x1b[32m ${result}`
          );
        });
      });
    });
  });
});

const getNodeModules = (dataArray) => {
  const freq = {};
  for (let i = 0; i < dataArray.length; i++) {
    if (dataArray[i].includes("node_modules")) {
      const t = dataArray[i].substring(0, dataArray[i].indexOf("/"));
      if (freq[t]) {
        freq[t]++;
      } else {
        freq[t] = 1;
      }
    }
  }
  return freq;
};
const countMostUsedNodeModules = (data) =>
  JSON.stringify(
    Object.fromEntries(
      Object.entries(data)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
    ),
    null,
    2
  );
