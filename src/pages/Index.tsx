
import React from 'react';
import NavBar from '@/components/layout/NavBar';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import SymptomChecker from '@/components/diagnose/SymptomChecker';
import HealthMetrics from '@/components/diagnose/HealthMetrics';
import CallToAction from '@/components/home/CallToAction';
import Footer from '@/components/layout/Footer';

const Index = () => {
  return (
    // #This line added bgcolor
    <div className="min-h-screen flex flex-col bg-white-100">  
      <NavBar />
      <Hero />
      <Features />
      <SymptomChecker />
      <HealthMetrics />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
