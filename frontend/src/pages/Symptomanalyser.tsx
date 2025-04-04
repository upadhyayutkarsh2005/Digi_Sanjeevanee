import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { Bot, Loader2 } from 'lucide-react';

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
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<null | {
    possibleConditions: { name: string; probability: number }[];
    recommendations: string[];
    severity: "Low" | "Moderate" | "High";
  }>(null);

  const handleSymptomToggle = (symptomId: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptomId)
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  const handleAnalyze = async () => {
    if (selectedSymptoms.length === 0) {
      toast({
        title: "No symptoms selected",
        description: "Please select at least one symptom.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);

    try {
      const res = await fetch("http://localhost:8000/analyze-symptoms/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms: selectedSymptoms }),
      });

      if (!res.ok) {
        throw new Error("Server returned an error");
      }

      const data = await res.json();
      setResult(data);
      toast({ title: "Analysis complete", description: "Your symptoms have been analyzed." });

    } catch (err) {
      console.error(err);
      toast({
        title: "Analysis failed",
        description: "Something went wrong while analyzing symptoms.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
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
                Select symptoms and our AI will analyze and provide possible diagnoses and recommendations.
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-6">
              {!result ? (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Select Your Symptoms</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {commonSymptoms.map(symptom => (
                        <div key={symptom.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={symptom.id}
                            checked={selectedSymptoms.includes(symptom.id)}
                            onCheckedChange={() => handleSymptomToggle(symptom.id)}
                          />
                          <label htmlFor={symptom.id} className="text-sm">{symptom.label}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-3">Additional Info (Optional)</h3>
                    <Textarea
                      placeholder="Describe anything else you're experiencing..."
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
                      <p className="text-sm text-gray-600 mb-3">Possible Conditions:</p>
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
                      {result.recommendations.map((rec, idx) => (
                        <li key={idx} className="text-gray-700">{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </CardContent>

            <CardFooter className="flex justify-between border-t border-gray-200 pt-4">
              {!result ? (
                <>
                  <Button variant="outline" onClick={resetForm}>Clear All</Button>
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
                  <Button variant="outline" onClick={resetForm}>Check New Symptoms</Button>
                  <Button className="bg-sanjeevani-primary text-white">Consult Doctor</Button>
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