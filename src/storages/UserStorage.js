class UserStorage {
  constructor() {
    this._init();
  }

  setUsername(username) {
    this._username = username;
  }

  getUsername() {
    return this._username;
  }

  _init = () => {
    const usefulArgs = process.argv.slice(2);
    const usernameArg = usefulArgs.find((arg) => arg.startsWith("--username="));

    if (!usernameArg) {
      throw new Error("Please enter username like --username=Vasya");
    }

    this._username = usernameArg.split("--username=")[1];
  };
}

export const userStorage = new UserStorage();
