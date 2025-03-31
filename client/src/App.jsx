// THIS PAGE IS FOR ROUTING AND NAVIGATION PURPOSES

import { ThemeProvider } from "./config/theme-provider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "./config/authContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

/*------------------------------------------
WEB PAGES 
- Check the `Routes` folder for more pages 
------------------------------------------*/

import Landing from "./routes/landing";
import MainLayout from "./components/layout/main-layout";
// AUTHENTICATION
import LoginPage from "./routes/auth/login";
import RegisterPage from "./routes/auth/register";
import ConfirmAccount from "./routes/auth/confirm-account";
// INTRO ASSESSMENT
import IntroShowcase from "./routes/showcase";
import CombinedAssessment from "./routes/user-assessment/combined-assessment";
import DailyGoal from "./routes/user-assessment/daily-goal";
import EntryQuestions from "./routes/user-assessment/professional-types/entryQuestions";
import MidQuestions from "./routes/user-assessment/professional-types/midQuestions";
import SeniorQuestions from "./routes/user-assessment/professional-types/seniorQuestions";
import HSQuestions from "./routes/user-assessment/student-types/hsQuestions";
import CollegeQuestions from "./routes/user-assessment/student-types/collegeQuestions";
import GradQuestions from "./routes/user-assessment/student-types/gradQuestions";
import TechInterest from "./routes/user-assessment/techInterest";
import Complete from "./routes/user-assessment/complete";
import Goals from "./routes/user-assessment/goals";
import Proficiency from "./routes/user-assessment/proficiency";
import Questions from "./routes/user-assessment/questions";
import Results from "./routes/user-assessment/results";
// GENERAL PAGES
import Dashboard from "./routes/dashboard";
import Profile from "./routes/profile";
import Shop from "./routes/shop";
import Lesson from "./routes/lesson";
import LessonAssessment from "./routes/lesson-assessment/lesson-assessment";
import JobOpportunities from "./routes/job-opportunities";
import NotFound from "./routes/NotFound";
// TESTING PAGE
import Emman from "./Emman-TestPage";
// This is not a page @Jun, but a component
import CourseSelect from "./components/features/course-select";

function App() {
  const queryClient = new QueryClient();
  const { session } = useAuth();
  const [isAssessed, setAssessed] = useState(true);
  // const [isUserLoggedin, setUserLoggedin] = useState(true);

  return (
    <>
      <ThemeProvider defaultTheme="Light" storageKey="vite-ui-theme">
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              {/* GENERAL ROUTES */}
              <Route path="/" element={<Landing />} />
              <Route path="/emman-testing" element={<Emman />} />
              <Route path="*" element={<NotFound />} />

              {!session ? (
                // IF USER IS NOT LOGGED-IN
                <>
                  <Route path="/auth/login" element={<LoginPage />} />
                  <Route path="/auth/register" element={<RegisterPage />} />
                  <Route
                    path="/auth/confirm-account"
                    element={<ConfirmAccount />}
                  />
                </>
              ) : !isAssessed ? (
                // IF USER IS LOGGED-IN, AND NOT ASSESSED
                <>
                  <Route path="/start/showcase" element={<IntroShowcase />} />
                  <Route path="/assessment" element={<CombinedAssessment />} />
                  <Route path="/assessment/daily-goal" element={<DailyGoal />} />
                  <Route path="/assessment/hsQuestions" element={<HSQuestions />} />
                  <Route path="/assessment/collegeQuestions" element={<CollegeQuestions />} />
                  <Route path="/assessment/gradQuestions" element={<GradQuestions />} />
                  <Route path="/assessment/entryQuestions" element={<EntryQuestions />} />
                  <Route path="/assessment/midQuestions" element={<MidQuestions />} />
                  <Route path="/assessment/seniorQuestions" element={<SeniorQuestions />} />
                  <Route path="/assessment/techInterest" element={<TechInterest />} />
                  <Route path="/assessment/programmingquestions" element={<TechInterest />} />
                  <Route path="/assessment/networkingquestions" element={<TechInterest />} />
                  <Route path="/assessment/webdevelopmentquestions" element={<TechInterest />} />
                  <Route path="/assessment/gamedevelopmentquestions" element={<TechInterest />} />
                  <Route path="/assessment/aimachinelearningquestions" element={<TechInterest />} />
                  <Route path="/assessment/datasciencequestions" element={<TechInterest />} />
                  <Route path="/assessment/cybersecurityquestions" element={<TechInterest />} />
                  <Route path="/assessment/roboticsquestions" element={<TechInterest />} />
                  <Route path="/assessment/humancomputerinteractionquestions" element={<TechInterest />} />
                  <Route path="/assessment/otherinterests" element={<TechInterest />} />
                  <Route path="/assessment/complete" element={<Complete />} />
                  <Route path="/assessment/goals" element={<Goals />} />
                  <Route path="/assessment/proficiency" element={<Proficiency />} />
                  <Route path="/assessment/questions" element={<Questions />} />
                  <Route path="/assessment/results" element={<Results />} />
                  <Route path="/select" element={<CourseSelect />} />
                </>  
              ) : (
                // IF USER IS LOGGED-IN AND ASSESSED
                <>
                  {/* To access dynamic routes like /:id/profile, you can access the page by going to /1/profile  or /2/dashboard or /3/shop. */}
                  <Route element={<MainLayout />}>
                    <Route path="/dashboard/:id" element={<Dashboard />} />
                    <Route path="/profile/:id" element={<Profile />} />
                    <Route path="/shop/:id" element={<Shop />} />
                    <Route
                      path="/job-opportunities/:id"
                      element={<JobOpportunities />}
                    />
                  </Route>
                  <Route element="MainLayout">
                    <Route path="/lesson/:id" element={<Lesson />} />
                    <Route
                      path="/lesson/:id/assessment/:id"
                      element={<LessonAssessment />}
                    />
                  </Route>
                </>
              )}
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
