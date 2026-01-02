import React, { useState } from 'react';

interface ConversionSectionProps {
  emailPlaceholder: string;
  buttonText: string;
  primaryColor: string;
  nicheId: string;
  onSubmit: (email: string, nicheId:string) => void;
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
      className="py-10 px-5 text-white text-center"
      style={{
        backgroundColor: primaryColor,
      }}
    >
      <div className="max-w-xl mx-auto">
        <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
        <form onSubmit={handleSubmit} className="mt-5">
          <input
            type="email"
            placeholder={emailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-3 text-lg rounded-md w-full md:w-auto md:min-w-[300px] mr-0 md:mr-2 mb-2 md:mb-0 text-black"
          />
          <button
            type="submit"
            className="bg-white border-none p-3 text-lg rounded-md cursor-pointer"
            style={{
              color: primaryColor,
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