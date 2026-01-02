import React from 'react';

interface BenefitGridProps {
  benefits: string[];
  primaryColor: string;
}

const BenefitGrid: React.FC<BenefitGridProps> = ({ benefits, primaryColor }) => {
  return (
    <section className="benefits" style={{ padding: '40px 20px', backgroundColor: '#f9f9f9' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Why Choose Us?</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
          }}
        >
          {benefits.map((benefit, index) => (
            <div
              key={index}
              style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                borderLeft: `5px solid ${primaryColor}`,
              }}
            >
              <p style={{ fontSize: '1.1rem', margin: 0 }}>{benefit}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitGrid;