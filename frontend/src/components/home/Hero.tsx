import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import doctorVideo from '@/asset/doctor.mp4';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col-reverse md:flex-row md:items-stretch min-h-[500px]">
        
        {/* 👈 Video Section (Left) */}
        <div className="md:w-1/2 flex justify-center items-center">
          <video
            src={doctorVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>

        {/* 👉 Text Section (Right) */}
        <div className="md:w-1/2 flex flex-col justify-center md:pl-10 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-sanjeevani-dark">
            Digi_Sanjeevani
          </h1>

          <div className="bg-white rounded-full inline-flex items-center px-6 py-2 my-4">
            <span className="text-gray-700 mr-2">Health Matters</span>
            <span className="text-sanjeevani-accent">❤️</span>
          </div>

          <h2 className="text-sanjeevani-accent text-2xl md:text-3xl font-bold italic">
            One Goal,<br />
            One Mission,<br />
            Your Health!!!!
          </h2>

          <p className="text-gray-700 my-6">
            Instant Medical Insights, <span className="text-sanjeevani-accent font-semibold">AI-Powered Diagnoses</span>, and Smart Healthcare Solutions—All in One Place.
          </p>

          <p className="text-gray-600 mb-8">
            Empowering you with AI-driven medical analysis, real-time health insights, and seamless doctor consultations—because your well-being matters.
          </p>

          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
            <Button
              className="bg-sanjeevani-primary hover:bg-sanjeevani-secondary text-white flex items-center"
              onClick={() => navigate('/features')}
            >
              Get Started <ArrowRight size={16} className="ml-2" />
            </Button>

            <Button
              variant="outline"
              className="border-sanjeevani-primary text-sanjeevani-primary hover:bg-sanjeevani-primary hover:text-white"
              onClick={() => navigate('/about')}
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;