import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";

const doctors = [
  {
    name: "Dr. Ananya Sharma",
    specialty: "Cardiologist",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    description: "Expert in heart-related conditions with 10+ years of experience."
  },
  {
    name: "Dr. Rahul Verma",
    specialty: "Dermatologist",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    description: "Treats all skin-related issues with modern techniques."
  },
  {
    name: "Dr. Meera Joshi",
    specialty: "Pediatrician",
    image: "https://randomuser.me/api/portraits/women/47.jpg",
    description: "Specializes in child healthcare and wellness."
  },
  {
    name: "Dr. Arjun Patel",
    specialty: "Neurologist",
    image: "https://randomuser.me/api/portraits/men/48.jpg",
    description: "Specialist in nervous system disorders."
  },
  {
    name: "Dr. Sneha Iyer",
    specialty: "Gynecologist",
    image: "https://randomuser.me/api/portraits/women/49.jpg",
    description: "Focused on women's health and prenatal care."
  },
  {
    name: "Dr. Karan Malhotra",
    specialty: "Orthopedic Surgeon",
    image: "https://randomuser.me/api/portraits/men/50.jpg",
    description: "Treats bone injuries and joint disorders."
  }
];

export default function DoctorList() {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [formData, setFormData] = useState({
    patient_name: "",
    date: "",
    time: "",
  });
  const [jitsiLink, setJitsiLink] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAppointmentSubmit = async () => {
    const payload = {
      ...formData,
      doctor_name: selectedDoctor.name,
    };

    try {
      const response = await axios.post("http://localhost:8000/api/book-appointment", payload);
      setJitsiLink(response.data.appointment.jitsi_link);
    } catch (error) {
      console.error("Error booking appointment:", error);
    }
  };

  return (
    <div className="min-h-screen bg-sanjeevani-light py-10 px-4">
      <h1 className="text-4xl font-bold text-sanjeevani-dark text-center mb-10">Choose a Doctor</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {doctors.map((doctor, index) => (
          <Card key={index} className="bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition-all">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <CardContent className="space-y-2">
              <h2 className="text-xl font-semibold text-sanjeevani-dark">{doctor.name}</h2>
              <p className="text-sanjeevani-secondary font-medium">{doctor.specialty}</p>
              <p className="text-gray-600 text-sm">{doctor.description}</p>
              <Dialog>
              <DialogTrigger asChild>
    <Button
      onClick={() => {
        setSelectedDoctor(doctor); // Set the selected doctor
        setFormData({ patient_name: "", date: "", time: "" }); // Reset form fields
        setJitsiLink(""); // Reset Jitsi link
      }}
      className="bg-sanjeevani-primary hover:bg-sanjeevani-secondary text-white w-full mt-2"
    >
      Book Appointment
    </Button>
  </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Book Appointment with {selectedDoctor?.name}</DialogTitle>
                    <DialogDescription>
                      Please fill in your details to confirm the appointment.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="patient_name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="patient_name"
                        name="patient_name"
                        value={formData.patient_name}
                        onChange={handleInputChange}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="date" className="text-right">
                        Date
                      </Label>
                      <Input
                        id="date"
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="time" className="text-right">
                        Time
                      </Label>
                      <Input
                        id="time"
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <Button onClick={handleAppointmentSubmit} className="w-full bg-sanjeevani-primary hover:bg-sanjeevani-secondary text-white">
                    Confirm Appointment
                  </Button>
                  {jitsiLink && (
                    <p className="mt-4 text-green-600 font-medium text-center">
                      Video Consultation Link: <a href={jitsiLink} target="_blank" className="underline">{jitsiLink}</a>
                    </p>
                  )}
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
// Note: Ensure to replace the API endpoint with your actual backend URL and handle CORS if necessary.