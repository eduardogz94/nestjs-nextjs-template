import CacheModule from "providers/storage/CacheModule/CacheModule";
import { useCallback, useState } from "react";

export interface IMemoryCard {
  title: string;
  module?: CacheModule;
  onRemove: (_key: string) => void;
}

const DisplayModuleData: React.FC<{ module: any }> = ({ module }) => {
  return (
    <table className="mt-4 w-full text-gray-700">
      <tbody>
        {Object.entries(module).map(([key, value]) => {
          if (key === "dispatch") return null;
          return (
            <tr key={key}>
              <td className="pr-2 font-bold">{key}:</td>
              <td>{JSON.stringify(value)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const MemoryModuleCard: React.FC<IMemoryCard> = ({ module, onRemove }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    },
    []
  );
  return (
    <div className="mt-2 mb-2 ml-4 rounded-lg bg-white p-6 shadow-lg">
      <h2 className="mb-4 w-full text-center align-middle text-2xl font-bold">
        Module Functions
      </h2>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex w-full">
          <button
            className="mr-2 w-full rounded-lg bg-[hsl(280,100%,70%)] px-4 py-2 font-bold text-white hover:bg-indigo-600"
            onClick={() => {
              if (inputValue.length > 1) module?.createModule(inputValue);
            }}
          >
            Create Module
          </button>
          <button
            className="mr-2 w-full rounded-lg bg-[hsl(280,100%,70%)] px-4 py-2 font-bold text-white hover:bg-indigo-600"
            onClick={() => onRemove(inputValue)}
          >
            Delete Module
          </button>
          <button
            className="mr-2 w-full rounded-lg bg-[hsl(280,100%,70%)] px-4 py-2 font-bold text-white hover:bg-indigo-600"
            onClick={() => module?.setKey("search-value", inputValue)}
          >
            Add Cache Key
          </button>
        </div>
      </div>
      <div className="flex items-center">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="mr-2 w-full rounded-lg bg-gray-200 px-4 py-2"
          placeholder="Cache value"
        />
      </div>
      <DisplayModuleData module={module} />
    </div>
  );
};

export default MemoryModuleCard;
