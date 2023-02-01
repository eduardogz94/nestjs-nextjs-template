import CacheModule from "./CacheModule";

describe("CacheModule", () => {
  let cacheModule: CacheModule;

  beforeEach(() => {
    cacheModule = new CacheModule({});
  });

  it.skip("should set a key", () => {
    cacheModule.setKey("testKey", "testValue");
    expect(cacheModule.getKey("testKey")).toBeInstanceOf(CacheModule);
  });

  it("should remove a key", () => {
    cacheModule.setKey("testKey", "testValue");
    cacheModule.removeKey("testKey");
    expect(cacheModule.getKey("testKey")).toEqual(undefined);
  });

  it("should clear all keys", () => {
    cacheModule.setKey("testKey1", "testValue1");
    cacheModule.setKey("testKey2", "testValue2");
    cacheModule.clear();
    expect(cacheModule.keys).toEqual({});
  });

  it.skip("should create a module", () => {
    cacheModule.createModule("testModule");
    const createdModule = cacheModule.getKey("testModule");
    expect(createdModule).toEqual({
      dispatch: expect.any(Function),
      keys: {},
      module: "testModule",
    });
  });

  it("should set an expiration timer", () => {
    const spy = jest.spyOn(global, "setTimeout");
    cacheModule.setExpirationTimer("testKey", 1000);
    expect(spy).toHaveBeenCalled();
  });
});
