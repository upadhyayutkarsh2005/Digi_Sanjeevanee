import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Features from "./pages/Features";
import LoginForm from "./pages/login";
import NotFound from "./pages/NotFound";
import Register from "./pages/register";
import Hospitallocator from "./pages/Hospitallocator";
import ReportAnalyzer from "./pages/Reportanalyser";
import DoctorList from "./pages/Doctorbooking";
import SymptomChecker from "./pages/Symptomanalyser";
import HealthChatbot from './components/home/HealthChatbot'

const queryClient = new QueryClient();

const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/features" element={<Features />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<Register />} />
          <Route path="/hospital-locator" element={<Hospitallocator />} />
          <Route path="/analyzer" element={<ReportAnalyzer />} />
          <Route path="/doctors" element={<DoctorList />} />
          <Route path="/symptom-checker" element={<SymptomChecker />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <HealthChatbot />
      </TooltipProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;