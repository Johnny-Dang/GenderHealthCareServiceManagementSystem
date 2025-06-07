import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#0d494c] h-[440px] flex items-center justify-center">
      <div className="w-full max-w-[1440px] mx-auto px-20">
        <div className="grid grid-cols-4 gap-8 text-center">
          {/* Email Section */}
          <div className="flex flex-col items-center">
            <img 
              src="/images/img_mail.svg" 
              alt="Email" 
              className="w-[48px] h-[48px] mb-6"
            />
            <h3 className="text-[32px] font-inter font-normal leading-[39px] text-white mb-4">
              Email
            </h3>
            <p className="text-[16px] font-roboto font-normal leading-[24px] text-white mb-6 max-w-[296px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in ero.
            </p>
            <a 
              href="mailto:email@example.com" 
              className="text-[16px] font-roboto font-normal leading-[19px] text-white underline hover:opacity-80 transition-opacity"
            >
              email@example.com
            </a>
          </div>

          {/* Live Chat Section */}
          <div className="flex flex-col items-center">
            <img 
              src="/images/img_tooltip.svg" 
              alt="Live Chat" 
              className="w-[48px] h-[48px] mb-6"
            />
            <h3 className="text-[32px] font-inter font-normal leading-[39px] text-white mb-4">
              Live chat
            </h3>
            <p className="text-[16px] font-roboto font-normal leading-[24px] text-white mb-6 max-w-[296px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in ero.
            </p>
            <button className="text-[16px] font-roboto font-normal leading-[19px] text-white underline hover:opacity-80 transition-opacity">
              Start new chat
            </button>
          </div>

          {/* Phone Section */}
          <div className="flex flex-col items-center">
            <img 
              src="/images/img_call.svg" 
              alt="Phone" 
              className="w-[48px] h-[48px] mb-6"
            />
            <h3 className="text-[32px] font-inter font-normal leading-[39px] text-white mb-4">
              Phone
            </h3>
            <p className="text-[16px] font-roboto font-normal leading-[24px] text-white mb-6 max-w-[296px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in ero.
            </p>
            <a 
              href="tel:+15550000000" 
              className="text-[16px] font-roboto font-normal leading-[19px] text-white underline hover:opacity-80 transition-opacity"
            >
              +1 (555) 000-0000
            </a>
          </div>

          {/* Office Section */}
          <div className="flex flex-col items-center">
            <img 
              src="/images/img_locationon.svg" 
              alt="Office" 
              className="w-[48px] h-[48px] mb-6"
            />
            <h3 className="text-[32px] font-inter font-normal leading-[39px] text-white mb-4">
              Office
            </h3>
            <p className="text-[16px] font-roboto font-normal leading-[24px] text-white mb-6 max-w-[296px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in ero.
            </p>
            <address className="text-[16px] font-roboto font-normal leading-[19px] text-white underline not-italic hover:opacity-80 transition-opacity">
              123 Sample St, Sydney NSW 2000 AU
            </address>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;