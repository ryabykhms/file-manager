import { Transform } from "stream";
import { pipeline } from "stream/promises";

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
  const username = getUsernameFromArgs(process.argv);
  console.log(`Welcome to the File Manager, ${username}!`);

  const streamTransform = new Transform({
    transform: (chunk, encoding, callback) => {
      const chunkString = chunk.toString().trim();

      if (chunkString === ".exit") {
        process.emit("SIGINT");
      }

      callback(null, `${chunkString}\n`);
    },
  });

  await pipeline(process.stdin, streamTransform, process.stdout);

  process.on("SIGINT", function () {
    process.stdin.resume();
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    process.exit(0);
  });
};

main();
