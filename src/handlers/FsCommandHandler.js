import { join, parse } from "path";

export class FsCommandHandler {
  handleCd(currentPath, args) {
    const { path, output } = { path: currentPath, output: "" };

    return { path, output };
  }

  handleUp(currentPath) {
    const path = this._isRootPath(currentPath) ? currentPath : join(currentPath, "..");

    return { path, output: "" };
  }

  _isRootPath(currentPath) {
    return currentPath === parse(currentPath).root;
  }
}
