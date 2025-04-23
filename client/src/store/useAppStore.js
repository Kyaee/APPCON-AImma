import { create } from 'zustand';

// Zustand store for managing isAssessed state
const useAppStore = create((set) => ({
  isAssessed: false,
  setAssessed: (value) => set({ isAssessed: value }),
}));

export default useAppStore;