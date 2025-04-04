// export default NavBar;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { HeartPulse, Moon, Sun } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  useEffect(() => {
    // Initialize theme based on user preference or system setting
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <nav className="bg-white dark:bg-gray-800 py-4 px-6 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">

        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <HeartPulse size={28} className="text-sanjeevani-primary dark:text-white" />
          <span className="text-2xl font-bold text-sanjeevani-secondary dark:text-gray-100">Digi_Sanjeevani</span>
        </div>

        {/* Navigation Links */}
        <div className="bg-green-600 hidden md:flex items-center space-x-12 rounded-[10px] p-4">
          {[
            { name: 'Home', path: '/' },
            { name: 'About', path: '/about' },
            { name: 'Contact Us', path: '/contact' },
            { name: 'Features', path: '/features' }
          ].map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? "text-red-800 underline decoration-red-800 font-semibold"
                  : "text-gray-100 hover:text-white hover:underline transition-colors duration-300"
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Buttons Section */}
        <div className="flex space-x-3 items-center">
          <Button 
            onClick={() => navigate("/login")}
            variant="outline" 
            className="text-sanjeevani-primary border-sanjeevani-primary hover:bg-sanjeevani-primary hover:text-white"
          >
            Login
          </Button>
          <Button 
            onClick={() => navigate("/register")}
            variant="outline" 
            className="bg-sanjeevani-primary hover:bg-sanjeevani-secondary text-white"
          >
            Register
          </Button>
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500"
          >
            {darkMode ? <Sun className="text-yellow-500" /> : <Moon className="text-gray-800 dark:text-gray-100" />}
          </button>
        </div>

      </div>
    </nav>
  );
};

export default NavBar;

