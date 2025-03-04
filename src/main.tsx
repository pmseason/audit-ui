import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import './index.css'
import App from "./App.tsx";
import { GlobalStateProvider } from "./providers/GlobalStateProvider.tsx";
import { Toaster } from "@/components/ui/sonner";
import { BrowserRouter, Route, Routes } from "react-router";
// import { OAuthHandler } from "./components/OAuthHandler.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <GlobalStateProvider>
        <Toaster />
        <Routes>
          <Route path="/" element={<App />} />
          {/* <Route path="/callback" element={<OAuthHandler />} /> */}
        </Routes>
      </GlobalStateProvider>
    </BrowserRouter>
  </StrictMode>
);
