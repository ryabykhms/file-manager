import { ExitCommandHandler } from "./handlers/ExitCommandHandler.js";
import { FsCommandHandler } from "./handlers/FsCommandHandler.js";
import { OsCommandHandler } from "./handlers/OsCommandHandler.js";

const fsCommandHandler = new FsCommandHandler();
const exitCommandHandler = new ExitCommandHandler();
const osCommandHandler = new OsCommandHandler();

export class CommandHandler {
  _commands = new Map([
    [".exit", (currentPath, args) => exitCommandHandler.handle(currentPath, args)],
    ["cd", (currentPath, args) => fsCommandHandler.handleCd(currentPath, args)],
    ["up", (currentPath, args) => fsCommandHandler.handleUp(currentPath, args)],
    ["ls", (currentPath, args) => fsCommandHandler.handleLs(currentPath, args)],
    ["os", (currentPath, args) => osCommandHandler.handle(currentPath, args)],
    ["cat", (currentPath, args) => fsCommandHandler.handleCat(currentPath, args)],
    ["add", (currentPath, args) => fsCommandHandler.handleAdd(currentPath, args)],
  ]);

  async handle(currentPath, command, args) {
    const handleCommand = this._commands.get(command);

    if (!handleCommand) {
      return { path: currentPath, output: "" };
    }

    const { path, output } = await handleCommand(currentPath, args);

    return Promise.resolve({ path, output });
  }
}
