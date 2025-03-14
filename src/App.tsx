
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useOnboarding } from "./hooks/useOnboarding";
import Index from "./pages/Index";
import Calculator from "./pages/Calculator";
import Analyze from "./pages/Analyze";
import Recipes from "./pages/Recipes";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import OnboardingWizard from "./components/Onboarding/OnboardingWizard";

const queryClient = new QueryClient();

const App = () => {
  // Add smooth page transitions
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const elements = document.querySelectorAll('main, section, article');
    elements.forEach((el) => observer.observe(el));
    
    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner position="top-center" />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

// Separate component to access routing inside useEffect
const AppContent = () => {
  const { isCompleted } = useOnboarding();
  
  return (
    <>
      {isCompleted && <Navbar />}
      <div className="relative z-0">
        <Routes>
          <Route 
            path="/" 
            element={isCompleted ? <Index /> : <Navigate to="/onboarding" />} 
          />
          <Route path="/onboarding" element={<OnboardingWizard />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/analyze" element={<Analyze />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
