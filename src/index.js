import { homedir } from "os";
import { createInterface } from "readline";
import { CommandHandler } from "./CommandHandler.js";
import { InputHandler } from "./InputHandler.js";

const getUsernameFromArgs = (args) => {
  const usefulArgs = args.slice(2);
  const usernameArg = usefulArgs.find((arg) => arg.startsWith("--username="));

  if (!usernameArg) {
    throw new Error("Please enter username like --username=Vasya");
  }

  const username = usernameArg.split("--username=")[1];

  return username;
};

const handleExit = (username) => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  process.exit(0);
};

const main = async () => {
  const commandHandler = new CommandHandler();
  const inputHandler = new InputHandler(commandHandler);

  let currentPath = homedir();
  const username = getUsernameFromArgs(process.argv);
  console.log(`Welcome to the File Manager, ${username}!\n`);
  console.log(`You are currently in ${currentPath}\n`);

  const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  readline.on("line", async (line) => {
    const { path, output } = await inputHandler.handle(currentPath, line);
    currentPath = path;
    console.log(output);
  });

  readline.on("SIGINT", () => handleExit(username));
  process.on("SIGINT", () => handleExit(username));
};

main();
