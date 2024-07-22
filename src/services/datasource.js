const fs = require("node:fs/promises");
const datasource = {
  async load(filePath) {
    const jsonMovies = await fs.readFile(filePath, "utf-8");
    const movies = JSON.parse(jsonMovies);
    return movies;
  },
  async save(filePath, data) {
    const jsonData = JSON.stringify(data);
    await fs.writeFile(filePath, jsonData, "utf-8");
  },

  async removefile(filePath) {
    const file = path.join(__dirname, "../public", filePath);
    try {
      await fs.unlink(file);
      console.log(`File ${filePath} has been deleted.`);
    } catch (err) {
      console.error(err);
    }
  },
};

module.exports = datasource;
