'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const UTMContext = createContext();

export function UTMProvider({ children }) {
  const [utmParams, setUtmParams] = useState({});

  useEffect(() => {
    const getUrlParams = () => {
      if (typeof window === 'undefined') return {};
      
      const params = new URLSearchParams(window.location.search);
      const utmData = {
        utm_source: params.get('utm_source'),
        utm_medium: params.get('utm_medium'),
        utm_campaign: params.get('utm_campaign'),
        utm_term: params.get('utm_term'),
        utm_content: params.get('utm_content'),
        
        fbclid: params.get('fbclid'),
        gclid: params.get('gclid'),
        ttclid: params.get('ttclid'),
        li_fat_id: params.get('li_fat_id'),
        twclid: params.get('twclid'),
        sc_did: params.get('sc_did'),
        epik: params.get('epik'),
      };

      return Object.fromEntries(
        Object.entries(utmData).filter(([_, value]) => value !== null)
      );
    };

    setUtmParams(getUrlParams());

    const handleRouteChange = () => {
      setUtmParams(getUrlParams());
    };

    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  return (
    <UTMContext.Provider value={{ utmParams }}>
      {children}
    </UTMContext.Provider>
  );
}

export function useUTM() {
  const context = useContext(UTMContext);
  if (context === undefined) {
    throw new Error('useUTM must be used within a UTMProvider');
  }
  return context;
} 