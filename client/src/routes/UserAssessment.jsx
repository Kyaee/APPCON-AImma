import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AssessmentLayout from "@/components/assessment/AssessmentLayout";
import { assessmentFlow } from "@/lib/assessment-flow";
import { useAssessmentStore } from "@/store/useAssessmentStore";
import { useGenerateRoadmap } from "@/api/INSERT";
import { useAuth } from "@/config/AuthContext";
import Loading from "@/routes/Loading";
import AssessmentIntro from "@/components/assessment/AssessmentIntro";

// Import step components
import UserTypeStep from "@/components/assessment/steps/UserTypeStep";
import EducationLevelStep from "@/components/assessment/steps/EducationLevelStep";
import ExperienceStep from "@/components/assessment/steps/ExperienceStep";
import PreviousExperienceStep from "@/components/assessment/steps/PreviousExperienceStep";
import CareerTransitionStep from "@/components/assessment/steps/CareerTransitionStep";
import DailyGoalStep from "@/components/assessment/steps/DailyGoalStep";
import HSQuestionsStep from "@/components/assessment/steps/student/HSQuestionsStep";
import CollegeQuestionsStep from "@/components/assessment/steps/student/CollegeQuestionsStep";
import GradQuestionsStep from "@/components/assessment/steps/student/GradQuestionsStep";
import EntryQuestionsStep from "@/components/assessment/steps/professional/EntryQuestionsStep";
import MidQuestionsStep from "@/components/assessment/steps/professional/MidQuestionsStep";
import SeniorQuestionsStep from "@/components/assessment/steps/professional/SeniorQuestionsStep";
import TechInterestStep from "@/components/assessment/steps/TechInterestStep";
import CompleteStep from "@/components/assessment/steps/CompletionStep";

