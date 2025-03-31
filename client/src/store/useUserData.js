import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUserDataStore = create(
  persist(
    (set) => ({
      userData: [],
      setUserData: (data) => set({ userData: data }),
})))