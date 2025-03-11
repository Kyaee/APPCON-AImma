import { BrowserRouter, Route, Routes } from "react-router-dom";

/*
  WEB PAGES 
  - Check the `Routes` folder for more pages 
*/
import Landing from "./routes/landing";
import IntroShowcase from "./routes/intro-showcase/showcase";
import Dashboard from "./routes/dashboard";
import Profile from "./routes/profile";
import Shop from "./routes/shop";
import JobOpportunities from "./routes/job-opportunities";
import Lesson from "./routes/lesson";
import LessonAssessment from "./routes/lesson-assessment/assessment";
import NotFound from "./routes/NotFound";
import Card from "./components/features/new-user-card";

import EducationLevel from './routes/assessment/education-level'
import DailyGoal from './routes/assessment/daily-goal'
import Goals from './routes/assessment/goals'
import Language from './routes/assessment/language'
import Proficiency from './routes/assessment/proficiency'
import Questions from './routes/assessment/questions'
import Results from './routes/assessment/results'
import UserType from './routes/assessment/user-type'

// Theme provider
import { ThemeProvider } from "./components/features/theme-provider";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter>
          <Routes>
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
            <Route path="/test" element={<Card />} />
            <Route path="/assessment/language" element={<Language />} />
            <Route
              path="/assessment/educationlevel"
              element={<EducationLevel />}
            />
            <Route path="/assessment/daily-goal" element={<DailyGoal />} />
            <Route path="/assessment/goals" element={<Goals />} />
            <Route path="/assessment/proficiency" element={<Proficiency />} />
            <Route path="/assessment/questions" element={<Questions />} />
            <Route path="/assessment/results" element={<Results />} />
            <Route path="/assessment/user-type" element={<UserType />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
