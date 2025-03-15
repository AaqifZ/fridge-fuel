
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useOnboarding } from "./hooks/useOnboarding";
import Index from "./pages/Index";
import Calculator from "./pages/Calculator";
import Analyze from "./pages/Analyze";
import Recipes from "./pages/Recipes";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import OnboardingWizard from "./components/Onboarding/OnboardingWizard";

// Create a singleton QueryClient instance
const queryClient = new QueryClient();

const App = () => {
  console.log("App component rendering");
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner position="top-center" />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

// Separate component to handle routing
const AppRoutes = () => {
  const { isCompleted } = useOnboarding();
  const location = useLocation();
  
  // Hide navbar on index page and onboarding
  const showNavbar = location.pathname !== '/' && location.pathname !== '/onboarding';
  
  useEffect(() => {
    console.log("Current route:", location.pathname);
  }, [location.pathname]);
  
  return (
    <>
      {showNavbar && <Navbar />}
      <div className="app-content">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route 
            path="/analyze" 
            element={isCompleted ? <Analyze /> : <Navigate to="/onboarding" />} 
          />
          <Route 
            path="/calculator" 
            element={isCompleted ? <Calculator /> : <Navigate to="/onboarding" />} 
          />
          <Route 
            path="/recipes" 
            element={isCompleted ? <Recipes /> : <Navigate to="/onboarding" />} 
          />
          <Route path="/onboarding" element={<OnboardingWizard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
