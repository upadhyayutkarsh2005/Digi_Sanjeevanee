from pydantic import BaseModel

class User(BaseModel):
    username: str
    email: str
    password: str   #p
    
    doctors_list = [
    {
        "id": "1",
        "name": "Dr. Ayesha Khan",
        "specialization": "Cardiologist",
        "availability": "Mon-Fri 10:00 AM - 4:00 PM"
    },
    {
        "id": "2",
        "name": "Dr. Rajeev Mehta",
        "specialization": "Dermatologist",
        "availability": "Tue-Sat 11:00 AM - 5:00 PM"
    },
    {
        "id": "3",
        "name": "Dr. Sunita Sharma",
        "specialization": "Pediatrician",
        "availability": "Mon-Fri 9:00 AM - 2:00 PM"
    },
    {
        "id": "4",
        "name": "Dr. Arjun Rao",
        "specialization": "Neurologist",
        "availability": "Mon-Thu 1:00 PM - 6:00 PM"
    },
    {
        "id": "5",
        "name": "Dr. Meenal Desai",
        "specialization": "Gynecologist",
        "availability": "Mon-Sat 10:00 AM - 1:00 PM"
    },
    {
        "id": "6",
        "name": "Dr. Prateek Agarwal",
        "specialization": "Orthopedic Surgeon",
        "availability": "Wed-Sun 2:00 PM - 7:00 PM"
    },
    {
        "id": "7",
        "name": "Dr. Nisha Verma",
        "specialization": "Endocrinologist",
        "availability": "Mon-Fri 12:00 PM - 5:00 PM"
    },
    {
        "id": "8",
        "name": "Dr. Harsh Vardhan",
        "specialization": "Oncologist",
        "availability": "Tue-Fri 10:00 AM - 3:00 PM"
    },
    {
        "id": "9",
        "name": "Dr. Kavita Iyer",
        "specialization": "Psychiatrist",
        "availability": "Mon-Sat 4:00 PM - 8:00 PM"
    },
    {
        "id": "10",
        "name": "Dr. Rohit Nair",
        "specialization": "General Physician",
        "availability": "Everyday 9:00 AM - 9:00 PM"
    }
]
    
@router.get("/doctors")
async def get_doctors():
    return {"doctors": doctors_list}