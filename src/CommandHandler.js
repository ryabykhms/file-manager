import { ExitCommandHandler } from "./handlers/ExitCommandHandler.js";
import { FsCommandHandler } from "./handlers/FsCommandHandler.js";

const fsCommandHandler = new FsCommandHandler();
const exitCommandHandler = new ExitCommandHandler();

export class CommandHandler {
  _commands = new Map([
    [".exit", (currentPath, args) => exitCommandHandler.handle(currentPath, args)],
    ["cd", (currentPath, args) => fsCommandHandler.handleCd(currentPath, args)],
    ["up", (currentPath, args) => fsCommandHandler.handleUp(currentPath, args)],
  ]);

  handle(currentPath, command, args) {
    const handleCommand = this._commands.get(command);

    if (!handleCommand) {
      return { path: currentPath, output: "" };
    }

    const { path, output } = handleCommand(currentPath, args);

    return { path, output };
  }
}
