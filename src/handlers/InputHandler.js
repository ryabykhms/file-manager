import { InvalidInputError } from "../errors/InvalidInputError.js";

export class InputHandler {
  _commandHandler;

  constructor(commandHandler) {
    this._commandHandler = commandHandler;
  }

  async handle(input) {
    try {
      const { command, args } = this._parseInput(input);
      await this._commandHandler.handle(command, args);
    } catch (e) {
      console.log(e instanceof InvalidInputError ? e.message : "Operation failed");
    }
  }

  _parseInput(input) {
    const splittedInput = input.split(/\s+/);
    const command = splittedInput.shift()?.toLowerCase();
    const args = splittedInput;

    return { command, args };
  }
}
