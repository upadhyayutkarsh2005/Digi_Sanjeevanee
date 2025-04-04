import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // ✅ Import useNavigate
import { Button } from "@/components/ui/button";
import { HeartPulse } from 'lucide-react';

const NavBar: React.FC = () => {
  const navigate = useNavigate(); // ✅ Move useNavigate() inside the component

  return (
    <nav className="bg-white py-4 px-6 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <HeartPulse size={28} className="text-sanjeevani-primary" />
          <span className="text-2xl font-bold text-sanjeevani-secondary">Digi_Sanjeevani</span>
        </div>
        
        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-700 hover:text-sanjeevani-primary transition-colors">Home</Link>
          <Link to="/about" className="text-gray-700 hover:text-sanjeevani-primary transition-colors">About</Link>
          <Link to="/contact" className="text-gray-700 hover:text-sanjeevani-primary transition-colors">Contact Us</Link>
          <Link to="/features" className="text-gray-700 hover:text-sanjeevani-primary transition-colors">Features</Link>
        </div>

        {/* Login & Register Buttons */}
        <div className="flex space-x-3">
          <Button 
            onClick={() => navigate("/login")} // ✅ Correct absolute route
            variant="outline" 
            className="text-sanjeevani-primary border-sanjeevani-primary hover:bg-sanjeevani-primary hover:text-white"
          >
            Login
          </Button>
          <Button 
          onClick={() => navigate("/register")} // ✅ Correct absolute route
          variant="outline" 
          className="bg-sanjeevani-primary hover:bg-sanjeevani-secondary text-white">
            Register
          </Button>
        </div>

      </div>
    </nav>
  );
};

export default NavBar;