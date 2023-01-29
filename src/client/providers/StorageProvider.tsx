"use client";
/* eslint-disable no-unused-vars */
import { cloneDeep } from "lodash";
import React, { createContext, useContext, useReducer } from "react";
import { STORAGES, STORAGES_AVAILABLES } from "./constants";

type IStorageData = Record<string, unknown>;

interface IContextStore {
  storage: IStorageData;
  get: (key: keyof IStorageData) => IStorageData[keyof IStorageData];
  set: (
    key: keyof IStorageData,
    data: unknown
  ) => IStorageData[keyof IStorageData];
  intervalResetter(key: string, time?: number, cb?: () => void): NodeJS.Timeout;
}

enum STORAGE_ACTIONS {
  SET = "SET",
  CLEAR = "CLEAR",
}

const storageReducer = (
  state: IStorageData,
  action: { key: keyof IStorageData; data: any; type: STORAGE_ACTIONS }
) => {
  switch (action.type) {
    case STORAGE_ACTIONS.SET:
      var _state = cloneDeep(state);
      _state[action.key] = action.data;
      return _state;
    case STORAGE_ACTIONS.CLEAR:
      var _state = cloneDeep(state);
      _state[action.key] = null;
      return _state;
    default:
      return state;
  }
};

const useContextStore = (): IContextStore => {
  const [store, dispatch] = useReducer(storageReducer, {});

  return {
    storage: store,
    get: function (key: keyof IStorageData) {
      return this.storage?.[key];
    },
    set(key: keyof IStorageData, data: unknown) {
      dispatch({ key, data, type: STORAGE_ACTIONS.SET });
      return this.storage[key];
    },
    intervalResetter(key: string, time = 3600000, cb = () => {}) {
      const interval = setInterval(() => {
        cb();
        dispatch({
          key,
          data: null,
          type: STORAGE_ACTIONS.CLEAR,
        });
      }, time);

      return interval;
    },
  };
};

interface ILocalStorageStore {
  get: (key: string) => string | null;
  set: (key: string, data: any) => string | null;
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
