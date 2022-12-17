class UserStorage {
  constructor() {
    this._username = this._getInitial();
  }

  setUsername(username) {
    this._username = username;
  }

  getUsername() {
    return this._username;
  }

  _getInitial = () => {
    const usefulArgs = process.argv.slice(2);
    const usernameArg = usefulArgs.find((arg) => arg.startsWith("--username="));

    if (!usernameArg) {
      throw new Error("Please enter username like --username=Vasya");
    }

    const username = usernameArg.split("--username=")[1];

    return username;
  };
}

export const userStorage = new UserStorage();
