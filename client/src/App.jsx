import { BrowserRouter, Route, Routes } from "react-router-dom"

/*
  WEB PAGES 
  - Check the `Routes` folder for more pages 
*/
import Landing from "./routes/landing"
import IntroShowcase from "./routes/intro-showcase/showcase"
import IntroAssessment from "./routes/intro-assessment/assessment"
import Dashboard from "./routes/dashboard"
import Profile from "./routes/profile"
import Shop from "./routes/shop"
import JobOpportunities from "./routes/job-opportunities"
import Lesson from "./routes/lesson"
import LessonAssessment from "./routes/lesson-assessment/assessment"
import NotFound from "./routes/NotFound"

// Theme provider
import { ThemeProvider } from "./components/features/theme-provider"

function App() {

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing/>} />
            <Route path="/start/showcase" element={<IntroShowcase/>} />
            <Route path="/start/assessment" element={<IntroAssessment/>} />

            {/* 
              To access dynamic routes like /:id/profile,
              you can access the page by going to /1/profile
              or /2/dashboard or /3/shop.
            */}

            <Route path="/:id/dashboard" element={<Dashboard/>} />
            <Route path="/:id/profile" element={<Profile/>} />
            <Route path="/shop" element={<Shop/>} />
            <Route path="/job-opportunities/:id" element={<JobOpportunities/>} />
            <Route path="/lesson/:id" element={<Lesson/>} />
            <Route path="/lesson/:id/assessment" element={<LessonAssessment/>} />

            <Route path="*" element={<NotFound/>} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  )
}

export default App
