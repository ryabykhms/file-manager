import { createReadStream, createWriteStream } from "fs";
import { basename, join } from "path";
import { finished as streamFinished } from "stream";
import { promisify } from "util";

const finished = promisify(streamFinished);

export const copy = async (args) => {
  const [pathToFile, pathToNewDirectory] = args;
  const name = basename(pathToFile);
  const newPath = join(pathToNewDirectory, name);
  const writableStream = createWriteStream(newPath);

  const readableStream = createReadStream(pathToFile, {
    encoding: "utf8",
  });

  readableStream.pipe(writableStream);
  await finished(readableStream);
};
