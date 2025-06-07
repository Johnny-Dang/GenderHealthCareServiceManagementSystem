import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import CustomerHeader from '../../components/common/CustomerHeader';
import Footer from '../../components/common/Footer';
import HeroSection from '../SafeSenseWomensHealthPlatform/HeroSection';
import ServicesSection from '../SafeSenseWomensHealthPlatform/ServicesSection';
import ConsultationSection from '../SafeSenseWomensHealthPlatform/ConsultationSection';
import TeamSection from '../SafeSenseWomensHealthPlatform/TeamSection';
import TestingSection from '../SafeSenseWomensHealthPlatform/TestingSection';
import CycleTrackingSection from '../SafeSenseWomensHealthPlatform/CycleTrackingSection';
import EducationSection from '../SafeSenseWomensHealthPlatform/EducationSection';
import TestimonialsSection from '../SafeSenseWomensHealthPlatform/TestimonialsSection';
import FAQSection from '../SafeSenseWomensHealthPlatform/FAQSection';
import { useAuth } from '../../context/AuthContext';

const CustomerHome = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const [isWelcomeVisible, setIsWelcomeVisible] = useState(true);

  useEffect(() => {
    // Hide welcome message after 5 seconds
    const timer = setTimeout(() => {
      setIsWelcomeVisible(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-[#22b8bf] border-r-[#22b8bf] border-b-transparent border-l-transparent"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/user-login-screen" />;
  }

  return (
    <div className="min-h-screen bg-white">
      <CustomerHeader user={user} />
      
      {/* Welcome Message */}
      {isWelcomeVisible && (
        <div className="fixed top-20 right-4 bg-[#22b8bf] text-white p-4 rounded-lg shadow-lg z-50 transition-opacity duration-500">
          <div className="flex items-center">
            <div>
              <p className="font-merriweather font-bold">Welcome back, {user?.name || 'User'}!</p>
              <p className="text-sm font-opensans">Glad to see you again</p>
            </div>
            <button 
              className="ml-4 text-white opacity-70 hover:opacity-100"
              onClick={() => setIsWelcomeVisible(false)}
            >
              &times;
            </button>
          </div>
        </div>
      )}
      
      <main>
        <HeroSection />
        <ServicesSection />
        <ConsultationSection />
        <TeamSection />
        <TestingSection />
        <CycleTrackingSection />
        <EducationSection />
        <TestimonialsSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default CustomerHome; 