import React from 'react';
import Button from '../../components/ui/Button';

const EducationSection = () => {
  const articles = [
    {
      id: 1,
      image: '/images/img_tagline_wrapper.png',
      title: 'Understanding Sexual Health: The Basics Everyone Should Know',
      description: 'This article explains the fundamentals of sexual health, why maintaining it is important, and essential knowledge to protect yourself and your partner.',
      borderRadius: 'rounded-[30px]'
    },
    {
      id: 2,
      image: '/images/img_tagline_wrapper_212x640.png',
      title: 'How to Communicate Openly About Sexual Health with Your Partner',
      description: 'Communication is key to a healthy relationship. Learn how to talk openly and respectfully about sexual health issues to build trust and better understanding.',
      borderRadius: 'rounded-[30px]'
    }
  ];

  const additionalArticles = [
    {
      id: 3,
      image: '/images/img_tagline_wrapper_1.png',
      title: 'Common Sexual Health Issues and When to See a Doctor',
      description: 'Recognize common sexual health problems such as infections, sexual dysfunction, and warning signs that indicate it is time to visit a healthcare professional',
      borderRadius: 'rounded-[30px]'
    },
    {
      id: 4,
      image: '/images/img_tagline_wrapper_212x646.png',
      title: 'Tips for Maintaining a Healthy and Safe Sexual Life',
      description: 'Simple but effective tips to help you maintain good sexual health, prevent sexually transmitted infections, and develop safe relationship habits.',
      borderRadius: 'rounded-[30px]'
    }
  ];

  const handleLearnMore = (title) => {
    alert(`Opening article: ${title}`);
  };

  return (
    <>
      {/* First Education Section */}
      <section className="bg-[#f8f3e8] py-24">
        <div className="max-w-[1440px] mx-auto px-20">
          <div className="grid grid-cols-2 gap-16">
            {articles.map((article) => (
              <div key={article.id} className="text-center">
                <img 
                  src={article.image}
                  alt={article.title}
                  className={`w-full h-[212px] object-cover mb-8 ${article.borderRadius}`}
                />
                <h3 className="text-[40px] font-inter font-normal leading-[48px] text-[#02090a] mb-6">
                  {article.title}
                </h3>
                <p className="text-[16px] font-roboto font-normal leading-[24px] text-[#02090a] mb-8">
                  {article.description}
                </p>
                <Button 
                  onClick={() => handleLearnMore(article.title)}
                  variant="outline"
                  className="h-[44px] w-[130px] text-[16px] font-medium leading-[19px] mb-4"
                >
                  Learn More
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Second Education Section */}
      <section className="bg-[#f8f3e8] py-24">
        <div className="max-w-[1440px] mx-auto px-20">
          <div className="grid grid-cols-2 gap-16">
            {additionalArticles.map((article) => (
              <div key={article.id} className="text-center">
                <img 
                  src={article.image}
                  alt={article.title}
                  className={`w-full h-[212px] object-cover mb-8 ${article.borderRadius}`}
                />
                <h3 className="text-[40px] font-inter font-normal leading-[48px] text-[#02090a] mb-6">
                  {article.title}
                </h3>
                <p className="text-[16px] font-roboto font-normal leading-[24px] text-[#02090a] mb-8">
                  {article.description}
                </p>
                <Button 
                  onClick={() => handleLearnMore(article.title)}
                  variant="outline"
                  className="h-[44px] w-[130px] text-[16px] font-medium leading-[19px]"
                >
                  Learn More
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default EducationSection;