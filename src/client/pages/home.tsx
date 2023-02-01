import type { NextPage } from "next";

import { useStorage } from "providers/StorageProvider";
import { CacheStorageTypes } from "providers/storage/constants";
import { useEffect, useState } from "react";
import MemoryModuleCard from "components/MemoryModuleCard/MemoryModuleCard";

const Home: NextPage = () => {
  const memory = useStorage(CacheStorageTypes.context);
  const [newModuleKey, setNewModuleKey] = useState("");

  useEffect(() => {
    console.log(memory);
    console.log(memory.getModules());
    // memory
    //   .getModule(newModuleKey)
    //   ?.setExpirationTimer("test", 1000) as NodeJS.Timeout;
  }, [memory]);

  return (
    <>
      <main className="justify-top flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] pt-8">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          <span className="text-[hsl(280,100%,70%)]"> Storage Modules</span>
        </h1>
        <div className="flex-rows container flex items-center justify-center gap-12 px-4 py-16 ">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <input
              type="text"
              value={newModuleKey}
              onChange={(e) => setNewModuleKey(e.target.value)}
              placeholder="Module Key"
              className="mr-4 w-full rounded-lg bg-gray-200 px-4 py-2"
            />
          </div>
          <button
            className="rounded-lg bg-[hsl(280,100%,70%)] px-4 py-2 text-lg font-semibold text-white shadow-lg hover:bg-[hsl(280,100%,60%)]"
            onClick={() => {
              if (newModuleKey.length > 1) {
                memory.setModule(newModuleKey);
                setNewModuleKey("");
              }
            }}
          >
            Add Module To Context
          </button>
          <button
            className="rounded-lg bg-[hsl(280,100%,70%)] px-4 py-2 text-lg font-semibold text-white shadow-lg hover:bg-[hsl(280,100%,60%)]"
            onClick={() => memory.clearModules()}
          >
            Clear Modules
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {Object.keys(memory.getModules()).map((key) => (
            <MemoryModuleCard
              key={key}
              title={key}
              module={memory.getModule(key)}
              onRemove={() => memory.removeModule(key)}
            />
          ))}
        </div>
      </main>
    </>
  );
};

Home.getInitialProps = ({ query }) => {
  return {
    data: `some initial props including query params and controller data: ${JSON.stringify(
      query
    )}`,
  };
};

export default Home;
