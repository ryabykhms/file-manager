import { createBrotliDecompress } from "zlib";
import { handleCompression } from "./common.js";

export const decompress = (args) => {
  const brotli = createBrotliDecompress();
  handleCompression(brotli, args);
};
