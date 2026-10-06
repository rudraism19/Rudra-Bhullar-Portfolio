import type { Metadata, Viewport } from 'next';
import { Anton, Syne, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/providers/SmoothScroll';
import CustomCursor from '@/components/ui/CustomCursor';
import ScrollProgress from '@/components/ui/ScrollProgress';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['400', '500', '600', '700', '800'],
});

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-headline',
});

const syne = Syne({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-editorial',
  weight: ['500', '600', '700', '800'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'Rudra Bhullar | AI Backend Engineer & Ex-CTO @DTV',
  description:
    'AI Backend Engineer & former Chief Technology Officer at Digital Twin Verse. Computer Science scholar at UIT RGPV. Building scalable APIs, FastAPI microservices, LLM agent loops, and low-latency RAG systems.',
  keywords: [
    'Rudra Bhullar',
    'AI Backend Engineer',
    'FastAPI Developer',
    'Digital Twin Verse',
    'CTO',
    'UIT RGPV',
    'RAG Systems',
    'LLM Agents',
    'Java DSA',
    'JanSetu AI',
    'BIS Sahayak',
    'Next.js 14',
    'India Engineer',
    'Shivpuri Madhya Pradesh',
  ],
  authors: [{ name: 'Rudra Bhullar', url: 'https://github.com/rudraism19' }],
  creator: 'Rudra Bhullar',
  metadataBase: new URL('https://rudra-bhullar.vercel.app'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Rudra Bhullar | AI Backend Engineer & Ex-CTO @DTV',
    description:
      'AI Backend Engineer building scalable APIs, FastAPI microservices, LLMs, and RAG architectures. Ex-CTO @DTV, UIT RGPV CSE.',
    url: 'https://rudra-bhullar.vercel.app',
    siteName: 'Rudra Bhullar — Engineering Portfolio',
    locale: 'en_IN',
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rudra Bhullar | AI Backend Engineer & Ex-CTO @DTV',
    description:
      'AI Backend Engineer building scalable APIs, FastAPI microservices, LLMs, and RAG architectures. Ex-CTO @DTV, UIT RGPV CSE.',
    creator: '@rudrabhullar',
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
  width: 'device-width',
  initialScale: 1,
};

const PERSON_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Rudra Bhullar',
  url: 'https://rudra-bhullar.vercel.app',
  jobTitle: 'AI Backend Engineer',
  worksFor: {
    '@type': 'Organization',
    name: 'Digital Twin Verse',
    roleName: 'Former Chief Technology Officer',
  },
  alumniOf: {
    '@type': 'EducationalOrganization',
    name: 'University Institute of Technology, RGPV (UIT RGPV)',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Shivpuri',
    addressRegion: 'Madhya Pradesh',
    addressCountry: 'India',
  },
  sameAs: [
    'https://github.com/rudraism19',
    'https://linkedin.com/in/rudra-bhullar',
    'https://x.com/rudrabhullar',
  ],
  knowsAbout: [
    'FastAPI',
    'Python',
    'Java',
    'Data Structures & Algorithms',
    'Large Language Models',
    'Retrieval-Augmented Generation (RAG)',
    'Digital Twins',
    'Distributed Systems',
    'Next.js',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${plusJakartaSans.variable} ${anton.variable} ${syne.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_JSON_LD) }}
        />
      </head>
      <body className="bg-[#0A0A0A] text-[#FAFAFA] font-sans antialiased min-h-screen relative selection:bg-[#EDEAE4] selection:text-[#0A0A0A]">
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
