'use client';

import { NotificationProvider } from "@/context/NotificationContext";
import { AdaptiveProvider } from "@/context/AdaptiveContext";
import { UTMProvider } from "@/context/UTMContext";
import "./globals.scss";

if (process.env.NODE_ENV === 'development') {
  const React = require('react'); 
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    trackAllPureComponents: true,
  });
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UTMProvider>
          <AdaptiveProvider>
            <NotificationProvider>
              {children}
            </NotificationProvider>
          </AdaptiveProvider>
        </UTMProvider>
      </body>
    </html>
  );
}
