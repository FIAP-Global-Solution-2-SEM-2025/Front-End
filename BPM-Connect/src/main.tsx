import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.tsx";
import { Home } from "./routes/Home.tsx";
import { Candidatos } from "./routes/Candidatos.tsx";
import { Processos } from "./routes/Processos.tsx";
import "./index.css";

import { ThemeProvider } from "./components/theme/ThemeProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vagas" element={<App />} />
          <Route path="/candidatos" element={<Candidatos />} />
          <Route path="/processos" element={<Processos />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);