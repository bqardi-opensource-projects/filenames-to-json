# Filenames to JSON  ![](https://img.shields.io/badge/Just-made-brightgreen) ![](https://img.shields.io/badge/badges-because-informational) ![](https://img.shields.io/badge/I-can-orange)

Creates a JSON file with a tree like structure where foldernames are the keys and filenames are listed in a `"files"` array inside this foldername-key.

## Installation
`npm i filenames-to-json`

## Usage
```javascript
var filenamesToJSON = require("filenames-to-json");

filenamesToJSON();
```

##### Parameters:

The function takes up to four arguments (path, output, filesKey, indent)

- **path**: default: `"./"`. The path where the files you want in the JSON file are located.
- **output**: default: `"./files.json"`. The name and destination for the JSON file.
- **filesKey**: default: `"files"`. The key name for the array of files inside each folder-key:
    ```json
    {
        "files": [],
        "foldername": {
            "files": []
        }
    }
    ```
    Example where parameter `filesKey` is defined as `"fileNames"`:
    ```json
    {
        "fileNames": [],
        "foldername": {
            "fileNames": []
        }
    }
    ```
- **indentlevel**: default: `0`. To prettyfy the JSON file define an indentlevel greater than `0` (commonly used indentation values are `2` and `4`).

##### Example:
Here the function will output a JSON file named `myFiles.json` to the `data` -folder containing all files located inside `images` -folder. All arrays with filenames are named `myFileNames` and it is prettyfied with an indentation level of `4`:
```javascript
var filenamesToJSON = require("filenames-to-json");

filenamesToJSON("./images", "./data/myFiles.json", "myFileNames", 4);
```
If you have a file/folder structure like this:
```
[directory]/
|──data/
|──images/
|  |──thumbs/
|  |  |──thumb1.jpg
|  |  └──thumb2.jpg
|  |──image1.jpg
|  └──image2.jpg
└──app.js
```
The output JSON file is placed in the `data` -folder and look like this:
```json
{
    "myFileNames": [
        "image1.jpg",
        "image2.jpg"
    ],
    "thumbs": {
        "myFileNames": [
            "thumb1.jpg",
            "thumb2.jpg"
        ]
    }
}
```
If the indentlevel is set to `0` (default value), it would look like this:
```json
{"myFileNames":["image1.jpg","image2.jpg"],"thumbs":{"myFileNames":["thumb1.jpg","thumb2.jpg"]}}
```

This package does NOT have any filtering options, and will therefore output ALL files from the defined folder into the JSON file. This is intentional to make this package as simple as possible to use (and understand).

If you don't understand this: `filenamesToJSON("./myFolder");` I would have to slap you with a wet danish! :smiley: