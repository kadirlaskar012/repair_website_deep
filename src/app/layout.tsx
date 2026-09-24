import type { Metadata } from 'next';
import { Inter, Space_Grotesk, Noto_Sans_Bengali } from 'next/font/google';
import './globals.css';
import { SITE_URL } from '@/lib/seo';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap'
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap'
});

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ['bengali'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-bengali',
  display: 'swap'
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'AC Repair Service | Doorstep Appliance Repair in West Bengal | ₹299 Visit',
    template: '%s | AC Repair Service'
  },
  description: 'Verified doorstep appliance repair across West Bengal. Transparent ₹299 visit and diagnosis fee for AC, Fridge, Washing Machine, Microwave, and LED TV.',
  icons: {
    icon: '/favicon.ico'
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${notoSansBengali.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
