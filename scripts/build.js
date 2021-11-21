const fs = require("fs");
const path = require("path");

const SRC_DIR = path.join(__dirname, "..", "src");
const PUBLIC_DIR = path.join(__dirname, "..", "docs");

const filesToCopy = ["favicon.ico", "index.html", "styles.css", "words.js"];

filesToCopy.forEach((name) =>
  fs.copyFileSync(path.join(SRC_DIR, name), path.join(PUBLIC_DIR, name))
);
