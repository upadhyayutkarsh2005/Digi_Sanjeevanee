import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

const CallToAction = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/features');
  };

  const handleLearnMore = () => {
    navigate('/about');
  };

  return (
    <section className="py-16 bg-gradient-to-r from-sanjeevani-primary/90 to-sanjeevani-secondary/90 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Take Control of Your Health?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Get personalized health insights, AI-powered diagnoses, and connect with healthcare professionals all in one place.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Button
            size="lg"
            className="bg-white text-sanjeevani-primary hover:bg-gray-100"
            onClick={handleGetStarted}
          >
            Get Started <ArrowRight size={16} className="ml-2" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white/10"
            onClick={handleLearnMore}
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;