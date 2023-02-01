import { ICacheData } from "../interfaces";

export interface IBaseStorage {
  keys?: ICacheData;
  getKey(_key: string): any;
  setKey(_key: string, _data: any): any;
  removeKey(_key: string): {
    removed: boolean;
  };
  clearKey(): any;
  setExpirationTimer(
    _key: string,
    _time?: number,
    _cb?: () => void
  ): NodeJS.Timeout;
  createModule(_key: string): any;
}

export const BaseStorage: IBaseStorage = {
  getKey(_key: string) {
    throw new Error("Method not implemented");
  },
  setKey(_key: string, _data: unknown) {
    throw new Error("Method not implemented");
  },
  removeKey(_key: string) {
    throw new Error("Method not implemented");
  },
  clearKey() {
    throw new Error("Method not implemented");
  },
  setExpirationTimer(_key: string, _time = 3600000, _cb = () => {}) {
    throw new Error("Method not implemented");
  },
  createModule(_key: string) {
    throw new Error("Method not implemented");
  },
};
