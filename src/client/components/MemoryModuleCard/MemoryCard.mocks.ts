import { IMemoryCard } from "./MemoryModuleCard";

const base: IMemoryCard = {
  title: "test",
  module: {} as any,
  onRemove: function (_key: string): void {
    throw new Error("Function not implemented.");
  },
};

export const mockMemoryCardMocks = {
  base,
};
