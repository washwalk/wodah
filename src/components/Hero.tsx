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
      className="hero"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center',
      }}
    >
      <div className="hero-content" style={{ maxWidth: '600px', padding: '20px' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>{headline}</h1>
        <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>{subheadline}</p>
        <button
          onClick={onCtaClick}
          style={{
            backgroundColor: primaryColor,
            color: 'white',
            border: 'none',
            padding: '15px 30px',
            fontSize: '1.2rem',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          {buttonText}
        </button>
      </div>
    </section>
  );
};

export default Hero;