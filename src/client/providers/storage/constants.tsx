/* eslint-disable no-unused-vars */
export enum CacheStorageTypes {
  local = "local",
  context = "memory",
}

export enum CacheModuleActions {
  SET = "SET",
  CLEAR = "CLEAR",
  REMOVE = "REMOVE",
}

export const STORAGES_DATA = {
  localStorage: {
    type: CacheStorageTypes.local,
    enabled: false,
  },
  context: {
    type: CacheStorageTypes.context,
    enabled: true,
  },
};

export const STORAGES_AVAILABLES = Object.values(STORAGES_DATA)
  .filter((storage) => storage.enabled)
  .map((storage) => storage.type);
