import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GlobalStateProvider } from "./providers/GlobalStateProvider.tsx";
import { Toaster } from "@/components/ui/sonner";
import { BrowserRouter, Route, Routes } from "react-router";
import Dashboard from "./pages/dashboard.tsx";
// import { OAuthHandler } from "./components/OAuthHandler.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <GlobalStateProvider>
        <Toaster />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          {/* <Route path="/callback" element={<OAuthHandler />} /> */}
        </Routes>
      </GlobalStateProvider>
    </BrowserRouter>
  </StrictMode>
);
