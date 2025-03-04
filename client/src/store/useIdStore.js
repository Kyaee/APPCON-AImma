import { create } from 'zustand'

export const useIdStore = create((set) => ({
  id: 0,
  setId: (id) => set({ id })
}))

