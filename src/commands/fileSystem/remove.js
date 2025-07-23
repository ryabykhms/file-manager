import { rm } from "fs/promises";

export const remove = async (args) => {
  const [pathToFile] = args;
  await rm(pathToFile);
};
