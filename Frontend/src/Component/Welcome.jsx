import React, { useEffect, useRef, useState } from 'react';

/* ─────────────────────────────────────────────
   NOVAEXAM — Redesigned Landing Page
   Font: Clash Display (display) + Satoshi (body)
   Aesthetic: Refined dark-tech with glass morphism
───────────────────────────────────────────── */

const styles = `
  @import url('https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=satoshi@300,400,500,700&display=swap');

  /* ── TOKENS ── */
  :root {
    --emerald: #00D68F;
    --emerald-dim: #00B578;
    --sapphire: #2B7FFF;
    --sapphire-dim: #1A5FCC;
    --ink: #0A0E1A;
    --bg: #F5F7FA;
    --surface: #FFFFFF;
    --surface-2: #EEF1F7;
    --border: rgba(0,0,0,0.07);
    --text: #0A0E1A;
    --text-2: #3A4060;
    --text-3: #7880A0;
    --navbar-bg: rgba(255,255,255,0.75);
    --navbar-border: rgba(0,0,0,0.08);
    --card-bg: #FFFFFF;
    --badge-bg: #FFFFFF;
    --qtype-bg: #EEF1F7;
    --qtype-hover: #DDFAF0;
    --cta-s-bg: #FFFFFF;
    --cta-s-color: #00B578;
    --footer-bg: #070A14;
    --tag-bg: rgba(0,214,143,0.1);
    --tag-color: #00956A;
    --why-card: #FFFFFF;
  }

  .dark {
    --bg: #070A14;
    --surface: #0F1426;
    --surface-2: #141929;
    --border: rgba(255,255,255,0.06);
    --text: #EDF0FF;
    --text-2: #A8B0D0;
    --text-3: #5C6488;
    --navbar-bg: rgba(7,10,20,0.82);
    --navbar-border: rgba(255,255,255,0.06);
    --card-bg: #0F1426;
    --badge-bg: #141929;
    --qtype-bg: #141929;
    --qtype-hover: rgba(0,214,143,0.1);
    --cta-s-bg: #141929;
    --cta-s-color: #00D68F;
    --footer-bg: #030508;
    --tag-bg: rgba(0,214,143,0.12);
    --tag-color: #00D68F;
    --why-card: #0F1426;
  }

  *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }

  html { scroll-behavior: smooth; }

  body {
    font-family: 'Satoshi', sans-serif;
    background: var(--bg);
    color: var(--text);
    overflow-x: hidden;
    transition: background 0.45s ease, color 0.45s ease;
  }

  /* ── NAVBAR ── */
  .nv-nav {
    position: fixed; top:0; left:0; right:0; z-index:1000;
    display: flex; align-items:center; justify-content:space-between;
    padding: 0 48px;
    height: 66px;
    background: var(--navbar-bg);
    border-bottom: 1px solid var(--navbar-border);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    transition: background 0.45s, border-color 0.45s;
  }

  .nv-logo {
    font-family: 'Clash Display', sans-serif;
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--text);
    letter-spacing: -0.5px;
    display: flex; align-items:center; gap:8px;
  }
  .nv-logo-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: linear-gradient(135deg, #00D68F, #2B7FFF);
    box-shadow: 0 0 8px rgba(0,214,143,0.6);
    animation: pulse-dot 2.4s ease-in-out infinite;
  }
  @keyframes pulse-dot {
    0%,100% { box-shadow: 0 0 6px rgba(0,214,143,0.5); }
    50%      { box-shadow: 0 0 14px rgba(0,214,143,0.9); }
  }
  .nv-logo em { color: var(--emerald); font-style:normal; }

  /* dark/light toggle */
  .nv-toggle {
    display: flex; align-items:center; gap:10px;
    padding: 8px 16px 8px 10px;
    background: var(--surface-2);
    border: 1px solid var(--border);
    border-radius: 999px;
    cursor: pointer;
    transition: all 0.3s;
    user-select: none;
  }
  .nv-toggle:hover { border-color: var(--emerald); }
  .nv-track {
    width: 42px; height: 24px;
    background: var(--surface-2);
    border-radius: 999px; position:relative;
    border: 1px solid var(--border);
    transition: background 0.35s;
    flex-shrink: 0;
  }
  .nv-track.on { background: linear-gradient(135deg, #00D68F, #2B7FFF); border-color: transparent; }
  .nv-thumb {
    position:absolute; top:3px; left:3px;
    width:18px; height:18px; border-radius:50%;
    background:#fff;
    display:flex; align-items:center; justify-content:center;
    font-size:10px;
    transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1);
    box-shadow: 0 2px 6px rgba(0,0,0,0.2);
  }
  .nv-track.on .nv-thumb { transform: translateX(18px); }
  .nv-toggle-label {
    font-size: 13px; font-weight: 500; color: var(--text-3);
    transition: color 0.35s;
    white-space: nowrap;
  }

  /* ── HERO ── */
  .nv-hero {
    min-height: 100vh;
    background: linear-gradient(150deg, #060E24 0%, #0A1F3C 35%, #081A14 75%, #0A0E1A 100%);
    position: relative; overflow:hidden;
    display: flex; flex-direction:column;
    align-items:center; justify-content:center;
    text-align:center;
    padding: 130px 40px 100px;
  }

  /* grid overlay */
  .nv-hero::before {
    content:'';
    position:absolute; inset:0;
    background-image:
      linear-gradient(rgba(0,214,143,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,214,143,0.04) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events:none;
  }

  .nv-glow {
    position:absolute; border-radius:50%; pointer-events:none; filter:blur(80px);
  }
  .nv-glow-1 { width:500px; height:500px; background:rgba(0,214,143,0.12); top:-120px; left:-80px; animation: gfloat 9s ease-in-out infinite; }
  .nv-glow-2 { width:420px; height:420px; background:rgba(43,127,255,0.1); bottom:-100px; right:-60px; animation: gfloat 12s ease-in-out infinite reverse; }
  .nv-glow-3 { width:300px; height:300px; background:rgba(0,214,143,0.08); top:40%; left:55%; animation: gfloat 7s ease-in-out 3s infinite; }
  @keyframes gfloat { 0%,100%{transform:translate(0,0);} 50%{transform:translate(24px,-24px);} }

  .nv-pill {
    display:inline-flex; align-items:center; gap:9px;
    background: rgba(0,214,143,0.1);
    border: 1px solid rgba(0,214,143,0.25);
    border-radius:999px; padding:7px 18px;
    font-size:12.5px; color:rgba(255,255,255,0.85);
    font-weight:500; letter-spacing:0.3px;
    margin-bottom:32px;
    animation: fadeUp 0.9s ease both;
    backdrop-filter:blur(6px);
  }
  .nv-pill-live {
    width:7px; height:7px; border-radius:50%; background:#00D68F;
    box-shadow: 0 0 0 0 rgba(0,214,143,0.6);
    animation: live-pulse 1.8s ease-in-out infinite;
  }
  @keyframes live-pulse {
    0%   { box-shadow: 0 0 0 0 rgba(0,214,143,0.7); }
    70%  { box-shadow: 0 0 0 8px rgba(0,214,143,0); }
    100% { box-shadow: 0 0 0 0 rgba(0,214,143,0); }
  }

  .nv-hero-h1 {
    font-family: 'Clash Display', sans-serif;
    font-size: clamp(2.4rem, 5.5vw, 4.8rem);
    font-weight: 700;
    color: #fff;
    line-height: 1.08;
    letter-spacing: -1.5px;
    max-width: 860px;
    animation: fadeUp 0.9s ease 0.12s both;
  }
  .nv-grad-text {
    background: linear-gradient(90deg, #00D68F 0%, #2B7FFF 60%, #A78BFA 100%);
    -webkit-background-clip: text; -webkit-text-fill-color:transparent; background-clip:text;
  }

  .nv-hero-sub {
    max-width:560px; font-size:1.05rem; line-height:1.8;
    color:rgba(255,255,255,0.6); font-weight:300;
    margin:28px auto 44px;
    animation: fadeUp 0.9s ease 0.24s both;
  }

  .nv-hero-actions {
    display:flex; gap:14px; flex-wrap:wrap; justify-content:center;
    animation: fadeUp 0.9s ease 0.36s both;
  }
  .nv-btn-hero-p {
    padding:14px 34px;
    background: linear-gradient(135deg,#00D68F,#2B7FFF);
    border:none; border-radius:999px;
    color:#fff; font-family:'Clash Display',sans-serif;
    font-size:15px; font-weight:600; cursor:pointer;
    transition:all 0.3s;
    box-shadow: 0 8px 32px rgba(0,214,143,0.35);
  }
  .nv-btn-hero-p:hover { transform:translateY(-3px); box-shadow: 0 14px 40px rgba(0,214,143,0.5); }
  .nv-btn-hero-s {
    padding:14px 34px;
    background:rgba(255,255,255,0.08);
    border:1px solid rgba(255,255,255,0.2); border-radius:999px;
    color:#fff; font-family:'Clash Display',sans-serif;
    font-size:15px; font-weight:500; cursor:pointer;
    transition:all 0.3s; backdrop-filter:blur(4px);
  }
  .nv-btn-hero-s:hover { background:rgba(255,255,255,0.14); border-color:rgba(255,255,255,0.4); transform:translateY(-3px); }

  .nv-stats-row {
    display:flex; gap:52px; flex-wrap:wrap; justify-content:center;
    margin-top:72px; padding-top:48px;
    border-top:1px solid rgba(255,255,255,0.1);
    animation: fadeUp 0.9s ease 0.5s both;
  }
  .nv-stat { text-align:center; }
  .nv-stat-n {
    font-family:'Clash Display',sans-serif;
    font-size:2.4rem; font-weight:700; color:#fff;
    background: linear-gradient(90deg,#00D68F,#2B7FFF);
    -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
  }
  .nv-stat-l { font-size:11.5px; color:rgba(255,255,255,0.45); letter-spacing:1px; margin-top:4px; text-transform:uppercase; }

  .nv-scroll-indicator {
    position:absolute; bottom:36px; left:50%; transform:translateX(-50%);
    display:flex; flex-direction:column; align-items:center; gap:6px;
    color:rgba(255,255,255,0.3); font-size:11px; letter-spacing:1.5px;
  }
  .nv-chevron {
    width:20px; height:20px;
    border-right:2px solid rgba(255,255,255,0.25);
    border-bottom:2px solid rgba(255,255,255,0.25);
    transform:rotate(45deg);
    animation: bounce-down 1.6s ease-in-out infinite;
  }
  @keyframes bounce-down { 0%,100%{transform:rotate(45deg) translate(0,0);} 50%{transform:rotate(45deg) translate(4px,4px);} }

  @keyframes fadeUp { from{opacity:0;transform:translateY(28px);} to{opacity:1;transform:translateY(0);} }

  /* ── CAPABILITIES STRIP ── */
  .nv-caps {
    background: var(--surface);
    padding: 64px 40px;
    transition: background 0.45s;
  }
  .nv-caps-label {
    text-align:center; font-size:11px; letter-spacing:2.5px;
    color:var(--text-3); text-transform:uppercase; font-weight:500;
    margin-bottom:36px;
  }
  .nv-caps-grid {
    display:grid; grid-template-columns:repeat(6,1fr);
    gap:14px; max-width:1060px; margin:0 auto;
  }
  @media(max-width:900px){ .nv-caps-grid{grid-template-columns:repeat(3,1fr);} }
  @media(max-width:500px){ .nv-caps-grid{grid-template-columns:repeat(2,1fr);} }

  .nv-cap-card {
    background:var(--surface-2); border:1px solid var(--border);
    border-radius:18px; padding:26px 16px; text-align:center;
    cursor:default; transition:all 0.35s cubic-bezier(0.34,1.56,0.64,1);
    position:relative; overflow:hidden;
  }
  .nv-cap-card::after {
    content:''; position:absolute; inset:0;
    background:linear-gradient(135deg,rgba(0,214,143,0.06),rgba(43,127,255,0.06));
    opacity:0; transition:opacity 0.35s;
  }
  .nv-cap-card:hover { transform:translateY(-8px) scale(1.03); box-shadow:0 20px 48px rgba(0,0,0,0.14); border-color:rgba(0,214,143,0.25); }
  .nv-cap-card:hover::after { opacity:1; }
  .nv-cap-icon { font-size:2rem; margin-bottom:14px; display:block; transition:transform 0.35s; }
  .nv-cap-card:hover .nv-cap-icon { transform:scale(1.18) rotate(-6deg); }
  .nv-cap-title { font-family:'Clash Display',sans-serif; font-size:12.5px; font-weight:600; color:var(--text); line-height:1.4; }

  /* ── SHARED SECTION ── */
  .nv-tag {
    display:inline-block;
    background:var(--tag-bg); color:var(--tag-color);
    font-size:11.5px; letter-spacing:1.5px; text-transform:uppercase;
    font-weight:600; padding:5px 15px; border-radius:999px;
    margin-bottom:18px; transition:background 0.45s, color 0.45s;
  }
  .nv-sec-title {
    font-family:'Clash Display',sans-serif;
    font-size:clamp(1.9rem,3.6vw,3.2rem);
    font-weight:700; line-height:1.12; letter-spacing:-0.8px;
    color:var(--text); transition:color 0.45s;
  }
  .nv-sec-title .hi { color:var(--emerald-dim); }
  .nv-dark-mode .nv-sec-title .hi { color:var(--emerald); }
  .nv-sec-title .bi { color:var(--sapphire); }
  .nv-bar { width:52px; height:3px; border-radius:99px; background:linear-gradient(90deg,#00D68F,#2B7FFF); margin:18px 0 28px; }
  .nv-bar.c { margin-left:auto; margin-right:auto; }
  .nv-sec-desc { max-width:560px; font-size:0.97rem; line-height:1.85; color:var(--text-2); font-weight:300; transition:color 0.45s; }

  /* reveal */
  .rev { opacity:0; transform:translateY(36px); transition:opacity 0.75s ease, transform 0.75s ease; }
  .rev.vis { opacity:1; transform:none; }

  /* ── LIFECYCLE ── */
  .nv-life { background:var(--bg); transition:background 0.45s; }
  .nv-life-inner { max-width:1060px; margin:0 auto; padding:110px 40px; }
  .nv-life-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:22px; margin-top:56px; }
  @media(max-width:768px){ .nv-life-grid{grid-template-columns:1fr;} }

  .nv-lc {
    border-radius:22px; padding:36px 28px;
    position:relative; overflow:hidden; cursor:default;
    transition:transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s;
  }
  .nv-lc:hover { transform:translateY(-10px); box-shadow:0 28px 56px rgba(0,0,0,0.18); }

  .nv-lc.p1 { background:linear-gradient(145deg,#DAFAF1,#A8F0D8); }
  .nv-lc.p2 { background:linear-gradient(145deg,#DDEEFF,#B0CEFF); }
  .nv-lc.p3 { background:linear-gradient(145deg,#EEE8FF,#CFC8FF); }
  .dark .nv-lc.p1 { background:linear-gradient(145deg,rgba(0,90,60,0.5),rgba(0,150,100,0.25)); }
  .dark .nv-lc.p2 { background:linear-gradient(145deg,rgba(10,50,110,0.5),rgba(40,100,220,0.25)); }
  .dark .nv-lc.p3 { background:linear-gradient(145deg,rgba(50,38,120,0.5),rgba(100,80,210,0.25)); }

  .nv-lc-num {
    position:absolute; top:18px; right:20px;
    font-family:'Clash Display',sans-serif;
    font-size:5rem; font-weight:700;
    opacity:0.12; line-height:1;
    color: #000;
  }
  .dark .nv-lc-num { color:#fff; opacity:0.12; }
  .nv-lc-em { font-size:2rem; margin-bottom:18px; display:block; }
  .nv-lc-ttl { font-family:'Clash Display',sans-serif; font-size:1.2rem; font-weight:700; color:#0A0E1A; margin-bottom:14px; }
  .dark .nv-lc-ttl { color:#EDF0FF; }
  .nv-lc-ul { list-style:none; display:flex; flex-direction:column; gap:9px; }
  .nv-lc-ul li { font-size:0.88rem; color:#344060; display:flex; align-items:flex-start; gap:9px; }
  .dark .nv-lc-ul li { color:#A8B0D0; }
  .nv-lc-ul li::before { content:'→'; flex-shrink:0; margin-top:1px; }
  .nv-lc.p1 .nv-lc-ul li::before { color:#00956A; }
  .nv-lc.p2 .nv-lc-ul li::before { color:#2B7FFF; }
  .nv-lc.p3 .nv-lc-ul li::before { color:#7B5FFF; }

  /* ── WHY CHOOSE ── */
  .nv-why { background:var(--surface); transition:background 0.45s; }
  .nv-why-inner {
    max-width:1060px; margin:0 auto; padding:110px 40px;
    display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:center;
  }
  @media(max-width:900px){ .nv-why-inner{grid-template-columns:1fr; gap:48px;} }

  .nv-why-cards { display:flex; flex-direction:column; gap:14px; margin-top:24px; }
  .nv-why-card {
    display:flex; gap:18px; align-items:flex-start;
    padding:22px; background:var(--why-card);
    border-radius:16px; border:1px solid var(--border);
    transition:all 0.3s; cursor:default;
  }
  .nv-why-card:hover { transform:translateX(8px); box-shadow:0 10px 36px rgba(0,0,0,0.1); border-color:rgba(0,214,143,0.25); }
  .nv-why-ico {
    width:44px; height:44px; border-radius:12px;
    background:linear-gradient(135deg,#00D68F,#2B7FFF);
    display:flex; align-items:center; justify-content:center;
    flex-shrink:0; font-size:20px;
  }
  .nv-why-h { font-family:'Clash Display',sans-serif; font-size:0.95rem; font-weight:600; color:var(--text); margin-bottom:5px; }
  .nv-why-p { font-size:0.85rem; line-height:1.7; color:var(--text-3); font-weight:300; }

  .nv-visual-wrap { position:relative; }
  .nv-visual-box {
    background:linear-gradient(145deg,#0A1F3C,#081A14);
    border-radius:24px; padding:40px 32px;
    box-shadow:0 40px 80px rgba(0,0,0,0.2);
    border:1px solid rgba(255,255,255,0.07);
  }
  .dark .nv-visual-box {
    background:linear-gradient(145deg,var(--surface-2),#0A1020);
  }
  .nv-visual-title { font-family:'Clash Display',sans-serif; font-size:1.1rem; font-weight:600; color:#fff; margin-bottom:24px; }
  .nv-visual-stat {
    display:flex; align-items:center; gap:14px;
    padding:14px 0; border-bottom:1px solid rgba(255,255,255,0.07);
  }
  .nv-visual-stat:last-child { border:none; }
  .nv-vs-bar-wrap { flex:1; height:8px; background:rgba(255,255,255,0.08); border-radius:99px; overflow:hidden; }
  .nv-vs-bar { height:100%; border-radius:99px; }
  .nv-vs-label { font-size:12px; color:rgba(255,255,255,0.5); width:120px; }
  .nv-vs-pct { font-family:'Clash Display',sans-serif; font-size:13px; color:#fff; font-weight:600; width:40px; text-align:right; }

  .nv-v-badge {
    position:absolute; bottom:-20px; left:-20px;
    background:var(--badge-bg); border-radius:16px;
    padding:14px 18px; box-shadow:0 8px 32px rgba(0,0,0,0.18);
    display:flex; align-items:center; gap:12px;
    border:1px solid var(--border);
    transition:background 0.45s;
  }
  .nv-vb-num { font-family:'Clash Display',sans-serif; font-size:1.6rem; font-weight:700; color:#00D68F; }
  .nv-vb-txt { font-size:11.5px; color:var(--text-3); line-height:1.5; }

  /* ── QUESTION TYPES ── */
  .nv-qt { background:var(--bg); transition:background 0.45s; }
  .nv-qt-inner { max-width:1060px; margin:0 auto; padding:110px 40px; }
  .nv-qt-grid { display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:center; margin-top:56px; }
  @media(max-width:768px){ .nv-qt-grid{grid-template-columns:1fr;} }

  .nv-qt-list { display:flex; flex-direction:column; gap:10px; }
  .nv-qt-item {
    display:flex; align-items:center; gap:13px;
    padding:13px 18px; border-radius:13px;
    background:var(--qtype-bg); border:1px solid var(--border);
    transition:all 0.28s; cursor:default;
  }
  .nv-qt-item:hover { background:var(--qtype-hover); border-color:rgba(0,214,143,0.3); transform:translateX(5px); }
  .nv-qt-dot { width:8px; height:8px; border-radius:50%; background:linear-gradient(135deg,#00D68F,#2B7FFF); flex-shrink:0; }
  .nv-qt-item span { font-size:0.88rem; color:var(--text); font-weight:400; }

  .nv-qt-visual {
    background:linear-gradient(145deg,#0A1F3C,#060E1A);
    border-radius:22px; padding:36px 28px;
    border:1px solid rgba(255,255,255,0.07);
    box-shadow:0 24px 56px rgba(0,0,0,0.2);
  }
  .dark .nv-qt-visual { background:var(--surface-2); }
  .nv-qt-vis-title { font-family:'Clash Display',sans-serif; font-size:0.95rem; font-weight:600; color:#fff; margin-bottom:20px; }
  .nv-qt-mock { display:flex; flex-direction:column; gap:12px; }
  .nv-mock-q { font-size:13px; color:rgba(255,255,255,0.7); margin-bottom:8px; }
  .nv-mock-opt {
    display:flex; align-items:center; gap:10px;
    padding:10px 14px; border-radius:10px;
    background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.07);
    font-size:12.5px; color:rgba(255,255,255,0.55); cursor:default; transition:0.2s;
  }
  .nv-mock-opt.sel { background:rgba(0,214,143,0.15); border-color:rgba(0,214,143,0.4); color:#00D68F; }
  .nv-mock-radio { width:14px; height:14px; border-radius:50%; border:2px solid currentColor; flex-shrink:0; display:flex; align-items:center; justify-content:center; }
  .nv-mock-opt.sel .nv-mock-radio::after { content:''; width:6px; height:6px; border-radius:50%; background:#00D68F; display:block; }

  /* ── BENEFITS ── */
  .nv-ben { background:linear-gradient(150deg,#050F20,#030C18,#060E14); padding:110px 40px; position:relative; overflow:hidden; }
  .nv-ben::before {
    content:''; position:absolute; inset:0;
    background-image:
      linear-gradient(rgba(0,214,143,0.03) 1px,transparent 1px),
      linear-gradient(90deg,rgba(0,214,143,0.03) 1px,transparent 1px);
    background-size:60px 60px; pointer-events:none;
  }
  .nv-ben-inner { max-width:1060px; margin:0 auto; position:relative; }
  .nv-ben-inner .nv-tag { background:rgba(0,214,143,0.12); color:#00D68F; }
  .nv-ben-inner .nv-sec-title { color:#fff; }
  .nv-ben-inner .nv-bar { background:linear-gradient(90deg,#00D68F,#2B7FFF); }
  .nv-ben-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:18px; margin-top:56px; }
  @media(max-width:900px){ .nv-ben-grid{grid-template-columns:repeat(2,1fr);} }
  @media(max-width:600px){ .nv-ben-grid{grid-template-columns:1fr;} }

  .nv-ben-card {
    background:rgba(255,255,255,0.04); backdrop-filter:blur(8px);
    border:1px solid rgba(255,255,255,0.08); border-radius:20px;
    padding:30px 26px; transition:0.4s; cursor:default;
  }
  .nv-ben-card:hover { background:rgba(255,255,255,0.08); transform:translateY(-8px); border-color:rgba(0,214,143,0.2); }
  .nv-ben-icon { font-size:26px; margin-bottom:14px; }
  .nv-ben-title { font-family:'Clash Display',sans-serif; font-size:1rem; font-weight:600; color:#fff; margin-bottom:10px; }
  .nv-ben-desc { font-size:0.84rem; line-height:1.75; color:rgba(255,255,255,0.55); font-weight:300; }

  /* ── CTA ── */
  .nv-cta { padding:120px 40px; background:var(--bg); text-align:center; transition:background 0.45s; }
  .nv-cta-inner { max-width:680px; margin:0 auto; }
  .nv-cta-desc { font-size:0.97rem; line-height:1.85; color:var(--text-2); font-weight:300; margin-bottom:44px; }
  .nv-cta-btns { display:flex; gap:14px; justify-content:center; flex-wrap:wrap; }
  .nv-cta-p {
    padding:15px 38px;
    background:linear-gradient(135deg,#00D68F,#2B7FFF);
    color:#fff; border:none; border-radius:999px;
    font-family:'Clash Display',sans-serif; font-size:15px; font-weight:600;
    cursor:pointer; transition:all 0.3s;
    box-shadow:0 8px 30px rgba(0,214,143,0.3);
  }
  .nv-cta-p:hover { transform:translateY(-4px); box-shadow:0 16px 40px rgba(0,214,143,0.45); }
  .nv-cta-s {
    padding:15px 38px;
    background:var(--cta-s-bg);
    color:var(--cta-s-color);
    border:1.5px solid rgba(0,214,143,0.3); border-radius:999px;
    font-family:'Clash Display',sans-serif; font-size:15px; font-weight:500;
    cursor:pointer; transition:all 0.3s;
  }
  .nv-cta-s:hover { border-color:var(--emerald); transform:translateY(-4px); }

  /* ── TICKER ── */
  .nv-ticker-wrap { background:#020A1A; overflow:hidden; padding:15px 0; border-top:1px solid rgba(0,214,143,0.08); border-bottom:1px solid rgba(0,214,143,0.08); }
  .dark .nv-ticker-wrap { background:#020407; }
  .nv-ticker { display:flex; animation:ticker-scroll 28s linear infinite; white-space:nowrap; }
  .nv-ticker-item {
    display:flex; align-items:center; gap:10px;
    padding:0 30px; flex-shrink:0;
    font-family:'Clash Display',sans-serif; font-size:13.5px; font-weight:500;
    color:rgba(255,255,255,0.5);
  }
  .nv-ticker-star { color:#00D68F; font-size:10px; }
  @keyframes ticker-scroll { from{transform:translateX(0);} to{transform:translateX(-50%);} }

  /* ── FOOTER ── */
  .nv-foot { background:var(--footer-bg); padding:60px 40px 40px; transition:background 0.45s; }
  .nv-foot-inner { max-width:1060px; margin:0 auto; display:grid; grid-template-columns:2fr 1fr; gap:60px; }
  @media(max-width:700px){ .nv-foot-inner{grid-template-columns:1fr; gap:40px;} }
  .nv-foot-brand { font-family:'Clash Display',sans-serif; font-size:1.5rem; font-weight:700; color:#fff; margin-bottom:14px; display:flex; align-items:center; gap:8px; }
  .nv-foot-desc { font-size:0.84rem; line-height:1.85; color:rgba(255,255,255,0.4); max-width:380px; font-weight:300; }
  .nv-foot-copy { font-size:0.78rem; color:rgba(255,255,255,0.25); margin-top:22px; }
  .nv-foot-h { font-family:'Clash Display',sans-serif; font-size:0.95rem; font-weight:600; color:#fff; margin-bottom:14px; }
  .nv-foot-a { display:block; font-size:0.84rem; color:rgba(255,255,255,0.5); text-decoration:none; margin-bottom:8px; transition:0.2s; }
  .nv-foot-a:hover { color:#00D68F; }
  .nv-socials { display:flex; gap:10px; margin-top:18px; }
  .nv-soc {
    width:36px; height:36px; border-radius:10px;
    background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.08);
    display:flex; align-items:center; justify-content:center;
    cursor:pointer; font-size:14px; transition:0.25s;
  }
  .nv-soc:hover { background:rgba(0,214,143,0.15); border-color:rgba(0,214,143,0.3); }
  .nv-foot-div { height:1px; background:rgba(255,255,255,0.06); max-width:1060px; margin:32px auto 0; }
`;

