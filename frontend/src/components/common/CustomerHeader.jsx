import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const CustomerHeader = ({ user }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isBlogDropdownOpen, setIsBlogDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  
  const toggleServicesDropdown = () => {
    setIsBlogDropdownOpen(false);
    setIsProfileDropdownOpen(false);
    setIsServicesDropdownOpen(!isServicesDropdownOpen);
  };
  
  const toggleBlogDropdown = () => {
    setIsServicesDropdownOpen(false);
    setIsProfileDropdownOpen(false);
    setIsBlogDropdownOpen(!isBlogDropdownOpen);
  };

  const toggleProfileDropdown = () => {
    setIsServicesDropdownOpen(false);
    setIsBlogDropdownOpen(false);
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleServiceClick = (path) => {
    setIsServicesDropdownOpen(false);
    navigate(path);
  };
  
  const handleBlogClick = (path) => {
    setIsBlogDropdownOpen(false);
    navigate(path);
  };

  const handleProfileClick = (path) => {
    setIsProfileDropdownOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    setIsProfileDropdownOpen(false);
    logout();
    navigate('/');
  };

  // Close all dropdowns
  const closeAllDropdowns = () => {
    setIsServicesDropdownOpen(false);
    setIsBlogDropdownOpen(false);
    setIsProfileDropdownOpen(false);
  };

  // Get user initials for avatar fallback
  const getInitials = () => {
    if (!user?.name) return 'U';
    return user.name.split(' ').map(n => n[0]).join('').toUpperCase();
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
            to="/customer" 
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
                    onClick={() => handleServiceClick('/book-consultant')}
                    className="block w-full text-left px-4 py-2 text-[14px] font-opensans text-[#02090a] hover:bg-[#e8e3d8] transition-colors focus:outline-none"
                  >
                    Book Consultant
                  </button>
                  <button
                    onClick={() => handleServiceClick('/book-testing')}
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

        {/* Avatar & Profile Dropdown */}
        <div className="relative">
          <button 
            onClick={toggleProfileDropdown}
            className="flex items-center focus:outline-none"
          >
            {user?.avatar ? (
              <img 
                src={user.avatar}
                alt="User Avatar" 
                className="h-[44px] w-[44px] rounded-full object-cover border-2 border-[#22b8bf]"
              />
            ) : (
              <div className="h-[44px] w-[44px] rounded-full bg-gradient-to-r from-[#22b8bf] to-[#8124b79b] flex items-center justify-center text-white font-merriweather font-bold">
                {getInitials()}
              </div>
            )}
            <img 
              src="/images/img_chevron_down.svg" 
              alt="Dropdown" 
              className={`w-[24px] h-[24px] ml-2 transition-transform duration-300 ${isProfileDropdownOpen ? 'rotate-180' : ''}`}
            />
          </button>
          
          {/* Profile Dropdown Menu */}
          {isProfileDropdownOpen && (
            <div className="absolute top-full right-0 mt-1 bg-[#f8f3e8] rounded-md shadow-lg overflow-hidden z-10 min-w-[200px]">
              <div className="py-1">
                <div className="px-4 py-3 border-b border-gray-200">
                  <p className="text-[16px] font-merriweather font-bold text-[#02090a]">
                    {user?.name || 'User'}
                  </p>
                  <p className="text-[14px] font-opensans text-gray-600 truncate">
                    {user?.email || 'user@example.com'}
                  </p>
                </div>
                <button
                  onClick={() => handleProfileClick('/profile')}
                  className="block w-full text-left px-4 py-2 text-[14px] font-opensans text-[#02090a] hover:bg-[#e8e3d8] transition-colors focus:outline-none"
                >
                  My Profile
                </button>
                <button
                  onClick={() => handleProfileClick('/appointments')}
                  className="block w-full text-left px-4 py-2 text-[14px] font-opensans text-[#02090a] hover:bg-[#e8e3d8] transition-colors focus:outline-none"
                >
                  My Appointments
                </button>
                <button
                  onClick={() => handleProfileClick('/health-records')}
                  className="block w-full text-left px-4 py-2 text-[14px] font-opensans text-[#02090a] hover:bg-[#e8e3d8] transition-colors focus:outline-none"
                >
                  Health Records
                </button>
                <button
                  onClick={() => handleProfileClick('/settings')}
                  className="block w-full text-left px-4 py-2 text-[14px] font-opensans text-[#02090a] hover:bg-[#e8e3d8] transition-colors focus:outline-none"
                >
                  Settings
                </button>
                <div className="border-t border-gray-200 mt-1">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-[14px] font-opensans text-red-600 hover:bg-[#e8e3d8] transition-colors focus:outline-none"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Overlay to close dropdown when clicking outside */}
      {(isServicesDropdownOpen || isBlogDropdownOpen || isProfileDropdownOpen) && (
        <div 
          className="fixed inset-0 z-0"
          onClick={closeAllDropdowns}
        ></div>
      )}
    </header>
  );
};

export default CustomerHeader; 