import { createInterface } from "readline";
import { CommandHandler } from "./CommandHandler.js";
import { InputHandler } from "./InputHandler.js";
import { pathStorage } from "./storages/PathStorage.js";
import { userStorage } from "./storages/UserStorage.js";

const handleExit = () => {
  console.log(`Thank you for using File Manager, ${userStorage.getUsername()}, goodbye!`);
  process.exit(0);
};

const main = async () => {
  const commandHandler = new CommandHandler();
  const inputHandler = new InputHandler(commandHandler);

  console.log(`Welcome to the File Manager, ${userStorage.getUsername()}!\n`);
  console.log(`You are currently in ${pathStorage.get()}\n`);

  const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  readline.on("line", async (line) => {
    await inputHandler.handle(line);
    console.log(`You are currently in ${pathStorage.get()}\n`);
  });

  readline.on("SIGINT", handleExit);
  process.on("SIGINT", handleExit);
};

main();
