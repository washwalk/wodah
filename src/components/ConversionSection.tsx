import React, { useState } from 'react';

interface ConversionSectionProps {
  emailPlaceholder: string;
  buttonText: string;
  primaryColor: string;
  nicheId: string;
  onSubmit: (email: string, nicheId: string) => void;
}

const ConversionSection: React.FC<ConversionSectionProps> = ({
  emailPlaceholder,
  buttonText,
  primaryColor,
  nicheId,
  onSubmit,
}) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, nicheId);
  };

  return (
    <section
      className="conversion"
      style={{
        padding: '40px 20px',
        backgroundColor: primaryColor,
        color: 'white',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h2>Ready to Get Started?</h2>
        <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
          <input
            type="email"
            placeholder={emailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              padding: '10px',
              fontSize: '1rem',
              border: 'none',
              borderRadius: '5px',
              width: '70%',
              marginRight: '10px',
            }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: 'white',
              color: primaryColor,
              border: 'none',
              padding: '10px 20px',
              fontSize: '1rem',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ConversionSection;