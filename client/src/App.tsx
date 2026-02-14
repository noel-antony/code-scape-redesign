import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import About from "@/pages/About";
import CaseStudies from "@/pages/CaseStudies";
import Careers from "@/pages/Careers";
import Blog from "@/pages/Blog";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";
import { ParticleCursor } from "@/components/ParticleCursor";
import { PageTransition } from "@/components/PageTransition";

function ScrollToTop() {
  const [pathname] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Router() {
  const [location] = useLocation();
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Switch key={location} location={location}>
            <Route path="/">
              <PageTransition>
                <Home />
              </PageTransition>
            </Route>
            <Route path="/services">
              <PageTransition>
                <Services />
              </PageTransition>
            </Route>
            <Route path="/about">
              <PageTransition>
                <About />
              </PageTransition>
            </Route>
            <Route path="/case-studies">
              <PageTransition>
                <CaseStudies />
              </PageTransition>
            </Route>
            <Route path="/careers">
              <PageTransition>
                <Careers />
              </PageTransition>
            </Route>
            <Route path="/blog">
              <PageTransition>
                <Blog />
              </PageTransition>
            </Route>
            <Route path="/contact">
              <PageTransition>
                <Contact />
              </PageTransition>
            </Route>
            <Route>
              <PageTransition>
                <NotFound />
              </PageTransition>
            </Route>
          </Switch>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ParticleCursor />
        <Router />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
