import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
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
    default: 'Home Appliance Care India | Doorstep Home Appliance Repair Service',
    template: '%s | Home Appliance Care India'
  },
  description: 'Home Appliance Care India: Official doorstep home appliance repair and maintenance service network across India & West Bengal. Rated 4.9★ in verified customer reviews. Certified technicians near me for AC, Refrigerator, Washing Machine, Microwave & TV. Flat ₹299 inspection & 90-day warranty.',
  keywords: [
    'home Appliance Care India',
    'Home Appliance Care India',
    'Home appliance care india near me',
    'Home appliance care india reviews',
    'Home appliance care india customer care number',
    'Home appliance care india Kolkata',
    'home appliance repair service',
    'home appliance repair service near me',
    'doorstep appliance repair Kolkata',
    'Doorstep appliance repair West Bengal',
    'AC repair Kolkata',
    'Refrigerator repair near me',
    'Washing machine repair service',
    'Appliance Seva'
  ],
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', type: 'image/png', sizes: '32x32' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    shortcut: '/favicon.svg'
  },
  openGraph: {
    title: 'Home Appliance Care India | Doorstep Home Appliance Repair Service',
    description: 'Verified doorstep AC and home appliance repair service across India & West Bengal. 4.9★ reviews, 90-day warranty, transparent ₹299 inspection fee.',
    url: SITE_URL,
    siteName: 'Home Appliance Care India',
    locale: 'en_IN',
    type: 'website'
  },
  verification: {
    google: ['CW0Ypvur_ehNuUgAWyZcWsICOrjmvRjdDLMPk2YQc7A', 'googlea78375151882c47b']
  }
};

import ScrollRestorer from '@/components/common/ScrollRestorer';
import FloatingActionSuite from '@/components/common/FloatingActionSuite';
import ContentProtection from '@/components/security/ContentProtection';

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
                  if (saved === 'dark') {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  } else {
                    document.documentElement.setAttribute('data-theme', 'light');
                  }
                  if (window.location.pathname.startsWith('/bn')) {
                    document.documentElement.setAttribute('lang', 'bn');
                  } else {
                    document.documentElement.setAttribute('lang', 'en');
                  }
                } catch(e) {}
              })();
            `
          }}
        />
      </head>
      <body className="antialiased">
        <ContentProtection />
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-44B6EKMKNV"
          strategy="afterInteractive"
        />
        <Script id="google-analytics-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-44B6EKMKNV');
          `}
        </Script>

        <ScrollRestorer />
        {children}
        <FloatingActionSuite />
      </body>
    </html>
  );
}
