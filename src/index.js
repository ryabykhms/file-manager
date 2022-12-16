const getUsernameFromArgs = (args) => {
  const usefulArgs = args.slice(2);
  const usernameArg = usefulArgs.find((arg) => arg.startsWith("--username="));

  if (!usernameArg) {
    throw new Error("Please enter username like --username=Vasya");
  }

  const username = usernameArg.split("--username=")[1];

  return username;
};

const main = () => {
  const username = getUsernameFromArgs(process.argv);
  console.log(`Welcome to the File Manager, ${username}!`);
};

main();
