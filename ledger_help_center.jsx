import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Search, BookOpen, Sparkles, ArrowRight, ArrowLeft, ChevronRight,
  ChevronDown, ChevronUp, ExternalLink, X, Plus, Filter, Hash,
  Compass, Map, Lightbulb, Zap, Brain, Shield, Lock, Globe, Users,
  User, Building2, Factory, Truck, HardHat, FileText, FileCheck,
  FileSignature, Calendar, Clock, Receipt, MessageSquare, Inbox,
  Bell, Calculator, Library, Award, BarChart3, Activity, Layers,
  AtSign, Mail, Phone, MapPin, Star, Pin, Heart, Settings, Code,
  Smartphone, Monitor, Eye, Send, Camera, Upload, CreditCard,
  ShieldCheck, Database, Server, Wifi, RefreshCw, Pause, Play,
  Maximize2, Download, Share2, Copy, Snowflake, Flame, Quote,
  CheckCircle2, Circle, AlertTriangle, ThumbsUp, ThumbsDown,
  Headphones, ChevronsRight, Tag, Bookmark, History, Coffee,
  Cpu, GitBranch, Package, PlayCircle, Terminal, Workflow,
  HelpCircle, MessageCircle, Mic, FileQuestion, Newspaper,
  Rocket, Wrench, Link2, Target, KeyRound, Scale,
} from 'lucide-react';

/* ============================================================
   THEME
   ============================================================ */
const T = {
  bg: '#F4EFE6', bgDeep: '#EAE3D0', surface: '#FFFDF8', surface2: '#FAF6EC',
  surface3: '#F5EFE0', ink: '#171411', ink2: '#3B342B', muted: '#7A7163',
  faint: '#B5AC9B', rule: '#E5DDC9', rule2: '#D9CFB6',
  primary: '#0B3D3A', primary2: '#1A5C57', primaryDk: '#062624',
  copper: '#C46A2D', copperLt: '#E89762', gold: '#B8893C',
  ok: '#3F7355', warn: '#C28A2A', danger: '#A8402E',
};

const FONT_DISPLAY = '"Instrument Serif", "Times New Roman", serif';
const FONT_BODY    = '"Geist", "Inter", system-ui, sans-serif';
const FONT_MONO    = '"JetBrains Mono", ui-monospace, monospace';

/* ============================================================
   DATA
   ============================================================ */
const CATEGORIES = [
  { id: 'getting-started', title: 'Getting started',         subtitle: 'Set up your firm in your first afternoon',           icon: Rocket,     color: T.copper,    articles: 14 },
  { id: 'clients',         title: 'Working with clients',    subtitle: 'Portals, engagement letters, communication',         icon: Users,      color: T.primary,   articles: 22 },
  { id: 'documents',       title: 'Documents & AI',          subtitle: 'Upload, classification, extraction, organization',  icon: FileText,   color: T.gold,      articles: 18 },
  { id: 'tax-prep',        title: 'Tax preparation',          subtitle: 'Returns, e-file, integrations with Drake/UltraTax',icon: Calculator, color: T.primary2,  articles: 26 },
  { id: 'billing',         title: 'Billing & payments',      subtitle: 'Invoicing, retainers, Stripe, ACH',                 icon: CreditCard, color: T.copperLt,  articles: 11 },
  { id: 'ai-research',     title: 'AI Research workspace',   subtitle: 'Prompts, citations, drafting, calculators',         icon: Sparkles,   color: T.copper,    articles: 17 },
  { id: 'team',            title: 'Team & permissions',       subtitle: 'Roles, seats, multi-partner workflows',            icon: Building2,  color: T.primary,   articles: 9  },
  { id: 'security',        title: 'Security & compliance',    subtitle: 'SOC 2, IRS Pub 4557, IRC §7216, audit logs',        icon: Shield,     color: T.ok,        articles: 13 },
  { id: 'integrations',    title: 'Integrations',             subtitle: 'QuickBooks, Drake, Stripe, Gmail, Plaid',           icon: Link2,      color: T.gold,      articles: 24 },
  { id: 'api',             title: 'API & developers',         subtitle: 'REST API, webhooks, custom fields',                 icon: Code,       color: T.primary2,  articles: 15 },
];

const POPULAR_ARTICLES = [
  { id: 'a1', cat: 'getting-started', title: 'Migrating from TaxDome to Ledger',                                  readTime: '8 min', updated: '2d ago', views: 4218, hot: true },
  { id: 'a2', cat: 'documents',       title: 'How AI document classification works (and how to correct it)',       readTime: '6 min', updated: '5d ago', views: 3104, hot: true },
  { id: 'a3', cat: 'security',        title: 'IRC §7216 and what it means for your client data',                    readTime: '11 min', updated: '1w ago', views: 2870, hot: false },
  { id: 'a4', cat: 'tax-prep',        title: 'Connecting Drake Tax to Ledger (round-trip workflow)',                readTime: '7 min', updated: '3d ago', views: 2654, hot: true },
  { id: 'a5', cat: 'billing',         title: 'Setting up monthly retainers and auto-pay',                            readTime: '5 min', updated: '4d ago', views: 2210, hot: false },
  { id: 'a6', cat: 'ai-research',     title: 'Writing better prompts for the AI Research workspace',                 readTime: '9 min', updated: 'today', views: 1987, hot: true },
];

const NEW_ARTICLES = [
  { id: 'n1', cat: 'tax-prep',     title: 'Bonus depreciation election under §168(k) — workflow guide',    date: 'Apr 28' },
  { id: 'n2', cat: 'ai-research',  title: 'New: case law search now covers all 50 states + Tax Court',       date: 'Apr 25' },
  { id: 'n3', cat: 'integrations', title: 'Connecting QuickBooks Online with multi-entity support',           date: 'Apr 22' },
];

const PATHS = [
  { id: 'new-firm',      title: 'For new firms',                              subtitle: 'Solo EAs, CPAs, or small partnerships starting fresh',         icon: Rocket,    color: T.copper,    duration: '2 hours', chapters: 7 },
  { id: 'migration',     title: 'Migrating from TaxDome / Canopy / Karbon',  subtitle: 'Move your existing book without losing client data or trust', icon: GitBranch, color: T.primary,   duration: '90 min',  chapters: 5 },
  { id: 'tax-season',    title: 'Tax season operations',                     subtitle: 'Run your firm during Jan–April with the war room and AI inbox',icon: Activity,  color: T.gold,      duration: '60 min',  chapters: 4 },
  { id: 'multi-partner', title: 'Multi-partner firms',                       subtitle: 'Roles, permissions, and partner-level visibility',             icon: Users,     color: T.primary2,  duration: '45 min',  chapters: 4 },
];

