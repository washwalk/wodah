import React, { useEffect } from 'react';

interface AnalyticsTrackerProps {
  nicheId: string;
  gaId: string;
}

const AnalyticsTracker: React.FC<AnalyticsTrackerProps> = ({ nicheId, gaId }) => {
  useEffect(() => {
    // Initialize analytics if not already done
    if (gaId && typeof window !== 'undefined') {
      // Assume gtag is loaded, or load it here
      // For simplicity, just log
      console.log(`Analytics initialized for niche: ${nicheId}`);

      // Track page view
      if (window.gtag) {
        window.gtag('config', gaId, {
          custom_map: { dimension1: nicheId },
        });
      }
    }

    // Add click tracking
    const handleClick = (event: MouseEvent) => {
      console.log(`Click tracked for niche ${nicheId}:`, event.target);
      // Send to analytics
      if (window.gtag) {
        window.gtag('event', 'click', {
          event_category: 'engagement',
          event_label: nicheId,
        });
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [nicheId]);

  return null; // This component doesn't render anything
};

export default AnalyticsTracker;