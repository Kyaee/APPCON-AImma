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
import LessonLayout from "./components/layout/lesson-layout";
// AUTHENTICATION
import LoginPage from "./routes/auth/login";
import RegisterPage from "./routes/auth/register";
import ConfirmAccount from "./routes/auth/confirm-account";
// INTRO ASSESSMENT
import NameCustomization from '@/components/onboarding/NameCustomization';
import IntroShowcase from "./routes/Showcase";
import UserAssessment from "./routes/UserAssessment";
// REDIRECTS
import ProcessDashboard from "./routes/redirects/processDashboard";
import RedirectDashboard from "./routes/redirects/redirectDashboard";
import RedirectProfile from "./routes/redirects/redirectProfile";
import RedirectShop from "./routes/redirects/redirectShop";
import RedirectJobOpportunities from "./routes/redirects/redirectJobOpportunities";
// GENERAL PAGES
import Dashboard from "./routes/Dashboard";
import Profile from "./routes/Profile";
import Shop from "./routes/Shop";
import Lesson from "./routes/Lesson";
import LessonAssessment from "./routes/LessonAssessment";
import JobOpportunities from "./routes/JobOpportunities";
import NotFound from "./routes/NotFound";
// TESTING PAGE
import Testing from "./routes/Testing/TestingPage";
import ApiTester from "./routes/UI_TestGemReward";

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
              <Route path="/GemReward" element={<ApiTester />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/testing" element={<Testing />} />

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
                {
                  path: "/onboarding/name",
                  element: <NameCustomization />,
                },
                <>
                  <Route path="/start/showcase" element={<IntroShowcase />} />
                  <Route
                    path="/start/assessment/*"
                    element={<UserAssessment />}
                  />
                  <Route path="/dashboard/p" element={<ProcessDashboard setAssessed={setAssessed} />} />
                </>
              ) : (
                // IF USER IS LOGGED-IN AND ASSESSED
                <>
                  <Route path="/dashboard" element={<RedirectDashboard />} />
                  <Route path="/profile" element={<RedirectProfile />} />
                  <Route path="/shop" element={<RedirectShop />} />
                  <Route path="/job-opportunities" element={<RedirectJobOpportunities />} />
                  <Route element={<MainLayout />}>
                    <Route path="/dashboard/:id" element={<Dashboard />} />
                    <Route path="/profile/:id" element={<Profile />} />
                    <Route path="/shop/:id" element={<Shop />} />
                    <Route
                      path="/job-opportunities/:id"
                      element={<JobOpportunities />}
                    />
                  </Route>

                  <Route element={<LessonLayout />}>
                    <Route path="/lesson/:id" element={<Lesson />} />
                    <Route
                      path="/l/:id/assessment"
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