const ARTICLE = {
  id: 'a2',
  category: 'Documents & AI',
  categoryId: 'documents',
  title: 'How AI document classification works (and how to correct it)',
  subtitle: 'Ledger\'s document AI reads, classifies, and routes incoming files automatically. Here\'s exactly how it decides what something is — and what to do when it gets one wrong.',
  author: { name: 'Aanya Kapoor', role: 'Head of AI', initial: 'AK', color: T.gold },
  updated: '5 days ago',
  readTime: '6 min',
  rating: 4.8,
  votes: 142,
  toc: [
    { id: 's1', title: 'What gets classified', level: 1 },
    { id: 's2', title: 'How the model decides', level: 1 },
    { id: 's3', title: 'Confidence scores', level: 2 },
    { id: 's4', title: 'When it gets it wrong', level: 1 },
    { id: 's5', title: 'Correcting a classification', level: 2 },
    { id: 's6', title: 'Teaching it your firm', level: 2 },
    { id: 's7', title: 'What\'s never auto-classified', level: 1 },
    { id: 's8', title: 'Privacy & training', level: 1 },
  ],
};

/* ============================================================
   HELPERS
   ============================================================ */
const cx = (...a) => a.filter(Boolean).join(' ');

function Pill({ children, tone = 'neutral', tiny = false, mono = false }) {
  const tones = {
    neutral: { bg: '#EFE8D6', fg: T.ink2,    bd: T.rule2 },
    low:     { bg: '#E2EBE3', fg: T.ok,      bd: '#C8D8CB' },
    med:     { bg: '#F5E6C9', fg: '#8A6418', bd: '#E5D2A7' },
    high:    { bg: '#F2D9D1', fg: T.danger,  bd: '#E8C2B6' },
    primary: { bg: '#D8E5E3', fg: T.primary, bd: '#B8CECB' },
    copper:  { bg: '#F8E2D1', fg: T.copper,  bd: '#EFCDB1' },
    gold:    { bg: '#F2E5C5', fg: T.gold,    bd: '#E0D0A0' },
  };
  const c = tones[tone] || tones.neutral;
  const sz = tiny ? 'px-1.5 py-[1px] text-[8.5px]' : 'px-2 py-[2px] text-[10px]';
  return (
    <span
      className={`inline-flex items-center gap-1 ${sz} uppercase tracking-[0.08em] border rounded-[2px]`}
      style={{ background: c.bg, color: c.fg, borderColor: c.bd, fontFamily: mono ? FONT_MONO : FONT_BODY, fontWeight: 500 }}
    >
      {children}
    </span>
  );
}

/* ============================================================
   TOP NAV
   ============================================================ */
function TopNav({ scrolled, onSearch, onHome }) {
  return (
    <nav
      className="sticky top-0 z-40 transition-all"
      style={{
        background: scrolled ? 'rgba(244,239,230,0.92)' : T.bg,
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: `1px solid ${scrolled ? T.rule : 'transparent'}`,
        fontFamily: FONT_BODY,
      }}
    >
      <div className="mx-auto max-w-[1340px] px-10 py-3.5 flex items-center gap-6">
        <button onClick={onHome} className="flex items-center gap-2.5">
          <div
            className="flex items-center justify-center"
            style={{
              width: 30, height: 30, borderRadius: 4, background: T.primary,
              color: T.surface, fontFamily: FONT_DISPLAY, fontSize: 22, fontStyle: 'italic',
              lineHeight: 1, paddingBottom: 4,
            }}
          >L</div>
          <div className="flex items-baseline gap-2">
            <span style={{ fontFamily: FONT_DISPLAY, fontSize: 20, color: T.ink, lineHeight: 1, letterSpacing: '-0.01em' }}>
              Ledger<span style={{ color: T.copper }}>.</span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.18em]" style={{ color: T.muted }}>
              Help & Docs
            </span>
          </div>
        </button>

        <div className="ml-6 flex items-center gap-6 text-[12.5px]" style={{ color: T.ink2 }}>
          <button>Guides</button>
          <button>Reference</button>
          <button>Changelog</button>
          <button>API</button>
          <button>Status</button>
        </div>

        <button
          onClick={onSearch}
          className="ml-auto flex items-center gap-3 px-3.5 py-2 rounded-[3px] text-left"
          style={{
            background: T.surface, border: `1px solid ${T.rule}`,
            width: 320, color: T.muted,
          }}
        >
          <Search size={13}/>
          <span className="flex-1 text-[12px]">Search docs, guides, API…</span>
          <span
            className="text-[9.5px] px-1.5 py-[2px] rounded-[2px]"
            style={{ background: T.surface2, color: T.muted, border: `1px solid ${T.rule}`, fontFamily: FONT_MONO }}
          >
            ⌘K
          </span>
        </button>

        <button
          className="px-3.5 py-2 text-[12px] flex items-center gap-1.5 rounded-[3px]"
          style={{ background: T.primary, color: T.surface, fontWeight: 500 }}
        >
          Open dashboard <ArrowRight size={12}/>
        </button>
      </div>
    </nav>
  );
}

/* ============================================================
   HERO
   ============================================================ */
