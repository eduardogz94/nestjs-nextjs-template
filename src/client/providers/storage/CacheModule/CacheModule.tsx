import { isEqual } from "lodash";
import type { Dispatch } from "react";

import { CacheModuleActions } from "../constants";
import { ICacheData } from "../interfaces";

import { cacheReducer, ICacheReducer } from "./CacheModule.utils";

export default class CacheModule {
  keys: any;
  dispatch: Dispatch<ICacheReducer>;
  module: string;

  constructor(keys: ICacheData, module: keyof ICacheData = "") {
    this.keys = keys;
    this.module = module;
    this.dispatch = (action: ICacheReducer) => cacheReducer(this.keys, action);
  }

  createModule(key: keyof ICacheData) {
    const newModule = new CacheModule({}, key);
    this.dispatch({
      key,
      type: CacheModuleActions.SET,
      value: newModule,
    });
    return newModule;
  }
  getKey(key: keyof ICacheData) {
    return this.keys?.[key];
  }

  setKey(key: keyof ICacheData, value: any) {
    const existingData = this.getKey(key);
    if (isEqual(existingData, value)) {
      return existingData;
    }

    this.dispatch({ key, type: CacheModuleActions.SET, value });
    return this.getKey(key);
  }

  removeKey(key: keyof ICacheData) {
    if (!this.getKey(key)) {
      return null;
    }

    this.dispatch({
      key,
      type: CacheModuleActions.REMOVE,
    });
    return this.getKey(key);
  }

  clear() {
    if (Object.keys(this.keys).length > 0) {
      this.dispatch({
        key: "",
        type: CacheModuleActions.CLEAR,
      });
    }

    return this.keys;
  }

  setExpirationTimer(key: keyof ICacheData, time = 3600000, cb = () => {}) {
    return setTimeout(() => {
      if (this.getKey(key) !== null) {
        this.dispatch({
          key,
          type: CacheModuleActions.REMOVE,
        });
        cb();
      }
    }, time);
  }
}
