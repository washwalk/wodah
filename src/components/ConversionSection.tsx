import React, { useState } from 'react';

interface ConversionSectionProps {
  emailPlaceholder: string;
  buttonText: string;
  primaryColor: string;
  nicheId: string;
}

const ConversionSection: React.FC<ConversionSectionProps> = ({
  emailPlaceholder,
  buttonText,
  primaryColor,
  nicheId,
}) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const response = await fetch('/api/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, nicheId }),
      });
      if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
    }
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
        {status === 'success' && (
          <p className="mt-4 text-green-200">Thank you! We'll be in touch soon.</p>
        )}
        {status === 'error' && (
          <p className="mt-4 text-red-200">Something went wrong. Please try again.</p>
        )}
        <form onSubmit={handleSubmit} className="mt-5">
          <input
            type="email"
            placeholder={emailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={status === 'loading'}
            className="p-3 text-lg rounded-md w-full md:w-auto md:min-w-[300px] mr-0 md:mr-2 mb-2 md:mb-0 text-black disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="bg-white border-none p-3 text-lg rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              color: primaryColor,
            }}
          >
            {status === 'loading' ? 'Submitting...' : buttonText}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ConversionSection;