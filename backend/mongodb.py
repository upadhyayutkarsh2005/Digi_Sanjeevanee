from motor.motor_asyncio import AsyncIOMotorClient

# MongoDB Connection URI (Use your actual credentials)
MONGO_URI = "mongodb+srv://Utkarsh1234:Jaihind123456@fastapilearn.j7yqi.mongodb.net/?retryWrites=true&w=majority&appName=Fastapilearn&tls=true&tlsAllowInvalidCertificates=true"

# Database Name
DB_NAME = "DigiSanjeevani"

class Database:
    def __init__(self):
        self.client = None
        self.db = None
        self.users_collection = None
        self.appointments_collection = None
        self.medical_records_collection = None
        self.medicine_recommendations_collection = None
        self.medical_reports_collection = None

    async def connect(self):
        self.client = AsyncIOMotorClient(MONGO_URI)
        self.db = self.client[DB_NAME]

        self.users_collection = self.db["users"]
        self.appointments_collection = self.db["appointments"]
        self.medical_records_collection = self.db["medical_records"]
        self.medicine_recommendations_collection = self.db["medicine_recommendations"]
        self.medical_reports_collection = self.db["medical_reports"]

        await self.users_collection.create_index("email", unique=True)

    async def close(self):
        if self.client:
            self.client.close()

# Singleton instance
database = Database()

# Access collections via database instance after `await database.connect()`
# Optional (if you need global access after initialization)
users_collection = lambda: database.users_collection
appointments_collection = lambda: database.appointments_collection
medical_records_collection = lambda: database.medical_records_collection
medicine_recommendations_collection = lambda: database.medicine_recommendations_collection
medical_reports_collection = lambda: database.medical_reports_collection