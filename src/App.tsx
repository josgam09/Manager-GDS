import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { RequirementProvider } from "@/contexts/RequirementContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Layout from "@/components/Layout";
import Login from "@/pages/Login";
import Unauthorized from "@/pages/Unauthorized";
import Dashboard from "@/pages/Dashboard";
import RequirementsList from "@/pages/RequirementsList";
import RequirementDetail from "@/pages/RequirementDetail";
import RequirementForm from "@/pages/RequirementFormSimple";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <RequirementProvider>
            <Toaster />
            <Sonner />
            <Routes>
              {/* Rutas públicas */}
              <Route path="/login" element={<Login />} />
              <Route path="/unauthorized" element={<Unauthorized />} />

              {/* Rutas protegidas */}
              <Route
                path="/*"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/requirements" element={<RequirementsList />} />
                        <Route 
                          path="/requirements/new" 
                          element={
                            <ProtectedRoute allowedRoles={['ADMINISTRADOR', 'ANALISTA']}>
                              <RequirementForm />
                            </ProtectedRoute>
                          } 
                        />
                        <Route path="/requirements/:id" element={<RequirementDetail />} />
                        <Route 
                          path="/requirements/:id/edit" 
                          element={
                            <ProtectedRoute allowedRoles={['ADMINISTRADOR', 'ANALISTA']}>
                              <RequirementForm />
                            </ProtectedRoute>
                          } 
                        />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </Layout>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </RequirementProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
