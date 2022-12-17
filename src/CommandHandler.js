import { ExitCommandHandler } from "./handlers/ExitCommandHandler.js";
import { FsCommandHandler } from "./handlers/FsCommandHandler.js";
import { OsCommandHandler } from "./handlers/OsCommandHandler.js";

const fsCommandHandler = new FsCommandHandler();
const exitCommandHandler = new ExitCommandHandler();
const osCommandHandler = new OsCommandHandler();

export class CommandHandler {
  _commands = new Map([
    [".exit", (args) => exitCommandHandler.handle(args)],
    ["cd", (args) => fsCommandHandler.handleCd(args)],
    ["up", (args) => fsCommandHandler.handleUp(args)],
    ["ls", (args) => fsCommandHandler.handleLs(args)],
    ["os", (args) => osCommandHandler.handle(args)],
    ["cat", (args) => fsCommandHandler.handleCat(args)],
    ["add", (args) => fsCommandHandler.handleAdd(args)],
    ["rn", (args) => fsCommandHandler.handleRn(args)],
    ["cp", (args) => fsCommandHandler.handleCp(args)],
    ["mv", (args) => fsCommandHandler.handleMv(args)],
    ["rm", (args) => fsCommandHandler.handleRm(args)],
    ["hash", (args) => fsCommandHandler.handleHash(args)],
    ["compress", (args) => fsCommandHandler.handleCompress(args)],
    ["decompress", (args) => fsCommandHandler.handleDecompress(args)],
  ]);

  async handle(command, args) {
    const handleCommand = this._commands.get(command);
    await handleCommand?.(args);
  }
}
