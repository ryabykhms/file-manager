import { createReadStream, createWriteStream } from "fs";
import { readdir, writeFile, rename, rm } from "fs/promises";
import { isAbsolute, join, parse, dirname, basename } from "path";
import { finished as streamFinished } from "stream";
import { promisify } from "util";
import { createHash } from "crypto";
import { createBrotliCompress, createBrotliDecompress } from "zlib";
import { pathStorage } from "../storages/PathStorage.js";

const finished = promisify(streamFinished);

export class FsCommandHandler {
  handleCd(args) {
    const [arg] = args;
    const path = isAbsolute(arg) ? arg : join(pathStorage.get(), arg);
    pathStorage.set(path);
  }

  async handleCat(args) {
    const [pathToFile] = args;
    const path = isAbsolute(pathToFile) ? pathToFile : join(pathStorage.get(), pathToFile);
    const readableStream = createReadStream(path);
    readableStream.pipe(process.stdout);
    await finished(readableStream);
  }

  async handleAdd(args) {
    const [fileName] = args;
    const path = join(pathStorage.get(), fileName);
    await writeFile(path, "", { flag: "wx" });
  }

  async handleRn(args) {
    const [pathToFile, newFilename] = args;
    const dir = dirname(pathToFile);
    const newPath = join(dir, newFilename);
    await rename(pathToFile, newPath);
  }

  async handleCp(args) {
    const [pathToFile, pathToNewDirectory] = args;
    const name = basename(pathToFile);
    const newPath = join(pathToNewDirectory, name);
    const writableStream = createWriteStream(newPath);

    const readableStream = createReadStream(pathToFile, {
      encoding: "utf8",
    });

    readableStream.pipe(writableStream);
    await finished(readableStream);
  }

  async handleMv(args) {
    const [pathToFile] = args;
    await this.handleCp(args);
    await rm(pathToFile);
  }

  async handleRm(args) {
    const [pathToFile] = args;
    await rm(pathToFile);
  }

  handleUp() {
    const path = this._isRootPath(pathStorage.get()) ? pathStorage.get() : join(pathStorage.get(), "..");
    pathStorage.set(path);
  }

  async handleLs() {
    const dirEntries = await readdir(pathStorage.get(), { withFileTypes: true });
    const entries = dirEntries
      .sort(this._sortDirEntries.bind(this))
      .map((dirEntry) => ({ Name: dirEntry.name, Type: this._getTypeOfDirEntry(dirEntry) }));

    console.table(entries);
  }

  async handleHash(args) {
    const [pathToFile] = args;
    const hasher = createHash("sha256");
    const readableStream = createReadStream(pathToFile);
    readableStream.pipe(hasher);
    await finished(readableStream);
    const hash = hasher.digest("hex");
    console.log(hash);
  }

  async handleCompress(args) {
    const [pathToFile, pathToDestination] = args;
    const readableStream = createReadStream(pathToFile);
    const writableStream = createWriteStream(pathToDestination);
    const brotli = createBrotliCompress();
    readableStream.pipe(brotli).pipe(writableStream);
  }

  async handleDecompress(args) {
    const [pathToFile, pathToDestination] = args;
    const readableStream = createReadStream(pathToFile);
    const writableStream = createWriteStream(pathToDestination);
    const brotli = createBrotliDecompress();
    readableStream.pipe(brotli).pipe(writableStream);
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
