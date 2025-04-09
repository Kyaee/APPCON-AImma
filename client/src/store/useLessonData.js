import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useLessonFetchStore = create(
  persist((set) => ({
    fetch: null,
    setFetch: (data) => set({ fetch: data }),
  }))
);
