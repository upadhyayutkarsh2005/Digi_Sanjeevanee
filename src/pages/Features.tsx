
import React from 'react';
import NavBar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';
import { Brain, Stethoscope, HeartPulse, Database, Shield, Share2, BellRing, Bot, BarChart } from 'lucide-react';
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Brain,
    title: "AI Symptom Analysis",
    description: "Our advanced AI analyzes your symptoms to provide accurate health insights and potential diagnoses. The system learns from millions of medical records and stays updated with the latest medical research.",
  },
  {
    icon: Stethoscope,
    title: "Virtual Consultations",
    description: "Connect with healthcare professionals through secure video consultations. Get expert medical advice without leaving your home, and have prescriptions sent directly to your pharmacy.",
  },
  {
    icon: HeartPulse,
    title: "Health Monitoring",
    description: "Track vital signs, chronic conditions, and wellness metrics over time. Our system alerts you to concerning changes and helps you maintain optimal health through personalized recommendations.",
  },
  {
    icon: Database,
    title: "Medical Records",
    description: "Securely store and access your medical history, test results, medications, and appointments in one place. Share information with healthcare providers when needed.",
  },
  {
    icon: Shield,
    title: "Privacy Protection",
    description: "Your health data is protected with bank-level encryption and strict privacy controls. We comply with all healthcare data regulations and never sell your personal information.",
  },
  {
    icon: Share2,
    title: "Care Coordination",
    description: "Coordinate care between different healthcare providers by sharing information seamlessly. Improve communication and ensure everyone has the information they need.",
  },
  {
    icon: BellRing,
    title: "Medication Reminders",
    description: "Never miss a dose with customizable medication reminders. Track adherence and get refill alerts before you run out of important medications.",
  },
  {
    icon: Bot,
    title: "Health Chatbot",
    description: "Get immediate answers to health questions from our AI-powered chatbot. Available 24/7 to provide medical information based on reputable sources.",
  },
  {
    icon: BarChart,
    title: "Wellness Analytics",
    description: "Gain insights into your health trends with detailed analytics. Understand the impact of lifestyle changes on your overall health and well-being.",
  },
];

const Features = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        <section className="py-16 bg-sanjeevani-light">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h1 className="text-4xl font-bold text-sanjeevani-dark mb-4">Our Features</h1>
              <p className="text-lg text-gray-600">
                Discover the innovative tools and services that make Digi_Sanjeevani your complete healthcare companion.
              </p>
            </div>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, idx) => (
                <div key={idx} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
                  <div className="w-12 h-12 bg-sanjeevani-primary/10 rounded-full flex items-center justify-center mb-4">
                    <feature.icon className="text-sanjeevani-primary" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <Button variant="link" className="text-sanjeevani-primary p-0 h-auto font-semibold">
                    Learn more
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-sanjeevani-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-sanjeevani-dark mb-4">Ready to Experience Digi_Sanjeevani?</h2>
              <p className="text-lg text-gray-600 mb-8">
                Join thousands of users who are taking control of their health with our AI-powered platform.
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button size="lg" className="bg-sanjeevani-primary hover:bg-sanjeevani-secondary text-white">
                  Get Started
                </Button>
                <Button size="lg" variant="outline" className="border-sanjeevani-primary text-sanjeevani-primary hover:bg-sanjeevani-primary hover:text-white">
                  View Demo
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Features;
