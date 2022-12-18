import { isAbsolute, join } from "path";
import { pathStorage } from "../../storages/PathStorage.js";

export const changeDirectory = (args) => {
  const [arg] = args;
  const path = isAbsolute(arg) ? arg : join(pathStorage.get(), arg);
  pathStorage.set(path);
};
