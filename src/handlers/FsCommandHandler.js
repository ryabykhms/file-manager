import { readdir } from "fs/promises";
import { isAbsolute, join, parse } from "path";

export class FsCommandHandler {
  handleCd(currentPath, args) {
    const arg = args?.[0];

    const path = isAbsolute(arg) ? arg : join(currentPath, arg);

    return { path, output: "" };
  }

  handleUp(currentPath) {
    const path = this._isRootPath(currentPath) ? currentPath : join(currentPath, "..");

    return { path, output: "" };
  }

  async handleLs(currentPath) {
    const dirEntries = await readdir(currentPath, { withFileTypes: true });
    const entries = dirEntries
      .sort(this._sortDirEntries.bind(this))
      .map((dirEntry) => ({ Name: dirEntry.name, Type: this._getTypeOfDirEntry(dirEntry) }));

    console.table(entries);

    return Promise.resolve({ path: currentPath, output: "" });
  }

  _getTypeOfDirEntry(dirEntry) {
    return dirEntry.isDirectory() ? "directory" : "file";
  }

  _sortDirEntries(dirEntryLeft, dirEntryRight) {
    const sortByType =
      dirEntryLeft.isDirectory() === dirEntryRight.isDirectory() ? 0 : dirEntryLeft.isDirectory() ? -1 : 1;

    const sortByName = dirEntryLeft.name.localeCompare(dirEntryRight.name);

    return sortByType || sortByName;
  }

  _isRootPath(currentPath) {
    return currentPath === parse(currentPath).root;
  }
}
