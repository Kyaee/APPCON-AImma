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
  const [showIntro, setShowIntro] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  // Store actions and state
  const {
    setUserType,
    setEducationLevel,
    setCareerTransition,
    setPreviousExperience,
    setDailyGoal,
    setTechnicalInterest,
    setTechnicalAnswers,
    resetAssessment,
  } = useAssessmentStore((state) => state);

  const { createRoadmap } = useGenerateRoadmap();
  const { session } = useAuth();
  const navigate = useNavigate();

  // Core assessment state - removed localStorage dependencies
  const [currentStep, setCurrentStep] = useState("userType");
  const [selectedType, setSelectedType] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);

  // State for different user types - with default values
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
  const [feedback, setFeedback] = useState("");
  const [techQuestionsVisible, setTechQuestionsVisible] = useState(false);

  // Form data for different user types - with default values
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

  const [entryFormData, setEntryFormData] = useState({
    currentRole: "",
    companyIndustry: "",
    skillsUsed: [],
  });

  const [midFormData, setMidFormData] = useState({
    currentRole: "",
    companyIndustry: "",
    skillsUsed: [],
  });

  const [seniorFormData, setSeniorFormData] = useState({
    currentRole: "",
    companyIndustry: "",
    skillsUsed: [],
  });

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

  // Component initialization - simplified without localStorage
  useEffect(() => {
    resetAssessment();
    const timer = setTimeout(() => setIsReady(true), 800);
    return () => clearTimeout(timer);
  }, [resetAssessment]);

  // Handlers for navigation and form submission
  const handleTypeSelection = (option) => {
    setSelectedType(option);
    setUserType(option);

    const nextSteps = {
      student: "educationLevel",
      professional: "experience",
      jobSeeker: "previousExperience",
      careerShifter: "careerTransition",
    };
    navigateToNextStep(nextSteps[option.id]);
  };

  const handleLevelSelection = (option) => {
    setSelectedLevel(option);
    setEducationLevel(option);

    if (currentStep === "educationLevel") {
      const nextSteps = {
        highSchool: "hsQuestions",
        college: "collegeQuestions",
        graduateSchool: "gradQuestions",
      };
      navigateToNextStep(nextSteps[option.id]);
    } else if (currentStep === "experience") {
      const nextSteps = {
        entryLevel: "entryQuestions",
        midLevel: "midQuestions",
        seniorLevel: "seniorQuestions",
      };
      navigateToNextStep(nextSteps[option.id]);
    }
  };

  const handleDailyGoalSelect = (value) => {
    setDailyGoalState(value);
    setDailyGoal(value);
    navigateToNextStep("techInterest");
  };

  const handleTechInterestSelect = (option) => {
    setTechnicalInterestState(option);
    setTechnicalInterest(option);
    setTechQuestionsVisible(true);
  };

  const handleTechAnswerChange = (questionId, value) => {
    const updatedAnswers = { ...technicalAnswers, [questionId]: value };
    setTechnicalAnswersState(updatedAnswers);
    setTechnicalAnswers(updatedAnswers);
  };

  const handleFeedbackChange = (value) => setFeedback(value);

  const syncFormRef = (refName) => {
    const formRef = formRefs[refName].current;
    if (formRef) {
      const syncButton = formRef.querySelector(
        'button[style*="display: none"]'
      );
      if (syncButton) syncButton.dispatchEvent(new Event("syncToParent"));
    }
  };

  const handleSubmitCompletion = async () => {
    setIsGenerating(true);

    // Compile all assessment data
    const assessmentData = {
      userType: selectedType,
      educationLevel: selectedLevel,
      dailyGoal: dailyGoal,
      technicalInterest: technicalInterest,
      technicalAnswers: technicalAnswers,
      previousExperience: previousExperience,
      careerTransition: transition,
      feedback: feedback,
      formData: getFormDataByUserType(),
    };

    // Data for roadmap generation
    const userData = {
      user_id: session?.user?.id,
      roadmap_name: `${selectedType?.label || "Custom"} Learning Path`,
      description: `Personalized learning path based on ${
        selectedType?.label || "user"
      } assessment.`,
      daily_goal:
        typeof dailyGoal === "number"
          ? dailyGoal.toString()
          : dailyGoal || "30min",
      technicalInterest: technicalInterest?.label || null,
      technicalAnswers:
        Object.keys(technicalAnswers).length > 0 ? technicalAnswers : null,
    };

    try {
      console.log("Generating roadmap with user data:", userData);
      const result = await createRoadmap(userData);
      console.log("Roadmap generation completed successfully", result);
      navigate(`/dashboard/${session?.user?.id}?t=${Date.now()}`);
    } catch (error) {
      console.error("Error generating roadmap:", error);
      setIsGenerating(false);
      alert("Failed to generate your roadmap. Please try again.");
    }
  };

  // Helper function to get form data based on user type
  const getFormDataByUserType = () => {
    if (selectedType?.id === "student") {
      if (selectedLevel?.id === "highSchool") return hsFormData;
      if (selectedLevel?.id === "college") return collegeFormData;
      if (selectedLevel?.id === "graduateSchool") return gradFormData;
    } else if (selectedType?.id === "professional") {
      if (selectedLevel?.id === "entryLevel") return entryFormData;
      if (selectedLevel?.id === "midLevel") return midFormData;
      if (selectedLevel?.id === "seniorLevel") return seniorFormData;
    }
    return {};
  };

  // Form submission validation and handling - removed localStorage dependencies
  const handleFormSubmission = () => {
    // Form validation object - key is step name, value is validation function
    const formValidations = {
      previousExperience: () => {
        syncFormRef("previousExperience");
        if (
          previousExperience.lastRole.trim() !== "" &&
          previousExperience.yearsExperience.trim() !== "" &&
          previousExperience.reasonForChange.trim() !== ""
        ) {
          setPreviousExperience(previousExperience);
          return "dailyGoal";
        }
        alert("Please fill in all fields for Previous Experience");
        return null;
      },
      careerTransition: () => {
        syncFormRef("careerTransition");
        if (
          transition.currentField.trim() !== "" &&
          transition.desiredField.trim() !== "" &&
          transition.transitionReason.trim() !== ""
        ) {
          setCareerTransition(transition);
          return "dailyGoal";
        }
        alert("Please fill in all fields for Career Transition");
        return null;
      },
      hsQuestions: () => {
        syncFormRef("hsQuestions");
        if (
          hsFormData.strand &&
          hsFormData.planningCollege !== null &&
          hsFormData.interestAreas.length > 0 &&
          hsFormData.careerGoals
        ) {
          return "dailyGoal";
        }
        alert("Please complete all fields before proceeding");
        return null;
      },
      collegeQuestions: () => {
        syncFormRef("collegeQuestions");
        if (
          collegeFormData.yearLevel &&
          collegeFormData.currentCourse &&
          collegeFormData.internshipStatus !== null &&
          collegeFormData.targetIndustry
        ) {
          return "dailyGoal";
        }
        alert("Please complete all fields before proceeding");
        return null;
      },
      gradQuestions: () => {
        syncFormRef("gradQuestions");
        if (
          gradFormData.fieldStudy &&
          gradFormData.researchFocus &&
          gradFormData.industryExperience !== null &&
          gradFormData.careerPlans &&
          gradFormData.researchInterests.length > 0
        ) {
          return "dailyGoal";
        }
        alert("Please complete all fields before proceeding");
        return null;
      },
      entryQuestions: () => {
        syncFormRef("entryQuestions");
        if (
          entryFormData.currentRole &&
          entryFormData.companyIndustry &&
          entryFormData.skillsUsed.length > 0
        ) {
          return "dailyGoal";
        }
        alert("Please complete all fields before proceeding");
        return null;
      },
      midQuestions: () => {
        syncFormRef("midQuestions");
        if (
          midFormData.currentRole &&
          midFormData.companyIndustry &&
          midFormData.skillsUsed.length > 0
        ) {
          return "dailyGoal";
        }
        alert("Please complete all fields before proceeding");
        return null;
      },
      seniorQuestions: () => {
        syncFormRef("seniorQuestions");
        if (
          seniorFormData.currentRole &&
          seniorFormData.companyIndustry &&
          seniorFormData.skillsUsed.length > 0
        ) {
          return "dailyGoal";
        }
        alert("Please complete all fields before proceeding");
        return null;
      },
      techInterest: () => {
        if (techQuestionsVisible) {
          syncFormRef("techInterest");
          return "complete";
        }
        return null;
      },
      complete: () => {
        syncFormRef("complete");
        handleSubmitCompletion();
        return null;
      },
    };

    if (formValidations[currentStep]) {
      const nextStep = formValidations[currentStep]();
      if (nextStep) navigateToNextStep(nextStep);
    }
  };

  // Simplified navigation function without localStorage
  const navigateToNextStep = (step) => {
    setCurrentStep(step);
  };

  // Back button logic - simplified without localStorage
  const handleBack = () => {
    if (currentStep === "userType") {
      setShowIntro(true);
      return;
    }

    if (currentStep === "techInterest" && techQuestionsVisible) {
      setTechQuestionsVisible(false);
      return;
    }

    const backMapping = {
      userType: null,
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
    setCurrentStep("userType");
  };

  // Logic to determine the previous step without localStorage
  function getPreviousStepForDailyGoal() {
    if (selectedType) {
      if (selectedType.id === "student") {
        if (selectedLevel) {
          if (selectedLevel.id === "highSchool") return "hsQuestions";
          if (selectedLevel.id === "college") return "collegeQuestions";
          if (selectedLevel.id === "graduateSchool") return "gradQuestions";
        }
        return "educationLevel";
      } else if (selectedType.id === "professional") {
        if (selectedLevel) {
          if (selectedLevel.id === "entryLevel") return "entryQuestions";
          if (selectedLevel.id === "midLevel") return "midQuestions";
          if (selectedLevel.id === "seniorLevel") return "seniorQuestions";
        }
        return "experience";
      } else if (selectedType.id === "jobSeeker") {
        return "previousExperience";
      } else if (selectedType.id === "careerShifter") {
        return "careerTransition";
      }
    }

    return "userType";
  }

  // UI helpers
  const getProgress = () => {
    const progressMap = {
      userType: 0,
      educationLevel: 16,
      experience: 16,
      previousExperience: 16,
      careerTransition: 16,
      hsQuestions: 32,
      collegeQuestions: 32,
      gradQuestions: 32,
      entryQuestions: 32,
      midQuestions: 32,
      seniorQuestions: 32,
      dailyGoal: 52,
      techInterest: 80,
      complete: 100,
    };
    return progressMap[currentStep] || 0;
  };

  const getTitle = () => {
    // Generic step titles
    const genericTitles = {
      userType: "Career Assessment",
      dailyGoal: "Daily Learning Goal",
      techInterest:
        techQuestionsVisible && technicalInterest
          ? `${technicalInterest.label || "Technical"} Questions`
          : "Technical Interests",
      complete: "Assessment Complete",
    };

    if (genericTitles[currentStep]) return genericTitles[currentStep];

    // Type-specific titles
    if (selectedType) {
      const titleMappings = {
        student: {
          educationLevel: "Skill Level Assessment",
          hsQuestions: "High School Assessment",
          collegeQuestions: "College Assessment",
          gradQuestions: "Graduate Path",
        },
        professional: {
          experience: "Years of Experience",
          entryQuestions: "Entry Level Assessment",
          midQuestions: "Middle Level Assessment",
          seniorQuestions: "Senior Level Assessment",
        },
        jobSeeker: {
          previousExperience: "Previous Experience",
        },
        careerShifter: {
          careerTransition: "Career Transition",
        },
      };

      const typeSpecificTitle = titleMappings[selectedType.id]?.[currentStep];
      if (typeSpecificTitle) return typeSpecificTitle;

      // Default titles based on user type
      const defaultTitles = {
        student: "Student Assessment",
        professional: "Professional Assessment",
        jobSeeker: "Job Seeker Assessment",
        careerShifter: "Career Shifter Assessment",
      };

      return defaultTitles[selectedType.id] || "Assessment";
    }

    return "Assessment";
  };

  // Render different steps with consistent wrapper
  const renderCurrentStep = () => {
    const FormWrapper = ({ children, stepName }) => (
      <div className="w-full">
        <div ref={formRefs[stepName]}>{children}</div>
        <div className="flex justify-center mt-8">
          <button
            type="button"
            onClick={handleFormSubmission}
            className="px-10 py-3 bg-brown hover:bg-dark-brown text-white rounded-md transition-colors border-2 border-black"
          >
            {stepName === "complete" ? "Continue to Dashboard" : "Continue"}
          </button>
        </div>
        <button
          type="button"
          style={{ display: "none" }}
          onClick={(e) => e.preventDefault()}
        >
          Sync
        </button>
      </div>
    );

    // Map of step names to components
    const stepComponents = {
      userType: (
        <UserTypeStep
          userTypeOptions={assessmentFlow.userType.options}
          selectedType={selectedType}
          onTypeSelect={handleTypeSelection}
        />
      ),
      educationLevel: (
        <EducationLevelStep
          selectedType={selectedType}
          selectedLevel={selectedLevel}
          educationOptions={assessmentFlow.educationLevel.options}
          onLevelSelect={handleLevelSelection}
        />
      ),
      experience: (
        <ExperienceStep
          experienceOptions={assessmentFlow.yearsExperience.options}
          selectedLevel={selectedLevel}
          onLevelSelect={handleLevelSelection}
        />
      ),
      dailyGoal: (
        <DailyGoalStep
          dailyGoalOptions={assessmentFlow.dailyGoal.questions[0].options}
          selectedGoal={dailyGoal}
          onGoalSelect={handleDailyGoalSelect}
        />
      ),
      techInterest: techQuestionsVisible ? (
        <FormWrapper stepName="techInterest">
          <TechInterestStep
            technicalInterest={technicalInterest}
            onInterestSelect={handleTechInterestSelect}
            technicalAnswers={technicalAnswers}
            onAnswerChange={handleTechAnswerChange}
            showQuestions={true}
          />
        </FormWrapper>
      ) : (
        <TechInterestStep
          technicalInterest={technicalInterest}
          onInterestSelect={handleTechInterestSelect}
          technicalAnswers={technicalAnswers}
          onAnswerChange={handleTechAnswerChange}
          showQuestions={false}
        />
      ),
    };

    // Form wrapper components
    const formStepComponents = {
      previousExperience: (
        <PreviousExperienceStep
          experience={previousExperience}
          setExperience={setPreviousExp}
        />
      ),
      careerTransition: (
        <CareerTransitionStep
          transition={transition}
          setTransition={setTransition}
        />
      ),
      hsQuestions: (
        <HSQuestionsStep formData={hsFormData} setFormData={setHsFormData} />
      ),
      collegeQuestions: (
        <CollegeQuestionsStep
          formData={collegeFormData}
          setFormData={setCollegeFormData}
        />
      ),
      gradQuestions: (
        <GradQuestionsStep
          formData={gradFormData}
          setFormData={setGradFormData}
        />
      ),
      entryQuestions: (
        <EntryQuestionsStep
          formData={entryFormData}
          setFormData={setEntryFormData}
        />
      ),
      midQuestions: (
        <MidQuestionsStep formData={midFormData} setFormData={setMidFormData} />
      ),
      seniorQuestions: (
        <SeniorQuestionsStep
          formData={seniorFormData}
          setFormData={setSeniorFormData}
        />
      ),
      complete: (
        <CompleteStep
          title={assessmentFlow.complete.title}
          feedback={feedback}
          onFeedbackChange={handleFeedbackChange}
        />
      ),
    };

    // Return direct component for non-form steps
    if (stepComponents[currentStep]) {
      return stepComponents[currentStep];
    }

    // Return wrapped component for form steps
    if (formStepComponents[currentStep]) {
      return (
        <FormWrapper stepName={currentStep}>
          {formStepComponents[currentStep]}
        </FormWrapper>
      );
    }

    return null;
  };

  // Loading and intro screens
  if (isGenerating) return <Loading generate_roadmap={true} />;
  if (!isReady)
    return <Loading className="flex-grow flex justify-center items-center" />;
  if (showIntro)
    return <AssessmentIntro onBeginAssessment={handleBeginAssessment} />;

  // Main assessment layout
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
