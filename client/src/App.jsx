import { BrowserRouter, Route, Routes } from "react-router-dom";

import TestPage from "./routes/test-page";
/*
  WEB PAGES 
  - Check the `Routes` folder for more pages 
*/
import Landing from "./routes/landing"
import IntroShowcase from "./routes/showcase"
// INTRO ASSESSMENT
import CombinedAssessment from "./routes/user-assessment/combined-assessment";
import DailyGoal from './routes/user-assessment/daily-goal'
import Goals from './routes/user-assessment/goals'
import Proficiency from './routes/user-assessment/proficiency'
import Questions from './routes/user-assessment/questions'
import Results from './routes/user-assessment/results'
// GENERAL PAGES
import Dashboard from "./routes/dashboard"
import Profile from "./routes/profile"
import Shop from "./routes/shop"
import Lesson from "./routes/lesson"
import LessonAssessment from "./routes/lesson-assessment/lesson-assessment"
import JobOpportunities from "./routes/job-opportunities/job-opportunities"
import NotFound from "./routes/NotFound"
// AUTHENTICATION
import LoginPage from "./routes/auth/login";
import RegisterPage from "./routes/auth/register";

// Theme provider
import { ThemeProvider } from "./components/features/theme-provider";
import CourseSelect from "./components/features/course-select";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter>
          <Routes>
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/register" element={<RegisterPage />} />

            <Route path="/" element={<Landing />} />
            
            <Route path="/start/showcase" element={<IntroShowcase />} />

            {/* 
              To access dynamic routes like /:id/profile,
              you can access the page by going to /1/profile
              or /2/dashboard or /3/shop.
            */}
  
            <Route path="/dashboard/:id" element={<Dashboard />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/shop/:id" element={<Shop />} />
            <Route
              path="/job-opportunities/:id"
              element={<JobOpportunities />}
            />
            <Route path="/:id/lesson/:id" element={<Lesson />} />
            <Route
              path="/:id/lesson/assessment/:id"
              element={<LessonAssessment />}
            />
            
            <Route path="/assessment/daily-goal" element={<DailyGoal />} />
            <Route path="/assessment/goals" element={<Goals />} />
            <Route path="/assessment/proficiency" element={<Proficiency />} />
            <Route path="/assessment/questions" element={<Questions />} />
            <Route path="/assessment/results" element={<Results />} />
            <Route path="/assessment" element={<CombinedAssessment />} />
            <Route path="/select" element={<CourseSelect />} />   

            {/* To access dynamic routes like /:id/profile, you can access the page by going to /1/profile  or /2/dashboard or /3/shop. */}
            <Route path="/dashboard/:id" element={<Dashboard />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/job-opportunities/:id" element={<JobOpportunities />} />
            <Route path="/shop/:id" element={<Shop />} />
            <Route path="/:id/lesson/:id" element={<Lesson />} />
            <Route path="/:id/lesson/assessment/:id" element={<LessonAssessment />} />
            <Route path="/testing" element={<TestPage />} />
            <Route path="*" element={<NotFound />} />

          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
