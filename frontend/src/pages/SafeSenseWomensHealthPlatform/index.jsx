// src/pages/SafeSenseWomensHealthPlatform/index.jsx
import React, { useState } from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import HeroSection from './HeroSection';
import ServicesSection from './ServicesSection';
import ConsultationSection from './ConsultationSection';
import TeamSection from './TeamSection';
import TestingSection from './TestingSection';
import CycleTrackingSection from './CycleTrackingSection';
import EducationSection from './EducationSection';
import TestimonialsSection from './TestimonialsSection';
import FAQSection from './FAQSection';
import AuthenticationChoiceModal from '../authentication-choice-modal';

const SafeSenseWomensHealthPlatform = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleOpenAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  const handleCloseAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onOpenAuthModal={handleOpenAuthModal} />
      <main>
        <HeroSection />
        <ServicesSection />
        <ConsultationSection />
        <TeamSection onOpenAuthModal={handleOpenAuthModal} />
        <TestingSection onOpenAuthModal={handleOpenAuthModal} />
        <CycleTrackingSection />
        <EducationSection />
        <TestimonialsSection />
        <FAQSection />
      </main>
      <Footer />
      
      <AuthenticationChoiceModal 
        isOpen={isAuthModalOpen}
        onClose={handleCloseAuthModal}
      />
    </div>
  );
};

export default SafeSenseWomensHealthPlatform;