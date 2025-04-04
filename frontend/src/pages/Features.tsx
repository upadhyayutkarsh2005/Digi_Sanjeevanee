
import React from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Make sure this is imported
import NavBar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';
import {
  Hospital, Stethoscope, HeartPulse, Database, Shield, Share2,
  BellRing, Bot, BarChart
} from 'lucide-react';
import { Button } from "@/components/ui/button";


const features = [
  {
    icon: Hospital,
    title: "Find your nearest hospital",
    description: "Locate hospitals near your current location with ease. Our platform uses advanced geolocation technology to identify the nearest healthcare facilities, providing you with directions, contact details, and other essential information to ensure quick access to medical care when you need it most.",
  },
  {
    icon: Stethoscope,
    title: "Medical Report Analysis",
    description: "Upload your medical reports and receive instant analysis. Our AI-driven system interprets lab results, imaging studies, and other medical documents, providing you with clear insights and recommendations for follow-up care.",
    
  },
  {
    icon: HeartPulse,
    title: "Consult a Doctor",
    description: "Connect with qualified healthcare professionals for virtual consultations. Get expert advice, prescriptions, and follow-up care from the comfort of your home.",
    
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
  const navigate = useNavigate(); // ✅ INSIDE the component

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
                <div key={idx} className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-300">
                  <div className="w-12 h-12 bg-sanjeevani-primary/10 rounded-full flex items-center justify-center mb-4">
                    <feature.icon className="text-sanjeevani-primary" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 mb-4">{feature.description}</p>

                  {feature.title === "Find your nearest hospital" ? (
  <Button
    onClick={() => navigate("/hospital-locator")}
    className="bg-sanjeevani-primary text-white hover:bg-sanjeevani-secondary"
  >
    Locate Hospitals
  </Button>
) : feature.title === "Medical Report Analysis" ? (
  <Button
    onClick={() => navigate("/analyzer")}
    className="bg-sanjeevani-primary text-white hover:bg-sanjeevani-secondary"
  >
    Analyze Report
  </Button>
) : feature.title === "Consult a Doctor" ? (
  <Button
    onClick={() => navigate("/doctors")}
    className="bg-sanjeevani-primary text-white hover:bg-sanjeevani-secondary"
  >
    Book Appointment
  </Button>
) : feature.title === "Care Coordination" ? (
  <Button variant="link" className="text-sanjeevani-primary p-0 h-auto font-semibold">
    Learn more
  </Button>
) : feature.title === "Wellness Analytics" ? (
  <Button variant="link" className="text-sanjeevani-primary p-0 h-auto font-semibold">
    Learn more
  </Button>
) : (
  <Button variant="link" className="text-sanjeevani-primary p-0 h-auto font-semibold">
    Learn more
  </Button>
)}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ...rest of your sections */}
      </main>

      <Footer />
    </div>
  );
};

export default Features;