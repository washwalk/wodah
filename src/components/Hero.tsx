import React from 'react';

interface HeroProps {
  headline: string;
  subheadline: string;
  buttonText: string;
  primaryColor: string;
  heroImage: string;
  onCtaClick: () => void;
}

const Hero: React.FC<HeroProps> = ({
  headline,
  subheadline,
  buttonText,
  primaryColor,
  heroImage,
  onCtaClick,
}) => {
  return (
    <section
      className="relative bg-cover bg-center min-h-[80vh] flex items-center justify-center text-white text-center"
      style={{
        backgroundImage: `url(${heroImage})`,
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative max-w-2xl p-5">
        <h1 className="text-5xl font-bold mb-4">{headline}</h1>
        <p className="text-2xl mb-8">{subheadline}</p>
        <button
          onClick={onCtaClick}
          className="text-white border-none py-4 px-8 text-xl rounded-md cursor-pointer"
          style={{
            backgroundColor: primaryColor,
          }}
        >
          {buttonText}
        </button>
      </div>
    </section>
  );
};

export default Hero;