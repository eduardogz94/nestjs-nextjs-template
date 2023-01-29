import { cloneDeep } from "lodash";
import { createContext, useContext, useReducer } from "react";
import { STORAGES, STORAGES_AVAILABLES } from "./constants";

type IStorageData = Record<string, unknown>;

interface IContextStore {
  storage: IStorageData;
  get(key: string): any;
  set(key: string, data: any): any;
  intervalResetter(key: string, time?: number, cb?: () => void): NodeJS.Timeout;
}

enum STORAGE_ACTIONS {
  SET = "SET",
  CLEAR = "CLEAR",
}

const storageReducer = (
  state: IStorageData,
  action: { key: string; data: any; type: STORAGE_ACTIONS }
) => {
  switch (action.type) {
    case STORAGE_ACTIONS.SET:
      return { ...state, [action.key]: action.data };
    case STORAGE_ACTIONS.CLEAR:
      return { ...state, [action.key]: null };
    default:
      return state;
  }
};

const useContextStore = (): IContextStore => {
  const [store, dispatch] = useReducer(storageReducer, {});

  return {
    storage: store,
    get(key: string) {
      return this.storage?.[key];
    },
    set(key: string, data: any) {
      dispatch({ key, data, type: STORAGE_ACTIONS.SET });
      this.storage = cloneDeep(this.storage);
      this.storage[key] = data;
      return this.storage;
    },
    intervalResetter(key: string, time = 3600000, cb = () => {}) {
      const interval = setInterval(() => {
        cb();
        dispatch({ key, data: null, type: STORAGE_ACTIONS.CLEAR });
        this.storage = cloneDeep(this.storage);
        this.storage[key] = null;
        return this.storage;
      }, time);

      return interval;
    },
  };
};

interface ILocalStorageStore {
  get(key: string): any;
  set(key: string, data: any): any;
}

const useLocalStorageStore = (): ILocalStorageStore => {
  return {
    get(key) {
      return localStorage.getItem(key);
    },
    set(key, data) {
      localStorage.setItem(key, JSON.stringify(data));
      return localStorage.getItem(key);
    },
  };
};

interface IStorageContext {
  [key: string]: IContextStore | ILocalStorageStore;
}

interface IStorageProviderProps {
  children: React.ReactNode;
}

const StorageContext = createContext<IStorageContext>(
  STORAGES_AVAILABLES.reduce(
    (prev, current) => ({ ...prev, [current]: {} }),
    {}
  )
);

export const useStorage = (type: string) => useContext(StorageContext)[type];

const StorageProvider = ({ children }: IStorageProviderProps) => {
  const value: IStorageContext = {
    [STORAGES.context.type]: useContextStore(),
    [STORAGES.localStorage.type]: useLocalStorageStore(),
  };

  return (
    <StorageContext.Provider value={value}>{children}</StorageContext.Provider>
  );
};

export default StorageProvider;
