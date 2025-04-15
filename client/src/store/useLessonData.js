import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useLessonFetchStore = create(
persist(
  (set, get) => ({
    fetch: null,
    setFetch: (data) => set({ fetch: data }),
    generated_assessment: false,
    setGeneratedAssessment: (data) => set({ generated_assessment: data }),
    hydrated: false,

    scrollProgress: 1,
    setScrollProgress: (progress) => set({ scrollProgress: progress }),
  }),
  {
    name: "lesson-fetch-store",
    onRehydrateStorage: () => (state) => {
      state.hydrated = true;
    },
  }
)
);
