import { create } from "zustand";

export const useSourceStore = create((set) => ({
  sources: [],
  setSources: (sources) => set({ sources }),
}));
