export enum STORAGE_ENUM {
  local = "local",
  context = "memory",
}

export const STORAGES = {
  localStorage: {
    type: STORAGE_ENUM.local,
    enabled: false,
  },
  context: {
    type: STORAGE_ENUM.context,
    enabled: true,
  },
};

export const STORAGES_AVAILABLES = Object.values(STORAGES)
  .filter((storage: { enabled: boolean; }) => storage.enabled)
  .map((storage: { type: STORAGE_ENUM; }) => storage.type);
