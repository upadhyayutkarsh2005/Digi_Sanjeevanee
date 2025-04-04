import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authapi"; // Import the API function

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await loginUser(username, password);
      console.log("User Logged in Successfully!", response);
      
      // Store token in localStorage or state management
      localStorage.setItem("token", response.token); 
      
      alert("Login Successful!");
      navigate("/"); // Redirect to Home Page
    } catch (error: any) {
      alert(error || "Login failed! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-green-100 dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              
              {/* Username Field */}
              <div>
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Your username"
                  required
                />
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="••••••••"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              {/* Don't have an account? */}
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account? <a href="/register" className="font-medium text-green-600 hover:underline dark:text-green-500">Register here</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;