/* ─── DATA ─── */
const caps = [
  { icon:'☁️', title:'Cloud Based System' },
  { icon:'⚡', title:'Scalable Infrastructure' },
  { icon:'🛂', title:'Auto Authorization' },
  { icon:'🎭', title:'Facial Detection' },
  { icon:'🎙️', title:'Audio Analytics' },
  { icon:'🔐', title:'Secure Browser' },
];

const lifecycle = [
  { cls:'p1', num:'01', icon:'📋', title:'Pre-Exam',
    items:['Create and schedule exams','Set up anti-cheating tools','Configure evaluation rules'] },
  { cls:'p2', num:'02', icon:'🖥️', title:'During Exam',
    items:['Conduct exams digitally','Proctor using AI technology','Generate credibility reports'] },
  { cls:'p3', num:'03', icon:'📊', title:'Post-Exam',
    items:['Assign sheets to evaluators','Monitor evaluation process','Declare results online'] },
];

const whyCards = [
  { icon:'🤖', h:'Eliminate Physical Proctors', p:'AI face recognition and digital IDs run tests in fully secure environments without a human invigilator.' },
  { icon:'📊', h:'Advanced Reporting', p:'Scorecards, computational analysis, and detailed candidate analytics — delivered instantly.' },
  { icon:'🔒', h:'Secure Data Architecture', p:'End-to-end encryption and secure cloud hosting ensure your intellectual property is never compromised.' },
  { icon:'🎛️', h:'Flexible Exam Modes', p:'Remote, center-based, or hybrid — adapt delivery to any institution or scenario.' },
];

