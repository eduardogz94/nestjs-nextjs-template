import { cloneDeep } from "lodash";

import { CacheModuleActions } from "../constants";
import { ICacheData } from "../interfaces";

export type ICacheReducer = {
  key: keyof ICacheData;
  value?: any;
  type: CacheModuleActions | string;
};

export const cacheReducer = (state: ICacheData, action: ICacheReducer) => {
  const clonedState = cloneDeep(state);
  const { type, key, value } = action;

  switch (type) {
    case CacheModuleActions.SET:
      return Object.assign({}, clonedState, {
        [key]: cloneDeep(value),
      });
    case CacheModuleActions.CLEAR:
      return Object.assign({});
    case CacheModuleActions.REMOVE:
      return Object.keys(clonedState)
        .filter((stateKey) => stateKey !== key)
        .reduce((result: any, currentKey: any) => {
          result[currentKey] = clonedState[currentKey];
          return result;
        }, {});

    default:
      throw new Error(`Unsupported cache action type: ${action.type}`);
  }
};
