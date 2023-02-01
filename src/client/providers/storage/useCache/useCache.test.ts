import { act, renderHook } from "@testing-library/react-hooks";
import useCache from "./useCache";

describe("useCache", () => {
  it("should be able to set a cache module", () => {
    let result: any;
    act(() => {
      const hook = renderHook(() => useCache());
      result = hook.result;
      result.current.setModule("test");
    });
    const cacheModules = result.current.getModules();
    expect(Object.keys(cacheModules)).toHaveLength(1);
  });

  it("should be able to get a cache module", () => {
    let result: any;
    act(() => {
      const hook = renderHook(() => useCache());
      result = hook.result;
      result.current.setModule("test");
    });
    const cacheModule = result.current.getModule("test");
    expect(cacheModule).toBeDefined();
  });

  it("should be able to clear a cache module", () => {
    let result: any;
    const hook = renderHook(() => useCache());
    result = hook.result;
    act(() => {
      result.current.setModule("test");
    });

    act(() => {
      result.current.removeModule("test");
    });

    const cacheModules = result.current.getModules();
    expect(Object.keys(cacheModules)).toHaveLength(0);
  });

  it("should be able to clear all cache modules", () => {
    let result: any;
    const hook = renderHook(() => useCache());
    result = hook.result;
    act(() => {
      result.current.setModule("test1");
      result.current.setModule("test2");
    });

    act(() => {
      result.current.clearModules();
    });

    const cacheModules = result.current.getModules();
    expect(Object.keys(cacheModules)).toHaveLength(0);
  });

  it("should throw an error when trying to remove a non-existing module", () => {
    let result: any;
    act(() => {
      const hook = renderHook(() => useCache());
      result = hook.result;
    });
    expect(() => {
      result.current.removeModule("nonExistingModule");
    }).toThrowError("Module with key 'nonExistingModule' not found.");
  });

  it("should throw an error when trying to get a non-existing module", () => {
    let result: any;
    act(() => {
      const hook = renderHook(() => useCache());
      result = hook.result;
    });
    expect(() => {
      result.current.getModule("nonExistingModule");
    }).toThrowError("Module with key 'nonExistingModule' not found.");
  });
});
