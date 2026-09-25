import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk, Noto_Sans_Bengali } from 'next/font/google';
import './globals.css';
import { SITE_URL } from '@/lib/seo';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0f766e'
};

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
    default: 'AC Repair Service | Doorstep AC & Appliance Repair in Kolkata & West Bengal | ₹299 Visit',
    template: '%s | AC Repair Service'
  },
  description: 'Verified doorstep AC and home appliance repair across Kolkata, Howrah, Salt Lake & West Bengal. Same-day technician visit for AC, Fridge, Washing Machine, Microwave, and LED TV. 90-day warranty & flat ₹299 diagnosis fee.',
  keywords: [
    'AC repair Kolkata',
    'Doorstep appliance repair West Bengal',
    'Split AC repair service Kolkata',
    'Refrigerator repair Salt Lake',
    'Washing machine service Howrah',
    'Microwave oven repair West Bengal',
    'LED TV repair Kolkata',
    'AC gas refill Kolkata',
    'Home appliance service ₹299 visit',
    'Emergency AC technician Kolkata'
  ],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.png', type: 'image/png', sizes: '32x32' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    shortcut: '/favicon.ico'
  },
  openGraph: {
    title: 'AC Repair Service | Doorstep AC & Appliance Repair in West Bengal',
    description: 'Same-day certified technician visit for AC, Fridge, Washing Machine, Microwave & TV. 90-day warranty, 100% genuine parts, transparent ₹299 inspection fee.',
    url: SITE_URL,
    siteName: 'AC Repair Service',
    locale: 'en_IN',
    type: 'website'
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${notoSansBengali.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('theme');
                  if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  } else {
                    document.documentElement.setAttribute('data-theme', 'light');
                  }
                } catch(e) {}
              })();
            `
          }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
