import React from 'react';

interface BenefitGridProps {
  benefits: string[];
  primaryColor: string;
}

const BenefitGrid: React.FC<BenefitGridProps> = ({ benefits, primaryColor }) => {
  return (
    <section className="bg-gray-100 py-10 px-5">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-3xl font-bold mb-8">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-lg shadow-md"
              style={{
                borderLeft: `5px solid ${primaryColor}`,
              }}
            >
              <p className="text-lg">{benefit}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitGrid;