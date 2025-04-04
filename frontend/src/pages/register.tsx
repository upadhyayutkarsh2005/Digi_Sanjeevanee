import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/authapi"; // Import API function

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Utility function to validate email format
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    // Validate email format
    if (!isValidEmail(formData.email)) {
      setError("Invalid email format!");
      return;
    }

    try {
      setLoading(true);
      console.log("Payload being sent:", formData); // Log payload for debugging
      await registerUser(formData.username, formData.email, formData.password); // Call API
      console.log("User Registered Successfully!");
      navigate("/"); // Redirect to home page
    } catch (err: any) {
      setError(err.message || "Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-green-100 dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow sm:max-w-md xl:p-0 dark:bg-gray-800">
          <div className="p-6 space-y-4 sm:p-8">
            <h1 className="text-xl font-bold text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            {error && <p className="text-red-500">{error}</p>}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input type="text" name="username" placeholder="Username" onChange={handleChange} className="input" required />
              <input type="email" name="email" placeholder="Email" onChange={handleChange} className="input" required />
              <input type="password" name="password" placeholder="Password" onChange={handleChange} className="input" required />
              <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} className="input" required />
              <button type="submit" disabled={loading} className="w-full bg-green-600 text-white p-2 rounded">
                {loading ? "Registering..." : "Create an account"}
              </button>
            </form>
            <p className="text-sm text-gray-500">
              Already have an account? <a href="/login" className="text-green-600">Login here</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;