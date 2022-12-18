import { createBrotliCompress } from "zlib";
import { handleCompression } from "./common.js";

export const compress = (args) => {
  const brotli = createBrotliCompress();
  handleCompression(brotli, args);
};
