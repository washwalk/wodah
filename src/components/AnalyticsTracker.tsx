import React, { useEffect } from 'react';
import { wodahConfig } from '../../wodah.config';

interface AnalyticsTrackerProps {
  nicheId: string;
}

const AnalyticsTracker: React.FC<AnalyticsTrackerProps> = ({ nicheId }) => {
  useEffect(() => {
    // Initialize analytics if not already done
    if (wodahConfig.analytics.googleAnalyticsId && typeof window !== 'undefined') {
      // Assume gtag is loaded, or load it here
      // For simplicity, just log
      console.log(`Analytics initialized for niche: ${nicheId}`);

      // Track page view
      if (window.gtag) {
        window.gtag('config', wodahConfig.analytics.googleAnalyticsId, {
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