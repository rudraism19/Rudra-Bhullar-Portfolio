import type { Metadata, Viewport } from 'next';
import './globals.css';
import SmoothScroll from '@/components/providers/SmoothScroll';
import CustomCursor from '@/components/ui/CustomCursor';
import ScrollProgress from '@/components/ui/ScrollProgress';

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
  metadataBase: new URL('https://rudrabhullar.dev'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Rudra Bhullar | AI Backend Engineer & Ex-CTO @DTV',
    description:
      'AI Backend Engineer building scalable APIs, FastAPI microservices, LLMs, and RAG architectures. Ex-CTO @DTV, UIT RGPV CSE.',
    url: 'https://rudrabhullar.dev',
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
  url: 'https://rudrabhullar.dev',
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
    <html lang="en" className="dark">
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
