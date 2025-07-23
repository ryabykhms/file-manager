import { compress, decompress } from "../commands/compression/index.js";
import { hash } from "../commands/crypto/index.js";
import { add, changeDirectory, copy, list, move, print, remove, rename, up } from "../commands/fileSystem/index.js";
import { printInfo } from "../commands/operationSystem/index.js";
import { exit } from "../commands/process/index.js";
import { InvalidInputError } from "../errors/InvalidInputError.js";

export class CommandHandler {
  _commands = new Map([
    ["cd", (args) => changeDirectory(args)],
    ["up", (args) => up(args)],
    ["ls", (args) => list(args)],
    ["cat", (args) => print(args)],
    ["add", (args) => add(args)],
    ["rn", (args) => rename(args)],
    ["cp", (args) => copy(args)],
    ["mv", (args) => move(args)],
    ["rm", (args) => remove(args)],
    ["compress", (args) => compress(args)],
    ["decompress", (args) => decompress(args)],
    ["hash", (args) => hash(args)],
    ["os", (args) => printInfo(args)],
    [".exit", (args) => exit(args)],
  ]);

  async handle(command, args) {
    const handleCommand = this._commands.get(command);

    if (!handleCommand) {
      throw new InvalidInputError();
    }

    await handleCommand?.(args);
  }
}
