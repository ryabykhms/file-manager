import { writeFile } from "fs/promises";
import { join } from "path";
import { pathStorage } from "../../storages/PathStorage.js";

export const add = async (args) => {
  const [fileName] = args;
  const path = join(pathStorage.get(), fileName);
  await writeFile(path, "", { flag: "wx" });
};
