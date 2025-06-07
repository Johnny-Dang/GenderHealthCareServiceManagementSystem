import React from 'react';

const TestimonialsSection = () => {
  return (
    <section className="bg-[#f2f2f2] py-24">
      <div className="max-w-[1440px] mx-auto px-20">
        <div className="text-center">
          {/* Stars Rating */}
          <div className="flex justify-center mb-12">
            <img 
              src="/images/img_stars.svg"
              alt="5 star rating"
              className="w-[116px] h-[18px]"
            />
          </div>

          {/* Testimonial Text */}
          <blockquote className="text-[24px] font-inter font-normal leading-[33px] text-[#02090a] mb-12 max-w-[768px] mx-auto">
            Sexual health is something we all need to take seriously — and finally, there is a platform that makes it easy, respectful, and judgment-free. I truly appreciate how accessible and private this service is. It is a game changer for personal health
          </blockquote>

          {/* Customer Info */}
          <div className="flex items-center justify-center space-x-4">
            <img 
              src="/images/img_avatar_image.png"
              alt="Ms Hồ Tuyết Ngọc"
              className="w-[56px] h-[56px] rounded-full object-cover"
            />
            <div className="text-left">
              <p className="text-[16px] font-roboto font-semibold leading-[19px] text-[#02090a]">
                Ms Hồ Tuyết Ngọc
              </p>
              <p className="text-[16px] font-roboto font-normal leading-[19px] text-[#02090a]">
                Gender+ Company
              </p>
            </div>
            <div className="w-[1px] h-[61px] bg-[#02090a26] ml-8"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;