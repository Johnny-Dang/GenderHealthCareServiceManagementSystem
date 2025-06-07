// src/pages/SafeSenseWomensHealthPlatform/TeamSection.jsx
import React from 'react';
import Button from '../../components/ui/Button';

const TeamSection = ({ onOpenAuthModal }) => {
  const consultants = [
    {
      id: 1,
      image: '/images/img_placeholder_image_80x80.png',
      name: 'BS. Nguyễn Thị Minh',
      specialty: 'Sexology',
      description: 'Focuses on hormonal issues affecting fertility and reproduction.',
      socialLinks: [
        { icon: '/images/img_linkedin.svg', url: '#' },
        { icon: '/images/img_x.svg', url: '#' },
        { icon: '/images/img_dribble.svg', url: '#' }
      ]
    },
    {
      id: 2,
      image: '/images/img_placeholder_image_2.png',
      name: 'BS. Trần Văn Dũng',
      specialty: 'Family Planning',
      description: 'Offers counseling and treatment for sexual function and intimacy issues.',
      socialLinks: [
        { icon: '/images/img_linkedin.svg', url: '#' },
        { icon: '/images/img_x.svg', url: '#' },
        { icon: '/images/img_dribble.svg', url: '#' }
      ]
    },
    {
      id: 3,
      image: '/images/img_placeholder_image_3.png',
      name: 'BS. Lê Thị Hồng',
      specialty: 'Andrology',
      description: 'Provides contraception, fertility counseling, and reproductive planning services.',
      socialLinks: [
        { icon: '/images/img_linkedin.svg', url: '#' },
        { icon: '/images/img_x.svg', url: '#' },
        { icon: '/images/img_dribble.svg', url: '#' }
      ]
    },
    {
      id: 4,
      image: '/images/img_placeholder_image_4.png',
      name: 'BS. Phạm Anh Tuấn',
      specialty: 'Sexual Health',
      description: 'Specializes in male reproductive health and related disorders.',
      socialLinks: [
        { icon: '/images/img_linkedin.svg', url: '#' },
        { icon: '/images/img_x.svg', url: '#' },
        { icon: '/images/img_dribble.svg', url: '#' }
      ]
    },
    {
      id: 5,
      image: '/images/img_placeholder_image_5.png',
      name: 'BS.CKI Phạm Thị Ngọc Dung',
      specialty: 'Sexual Health',
      description: 'Focuses on women\'s reproductive health, pregnancy, and childbirth.',
      socialLinks: [
        { icon: '/images/img_linkedin.svg', url: '#' },
        { icon: '/images/img_x.svg', url: '#' },
        { icon: '/images/img_dribble.svg', url: '#' }
      ]
    },
    {
      id: 6,
      image: '/images/img_placeholder_image_6.png',
      name: 'BS Đỗ Thị Lâm Oanh',
      specialty: 'Andrology',
      description: 'Specializes in male reproductive health and related disorders.',
      socialLinks: [
        { icon: '/images/img_linkedin.svg', url: '#' },
        { icon: '/images/img_x.svg', url: '#' },
        { icon: '/images/img_dribble.svg', url: '#' }
      ]
    },
    {
      id: 7,
      image: '/images/img_placeholder_image_7.png',
      name: 'BS.CKI Dương Tấn Thành',
      specialty: 'Urology',
      description: 'Provides diagnosis and counseling for sexual health concerns.',
      socialLinks: [
        { icon: '/images/img_linkedin.svg', url: '#' },
        { icon: '/images/img_x.svg', url: '#' },
        { icon: '/images/img_dribble.svg', url: '#' }
      ]
    },
    {
      id: 8,
      image: '/images/img_placeholder_image_8.png',
      name: 'Ths.BS Võ Duy Tâm',
      specialty: 'Reproductive Endocrinology',
      description: 'Treats disorders of the urinary tract and male reproductive system.',
      socialLinks: [
        { icon: '/images/img_linkedin.svg', url: '#' },
        { icon: '/images/img_x.svg', url: '#' },
        { icon: '/images/img_dribble.svg', url: '#' }
      ]
    }
  ];

  const handleBookConsultant = () => {
    onOpenAuthModal?.();
  };

  return (
    <section className="bg-[#e8f7f8] py-24">
      <div className="max-w-[1440px] mx-auto px-20">
        <div className="text-center mb-16">
          <h2 className="text-[40px] font-inter font-normal leading-[49px] text-[#02090a] mb-4">
            Our team of consultant
          </h2>
          <p className="text-[18px] font-roboto font-normal leading-[22px] text-[#02090a]">
            With a lot of knowledge and experience
          </p>
        </div>

        <div className="grid grid-cols-4 gap-8 mb-16">
          {consultants.map((consultant) => (
            <div key={consultant.id} className="text-center">
              <img 
                src={consultant.image}
                alt={consultant.name}
                className="w-[80px] h-[80px] rounded-full mx-auto mb-6 object-cover"
              />
              <h3 className="text-[20px] font-roboto font-semibold leading-[24px] text-[#02090a] mb-2">
                {consultant.name}
              </h3>
              <p className="text-[18px] font-roboto font-normal leading-[22px] text-[#02090a] mb-4">
                {consultant.specialty}
              </p>
              <p className="text-[16px] font-roboto font-normal leading-[24px] text-[#02090a] mb-6 max-w-[289px] mx-auto">
                {consultant.description}
              </p>
              <div className="flex justify-center space-x-4">
                {consultant.socialLinks.map((link, index) => (
                  <a 
                    key={index}
                    href={link.url}
                    className="hover:opacity-80 transition-opacity"
                  >
                    <img 
                      src={link.icon}
                      alt="Social media"
                      className="w-[24px] h-[24px]"
                    />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Button 
            onClick={handleBookConsultant}
            variant="gradient"
            className="h-[39px] w-[250px] text-[16px] font-medium leading-[19px]"
          >
            Book Consultant Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;