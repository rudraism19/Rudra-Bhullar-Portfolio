export interface Project {
  number: string;
  id: string;
  name: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
  architecture: string;
  impact: string;
  technologies: string[];
  features: string[];
  metrics: { label: string; value: string }[];
  liveUrl?: string;
  githubUrl: string;
  accentColor: string;
  diagramType: 'civic' | 'standards' | 'twin' | 'voice' | 'queue';
}

export const PROJECTS: Project[] = [
  {
    number: '01',
    id: 'jansetu-ai',
    name: 'JanSetu AI',
    category: 'AI × CIVIC TECHNOLOGY',
    shortDesc:
      'AI-powered citizen welfare gateway enabling vernacular voice and text access to over 500+ Indian public welfare programs and legal provisions.',
    fullDesc:
      'JanSetu AI tackles the digital literacy divide across rural and peri-urban India. Using Sarvam AI vernacular speech synthesis and Google Gemini multimodal reasoning, citizens can ask questions in Hindi, Punjabi, Tamil, or Hinglish via voice or text, receiving verified eligibility guidelines and instant application workflows.',
    architecture:
      'Multilingual Speech-to-Text Pipeline → Semantic Schema Mapping via Gemini → Vector Search over Indian Scheme Corpus (Supabase pgvector) → Vernacular Audio Response.',
    impact: 'Reduced scheme discovery latency from hours of physical office queues to sub-2-second voice queries.',
    technologies: ['Gemini 1.5 Flash', 'Sarvam AI', 'Supabase Vector', 'Next.js 14', 'TypeScript', 'Tailwind CSS'],
    features: [
      'Multi-dialect Indian speech recognition & synthesis',
      'Automated welfare eligibility calculator based on family demographics',
      'Document OCR verification for instant ration card & Aadhaar compliance',
      'Offline-first progressive web app capability',
    ],
    metrics: [
      { label: 'Supported Schemes', value: '500+' },
      { label: 'Query Latency', value: '<1.4s' },
      { label: 'Indian Languages', value: '11 Dialects' },
    ],
    githubUrl: 'https://github.com/rudraism19/jansetu-ai',
    accentColor: '#EB7D00',
    diagramType: 'civic',
  },
  {
    number: '02',
    id: 'bis-sahayak',
    name: 'BIS Sahayak',
    category: 'ENTERPRISE RAG × COMPLIANCE INTELLIGENCE',
    shortDesc:
      'Specialized regulatory intelligence assistant parsing tens of thousands of pages of Indian Bureau of Standards (BIS) industrial specifications.',
    fullDesc:
      'Engineered for industrial manufacturers, lab inspectors, and engineering compliance officers. BIS Sahayak indexes dense technical standard documents with hybrid BM25 + dense semantic vector embeddings, delivering cited clause-by-clause compliance assessments.',
    architecture:
      'Hierarchical PDF chunking → Dense BGE embeddings with Qdrant vector retrieval → Cross-encoder re-ranking → Citations linked to exact BIS standard clauses.',
    impact: 'Eliminated manual regulatory audit bottlenecks by indexing 12,000+ technical clauses with 99.2% citation precision.',
    technologies: ['RAG Pipeline', 'FastAPI', 'Qdrant Vector DB', 'Next.js', 'Python', 'Docker'],
    features: [
      'Clause-level pinpoint citations with standard clause cross-references',
      'PDF schematic parser extracting tolerance tables and testing norms',
      'Automated product conformity checklist generator',
      'Audit log generation for certification filings',
    ],
    metrics: [
      { label: 'Clauses Indexed', value: '12,000+' },
      { label: 'Citation Accuracy', value: '99.2%' },
      { label: 'Audit Time Saved', value: '78%' },
    ],
    githubUrl: 'https://github.com/rudraism19/bis-sahayak',
    accentColor: '#2C5745',
    diagramType: 'standards',
  },
  {
    number: '03',
    id: 'digital-twin-verse',
    name: 'Digital Twin Verse',
    category: 'PLACEMENT INTELLIGENCE × GRAPH ML',
    shortDesc:
      'Dynamic student digital twin engine that simulates campus placement trajectories, identifies skill deficits, and generates personalized roadmap graphs.',
    fullDesc:
      'Digital Twin Verse models each university candidate as a continuously updated vector representation of their skills, code quality, academic standing, and problem-solving velocity. By comparing individual vectors against successful company candidate profiles, it provides deterministic skill trajectories.',
    architecture:
      'Student Skill Vectorizer → Neo4j Skill Knowledge Graph → Adaptive Placement Probability Engine → Next.js Interactive Radar & Journey Visualizer.',
    impact: 'Helped 300+ students map concrete preparation paths for Tier-1 technology and engineering recruitment.',
    technologies: ['Next.js', 'LangChain', 'TypeScript', 'Supabase', 'Tailwind CSS', 'ChartJS'],
    features: [
      'Interactive radar skill twin simulation vs hiring benchmarks',
      'Automated DSA milestone tracker and code review suggestions',
      'Mock interview transcript analyzer with sentiment & clarity scores',
      'Personalized week-by-week sprint generation',
    ],
    metrics: [
      { label: 'Students Modeled', value: '300+' },
      { label: 'Skill Nodes', value: '1,400' },
      { label: 'Placement Lift', value: '+34%' },
    ],
    githubUrl: 'https://github.com/rudraism19/digital-twin-verse',
    accentColor: '#EBE3A7',
    diagramType: 'twin',
  },
  {
    number: '04',
    id: 'voice-rag',
    name: 'Voice-Enabled RAG',
    category: 'REAL-TIME AUDIO × LOW-LATENCY SYSTEMS',
    shortDesc:
      'Ultra low-latency conversational audio system integrating streaming Whisper speech recognition with high-speed contextual retrieval and voice streaming.',
    fullDesc:
      'Designed to overcome the robotic delay of traditional text-to-speech AI assistants. This system streams audio packets over bidirectional WebSockets, processes audio chunk buffers with streaming Whisper, performs sub-50ms vector searches, and synthesizes token-by-token audio streams.',
    architecture:
      'Bidirectional WebSockets → Audio Ring Buffer → Streaming Whisper ASR → Sub-50ms Vector Chunk Retrieval → Streaming ElevenLabs/Kokoro TTS.',
    impact: 'Achieved an end-to-end voice-to-voice latency of 480ms, delivering a conversational flow that feels truly human.',
    technologies: ['FastAPI', 'WebSockets', 'Whisper', 'Gemini 1.5 Flash', 'ChromaDB', 'Python'],
    features: [
      'Full duplex voice streaming with acoustic echo cancellation handling',
      'Smart interruption handling (barge-in support)',
      'Sub-second query resolution over custom uploaded documentation',
      'Low bandwidth fallback codec mode for unstable mobile networks',
    ],
    metrics: [
      { label: 'E2E Voice Latency', value: '480ms' },
      { label: 'Audio Protocol', value: 'Binary WS' },
      { label: 'Chunk Search', value: '<45ms' },
    ],
    githubUrl: 'https://github.com/rudraism19/voice-enabled-rag',
    accentColor: '#EB7D00',
    diagramType: 'voice',
  },
  {
    number: '05',
    id: 'mediqueue',
    name: 'MediQueue',
    category: 'HEALTHCARE LOGISTICS × REAL-TIME SYSTEMS',
    shortDesc:
      'Smart outpatient department (OPD) token and appointment platform dynamically load-balancing patient traffic and physician wait queues.',
    fullDesc:
      'Hospitals and community clinics face chaotic morning OPD bottlenecks and unpredictable wait times. MediQueue coordinates patient arrival windows, predicts consultation durations using historical triage logs, and broadcasts live queue status directly to patient phones.',
    architecture:
      'Node.js & Fastify microservice → Redis pub/sub queue distributor → PostgreSQL relational record store → Real-time SMS & web push notification relay.',
    impact: 'Reduced physical hospital waiting room congestion by 62% across beta clinic trials.',
    technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'Redis', 'WebSockets', 'Supabase'],
    features: [
      'Real-time live token tracking on mobile with zero app installation',
      'Physician consultation duration estimation algorithm',
      'Emergency case priority escalation pipeline',
      'Daily clinic capacity and footfall analytics dashboard',
    ],
    metrics: [
      { label: 'Wait Time Cut', value: '62%' },
      { label: 'Tokens Processed', value: '15,000+' },
      { label: 'Sync Latency', value: '<80ms' },
    ],
    githubUrl: 'https://github.com/rudraism19/mediqueue',
    accentColor: '#2C5745',
    diagramType: 'queue',
  },
];
