import { rm } from "fs/promises";
import { copy } from "./copy.js";

export const move = async (args) => {
  const [pathToFile] = args;
  await copy(args);
  await rm(pathToFile);
};
