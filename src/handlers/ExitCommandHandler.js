export class ExitCommandHandler {
  handle(currentPath) {
    process.emit("SIGINT");

    return { path: currentPath, output: "" };
  }
}
