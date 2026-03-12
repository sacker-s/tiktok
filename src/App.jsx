import React, { useMemo, useState } from "react";
import {
  Search,
  Home,
  Compass,
  Users,
  MessageCircle,
  Bell,
  Heart,
  Bookmark,
  Share2,
  Music4,
  Plus,
  Play,
  Volume2,
  MoreHorizontal,
  Sparkles,
  ShoppingBag,
  BadgeCheck,
  ArrowLeft,
  ExternalLink,
} from "lucide-react";
import { motion } from "framer-motion";

/**
 * ------------------------------------------------------
 * CUSTOMER AD CONFIG
 * Swap these values before each demo/customer scenario.
 * ------------------------------------------------------
 */
const CUSTOMER_AD = {
  brandHandle: "@chatgpt",
  brandName: "ChatGPT",
  verified: true,
  category: "Sponsored",
  imageUrl:
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
  videoCaption:
    "Write faster, think clearer, and turn rough ideas into polished work in minutes. Brainstorm, draft, summarise, and create — all in one place.",
  music: "original sound - ChatGPT",
  likes: "129.4K",
  comments: "4,821",
  saves: "18.6K",
  shares: "9,104",
  cardTitle: "Get more done with ChatGPT",
  cardDescription:
    "Brainstorm ideas, draft messages, summarise notes, and build faster from one simple prompt.",
  ctaLabel: "Learn more",
  ctaUrl: "https://chatgpt.com",
  landingTitle: "ChatGPT for work",
  landingDescription:
    "Turn early ideas into polished outputs faster with help for drafting, summarising, planning, and creative iteration.",
  landingHeroImage:
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80",
  landingHighlights: [
    "Draft emails, briefs, and presentations faster",
    "Summarise long notes and meetings instantly",
    "Brainstorm campaign ideas and creative directions",
    "Adapt messaging for different audiences in seconds",
  ],
};

const FEED_DATA = [
  {
    id: 1,
    creator: "@urbanthreadstudio",
    name: "Urban Thread Studio",
    verified: true,
    category: "Fashion",
    caption:
      "Spring drop is live. Clean cuts, lighter layers, everyday essentials. #StyleTok #SpringEdit",
    music: "original sound - Urban Thread Studio",
    likes: "84.2K",
    comments: "1,128",
    saves: "9,421",
    shares: "5,290",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80",
    cta: "Shop now",
    sponsored: false,
  },
  {
    id: 2,
    creator: "@movewell.lab",
    name: "MoveWell Lab",
    verified: true,
    category: "Wellness",
    caption:
      "A 5-minute desk reset that actually feels good. Save this for your 3pm slump. #Wellness #DeskReset",
    music: "sound design - MoveWell Lab",
    likes: "46.7K",
    comments: "692",
    saves: "11.2K",
    shares: "2,804",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80",
    cta: "Learn more",
    sponsored: false,
  },
  {
    id: 3,
    creator: CUSTOMER_AD.brandHandle,
    name: CUSTOMER_AD.brandName,
    verified: CUSTOMER_AD.verified,
    category: CUSTOMER_AD.category,
    caption: CUSTOMER_AD.videoCaption,
    music: CUSTOMER_AD.music,
    likes: CUSTOMER_AD.likes,
    comments: CUSTOMER_AD.comments,
    saves: CUSTOMER_AD.saves,
    shares: CUSTOMER_AD.shares,
    image: CUSTOMER_AD.imageUrl,
    cta: CUSTOMER_AD.ctaLabel,
    sponsored: true,
  },
  {
    id: 4,
    creator: "@homelab.design",
    name: "HomeLab Design",
    verified: false,
    category: "Home",
    caption:
      "Tiny apartment, bigger feeling. 3 layout tricks that make a room instantly calmer. #HomeTok",
    music: "minimal ambient - HomeLab Design",
    likes: "21.1K",
    comments: "304",
    saves: "6,850",
    shares: "780",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    cta: "View tips",
    sponsored: false,
  },
];

