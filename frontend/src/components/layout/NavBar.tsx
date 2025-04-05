import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { HeartPulse } from 'lucide-react';

const NavBar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-sanjeevani py-4 px-6 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">

        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <HeartPulse size={28} className="text-sanjeevani-primary" />
          <span className="text-2xl font-bold text-sanjeevani-secondary">Digi_Sanjeevani</span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
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
                `relative px-3 py-1.5 text-gray-700 font-medium transition-colors duration-200
                hover:text-sanjeevani-primary hover:bg-sanjeevani-primary/10 rounded-full
                ${isActive ? 'text-sanjeevani-primary font-semibold after:content-[""] after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-3/5 after:h-[2px] after:bg-sanjeevani-primary after:rounded-full' : ''}`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Login & Register Buttons */}
        <div className="flex space-x-3">
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
        </div>

      </div>
    </nav>
  );
};

export default NavBar;