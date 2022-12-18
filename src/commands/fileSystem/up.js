import { join, parse } from "path";
import { pathStorage } from "../../storages/PathStorage.js";

const isRootPath = (currentPath) => {
  return currentPath === parse(currentPath).root;
};

export const up = () => {
  const path = isRootPath(pathStorage.get()) ? pathStorage.get() : join(pathStorage.get(), "..");
  pathStorage.set(path);
};
