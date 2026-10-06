# Rudra Bhullar — Engineering Portfolio

[![Next.js 14](https://img.shields.io/badge/Next.js-14.2-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Deployment](https://img.shields.io/badge/Deployed_on-Vercel-black?style=flat&logo=vercel)](https://rudra-bhullar.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **AI Backend Architect × Ex-CTO @DTV × Editorial Systems Design**  
> Live Production URL: **[https://rudra-bhullar.vercel.app/](https://rudra-bhullar.vercel.app/)**

A high-performance personal engineering portfolio for **Rudra Bhullar** (AI Backend Engineer, Former Chief Technology Officer at Digital Twin Verse, and Computer Science Scholar at UIT RGPV, Madhya Pradesh, India).

Built with an editorial aesthetic influenced by Swiss modernist typography, tactile physical stone materials, and mathematically exact scroll physics.

---

## 🎨 Design System: Pure Titanium Monochrome & Limestone

The visual language follows architectural restraint, eliminating neon cliches in favor of tactile physical materials:

| Token | Hex | Material Role | Usage |
| :--- | :--- | :--- | :--- |
| `--bg` | `#0A0A0A` | Pure Titanium Dark | Deep obsidian foundation canvas |
| `--surface` | `#141416` | Dark Titanium Slab | Elevated cards, dossier panels, code blocks |
| `--border` | `#222225` | Machined Titanium Edge | Technical hairline borders and divider rules |
| `--chalk` / `--orange` | `#EDEAE4` | Architectural Limestone | Hero central canvas, interactive accents, tag badges |
| `--text` | `#FAFAFA` | Pure Titanium White | Primary display typography & high-contrast headlines |
| `--muted` | `#8E8E93` | Anodized Titanium Grey | Monospaced metadata, telemetry coordinates, subheadings |

---

## ⚡ Architectural Highlights & Motion Physics

### 1. Dual-Phase Hero Parallax Runway
- **Phase 1 (Scroll = 0 → Assembly)**: At initial load (following the cinematic `01 / 02 / 03` loader), the visitor sees `RUDRA BHULLAR` in massive display typography centered in the viewport. As the user scrolls, a single unified `<h1>` element smoothly scales down (`1.35 → 1.00`) and glides into its exact resting dock inside the rising limestone card, with an RGB chromic color morph from `#FAFAFA` to `#0A0A0A`.
- **Phase 2 (Exit Depth Parallax)**: As the visitor scrolls down from the assembled Hero into the rest of the site, multi-plane depth physics take over:
  - 3D Limestone Card Recess (`scale: 1.00 → 0.965`, subtle lag)
  - HD Silhouette Depth Sink (`+exitDist * 0.14`)
  - Inverse Typography Float (`-exitDist * 0.08`)
  - Soft top-header dissolution

### 2. Layered Architectural Slab Stacking (`#work`)
- Sticky stacking parallax for featured case studies (**JanSetu AI**, **BIS Sahayak**, **Agentic Workflow Automator**).
- Interactive **System Blueprint Dossiers** and **Engineering Trade-off Matrices** examining architectural alternatives (e.g., FastAPI vs Node.js, pgvector vs Pinecone).

### 3. Trophy Cabinet & Engineering Vault (`#trophies`)
- Curated record of competitive hackathons and engineering milestones with verified external issuer links.
- Interactive tabbed credential filtering across **AI / Backend**, **Hackathons**, and **System Architecture**.

### 4. Lighthouse & Core Web Vitals Optimization
- **Zero Render-Blocking Font Calls**: Preconnected Google Fonts (`Anton`, `Syne`, `Plus Jakarta Sans`, `JetBrains Mono`) with DNS/TLS pre-warming and `display: swap`.
- **Next.js Image Optimization**: HD portrait silhouette served in next-gen **AVIF/WebP** formats with explicit dimensions and preloaded `priority`, saving over 160 KiB on mobile.
- **Adaptive Main-Thread Scheduling**: Lenis smooth scrolling runs on desktop mouse devices, while touch and mobile devices automatically use 120Hz native hardware momentum scrolling to eliminate CPU blocking tasks.
- **Full WCAG AA/AAA Contrast**: High-contrast ratios (`7.5:1+` on light stone, `6.2:1+` on dark titanium).

### 5. Production SEO & Discoverability
- Automatic edge-delivered `sitemap.xml` and `robots.txt` (`HTTP 200`, `X-Vercel-Cache: HIT`).
- Structured `schema.org/Person` JSON-LD semantic data linking GitHub, LinkedIn, and X profiles.
- Verified in **Google Search Console**.

---

## 📁 Repository Structure

```
├── app/
│   ├── globals.css           # Titanium design tokens, typography utilities, print/motion reset
│   ├── layout.tsx            # Global metadata, JSON-LD Person schema, preconnect fonts
│   └── page.tsx              # Assembled editorial page architecture
├── components/
│   ├── providers/
│   │   └── SmoothScroll.tsx  # Adaptive Lenis provider (desktop inertia / mobile native)
│   ├── ui/
│   │   ├── CustomCursor.tsx  # Fine-pointer precision follower
│   │   ├── Loader.tsx        # Responsive 01->02->03 unveil sequence
│   │   └── ScrollProgress.tsx# Minimal reading progress indicator
│   └── sections/
│       ├── Navbar.tsx        # Dynamic sticky navigation with active section tracking
│       ├── Hero.tsx          # Dual-phase parallax runway & single-element title glide
│       ├── MetricTicker.tsx  # Production stats ticker with intersection observers
│       ├── About.tsx         # Identity manifesto & engineering philosophy
│       ├── ProjectShowcase.tsx # Sticky stacking architectural slabs
│       ├── ProjectItem.tsx   # Individual case study article with throughput telemetry
│       ├── ProjectModal.tsx  # Deep-dive blueprint & trade-off modal
│       ├── Skills.tsx        # Grouped technical proficiencies
│       ├── Experiments.tsx   # Interactive sandbox laboratory (MCP, Agents, RAG)
│       ├── TrophyCabinet.tsx # Verified hackathon achievements & credential vault
│       ├── Timeline.tsx      # Chronological engineering evolution
│       ├── Contact.tsx       # Dispatch form & communication channels
│       └── Footer.tsx        # Colophon & back-to-top anchor
├── lib/
│   └── projects.ts           # Case studies data, throughput specs, and architecture specs
├── public/
│   ├── favicon.svg           # Branded vector mark
│   ├── google63bdc67d86ab7d7e.html # Google Search Console verification token
│   ├── robots.txt            # Static search engine crawler instructions
│   ├── sitemap.xml           # Static canonical XML sitemap
│   └── rudra-hero-hd.png     # Studio cutout asset
├── next.config.mjs           # Next.js config with AVIF/WebP image optimization
├── tailwind.config.ts        # Custom colors, typography, and animation keyframes
└── package.json              # Dependencies and scripts
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js `18.17.0` or higher
- npm, yarn, or pnpm

### Local Setup

```bash
# 1. Clone repository
git clone https://github.com/rudraism19/Rudra-Bhullar-Portfolio.git
cd Rudra-Bhullar-Portfolio

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# Navigate to http://localhost:3000
```

### Production Build & Verification

```bash
# Run production build
npm run build

# Preview production build locally
npm run start
```

---

## 📬 Contact & Connect

- **Author**: Rudra Bhullar
- **Role**: AI Backend Engineer • Ex-CTO @ Digital Twin Verse
- **Education**: B.Tech in Computer Science, UIT RGPV, Madhya Pradesh, India
- **Live Site**: [rudra-bhullar.vercel.app](https://rudra-bhullar.vercel.app/)
- **LinkedIn**: [linkedin.com/in/rudra-bhullar](https://linkedin.com/in/rudra-bhullar)
- **GitHub**: [github.com/rudraism19](https://github.com/rudraism19)
- **X / Twitter**: [x.com/rudrabhullar](https://x.com/rudrabhullar)
- **Email**: [rudrabhullar19@gmail.com](mailto:rudrabhullar19@gmail.com)

---