const visualStats = [
  { label:'Detection Accuracy', pct:98, color:'#00D68F', width:'98%' },
  { label:'Uptime SLA', pct:99.9, color:'#2B7FFF', width:'99.9%' },
  { label:'Avg Setup Time', pct:72, color:'#A78BFA', width:'72%', note:'Faster' },
  { label:'Institutions Trust', pct:85, color:'#00D68F', width:'85%' },
];

const qtypes = [
  'Multiple Choice Questions','Short Answer Questions','Fill in the Blank',
  'Long Answer Questions','Diagram Based Questions','Audio / Video Questions',
  'Draw Diagram Responses','Upload File Responses','Coding Questions',
];

const benefits = [
  { icon:'🛡️', t:'Cheating Prevention via AI', d:'Face detection, browser tracking, and suspicious movement alerts maintain exam integrity automatically.' },
  { icon:'📹', t:'Live & Recorded Proctoring', d:'Choose real-time invigilation or reviewable recordings to match your exam needs.' },
  { icon:'🔐', t:'Multi-Layer Security', d:'Disables screen sharing, blocks unauthorized tabs, and detects device switching instantly.' },
  { icon:'🔔', t:'Real-Time Alerts', d:'Proctors get instant flags for eye movement anomalies, background noise, or multiple faces.' },
  { icon:'🌐', t:'Device & Location Freedom', d:'Candidates appear from anywhere on laptop or desktop with full security enabled.' },
  { icon:'📈', t:'Detailed Analytics', d:'Comprehensive insights into every exam session and candidate performance metric.' },
];