const TRENDING_TOPICS = [
  "#springstyle",
  "#deskroutine",
  "#productivitytok",
  "#creatorpicks",
  "#soundon",
];

const FOLLOWING = [
  {
    handle: "@fitframe",
    name: "FitFrame",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
  },
  {
    handle: "@dailyhaus",
    name: "Daily Haus",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
  },
  {
    handle: "@colorpilot",
    name: "Color Pilot",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
  },
];

const GLOBAL_CSS = `
  * { box-sizing: border-box; }
  html, body, #root { margin: 0; min-height: 100%; background: #000; }
  body { font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; color: #fff; }
  a { color: inherit; text-decoration: none; }
  button, input { font: inherit; }

  .app-shell {
    min-height: 100vh;
    background: #000;
    color: #fff;
  }

  .page-grid {
    max-width: 1600px;
    margin: 0 auto;
    min-height: 100vh;
    display: grid;
    grid-template-columns: 280px minmax(0, 1fr) 320px;
    gap: 24px;
    padding: 24px;
  }

  .column-stack { display: flex; flex-direction: column; gap: 16px; }

  .panel {
    background: #0f0f10;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 28px;
    box-shadow: 0 14px 40px rgba(0,0,0,0.35);
  }

  .panel-padding { padding: 20px; }
  .feed-stack { display: flex; flex-direction: column; gap: 20px; }

  .muted { color: #9b9ba1; }
  .small { font-size: 12px; }
  .medium { font-size: 14px; }
  .title { font-size: 30px; font-weight: 700; letter-spacing: -0.02em; }
  .section-title { font-size: 15px; font-weight: 700; }

  .logo-row { display: flex; align-items: center; gap: 12px; }
  .logo-text { font-size: 28px; font-weight: 700; letter-spacing: -0.03em; }
  .relative { position: relative; }

  .nav-list { display: flex; flex-direction: column; gap: 8px; }
  .sidebar-btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 14px 16px;
    border-radius: 18px;
    border: 1px solid rgba(255,255,255,0.08);
    background: rgba(255,255,255,0.04);
    color: #e8e8ea;
    cursor: pointer;
    transition: 0.2s ease;
  }
  .sidebar-btn:hover { background: rgba(255,255,255,0.08); }
  .sidebar-btn.active {
    background: #fff;
    color: #111;
    border-color: #fff;
  }
  .sidebar-left { display: flex; align-items: center; gap: 12px; font-weight: 600; }
  .badge {
    font-size: 12px;
    padding: 2px 8px;
    border-radius: 999px;
    background: rgba(254,44,85,0.15);
    color: #ff7d98;
  }
  .badge.active { background: #111; color: #fff; }

  .primary-btn,
  .secondary-btn,
  .ghost-btn,
  .icon-btn,
  .tab-btn,
  .tag-btn {
    border: 0;
    cursor: pointer;
    transition: 0.2s ease;
  }

  .primary-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 12px 18px;
    border-radius: 999px;
    background: #fe2c55;
    color: #fff;
    font-weight: 600;
  }
  .primary-btn:hover { background: #e3264c; }

  .secondary-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 12px 18px;
    border-radius: 999px;
    background: #fff;
    color: #111;
    font-weight: 600;
  }
  .secondary-btn:hover { background: #e8e8ea; }

  .ghost-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 12px 18px;
    border-radius: 999px;
    background: transparent;
    color: #fff;
    border: 1px solid rgba(255,255,255,0.12);
  }
  .ghost-btn:hover { background: rgba(255,255,255,0.08); }

  .icon-btn {
    width: 40px;
    height: 40px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 999px;
    background: rgba(0,0,0,0.45);
    color: #fff;
    border: 1px solid rgba(255,255,255,0.1);
  }
  .icon-btn:hover { background: rgba(0,0,0,0.65); }

  .search-wrap {
    position: relative;
    min-width: 280px;
  }
  .search-input {
    width: 100%;
    height: 44px;
    padding: 0 16px 0 40px;
    border-radius: 999px;
    border: 1px solid rgba(255,255,255,0.1);
    background: rgba(255,255,255,0.05);
    color: #fff;
    outline: none;
  }
  .search-input::placeholder { color: #6e6e74; }
  .search-icon {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: #8e8e93;
    pointer-events: none;
  }

  .tabs {
    display: inline-flex;
    gap: 6px;
    padding: 4px;
    border-radius: 999px;
    border: 1px solid rgba(255,255,255,0.1);
    background: rgba(255,255,255,0.05);
  }
  .tab-btn {
    padding: 10px 16px;
    border-radius: 999px;
    color: #d7d7dc;
    background: transparent;
  }
  .tab-btn.active {
    background: #fff;
    color: #111;
    font-weight: 600;
  }

  .tag-row { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px; }
  .tag-btn {
    padding: 8px 12px;
    border-radius: 999px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.08);
    color: #e8e8ea;
  }
  .tag-btn:hover { background: rgba(255,255,255,0.1); }

  .feed-card {
    overflow: hidden;
    background: #0f0f10;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 28px;
    box-shadow: 0 18px 50px rgba(0,0,0,0.4);
  }
  .feed-card-grid {
    display: grid;
    grid-template-columns: minmax(0, 1.08fr) 400px;
  }
  .media-pane {
    position: relative;
    min-height: 600px;
    background: #000;
  }
  .media-img,
  .landing-img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .media-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.92), rgba(0,0,0,0.2), rgba(0,0,0,0.12));
  }
  .top-pills,
  .bottom-pills {
    position: absolute;
    left: 20px;
    right: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: center;
  }
  .top-pills { top: 20px; right: auto; }
  .bottom-pills { bottom: 20px; }
  .pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border-radius: 999px;
    border: 1px solid rgba(255,255,255,0.1);
    background: rgba(0,0,0,0.55);
    color: #fff;
    backdrop-filter: blur(8px);
    font-size: 13px;
  }
  .pill.warn {
    border-color: rgba(255,204,128,0.25);
    background: rgba(255,204,128,0.12);
    color: #ffd59a;
  }
  .top-right-action {
    position: absolute;
    top: 20px;
    right: 20px;
  }

  .content-pane { display: flex; flex-direction: column; background: #0f0f10; }
  .content-header {
    padding: 20px;
    border-bottom: 1px solid rgba(255,255,255,0.08);
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
  }
  .profile-row { display: flex; gap: 12px; }
  .avatar {
    width: 48px;
    height: 48px;
    border-radius: 999px;
    border: 1px solid rgba(255,255,255,0.1);
    object-fit: cover;
    background: #1d1d20;
  }
  .content-body {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    flex: 1;
  }
  .caption {
    font-size: 15px;
    line-height: 1.7;
    color: #f5f5f7;
  }
  .subcard {
    border-radius: 24px;
    border: 1px solid rgba(255,255,255,0.08);
    background: rgba(255,255,255,0.05);
    padding: 16px;
  }
  .sponsored-card {
    border-color: rgba(254,44,85,0.18);
    background: linear-gradient(135deg, rgba(254,44,85,0.12), rgba(18,18,22,1), rgba(0,212,255,0.08));
  }
  .upper-label {
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #8f8f95;
  }
  .sponsored-label {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: #ff8eaa;
    font-size: 14px;
  }
  .subcard-title { margin-top: 8px; font-size: 24px; font-weight: 700; letter-spacing: -0.02em; }
  .subcard-text { margin-top: 8px; color: #d2d2d7; line-height: 1.65; font-size: 14px; }
  .button-row { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 16px; }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
  }
  .stat-box {
    border-radius: 18px;
    background: rgba(0,0,0,0.38);
    padding: 14px;
  }
  .stat-value { margin-top: 4px; font-size: 22px; font-weight: 700; }

  .action-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
    margin-top: 12px;
  }
  .action-btn {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 14px;
    border: 0;
    border-radius: 18px;
    background: rgba(0,0,0,0.38);
    color: #fff;
    cursor: pointer;
    text-align: left;
  }
  .action-btn:hover { background: rgba(0,0,0,0.56); }

  .suggested-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }
  .suggested-left {
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 0;
  }
  .truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

  .live-panel {
    background: linear-gradient(135deg, rgba(0,212,255,0.1), #0f0f10, rgba(254,44,85,0.1));
  }

  .landing-grid {
    display: grid;
    grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
  }
  .landing-image-pane {
    position: relative;
    min-height: 540px;
  }
  .landing-image-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.25), rgba(0,0,0,0));
  }
  .landing-copy {
    padding: 32px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .landing-chip {
    width: fit-content;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    border-radius: 999px;
    border: 1px solid rgba(254,44,85,0.18);
    background: rgba(254,44,85,0.12);
    color: #ff8eaa;
    padding: 8px 12px;
    font-size: 12px;
  }
  .landing-title { margin-top: 16px; font-size: 42px; font-weight: 700; letter-spacing: -0.03em; }
  .landing-text { margin-top: 16px; color: #d2d2d7; line-height: 1.75; }
  .highlight-list { display: grid; gap: 12px; margin-top: 24px; }
  .highlight-item {
    border-radius: 18px;
    border: 1px solid rgba(255,255,255,0.08);
    background: rgba(255,255,255,0.05);
    padding: 16px;
    color: #ececef;
    font-size: 14px;
  }

  .flex-between { display: flex; align-items: center; justify-content: space-between; gap: 16px; }
  .header-row { display: flex; flex-direction: column; gap: 16px; }
  .header-controls { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
  .page-header { padding: 20px; }

  .empty-state { padding: 40px; text-align: center; }

  @media (max-width: 1280px) {
    .page-grid {
      grid-template-columns: 250px minmax(0, 1fr);
    }
    .right-rail { display: none; }
    .feed-card-grid { grid-template-columns: minmax(0, 1fr); }
    .landing-grid { grid-template-columns: 1fr; }
  }

  @media (max-width: 860px) {
    .page-grid {
      grid-template-columns: 1fr;
      padding: 16px;
      gap: 16px;
    }
    .left-rail { order: 2; }
    .main-column { order: 1; }
    .feed-card-grid { grid-template-columns: 1fr; }
    .media-pane { min-height: 440px; }
    .search-wrap { min-width: 100%; }
    .header-controls { flex-direction: column; align-items: stretch; }
    .tabs { width: 100%; justify-content: space-between; }
    .landing-copy { padding: 20px; }
    .landing-title { font-size: 32px; }
  }
`;

