export class ExitCommandHandler {
  handle() {
    process.emit("SIGINT");
  }
}
