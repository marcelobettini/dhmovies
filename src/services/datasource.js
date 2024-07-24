const fs = require("node:fs/promises");
const path = require("node:path");

const datasource = {
  filePath: path.resolve(__dirname, "../models/movies.json"),

  async load() {
    const jsonMovies = await fs.readFile(this.filePath, "");
    const movies = JSON.parse(jsonMovies);
    return movies;
  },
  async save(data) {
    const jsonData = JSON.stringify(data);
    await fs.writeFile(this.filePath, jsonData, "utf-8");
  },

  async removeFile(filePath) {
    if (poster === "/poster/default.png") return; //early return on default poster
    const file = path.join(__dirname, "../public", filePath);
    try {
      await fs.unlink(file);
      console.log(`file ${filePath} has been deleted.`);
    } catch (err) {
      console.error(err.message);
    }
  },
};

module.exports = datasource;
