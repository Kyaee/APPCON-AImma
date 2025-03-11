import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./routes/landing";
import IntroShowcase from "./routes/intro-showcase/showcase";
import IntroAssessment from "./routes/intro-assessment/assessment";
import Dashboard from "./routes/dashboard";
import Profile from "./routes/profile";
import Shop from "./routes/shop";
import JobOpportunities from "./routes/job-opportunities"; 
import JobOpportunitiesPage2 from "./routes/job-opportunities/JobOpportunitiesPage2"; 
import Lesson from "./routes/lesson";
import LessonAssessment from "./routes/lesson-assessment/assessment";
import NotFound from "./routes/NotFound";

// Theme provider
import { ThemeProvider } from "./components/features/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/start/showcase" element={<IntroShowcase />} />
          <Route path="/start/assessment" element={<IntroAssessment />} />
          <Route path="/:id/dashboard" element={<Dashboard />} />
          <Route path="/:id/profile" element={<Profile />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/job-opportunities/:id" element={<JobOpportunities />} />
          <Route path="/job-opportunities-page2/:id" element={<JobOpportunitiesPage2 />} /> 
          <Route path="/lesson/:id" element={<Lesson />} />
          <Route path="/lesson/:id/assessment" element={<LessonAssessment />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
