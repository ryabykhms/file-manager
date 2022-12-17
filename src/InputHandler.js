export class InputHandler {
  _commandHandler;

  constructor(commandHandler) {
    this._commandHandler = commandHandler;
  }

  async handle(input) {
    const { command, args } = this._parseInput(input);
    await this._commandHandler.handle(command, args);
  }

  _parseInput(input) {
    const splittedInput = input.split(/\s+/);
    const command = splittedInput.shift()?.toLowerCase();
    const args = splittedInput;

    return { command, args };
  }
}
