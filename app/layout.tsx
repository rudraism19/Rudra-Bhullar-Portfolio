import type { Metadata, Viewport } from 'next';
import { Syne, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/providers/SmoothScroll';
import CustomCursor from '@/components/ui/CustomCursor';
import ScrollProgress from '@/components/ui/ScrollProgress';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
  weight: ['500', '600', '700', '800'],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'Rudra Bhullar — Creative Technologist × AI Engineer',
  description:
    'Personal portfolio of Rudra Bhullar. Computer Science Engineering Student + Developer + AI Builder. Building scalable web experiences, RAG pipelines, and creative technology.',
  keywords: [
    'Rudra Bhullar',
    'AI Engineer',
    'Full Stack Developer',
    'Java DSA',
    'Creative Technologist',
    'Next.js',
    'JanSetu AI',
    'BIS Sahayak',
    'Digital Twin Verse',
    'India Developer',
  ],
  authors: [{ name: 'Rudra Bhullar', url: 'https://github.com/rudraism19' }],
  creator: 'Rudra Bhullar',
  openGraph: {
    title: 'Rudra Bhullar — Creative Technologist × AI Engineer',
    description:
      'Computer Science Engineering Student + Developer + AI Builder. Exploring algorithms, distributed web architectures, and multimodal intelligence.',
    url: 'https://rudrabhullar.dev',
    siteName: 'Rudra Bhullar Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export const viewport: Viewport = {
  themeColor: '#2E2910',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${syne.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-[#2E2910] text-[#F8F5E8] font-sans antialiased min-h-screen relative selection:bg-[#EB7D00] selection:text-[#2E2910]">
        {/* Subtle noise grain for tactile editorial finish */}
        <div className="editorial-grain" aria-hidden="true" />

        {/* Global smooth scrolling */}
        <SmoothScroll>
          <ScrollProgress />
          <CustomCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
