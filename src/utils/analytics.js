export const analytics = {
  track: (event, properties = {}) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', event, properties);
    }
  },
};