export default function UserAssessment() {
  // Loading states
  const [isReady, setIsReady] = useState(false);
  const [showIntro, setShowIntro] = useState(true); // Start by showing intro

  // Store actions and state
  const setUserType = useAssessmentStore((state) => state.setUserType);
  const setEducationLevel = useAssessmentStore(
    (state) => state.setEducationLevel
  );
  const setCareerTransition = useAssessmentStore(
    (state) => state.setCareerTransition
  );
  const setPreviousExperience = useAssessmentStore(
    (state) => state.setPreviousExperience
  );
  const setDailyGoal = useAssessmentStore((state) => state.setDailyGoal);
  const setTechnicalInterest = useAssessmentStore(
    (state) => state.setTechnicalInterest
  );
  const setTechnicalAnswers = useAssessmentStore(
    (state) => state.setTechnicalAnswers
  );
  const resetAssessment = useAssessmentStore((state) => state.resetAssessment);
  const { createRoadmap } = useGenerateRoadmap();
  const { session } = useAuth();

  // Local state
  const [currentStep, setCurrentStep] = useState(() => {
    const saved = localStorage.getItem("currentAssessmentPage");
    return saved || "userType";
  });

  const [selectedType, setSelectedType] = useState(() => {
    const saved = localStorage.getItem("selectedType");
    return saved ? JSON.parse(saved) : null;
  });

  const [selectedLevel, setSelectedLevel] = useState(() => {
    const saved = localStorage.getItem("selectedLevel");
    return saved ? JSON.parse(saved) : null;
  });

  const [previousExperience, setPreviousExp] = useState({
    lastRole: "",
    yearsExperience: "",
    reasonForChange: "",
  });

  const [transition, setTransition] = useState({
    currentField: "",
    desiredField: "",
    transitionReason: "",
  });

  const [dailyGoal, setDailyGoalState] = useState(null);
  const [technicalInterest, setTechnicalInterestState] = useState(null);
  const [technicalAnswers, setTechnicalAnswersState] = useState({});

  // Student form data
  const [hsFormData, setHsFormData] = useState({
    strand: "",
    planningCollege: null,
    interestAreas: [],
    careerGoals: "",
  });

  const [collegeFormData, setCollegeFormData] = useState({
    course: "",
    yearLevel: "",
    technicalSkills: [],
    careerPath: "",
  });

  const [gradFormData, setGradFormData] = useState({
    fieldStudy: "",
    researchFocus: "",
    industryExperience: null,
    careerPlans: "",
    technicalExpertise: 3,
    researchInterests: [],
  });

  // Professional form data
  const [entryFormData, setEntryFormData] = useState(() => {
    const saved = localStorage.getItem("entryLevelSavepoint");
    return saved
      ? JSON.parse(saved)
      : {
          currentRole: "",
          companyIndustry: "",
          skillsUsed: [],
        };
  });

  const [midFormData, setMidFormData] = useState(() => {
    const saved = localStorage.getItem("midLevelSavepoint");
    return saved
      ? JSON.parse(saved)
      : {
          currentRole: "",
          companyIndustry: "",
          skillsUsed: [],
        };
  });

  const [seniorFormData, setSeniorFormData] = useState(() => {
    const saved = localStorage.getItem("seniorLevelSavepoint");
    return saved
      ? JSON.parse(saved)
      : {
          currentRole: "",
          companyIndustry: "",
          skillsUsed: [],
        };
  });

  const [feedback, setFeedback] = useState("");
  const [techQuestionsVisible, setTechQuestionsVisible] = useState(false);

  // Refs for form handling
  const formRefs = {
    previousExperience: useRef(null),
    careerTransition: useRef(null),
    hsQuestions: useRef(null),
    collegeQuestions: useRef(null),
    gradQuestions: useRef(null),
    entryQuestions: useRef(null),
    midQuestions: useRef(null),
    seniorQuestions: useRef(null),
    techInterest: useRef(null),
    complete: useRef(null),
  };

  const navigate = useNavigate();

  // Set up loading effect - wait for all necessary data
  useEffect(() => {
    // Reset assessment when component mounts
    resetAssessment();

    // Use a small timeout to ensure everything is loaded
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 800);

    return () => clearTimeout(timer);
  }, [resetAssessment]);

  // Effects for localStorage handling
  useEffect(() => {
    localStorage.setItem("currentAssessmentPage", currentStep);
  }, [currentStep]);

  useEffect(() => {
    if (selectedType)
      localStorage.setItem("selectedType", JSON.stringify(selectedType));
    if (selectedLevel)
      localStorage.setItem("selectedLevel", JSON.stringify(selectedLevel));
  }, [selectedType, selectedLevel]);

  useEffect(() => {
    // Load previous experience data
    const savedPreviousExp = localStorage.getItem("previousExpData");
    if (savedPreviousExp) {
      setPreviousExp(JSON.parse(savedPreviousExp));
    }

    // Load career transition data
    const savedTransition = localStorage.getItem("careerTransitionData");
    if (savedTransition) {
      setTransition(JSON.parse(savedTransition));
    }

    // Load HS form data
    const savedHsResponses = localStorage.getItem("hsResponses");
    if (savedHsResponses) {
      setHsFormData(JSON.parse(savedHsResponses));
    }

    // Load college form data
    const savedCollegeResponses = localStorage.getItem("collegeResponses");
    if (savedCollegeResponses) {
      setCollegeFormData(JSON.parse(savedCollegeResponses));
    }

    // Load graduate form data
    const savedGradResponses = localStorage.getItem("gradResponses");
    if (savedGradResponses) {
      setGradFormData(JSON.parse(savedGradResponses));
    }

    // Load daily goal
    const savedDailyGoal = localStorage.getItem("daily-goal");
    if (savedDailyGoal) {
      setDailyGoalState(savedDailyGoal);
    }

    // Load technical interest
    const savedTechnicalInterest = localStorage.getItem("technicalInterest");
    if (savedTechnicalInterest) {
      setTechnicalInterestState(JSON.parse(savedTechnicalInterest));
    }

    // Load technical answers
    const savedTechnicalAnswers = localStorage.getItem("technicalAnswers");
    if (savedTechnicalAnswers) {
      setTechnicalAnswersState(JSON.parse(savedTechnicalAnswers));
    }
  }, []);

  useEffect(() => {
    if (technicalInterest) {
      localStorage.setItem(
        "technicalInterest",
        JSON.stringify(technicalInterest)
      );
    }
  }, [technicalInterest]);

  useEffect(() => {
    if (Object.keys(technicalAnswers).length > 0) {
      localStorage.setItem(
        "technicalAnswers",
        JSON.stringify(technicalAnswers)
      );
    }
  }, [technicalAnswers]);

  // Handlers
  const handleTypeSelection = (option) => {
    setSelectedType(option);
    setUserType(option);

    // Directly navigate to next step based on selection
    if (option.id === "student") {
      navigateToNextStep("educationLevel");
    } else if (option.id === "professional") {
      navigateToNextStep("experience");
    } else if (option.id === "jobSeeker") {
      navigateToNextStep("previousExperience");
    } else if (option.id === "careerShifter") {
      navigateToNextStep("careerTransition");
    }
  };

  const handleLevelSelection = (option) => {
    setSelectedLevel(option);
    setEducationLevel(option);

    // For education level selection
    if (currentStep === "educationLevel") {
      localStorage.setItem("educationLevelData", JSON.stringify(option));

      if (option.id === "highSchool") {
        navigateToNextStep("hsQuestions");
      } else if (option.id === "college") {
        navigateToNextStep("collegeQuestions");
      } else if (option.id === "graduateSchool") {
        navigateToNextStep("gradQuestions");
      }
    }

    // For experience level selection
    if (currentStep === "experience") {
      localStorage.setItem("yearsOfExpSavepoint", JSON.stringify(option));

      if (option.id === "entryLevel") {
        navigateToNextStep("entryQuestions");
      } else if (option.id === "midLevel") {
        navigateToNextStep("midQuestions");
      } else if (option.id === "seniorLevel") {
        navigateToNextStep("seniorQuestions");
      }
    }
  };

  const handleDailyGoalSelect = (value) => {
    setDailyGoalState(value);
    setDailyGoal(value);
    localStorage.setItem("daily-goal", value);
    navigateToNextStep("techInterest");
  };

  const handleTechInterestSelect = (option) => {
    // Set both the local state and global store
    setTechnicalInterestState(option);
    setTechnicalInterest(option);

    // Ensure it's properly stored in localStorage
    localStorage.setItem("technicalInterest", JSON.stringify(option));

    // Show questions after selecting interest
    setTechQuestionsVisible(true);
  };

  const handleTechAnswerChange = (questionId, value) => {
    const updatedAnswers = {
      ...technicalAnswers,
      [questionId]: value,
    };
    setTechnicalAnswersState(updatedAnswers);
    setTechnicalAnswers(updatedAnswers);
  };

  const handleFeedbackChange = (value) => {
    setFeedback(value);
  };

  const handleSubmitTechAnswers = () => {
    navigateToNextStep("complete");
  };

  const handleSubmitCompletion = () => {
    createRoadmap();
    // Navigate to the process dashboard to generate the roadmap
    navigate(`/dashboard/p?user=${session?.user?.id}`);
  };

  const handleFormSubmission = () => {
    switch (currentStep) {
      case "previousExperience":
        // Get form data directly from the form rather than relying on state
        const previousExperienceForm = formRefs.previousExperience.current;
        if (previousExperienceForm) {
          const lastRoleInput = previousExperienceForm.querySelector(
            'input[name="lastRole"]'
          );
          const yearsExpSelect = previousExperienceForm.querySelector(
            'select[name="yearsExperience"]'
          );
          const reasonInput = previousExperienceForm.querySelector(
            'textarea[name="reasonForChange"]'
          );

          if (lastRoleInput && yearsExpSelect && reasonInput) {
            const formData = {
              lastRole: lastRoleInput.value.trim(),
              yearsExperience: yearsExpSelect.value.trim(),
              reasonForChange: reasonInput.value.trim(),
            };

            if (
              formData.lastRole &&
              formData.yearsExperience &&
              formData.reasonForChange
            ) {
              setPreviousExperience(formData);
              setPreviousExp(formData);
              localStorage.setItem("previousExpData", JSON.stringify(formData));
              navigateToNextStep("dailyGoal");
            } else {
              alert("Please fill in all fields for Previous Experience");
            }
          } else {
            alert("Please fill in all fields for Previous Experience");
          }
        }
        break;

      case "careerTransition":
        // Get form data directly from the form rather than relying on state
        const careerTransitionForm = formRefs.careerTransition.current;
        if (careerTransitionForm) {
          const currentFieldInput = careerTransitionForm.querySelector(
            'input[name="currentField"]'
          );
          const desiredFieldSelect = careerTransitionForm.querySelector(
            'select[name="desiredField"]'
          );
          const reasonInput = careerTransitionForm.querySelector(
            'textarea[name="transitionReason"]'
          );

          if (currentFieldInput && desiredFieldSelect && reasonInput) {
            const formData = {
              currentField: currentFieldInput.value.trim(),
              desiredField: desiredFieldSelect.value.trim(),
              transitionReason: reasonInput.value.trim(),
            };

            if (
              formData.currentField &&
              formData.desiredField &&
              formData.transitionReason
            ) {
              setCareerTransition(formData);
              setTransition(formData);
              localStorage.setItem(
                "careerTransitionData",
                JSON.stringify(formData)
              );
              navigateToNextStep("dailyGoal");
            } else {
              alert("Please fill in all fields for Career Transition");
            }
          } else {
            alert("Please fill in all fields for Career Transition");
          }
        }
        break;

      case "hsQuestions":
        const hsForm = formRefs.hsQuestions.current;
        if (hsForm) {
          // Get direct values from form elements
          const strandSelect = hsForm.querySelector('select[name="strand"]');
          const planningCollegeYes = hsForm.querySelector(
            'input[name="planningCollege"][value="true"]'
          );
          const planningCollegeNo = hsForm.querySelector(
            'input[name="planningCollege"][value="false"]'
          );
          const interestCheckboxes = hsForm.querySelectorAll(
            'input[name="interestAreas"]:checked'
          );
          const goalsInput = hsForm.querySelector(
            'textarea[name="careerGoals"]'
          );

          const interests = Array.from(interestCheckboxes).map(
            (cb) => cb.value
          );
          const planningCollege = planningCollegeYes?.checked
            ? true
            : planningCollegeNo?.checked
            ? false
            : null;

          if (
            strandSelect?.value &&
            planningCollege !== null &&
            interests.length > 0 &&
            goalsInput?.value.trim()
          ) {
            const formData = {
              strand: strandSelect.value,
              planningCollege: planningCollege,
              interestAreas: interests,
              careerGoals: goalsInput.value.trim(),
            };

            setHsFormData(formData);
            localStorage.setItem("hsResponses", JSON.stringify(formData));
            localStorage.setItem("hsQuestionsSavepoint", "true");
            navigateToNextStep("dailyGoal");
          } else {
            alert("Please complete all fields before proceeding");
          }
        }
        break;

      case "collegeQuestions":
        const collegeForm = formRefs.collegeQuestions.current;
        if (collegeForm) {
          // Get direct values from form elements
          const courseInput = collegeForm.querySelector('input[name="course"]');
          const yearLevelSelect = collegeForm.querySelector(
            'select[name="yearLevel"]'
          );
          const skillsCheckboxes = collegeForm.querySelectorAll(
            'input[name="technicalSkills"]:checked'
          );
          const careerPathInput = collegeForm.querySelector(
            'input[name="careerPath"]'
          );

          const skills = Array.from(skillsCheckboxes).map((cb) => cb.value);

          if (
            courseInput?.value.trim() &&
            yearLevelSelect?.value &&
            skills.length > 0 &&
            careerPathInput?.value.trim()
          ) {
            const formData = {
              course: courseInput.value.trim(),
              yearLevel: yearLevelSelect.value,
              technicalSkills: skills,
              careerPath: careerPathInput.value.trim(),
            };

            setCollegeFormData(formData);
            localStorage.setItem("collegeResponses", JSON.stringify(formData));
            localStorage.setItem("collegeQuestionsSavepoint", "true");
            navigateToNextStep("dailyGoal");
          } else {
            alert("Please complete all fields before proceeding");
          }
        }
        break;

      case "gradQuestions":
        const gradForm = formRefs.gradQuestions.current;
        if (gradForm) {
          // Get direct values from form elements
          const fieldInput = gradForm.querySelector('input[name="fieldStudy"]');
          const researchInput = gradForm.querySelector(
            'input[name="researchFocus"]'
          );
          const expYes = gradForm.querySelector(
            'input[name="industryExperience"][value="true"]'
          );
          const expNo = gradForm.querySelector(
            'input[name="industryExperience"][value="false"]'
          );
          const careerInput = gradForm.querySelector(
            'textarea[name="careerPlans"]'
          );
          const researchCheckboxes = gradForm.querySelectorAll(
            'input[name="researchInterests"]:checked'
          );

          const researchInterests = Array.from(researchCheckboxes).map(
            (cb) => cb.value
          );
          const industryExp = expYes?.checked
            ? true
            : expNo?.checked
            ? false
            : null;

          if (
            fieldInput?.value.trim() &&
            researchInput?.value.trim() &&
            industryExp !== null &&
            careerInput?.value.trim() &&
            researchInterests.length > 0
          ) {
            const formData = {
              fieldStudy: fieldInput.value.trim(),
              researchFocus: researchInput.value.trim(),
              industryExperience: industryExp,
              careerPlans: careerInput.value.trim(),
              technicalExpertise: gradFormData.technicalExpertise || 3,
              researchInterests: researchInterests,
            };

            setGradFormData(formData);
            localStorage.setItem("gradResponses", JSON.stringify(formData));
            localStorage.setItem("gradQuestionsSavepoint", "true");
            navigateToNextStep("dailyGoal");
          } else {
            alert("Please complete all fields before proceeding");
          }
        }
        break;

      case "entryQuestions":
        const entryForm = formRefs.entryQuestions.current;
        if (entryForm) {
          // Get direct values from form elements
          const roleInput = entryForm.querySelector(
            'input[name="currentRole"]'
          );
          const industrySelect = entryForm.querySelector(
            'select[name="companyIndustry"]'
          );
          const skillsCheckboxes = entryForm.querySelectorAll(
            'input[name="skillsUsed"]:checked'
          );

          const skills = Array.from(skillsCheckboxes).map((cb) => cb.value);

          if (
            roleInput?.value.trim() &&
            industrySelect?.value &&
            skills.length > 0
          ) {
            const formData = {
              currentRole: roleInput.value.trim(),
              companyIndustry: industrySelect.value,
              skillsUsed: skills,
            };

            setEntryFormData(formData);
            localStorage.setItem(
              "entryLevelSavepoint",
              JSON.stringify(formData)
            );
            localStorage.setItem(
              "entryLevelResponses",
              JSON.stringify(formData)
            );
            navigateToNextStep("dailyGoal");
          } else {
            alert("Please complete all fields before proceeding");
          }
        }
        break;

      case "midQuestions":
        const midForm = formRefs.midQuestions.current;
        if (midForm) {
          // Get direct values from form elements
          const roleInput = midForm.querySelector('input[name="currentRole"]');
          const industrySelect = midForm.querySelector(
            'select[name="companyIndustry"]'
          );
          const skillsCheckboxes = midForm.querySelectorAll(
            'input[name="skillsUsed"]:checked'
          );

          const skills = Array.from(skillsCheckboxes).map((cb) => cb.value);

          if (
            roleInput?.value.trim() &&
            industrySelect?.value &&
            skills.length > 0
          ) {
            const formData = {
              currentRole: roleInput.value.trim(),
              companyIndustry: industrySelect.value,
              skillsUsed: skills,
            };

            setMidFormData(formData);
            localStorage.setItem("midLevelSavepoint", JSON.stringify(formData));
            localStorage.setItem("midLevelResponses", JSON.stringify(formData));
            navigateToNextStep("dailyGoal");
          } else {
            alert("Please complete all fields before proceeding");
          }
        }
        break;

      case "seniorQuestions":
        const seniorForm = formRefs.seniorQuestions.current;
        if (seniorForm) {
          // Get direct values from form elements
          const roleInput = seniorForm.querySelector(
            'input[name="currentRole"]'
          );
          const industrySelect = seniorForm.querySelector(
            'select[name="companyIndustry"]'
          );
          const skillsCheckboxes = seniorForm.querySelectorAll(
            'input[name="skillsUsed"]:checked'
          );

          const skills = Array.from(skillsCheckboxes).map((cb) => cb.value);

          if (
            roleInput?.value.trim() &&
            industrySelect?.value &&
            skills.length > 0
          ) {
            const formData = {
              currentRole: roleInput.value.trim(),
              companyIndustry: industrySelect.value,
              skillsUsed: skills,
            };

            setSeniorFormData(formData);
            localStorage.setItem(
              "seniorLevelSavepoint",
              JSON.stringify(formData)
            );
            localStorage.setItem(
              "seniorLevelResponses",
              JSON.stringify(formData)
            );
            navigateToNextStep("dailyGoal");
          } else {
            alert("Please complete all fields before proceeding");
          }
        }
        break;

      case "techInterest":
        if (techQuestionsVisible) {
          // For tech interest, we'll check directly if answers are complete
          const techForm = formRefs.techInterest.current;
          if (techForm) {
            if (technicalInterest && Object.keys(technicalAnswers).length > 0) {
              handleSubmitTechAnswers();
            } else {
              alert("Please complete all questions before proceeding");
            }
          }
        }
        break;

      case "complete":
        // For completion form, just submit directly
        handleSubmitCompletion();
        break;
    }
  };

  const navigateToNextStep = (step) => {
    setCurrentStep(step);
  };

  const handleBack = () => {
    if (currentStep === "userType") {
      setShowIntro(true);
      return;
    }

    // If on tech interest questions view, go back to interest selection
    if (currentStep === "techInterest" && techQuestionsVisible) {
      setTechQuestionsVisible(false);
      return;
    }

    const backMapping = {
      userType: null, // No going back from first step
      educationLevel: "userType",
      experience: "userType",
      previousExperience: "userType",
      careerTransition: "userType",
      hsQuestions: "educationLevel",
      collegeQuestions: "educationLevel",
      gradQuestions: "educationLevel",
      entryQuestions: "experience",
      midQuestions: "experience",
      seniorQuestions: "experience",
      dailyGoal: getPreviousStepForDailyGoal(),
      techInterest: "dailyGoal",
      complete: "techInterest",
    };

    const prevStep = backMapping[currentStep];
    if (prevStep) setCurrentStep(prevStep);
  };

  const handleBeginAssessment = () => {
    setShowIntro(false);
    setCurrentStep("userType"); // Start with user type selection
  };

  // Determine previous step for daily goal based on state
  function getPreviousStepForDailyGoal() {
    // We need to look at the selectedType stored in state rather than localStorage
    // to ensure we get the correct user type
    if (selectedType) {
      if (selectedType.id === "student") {
        if (localStorage.getItem("hsQuestionsSavepoint")) return "hsQuestions";
        if (localStorage.getItem("collegeQuestionsSavepoint"))
          return "collegeQuestions";
        if (localStorage.getItem("gradQuestionsSavepoint"))
          return "gradQuestions";
        return "educationLevel";
      } else if (selectedType.id === "professional") {
        const expChoice = localStorage.getItem("yearsOfExpSavepoint");
        if (expChoice) {
          const choice = JSON.parse(expChoice);
          if (choice.id === "entryLevel") return "entryQuestions";
          if (choice.id === "midLevel") return "midQuestions";
          if (choice.id === "seniorLevel") return "seniorQuestions";
        }
        return "experience";
      } else if (selectedType.id === "jobSeeker") {
        return "previousExperience";
      } else if (selectedType.id === "careerShifter") {
        return "careerTransition";
      }
    }

    // Fallback to localStorage check only if selectedType is not available
    const savedType = localStorage.getItem("selectedType");
    if (savedType) {
      const type = JSON.parse(savedType);
      if (type.id === "jobSeeker") return "previousExperience";
      if (type.id === "careerShifter") return "careerTransition";
    }

    return "userType";
  }

  // Determine the progress based on currentStep
  const getProgress = () => {
    const stepProgressMap = {
      userType: 0,
      educationLevel: 15,
      experience: 15,
      previousExperience: 15,
      careerTransition: 15,
      hsQuestions: 30,
      collegeQuestions: 30,
      gradQuestions: 30,
      entryQuestions: 30,
      midQuestions: 30,
      seniorQuestions: 30,
      dailyGoal: 50,
      techInterest: 75,
      complete: 95,
    };

    return stepProgressMap[currentStep] || 0;
  };

  // Determine the title based on currentStep and user type
  const getTitle = () => {
    // First check if we have a specific title for the current step
    const genericStepTitleMap = {
      userType: "Career Assessment",
      dailyGoal: "Daily Learning Goal",
      techInterest:
        techQuestionsVisible && technicalInterest
          ? `${technicalInterest.label || "Technical"} Questions`
          : "Technical Interests",
      complete: "Assessment Complete",
    };

    // If we have a generic title, use it
    if (genericStepTitleMap[currentStep]) {
      return genericStepTitleMap[currentStep];
    }

    // Otherwise, determine title based on user type
    if (selectedType) {
      if (selectedType.id === "student") {
        const educationStepMap = {
          educationLevel: "Skill Level Assessment",
          hsQuestions: "High School Assessment",
          collegeQuestions: "College Assessment",
          gradQuestions: "Graduate Path",
        };
        return educationStepMap[currentStep] || "Student Assessment";
      } else if (selectedType.id === "professional") {
        const professionalStepMap = {
          experience: "Years of Experience",
          entryQuestions: "Entry Level Assessment",
          midQuestions: "Middle Level Assessment",
          seniorQuestions: "Senior Level Assessment",
        };
        return professionalStepMap[currentStep] || "Professional Assessment";
      } else if (selectedType.id === "jobSeeker") {
        return currentStep === "previousExperience"
          ? "Previous Experience"
          : "Job Seeker Assessment";
      } else if (selectedType.id === "careerShifter") {
        return currentStep === "careerTransition"
          ? "Career Transition"
          : "Career Shifter Assessment";
      }
    }

    // Default title if nothing else matches
    return "Assessment";
  };

  // Render the current step with a form wrapper when appropriate
  const renderCurrentStep = () => {
    const FormWrapper = ({ children, stepName }) => {
      return (
        <form
          ref={formRefs[stepName]}
          onSubmit={(e) => {
            e.preventDefault();
            handleFormSubmission();
          }}
          className="w-full"
        >
          {children}
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="px-10 py-3 bg-brown hover:bg-dark-brown text-white rounded-md transition-colors border-2 border-black"
            >
              {stepName === "complete" ? "Continue to Dashboard" : "Continue"}
            </button>
          </div>
        </form>
      );
    };

    switch (currentStep) {
      case "userType":
        return (
          <UserTypeStep
            userTypeOptions={assessmentFlow.userType.options}
            selectedType={selectedType}
            onTypeSelect={handleTypeSelection}
          />
        );
      case "educationLevel":
        return (
          <EducationLevelStep
            selectedType={selectedType}
            selectedLevel={selectedLevel}
            educationOptions={assessmentFlow.educationLevel.options}
            onLevelSelect={handleLevelSelection}
          />
        );
      case "experience":
        return (
          <ExperienceStep
            experienceOptions={assessmentFlow.yearsExperience.options}
            selectedLevel={selectedLevel}
            onLevelSelect={handleLevelSelection}
          />
        );
      case "previousExperience":
        return (
          <FormWrapper stepName="previousExperience">
            <PreviousExperienceStep
              experience={previousExperience}
              setExperience={setPreviousExp}
            />
          </FormWrapper>
        );
      case "careerTransition":
        return (
          <FormWrapper stepName="careerTransition">
            <CareerTransitionStep
              transition={transition}
              setTransition={setTransition}
            />
          </FormWrapper>
        );
      case "hsQuestions":
        return (
          <FormWrapper stepName="hsQuestions">
            <HSQuestionsStep
              formData={hsFormData}
              setFormData={setHsFormData}
            />
          </FormWrapper>
        );
      case "collegeQuestions":
        return (
          <FormWrapper stepName="collegeQuestions">
            <CollegeQuestionsStep
              formData={collegeFormData}
              setFormData={setCollegeFormData}
            />
          </FormWrapper>
        );
      case "gradQuestions":
        return (
          <FormWrapper stepName="gradQuestions">
            <GradQuestionsStep
              formData={gradFormData}
              setFormData={setGradFormData}
            />
          </FormWrapper>
        );
      case "entryQuestions":
        return (
          <FormWrapper stepName="entryQuestions">
            <EntryQuestionsStep
              formData={entryFormData}
              setFormData={setEntryFormData}
            />
          </FormWrapper>
        );
      case "midQuestions":
        return (
          <FormWrapper stepName="midQuestions">
            <MidQuestionsStep
              formData={midFormData}
              setFormData={setMidFormData}
            />
          </FormWrapper>
        );
      case "seniorQuestions":
        return (
          <FormWrapper stepName="seniorQuestions">
            <SeniorQuestionsStep
              formData={seniorFormData}
              setFormData={setSeniorFormData}
            />
          </FormWrapper>
        );
      case "dailyGoal":
        return (
          <DailyGoalStep
            dailyGoalOptions={assessmentFlow.dailyGoal.questions[0].options}
            selectedGoal={dailyGoal}
            onGoalSelect={handleDailyGoalSelect}
          />
        );
      case "techInterest":
        return techQuestionsVisible ? (
          <FormWrapper stepName="techInterest">
            <TechInterestStep
              techInterestOptions={assessmentFlow.techInterest.options}
              selectedInterest={technicalInterest}
              onInterestSelect={handleTechInterestSelect}
              technicalAnswers={technicalAnswers}
              onAnswerChange={handleTechAnswerChange}
              showQuestions={true}
            />
          </FormWrapper>
        ) : (
          <TechInterestStep
            techInterestOptions={assessmentFlow.techInterest.options}
            selectedInterest={technicalInterest}
            onInterestSelect={handleTechInterestSelect}
            technicalAnswers={technicalAnswers}
            onAnswerChange={handleTechAnswerChange}
            showQuestions={false}
          />
        );
      case "complete":
        return (
          <FormWrapper stepName="complete">
            <CompleteStep
              title={assessmentFlow.complete.title}
              feedback={feedback}
              onFeedbackChange={handleFeedbackChange}
            />
          </FormWrapper>
        );
      default:
        return null;
    }
  };

  // If still loading, show loading state
  if (!isReady) {
    return <Loading className="flex-grow flex justify-center items-center" />;
  }

  // Show intro screen if showIntro is true (completely separate from the regular assessment layout)
  if (showIntro) {
    return <AssessmentIntro onBeginAssessment={handleBeginAssessment} />;
  }

  // Otherwise continue with the AssessmentLayout and the step content
  return (
    <AssessmentLayout
      title={getTitle()}
      progress={getProgress()}
      prevPage={
        currentStep === "userType" ? () => setShowIntro(true) : handleBack
      }
    >
      {renderCurrentStep()}
    </AssessmentLayout>
  );
}
