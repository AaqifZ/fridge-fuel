
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

// Create a new QueryClient instance outside of the component to prevent recreation on renders
const queryClient = new QueryClient();

const App = () => {
  // Add an ID to the app container for debugging
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner position="top-center" />
        <div id="app-container">
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

// Separate component to access routing inside useEffect
const AppContent = () => {
  const { isCompleted } = useOnboarding();
  const location = useLocation();
  
  // Hide navbar on index page and onboarding
  const showNavbar = location.pathname !== '/' && location.pathname !== '/onboarding';
  
  // Debug mounting
  useEffect(() => {
    console.log("AppContent mounted, path:", location.pathname);
    return () => console.log("AppContent unmounted");
  }, [location.pathname]);
  
  return (
    <>
      {showNavbar && <Navbar />}
      <div className="relative z-0">
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
