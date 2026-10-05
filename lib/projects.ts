export interface ArchitectureNode {
  step: string;
  title: string;
  tech: string;
  latencyBudget?: string;
  detail: string;
}

export interface EngineeringTradeoff {
  decision: string;
  alternative: string;
  rationale: string;
}

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
  blueprint: {
    dataflow: string;
    throughput: string;
    storageEngine: string;
    nodes: ArchitectureNode[];
  };
  tradeoffs: EngineeringTradeoff[];
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
    accentColor: '#EDEAE4',
    diagramType: 'civic',
    blueprint: {
      dataflow: 'Native Audio (WebSocket) → ASR Voice Chunking (180ms) → Semantic Schema Extraction via Gemini (320ms) → Supabase pgvector HNSW Query (45ms) → Vernacular Speech Stream (220ms)',
      throughput: 'Sub-1.4s Full Round-Trip Audio',
      storageEngine: 'Supabase PostgreSQL + pgvector (HNSW Indexing)',
      nodes: [
        {
          step: '01 / INGESTION',
          title: 'Client Audio Capture',
          tech: 'Browser MediaStream / Binary WebSockets',
          latencyBudget: '<40ms frame buffer',
          detail: 'Captures low-bitrate microphone audio packets and streams directly across high-jitter rural 3G/4G connections.',
        },
        {
          step: '02 / SPEECH ASR',
          title: 'Vernacular Speech-to-Text',
          tech: 'Sarvam AI Indian Speech API',
          latencyBudget: '180ms chunk latency',
          detail: 'Transcribes complex colloquial Hindi, Punjabi, Tamil, and Hinglish code-switching into normalized Unicode strings.',
        },
        {
          step: '03 / REASONING',
          title: 'Intent & Demographic Parser',
          tech: 'Google Gemini 1.5 Flash',
          latencyBudget: '320ms schema extraction',
          detail: 'Extracts demographic variables (state, income band, family size, social categories) for deterministic scheme matching.',
        },
        {
          step: '04 / RETRIEVAL',
          title: 'Hybrid pgvector Scheme Match',
          tech: 'Supabase pgvector (HNSW)',
          latencyBudget: '45ms query',
          detail: 'Executes atomic combined vector similarity search and SQL categorical filters over 500+ national public welfare schemes.',
        },
        {
          step: '05 / SYNTHESIS',
          title: 'Vernacular Audio Stream',
          tech: 'Streaming Audio Synthesis API',
          latencyBudget: '220ms first-byte',
          detail: 'Streams spoken guidance back to the citizen in their native dialect with pinpoint eligibility and checklist instructions.',
        },
      ],
    },
    tradeoffs: [
      {
        decision: 'Streaming WebSockets over Traditional HTTP Polling',
        alternative: 'RESTful HTTP POST / Polling requests',
        rationale: 'Eliminated TCP connection handshakes and SSL renegotiations per audio frame, cutting latency by 320ms and preserving natural conversational flow over erratic mobile networks.',
      },
      {
        decision: 'Supabase pgvector over Standalone Pinecone SaaS',
        alternative: 'External Pinecone / Milvus Cluster',
        rationale: 'Permitted atomic relational JOINs between vector distance calculations and strict categorical eligibility criteria (state codes, income thresholds) in a single database transaction without multi-cloud network hops.',
      },
      {
        decision: 'Sarvam AI Regional Models over Generic Whisper Large v3',
        alternative: 'OpenAI Whisper API',
        rationale: 'Sarvam demonstrated 3.2x higher accuracy on regional Indian phonetic inflections and colloquial code-switching common in rural governance queries.',
      },
    ],
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
    accentColor: '#141416',
    diagramType: 'standards',
    blueprint: {
      dataflow: 'Engineering PDF Parser → Hierarchical Section Chunking → Hybrid Sparse (BM25) + Dense (BGE) Retrieval → Cross-Encoder Re-Ranking → Clause Pinpoint Verification',
      throughput: '12,000+ Technical Clauses Indexed',
      storageEngine: 'Qdrant Vector Database (Payload Filtered HNSW)',
      nodes: [
        {
          step: '01 / EXTRACTION',
          title: 'Schematic & Document Ingestion',
          tech: 'PyMuPDF & Custom OCR Parser',
          latencyBudget: '<800ms per 50-page doc',
          detail: 'Extracts dense technical tables, tolerances, testing criteria, and sub-clauses from BIS standards PDFs.',
        },
        {
          step: '02 / CHUNKING',
          title: 'Hierarchical Document Chunking',
          tech: 'Clause-Aware Semantic Chunking',
          latencyBudget: 'Instantaneous',
          detail: 'Partitions clauses preserving document hierarchy, parent-child relationships, and footnote test specifications.',
        },
        {
          step: '03 / INDEXING',
          title: 'Hybrid Dual-Index Pipeline',
          tech: 'BM25 Sparse + BAAI/bge-large-en',
          latencyBudget: 'Sub-30ms embedding',
          detail: 'Simultaneously registers exact lexical identifiers (e.g., IS 10500:2012 Clause 4.2.1) and dense semantic concepts.',
        },
        {
          step: '04 / RETRIEVAL',
          title: 'Vector Search & Cross-Encoder',
          tech: 'Qdrant Vector DB + FlashRank',
          latencyBudget: '45ms retrieval',
          detail: 'Filters standard clauses with 99.2% precision, eliminating hallucinated regulatory advice before LLM synthesis.',
        },
        {
          step: '05 / SYNTHESIS',
          title: 'Compliance Report Synthesis',
          tech: 'FastAPI Streaming Generator',
          latencyBudget: '<1.2s total SLA',
          detail: 'Outputs cited audit reports detailing exact testing compliance parameters with verifiable clause footnotes.',
        },
      ],
    },
    tradeoffs: [
      {
        decision: 'Hybrid BM25 + Dense Retrieval over Pure Vector Similarity',
        alternative: 'Dense-only Cosine Vector Search',
        rationale: 'Pure dense vector embeddings failed on precise standard codes and numerical tolerance clauses (e.g., IS 10500 Clause 4.2.1 vs 4.2.2). BM25 ensures 100% lexical precision on standard numbers while dense vectors capture semantic concepts.',
      },
      {
        decision: 'FastAPI Asynchronous Microservice over Flask/Django',
        alternative: 'Synchronous Python Flask Server',
        rationale: 'FastAPI with ASGI non-blocking event loops allows parallel PDF parsing, async vector retrieval, and server-sent streaming to execute concurrently without exhausting worker thread pools.',
      },
      {
        decision: 'Qdrant with Payload Filtering over In-Memory Vector Stores',
        alternative: 'ChromaDB / FAISS Flat',
        rationale: 'Qdrant allows instant metadata payload filtering by industrial sector, publication year, and BIS technical committee prior to HNSW graph traversal, slashing search space by 85%.',
      },
    ],
  },
  {
    number: '03',
    id: 'digital-twin-verse',
    name: 'Digital Twin Verse',
    category: 'PLACEMENT INTELLIGENCE × GRAPH ML',
    shortDesc:
      'Dynamic student digital twin engine architected by Rudra as CTO & Tech Lead at DTV, simulating campus placement trajectories and generating personalized roadmap graphs.',
    fullDesc:
      'Architected during tenure as Chief Technology Officer and Web Lead at Digital Twin Verse (honored with official Certificate of Recognition DTV-CORE-2026-006). Digital Twin Verse models each university candidate as a continuously updated vector representation of their skills, code quality, academic standing, and problem-solving velocity. By comparing individual vectors against successful company candidate profiles, it provides deterministic skill trajectories.',
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
    liveUrl: 'https://digital-twin-certificates.onrender.com/verify/DTV-CORE-2026-006',
    githubUrl: 'https://github.com/rudraism19/digital-twin-verse',
    accentColor: '#EDEAE4',
    diagramType: 'twin',
    blueprint: {
      dataflow: 'Candidate Profile Ingestion → Continuous Skill Vectorizer → Neo4j Prerequisite Graph Traversal → Tier-1 Benchmark Alignment → 60fps Radar Canvas Rendering',
      throughput: '300+ Active Student Trajectories Modeled',
      storageEngine: 'Neo4j Graph Database + Supabase PostgreSQL',
      nodes: [
        {
          step: '01 / INGESTION',
          title: 'Skill Telemetry Ingestion',
          tech: 'Next.js App Router / Edge Endpoints',
          latencyBudget: '<50ms ingestion',
          detail: 'Aggregates code quality, GitHub commits, DSA problem logs, and academic scores into unified candidate state.',
        },
        {
          step: '02 / VECTORIZER',
          title: 'Candidate Vector Representation',
          tech: 'Continuous Vectorizer Engine',
          latencyBudget: '<120ms compute',
          detail: 'Constructs dynamic 128-dimensional embedding representing student problem-solving speed, technical depth, and consistency.',
        },
        {
          step: '03 / GRAPH ML',
          title: 'Prerequisite Graph Traversal',
          tech: 'Neo4j Knowledge Graph (Cypher)',
          latencyBudget: '<35ms traversal',
          detail: 'Traverses 1,400+ interconnected skill nodes to identify missing prerequisite competencies and optimal learning paths.',
        },
        {
          step: '04 / ALIGNMENT',
          title: 'Placement Benchmark Comparison',
          tech: 'Placement Probability Engine',
          latencyBudget: '<40ms delta',
          detail: 'Calculates multidimensional distance between candidate skill vector and successful Tier-1 company hiring benchmarks.',
        },
        {
          step: '05 / RENDERING',
          title: 'Interactive Radar Simulation',
          tech: 'HTML5 Canvas / WebGL',
          latencyBudget: '60fps interactive',
          detail: 'Permits real-time milestone manipulation, showing how acquiring a target skill shifts recruitment probability.',
        },
      ],
    },
    tradeoffs: [
      {
        decision: 'Neo4j Knowledge Graph over Relational Foreign Keys',
        alternative: 'Traditional PostgreSQL Join Tables',
        rationale: 'Modeling multi-hop prerequisite dependencies (e.g., Graph Theory requires Trees, which requires Recursion) caused 7-table JOIN cascades in SQL; Neo4j executes arbitrary-depth Cypher traversals in under 35ms.',
      },
      {
        decision: 'Client-Side Canvas Radar Rendering over Server Rendered Images',
        alternative: 'Server-side pre-rendered SVG/PNG charts',
        rationale: 'Allows instantaneous 60fps responsive feedback as students drag skill sliders, providing dynamic exploration without latency-inducing server calls.',
      },
      {
        decision: 'Next.js 14 Parallel Routes & Server Components',
        alternative: 'Single Page React SPA (Vite)',
        rationale: 'Enabled instant server-side hydration for candidate shareable portfolios while streaming heavy graph analytics asynchronously in separate route slots.',
      },
    ],
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
    accentColor: '#EDEAE4',
    diagramType: 'voice',
    blueprint: {
      dataflow: 'Microphone Input → Binary WebSocket Chunking → Streaming Whisper ASR → ChromaDB Vector Retrieval → Gemini 1.5 Flash Reasoning → ElevenLabs Audio Packet Stream',
      throughput: '480ms End-to-End Latency SLA',
      storageEngine: 'ChromaDB Local Vector Engine + In-Memory Ring Buffer',
      nodes: [
        {
          step: '01 / PROTOCOL',
          title: 'Full-Duplex Audio WebSocket',
          tech: 'FastAPI WebSocket Server',
          latencyBudget: '<20ms chunk',
          detail: 'Maintains continuous persistent two-way socket for concurrent audio upload and streaming response playback.',
        },
        {
          step: '02 / STREAMING ASR',
          title: 'Streaming Whisper ASR',
          tech: 'Whisper ASR with Ring Buffer',
          latencyBudget: '120ms chunk',
          detail: 'Transcribes user speech in real-time overlapping 250ms chunks, enabling instant intent detection before user finishes speaking.',
        },
        {
          step: '03 / ARBITRATION',
          title: 'Barge-In Interruption Arbiter',
          tech: 'Acoustic Echo & State Machine',
          latencyBudget: '<40ms abort',
          detail: 'Detects immediate user speech during assistant playback, instantly aborting downstream audio buffer packets.',
        },
        {
          step: '04 / CONTEXT',
          title: 'Contextual Vector Retrieval',
          tech: 'ChromaDB In-Memory Index',
          latencyBudget: '<45ms retrieval',
          detail: 'Retrieves authoritative document snippets matched against incoming conversational utterances.',
        },
        {
          step: '05 / PLAYBACK',
          title: 'Streaming Voice Synthesis',
          tech: 'Kokoro / ElevenLabs Streaming API',
          latencyBudget: '180ms first-byte',
          detail: 'Streams audio chunks directly into the browser Web Audio API context for immediate gapless playback.',
        },
      ],
    },
    tradeoffs: [
      {
        decision: 'Full-Duplex WebSockets over Chunked HTTP POST',
        alternative: 'HTTP/2 Chunked Post Requests',
        rationale: 'Bidirectional WebSockets allow sub-40ms barge-in interruption signaling: as soon as the user speaks, an abort signal terminates audio playback immediately, eliminating unnatural robotic collisions.',
      },
      {
        decision: 'In-Memory Ring Buffers over Disk Audio Files',
        alternative: 'Temporary .wav file writes to SSD',
        rationale: 'Eliminated filesystem I/O bottleneck entirely, keeping raw audio frames in memory for instantaneous transcription pipeline throughput.',
      },
      {
        decision: 'Local Quantized Models with Fallback API',
        alternative: 'Cloud-only API endpoints',
        rationale: 'Provides deterministic latency floor for embedding generation and phonetic token generation without external network jitter.',
      },
    ],
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
    accentColor: '#141416',
    diagramType: 'queue',
    blueprint: {
      dataflow: 'Patient Arrival Check-In → Redis Atomic Token Allocator → Dynamic Triage Heuristic Engine → WebSocket Live Queue Broadcaster → Push / SMS Relay',
      throughput: '15,000+ Concurrent Simulated Tokens',
      storageEngine: 'Redis Pub/Sub + PostgreSQL Relational Store',
      nodes: [
        {
          step: '01 / CHECK-IN',
          title: 'Instant Patient Check-in',
          tech: 'PWA QR Scan & Web App Router',
          latencyBudget: '<60ms load',
          detail: 'Allows patients to check into outpatient clinics via simple camera QR code scan with zero app install required.',
        },
        {
          step: '02 / ALLOCATION',
          title: 'Atomic Token Distributor',
          tech: 'Redis INCR & Sorted Sets',
          latencyBudget: '<5ms allocation',
          detail: 'Distributes sequential clinic tokens atomically under extreme morning arrival rushes, preventing duplicate allocations.',
        },
        {
          step: '03 / PREDICTION',
          title: 'Dynamic Triage Predictor',
          tech: 'Heuristic Duration Algorithm',
          latencyBudget: '<15ms computation',
          detail: 'Analyzes historical physician consultation durations, case severity codes, and walk-in rates to predict real wait times.',
        },
        {
          step: '04 / BROADCAST',
          title: 'Real-Time Sync Broadcaster',
          tech: 'Redis Pub/Sub & WebSockets',
          latencyBudget: '<80ms sync',
          detail: 'Pushes live queue updates to patient devices so they can wait in nearby cafeterias or outdoors instead of crowded rooms.',
        },
        {
          step: '05 / RECORDING',
          title: 'Permanent Audit & Analytics',
          tech: 'PostgreSQL Relational DB',
          latencyBudget: 'Async write',
          detail: 'Stores complete appointment lifecycle for hospital department capacity planning and bottleneck elimination.',
        },
      ],
    },
    tradeoffs: [
      {
        decision: 'Redis Atomic INCR and Sorted Sets over PostgreSQL Row Locks',
        alternative: 'Database Row Locking (SELECT ... FOR UPDATE)',
        rationale: 'PostgreSQL row locks created catastrophic database connection deadlocks under 15,000+ concurrent simulated morning booking bursts. Redis in-memory atomic operations execute in <5ms without blocking.',
      },
      {
        decision: 'Web Push & WebSockets over Native Mobile App',
        alternative: 'Native Android/iOS App',
        rationale: 'Elderly and transient clinic visitors refuse to install dedicated mobile apps for a single doctor visit. A zero-install QR PWA achieved 94% adoption versus 18% for native apps.',
      },
      {
        decision: 'Dynamic Triage Weighting over Fixed First-In-First-Out',
        alternative: 'Strict Sequential FIFO',
        rationale: 'Incorporates emergency severity flags and doctor consultation variances, reducing actual waiting room congestion by 62%.',
      },
    ],
  },
];
