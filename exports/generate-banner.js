const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const heroImgPath = path.join(rootDir, 'public', 'rudra-hero-cropped.png');
const heroBase64 = fs.readFileSync(heroImgPath).toString('base64');

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>LinkedIn Banner - Rudra Bhullar</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Anton&family=JetBrains+Mono:wght@400;500;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    width: 1584px;
    height: 396px;
    overflow: hidden;
    background-color: #14120E;
    font-family: 'Plus Jakarta Sans', sans-serif;
    color: #14120E;
    -webkit-font-smoothing: antialiased;
    position: relative;
  }

  /* Main Signal Tangerine Canvas */
  .canvas {
    width: 1584px;
    height: 396px;
    background: #EB7D00 radial-gradient(circle at 72% 35%, rgba(255, 175, 45, 0.45) 0%, rgba(235, 125, 0, 0) 65%);
    position: relative;
    overflow: hidden;
  }

  /* Fine Blueprint Grid Lines */
  .grid-overlay {
    position: absolute;
    inset: 0;
    background-image: 
      linear-gradient(to right, rgba(20, 18, 14, 0.05) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(20, 18, 14, 0.05) 1px, transparent 1px);
    background-size: 44px 44px;
    pointer-events: none;
    z-index: 1;
  }

  /* Top Editorial Info Bar */
  .top-bar {
    position: absolute;
    top: 24px;
    left: 48px;
    right: 48px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 30;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    color: #14120E;
    text-transform: uppercase;
  }

  .status-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 5px 12px;
    background: rgba(20, 18, 14, 0.08);
    border: 1px solid rgba(20, 18, 14, 0.2);
    border-radius: 999px;
  }

  .pulse-dot {
    width: 7px;
    height: 7px;
    background: #14120E;
    border-radius: 50%;
  }

  .top-right-meta {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .meta-tag {
    padding: 4px 10px;
    border: 1px solid rgba(20, 18, 14, 0.2);
    border-radius: 6px;
    background: rgba(20, 18, 14, 0.04);
  }

  /* Center Left: Massive 3D Display Typography */
  .typography-container {
    position: absolute;
    top: 68px;
    left: 280px;
    z-index: 10;
    display: flex;
    flex-direction: column;
    pointer-events: none;
    user-select: none;
  }

  .display-name {
    font-family: 'Anton', sans-serif;
    font-size: 130px;
    line-height: 0.82;
    letter-spacing: -2px;
    text-transform: uppercase;
    color: #14120E;
  }

  .subtitle-container {
    position: absolute;
    bottom: 24px;
    left: 280px;
    z-index: 30;
    max-width: 480px;
  }

  .role-title {
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #14120E;
    margin-bottom: 6px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .role-title::before {
    content: '';
    display: inline-block;
    width: 14px;
    height: 2px;
    background: #14120E;
  }

  .bio-text {
    font-size: 13px;
    line-height: 1.45;
    font-weight: 600;
    color: rgba(20, 18, 14, 0.88);
    max-width: 440px;
  }

  /* Avatar Safe Zone (Bottom Left) Notice */
  .avatar-guide {
    position: absolute;
    bottom: 18px;
    left: 48px;
    z-index: 25;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .avatar-guide-tag {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    color: rgba(20, 18, 14, 0.6);
    letter-spacing: 0.05em;
  }

  /* Cutout Silhouette Layer (Center-Right, z-20) */
  .silhouette-wrapper {
    position: absolute;
    bottom: 0;
    left: 690px;
    height: 380px;
    z-index: 20;
    display: flex;
    align-items: flex-end;
    pointer-events: none;
  }

  .silhouette-img {
    height: 375px;
    width: auto;
    object-fit: contain;
    object-position: bottom;
    filter: drop-shadow(0 20px 35px rgba(0, 0, 0, 0.65));
  }

  /* Bottom Organic S-Curve Foundation in Espresso Noir (#14120E) */
  .bottom-curve {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 1584px;
    height: 140px;
    pointer-events: none;
    z-index: 15;
  }

  /* Right Side: Rich Added Details & Credentials */
  .right-panel {
    position: absolute;
    top: 74px;
    right: 48px;
    bottom: 24px;
    width: 440px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 30;
  }

  /* Specialization List */
  .spec-box {
    background: rgba(20, 18, 14, 0.08);
    border: 1px solid rgba(20, 18, 14, 0.18);
    border-radius: 14px;
    padding: 16px 20px;
    backdrop-filter: blur(8px);
  }

  .spec-header {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 0.15em;
    color: #14120E;
    text-transform: uppercase;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .spec-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px 16px;
    list-style: none;
  }

  .spec-item {
    font-size: 12px;
    font-weight: 700;
    color: #14120E;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .spec-item::before {
    content: '›';
    font-family: 'JetBrains Mono', monospace;
    font-weight: 900;
    color: #14120E;
    font-size: 14px;
  }

  /* Verified Metrics Strip */
  .metrics-strip {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    margin-top: 10px;
  }

  .metric-card {
    background: #14120E;
    color: #FAF8F2;
    padding: 10px 12px;
    border-radius: 10px;
    text-align: center;
    border: 1px solid rgba(44, 39, 32, 0.8);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }

  .metric-num {
    font-family: 'JetBrains Mono', monospace;
    font-size: 16px;
    font-weight: 800;
    color: #EB7D00;
    line-height: 1;
    margin-bottom: 3px;
  }

  .metric-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 8.5px;
    letter-spacing: 0.05em;
    color: #A39E91;
    text-transform: uppercase;
  }

  /* Tech Stack Badges */
  .tech-badges {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 8px;
  }

  .badge {
    padding: 3px 8px;
    background: #14120E;
    color: #F3EBD8;
    border-radius: 6px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 9.5px;
    font-weight: 600;
    letter-spacing: 0.04em;
  }

  /* Bottom Right Contact & Portfolio Badge */
  .right-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 8px;
    border-top: 1px solid rgba(20, 18, 14, 0.15);
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    font-weight: 700;
  }

  .cta-pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 14px;
    background: #14120E;
    color: #EB7D00;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 800;
    letter-spacing: 0.05em;
    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  }

  .cta-arrow {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 14px;
    height: 14px;
    background: #EB7D00;
    color: #14120E;
    border-radius: 3px;
    font-size: 10px;
    font-weight: 900;
  }

  .links-group {
    display: flex;
    gap: 12px;
    color: #14120E;
  }
