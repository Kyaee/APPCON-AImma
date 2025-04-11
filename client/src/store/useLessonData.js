import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useLessonFetchStore = create(
  persist((set) => ({
    fetch: null,
    setFetch: (data) => set({ fetch: data }),

    generated_assessment: false,
    setGeneratedAssessment: (data) => set({ generated_assessment: data }),
  }))
);
