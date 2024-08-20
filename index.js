import { readdirSync, statSync, writeFileSync } from "fs";

function filenamesToJSON({ path, output, filesKey, indentlevel = 0 }) {
  output = forceJSON(output);
  path = path || "./";
  filesKey = filesKey || "files";
  var obj = {};
  obj[filesKey] = [];
  var outputName = output.split("/");
  outputName = outputName[outputName.length - 1];
  createJSON(path, obj);
  function createJSON(dir, obj) {
    var files = readdirSync(dir);
    files.forEach((file) => {
      var name = `${dir}/${file}`;
      if (statSync(name).isDirectory()) {
        createJSON(name, addDirectory(obj, name, filesKey));
      } else if (file != outputName) {
        obj[filesKey].push(file);
      }
    });
  }
  var jsonObj = JSON.stringify(obj, null, indentlevel);
  try {
    writeFileSync(output, jsonObj);
  } catch (error) {
    console.log(`There is something wrong with the output path (${output})!`);
  }

  function addDirectory(obj, dir, filesKey) {
    var expl = dir.split("/");
    var lastItem = expl.length - 1;
    var dirName = expl[lastItem] == "" ? expl[lastItem - 1] : expl[lastItem];
    obj[dirName] = {};
    obj[dirName][filesKey] = [];
    return obj[dirName];
  }
  function forceJSON(filename) {
    if (!filename) {
      return "./files.json";
    }
    var ext = filename.split(".").pop();
    if (ext === "json") {
      return filename;
    }
    if (filename[filename.length - 1] !== "/") {
      filename += "/";
    }
    return filename + "files.json";
  }
}

export default filenamesToJSON;
