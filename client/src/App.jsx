// THIS PAGE IS FOR ROUTING AND NAVIGATION PURPOSES
import { ThemeProvider } from "./config/theme-provider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAuth } from "./config/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationProvider } from "./context/navigationContext";
import "react-image-crop/dist/ReactCrop.css";

/*------------------------------------------
WEB PAGES 
- Check the `Routes` folder for more pages 
------------------------------------------*/

import Landing from "./routes/Landing";
import MainLayout from "./components/layout/main-layout";
import LessonLayout from "./components/layout/lesson-layout";
// AUTHENTICATION
import LoginPage from "./routes/auth/LoginPage";
import RegisterPage from "./routes/auth/RegisterPage";
import ConfirmAccount from "./routes/auth/confirm-account";
// INTRO ASSESSMENT
import NameCustomization from "@/components/onboarding/NameCustomization";
import Showcase from "./routes/Showcase";
import UserAssessment from "./routes/UserAssessment";
// REDIRECTS
import ProcessDashboard from "./routes/redirects/ProcessDashboard";
import RedirectDashboard from "./routes/redirects/RedirectDashboard";
import RedirectProfile from "./routes/redirects/RedirectProfile";
import RedirectShop from "./routes/redirects/RedirectShop";
import RedirectJobOpportunities from "./routes/redirects/RedirectJobOpportunities";
// GENERAL PAGES
import Dashboard from "./routes/Dashboard";
import Profile from "./routes/Profile";
import Lesson from "./routes/Lesson";
import LessonAssessment from "./routes/LessonAssessment";
import JobOpportunities from "./routes/JobOpportunities";
import NotFound from "./routes/NotFound";
import ElementShop from "./routes/ElementShop";

function App() {
  const queryClient = new QueryClient();
  const { session } = useAuth();

  return (
    <>  
      <ThemeProvider defaultTheme="Light" storageKey="vite-ui-theme">
        <NavigationProvider>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <Routes>
                {/* GENERAL ROUTES */}
                <Route path="/" element={<Landing />} />
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
                ) : 
                  // IF USER IS LOGGED-IN, AND NOT ASSESSED
                  <>
                    <Route path="/start/showcase" element={<Showcase />} />
                    <Route path="/start/name" element={<NameCustomization />} />
                    <Route
                      path="/start/assessment/*"
                      element={<UserAssessment />}
                    />
                    <Route
                      path="/dashboard/p"
                      element={<ProcessDashboard />}
                    />
                    <Route
                      path="/dashboard"
                      element={<RedirectDashboard />}
                    />
                    <Route path="/profile" element={<RedirectProfile />} />
                    <Route path="/shop" element={<RedirectShop />} />
                    <Route
                      path="/job-opportunities"
                      element={<RedirectJobOpportunities />}
                    />
                    <Route element={<MainLayout />}>
                      <Route
                        path="/dashboard/:id"
                        element={<Dashboard />}
                      />
                      <Route path="/profile/:id" element={<Profile />} />
                      <Route path="/shop/:id" element={<ElementShop />} />
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
                      {/* Use the same ElementShop component for lesson shop route */}
                      <Route path="/l/shop/:id" element={<ElementShop />} />
                    </Route>
                  </>
                }
              </Routes>
            </BrowserRouter>
          </QueryClientProvider>
        </NavigationProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
