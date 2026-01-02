// Global settings for Wodah
export const wodahConfig = {
  analytics: {
    googleAnalyticsId: process.env.GA_ID || '',
    // Add other analytics IDs here
  },
  supabase: {
    url: process.env.SUPABASE_URL || '',
    anonKey: process.env.SUPABASE_ANON_KEY || '',
  },
  // Add other global settings
};