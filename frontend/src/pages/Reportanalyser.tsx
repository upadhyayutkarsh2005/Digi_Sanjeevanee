import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UploadCloud, Loader } from "lucide-react";
import axios from "axios";

export default function MedicalReportUploader() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [insights, setInsights] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first.");
      return;
    }

    setUploading(true);
    setError(null);
    setInsights(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:8000/report/analyze-report", 
        formData, 
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setInsights(response.data.insights);
    } catch (err) {
      setError("Failed to analyze the report. Please try again.");
    }

    setUploading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-10 bg-gradient-to-br from-sanjeevani-light to-white">
      <Card className="w-full max-w-2xl p-8 bg-white shadow-2xl rounded-3xl border border-gray-200">
        <CardContent className="space-y-6 text-center">
          <h2 className="text-3xl font-extrabold text-sanjeevani-dark">Medical Report Analyzer</h2>
          <p className="text-gray-600">Upload your medical report (PDF/Image/TXT) and let our AI give you a smart summary.</p>
          <div className="flex flex-col items-center p-6 border-2 border-dashed rounded-xl border-sanjeevani-primary bg-sanjeevani-primary/5">
            <UploadCloud className="w-10 h-10 text-sanjeevani-primary" />
            <Input type="file" onChange={handleFileChange} className="mt-3" />
          </div>
          <Button
            onClick={handleUpload}
            disabled={uploading}
            className="w-full py-2 text-lg font-semibold bg-sanjeevani-primary hover:bg-sanjeevani-secondary"
          >
            {uploading ? <Loader className="animate-spin" /> : "Upload & Analyze"}
          </Button>
          {error && <p className="text-red-500 font-medium">{error}</p>}
        </CardContent>
      </Card>

      {insights && (
        <Card className="w-full max-w-3xl mt-10 p-6 bg-white shadow-2xl rounded-3xl border border-gray-200">
          <CardContent>
            <h3 className="text-2xl font-bold text-sanjeevani-dark mb-4">AI-Generated Insights</h3>
            <div className="max-h-[500px] overflow-y-auto whitespace-pre-wrap text-gray-800 leading-relaxed text-sm bg-sanjeevani-light/20 p-4 rounded-lg">
              {insights}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
