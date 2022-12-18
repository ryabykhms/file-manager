import { createReadStream, createWriteStream } from "fs";

export const handleCompression = (createCompressInstance, args) => {
  const [pathToFile, pathToDestination] = args;
  const readableStream = createReadStream(pathToFile);
  const writableStream = createWriteStream(pathToDestination);
  readableStream.pipe(createCompressInstance).pipe(writableStream);
};
