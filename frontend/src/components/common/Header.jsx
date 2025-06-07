// src/components/common/Header.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../ui/Button';

const Header = ({ onOpenAuthModal }) => {
  const navigate = useNavigate();
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isBlogDropdownOpen, setIsBlogDropdownOpen] = useState(false);
  
  const handleGetStartedClick = () => {
    onOpenAuthModal?.();
  };

  const toggleServicesDropdown = () => {
    setIsBlogDropdownOpen(false);
    setIsServicesDropdownOpen(!isServicesDropdownOpen);
  };
  
  const toggleBlogDropdown = () => {
    setIsServicesDropdownOpen(false);
    setIsBlogDropdownOpen(!isBlogDropdownOpen);
  };

  const handleServiceClick = (path) => {
    setIsServicesDropdownOpen(false);
    navigate(path);
  };
  
  const handleBlogClick = (path) => {
    setIsBlogDropdownOpen(false);
    navigate(path);
  };

  const handleAuthRequiredService = (servicePath) => {
    setIsServicesDropdownOpen(false);
    // Store intended destination for redirect after authentication
    sessionStorage.setItem('redirectAfterAuth', servicePath);
    onOpenAuthModal?.();
  };

  // Close all dropdowns
  const closeAllDropdowns = () => {
    setIsServicesDropdownOpen(false);
    setIsBlogDropdownOpen(false);
  };

  return (
    <header className="bg-[#f8f3e8] h-[72px] flex items-center px-4 relative">
      <div className="w-full max-w-[1440px] mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <img 
            src="/images/img_image_2.png" 
            alt="SafeSense Logo" 
            className="h-[72px] w-[95px] object-contain"
          />
        </div>

        {/* Navigation */}
        <nav className="flex items-center space-x-8">
          <Link 
            to="/" 
            className="text-[16px] font-opensans font-normal leading-[19px] text-[#02090a] hover:text-blue-600 transition-colors"
          >
            Home Page
          </Link>
          <Link 
            to="/about" 
            className="text-[16px] font-opensans font-normal leading-[19px] text-[#02090a] hover:text-blue-600 transition-colors"
          >
            About Us
          </Link>
          <div className="flex items-center space-x-1 relative">
            <button 
              onClick={toggleServicesDropdown}
              className="flex items-center space-x-1 text-[16px] font-opensans font-normal leading-[19px] text-[#02090a] hover:text-blue-600 transition-colors focus:outline-none"
            >
              <span>Services</span>
              <img 
                src="/images/img_chevron_down.svg" 
                alt="Dropdown" 
                className={`w-[24px] h-[24px] transition-transform duration-300 ${isServicesDropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>
            
            {/* Services Dropdown Menu */}
            {isServicesDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 bg-[#f8f3e8] rounded-md shadow-lg overflow-hidden z-10 min-w-[220px]">
                <div className="py-1">
                  <button
                    onClick={() => handleServiceClick('/menstrual-cycle-tracking')}
                    className="block w-full text-left px-4 py-2 text-[14px] font-opensans text-[#02090a] hover:bg-[#e8e3d8] transition-colors focus:outline-none"
                  >
                    Track Menstrual Cycle
                  </button>
                  <button
                    onClick={() => handleAuthRequiredService('/book-consultant')}
                    className="block w-full text-left px-4 py-2 text-[14px] font-opensans text-[#02090a] hover:bg-[#e8e3d8] transition-colors focus:outline-none"
                  >
                    Book Consultant
                  </button>
                  <button
                    onClick={() => handleAuthRequiredService('/book-testing')}
                    className="block w-full text-left px-4 py-2 text-[14px] font-opensans text-[#02090a] hover:bg-[#e8e3d8] transition-colors focus:outline-none"
                  >
                    Book STIs Testing
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-1 relative">
            <button 
              onClick={toggleBlogDropdown}
              className="flex items-center space-x-1 text-[16px] font-opensans font-normal leading-[19px] text-[#02090a] hover:text-blue-600 transition-colors focus:outline-none"
            >
              <span>Blog</span>
              <img 
                src="/images/img_chevron_down.svg" 
                alt="Dropdown" 
                className={`w-[24px] h-[24px] transition-transform duration-300 ${isBlogDropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>
            
            {/* Blog Dropdown Menu */}
            {isBlogDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 bg-[#f8f3e8] rounded-md shadow-lg overflow-hidden z-10 min-w-[300px]">
                <div className="py-1">
                  <button
                    onClick={() => handleBlogClick('/blog/reproductive-health')}
                    className="block w-full text-left px-4 py-2 text-[14px] font-opensans text-[#02090a] hover:bg-[#e8e3d8] transition-colors focus:outline-none"
                  >
                    Blog on Reproductive Health
                  </button>
                  <button
                    onClick={() => handleBlogClick('/blog/std-sti')}
                    className="block w-full text-left px-4 py-2 text-[14px] font-opensans text-[#02090a] hover:bg-[#e8e3d8] transition-colors focus:outline-none"
                  >
                    Blog on Sexually Transmitted Diseases (STDs/STIs)
                  </button>
                  <button
                    onClick={() => handleBlogClick('/blog/mental-wellness')}
                    className="block w-full text-left px-4 py-2 text-[14px] font-opensans text-[#02090a] hover:bg-[#e8e3d8] transition-colors focus:outline-none"
                  >
                    Blog on Sexual and Mental Wellness
                  </button>
                  <button
                    onClick={() => handleBlogClick('/blog/specific-groups')}
                    className="block w-full text-left px-4 py-2 text-[14px] font-opensans text-[#02090a] hover:bg-[#e8e3d8] transition-colors focus:outline-none"
                  >
                    Blog on Sexual Health for Specific Groups
                  </button>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Get Started Button */}
        <Button 
          onClick={handleGetStartedClick}
          variant="primary"
          className="bg-gradient-to-r from-[#22b8bf] to-[#8124b79b] border border-[#b122bf75] rounded-[6px] h-[44px] w-[170px] text-white text-[16px] font-medium leading-[19px] hover:opacity-90 transition-opacity"
        >
          Get Started Now
        </Button>
      </div>
      
      {/* Overlay to close dropdown when clicking outside */}
      {(isServicesDropdownOpen || isBlogDropdownOpen) && (
        <div 
          className="fixed inset-0 z-0"
          onClick={closeAllDropdowns}
        ></div>
      )}
    </header>
  );
};

export default Header;