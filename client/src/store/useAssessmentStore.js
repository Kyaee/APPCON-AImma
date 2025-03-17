import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAssessmentStore = create(
  persist(
    (set) => ({
      // User information
      language: 'English',
      userType: null,
      educationLevel: null,
      proficiencySkills: [],
      appGoals: '',
      dailyTimeCommitment: null,
      assessmentAnswers: {},
      
      // Actions
      setLanguage: (language) => set({ language }),
      setUserType: (userType) => set({ userType }),
      setEducationLevel: (level) => set({ educationLevel: level }),
      setProficiencySkills: (skills) => set({ proficiencySkills: skills }),
      setAppGoals: (goals) => set({ appGoals: goals }),
      setDailyTimeCommitment: (time) => set({ dailyTimeCommitment: time }),
      setAssessmentAnswer: (question, answer) => set(state => ({
        assessmentAnswers: {
          ...state.assessmentAnswers,
          [question]: answer
        }
      })),
      
      // Reset all data
      resetAssessment: () => set({
        language: 'English',
        userType: null,
        educationLevel: null,
        proficiencySkills: [],
        appGoals: '',
        dailyTimeCommitment: null,
        assessmentAnswers: {}
      })
    }),
    {
      name: 'user-assessment-storage'
    }
  )
);

export default useAssessmentStore;