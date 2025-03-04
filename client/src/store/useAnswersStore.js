import { create } from 'zustand'

// questionsStore.js

export const useAnswersStore = create((set) => ({
  answers: [],
  setAnswer: (questionNumber, value) => set((state) => ({
    answers: [
      ...state.answers.filter(a => a.questionNumber !== questionNumber),
      { questionNumber, value }
    ]
  })),
  resetAnswers: () => set({ answers: [] })
}))
