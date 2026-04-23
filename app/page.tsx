"use client";

import CustomCursor from "./components/CustomCursor";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Logos from "./components/Logos";
import Features from "./components/Features";
import DashboardDemo from "./components/DashboardDemo";
import Testimonials from "./components/Testimonials";
import Pricing from "./components/Pricing";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import TweaksPanel from "./components/TweaksPanel";
import { useReveal } from "./components/useReveal";

export default function Page() {
  useReveal();
  return (
    <main>
      <CustomCursor />
      <Nav />
      <Hero />
      <Logos />
      <Features />
      <DashboardDemo />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Footer />
      <TweaksPanel />
    </main>
  );
}
