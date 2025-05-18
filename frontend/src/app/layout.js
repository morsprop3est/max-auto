'use client';

import { NotificationProvider } from "@/context/NotificationContext";
import { AdaptiveProvider } from "@/context/AdaptiveContext";
import "./globals.scss";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AdaptiveProvider>
          <NotificationProvider>
            {children}
          </NotificationProvider>
        </AdaptiveProvider>
      </body>
    </html>
  );
}