function StyleTag() {
  return <style>{GLOBAL_CSS}</style>;
}

function getAvatarFallback(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function Avatar({ src, name, size = 48 }) {
  const [imgError, setImgError] = useState(false);
  const fallback = getAvatarFallback(name);

  if (imgError || !src) {
    return (
      <div
        className="avatar"
        style={{
          width: size,
          height: size,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: size > 40 ? 14 : 12,
          fontWeight: 700,
        }}
      >
        {fallback}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      className="avatar"
      style={{ width: size, height: size }}
      onError={() => setImgError(true)}
    />
  );
}

function Panel({ children, className = "", padding = true }) {
  return <div className={`panel ${className}`.trim()}>{padding ? <div className="panel-padding">{children}</div> : children}</div>;
}

function Button({ children, variant = "primary", onClick, href, target, rel, className = "", iconOnly = false, type = "button" }) {
  const classes = {
    primary: "primary-btn",
    secondary: "secondary-btn",
    ghost: "ghost-btn",
    icon: "icon-btn",
  };

  const combined = `${classes[variant]} ${className}`.trim();

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={combined} style={iconOnly ? { padding: 0 } : undefined}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={combined} style={iconOnly ? { padding: 0 } : undefined}>
      {children}
    </button>
  );
}

function LogoMark() {
  return (
    <div className="logo-row">
      <div className="relative" style={{ width: 32, height: 32 }}>
        <div style={{ position: "absolute", left: 7, top: 3, width: 10, height: 22, borderRadius: 999, background: "#25f4ee" }} />
        <div style={{ position: "absolute", left: 11, top: 6, width: 10, height: 22, borderRadius: 999, background: "#fe2c55" }} />
        <div style={{ position: "absolute", left: 9, top: 4, width: 10, height: 22, borderRadius: 999, background: "#fff" }} />
        <div style={{ position: "absolute", left: 5, top: 14, width: 12, height: 12, borderRadius: 999, border: "4px solid #25f4ee" }} />
        <div style={{ position: "absolute", left: 9, top: 17, width: 12, height: 12, borderRadius: 999, border: "4px solid #fe2c55" }} />
        <div style={{ position: "absolute", left: 7, top: 15, width: 12, height: 12, borderRadius: 999, border: "4px solid #fff" }} />
      </div>
      <div className="logo-text">TikTok</div>
    </div>
  );
}

function SidebarItem({ icon: Icon, label, active = false, badge }) {
  return (
    <button className={`sidebar-btn ${active ? "active" : ""}`.trim()}>
      <span className="sidebar-left">
        <Icon size={18} />
        {label}
      </span>
      {badge ? <span className={`badge ${active ? "active" : ""}`.trim()}>{badge}</span> : null}
    </button>
  );
}

function StatPill({ icon: Icon, value, warn = false }) {
  return (
    <div className={`pill ${warn ? "warn" : ""}`.trim()}>
      <Icon size={14} />
      <span>{value}</span>
    </div>
  );
}

function VerifiedName({ name, verified }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 700, fontSize: 16 }}>
      <span>{name}</span>
      {verified ? <BadgeCheck size={16} color="#56b6ff" /> : null}
    </div>
  );
}

