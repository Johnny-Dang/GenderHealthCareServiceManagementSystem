import React, { useState } from 'react';
import Button from '../../components/ui/Button';

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      id: 1,
      question: 'Is my personal information secure on this website ?',
      answer: 'We are fully committed to protecting your personal and medical information. All data is encrypted and handled in accordance with international privacy standards, so you can use our services with complete confidence and discretion.'
    },
    {
      id: 2,
      question: 'Can I book a consultation with a doctor at any time?',
      answer: 'Yes. Our platform allows you to book a consultation 24/7, giving you flexible access to professional medical advice whenever you need it.'
    },
    {
      id: 3,
      question: 'What types of sexual health services does the website offer?',
      answer: 'We offer a wide range of services including STI testing, online consultations, menstrual tracking, access to sexual health education, and booking with specialized doctors — all designed to support your well-being.'
    }
  ];

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  const handleContact = () => {
    alert('Redirecting to contact page...');
  };

  return (
    <section className="bg-[#d2f0f2] py-24">
      <div className="max-w-[1440px] mx-auto px-20">
        <div className="grid grid-cols-2 gap-16">
          {/* Left side - FAQ Info */}
          <div>
            <h2 className="text-[48px] font-inter font-normal leading-[59px] text-[#02090a] mb-8">
              FAQs
            </h2>
            <p className="text-[18px] font-roboto font-normal leading-[27px] text-[#02090a] mb-12">
              If you have any questions or need further assistance, please do not hesitate to reach out to us. Our dedicated support team is always ready to help you with any concerns or inquiries you may have. We value your trust and are here to provide the best service possible.
            </p>
            <Button 
              onClick={handleContact}
              variant="outline"
              className="h-[44px] w-[105px] text-[16px] font-medium leading-[19px]"
            >
              Contact
            </Button>
          </div>

          {/* Right side - FAQ List */}
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.id} className="border border-[#02090a26]">
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full h-[72px] px-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-[18px] font-roboto font-bold leading-[22px] text-[#02090a] pr-4">
                    {faq.question}
                  </span>
                  <img 
                    src="/images/img_icon.svg"
                    alt="Toggle"
                    className={`w-[32px] h-[32px] transition-transform ${openFAQ === faq.id ? 'rotate-180' : ''}`}
                  />
                </button>
                {openFAQ === faq.id && (
                  <div className="px-6 pb-6">
                    <p className="text-[16px] font-roboto font-normal leading-[24px] text-[#02090a]">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;