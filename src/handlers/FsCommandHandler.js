export class FsCommandHandler {
  handleCd(currentPath, args) {
    const { path, output } = { path: currentPath, output: "" };

    return { path, output };
  }
}
