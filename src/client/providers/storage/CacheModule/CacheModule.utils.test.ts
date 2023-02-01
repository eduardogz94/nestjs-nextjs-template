import { CacheModuleActions } from "../constants";
import { ICacheData } from "../interfaces";
import { ICacheReducer, cacheReducer } from "./CacheModule.utils";

describe("cacheReducer", () => {
  let initialState: ICacheData;
  beforeEach(() => {
    initialState = {
      data1: "data1",
      data2: {
        nestedData1: "nestedData1",
        nestedData2: "nestedData2",
      },
    };
  });

  it("should handle SET action", () => {
    const action: ICacheReducer = {
      key: "data3",
      value: {
        nestedData3: "nestedData3",
        nestedData4: "nestedData4",
      },
      type: CacheModuleActions.SET,
    };
    const expectedState = {
      data1: "data1",
      data2: {
        nestedData1: "nestedData1",
        nestedData2: "nestedData2",
      },
      data3: {
        nestedData3: "nestedData3",
        nestedData4: "nestedData4",
      },
    };
    const newState = cacheReducer(initialState, action);
    expect(newState).toEqual(expectedState);
    expect(newState).not.toBe(initialState);
    expect(newState.data2).not.toBe(initialState.data2);
  });

  it("should handle CLEAR action", () => {
    const action: ICacheReducer = {
      type: CacheModuleActions.CLEAR,
      key: "",
    };
    const expectedState = {};
    const newState = cacheReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  it("should handle REMOVE action", () => {
    const action: ICacheReducer = {
      key: "data2",
      type: CacheModuleActions.REMOVE,
    };
    const expectedState = {
      data1: "data1",
    };
    const newState = cacheReducer(initialState, action);
    expect(newState).toEqual(expectedState);
    expect(newState).not.toBe(initialState);
  });

  it("should throw an error for unsupported action type", () => {
    const action: ICacheReducer = {
      type: "UNSUPPORTED_TYPE",
      key: "",
    };
    expect(() => cacheReducer(initialState, action)).toThrowError(
      `Unsupported cache action type: UNSUPPORTED_TYPE`
    );
  });
});
