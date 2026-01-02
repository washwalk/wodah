import React, { useState } from 'react';

interface SolarCalculatorProps {
  primaryColor: string;
}

const SolarCalculator: React.FC<SolarCalculatorProps> = ({ primaryColor }) => {
  const [zipCode, setZipCode] = useState('');
  const [monthlyBill, setMonthlyBill] = useState('');
  const [systemSize, setSystemSize] = useState(''); // in kW
  const [electricityRate, setElectricityRate] = useState('0.12'); // $/kWh default
  const [results, setResults] = useState<{
    annualSavings: number;
    paybackYears: number;
    totalROI: number;
  } | null>(null);

  const calculateROI = () => {
    const bill = parseFloat(monthlyBill);
    const size = parseFloat(systemSize);
    const rate = parseFloat(electricityRate);

    if (!bill || !size || !rate || bill <= 0 || size <= 0 || rate <= 0) {
      alert('Please enter valid numbers for all fields.');
      return;
    }

    // Assumptions
    const installedCostPerWatt = 3.0; // $3/W average US cost
    const totalCost = size * 1000 * installedCostPerWatt; // $ for system
    const annualProduction = size * 1500; // kWh/year (average US solar irradiance)
    const systemEfficiency = 0.8; // 80% efficiency
    const effectiveProduction = annualProduction * systemEfficiency;
    const currentAnnualCost = bill * 12;
    const annualSavings = Math.min(effectiveProduction * rate, currentAnnualCost); // Can't save more than you spend
    const paybackYears = totalCost / annualSavings;
    const totalROI = ((annualSavings * 25) / totalCost) * 100; // ROI over 25 years

    setResults({
      annualSavings: Math.round(annualSavings),
      paybackYears: Math.round(paybackYears * 10) / 10,
      totalROI: Math.round(totalROI * 10) / 10,
    });
  };

  return (
    <section className="py-10 px-5 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8" style={{ color: primaryColor }}>
          Calculate Your Solar ROI
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-6 text-gray-800">Enter Your Details</h3>
            <div className="space-y-5">
              <div className="border-l-4 border-blue-500 pl-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">📍 Your Location</label>
                <input
                  type="text"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  placeholder="Enter zip code (e.g., 90210)"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Used for local incentive calculations</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">💡 Current Electricity Bill</label>
                <input
                  type="number"
                  value={monthlyBill}
                  onChange={(e) => setMonthlyBill(e.target.value)}
                  placeholder="Average monthly bill in dollars (e.g., 150)"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Your average monthly electricity cost</p>
              </div>
              <div className="border-l-4 border-yellow-500 pl-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">☀️ Solar System Size</label>
                <input
                  type="number"
                  value={systemSize}
                  onChange={(e) => setSystemSize(e.target.value)}
                  placeholder="System size in kW (e.g., 5)"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Typical home system: 3-10 kW</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">⚡ Electricity Rate</label>
                <input
                  type="number"
                  step="0.01"
                  value={electricityRate}
                  onChange={(e) => setElectricityRate(e.target.value)}
                  placeholder="Rate per kWh (e.g., 0.12)"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Check your utility bill for this rate</p>
              </div>
              <button
                onClick={calculateROI}
                className="w-full py-4 px-6 text-white font-semibold rounded-md hover:opacity-90 transition duration-200 text-lg"
                style={{ backgroundColor: primaryColor }}
              >
                🚀 Calculate My Solar Savings
              </button>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-6 text-gray-800">Your Solar Savings Results</h3>
            {results ? (
              <div className="space-y-5">
                <div className="p-5 bg-green-50 border-l-4 border-green-500 rounded-r-md">
                  <p className="text-lg font-semibold text-green-800">💰 Annual Savings: <span className="text-2xl">${results.annualSavings.toLocaleString()}</span></p>
                  <p className="text-sm text-green-600">Money you'll save each year on electricity</p>
                </div>
                <div className="p-5 bg-blue-50 border-l-4 border-blue-500 rounded-r-md">
                  <p className="text-lg font-semibold text-blue-800">⏰ Payback Period: <span className="text-2xl">{results.paybackYears}</span> years</p>
                  <p className="text-sm text-blue-600">Time to recover your solar investment</p>
                </div>
                <div className="p-5 bg-purple-50 border-l-4 border-purple-500 rounded-r-md">
                  <p className="text-lg font-semibold text-purple-800">📈 Total ROI (25 years): <span className="text-2xl">{results.totalROI}%</span></p>
                  <p className="text-sm text-purple-600">Return on investment over system lifetime</p>
                </div>
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                  <p className="text-sm text-yellow-800">
                    <strong>⚠️ Important Note:</strong> These are estimates based on average US solar data. Actual results may vary based on your specific location, system quality, available incentives, and energy usage patterns. Consult a professional installer for precise calculations.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📊</div>
                <p className="text-gray-500 text-lg">Fill in your details on the left and click "Calculate My Solar Savings" to see your personalized results.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolarCalculator;