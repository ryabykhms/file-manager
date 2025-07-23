import { readdir } from "fs/promises";
import { pathStorage } from "../../storages/PathStorage.js";

const getTypeOfDirEntry = (dirEntry) => {
  return dirEntry.isDirectory() ? "directory" : "file";
};

const sortDirEntries = (dirEntryLeft, dirEntryRight) => {
  const sortByType =
    dirEntryLeft.isDirectory() === dirEntryRight.isDirectory() ? 0 : dirEntryLeft.isDirectory() ? -1 : 1;

  const sortByName = dirEntryLeft.name.localeCompare(dirEntryRight.name);

  return sortByType || sortByName;
};

export const list = async () => {
  const dirEntries = await readdir(pathStorage.get(), { withFileTypes: true });
  const entries = dirEntries
    .sort(sortDirEntries)
    .map((dirEntry) => ({ Name: dirEntry.name, Type: getTypeOfDirEntry(dirEntry) }));

  console.table(entries);
};
