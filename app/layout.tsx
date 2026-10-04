import type { Metadata, Viewport } from 'next';
import './globals.css';
import SmoothScroll from '@/components/providers/SmoothScroll';
import CustomCursor from '@/components/ui/CustomCursor';
import ScrollProgress from '@/components/ui/ScrollProgress';

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
  themeColor: '#14120E',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#14120E] text-[#FAF8F2] font-sans antialiased min-h-screen relative selection:bg-[#EB7D00] selection:text-[#14120E]">
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
