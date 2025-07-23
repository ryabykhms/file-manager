import { arch, cpus, EOL, homedir, userInfo } from "os";

const commands = new Map([
  ["eol", () => EOL],
  ["cpus", () => cpus()],
  ["homedir", () => homedir()],
  ["username", () => userInfo().username],
  ["architecture", () => arch()],
]);

export const printInfo = (args) => {
  const arg = args?.[0]?.slice(2)?.toLowerCase();
  const result = commands.get(arg)?.();
  result && console.log(result);
};
