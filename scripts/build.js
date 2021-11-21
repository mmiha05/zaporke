const fs = require("fs");
const path = require("path");

const SRC_DIR = path.resolve("..", "src");
const PUBLIC_DIR = path.resolve("..", "public");

const filesToCopy = ["favicon.ico", "index.html", "styles.css", "words.js"];

filesToCopy.forEach((name) =>
  fs.copyFileSync(path.join(SRC_DIR, name), path.join(PUBLIC_DIR, name))
);
