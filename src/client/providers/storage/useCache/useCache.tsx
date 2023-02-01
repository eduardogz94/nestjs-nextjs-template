import { useReducer, useMemo } from "react";

import { ICacheData } from "../interfaces";
import { CacheModuleActions, CacheStorageTypes } from "../constants";

import CacheModule from "../CacheModule/CacheModule";
import { cacheReducer } from "../CacheModule/CacheModule.utils";

export type useCacheType = {
  type: typeof CacheStorageTypes.context;
  getModules: () => CacheModule;
  getModule(_key: keyof ICacheData): CacheModule | Error;
  removeModule(_key: keyof ICacheData): CacheModule | Error;
  setModule(_key: keyof ICacheData): CacheModule;
  clearModules(): void;
};

const useCache = (): useCacheType => {
  const [cacheData, dispatch] = useReducer(cacheReducer, {});

  const cacheFactory = useMemo(
    () => new CacheModule(cacheData, CacheStorageTypes.context),
    [cacheData]
  );

  return {
    type: CacheStorageTypes.context,
    getModule(key: keyof ICacheData) {
      const module = cacheFactory.getKey(key);
      if (!module) {
        throw new Error(`Module with key '${key}' not found.`);
      }
      return module;
    },
    getModules() {
      return cacheFactory.keys;
    },
    removeModule(key: keyof ICacheData) {
      const module = cacheFactory.removeKey(key);
      if (!module) {
        throw new Error(`Module with key '${key}' not found.`);
      }
      dispatch({
        key,
        type: CacheModuleActions.REMOVE,
      });
      return module;
    },
    setModule(key: keyof ICacheData) {
      const moduleFactory = new CacheModule({}, key);
      dispatch({
        key,
        type: CacheModuleActions.SET,
        value: moduleFactory,
      });
      return moduleFactory;
    },
    clearModules() {
      if (Object.keys(cacheData).length > 0) {
        dispatch({
          key: "",
          type: CacheModuleActions.CLEAR,
        });
      }
      return cacheFactory;
    },
  };
};

export default useCache;