const ticker = ['Secure Online Exams','AI-Powered Proctoring','Real-Time Monitoring','Auto Grading','Detailed Analytics','Cloud Platform','Zero Cheating'];

export default function Welcome() {
  const [dark, setDark] = useState(false);
  const revRefs = useRef([]);
  let ri = 0;
  const r = el => { revRefs.current[ri++] = el; };

  // inject styles
  useEffect(() => {
    const el = document.createElement('style');
    el.id = 'nv-s';
    el.textContent = styles;
    document.head.appendChild(el);
    return () => document.getElementById('nv-s')?.remove();
  }, []);

  // scroll reveal
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const d = Number(e.target.dataset.d || 0);
          setTimeout(() => e.target.classList.add('vis'), d);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    revRefs.current.forEach((el, i) => {
      if (el) { el.dataset.d = (i % 5) * 80; obs.observe(el); }
    });
    return () => obs.disconnect();
  }, []);

  const navigate = (path) => { window.location.href = path; };

  return (
    <div className={dark ? 'dark' : ''}>
      {/* ── NAVBAR ── */}
      <nav className="nv-nav">
        <div className="nv-logo">
          <div className="nv-logo-dot" />
          NOVA<em>EXAM</em>
        </div>
        <button
          className="nv-toggle"
          onClick={() => setDark(d => !d)}
          aria-label="Toggle theme"
        >
          <div className={`nv-track ${dark ? 'on' : ''}`}>
            <div className="nv-thumb">{dark ? '🌙' : '☀️'}</div>
          </div>
          <span className="nv-toggle-label">{dark ? 'Dark Mode' : 'Light Mode'}</span>
        </button>
      </nav>

      {/* ── HERO ── */}
      <section className="nv-hero">
        <div className="nv-glow nv-glow-1" />
        <div className="nv-glow nv-glow-2" />
        <div className="nv-glow nv-glow-3" />

        <div className="nv-pill">
          <span className="nv-pill-live" />
          AI-Powered Remote Proctoring Platform
        </div>

        <h1 className="nv-hero-h1">
          Smart Exams with<br />
          <span className="nv-grad-text">AI-Based Monitoring</span>
        </h1>

        <p className="nv-hero-sub">
          NovaExam simplifies secure online testing — from candidate registration
          and scheduling to advanced AI proctoring and real-time monitoring.
          Integrity meets intelligence.
        </p>

        <div className="nv-hero-actions">
          <button className="nv-btn-hero-p" onClick={() => navigate('/Signup')}>
            Get Started Free →
          </button>
          <button className="nv-btn-hero-s">
            Schedule a Demo
          </button>
        </div>

        <div className="nv-stats-row">
          {[
            { n:'50K+', l:'Exams Conducted' },
            { n:'99.9%', l:'Uptime Guarantee' },
            { n:'200+', l:'Institutions' },
            { n:'AI', l:'Powered Proctoring' },
          ].map(s => (
            <div className="nv-stat" key={s.l}>
              <div className="nv-stat-n">{s.n}</div>
              <div className="nv-stat-l">{s.l}</div>
            </div>
          ))}
        </div>

        <div className="nv-scroll-indicator">
          SCROLL
          <div className="nv-chevron" />
        </div>
      </section>

      {/* ── CAPABILITIES ── */}
      <div className="nv-caps">
        <div className="nv-caps-label">Platform Capabilities</div>
        <div className="nv-caps-grid">
          {caps.map(c => (
            <div className="nv-cap-card rev" ref={r} key={c.title}>
              <span className="nv-cap-icon">{c.icon}</span>
              <div className="nv-cap-title">{c.title}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── LIFECYCLE ── */}
      <div className="nv-life">
        <div className="nv-life-inner">
          <div className="rev" ref={r}>
            <div className="nv-tag">Complete Lifecycle</div>
            <h2 className="nv-sec-title">
              Conduct, Proctor &amp; Evaluate<br />
              <span className="hi">All on One Platform</span>
            </h2>
            <div className="nv-bar" />
            <p className="nv-sec-desc">
              Deliver a smooth exam experience from registration to result —
              every step handled intelligently by NovaExam.
            </p>
          </div>
          <div className="nv-life-grid">
            {lifecycle.map(c => (
              <div className={`nv-lc ${c.cls} rev`} ref={r} key={c.cls}>
                <div className="nv-lc-num">{c.num}</div>
                <span className="nv-lc-em">{c.icon}</span>
                <div className="nv-lc-ttl">{c.title}</div>
                <ul className="nv-lc-ul">
                  {c.items.map(i => <li key={i}>{i}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── WHY CHOOSE ── */}
      <div className="nv-why">
        <div className="nv-why-inner">
          <div>
            <div className="rev" ref={r}>
              <div className="nv-tag">Why NovaExam</div>
              <h2 className="nv-sec-title">
                The smarter way to<br />
                <span className="bi">run every exam</span>
              </h2>
              <div className="nv-bar" />
            </div>
            <div className="nv-why-cards">
              {whyCards.map(c => (
                <div className="nv-why-card rev" ref={r} key={c.h}>
                  <div className="nv-why-ico">{c.icon}</div>
                  <div>
                    <div className="nv-why-h">{c.h}</div>
                    <p className="nv-why-p">{c.p}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="nv-visual-wrap rev" ref={r}>
            <div className="nv-visual-box">
              <div className="nv-visual-title">Platform Performance</div>
              {visualStats.map(s => (
                <div className="nv-visual-stat" key={s.label}>
                  <div className="nv-vs-label" style={{color:'rgba(255,255,255,0.45)',fontSize:'12px'}}>{s.label}</div>
                  <div className="nv-vs-bar-wrap">
                    <div className="nv-vs-bar" style={{width:s.width, background:s.color}} />
                  </div>
                  <div className="nv-vs-pct">{s.pct}{s.pct < 10 ? '' : s.label==='Avg Setup Time' ? '% faster' : '%'}</div>
                </div>
              ))}
            </div>
            <div className="nv-v-badge">
              <div className="nv-vb-num">4.9★</div>
              <div className="nv-vb-txt">Trusted by<br />institutions</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── QUESTION TYPES ── */}
      <div className="nv-qt">
        <div className="nv-qt-inner">
          <div className="rev" ref={r} style={{textAlign:'center'}}>
            <div className="nv-tag">Question Types</div>
            <h2 className="nv-sec-title">
              Test students for<br />
              <span className="hi">every kind of knowledge</span>
            </h2>
            <div className="nv-bar c" />
          </div>
          <div className="nv-qt-grid">
            <div className="nv-qt-list">
              {qtypes.map(q => (
                <div className="nv-qt-item rev" ref={r} key={q}>
                  <div className="nv-qt-dot" />
                  <span>{q}</span>
                </div>
              ))}
            </div>
            <div className="rev" ref={r}>
              <div className="nv-qt-visual">
                <div className="nv-qt-vis-title">Sample MCQ Question</div>
                <div className="nv-qt-mock">
                  <div className="nv-mock-q">Which protocol secures data in transit?</div>
                  {['HTTP','TLS/SSL','FTP','SMTP'].map((o, i) => (
                    <div className={`nv-mock-opt ${i===1?'sel':''}`} key={o}>
                      <div className="nv-mock-radio" />
                      {o}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── BENEFITS ── */}
      <div className="nv-ben">
        <div className="nv-ben-inner">
          <div className="rev" ref={r}>
            <div className="nv-tag">Remote Proctoring</div>
            <h2 className="nv-sec-title">Benefits of NovaExam's<br />Proctoring System</h2>
            <div className="nv-bar" />
          </div>
          <div className="nv-ben-grid">
            {benefits.map(b => (
              <div className="nv-ben-card rev" ref={r} key={b.t}>
                <div className="nv-ben-icon">{b.icon}</div>
                <div className="nv-ben-title">{b.t}</div>
                <div className="nv-ben-desc">{b.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="nv-cta">
        <div className="nv-cta-inner rev" ref={r}>
          <div className="nv-tag">Get Started Today</div>
          <h2 className="nv-sec-title">
            Make exams easier for<br />
            <span className="hi">you and your candidates</span>
          </h2>
          <div className="nv-bar c" />
          <p className="nv-cta-desc">
            NovaExam's comprehensive platform streamlines scheduling, secure
            registration, and robust remote proctoring — so you can focus on
            education, not logistics.
          </p>
          <div className="nv-cta-btns">
            <button className="nv-cta-p" onClick={() => navigate('/Signup')}>🎓 Try it Free</button>
            <button className="nv-cta-s">Schedule Demo</button>
          </div>
        </div>
      </div>

      {/* ── TICKER ── */}
      <div className="nv-ticker-wrap">
        <div className="nv-ticker">
          {[...ticker,...ticker].map((t,i) => (
            <div className="nv-ticker-item" key={i}>
              <span className="nv-ticker-star">★</span>{t}
            </div>
          ))}
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="nv-foot">
        <div className="nv-foot-inner">
          <div>
            <div className="nv-foot-brand">
              <div style={{width:10,height:10,borderRadius:'50%',background:'linear-gradient(135deg,#00D68F,#2B7FFF)'}} />
              NOVA EXAM
            </div>
            <p className="nv-foot-desc">
              A modern AI-powered exam platform built to simplify and secure
              online testing from registration to results. Where technology meets integrity.
            </p>
            <p className="nv-foot-copy">© 2025 NovaExam. All Rights Reserved.</p>
          </div>
          <div>
            <div className="nv-foot-h">Contact Us</div>
            <a className="nv-foot-a" href="mailto:am6030920@gmail.com">am6030920@gmail.com</a>
            <div className="nv-socials">
              {['💼','📘','📸','🐦'].map((s,i) => (
                <div className="nv-soc" key={i}>{s}</div>
              ))}
            </div>
          </div>
        </div>
        <div className="nv-foot-div" />
      </footer>
    </div>
  );
}