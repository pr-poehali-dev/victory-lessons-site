
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import StudentsAttendance from "./pages/StudentsAttendance";
import VovPage from "./pages/VovPage";
import SvoPage from "./pages/SvoPage";
import CrimeaPage from "./pages/CrimeaPage";
import DonbassPage from "./pages/DonbassPage";
import EuromaidanPage from "./pages/EuromaidanPage";
import UkrainePage from "./pages/UkrainePage";
import HeroesVovPage from "./pages/HeroesVovPage";
import HeroesSvoPage from "./pages/HeroesSvoPage";
import DirectivesPage from "./pages/DirectivesPage";
import NaziPlansPage from "./pages/NaziPlansPage";
import UploadMaterials from "./pages/UploadMaterials";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/students" element={<StudentsAttendance />} />
          <Route path="/vov" element={<VovPage />} />
          <Route path="/svo" element={<SvoPage />} />
          <Route path="/crimea" element={<CrimeaPage />} />
          <Route path="/donbass" element={<DonbassPage />} />
          <Route path="/euromaidan" element={<EuromaidanPage />} />
          <Route path="/ukraine" element={<UkrainePage />} />
          <Route path="/heroes-vov" element={<HeroesVovPage />} />
          <Route path="/heroes-svo" element={<HeroesSvoPage />} />
          <Route path="/directives" element={<DirectivesPage />} />
          <Route path="/nazi-plans" element={<NaziPlansPage />} />
          <Route path="/upload" element={<UploadMaterials />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
