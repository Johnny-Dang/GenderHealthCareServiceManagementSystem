// src/pages/SafeSenseWomensHealthPlatform/HeroSection.jsx
import React from 'react';
import Button from '../../components/ui/Button';
import { useAuthModal } from '../authentication-choice-modal/components/AuthenticationModal';

const HeroSection = () => {
  const { openAuthModal } = useAuthModal();

  const handleGetStarted = () => {
    openAuthModal();
  };

  return (
    <section 
      className="h-[900px] relative flex items-center"
      style={{
        backgroundImage: `url('/images/img_.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="relative z-10 max-w-[1440px] mx-auto px-20 w-full">
        <div className="max-w-[549px]">
          <h1 className="text-[56px] font-merriweather font-normal leading-[67px] text-white mb-8">
            Simple plans for everyone
          </h1>
          <p className="text-[18px] font-opensans font-normal leading-[27px] text-white mb-12 max-w-[442px]">
            No matter where you are on your gender journey, our transparent pricing and flexible membership options have you covered.
          </p>
          <Button 
            onClick={handleGetStarted}
            variant="primary"
            className="h-[44px] w-[177px] text-[16px] font-medium leading-[19px]"
          >
            Get Started
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;