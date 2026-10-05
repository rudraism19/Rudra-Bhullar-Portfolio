export interface TrophyItem {
  id: string;
  category: 'HACKATHON' | 'CERTIFICATION' | 'ALGORITHMIC' | 'OPEN_SOURCE';
  badgeTitle: string;
  rank: string;
  title: string;
  organization: string;
  date: string;
  desc: string;
  proofBadge: string;
  credentialId?: string;
  verificationUrl?: string;
  technologies: string[];
  metrics: { label: string; value: string };
  citation: string;
}

export const TROPHIES: TrophyItem[] = [
  {
    id: 'bis-hackathon',
    category: 'HACKATHON',
    badgeTitle: 'NATIONAL FINALIST',
    rank: 'TOP 5 NATIONWIDE',
    title: 'Smart Standards AI RAG Engine',
    organization: 'Bureau of Indian Standards (BIS)',
    date: '2025',
    desc: 'Awarded Top 5 Finalist recognition for designing an autonomous regulatory compliance retrieval pipeline querying 12,000+ national standards clauses in under 1.2s.',
    proofBadge: 'VERIFIED FINALIST',
    credentialId: 'BIS-NAT-2025-FIN',
    technologies: ['Dense BGE', 'BM25', 'Qdrant', 'Next.js', 'FastAPI'],
    metrics: { label: 'Query Precision', value: '99.2%' },
    citation: 'Evaluated by BIS scientist jury for zero hallucination and clause-level citation fidelity.',
  },
  {
    id: 'kalyansetu-sprint',
    category: 'HACKATHON',
    badgeTitle: 'PODIUM RECOGNITION',
    rank: 'HONORABLE MENTION',
    title: 'Vernacular Audio Gateway for Public Schemes',
    organization: 'Civic Tech National Sprint',
    date: '2024-2025',
    desc: 'Engineered a 36-hour multimodal voice platform enabling semi-literate rural citizens to claim welfare benefits in 11 native dialects without typed input.',
    proofBadge: 'INNOVATION AWARD',
    credentialId: 'CIVIC-SPRINT-7704',
    technologies: ['Sarvam AI', 'Gemini 1.5 Flash', 'Supabase', 'WebSockets'],
    metrics: { label: 'Dialects Supported', value: '11 Dialects' },
    citation: 'Honored for highest social impact velocity and sub-1.4s total round-trip audio latency.',
  },
  {
    id: 'google-cloud-genai',
    category: 'CERTIFICATION',
    badgeTitle: 'OFFICIAL ACCREDITATION',
    rank: 'CERTIFIED FOUNDATION',
    title: 'Google Cloud & Generative AI Architecture',
    organization: 'Google Cloud / DeepLearning.AI',
    date: '2024',
    desc: 'Certified architectural proficiency across Google Cloud vertex pipelines, transformer attention mechanics, prompt orchestration, and containerized model deployments.',
    proofBadge: 'VERIFIED CREDENTIAL',
    credentialId: 'GCP-GENAI-88329',
    technologies: ['Vertex AI', 'Docker', 'Embeddings', 'GCP'],
    metrics: { label: 'Exam Score', value: 'Distinction' },
    citation: 'Demonstrated mastery over zero-shot routing, RAG chunking, and latency SLA guarantees.',
  },
  {
    id: 'leetcode-500',
    category: 'ALGORITHMIC',
    badgeTitle: 'COMPETITIVE CODING',
    rank: 'TOP 6% PERCENTILE',
    title: '500+ Algorithmic Problems Mastered',
    organization: 'LeetCode & Global Platforms',
    date: '2023-2025',
    desc: 'Rigorous computational problem solving covering Dynamic Programming, Graph Theory, Segment Trees, Backtracking, and Advanced Asymptotic Complexity.',
    proofBadge: 'TOP CODING RIGOR',
    credentialId: 'LC-ID-rudraism19',
    technologies: ['Java', 'C++', 'Graph Theory', 'DP'],
    metrics: { label: 'Problems Solved', value: '500+' },
    citation: 'Consistent sub-millisecond execution times and mathematically optimal space-time bounds.',
  },
  {
    id: 'health-queue-sprint',
    category: 'HACKATHON',
    badgeTitle: 'HEALTHCARE INNOVATION',
    rank: 'FINALIST • TOP TIER',
    title: 'Distributed OPD Clinic Logistics Engine',
    organization: 'National HealthTech Sprint',
    date: '2024',
    desc: 'Architected high-throughput clinic queue balancer coordinating emergency triage, multi-lane appointment routing, and doctor consultation duration predictions.',
    proofBadge: 'PROTOTYPE PODIUM',
    credentialId: 'HEALTH-SPRINT-09',
    technologies: ['Redis Pub/Sub', 'Next.js', 'PostgreSQL', 'Tailwind'],
    metrics: { label: 'Congestion Cut', value: '-62% Wait' },
    citation: 'Recognized for stress-tested resiliency under 15,000+ simultaneous simulated patient queries.',
  },
  {
    id: 'mcp-open-source',
    category: 'OPEN_SOURCE',
    badgeTitle: 'FRONTIER EXPLORATION',
    rank: 'ACTIVE MAINTAINER',
    title: 'Model Context Protocol (MCP) Mesh & Tool Servers',
    organization: 'Open Source Community',
    date: '2025-2026',
    desc: 'Pioneered custom MCP JSON-RPC tool servers bridging LLM clients directly to localized vector databases, Git repositories, and Docker runtime sandboxes.',
    proofBadge: 'OPEN SOURCE',
    credentialId: 'MCP-COMMUNITY-SPEC',
    technologies: ['TypeScript', 'MCP SDK', 'Docker', 'SQLite'],
    metrics: { label: 'Protocol Latency', value: '<480ms' },
    citation: 'Decoupling LLM model intelligence from external system storage through standard primitives.',
  },
];
