export const metadata = {
  title: 'D UNDERTHINGS',
  description: 'Premium underwear and intimate wear boutique',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
