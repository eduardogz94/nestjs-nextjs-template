"use client";

import { createContext, useContext, useMemo } from "react";
import { useCache } from "./storage";
import { STORAGES_AVAILABLES } from "./storage/constants";
import { IStorageContext, IStorageProviderProps } from "./storage/interfaces";
import { useLocalStorage } from "./storage/LocalStorage/LocalStorage";

const StorageContext = createContext<IStorageContext>(
  STORAGES_AVAILABLES.reduce(
    (prev, current) => ({ ...prev, [current]: {} }),
    {}
  )
);

export const useStorage = (type: string) => useContext(StorageContext)[type];

const StorageProvider = ({ children }: IStorageProviderProps) => {
  const contextStorage = useCache();
  const localStorage = useLocalStorage();

  // filtering the storages in the useMemo's dependency array
  const storages = useMemo(
    () =>
      [contextStorage, localStorage].filter((storage) =>
        STORAGES_AVAILABLES.includes(storage.type)
      ),
    [contextStorage, localStorage]
  );

  // Returning value dynamically based on "enabled" property in the storages
  const value: IStorageContext = useMemo(() => {
    return storages.reduce((prev, current) => {
      if (STORAGES_AVAILABLES.includes(current.type)) {
        const { type, ...rest } = current;
        return {
          ...prev,
          [type]: rest,
        };
      }
      return prev;
    }, {});
  }, [storages]);

  return (
    <StorageContext.Provider value={value}>{children}</StorageContext.Provider>
  );
};

export default StorageProvider;
