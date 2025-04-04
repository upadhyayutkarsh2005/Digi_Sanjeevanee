import React from 'react';
import { Brain, Stethoscope, HeartPulse } from 'lucide-react';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Features = () => {
  const navigate = useNavigate();

  const featuresData = [
    {
      id: 1,
      title: "AI Symptom Analysis",
      description: "Advanced AI algorithms analyze your symptoms to provide potential diagnoses and health insights.",
      icon: Brain,
      buttonText: "Try Diagnosis",
      action: () => navigate("/symptom-checker")
    },
    {
      id: 2,
      title: "Medical Consultation",
      description: "Connect with healthcare professionals for virtual consultations and personalized care.",
      icon: Stethoscope,
      buttonText: "Connect Now",
      action: () => navigate("/doctors")
    },
    {
      id: 3,
      title: "Health Monitoring",
      description: "Track vital signs and health metrics for proactive health management and early intervention.",
      icon: HeartPulse,
      buttonText: "Monitor Health",
      action: () => console.log("Monitor Health clicked")
    }
  ];

  return (
    <section className="py-16 bg-sanjeevani-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-sanjeevani-dark">Our Smart Healthcare Features</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Innovative AI-powered solutions designed to provide accurate diagnoses and improve your healthcare experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuresData.map((feature) => (
            <Card key={feature.id} className="border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-sanjeevani-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="text-sanjeevani-primary" size={24} />
                </div>
                <CardTitle className="text-xl text-sanjeevani-dark">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button
                  className="w-full bg-sanjeevani-primary hover:bg-sanjeevani-secondary text-white"
                  onClick={feature.action}
                >
                  {feature.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;