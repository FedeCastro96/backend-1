// fileManager.js
import { promises as fs } from "fs";

class FileManager {
  constructor(path) {
    this.path = path;
  }

  async readFile() {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      if (error.code === "ENOENT") {
        // Si el archivo no existe, retornamos un array vacío
        return [];
      }
      throw error;
    }
  }

  async writeFile(data) {
    try {
      await fs.writeFile(this.path, JSON.stringify(data, null, 2));
    } catch (error) {
      throw error;
    }
  }
}

export default FileManager;
