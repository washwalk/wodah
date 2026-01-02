export interface WodahNiche {
  id: string;
  name: string;
  logo: string; // URL or path to logo
  primaryColor: string; // Hex color
  headline: string;
  subheadline: string;
  heroImage: string; // URL or path
  emailPlaceholder: string;
  buttonText: string;
  benefits: string[]; // 3-point list
  pricingTiers: {
    name: string;
    price: string;
    features: string[];
  }[];
}