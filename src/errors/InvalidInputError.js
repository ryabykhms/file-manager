export class InvalidInputError extends Error {
  constructor() {
    super(`Invalid input`);
    this.name = this.constructor.name;
  }
}
