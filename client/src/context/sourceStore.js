import { create } from "zustand";
import api from "@/services/api/api";
export const useSourceStore = create((set) => ({
  sources: [],
  sourceMap: {},
  fetchSources: async () => {
    const res = await api.get("/sources");
    const sources = res.data;
    const sourceMap = sources.reduce((acc, source) => {
      acc[source._id] = source.name;
      return acc;
    }, {});
    set({ sources, sourceMap });
    return sources;
  },

  updateSource: (id, amount) => {
    set((state) => ({
      sources: state.sources.map((source) =>
        source._id === id
          ? { ...source, balance: parseInt(source.balance) + parseInt(amount) }
          : source
      ),
    }));
  },
  deleteSource: (id) => {
    set((state) => ({
      sources: state.sources.filter((source) => source._id !== id),
    }));
  },
  setSources: (sources) => set({ sources }),
}));
