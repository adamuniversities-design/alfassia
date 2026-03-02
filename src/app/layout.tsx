import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Alfassia Allhurra',
  description: 'Soins de luxe artisanaux, nés à Fès, Maroc.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
