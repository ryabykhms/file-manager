import { rename as rn } from "fs/promises";
import { dirname, join } from "path";

export const rename = async (args) => {
  const [pathToFile, newFilename] = args;
  const dir = dirname(pathToFile);
  const newPath = join(dir, newFilename);
  await rn(pathToFile, newPath);
};
