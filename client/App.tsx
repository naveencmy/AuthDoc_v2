import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Upload from "./pages/Upload";
import Results from "./pages/Results";
import BatchResults from "./pages/BatchResults";
import VerifyCandidate from "./pages/VerifyCandidate";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/results" element={<Results />} />
          <Route path="/batch-results" element={<BatchResults />} />
          <Route path="/verify/:candidateId" element={<VerifyCandidate />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

let root: ReturnType<typeof createRoot> | null = null;

function initializeApp() {
  const rootElement = document.getElementById("root");
  if (!rootElement) return;

  if (!root) {
    root = createRoot(rootElement);
  }
  root.render(<App />);
}

initializeApp();

if (import.meta.hot) {
  import.meta.hot.accept(
    [
      "./pages/Index",
      "./pages/Upload",
      "./pages/Results",
      "./pages/BatchResults",
      "./pages/VerifyCandidate",
    ],
    () => {
      initializeApp();
    },
  );
}
