import { useCacheType } from "./useCache/useCache";

export type ICacheData = Record<string, unknown>;

export type IStorageContext = {
  [key: string]: useCacheType;
};

export type IStorageProviderProps = {
  children: React.ReactNode;
};
