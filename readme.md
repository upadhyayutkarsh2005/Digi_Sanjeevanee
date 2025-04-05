# 💊 Digi_Sanjeevani — AI-Powered Healthcare Companion

Digi_Sanjeevani is an AI-integrated healthcare web application developed for Hackathons to revolutionize digital health access. It offers core features like doctor consultation, symptom analysis, hospital locator, chatbot assistance, and intelligent medical report analysis — all wrapped in a beautiful, modern React + Tailwind CSS frontend.

## 🚀 Features

- 🧠 **AI Symptom Analyzer**: Enter symptoms to receive condition probabilities and recommendations using Gemini AI.
- 🩺 **Doctor Consultation System**: Browse doctors, book appointments, and receive video consultation links.
- 📍 **Nearest Hospital Locator**: Enter your location to find nearby hospitals using OpenStreetMap.
- 🤖 **Multilingual Medical Chatbot**: AI-powered health advice in English or Hindi.
- 📄 **Medical Report Analyzer**: Upload PDF or image reports and get structured insights using Gemini AI.
- 🧬 **Modern UI**: Responsive frontend built with **React.js** and **Tailwind CSS**.

---

## 🧑‍💻 Tech Stack

### 🖥️ Frontend
- React (TypeScript + Vite)
- Tailwind CSS
- Lucide Icons
- Axios

### ⚙️ Backend (FastAPI)
- FastAPI + Uvicorn
- Gemini AI (`google-generativeai`)
- OCR (Tesseract + Pillow)
- MongoDB (via `motor`)
- PyMuPDF for PDF parsing
- Geopy + OpenStreetMap API for hospital search

---

## 📁 Folder Structure

Digi_Sanjeevanee/
├── backend/                # FastAPI Backend
│   ├── auth/               # Authentication module
│   ├── node_modules/       # Dependencies (ignored in Git)
│   ├── venv/               # Python Virtual Environment
│   ├── __pycache__/        # Compiled Python files
│   ├── .env                # Environment Variables (API keys, secrets)
│   ├── .gitignore          # Git ignore file
│   ├── auth.py             # Authentication logic
│   ├── chatbot.py          # AI-powered chatbot logic
│   ├── config.py           # Configuration settings
│   ├── doctor_consultation.py # Doctor booking logic
│   ├── hospital_locator.py # Nearby hospital search
│   ├── main.py             # FastAPI main entry point
│   ├── medicine_recomm.py  # Medicine recommendation system
│   ├── models.py           # Database models (MongoDB)
│   ├── mongodb.py          # MongoDB connection setup
│   ├── reportanalyser.py   # Medical report analysis
│   ├── requirement.txt     # Python dependencies
│   ├── symptom_ai.py       # Symptom analysis logic
│   └── temp_WhatsApp_links/ # Temporary storage (probably for debugging)
│
├── frontend/               # React Frontend
│   ├── node_modules/       # Dependencies
│   ├── public/             # Static assets
│   ├── src/                # Source code
│   │   ├── api/            # API calls to backend
│   │   ├── asset/          # Images, icons, etc.
│   │   ├── components/     # React UI components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility functions
│   │   ├── pages/          # Page components (e.g., Home, About, etc.)
│   ├── package.json        # Frontend dependencies
│   ├── package-lock.json   # Dependency lock file
│
├── readme.md               # Project documentation
└── .gitignore              # Git ignore file


---

## 🔧 Installation Guide

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS version)
- Python 3.10+
- [Tesseract OCR](https://github.com/tesseract-ocr/tesseract) (for image analysis)
- MongoDB (local or Atlas)

---

### ⚙️ Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirement.txt
uvicorn main:app --reload

### 🖼️ Frontend Setup

cd frontend
npm install
npm run dev

✨ Future Enhancements
	•	User dashboard for health history tracking
	•	AI-driven medicine reminders
	•	Emergency SOS alert system
    and many more 


    📣 Team Digi_Sanjeevani

Built with ❤️ by healthcare enthusiasts and AI engineers.
Let’s revolutionize accessible and intelligent healthcare — one click at a time.

Utkarsh Upadhyay
Shashwat Mani Tripathi 
Harsh Bajpai
Praful Pandey


