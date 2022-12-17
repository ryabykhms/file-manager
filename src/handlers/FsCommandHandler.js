import { createReadStream } from "fs";
import { readdir, writeFile, rename } from "fs/promises";
import { isAbsolute, join, parse, dirname } from "path";
import { finished as streamFinished } from "stream";
import { promisify } from "util";

const finished = promisify(streamFinished);

export class FsCommandHandler {
  handleCd(currentPath, args) {
    const [arg] = args;

    const path = isAbsolute(arg) ? arg : join(currentPath, arg);

    return { path, output: "" };
  }

  async handleCat(currentPath, args) {
    const [pathToFile] = args;

    const path = isAbsolute(pathToFile) ? pathToFile : join(currentPath, pathToFile);

    const readableStream = createReadStream(path);
    readableStream.pipe(process.stdout);
    await finished(readableStream);

    return { path: currentPath, output: "" };
  }

  async handleAdd(currentPath, args) {
    const [fileName] = args;

    const path = join(currentPath, fileName);
    await writeFile(path, "", { flag: "wx" });

    return { path: currentPath, output: "" };
  }

  async handleRn(currentPath, args) {
    const [pathToFile, newFilename] = args;

    const dir = dirname(pathToFile);
    const newPath = join(dir, newFilename);
    await rename(pathToFile, newPath);

    return { path: currentPath, output: "" };
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
