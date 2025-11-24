import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.tsx";
import { Home } from "./routes/Home.tsx";
import { Candidatos } from "./routes/Candidatos.tsx";
import { Processos } from "./routes/Processos.tsx";
import "./index.css";
import { ThemeProvider } from "./components/theme/ThemeProvider";
import { AuthProvider } from "./Contexts/AuthContexts.tsx";
import { ProtectedRoute } from "./components/secureroute/ProtectedRoute.tsx";
import { PerfilEmpresa } from "./routes/PerfilEmpresa.tsx";
import { PerfilCandidato } from "./routes/PerfilCandidato.tsx";
import { DashboardEmpresa } from "./components/secureroute/DashboardEmpresa.tsx";
import { DashboardCandidato } from "./components/secureroute/DashboardCandidato.tsx";
import { Dashboard } from "./components/secureroute/Dashboard.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Rotas Públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/vagas" element={<App />} />
            <Route path="/candidatos" element={<Candidatos />} />
            <Route path="/processos" element={<Processos />} />
            
            {/* Rotas Protegidas - Dashboard */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/dashboard/candidato" element={
              <ProtectedRoute tipoRequerido="CANDIDATO">
                <DashboardCandidato />
              </ProtectedRoute>
            } />
            
            <Route path="/dashboard/empresa" element={
              <ProtectedRoute tipoRequerido="EMPRESA">
                <DashboardEmpresa />
              </ProtectedRoute>
            } />
            
            {/* Rotas Protegidas - Perfil */}
            <Route path="/perfil/candidato" element={
              <ProtectedRoute tipoRequerido="CANDIDATO">
                <PerfilCandidato />
              </ProtectedRoute>
            } />
            
            <Route path="/perfil/empresa" element={
              <ProtectedRoute tipoRequerido="EMPRESA">
                <PerfilEmpresa />
              </ProtectedRoute>
            } />
            
            {/* Rota fallback */}
            <Route path="*" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);