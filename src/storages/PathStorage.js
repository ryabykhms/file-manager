import { homedir } from "os";

class PathStorage {
  constructor() {
    this._path = homedir();
  }

  set(path) {
    this._path = path;
  }

  get() {
    return this._path;
  }
}

export const pathStorage = new PathStorage();
