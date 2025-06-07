// src/pages/SafeSenseWomensHealthPlatform/ConsultationSection.jsx
import React from 'react';
import Button from '../../components/ui/Button';
import { useAuthModal } from '../authentication-choice-modal/components/AuthenticationModal';

const ConsultationSection = () => {
  const { openAuthModal } = useAuthModal();

  const handleGetStarted = () => {
    openAuthModal();
  };

  return (
    <section className="bg-[#e8f7f8] py-24 relative">
      <div className="max-w-[1440px] mx-auto px-20">
        <div className="grid grid-cols-2 gap-16 items-center">
          {/* Left side - Doctor image */}
          <div className="relative">
            <img 
              src="/images/img_placeholder_image_670x1419.png"
              alt="Doctor consultation"
              className="w-full h-[670px] object-cover rounded-lg"
            />
          </div>

          {/* Right side - Content */}
          <div className="flex flex-col justify-center">
            <img 
              src="/images/img_placeholder_image_286x286.png"
              alt="Medical consultation icon"
              className="w-[286px] h-[286px] object-cover rounded-lg mb-8 ml-auto"
            />
            
            <h2 className="text-[56px] font-inter font-normal leading-[67px] text-[#02090a] mb-8">
              Online consultation with doctor 24H
            </h2>
            
            <p className="text-[18px] font-roboto font-normal leading-[27px] text-[#02090a] mb-12">
              Get instant medical advice anytime, anywhere. Our 24/7 online consultation service connects you with licensed doctors for quick and reliable health support.
            </p>
            
            <Button 
              onClick={handleGetStarted}
              variant="primary"
              className="h-[44px] w-[250px] text-[16px] font-medium leading-[19px] self-start"
            >
              Get Started Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultationSection;