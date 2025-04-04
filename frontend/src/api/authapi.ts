import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

export const registerUser = async (username: string, email: string, password: string) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/auth/register`, 
            {
                username,
                email,
                password,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data;
    } catch (error: any) {
        console.error("Registration error details:", error.response?.data?.detail);
        
        if (error.response?.data?.detail && Array.isArray(error.response.data.detail)) {
            // Format FastAPI validation errors
            const errorMessages = error.response.data.detail.map((err: any) => 
                `${err.loc.join('.')} - ${err.msg}`
            ).join('; ');
            throw errorMessages;
        }
        
        throw error.response?.data?.detail || "Registration failed!";
    }
};

export const loginUser = async (username: string, password: string) => {
    try {
        // Create form data instead of JSON
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        
        const response = await axios.post(`${API_BASE_URL}/auth/login`, formData);
        return response.data;
    } catch (error: any) {
        throw error.response?.data?.detail || "Login failed!";
    }
};