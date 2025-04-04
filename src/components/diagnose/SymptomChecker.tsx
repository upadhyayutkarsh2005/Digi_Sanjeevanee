
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { Bot, Loader2 } from 'lucide-react';

// Mock symptoms for demonstration
const commonSymptoms = [
  { id: "fever", label: "Fever" },
  { id: "cough", label: "Cough" },
  { id: "headache", label: "Headache" },
  { id: "fatigue", label: "Fatigue" },
  { id: "sore-throat", label: "Sore Throat" },
  { id: "body-ache", label: "Body Ache" },
  { id: "shortness-of-breath", label: "Shortness of Breath" },
  { id: "nausea", label: "Nausea" },
];

const SymptomChecker = () => {
  const { toast } = useToast();
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<{
    possibleConditions: { name: string; probability: number }[];
    recommendations: string[];
    severity: "Low" | "Moderate" | "High";
  } | null>(null);

  const handleSymptomToggle = (symptomId: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptomId) 
        ? prev.filter(id => id !== symptomId) 
        : [...prev, symptomId]
    );
  };

  const handleAnalyze = () => {
    if (selectedSymptoms.length === 0) {
      toast({
        title: "No symptoms selected",
        description: "Please select at least one symptom to analyze.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI analysis with a timeout
    setTimeout(() => {
      // This is mock data - in a real app, this would come from an AI model
      const mockResult = {
        possibleConditions: [
          { name: "Common Cold", probability: 75 },
          { name: "Seasonal Allergies", probability: 45 },
          { name: "Influenza", probability: 30 },
        ],
        recommendations: [
          "Rest and stay hydrated",
          "Over-the-counter medication may help alleviate symptoms",
          "If symptoms persist for more than 5 days, consult a healthcare provider",
        ],
        severity: "Low" as const,
      };
      
      setResult(mockResult);
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis complete",
        description: "Your symptoms have been analyzed successfully.",
      });
    }, 3000);
  };

  const resetForm = () => {
    setSelectedSymptoms([]);
    setAdditionalInfo("");
    setResult(null);
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="border-gray-200 shadow-md">
            <CardHeader className="bg-sanjeevani-primary/10 border-b border-gray-200">
              <div className="flex items-center mb-2">
                <Bot size={24} className="text-sanjeevani-primary mr-2" />
                <CardTitle className="text-2xl text-sanjeevani-dark">AI Symptom Checker</CardTitle>
              </div>
              <CardDescription>
                Describe your symptoms and our AI will analyze them to provide possible diagnoses and recommendations.
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-6">
              {!result ? (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Basic Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                        <Input 
                          type="number" 
                          placeholder="Enter your age" 
                          min="0" 
                          max="120"
                          value={age}
                          onChange={(e) => setAge(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                        <select
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                        >
                          <option value="">Select gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Select Your Symptoms</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {commonSymptoms.map((symptom) => (
                        <div key={symptom.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={symptom.id} 
                            checked={selectedSymptoms.includes(symptom.id)}
                            onCheckedChange={() => handleSymptomToggle(symptom.id)}
                          />
                          <label
                            htmlFor={symptom.id}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {symptom.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Additional Information</h3>
                    <Textarea
                      placeholder="Describe any other symptoms or provide more context..."
                      className="min-h-[100px]"
                      value={additionalInfo}
                      onChange={(e) => setAdditionalInfo(e.target.value)}
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3 flex items-center">
                      <span className="mr-2">Analysis Results</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        result.severity === "Low" 
                          ? "bg-green-100 text-green-800" 
                          : result.severity === "Moderate" 
                            ? "bg-yellow-100 text-yellow-800" 
                            : "bg-red-100 text-red-800"
                      }`}>
                        {result.severity} Risk
                      </span>
                    </h3>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-3">Based on your symptoms, our AI suggests the following possible conditions:</p>
                      
                      <div className="space-y-3">
                        {result.possibleConditions.map((condition, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <span className="text-gray-800 font-medium">{condition.name}</span>
                            <div className="flex items-center">
                              <div className="w-32 bg-gray-200 rounded-full h-2.5 mr-2">
                                <div 
                                  className="bg-sanjeevani-primary h-2.5 rounded-full" 
                                  style={{ width: `${condition.probability}%` }}
                                ></div>
                              </div>
                              <span className="text-xs text-gray-600">{condition.probability}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Recommendations</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {result.recommendations.map((recommendation, index) => (
                        <li key={index} className="text-gray-700">{recommendation}</li>
                      ))}
                    </ul>
                    
                    <p className="mt-4 text-sm text-gray-500 italic">
                      Disclaimer: This is not a medical diagnosis. Always consult with a healthcare professional for proper medical advice.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
            
            <CardFooter className="flex justify-between border-t border-gray-200 pt-4">
              {!result ? (
                <>
                  <Button 
                    variant="outline" 
                    onClick={resetForm}
                    disabled={selectedSymptoms.length === 0 && !additionalInfo}
                  >
                    Clear All
                  </Button>
                  <Button 
                    className="bg-sanjeevani-primary hover:bg-sanjeevani-secondary text-white"
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : "Analyze Symptoms"}
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    onClick={resetForm}
                  >
                    Check New Symptoms
                  </Button>
                  <Button 
                    className="bg-sanjeevani-primary hover:bg-sanjeevani-secondary text-white"
                  >
                    Consult Doctor
                  </Button>
                </>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SymptomChecker;
