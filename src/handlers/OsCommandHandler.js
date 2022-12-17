import { arch, cpus, EOL, homedir, userInfo } from "os";

export class OsCommandHandler {
  _commands = new Map([
    ["eol", () => EOL],
    ["cpus", () => cpus()],
    ["homedir", () => homedir()],
    ["username", () => userInfo().username],
    ["architecture", () => arch()],
  ]);

  handle(args) {
    const arg = args?.[0]?.slice(2)?.toLowerCase();
    console.log(this._commands.get(arg)?.());
  }

  _handleEol() {
    return EOL;
  }
}
