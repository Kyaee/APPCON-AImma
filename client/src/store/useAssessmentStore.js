import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAssessmentStore = create(
  persist(
    (set, get) => ({
      // User information
      language: 'English',
      userType: {
        label: '',
        id: ''
      },
      educationLevel: {
        label: '',
        id: ''
      },
      proficiencySkills: [],
      appGoals: '',
      dailyTimeCommitment: null,
      assessmentAnswers: {},
      previousExperience: {
        label: '',
        answer: ''
      },
      careerTransition: {
        label: '',
        answer: ''
      },
      dailyGoal: null,
      technicalInterest: null,
      technicalAnswers: {},
      experienceDetails: {
        currentRole: '',
        companyIndustry: '',
        skillsUsed: []
      },
      educationDetails: {
        currentEducation: '',
        fieldOfStudy: '',
        academicInterests: []
      },

      // Add a debugging function
      getAssessmentData: () => {
        const state = get();
        return {
          previousExperience: state.previousExperience,
          careerTransition: state.careerTransition,
          // Add any other fields you want to debug
        };
      },
      
      // Actions      
      setLanguage: (language) => set({ language }),
      setUserType: (type) => set({ 
        userType: {
          label: type.label,
          id: type.id
        }
      }),
      setEducationLevel: (level) => set({ 
        educationLevel: {
          label: level.label,
          id: level.id
        }
      }),
      setProficiencySkills: (skills) => set({ proficiencySkills: skills }),
      setAppGoals: (goals) => set({ appGoals: goals }),
      setDailyTimeCommitment: (time) => set({ dailyTimeCommitment: time }),
      setAssessmentAnswer: (question, answer) => set(state => ({
        assessmentAnswers: {
          ...state.assessmentAnswers,
          [question]: answer
        }
      })),
      setPreviousExperience: (exp) => {
        console.log('Setting previous experience in Zustand:', exp);
        set({
          previousExperience: {
            label: exp.label,
            answer: exp.answer
          }}
        );
        // Log to confirm it was set
        const newState = get().previousExperience;
        console.log('Previous experience after setting:', newState);
      },
      setCareerTransition: (transition) => {
        console.log('Setting career transition in Zustand:', transition);
        set({
          previousExperience: {
            label: transition.label,
            answer: transition.answer
          }}
        );
        // Log to confirm it was set
        const newState = get().careerTransition;
        console.log('Career transition after setting:', newState);
      },
      setDailyGoal: (goal) => set({ dailyGoal: goal }),
      setTechnicalInterest: (interest) => set({ technicalInterest: interest }),
      setTechnicalAnswers: (answers) => set({ technicalAnswers: answers }),
      setExperienceDetails: (details) => set(state => ({
        experienceDetails: {
          ...state.experienceDetails,
          ...details
        }
      })),
      
      setEducationDetails: (details) => set(state => ({
        educationDetails: {
          ...state.educationDetails,
          ...details
        }
      })),
      
      // Reset all data
      resetAssessment: () => set({
        language: 'English',
        userType: {
          label: '',
          id: ''
        },
        educationLevel: {
          label: '',
          id: ''
        },
        proficiencySkills: [],
        appGoals: '',
        dailyTimeCommitment: null,
        assessmentAnswers: {},
        previousExperience: {
          role: '',
          experience: '',
          reason: ''
        },
        careerTransition: {
          from: '',
          to: '',
          reason: ''
        },
        dailyGoal: null,
        technicalInterest: null,
        technicalAnswers: {},
        experienceDetails: {
          currentRole: '',
          companyIndustry: '',
          skillsUsed: []
        },
        educationDetails: {
          currentEducation: '',
          fieldOfStudy: '',
          academicInterests: []
        }
      })
    }),
    {
      name: 'user-assessment-storage'
    }
  )
);

// Add a utility debug function that can be called anywhere
// export const debugZustandStore = () => {
//   const state = useAssessmentStore.getState();
//   console.log('Current Zustand store state:');
//   console.log('- Previous Experience:', state.previousExperience);
//   console.log('- Career Transition:', state.careerTransition);
//   return state;
// };

