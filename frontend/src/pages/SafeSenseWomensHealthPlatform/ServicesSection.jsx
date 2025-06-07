// src/pages/SafeSenseWomensHealthPlatform/ServicesSection.jsx
import React from 'react';
import Button from '../../components/ui/Button';
import { useAuthModal } from '../authentication-choice-modal/components/AuthenticationModal';

const ServicesSection = () => {
  const { openAuthModal } = useAuthModal();
  
  const services = [
    {
      id: 1,
      image: '/images/img_placeholder_image.png',
      title: 'Booking Appointment with My Consultant',
      description: 'Select consultant, choose a time, and confirm.',
      borderRadius: 'rounded-[25px_84px_30px_88px]',
      buttonText: 'Book Consultant'
    },
    {
      id: 2,
      image: '/images/img_placeholder_image_260x401.png',
      title: 'Sexually Transmitted Disease Testing',
      description: 'Select services testing, payments and receive result',
      borderRadius: 'rounded-[27px_62px_29px_62px]',
      buttonText: 'Book Appointment'
    },
    {
      id: 3,
      image: '/images/img_placeholder_image_1.png',
      title: 'Track your menstrual cycle',
      description: 'Declare menstrual cycle to receive ovulation time, pregnancy possibility, birth control pill time',
      borderRadius: 'rounded-[26px_61px_31px_64px]',
      buttonText: 'Get Started'
    }
  ];

  const handleServiceAction = () => {
    openAuthModal();
  };
  
  const handleGetStarted = () => {
    openAuthModal();
  };

  return (
    <section id="services" className="bg-[#e8edf8] py-24">
      <div className="max-w-[1440px] mx-auto px-20">
        <div className="grid grid-cols-2 gap-16 mb-16">
          <div>
            <h2 className="text-[48px] font-merriweather font-normal leading-[59px] text-[#02090a] mb-8">
              What SafeSense Have
            </h2>
          </div>
          <div>
            <p className="text-[18px] font-opensans font-normal leading-[27px] text-[#02090a]">
              We have accurate knowledge, safe tools, empathy, and respect for every personal choice. Whether you are looking for information about your body, safe sex practices, or simply a non-judgmental space to be heard – we are here, walking with you. Sexual health is a right, not a taboo.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-16 mb-16">
          {services.map((service) => (
            <div key={service.id} className="flex flex-col">
              <img 
                src={service.image}
                alt={service.title}
                className={`w-full h-[264px] object-cover mb-8 ${service.borderRadius}`}
              />
              <h3 className="text-[32px] font-merriweather font-normal leading-[41px] text-[#02090a] mb-4">
                {service.title}
              </h3>
              <p className="text-[20px] font-opensans font-normal leading-[28px] text-[#02090a] mb-6">
                {service.description}
              </p>
              <Button 
                onClick={handleServiceAction}
                variant="outline"
                className="h-[44px] w-full text-[14px] font-medium leading-[19px] mt-auto"
              >
                {service.buttonText}
              </Button>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Button 
            onClick={handleGetStarted}
            variant="primary"
            className="h-[44px] w-[250px] text-[16px] font-medium leading-[19px]"
          >
            Get Started Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;