import { createHash } from "crypto";
import { createReadStream } from "fs";
import { finished as streamFinished } from "stream";
import { promisify } from "util";

const finished = promisify(streamFinished);

export const hash = async (args) => {
  const [pathToFile] = args;
  const hasher = createHash("sha256");
  const readableStream = createReadStream(pathToFile);
  readableStream.pipe(hasher);
  await finished(readableStream);
  const hash = hasher.digest("hex");
  console.log(hash);
};
