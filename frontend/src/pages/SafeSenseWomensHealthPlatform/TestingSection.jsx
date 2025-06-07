// src/pages/SafeSenseWomensHealthPlatform/TestingSection.jsx
import React from 'react';
import Button from '../../components/ui/Button';

const TestingSection = ({ onOpenAuthModal }) => {
  const tests = [
    {
      id: 1,
      image: '/images/img_placeholder_image_258x382.png',
      title: 'Gonorrhea Test',
      price: '170,000đ',
      description: 'Method: Urine sample or vaginal/urethral swab.\nPurpose: Detects two of the most common bacterial STIs.\nRecommended frequency: Annually for sexually active people under 25 or those at risk.',
      borderRadius: 'rounded-[34px_88px_37px_93px]'
    },
    {
      id: 2,
      image: '/images/img_placeholder_image_260x428.png',
      title: 'HIV Test',
      price: '160,000đ',
      description: 'Method: Blood test or oral swab.\nPurpose: Detects the HIV virus. It may take a few weeks after exposure to test positive.\nRecommended frequency: At least once a year if you are at risk.',
      borderRadius: 'rounded-[27px_62px_29px_62px]'
    },
    {
      id: 3,
      image: '/images/img_placeholder_image_260x407.png',
      title: 'Syphilis Test',
      price: '105,000đ',
      description: 'Method: Blood test or swab from a sore (if present).\nPurpose: Detects the bacteria Treponema pallidum, which causes syphilis – often asymptomatic in early stages.',
      borderRadius: 'rounded-[26px_61px_31px_64px]'
    }
  ];

  const handleBookAppointment = () => {
    onOpenAuthModal?.();
  };

  return (
    <section className="bg-[#feeaeb] py-24">
      <div className="max-w-[1440px] mx-auto px-20">
        <div className="grid grid-cols-2 gap-16 mb-16">
          <div>
            <h2 className="text-[48px] font-inter font-normal leading-[59px] text-[#02090a] mb-8">
              Book STI testing
            </h2>
          </div>
          <div>
            <p className="text-[18px] font-roboto font-normal leading-[27px] text-[#02090a]">
              Easily book a confidential STI testing appointment at your convenience. Choose your preferred location and time, and get tested safely and discreetly. Your sexual health matters — take the first step today
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-16">
          {tests.map((test) => (
            <div key={test.id} className="flex flex-col">
              <img 
                src={test.image}
                alt={test.title}
                className={`w-full object-cover mb-8 ${test.borderRadius}`}
              />
              <div className="mb-4">
                <h3 className="text-[32px] font-inter font-normal leading-[41px] text-[#02090a]">
                  {test.title}
                </h3>
                <p className="text-[24px] font-inter font-normal leading-[33px] text-[#02090a]">
                  {test.price}
                </p>
              </div>
              <p className="text-[16px] font-roboto font-normal leading-[24px] text-[#02090a] mb-8 whitespace-pre-line">
                {test.description}
              </p>
              <Button 
                onClick={() => handleBookAppointment(test.title)}
                variant="primary"
                className="h-[44px] w-[180px] text-[16px] font-medium leading-[19px]"
              >
                Book appointment
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestingSection;