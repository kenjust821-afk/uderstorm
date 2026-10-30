import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'D UNDERTHINGS',
  description: 'Premium underwear and boutique intimate fashion',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
