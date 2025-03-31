import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useFetchStore = create(
  persist((set) => ({
    fetch: null,
    setFetch: (data) => set({ fetch: data }),

    roadmap: null,
    setRoadmap: (data) => set({ roadmap: data }),
  }))
);
