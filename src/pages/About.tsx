
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
                  Digi_Sanjeevani was founded in 2023 by a team of healthcare professionals and AI experts who recognized the potential of artificial intelligence to revolutionize healthcare delivery and improve patient outcomes.
                </p>
                
                <p>
                  Our team noticed that many people around the world face barriers to accessing quality healthcare, whether due to geographic location, cost, or other factors. We believed that AI could help bridge this gap by providing initial assessments, health monitoring, and medical information.
                </p>
                
                <p>
                  We've developed advanced algorithms that analyze symptoms, medical history, and health metrics to provide accurate health insights. Our AI is continuously learning and improving through feedback from medical professionals and real-world data.
                </p>
                
                <p>
                  While we're proud of our technology, we recognize that AI cannot replace human healthcare providers. That's why we've designed our platform to complement traditional healthcare, helping users make informed decisions about when to seek professional medical care.
                </p>
                
                <p>
                  Today, Digi_Sanjeevani is helping thousands of users monitor their health, understand their symptoms, and connect with healthcare providers when needed. We're committed to continuing our mission of making healthcare more accessible, efficient, and personalized through the responsible use of AI technology.
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
