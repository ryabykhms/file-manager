export class InputHandler {
  _commandHandler;

  constructor(commandHandler) {
    this._commandHandler = commandHandler;
  }

  handle(currentPath, input) {
    const { command, args } = this._parseInput(input);
    const { path, output } = this._commandHandler.handle(currentPath, command, args);
    const message = `You are currently in ${path}`;
    return { path, output: `${output}\n${message}\n` };
  }

  _parseInput(input) {
    const splittedInput = input.split(/\s/);
    const command = splittedInput.shift();
    const args = splittedInput;

    return { command, args };
  }
}