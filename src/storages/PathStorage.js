import { stat } from "fs/promises";
import { homedir } from "os";
import { InvalidInputError } from "../errors/InvalidInputError.js";

class PathStorage {
  constructor() {
    this._path = homedir();
  }

  async set(path) {
    try {
      const pathStat = await stat(path);

      if (!pathStat.isDirectory()) {
        throw new InvalidInputError();
      }

      this._path = path;
    } catch {
      throw new InvalidInputError();
    }
  }

  get() {
    return this._path;
  }
}

export const pathStorage = new PathStorage();
