'use client';

import React, { useState } from 'react';
import Loader from '@/components/ui/Loader';
import Navbar from '@/components/sections/Navbar';
import AmbientBackgroundParallax from '@/components/ui/AmbientBackgroundParallax';
import Hero from '@/components/sections/Hero';
import MetricTicker from '@/components/sections/MetricTicker';
import About from '@/components/sections/About';
import ProjectShowcase from '@/components/sections/ProjectShowcase';
import Skills from '@/components/sections/Skills';
import TrophyCabinet from '@/components/sections/TrophyCabinet';
import Timeline from '@/components/sections/Timeline';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';

export default function Home() {
  const [loaderFinished, setLoaderFinished] = useState(false);

  return (
    <>
      {/* Fast, cinematic editorial loader */}
      <Loader onComplete={() => setLoaderFinished(true)} />

      {/* Main Portfolio Architecture */}
      <div className={`relative transition-opacity duration-700 ${loaderFinished ? 'opacity-100' : 'opacity-95'}`}>
        {/* Continuous deep background telemetry parallax */}
        <AmbientBackgroundParallax />
        <Navbar />
        <main id="main-content" className="relative z-10">
          <Hero />
          <MetricTicker />
          <ProjectShowcase />
          <About />
          <Skills />
          <TrophyCabinet />
          <Timeline />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
