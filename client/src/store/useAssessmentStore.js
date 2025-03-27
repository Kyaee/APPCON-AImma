import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAssessmentStore = create(
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
      previousExperience: {
        lastRole: '',
        yearsExperience: '',
        reasonForChange: ''
      },
      careerTransition: {
        currentField: '',
        desiredField: '',
        transitionReason: ''
      },
      dailyGoal: null,
      technicalInterest: null,
      technicalAnswers: {},

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
      transition: (data) => set({ data }),
      setCareerTransition: (data) => set({ data }),
      setDailyGoal: (goal) => set({ dailyGoal: goal }),
      setTechnicalInterest: (interest) => set({ technicalInterest: interest }),
      setTechnicalAnswers: (answers) => set({ technicalAnswers: answers }),
      
      // Reset all data
      resetAssessment: () => set({
        language: 'English',
        userType: null,
        educationLevel: null,
        proficiencySkills: [],
        appGoals: '',
        dailyTimeCommitment: null,
        assessmentAnswers: {},
        previousExperience: {
          lastRole: '',
          yearsExperience: '',
          reasonForChange: ''
        },
        careerTransition: {
          currentField: '',
          desiredField: '',
          transitionReason: ''
        },
        dailyGoal: null,
        technicalInterest: null,
        technicalAnswers: {}
      })
    }),
    {
      name: 'user-assessment-storage'
    }
  )
);