function Hero({ onSearch }) {
  return (
    <section className="relative overflow-hidden" style={{ background: T.bg }}>
      <div
        aria-hidden
        style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(circle at 80% 20%, rgba(196,106,45,0.10), transparent 50%)`,
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute', inset: 0, opacity: 0.4,
          backgroundImage: `linear-gradient(${T.rule} 1px, transparent 1px), linear-gradient(90deg, ${T.rule} 1px, transparent 1px)`,
          backgroundSize: '120px 120px',
          maskImage: 'radial-gradient(ellipse at 50% 30%, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 30%, black 30%, transparent 75%)',
        }}
      />

      <div className="relative mx-auto max-w-[1340px] px-10 pt-16 pb-20">
        <div className="flex items-center gap-3 mb-7">
          <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: T.copper, fontWeight: 500 }}>Vol. V</span>
          <span style={{ width: 24, height: 1, background: T.rule2 }}/>
          <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: T.muted }}>The handbook</span>
        </div>

        <h1
          style={{
            fontFamily: FONT_DISPLAY, fontSize: 96, lineHeight: 0.94,
            letterSpacing: '-0.03em', color: T.ink, fontStyle: 'italic',
            maxWidth: 1100,
          }}
        >
          Everything you<br/>
          need to <span style={{ color: T.copper }}>run</span><br/>
          your practice on Ledger.
        </h1>

        <p
          className="mt-8 max-w-[640px]"
          style={{ fontFamily: FONT_BODY, fontSize: 16, color: T.ink2, lineHeight: 1.6 }}
        >
          169 articles. 4 guided learning paths. Updated every release. Search what you need or browse by topic — the model knows your practice and surfaces what fits.
        </p>

        <div
          onClick={onSearch}
          className="mt-10 flex items-center gap-4 px-6 py-5 rounded-[4px] cursor-pointer"
          style={{
            background: T.surface,
            border: `1px solid ${T.rule}`,
            maxWidth: 720,
            boxShadow: '0 30px 60px -30px rgba(20,15,8,0.15)',
          }}
        >
          <Search size={22} style={{ color: T.copper }}/>
          <span className="flex-1 text-[16px]" style={{ color: T.muted, fontFamily: FONT_BODY }}>
            How do I migrate clients from TaxDome?
          </span>
          <div className="flex items-center gap-2">
            <Sparkles size={13} style={{ color: T.copper }}/>
            <span className="text-[10.5px] uppercase tracking-[0.16em]" style={{ color: T.copper, fontWeight: 500 }}>AI Search</span>
          </div>
          <span
            className="text-[10px] px-2 py-1 rounded-[2px]"
            style={{ background: T.surface2, color: T.muted, border: `1px solid ${T.rule}`, fontFamily: FONT_MONO }}
          >
            ⌘K
          </span>
        </div>

        <div className="mt-4 flex items-center gap-4 text-[11.5px] flex-wrap" style={{ color: T.muted }}>
          <span>Try:</span>
          {['"How does AI classify documents?"', '"Connect Drake Tax"', '"§168(k) bonus depreciation"', '"Audit log retention"'].map((s, i) => (
            <button key={i} style={{ color: T.copper, fontStyle: 'italic' }}>
              {s}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   LEARNING PATHS
   ============================================================ */
function Paths() {
  return (
    <section className="mx-auto max-w-[1340px] px-10 py-12">
      <div className="flex items-end justify-between mb-7">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: T.copper, fontWeight: 500 }}>01</span>
            <span style={{ width: 24, height: 1, background: T.rule2 }}/>
            <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: T.muted }}>Guided learning</span>
          </div>
          <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 44, lineHeight: 1.0, letterSpacing: '-0.025em', color: T.ink, fontStyle: 'italic' }}>
            Start with a path.
          </h2>
          <p className="mt-3 max-w-[520px] text-[14px]" style={{ color: T.ink2, lineHeight: 1.6 }}>
            Curated sequences for the four ways firms typically arrive at Ledger. Each path is a few hours of structured learning with hands-on checkpoints.
          </p>
        </div>
        <button className="text-[12px] flex items-center gap-1.5" style={{ color: T.copper, fontWeight: 500 }}>
          See all paths <ArrowRight size={12}/>
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {PATHS.map(p => {
          const Icon = p.icon;
          return (
            <button
              key={p.id}
              className="text-left p-6 rounded-[3px] transition-transform hover:-translate-y-px"
              style={{
                background: T.surface,
                border: `1px solid ${T.rule}`,
                borderTop: `3px solid ${p.color}`,
              }}
            >
              <div
                className="flex items-center justify-center mb-4"
                style={{ width: 40, height: 40, background: T.surface2, border: `1px solid ${T.rule}`, borderRadius: 4 }}
              >
                <Icon size={18} style={{ color: p.color }} strokeWidth={1.5}/>
              </div>
              <h3
                style={{
                  fontFamily: FONT_DISPLAY, fontSize: 22, color: T.ink,
                  fontStyle: 'italic', letterSpacing: '-0.01em', lineHeight: 1.15,
                }}
              >
                {p.title}
              </h3>
              <p className="mt-2 text-[12px]" style={{ color: T.ink2, lineHeight: 1.55 }}>
                {p.subtitle}
              </p>

              <div className="mt-5 pt-4 flex items-center justify-between" style={{ borderTop: `1px dashed ${T.rule2}` }}>
                <div className="flex items-center gap-3 text-[10.5px]" style={{ color: T.muted }}>
                  <span className="flex items-center gap-1">
                    <Clock size={10}/> {p.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen size={10}/> {p.chapters} ch
                  </span>
                </div>
                <ArrowRight size={12} style={{ color: p.color }}/>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

/* ============================================================
   CATEGORY GRID
   ============================================================ */
function Categories() {
  return (
    <section style={{ background: T.surface, borderTop: `1px solid ${T.rule}`, borderBottom: `1px solid ${T.rule}` }}>
      <div className="mx-auto max-w-[1340px] px-10 py-16">
        <div className="flex items-end justify-between mb-7">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: T.copper, fontWeight: 500 }}>02</span>
              <span style={{ width: 24, height: 1, background: T.rule2 }}/>
              <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: T.muted }}>Browse by topic</span>
            </div>
            <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 44, lineHeight: 1.0, letterSpacing: '-0.025em', color: T.ink, fontStyle: 'italic' }}>
              The full library.
            </h2>
          </div>
          <span className="text-[12px]" style={{ color: T.muted, fontFamily: FONT_MONO }}>
            169 articles · 10 categories
          </span>
        </div>

        <div className="grid grid-cols-2 gap-px" style={{ background: T.rule, border: `1px solid ${T.rule}` }}>
          {CATEGORIES.map(c => {
            const Icon = c.icon;
            return (
              <button
                key={c.id}
                className="text-left p-6 transition-colors"
                style={{ background: T.surface }}
                onMouseEnter={(e) => e.currentTarget.style.background = T.surface2}
                onMouseLeave={(e) => e.currentTarget.style.background = T.surface}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="flex items-center justify-center shrink-0"
                    style={{ width: 44, height: 44, background: T.surface2, border: `1px solid ${T.rule}`, borderRadius: 4 }}
                  >
                    <Icon size={18} style={{ color: c.color }} strokeWidth={1.5}/>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3
                        style={{
                          fontFamily: FONT_DISPLAY, fontSize: 22, color: T.ink,
                          fontStyle: 'italic', letterSpacing: '-0.01em', lineHeight: 1.1,
                        }}
                      >
                        {c.title}
                      </h3>
                      <span className="text-[10px] uppercase tracking-[0.14em]" style={{ color: T.muted, fontFamily: FONT_MONO, fontWeight: 500, flexShrink: 0 }}>
                        {c.articles} articles
                      </span>
                    </div>
                    <p className="mt-1.5 text-[12.5px]" style={{ color: T.ink2, lineHeight: 1.55 }}>
                      {c.subtitle}
                    </p>
                    <div className="mt-3 flex items-center gap-1.5 text-[11px]" style={{ color: c.color, fontWeight: 500 }}>
                      <span>Browse {c.title.toLowerCase()}</span>
                      <ArrowRight size={11}/>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   POPULAR + NEW + ASK COMMUNITY
   ============================================================ */
function PopularAndNew({ onArticle }) {
  return (
    <section className="mx-auto max-w-[1340px] px-10 py-16">
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-7">
          <div className="flex items-end justify-between mb-5">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: T.copper, fontWeight: 500 }}>03</span>
                <span style={{ width: 24, height: 1, background: T.rule2 }}/>
                <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: T.muted }}>Most read</span>
              </div>
              <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 32, lineHeight: 1.0, letterSpacing: '-0.02em', color: T.ink, fontStyle: 'italic' }}>
                Popular this week.
              </h2>
            </div>
          </div>

          <div className="rounded-[3px] overflow-hidden" style={{ background: T.surface, border: `1px solid ${T.rule}` }}>
            {POPULAR_ARTICLES.map((a, i) => {
              const cat = CATEGORIES.find(c => c.id === a.cat);
              const CatIcon = cat?.icon || FileText;
              return (
                <button
                  key={a.id}
                  onClick={() => onArticle && onArticle(a)}
                  className="w-full text-left flex items-center gap-4 px-5 py-4"
                  style={{ borderBottom: i < POPULAR_ARTICLES.length - 1 ? `1px solid ${T.rule}` : 'none' }}
                >
                  <span
                    style={{
                      fontFamily: FONT_DISPLAY, fontSize: 26, fontStyle: 'italic',
                      color: T.faint, letterSpacing: '-0.02em', lineHeight: 1,
                      width: 36, flexShrink: 0,
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div
                    className="flex items-center justify-center shrink-0"
                    style={{ width: 30, height: 30, background: T.surface2, border: `1px solid ${T.rule}`, borderRadius: 3 }}
                  >
                    <CatIcon size={13} style={{ color: cat?.color }}/>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[12.5px]" style={{ color: T.ink, fontWeight: 500 }}>{a.title}</span>
                      {a.hot && <Pill tone="copper" tiny><Flame size={8}/> Hot</Pill>}
                    </div>
                    <div className="flex items-center gap-2 text-[10.5px]" style={{ color: T.muted }}>
                      <span>{cat?.title}</span>
                      <span>·</span>
                      <span>{a.readTime} read</span>
                      <span>·</span>
                      <span style={{ fontFamily: FONT_MONO }}>{a.views.toLocaleString()} views</span>
                    </div>
                  </div>
                  <ArrowRight size={13} style={{ color: T.faint, flexShrink: 0 }}/>
                </button>
              );
            })}
          </div>
        </div>

        <div className="col-span-5 flex flex-col gap-5">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: T.copper, fontWeight: 500 }}>New</span>
              <span style={{ width: 24, height: 1, background: T.rule2 }}/>
              <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: T.muted }}>This week</span>
            </div>
            <div className="rounded-[3px] overflow-hidden" style={{ background: T.surface, border: `1px solid ${T.rule}` }}>
              {NEW_ARTICLES.map((a, i) => {
                const cat = CATEGORIES.find(c => c.id === a.cat);
                return (
                  <button
                    key={a.id}
                    className="w-full text-left flex items-start gap-3 px-4 py-3"
                    style={{ borderBottom: i < NEW_ARTICLES.length - 1 ? `1px solid ${T.rule}` : 'none' }}
                  >
                    <Pill tone="copper" tiny>NEW</Pill>
                    <div className="flex-1">
                      <div className="text-[12px]" style={{ color: T.ink, fontWeight: 500, lineHeight: 1.3 }}>{a.title}</div>
                      <div className="flex items-center gap-1.5 mt-1 text-[10px]" style={{ color: T.muted }}>
                        <span>{cat?.title}</span>
                        <span>·</span>
                        <span style={{ fontFamily: FONT_MONO }}>{a.date}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div
            className="p-6 rounded-[3px] relative overflow-hidden"
            style={{ background: T.primary, color: T.surface }}
          >
            <div
              aria-hidden
              style={{ position: 'absolute', right: -40, top: -40, width: 160, height: 160, border: `1px solid rgba(255,253,248,0.10)`, borderRadius: '50%' }}
            />
            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={13} style={{ color: T.copperLt }}/>
                <span className="text-[10px] uppercase tracking-[0.18em]" style={{ color: T.copperLt, fontWeight: 500 }}>
                  Can't find what you need?
                </span>
              </div>
              <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 22, fontStyle: 'italic', letterSpacing: '-0.015em', lineHeight: 1.1 }}>
                Ask the AI handbook.
              </h3>
              <p className="mt-2 text-[12.5px]" style={{ color: 'rgba(255,253,248,0.75)', lineHeight: 1.55 }}>
                Trained on every article, changelog entry, and support thread. Cites the source. Works in your firm's context.
              </p>
              <button
                className="mt-4 w-full py-2.5 text-[12px] flex items-center justify-center gap-1.5 rounded-[3px]"
                style={{ background: T.copper, color: T.surface, fontWeight: 500 }}
              >
                <Sparkles size={11}/> Open AI handbook
              </button>

              <div
                className="mt-4 pt-4 flex items-center justify-between text-[10.5px]"
                style={{ borderTop: `1px solid rgba(255,253,248,0.12)`, color: 'rgba(255,253,248,0.65)' }}
              >
                <span className="flex items-center gap-1.5">
                  <MessageCircle size={11}/> Or talk to a human
                </span>
                <span style={{ fontFamily: FONT_MONO }}>~3 min reply</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */
function Footer() {
  return (
    <footer style={{ background: T.primaryDk, color: T.surface, position: 'relative', overflow: 'hidden' }}>
      <div
        aria-hidden
        style={{
          position: 'absolute', right: -150, top: -150, width: 500, height: 500,
          border: `1px solid rgba(255,253,248,0.06)`, borderRadius: '50%',
        }}
      />
      <div className="relative mx-auto max-w-[1340px] px-10 py-14">
        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-4">
            <div className="flex items-center gap-2.5 mb-5">
              <div style={{ width: 26, height: 26, borderRadius: 3, background: T.copper, color: T.surface, fontFamily: FONT_DISPLAY, fontSize: 19, fontStyle: 'italic', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: 3, lineHeight: 1 }}>L</div>
              <span style={{ fontFamily: FONT_DISPLAY, fontSize: 18, color: T.surface, letterSpacing: '-0.01em' }}>
                Ledger<span style={{ color: T.copperLt }}>.</span>
              </span>
            </div>
            <p style={{ fontFamily: FONT_BODY, fontSize: 13, color: 'rgba(255,253,248,0.7)', lineHeight: 1.6, maxWidth: 320 }}>
              The practice suite that thinks ahead of you. Built by accountants and AI engineers who have closed real tax seasons.
            </p>
            <div className="mt-6 flex items-center gap-3 text-[10.5px]" style={{ color: 'rgba(255,253,248,0.5)' }}>
              <Shield size={11}/> SOC 2 Type II
              <span>·</span>
              <Lock size={11}/> 256-bit encryption
              <span>·</span>
              <Globe size={11}/> 47 states
            </div>
          </div>

          {[
            { l: 'Docs', items: ['Guides', 'Reference', 'API', 'Changelog', 'Status'] },
            { l: 'Product', items: ['Dashboard', 'Client portal', 'AI Research', 'Mobile', 'Pricing'] },
            { l: 'Company', items: ['About', 'Customers', 'Security', 'Contact', 'Careers'] },
            { l: 'Resources', items: ['Tax season checklist', 'Migration guides', 'EA exam prep', 'Office hours'] },
          ].map((col, i) => (
            <div key={i} className="col-span-2">
              <div className="text-[10px] uppercase tracking-[0.18em] mb-3" style={{ color: T.copperLt, fontWeight: 500 }}>
                {col.l}
              </div>
              <ul className="flex flex-col gap-2">
                {col.items.map(it => (
                  <li key={it}>
                    <a href="#" className="text-[12px]" style={{ color: 'rgba(255,253,248,0.75)' }}>{it}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 flex items-center justify-between" style={{ borderTop: `1px solid rgba(255,253,248,0.12)` }}>
          <div className="text-[10.5px]" style={{ color: 'rgba(255,253,248,0.5)' }}>
            © 2026 Ledger Practice Systems · Help Center · Vol. V
          </div>
          <div className="flex items-center gap-4 text-[10.5px]" style={{ color: 'rgba(255,253,248,0.5)' }}>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Cookies</a>
            <a href="#">DPA</a>
            <a href="#" className="flex items-center gap-1">
              <Activity size={11}/>
              <span>All systems operational</span>
              <span className="rounded-full" style={{ width: 6, height: 6, background: T.ok, marginLeft: 2 }}/>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   ARTICLE READER
   ============================================================ */
function ArticleReader({ onBack }) {
  const [activeSection, setActiveSection] = useState('s1');
  const [helpful, setHelpful] = useState(null);

  return (
    <div style={{ background: T.bg, minHeight: '100vh', fontFamily: FONT_BODY }}>
      <div style={{ background: T.surface2, borderBottom: `1px solid ${T.rule}` }}>
        <div className="mx-auto max-w-[1340px] px-10 py-3.5 flex items-center gap-2 text-[11.5px]" style={{ color: T.muted }}>
          <button onClick={onBack} className="flex items-center gap-1.5" style={{ color: T.copper, fontWeight: 500 }}>
            <ArrowLeft size={11}/> Help & Docs
          </button>
          <ChevronRight size={11} style={{ color: T.faint }}/>
          <span>{ARTICLE.category}</span>
          <ChevronRight size={11} style={{ color: T.faint }}/>
          <span style={{ color: T.ink, fontWeight: 500 }}>{ARTICLE.title}</span>
        </div>
      </div>

      <div className="mx-auto max-w-[1340px] px-10 py-10 grid grid-cols-12 gap-10">
        <aside className="col-span-3">
          <div className="sticky top-24">
            <div className="text-[10px] uppercase tracking-[0.18em] mb-3" style={{ color: T.muted, fontWeight: 500 }}>
              On this page
            </div>
            <nav className="flex flex-col gap-1">
              {ARTICLE.toc.map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className="text-left py-1 text-[12px]"
                  style={{
                    color: activeSection === item.id ? T.copper : T.ink2,
                    fontWeight: activeSection === item.id ? 500 : 400,
                    borderLeft: activeSection === item.id ? `2px solid ${T.copper}` : `2px solid transparent`,
                    paddingLeft: item.level === 2 ? 18 : (activeSection === item.id ? 10 : 12),
                    transition: 'border-color 200ms',
                  }}
                >
                  {item.title}
                </button>
              ))}
            </nav>

            <div className="mt-8 p-4 rounded-[3px]" style={{ background: T.surface, border: `1px solid ${T.rule}` }}>
              <div className="text-[10px] uppercase tracking-[0.16em] mb-2" style={{ color: T.muted, fontWeight: 500 }}>
                Was this helpful?
              </div>
              <div className="flex items-center gap-2 mb-3">
                <button
                  onClick={() => setHelpful('yes')}
                  className="flex-1 py-1.5 text-[11px] flex items-center justify-center gap-1 rounded-[3px]"
                  style={{
                    background: helpful === 'yes' ? T.ok : T.surface2,
                    color: helpful === 'yes' ? T.surface : T.ink2,
                    border: `1px solid ${helpful === 'yes' ? T.ok : T.rule}`,
                  }}
                >
                  <ThumbsUp size={10}/> Yes
                </button>
                <button
                  onClick={() => setHelpful('no')}
                  className="flex-1 py-1.5 text-[11px] flex items-center justify-center gap-1 rounded-[3px]"
                  style={{
                    background: helpful === 'no' ? T.danger : T.surface2,
                    color: helpful === 'no' ? T.surface : T.ink2,
                    border: `1px solid ${helpful === 'no' ? T.danger : T.rule}`,
                  }}
                >
                  <ThumbsDown size={10}/> No
                </button>
              </div>
              <div className="text-[10.5px]" style={{ color: T.muted }}>
                <span style={{ color: T.ok }}>{ARTICLE.rating}/5</span> · {ARTICLE.votes} votes
              </div>
            </div>

            <div className="mt-5">
              <div className="text-[10px] uppercase tracking-[0.16em] mb-2" style={{ color: T.muted, fontWeight: 500 }}>
                Related
              </div>
              <div className="flex flex-col gap-2">
                {[
                  'Setting up automation rules',
                  'AI document inbox overview',
                  'Bulk uploading historical files',
                  'Privacy & training policy',
                ].map(t => (
                  <a key={t} href="#" className="text-[11.5px] flex items-start gap-1.5" style={{ color: T.ink2, lineHeight: 1.45 }}>
                    <FileText size={10} style={{ color: T.muted, marginTop: 3, flexShrink: 0 }}/>
                    {t}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <main className="col-span-7" style={{ maxWidth: 720 }}>
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Pill tone="gold">{ARTICLE.category}</Pill>
              <Pill tone="copper" tiny><Flame size={8}/> Hot this week</Pill>
              <span className="text-[10.5px]" style={{ color: T.muted, fontFamily: FONT_MONO }}>
                Updated {ARTICLE.updated}
              </span>
            </div>

            <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: 48, lineHeight: 1.05, letterSpacing: '-0.02em', color: T.ink, fontStyle: 'italic' }}>
              {ARTICLE.title}
            </h1>

            <p className="mt-4 text-[16px]" style={{ color: T.ink2, lineHeight: 1.6 }}>
              {ARTICLE.subtitle}
            </p>

            <div className="mt-6 flex items-center gap-4 pb-6" style={{ borderBottom: `1px solid ${T.rule}` }}>
              <div
                className="flex items-center justify-center text-[12px]"
                style={{ width: 36, height: 36, borderRadius: '50%', background: ARTICLE.author.color, color: T.surface, fontWeight: 600 }}
              >
                {ARTICLE.author.initial}
              </div>
              <div className="flex-1">
                <div className="text-[12.5px]" style={{ color: T.ink, fontWeight: 500 }}>{ARTICLE.author.name}</div>
                <div className="text-[10.5px]" style={{ color: T.muted }}>{ARTICLE.author.role}</div>
              </div>
              <div className="flex items-center gap-3 text-[11px]" style={{ color: T.muted }}>
                <span className="flex items-center gap-1"><Clock size={11}/> {ARTICLE.readTime}</span>
                <span className="flex items-center gap-1"><Eye size={11}/> 3,104</span>
              </div>
              <div className="flex items-center gap-1.5">
                <button className="p-1.5 rounded-[3px]" style={{ background: T.surface, border: `1px solid ${T.rule}` }}>
                  <Bookmark size={12} style={{ color: T.ink2 }}/>
                </button>
                <button className="p-1.5 rounded-[3px]" style={{ background: T.surface, border: `1px solid ${T.rule}` }}>
                  <Share2 size={12} style={{ color: T.ink2 }}/>
                </button>
              </div>
            </div>
          </div>

          <article style={{ color: T.ink2, fontSize: 15, lineHeight: 1.75 }}>
            <Section id="s1" title="What gets classified">
              <p>
                When a document arrives in your inbox — uploaded by a client, forwarded from email,
                or pulled from a connected source — Ledger's document AI runs three operations
                in sequence: <strong>identify</strong>, <strong>extract</strong>, and <strong>route</strong>.
              </p>
              <p>
                The model recognizes 47 document types out of the box, including:
              </p>

              <DocTypeGrid/>

              <CalloutBox tone="copper" icon={Lightbulb} title="Why this matters">
                Without classification, documents pile up in a flat inbox. With it, they auto-route to the
                right client folder, the right tax year, and the right preparer's queue. A 30-document week
                becomes a 30-second review.
              </CalloutBox>
            </Section>

            <Section id="s2" title="How the model decides">
              <p>
                Classification combines three signals: <em>visual layout</em> (does the page look like a
                W-2?), <em>content</em> (does it contain SSN-like patterns and tax-year language?),
                and <em>metadata</em> (filename, sender domain, upload context).
              </p>
              <p>
                The model returns a category prediction plus a confidence score from 0.0 to 1.0.
              </p>

              <SubSection id="s3" title="Confidence scores">
                <p>Confidence determines what happens next:</p>
                <ConfidenceTable/>
              </SubSection>
            </Section>

            <Section id="s4" title="When it gets it wrong">
              <p>
                The model is right about 96% of the time on standard documents. The 4% it misses
                tend to fall into specific categories:
              </p>
              <ul className="my-4 ml-5 flex flex-col gap-2" style={{ listStyleType: 'disc', color: T.ink2 }}>
                <li><strong>Hand-altered forms</strong> — a W-2 with handwritten corrections may classify as "scanned receipt"</li>
                <li><strong>Composite PDFs</strong> — a single PDF containing both a 1099 and a property tax bill</li>
                <li><strong>Foreign forms</strong> — Canadian T4s sometimes match against US W-2 patterns</li>
                <li><strong>Brand-new IRS forms</strong> — the model lags by ~30 days on newly-released schedules</li>
              </ul>

              <SubSection id="s5" title="Correcting a classification">
                <p>
                  In the document inbox, click any document with a confidence indicator below 0.85 to
                  open the review pane. You'll see:
                </p>
                <CodeSnippet
                  language="UI"
                  code={`Document: bank_stmt_oct.pdf
Predicted: Bank statement (0.72 confidence)
Alternatives:
  • Loan statement      (0.18)
  • Brokerage statement (0.07)
  • Other financial doc (0.03)`}
                />
                <p>
                  Click the correct option to relabel. The system logs your correction and the document
                  re-routes to the correct queue immediately.
                </p>
              </SubSection>

              <SubSection id="s6" title="Teaching it your firm">
                <p>
                  After 5 corrections of the same type, Ledger asks if you'd like to create a firm-specific
                  rule. Common patterns:
                </p>
                <ul className="my-4 ml-5 flex flex-col gap-2" style={{ listStyleType: 'disc', color: T.ink2 }}>
                  <li>"Anything from <code style={{ background: T.surface2, padding: '2px 5px', borderRadius: 2, fontSize: 12, fontFamily: FONT_MONO }}>statements@firstnationalwy.com</code> is a bank statement"</li>
                  <li>"PDFs with 'P&L' in the filename go to the Books queue"</li>
                  <li>"Documents larger than 50 pages skip auto-classification"</li>
                </ul>
                <p>
                  These rules apply only to your firm and are visible in <em>Settings → AI → Custom rules</em>.
                </p>
              </SubSection>
            </Section>

            <Section id="s7" title="What's never auto-classified">
              <p>
                Three document types always require manual review and never auto-route:
              </p>
              <ul className="my-4 ml-5 flex flex-col gap-2" style={{ listStyleType: 'disc', color: T.ink2 }}>
                <li><strong>IRS notices and CP-series correspondence</strong> — too consequential to risk a misroute</li>
                <li><strong>Engagement letters and contracts</strong> — legal documents require explicit firm acknowledgement</li>
                <li><strong>Documents flagged as "potentially privileged"</strong> — anything that looks like attorney-client communication</li>
              </ul>
              <CalloutBox tone="primary" icon={Shield} title="By design, not by limitation">
                These categories could be classified — we choose not to. The cost of a misrouted IRS
                notice is too high. Manual review is the conservative default.
              </CalloutBox>
            </Section>

            <Section id="s8" title="Privacy & training">
              <p>
                <strong>Your documents never train our models.</strong> We use a tax-domain foundation model
                that was pre-trained on public IRS forms, anonymized academic datasets, and synthetic
                examples. Your client documents are processed at inference time only.
              </p>
              <p>Specifically:</p>
              <ul className="my-4 ml-5 flex flex-col gap-2" style={{ listStyleType: 'disc', color: T.ink2 }}>
                <li>No client document content leaves your firm's encrypted scope</li>
                <li>Classifications and corrections create per-firm rules, not shared model weights</li>
                <li>Aggregate accuracy metrics (rates only, no content) are tracked for model evaluation</li>
                <li>You can disable AI classification entirely from <em>Settings → AI</em></li>
              </ul>
              <p>
                See our <a href="#" style={{ color: T.copper, textDecoration: 'underline' }}>full privacy & training policy</a> and{' '}
                <a href="#" style={{ color: T.copper, textDecoration: 'underline' }}>IRC §7216 compliance documentation</a>.
              </p>
            </Section>
          </article>

          <div className="mt-12 pt-6" style={{ borderTop: `1px solid ${T.rule}` }}>
            <div className="flex items-center justify-between mb-6">
              <div className="text-[11.5px]" style={{ color: T.muted }}>
                Found a typo or have a suggestion?{' '}
                <a href="#" style={{ color: T.copper, fontWeight: 500 }}>Edit on GitHub</a>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-[11.5px] flex items-center gap-1.5 px-3 py-1.5 rounded-[3px]" style={{ background: T.surface, color: T.ink2, border: `1px solid ${T.rule}` }}>
                  <Copy size={11}/> Copy link
                </button>
                <button className="text-[11.5px] flex items-center gap-1.5 px-3 py-1.5 rounded-[3px]" style={{ background: T.surface, color: T.ink2, border: `1px solid ${T.rule}` }}>
                  <FileText size={11}/> View as PDF
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <a href="#" className="p-4 rounded-[3px] flex items-start gap-3" style={{ background: T.surface, border: `1px solid ${T.rule}` }}>
                <ArrowLeft size={14} style={{ color: T.muted, marginTop: 3, flexShrink: 0 }}/>
                <div>
                  <div className="text-[9.5px] uppercase tracking-[0.14em]" style={{ color: T.muted, fontWeight: 500 }}>Previous</div>
                  <div className="text-[12.5px] mt-1" style={{ color: T.ink, fontWeight: 500, lineHeight: 1.4 }}>
                    Setting up your AI document inbox
                  </div>
                </div>
              </a>
              <a href="#" className="p-4 rounded-[3px] flex items-start gap-3 text-right" style={{ background: T.surface, border: `1px solid ${T.rule}` }}>
                <div className="flex-1">
                  <div className="text-[9.5px] uppercase tracking-[0.14em]" style={{ color: T.muted, fontWeight: 500 }}>Next</div>
                  <div className="text-[12.5px] mt-1" style={{ color: T.ink, fontWeight: 500, lineHeight: 1.4 }}>
                    Custom classification rules for your firm
                  </div>
                </div>
                <ArrowRight size={14} style={{ color: T.copper, marginTop: 3, flexShrink: 0 }}/>
              </a>
            </div>
          </div>
        </main>

        <aside className="col-span-2">
          <div className="sticky top-24 flex flex-col gap-5">
            <div className="p-4 rounded-[3px]" style={{ background: T.surface, border: `1px solid ${T.rule}` }}>
              <div className="text-[10px] uppercase tracking-[0.16em] mb-2 flex items-center gap-1.5" style={{ color: T.copper, fontWeight: 500 }}>
                <Sparkles size={10}/> Ask AI
              </div>
              <div className="text-[11.5px]" style={{ color: T.ink2, lineHeight: 1.55 }}>
                Have a specific question about this article? Ask the AI handbook with full context.
              </div>
              <button className="mt-3 w-full text-[11px] py-2 rounded-[3px] flex items-center justify-center gap-1.5" style={{ background: T.copper, color: T.surface, fontWeight: 500 }}>
                <MessageCircle size={11}/> Ask question
              </button>
            </div>

            <div>
              <div className="text-[10px] uppercase tracking-[0.16em] mb-2" style={{ color: T.muted, fontWeight: 500 }}>
                Tags
              </div>
              <div className="flex flex-wrap gap-1.5">
                {['ai', 'documents', 'classification', 'inbox', 'automation', 'privacy'].map(t => (
                  <span key={t} className="text-[10px] px-2 py-[3px] rounded-[2px]" style={{ background: T.surface2, color: T.ink2, border: `1px solid ${T.rule}` }}>
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="text-[10px] uppercase tracking-[0.16em] mb-2" style={{ color: T.muted, fontWeight: 500 }}>
                Updated
              </div>
              <ul className="text-[10.5px] flex flex-col gap-1.5" style={{ color: T.muted }}>
                <li><span style={{ fontFamily: FONT_MONO }}>May 5</span> · current</li>
                <li><span style={{ fontFamily: FONT_MONO }}>Apr 14</span> · added §168(k) note</li>
                <li><span style={{ fontFamily: FONT_MONO }}>Mar 22</span> · initial publish</li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

/* ============================================================
   ARTICLE PRIMITIVES
   ============================================================ */
function Section({ id, title, children }) {
  return (
    <section id={id} className="mb-10">
      <h2
        style={{
          fontFamily: FONT_DISPLAY, fontSize: 32, lineHeight: 1.1,
          letterSpacing: '-0.015em', color: T.ink, fontStyle: 'italic',
          paddingBottom: 12, marginBottom: 16,
          borderBottom: `1px solid ${T.rule}`,
        }}
      >
        {title}
      </h2>
      <div>{children}</div>
    </section>
  );
}

function SubSection({ id, title, children }) {
  return (
    <section id={id} className="mt-7 mb-6">
      <h3
        style={{
          fontFamily: FONT_DISPLAY, fontSize: 22, lineHeight: 1.2,
          letterSpacing: '-0.01em', color: T.ink, fontStyle: 'italic',
          marginBottom: 10,
        }}
      >
        {title}
      </h3>
      <div>{children}</div>
    </section>
  );
}

function DocTypeGrid() {
  const types = [
    { l: 'W-2',                  c: 'wages',     icon: FileText },
    { l: '1099 (all variants)',   c: 'income',    icon: FileText },
    { l: 'Bank statements',       c: 'banking',   icon: Receipt },
    { l: 'Brokerage statements',  c: 'invest',    icon: BarChart3 },
    { l: 'K-1s',                   c: 'partner',   icon: FileText },
    { l: 'Property tax bills',    c: 'real est.', icon: Building2 },
    { l: 'Engagement letters',    c: 'legal',     icon: FileSignature },
    { l: 'IRS notices (CP-series)',c: 'IRS',       icon: AlertTriangle },
  ];
  return (
    <div className="my-5 grid grid-cols-2 gap-1.5">
      {types.map((t, i) => {
        const Icon = t.icon;
        return (
          <div key={i} className="p-2.5 rounded-[2px] flex items-center gap-2.5" style={{ background: T.surface, border: `1px solid ${T.rule}` }}>
            <div className="flex items-center justify-center shrink-0" style={{ width: 24, height: 24, background: T.surface2, border: `1px solid ${T.rule}`, borderRadius: 3 }}>
              <Icon size={11} style={{ color: T.primary }}/>
            </div>
            <div className="flex-1 text-[12px]" style={{ color: T.ink, fontWeight: 500 }}>{t.l}</div>
            <span className="text-[9.5px]" style={{ color: T.muted, fontFamily: FONT_MONO }}>{t.c}</span>
          </div>
        );
      })}
    </div>
  );
}

function ConfidenceTable() {
  const rows = [
    { range: '0.95 – 1.00', tone: T.ok,     action: 'Auto-route silently · log only' },
    { range: '0.85 – 0.95', tone: T.gold,   action: 'Auto-route · flag for batch review' },
    { range: '0.70 – 0.85', tone: T.warn,   action: 'Hold for one-tap human confirmation' },
    { range: '< 0.70',       tone: T.danger, action: 'Manual review required · do not route' },
  ];
  return (
    <div className="my-5 rounded-[3px] overflow-hidden" style={{ background: T.surface, border: `1px solid ${T.rule}` }}>
      <div
        className="grid grid-cols-12 px-4 py-2 text-[9.5px] uppercase tracking-[0.14em]"
        style={{ color: T.muted, borderBottom: `1px solid ${T.rule}`, background: T.surface2 }}
      >
        <div className="col-span-3">Confidence</div>
        <div className="col-span-9">What happens</div>
      </div>
      {rows.map((r, i) => (
        <div key={i} className="grid grid-cols-12 px-4 py-3 items-center" style={{ borderBottom: i < rows.length - 1 ? `1px solid ${T.rule}` : 'none' }}>
          <div className="col-span-3 flex items-center gap-2">
            <span className="rounded-full" style={{ width: 6, height: 6, background: r.tone }}/>
            <span className="text-[12px]" style={{ color: T.ink, fontFamily: FONT_MONO, fontWeight: 500 }}>{r.range}</span>
          </div>
          <div className="col-span-9 text-[12.5px]" style={{ color: T.ink2 }}>{r.action}</div>
        </div>
      ))}
    </div>
  );
}

function CalloutBox({ tone = 'copper', icon: Icon, title, children }) {
  const tones = {
    copper:  { bg: '#FBF1E0', bd: T.copper, fg: T.copper },
    primary: { bg: '#E5EFEE', bd: T.primary, fg: T.primary },
    ok:      { bg: '#E2EBE3', bd: T.ok, fg: T.ok },
  };
  const c = tones[tone] || tones.copper;
  return (
    <div
      className="my-5 p-4 rounded-[3px] flex items-start gap-3"
      style={{ background: c.bg, border: `1px solid ${c.bd}30`, borderLeft: `3px solid ${c.bd}` }}
    >
      <Icon size={16} style={{ color: c.fg, marginTop: 2, flexShrink: 0 }}/>
      <div>
        <div className="text-[11px] uppercase tracking-[0.14em] mb-1" style={{ color: c.fg, fontWeight: 600 }}>{title}</div>
        <div className="text-[13px]" style={{ color: T.ink2, lineHeight: 1.6 }}>{children}</div>
      </div>
    </div>
  );
}

function CodeSnippet({ language, code }) {
  return (
    <div className="my-5 rounded-[3px] overflow-hidden" style={{ background: T.primaryDk, color: '#D4CDB6' }}>
      <div className="px-4 py-2 flex items-center justify-between" style={{ borderBottom: `1px solid rgba(255,253,248,0.10)` }}>
        <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.14em]" style={{ color: 'rgba(255,253,248,0.5)', fontFamily: FONT_MONO, fontWeight: 500 }}>
          <Terminal size={10}/> {language}
        </div>
        <button className="text-[10px] flex items-center gap-1" style={{ color: 'rgba(255,253,248,0.6)' }}>
          <Copy size={10}/> Copy
        </button>
      </div>
      <pre style={{ margin: 0, padding: 16, fontFamily: FONT_MONO, fontSize: 12, lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
        {code}
      </pre>
    </div>
  );
}

/* ============================================================
   COMMAND-K SEARCH MODAL
   ============================================================ */
function SearchModal({ open, onClose, onArticle }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        const input = document.getElementById('search-input');
        if (input) input.focus();
      }, 50);
    }
  }, [open]);

  if (!open) return null;

  const results = query
    ? POPULAR_ARTICLES.filter(a => a.title.toLowerCase().includes(query.toLowerCase()))
    : POPULAR_ARTICLES.slice(0, 5);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-6"
      style={{ background: 'rgba(20,15,8,0.55)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[680px] rounded-[6px] overflow-hidden"
        style={{
          background: T.surface,
          border: `1px solid ${T.rule}`,
          boxShadow: '0 60px 120px -30px rgba(20,15,8,0.5)',
          fontFamily: FONT_BODY,
        }}
      >
        <div className="flex items-center gap-3 px-5 py-4" style={{ borderBottom: `1px solid ${T.rule}` }}>
          <Search size={16} style={{ color: T.copper }}/>
          <input
            id="search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask a question or search the docs…"
            className="flex-1 bg-transparent outline-none text-[15px]"
            style={{ color: T.ink, fontFamily: FONT_BODY }}
          />
          <button
            onClick={onClose}
            className="text-[10px] px-2 py-1 rounded-[2px]"
            style={{ background: T.surface2, color: T.muted, border: `1px solid ${T.rule}`, fontFamily: FONT_MONO }}
          >
            ESC
          </button>
        </div>

        {query && (
          <div className="px-5 py-3 flex items-center gap-2.5" style={{ background: '#FBF1E0', borderBottom: `1px solid ${T.rule}` }}>
            <Sparkles size={13} style={{ color: T.copper }}/>
            <span className="flex-1 text-[12px]" style={{ color: T.ink2 }}>
              <span style={{ color: T.ink, fontWeight: 500 }}>Ask AI: </span>
              <span style={{ fontStyle: 'italic' }}>"{query}"</span>
            </span>
            <button className="text-[11px] flex items-center gap-1.5 px-2.5 py-1 rounded-[2px]" style={{ background: T.copper, color: T.surface, fontWeight: 500 }}>
              Ask <ArrowRight size={10}/>
            </button>
          </div>
        )}

        <div className="max-h-[420px] overflow-y-auto">
          <div className="px-5 py-2 text-[9.5px] uppercase tracking-[0.16em]" style={{ color: T.muted, fontWeight: 500, background: T.surface2 }}>
            {query ? `${results.length} matches` : 'Popular articles'}
          </div>
          {results.map((a, i) => {
            const cat = CATEGORIES.find(c => c.id === a.cat);
            const Icon = cat?.icon || FileText;
            return (
              <button
                key={a.id}
                onClick={() => { onArticle(a); onClose(); }}
                className="w-full flex items-start gap-3 px-5 py-3 text-left"
                style={{ borderBottom: i < results.length - 1 ? `1px solid ${T.rule}` : 'none' }}
              >
                <div
                  className="flex items-center justify-center shrink-0 mt-0.5"
                  style={{ width: 26, height: 26, background: T.surface2, border: `1px solid ${T.rule}`, borderRadius: 3 }}
                >
                  <Icon size={11} style={{ color: cat?.color }}/>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px]" style={{ color: T.ink, fontWeight: 500 }}>{a.title}</div>
                  <div className="text-[10.5px] mt-0.5" style={{ color: T.muted }}>
                    {cat?.title} · {a.readTime}
                  </div>
                </div>
                <ChevronRight size={13} style={{ color: T.faint, marginTop: 6 }}/>
              </button>
            );
          })}
        </div>

        <div className="px-5 py-3 flex items-center justify-between text-[10.5px]" style={{ background: T.surface2, color: T.muted, borderTop: `1px solid ${T.rule}` }}>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span className="px-1.5 py-[1px] rounded-[2px]" style={{ background: T.surface, border: `1px solid ${T.rule}`, fontFamily: FONT_MONO, fontSize: 9 }}>↑↓</span>
              navigate
            </span>
            <span className="flex items-center gap-1">
              <span className="px-1.5 py-[1px] rounded-[2px]" style={{ background: T.surface, border: `1px solid ${T.rule}`, fontFamily: FONT_MONO, fontSize: 9 }}>↵</span>
              open
            </span>
            <span className="flex items-center gap-1">
              <span className="px-1.5 py-[1px] rounded-[2px]" style={{ background: T.surface, border: `1px solid ${T.rule}`, fontFamily: FONT_MONO, fontSize: 9 }}>esc</span>
              close
            </span>
          </div>
          <div className="flex items-center gap-1.5" style={{ color: T.copper, fontWeight: 500 }}>
            <Sparkles size={10}/>
            <span>AI search powered by Ledger</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   APP
   ============================================================ */
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [view, setView] = useState('home');
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const id = 'ledger-help-fonts';
    if (document.getElementById(id)) return;
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap';
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === 'Escape') setSearchOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const openArticle = useCallback((a) => {
    setView('article');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div style={{ background: T.bg, color: T.ink, fontFamily: FONT_BODY }}>
      <TopNav scrolled={scrolled} onSearch={() => setSearchOpen(true)} onHome={() => setView('home')}/>

      {view === 'home' && (
        <>
          <Hero onSearch={() => setSearchOpen(true)}/>
          <Paths/>
          <Categories/>
          <PopularAndNew onArticle={openArticle}/>
          <Footer/>
        </>
      )}

      {view === 'article' && (
        <ArticleReader onBack={() => setView('home')}/>
      )}

      <SearchModal
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onArticle={openArticle}
      />
    </div>
  );
}
