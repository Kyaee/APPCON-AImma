import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AssessmentLayout from "@/components/assessment/AssessmentLayout";
import { assessmentFlow } from "@/lib/assessment-flow";
import { useAssessmentStore } from "@/store/useAssessmentStore";
import { useGenerateRoadmap } from "@/api/INSERT";

// Import step components
import LanguageStep from "@/components/assessment/steps/LanguageStep";
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
  // Store actions and state
  const setLanguage = useAssessmentStore((state) => state.setLanguage);
  const language = useAssessmentStore((state) => state.language);
  const setUserType = useAssessmentStore((state) => state.setUserType);
  const setEducationLevel = useAssessmentStore((state) => state.setEducationLevel);
  const setCareerTransition = useAssessmentStore((state) => state.setCareerTransition);
  const setPreviousExperience = useAssessmentStore((state) => state.setPreviousExperience);
  const setDailyGoal = useAssessmentStore((state) => state.setDailyGoal);
  const setTechnicalInterest = useAssessmentStore((state) => state.setTechnicalInterest);
  const setTechnicalAnswers = useAssessmentStore((state) => state.setTechnicalAnswers);
  const resetAssessment = useAssessmentStore((state) => state.resetAssessment);
  const { createRoadmap, isSuccess } = useGenerateRoadmap();

  // Local state
  const [currentStep, setCurrentStep] = useState(() => {
    const saved = localStorage.getItem("currentAssessmentPage");
    return saved || "language";
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

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem("currentAssessmentPage", currentStep);
  }, [currentStep]);

  // Save current state
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

  // Add a new state to track if we're showing questions for the selected tech interest
  const [techQuestionsVisible, setTechQuestionsVisible] = useState(false);

  // Handlers
  const handleLanguageChange = (value) => {
    setLanguage(value);
  };

  const handleTypeSelection = (option) => {
    setSelectedType(option);
    setUserType(option);
  };

  const handleLevelSelection = (option) => {
    setSelectedLevel(option);
    setEducationLevel(option);
  };

  const handleDailyGoalSelect = (value) => {
    setDailyGoalState(value);
    setDailyGoal(value);
    localStorage.setItem("daily-goal", value);
  };

  const handleTechInterestSelect = (option) => {
    setTechnicalInterestState(option);
    setTechnicalInterest(option);
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

  const navigateToNextStep = (step) => {
    setCurrentStep(step);
  };

  // Handle back button click
  const handleBack = () => {
    if (currentStep === "language") return;

    // If on tech interest questions view, go back to interest selection
    if (currentStep === "techInterest" && techQuestionsVisible) {
      setTechQuestionsVisible(false);
      return;
    }

    const backMapping = {
      userType: "language",
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

    setCurrentStep(backMapping[currentStep] || "language");
  };

  // Determine previous step for daily goal based on state
  function getPreviousStepForDailyGoal() {
    const savedType = localStorage.getItem("userType");

    if (savedType === "student") {
      if (localStorage.getItem("hsQuestionsSavepoint")) return "hsQuestions";
      if (localStorage.getItem("collegeQuestionsSavepoint"))
        return "collegeQuestions";
      if (localStorage.getItem("gradQuestionsSavepoint"))
        return "gradQuestions";
    } else if (savedType === "professional") {
      const expChoice = localStorage.getItem("yearsOfExpSavepoint");
      if (expChoice) {
        const choice = JSON.parse(expChoice);
        if (choice.id === "entryLevel") return "entryQuestions";
        if (choice.id === "midLevel") return "midQuestions";
        if (choice.id === "seniorLevel") return "seniorQuestions";
      }
    } else if (savedType === "jobSeeker") {
      return "previousExperience";
    } else if (savedType === "careerShifter") {
      return "careerTransition";
    }

    return "userType";
  }

  // Handle next button click
  const handleNext = () => {
    // Custom validation and navigation logic for each step
    switch (currentStep) {
      case "language":
        resetAssessment()
        navigateToNextStep("userType");
        break;

      case "userType":
        if (selectedType) {
          localStorage.setItem("userType", selectedType.id);
          if (selectedType.id === "student") {
            navigateToNextStep("educationLevel");
          } else if (selectedType.id === "professional") {
            navigateToNextStep("experience");
          } else if (selectedType.id === "jobSeeker") {
            navigateToNextStep("previousExperience");
          } else if (selectedType.id === "careerShifter") {
            navigateToNextStep("careerTransition");
          }
        }
        break;

      case "educationLevel":
        if (selectedLevel) {
          localStorage.setItem(
            "educationLevelData",
            JSON.stringify(selectedLevel)
          );

          // Route based on education level
          switch (selectedLevel.id) {
            case "highSchool":
              navigateToNextStep("hsQuestions");
              break;
            case "college":
              navigateToNextStep("collegeQuestions");
              break;
            case "graduateSchool":
              navigateToNextStep("gradQuestions");
              break;
          }
        }
        break;

      case "experience":
        if (selectedLevel) {
          localStorage.setItem(
            "yearsOfExpSavepoint",
            JSON.stringify(selectedLevel)
          );

          // Route based on years of experience
          switch (selectedLevel.id) {
            case "entryLevel":
              navigateToNextStep("entryQuestions");
              break;
            case "midLevel":
              navigateToNextStep("midQuestions");
              break;
            case "seniorLevel":
              navigateToNextStep("seniorQuestions");
              break;
          }
        }
        break;

      case "previousExperience":
        if (
          previousExperience.lastRole.trim() !== "" &&
          previousExperience.yearsExperience.trim() !== "" &&
          previousExperience.reasonForChange.trim() !== ""
        ) {
          setPreviousExperience(previousExperience);
          localStorage.setItem(
            "previousExpData",
            JSON.stringify(previousExperience)
          );
          navigateToNextStep("dailyGoal");
        } else {
          alert("Please fill in all fields for Previous Experience");
        }
        break;

      case "careerTransition":
        if (
          transition.currentField.trim() !== "" &&
          transition.desiredField.trim() !== "" &&
          transition.transitionReason.trim() !== ""
        ) {
          setCareerTransition(transition);
          localStorage.setItem(
            "careerTransitionData",
            JSON.stringify(transition)
          );
          navigateToNextStep("dailyGoal");
        } else {
          alert("Please fill in all fields for Career Transition");
        }
        break;

      case "hsQuestions":
        if (
          hsFormData.strand &&
          hsFormData.planningCollege !== null &&
          hsFormData.interestAreas.length > 0 &&
          hsFormData.careerGoals
        ) {
          localStorage.setItem("hsResponses", JSON.stringify(hsFormData));
          localStorage.setItem("hsQuestionsSavepoint", "true");
          navigateToNextStep("dailyGoal");
        } else {
          alert("Please complete all fields before proceeding");
        }
        break;

      case "collegeQuestions":
        if (
          collegeFormData.course &&
          collegeFormData.yearLevel &&
          collegeFormData.technicalSkills.length > 0 &&
          collegeFormData.careerPath
        ) {
          localStorage.setItem(
            "collegeResponses",
            JSON.stringify(collegeFormData)
          );
          localStorage.setItem("collegeQuestionsSavepoint", "true");
          navigateToNextStep("dailyGoal");
        } else {
          alert("Please complete all fields before proceeding");
        }
        break;

      case "gradQuestions":
        if (
          gradFormData.fieldStudy &&
          gradFormData.researchFocus &&
          gradFormData.industryExperience !== null &&
          gradFormData.careerPlans &&
          gradFormData.researchInterests.length > 0
        ) {
          localStorage.setItem("gradResponses", JSON.stringify(gradFormData));
          localStorage.setItem("gradQuestionsSavepoint", "true");
          navigateToNextStep("dailyGoal");
        } else {
          alert("Please complete all fields before proceeding");
        }
        break;

      case "entryQuestions":
        if (
          entryFormData.currentRole &&
          entryFormData.companyIndustry &&
          entryFormData.skillsUsed.length > 0
        ) {
          // Save to localStorage only when moving to the next step
          localStorage.setItem(
            "entryLevelSavepoint",
            JSON.stringify(entryFormData)
          );
          localStorage.setItem(
            "entryLevelResponses",
            JSON.stringify(entryFormData)
          );
          navigateToNextStep("dailyGoal");
        } else {
          alert("Please complete all fields before proceeding");
        }
        break;

      case "midQuestions":
        if (
          midFormData.currentRole &&
          midFormData.companyIndustry &&
          midFormData.skillsUsed.length > 0
        ) {
          localStorage.setItem(
            "midLevelResponses",
            JSON.stringify(midFormData)
          );
          navigateToNextStep("dailyGoal");
        } else {
          alert("Please complete all fields before proceeding");
        }
        break;

      case "seniorQuestions":
        if (
          seniorFormData.currentRole &&
          seniorFormData.companyIndustry &&
          seniorFormData.skillsUsed.length > 0
        ) {
          localStorage.setItem(
            "seniorLevelResponses",
            JSON.stringify(seniorFormData)
          );
          navigateToNextStep("dailyGoal");
        } else {
          alert("Please complete all fields before proceeding");
        }
        break;

      case "dailyGoal":
        if (dailyGoal) {
          navigateToNextStep("techInterest");
        } else {
          alert("Please select a daily goal");
        }
        break;

      case "techInterest":
        if (technicalInterest) {
          if (!techQuestionsVisible) {
            // First click on Next: Show the questions for the selected interest
            setTechQuestionsVisible(true);
          } else {
            // Second click on Next: Move to completion
            setTechQuestionsVisible(false);
            createRoadmap()
            navigateToNextStep("complete");
          }
        } else {
          alert("Please select a technical interest");
        }
        break;

      case "complete":
        // Log all collected data
        console.group("Assessment Results");
        console.log("Language:", language);
        console.log("User Type:", selectedType);
        console.log("Education Level:", selectedLevel);
        
        // User type specific data
        if (selectedType?.id === "student") {
          console.log("Education Level:", selectedLevel?.label);
          if (selectedLevel?.id === "highSchool") {
            console.log("High School Data:", hsFormData);
          } else if (selectedLevel?.id === "college") {
            console.log("College Data:", collegeFormData);
          } else if (selectedLevel?.id === "graduateSchool") {
            console.log("Graduate School Data:", gradFormData);
          }
        } else if (selectedType?.id === "professional") {
          console.log("Experience Level:", selectedLevel?.label);
          if (selectedLevel?.id === "entryLevel") {
            console.log("Entry Level Data:", entryFormData);
          } else if (selectedLevel?.id === "midLevel") {
            console.log("Mid Level Data:", midFormData);
          } else if (selectedLevel?.id === "seniorLevel") {
            console.log("Senior Level Data:", seniorFormData);
          }
        } else if (selectedType?.id === "jobSeeker") {
          console.log("Previous Experience:", previousExperience);
        } else if (selectedType?.id === "careerShifter") {
          console.log("Career Transition:", transition);
        }
        
        console.log("Daily Goal:", dailyGoal);
        console.log("Technical Interest:", technicalInterest ? `${technicalInterest.label} (${technicalInterest.id})` : "None");
        console.log("Technical Answers:", technicalAnswers);
        // Additional details about technical interest answers
        if (technicalInterest) {
          console.group(`${technicalInterest.label} Questions and Answers`);
          const questionSet = technicalInterest.id === "other" 
            ? assessmentFlow.otherInterests 
            : assessmentFlow[technicalInterest.id + "Questions"];
            
          if (questionSet && questionSet.questions) {
            questionSet.questions.forEach(question => {
              const answer = technicalAnswers[question.id];
              console.log(`Q: ${question.label}`);
              console.log(`A: ${Array.isArray(answer) ? answer.join(', ') : answer || "Not answered"}`);
              console.log('---');
            });
          } else {
            console.log(`No questions found for ${technicalInterest.label} (${technicalInterest.id})`);
            console.log('Available question sets:', Object.keys(assessmentFlow).filter(key => key.includes('Questions')));
          }
          console.groupEnd();
        }
        console.log("Feedback:", feedback);
        
        // Create a formatted summary of all answers
        const summaryData = {
          basicInfo: {
            language,
            userType: selectedType?.label,
            dailyGoal: `${dailyGoal} minutes`,
          },
          pathDetails: selectedType?.id === "student" 
            ? { educationLevel: selectedLevel?.label }
            : selectedType?.id === "professional"
              ? { experienceLevel: selectedLevel?.label }
              : selectedType?.id === "jobSeeker"
                ? { previousExperience }
                : { careerTransition: transition },
          technicalInterests: {
            primaryInterest: technicalInterest?.label,
            answers: technicalAnswers
          },
        };
        
        // Display the summary as an alert for user visibility
        // alert("Assessment Complete! Summary:\n\n" + JSON.stringify(summaryData, null, 2));
        // console.groupEnd();
        
        // Navigate to dashboard after completion
        
        // THIS ONE SHOULD POST FETCH THE DATA AND POST 
        navigate("/dashboard/p");
        break;

      default:
        return null;
    }
  };

  // Determine the progress based on currentStep
  const getProgress = () => {
    const stepProgressMap = {
      language: 0,
      userType: 10,
      educationLevel: 20,
      experience: 20,
      previousExperience: 20,
      careerTransition: 20,
      hsQuestions: 35,
      collegeQuestions: 35,
      gradQuestions: 35,
      entryQuestions: 35,
      midQuestions: 35,
      seniorQuestions: 35,
      dailyGoal: 50,
      techInterest: 75,
      complete: 100,
    };

    return stepProgressMap[currentStep] || 0;
  };

  // Determine the title based on currentStep
  const getTitle = () => {
    const stepTitleMap = {
      language: "Preferred language",
      userType: "Career Assessment",
      educationLevel: "Skill Level Assessment",
      experience: "Years of Experience",
      previousExperience: "Previous Experience",
      careerTransition: "Career Transition",
      hsQuestions: "High School Assessment",
      collegeQuestions: "College Assessment",
      gradQuestions: "Graduate Path",
      entryQuestions: "Entry Level Assessment",
      midQuestions: "Middle Level Assessment",
      seniorQuestions: "Senior Level Assessment",
      dailyGoal: "Daily Learning Goal",
      techInterest: techQuestionsVisible 
        ? `${technicalInterest?.label || 'Technical'} Questions` 
        : "Technical Interests",
      complete: "Assessment Complete",
    };

    return stepTitleMap[currentStep] || "Assessment";
  };

  // Special props for buttons on complete page
  const getButtonProps = () => {
    if (currentStep === "complete") {
      return {
        nextButtonText: "Go to Dashboard",
        mascotZIndex: "-1",
      };
    }
    return {};
  };

  // Render the current step
  const renderCurrentStep = () => {
    switch (currentStep) {
      case "language":
        return (
          <LanguageStep
            language={language}
            onLanguageChange={handleLanguageChange}
            onNext={handleNext}
          />
        );
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
          <PreviousExperienceStep
            experience={previousExperience}
            setExperience={setPreviousExp}
          />
        );
      case "careerTransition":
        return (
          <CareerTransitionStep
            transition={transition}
            setTransition={setTransition}
          />
        );
      case "hsQuestions":
        return (
          <HSQuestionsStep formData={hsFormData} setFormData={setHsFormData} />
        );
      case "collegeQuestions":
        return (
          <CollegeQuestionsStep
            formData={collegeFormData}
            setFormData={setCollegeFormData}
          />
        );
      case "gradQuestions":
        return (
          <GradQuestionsStep
            formData={gradFormData}
            setFormData={setGradFormData}
          />
        );
      case "entryQuestions":
        return (
          <EntryQuestionsStep
            formData={entryFormData}
            setFormData={setEntryFormData}
          />
        );
      case "midQuestions":
        return (
          <MidQuestionsStep
            formData={midFormData}
            setFormData={setMidFormData}
          />
        );
      case "seniorQuestions":
        return (
          <SeniorQuestionsStep
            formData={seniorFormData}
            setFormData={setSeniorFormData}
          />
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
        return (
          <TechInterestStep
            techInterestOptions={assessmentFlow.techInterest.options}
            selectedInterest={technicalInterest}
            onInterestSelect={handleTechInterestSelect}
            technicalAnswers={technicalAnswers}
            onAnswerChange={handleTechAnswerChange}
            showQuestions={techQuestionsVisible}
          />
        );
      case "complete":
        return (
          <CompleteStep
            title={assessmentFlow.complete.title}
            feedback={feedback}
            onFeedbackChange={handleFeedbackChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <AssessmentLayout
      title={getTitle()}
      progress={getProgress()}
      prevPage={currentStep === "language" ? null : handleBack}
      nextPage={currentStep === "language" ? null : handleNext}
      showMascot={currentStep !== "language"}
      buttonPosition="center"
      {...getButtonProps()}
    >
      {renderCurrentStep()}
    </AssessmentLayout>
  );
}
