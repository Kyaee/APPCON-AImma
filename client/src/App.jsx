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
import NotFound from "./routes/NotFound"


function App() {

  return (
    <>
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
          <Route path="/:id/job-opportunities" element={<JobOpportunities/>} />

          <Route path="*" element={<NotFound/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
