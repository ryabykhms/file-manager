import { Transform } from "stream";
import { pipeline } from "stream/promises";
import { InputHandler } from "./InputHandler.js";
import { CommandHandler } from "./CommandHandler.js";
import { homedir } from "os";

const getUsernameFromArgs = (args) => {
  const usefulArgs = args.slice(2);
  const usernameArg = usefulArgs.find((arg) => arg.startsWith("--username="));

  if (!usernameArg) {
    throw new Error("Please enter username like --username=Vasya");
  }

  const username = usernameArg.split("--username=")[1];

  return username;
};

const main = async () => {
  const commandHandler = new CommandHandler();
  const inputHandler = new InputHandler(commandHandler);
  let currentPath = homedir();

  const username = getUsernameFromArgs(process.argv);
  console.log(`Welcome to the File Manager, ${username}!\n`);
  console.log(`You are currently in ${currentPath}\n`);

  const streamTransform = new Transform({
    transform: async (chunk, encoding, callback) => {
      const chunkString = chunk.toString().trim();

      const { path, output } = await inputHandler.handle(currentPath, chunkString);
      currentPath = path;

      callback(null, output);
    },
  });

  process.on("SIGINT", function () {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    process.exit(0);
  });

  await pipeline(process.stdin, streamTransform, process.stdout);
};

main();