</style>
</head>
<body>

<div class="canvas">
  <div class="grid-overlay"></div>

  <!-- 1. TOP BAR -->
  <div class="top-bar">
    <div class="status-badge">
      <span class="pulse-dot"></span>
      <span>AVAILABLE FOR ROLES & INNOVATION // 2026 EDITION</span>
    </div>
    <div class="top-right-meta">
      <span class="meta-tag">PUNJAB, INDIA</span>
      <span class="meta-tag">TIMEZONE: IST (UTC+5:30)</span>
      <span class="meta-tag">CSE • AI BUILDER</span>
    </div>
  </div>

  <!-- 2. AVATAR CLEARANCE SAFE ZONE (Bottom Left) -->
  <div class="avatar-guide">
    <span class="avatar-guide-tag">← PROFILE AVATAR SAFE ZONE</span>
  </div>

  <!-- 3. HUGE 3D CONDENSED TYPOGRAPHY (z-10) -->
  <div class="typography-container">
    <div class="display-name">RUDRA</div>
    <div class="display-name">BHULLAR</div>
  </div>

  <!-- 4. SUBTITLE & VALUE PROPOSITION -->
  <div class="subtitle-container">
    <div class="role-title">CREATIVE TECHNOLOGIST × AI ENGINEER</div>
    <p class="bio-text">
      Architecting multimodal AI systems, high-throughput distributed backends,
      and expressive digital products with computer science rigor.
    </p>
  </div>

  <!-- 5. PORTRAIT SILHOUETTE (z-20) -->
  <div class="silhouette-wrapper">
    <img src="data:image/png;base64,${heroBase64}" alt="Rudra Bhullar" class="silhouette-img">
  </div>

  <!-- 6. ORGANIC CURVED DARK BASELINE (z-15) -->
  <div class="bottom-curve">
    <svg viewBox="0 0 1584 140" preserveAspectRatio="none" style="width: 100%; height: 100%;">
      <path d="M 640,140 C 760,140 820,50 960,50 L 1584,50 L 1584,140 Z" fill="#14120E" />
    </svg>
  </div>

  <!-- 7. RIGHT COLUMN: RICH DETAILS, SKILLS & CREDENTIALS (z-30) -->
  <div class="right-panel">
    <!-- Specializations -->
    <div class="spec-box">
      <div class="spec-header">
        <span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:#14120E;"></span>
        CORE SPECIALIZATION
      </div>
      <ul class="spec-list">
        <li class="spec-item">Multimodal AI & RAG</li>
        <li class="spec-item">Scalable Backends</li>
        <li class="spec-item">Distributed Systems</li>
        <li class="spec-item">Java & DSA Rigor</li>
        <li class="spec-item">Creative Web Eng</li>
        <li class="spec-item">Autonomous Agents</li>
      </ul>

      <!-- Tech Stack Badges -->
      <div class="tech-badges">
        <span class="badge">Next.js 14</span>
        <span class="badge">TypeScript</span>
        <span class="badge">Python</span>
        <span class="badge">Java</span>
        <span class="badge">LangChain</span>
        <span class="badge">Tailwind</span>
        <span class="badge">PyTorch</span>
      </div>
    </div>

    <!-- Verified Metrics -->
    <div class="metrics-strip">
      <div class="metric-card">
        <div class="metric-num">10+</div>
        <div class="metric-label">Projects Built</div>
      </div>
      <div class="metric-card">
        <div class="metric-num">5+</div>
        <div class="metric-label">Hackathons</div>
      </div>
      <div class="metric-card">
        <div class="metric-num">1000+</div>
        <div class="metric-label">Build Hours</div>
      </div>
    </div>

    <!-- Footer Links & CTA -->
    <div class="right-footer">
      <div class="links-group">
        <span>github.com/rudrabhullar</span>
        <span>•</span>
        <span>rudrabhullar.com</span>
      </div>
      <div class="cta-pill">
        <span>CONNECT</span>
        <span class="cta-arrow">↗</span>
      </div>
    </div>
  </div>

</div>

</body>
</html>`;

fs.writeFileSync(path.join(__dirname, 'linkedin-banner.html'), htmlContent, 'utf8');
console.log('HTML written to exports/linkedin-banner.html');
