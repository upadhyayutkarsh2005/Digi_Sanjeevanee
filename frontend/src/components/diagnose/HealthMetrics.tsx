import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, ThermometerSnowflake, Heart, Stethoscope } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for health metrics
const healthData = [
  { name: 'Mon', heartRate: 72, bloodPressure: 120, temperature: 98.1, respiratoryRate: 14 },
  { name: 'Tue', heartRate: 75, bloodPressure: 122, temperature: 98.3, respiratoryRate: 15 },
  { name: 'Wed', heartRate: 71, bloodPressure: 118, temperature: 98.0, respiratoryRate: 14 },
  { name: 'Thu', heartRate: 73, bloodPressure: 121, temperature: 98.2, respiratoryRate: 15 },
  { name: 'Fri', heartRate: 76, bloodPressure: 123, temperature: 98.4, respiratoryRate: 16 },
  { name: 'Sat', heartRate: 74, bloodPressure: 119, temperature: 98.1, respiratoryRate: 14 },
  { name: 'Sun', heartRate: 72, bloodPressure: 120, temperature: 98.0, respiratoryRate: 15 },
];

const metrics = [
  { name: 'Heart Rate', value: '72 bpm', icon: Heart, color: 'text-red-500', bgColor: 'bg-red-100' },
  { name: 'Blood Pressure', value: '120/80 mmHg', icon: Activity, color: 'text-blue-500', bgColor: 'bg-blue-100' },
  { name: 'Temperature', value: '98.6°F', icon: ThermometerSnowflake, color: 'text-orange-500', bgColor: 'bg-orange-100' },
  { name: 'Respiratory Rate', value: '14 brpm', icon: Stethoscope, color: 'text-green-500', bgColor: 'bg-green-100' },
];

const HealthMetrics = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-sanjeevani-dark">Health Monitoring</h2>
            <p className="text-gray-600 mt-2">
              Track your vital signs and health metrics for proactive health management
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {metrics.map((metric, idx) => (
              <Card key={idx} className="border-gray-200">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
                  <div className={`w-10 h-10 rounded-full ${metric.bgColor} flex items-center justify-center mb-3`}>
                    <metric.icon className={`${metric.color}`} size={20} />
                  </div>
                  <h3 className="text-sm font-medium text-gray-500">{metric.name}</h3>
                  <p className="text-xl font-semibold mt-1">{metric.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card className="border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle>Health Trends</CardTitle>
              <CardDescription>
                View your health metrics over time to identify patterns and trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={healthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="heartRate" stroke="#ff4d4f" name="Heart Rate (bpm)" />
                    <Line type="monotone" dataKey="bloodPressure" stroke="#1890ff" name="Blood Pressure (Systolic)" />
                    <Line type="monotone" dataKey="temperature" stroke="#fa8c16" name="Temperature (°F)" />
                    <Line type="monotone" dataKey="respiratoryRate" stroke="#52c41a" name="Respiratory Rate (brpm)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Development Note */}
          <p className="text-center text-sm text-gray-400 mt-6">
            🚧 This section is under development. More advanced health tracking features coming soon!
          </p>
        </div>
      </div>
    </section>
  );
};

export default HealthMetrics;