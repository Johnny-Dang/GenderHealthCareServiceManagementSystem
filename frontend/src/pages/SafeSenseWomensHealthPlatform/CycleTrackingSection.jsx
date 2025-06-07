import React from 'react';
import Button from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';

const CycleTrackingSection = () => {
  const navigate = useNavigate();

  const handleTrackNow = () => {
    navigate('/menstrual-cycle-tracking');
  };

  return (
    <section className="bg-[#f3d3f3] py-24">
      <div className="max-w-[1440px] mx-auto px-20">
        <div className="bg-[#e1f0d3] rounded-[40px] border border-[#02090a26] p-0 overflow-hidden">
          <div className="grid grid-cols-2 h-[393px]">
            {/* Left side - Content */}
            <div className="p-12 flex flex-col justify-center border border-black shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
              <h2 className="text-[48px] font-merriweather font-normal leading-[57px] text-[#02090a] mb-8">
                Track your menstrual cycle
              </h2>
              <p className="text-[18px] font-opensans font-normal leading-[27px] text-[#02090a] mb-12">
                Easily monitor your menstrual cycle with personalized tracking. Stay informed about your periods, ovulation, and fertility windows to better understand your body and plan ahead.
              </p>
              <Button 
                onClick={handleTrackNow}
                className="bg-gradient-to-r from-[#b122bff4] to-[#9724b75e] border border-gradient text-white h-[44px] w-[125px] text-[16px] font-medium leading-[19px] rounded-[6px] hover:opacity-90 transition-opacity"
              >
                Track Now
              </Button>
            </div>

            {/* Right side - Image */}
            <div>
              <img 
                src="/images/img_placeholder_image_393x640.png"
                alt="Menstrual cycle tracking"
                className="w-full h-full object-cover rounded-[39px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CycleTrackingSection;