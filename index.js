import { readdirSync, statSync, writeFileSync } from "fs";

function filenamesToJSON({
  path = "./",
  output = "./files.json",
  filesKey = "files",
  indentlevel = 0,
}) {
  output = forceJSON(output);
  const obj = { [filesKey]: [] };
  const outputName = output.split("/").pop();
  createJSON(path, obj);

  function createJSON(dir, obj) {
    const files = readdirSync(dir);
    files.forEach((file) => {
      const name = `${dir}/${file}`;
      if (statSync(name).isDirectory()) {
        createJSON(name, addDirectory(obj, name, filesKey));
      } else if (file !== outputName) {
        obj[filesKey].push(file);
      }
    });
  }

  const jsonObj = JSON.stringify(obj, null, indentlevel);
  try {
    writeFileSync(output, jsonObj);
  } catch (error) {
    console.log(`There is something wrong with the output path (${output})!`);
  }

  function addDirectory(obj, dir, filesKey) {
    const expl = dir.split("/");
    const dirName = expl[expl.length - 1] || expl[expl.length - 2];
    obj[dirName] = { [filesKey]: [] };
    return obj[dirName];
  }

  function forceJSON(filename) {
    if (!filename) {
      return "./files.json";
    }
    const ext = filename.split(".").pop();
    if (ext === "json") {
      return filename;
    }
    return filename.endsWith("/")
      ? `${filename}files.json`
      : `${filename}/files.json`;
  }
}

export default filenamesToJSON;