function TopHeader({ query, setQuery, tab, setTab }) {
  const isWide = typeof window !== "undefined" ? window.innerWidth > 1280 : true;

  return (
    <Panel>
      <div className="header-row" style={{ flexDirection: isWide ? "row" : "column", justifyContent: "space-between", alignItems: isWide ? "center" : "stretch" }}>
        <div>
          <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: "-0.02em" }}>For You</div>
          <div className="muted medium" style={{ marginTop: 4 }}>
            Discover videos, creators, LIVE streams, and trending topics.
          </div>
        </div>
        <div className="header-controls">
          <div className="search-wrap">
            <Search size={16} className="search-icon" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="search-input"
            />
          </div>
          <div className="tabs">
            {[
              ["for-you", "For You"],
              ["following", "Following"],
              ["explore", "Explore"],
            ].map(([value, label]) => (
              <button key={value} onClick={() => setTab(value)} className={`tab-btn ${tab === value ? "active" : ""}`.trim()}>
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Panel>
  );
}

function LandingPage({ onBack }) {
  return (
    <div className="feed-stack">
      <Panel>
        <div className="flex-between">
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft size={16} />
              Back
            </Button>
            <div>
              <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: "-0.02em" }}>{CUSTOMER_AD.landingTitle}</div>
              <div className="muted medium" style={{ marginTop: 4 }}>{CUSTOMER_AD.brandName}</div>
            </div>
          </div>
          <Button variant="primary" href={CUSTOMER_AD.ctaUrl} target="_blank" rel="noreferrer">
            {CUSTOMER_AD.ctaLabel}
            <ExternalLink size={16} />
          </Button>
        </div>
      </Panel>

      <div className="feed-card">
        <div className="landing-grid">
          <div className="landing-image-pane">
            <img
              src={CUSTOMER_AD.landingHeroImage || CUSTOMER_AD.imageUrl}
              alt={CUSTOMER_AD.brandName}
              className="landing-img"
            />
            <div className="landing-image-overlay" />
          </div>
          <div className="landing-copy">
            <div className="landing-chip">
              <Sparkles size={14} />
              Sponsored destination
            </div>
            <div className="landing-title">{CUSTOMER_AD.landingTitle}</div>
            <div className="landing-text">{CUSTOMER_AD.landingDescription}</div>
            <div className="highlight-list">
              {CUSTOMER_AD.landingHighlights.map((item) => (
                <div key={item} className="highlight-item">
                  {item}
                </div>
              ))}
            </div>
            <div className="button-row" style={{ marginTop: 32 }}>
              <Button variant="secondary" href={CUSTOMER_AD.ctaUrl} target="_blank" rel="noreferrer">
                {CUSTOMER_AD.ctaLabel}
              </Button>
              <Button variant="ghost" onClick={onBack}>Back to feed</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeedCard({ item, onOpenSponsoredLanding }) {
  const avatarSeed = `https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(item.name)}`;

  return (
    <motion.div layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
      <div className="feed-card">
        <div className="feed-card-grid">
          <div className="media-pane">
            <img src={item.image} alt={item.name} className="media-img" />
            <div className="media-overlay" />

            <div className="top-pills" style={{ right: "auto" }}>
              <div className="pill">For You</div>
              {item.sponsored ? <div className="pill warn">Sponsored</div> : null}
            </div>

            <div className="top-right-action">
              <Button variant="icon" iconOnly>
                <MoreHorizontal size={16} />
              </Button>
            </div>

            <div className="bottom-pills">
              <StatPill icon={Play} value="Autoplay" />
              <StatPill icon={Volume2} value="Sound on" />
              <StatPill icon={Music4} value={item.music} />
            </div>
          </div>

          <div className="content-pane">
            <div className="content-header">
              <div className="profile-row">
                <Avatar src={avatarSeed} name={item.name} />
                <div>
                  <VerifiedName name={item.name} verified={item.verified} />
                  <div className="muted medium" style={{ marginTop: 4 }}>{item.creator}</div>
                </div>
              </div>
              <Button variant="primary">Follow</Button>
            </div>

            <div className="content-body">
              <div className="caption">{item.caption}</div>

              {item.sponsored ? (
                <div className="subcard sponsored-card">
                  <div className="sponsored-label">
                    <Sparkles size={14} />
                    Sponsored
                  </div>
                  <div className="subcard-title">{CUSTOMER_AD.cardTitle}</div>
                  <div className="subcard-text">{CUSTOMER_AD.cardDescription}</div>
                  <div className="button-row">
                    <Button variant="secondary" onClick={onOpenSponsoredLanding}>{CUSTOMER_AD.ctaLabel}</Button>
                    <Button variant="ghost" href={CUSTOMER_AD.ctaUrl} target="_blank" rel="noreferrer">Open link</Button>
                  </div>
                </div>
              ) : (
                <div className="subcard">
                  <div className="upper-label">About this video</div>
                  <div className="subcard-text">
                    Discover creators, sounds, and products tailored to what you watch, like, and save.
                  </div>
                </div>
              )}

              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 12 }}>
                <div className="subcard">
                  <div className="upper-label">Engagement</div>
                  <div className="stats-grid" style={{ marginTop: 12 }}>
                    {[
                      ["Likes", item.likes],
                      ["Comments", item.comments],
                      ["Saves", item.saves],
                      ["Shares", item.shares],
                    ].map(([label, value]) => (
                      <div key={label} className="stat-box">
                        <div className="muted medium">{label}</div>
                        <div className="stat-value">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="subcard">
                  <div className="upper-label">Actions</div>
                  <div className="action-grid">
                    {[
                      [Heart, "Like"],
                      [MessageCircle, "Comment"],
                      [Bookmark, "Save"],
                      [Share2, "Share"],
                    ].map(([Icon, label]) => (
                      <button key={label} className="action-btn">
                        <Icon size={16} />
                        <span>{label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function LeftRail({ setQuery }) {
  return (
    <div className="column-stack left-rail">
      <Panel>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <LogoMark />
          <div className="nav-list">
            <SidebarItem icon={Home} label="For You" active />
            <SidebarItem icon={Compass} label="Explore" />
            <SidebarItem icon={Play} label="LIVE" />
            <SidebarItem icon={Users} label="Following" />
            <SidebarItem icon={MessageCircle} label="Messages" badge="3" />
            <SidebarItem icon={Bell} label="Notifications" badge="12" />
            <SidebarItem icon={ShoppingBag} label="Shop" />
            <SidebarItem icon={Bookmark} label="Profile" />
          </div>
          <Button variant="primary">
            <Plus size={16} />
            Upload
          </Button>
        </div>
      </Panel>

      <Panel>
        <div className="section-title">Trending</div>
        <div className="tag-row">
          {TRENDING_TOPICS.map((topic) => (
            <button key={topic} onClick={() => setQuery(topic.replace("#", ""))} className="tag-btn">
              {topic}
            </button>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function RightRail() {
  return (
    <div className="column-stack right-rail">
      <Panel>
        <div className="flex-between" style={{ marginBottom: 16 }}>
          <div>
            <div className="section-title">Suggested accounts</div>
            <div className="muted small" style={{ marginTop: 4 }}>Accounts to follow</div>
          </div>
          <button className="tag-btn" style={{ padding: "6px 10px", color: "#ff7d98" }}>See all</button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {FOLLOWING.map((person) => (
            <div key={person.handle} className="suggested-row">
              <div className="suggested-left">
                <Avatar src={person.avatar} name={person.name} size={44} />
                <div style={{ minWidth: 0 }}>
                  <div className="truncate" style={{ fontSize: 14, fontWeight: 600 }}>{person.name}</div>
                  <div className="truncate muted small" style={{ marginTop: 3 }}>{person.handle}</div>
                </div>
              </div>
              <Button variant="ghost">Follow</Button>
            </div>
          ))}
        </div>
      </Panel>

      <Panel className="live-panel">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="landing-chip" style={{ background: "rgba(0,212,255,0.12)", borderColor: "rgba(0,212,255,0.18)", color: "#9eeeff" }}>
            <Sparkles size={14} />
            LIVE now
          </div>
          <div>
            <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.02em" }}>Creator Q&A: Building content systems</div>
            <div className="muted medium" style={{ marginTop: 8, lineHeight: 1.7 }}>
              Join a live session on creator workflows, editing routines, and what is performing this week.
            </div>
          </div>
          <div className="subcard" style={{ background: "rgba(0,0,0,0.35)" }}>
            <div className="muted medium" style={{ lineHeight: 1.8 }}>
              Trending this hour:<br />
              #productivitytok<br />
              #springstyle<br />
              #creatorgear<br />
              #deskroutine
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState("for-you");
  const [query, setQuery] = useState("");
  const [showSponsoredLanding, setShowSponsoredLanding] = useState(false);

  const filteredFeed = useMemo(() => {
    return FEED_DATA.filter((item) => {
      const haystack = `${item.name} ${item.creator} ${item.caption} ${item.category}`.toLowerCase();
      return haystack.includes(query.toLowerCase());
    });
  }, [query]);

  return (
    <div className="app-shell">
      <StyleTag />
      <div className="page-grid">
        <LeftRail setQuery={setQuery} />

        <main className="main-column">
          {showSponsoredLanding ? (
            <LandingPage onBack={() => setShowSponsoredLanding(false)} />
          ) : (
            <div className="feed-stack">
              <TopHeader query={query} setQuery={setQuery} tab={tab} setTab={setTab} />
              {filteredFeed.map((item) => (
                <FeedCard
                  key={item.id}
                  item={item}
                  onOpenSponsoredLanding={() => setShowSponsoredLanding(true)}
                />
              ))}
              {filteredFeed.length === 0 ? (
                <Panel>
                  <div className="empty-state">
                    <div style={{ fontSize: 20, fontWeight: 700 }}>No results found</div>
                    <div className="muted medium" style={{ marginTop: 8 }}>
                      Try another keyword or clear the search to restore the feed.
                    </div>
                    <div style={{ marginTop: 20 }}>
                      <Button variant="secondary" onClick={() => setQuery("")}>Clear search</Button>
                    </div>
                  </div>
                </Panel>
              ) : null}
            </div>
          )}
        </main>

        <RightRail />
      </div>
    </div>
  );
}
