import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RequirementProvider } from "@/contexts/RequirementContext";
import Layout from "@/components/Layout";
import Dashboard from "@/pages/Dashboard";
import RequirementsList from "@/pages/RequirementsList";
import RequirementDetail from "@/pages/RequirementDetail";
import RequirementForm from "@/pages/RequirementFormSimple";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <RequirementProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/requirements" element={<RequirementsList />} />
              <Route path="/requirements/new" element={<RequirementForm />} />
              <Route path="/requirements/:id" element={<RequirementDetail />} />
              <Route path="/requirements/:id/edit" element={<RequirementForm />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </RequirementProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
