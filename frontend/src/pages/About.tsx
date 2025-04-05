
import React from 'react';
import NavBar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from "@/components/ui/card";
import { Brain, User, Award, Heart } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        <section className="py-16 bg-sanjeevani-light">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h1 className="text-4xl font-bold text-sanjeevani-dark mb-4">About Digi_Sanjeevani</h1>
              <p className="text-lg text-gray-600">
                We're on a mission to transform healthcare through AI-powered technology, making quality healthcare accessible to everyone.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="border-gray-200">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-sanjeevani-primary/10 rounded-full flex items-center justify-center mb-4">
                      <Brain className="text-sanjeevani-primary" size={32} />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
                    <p className="text-gray-600">
                      To create a world where advanced healthcare is accessible to everyone through innovative AI technology, empowering individuals to take control of their health.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-gray-200">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-sanjeevani-primary/10 rounded-full flex items-center justify-center mb-4">
                      <Heart className="text-sanjeevani-primary" size={32} />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
                    <p className="text-gray-600">
                      To leverage artificial intelligence and medical expertise to provide accurate health insights, early disease detection, and personalized healthcare recommendations.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-sanjeevani-dark mb-8 text-center">Our Story</h2>
              
              <div className="prose prose-lg max-w-none">
  <p>
    Digi_Sanjeevani was born from a vision to revolutionize healthcare through the power of artificial intelligence and smart technology.
  </p>

  <p>
    In an age where time is precious and access to quality medical care remains a challenge for many, Digi_Sanjeevani bridges the gap by offering AI-powered medical report analysis, real-time symptom prediction, and instant doctor consultations—all from the convenience of your device.
  </p>

  <p>
    With features like nearby hospital discovery, air quality insights, and personalized health recommendations, we aim to make proactive, accessible, and intelligent healthcare a reality for everyone.
  </p>

  <p>
    Digi_Sanjeevani isn’t just an application; it’s your digital health companion, empowering you to take charge of your well-being with confidence and clarity.
  </p>
</div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-sanjeevani-light">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-sanjeevani-dark mb-12 text-center">Our Values</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-sanjeevani-primary/10 rounded-full flex items-center justify-center mb-4">
                  <User className="text-sanjeevani-primary" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Patient-Centered</h3>
                <p className="text-gray-600">
                  We place users at the center of everything we do, designing our platform to be accessible, easy to use, and responsive to their needs.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-sanjeevani-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Award className="text-sanjeevani-primary" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Excellence</h3>
                <p className="text-gray-600">
                  We strive for excellence in our technology, continuously improving our algorithms to provide the most accurate and helpful health insights.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-sanjeevani-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Brain className="text-sanjeevani-primary" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                <p className="text-gray-600">
                  We embrace innovation, constantly exploring new ways to leverage AI and technology to improve healthcare delivery and outcomes.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
