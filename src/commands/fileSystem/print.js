import { createReadStream } from "fs";
import { isAbsolute, join } from "path";
import { finished as streamFinished } from "stream";
import { promisify } from "util";
import { pathStorage } from "../../storages/PathStorage.js";

const finished = promisify(streamFinished);

export const print = async (args) => {
  const [pathToFile] = args;
  const path = isAbsolute(pathToFile) ? pathToFile : join(pathStorage.get(), pathToFile);
  const readableStream = createReadStream(path);
  readableStream.pipe(process.stdout);
  await finished(readableStream);
  console.log();
};
