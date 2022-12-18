export const exit = () => {
  process.emit("SIGINT");
};
