import React, { useState, useEffect, useCallback } from 'react';
import {
  ArrowRight, ArrowLeft, ChevronRight, ChevronDown, ChevronUp,
  ExternalLink, Play, Pause, X, Sparkles, Zap, Brain, Shield,
  Lock, Globe, Users, User, Building2, Factory, Truck, HardHat,
  TrendingUp, ArrowUpRight, Target, CheckCircle2, Circle, Star,
  FileText, FileCheck, FileSignature, Calendar, Clock, Receipt,
  MessageSquare, Inbox, Bell, Calculator, BookOpen, Library,
  Award, BarChart3, Activity, Layers, Hash, AtSign, Mail, Phone,
  MapPin, Plus, Filter, Search, Quote, Heart, Settings, Pin,
  Smartphone, Monitor, Code, LayoutDashboard, Palette, Briefcase,
  Eye, Send, Camera, Upload, CreditCard, ShieldCheck, Database,
  Server, Wifi, Volume2, Maximize2, Download, Share2, Copy,
  Snowflake, Flame, RefreshCw, MoreHorizontal, AlertTriangle,
  Mic, Image as ImageIcon, BadgeCheck, Compass, Map, Link2,
  Scale, Pencil, Globe2, GitBranch,
} from 'lucide-react';

/* ============================================================
   THEME
   ============================================================ */
const T = {
  bg:        '#F4EFE6',
  bgDeep:    '#EAE3D0',
  surface:   '#FFFDF8',
  surface2:  '#FAF6EC',
  surface3:  '#F5EFE0',
  ink:       '#171411',
  ink2:      '#3B342B',
  muted:     '#7A7163',
  faint:     '#B5AC9B',
  rule:      '#E5DDC9',
  rule2:     '#D9CFB6',
  primary:   '#0B3D3A',
  primary2:  '#1A5C57',
  primaryDk: '#062624',
  copper:    '#C46A2D',
  copperLt:  '#E89762',
  gold:      '#B8893C',
  ok:        '#3F7355',
  warn:      '#C28A2A',
  danger:    '#A8402E',
};

const FONT_DISPLAY = '"Instrument Serif", "Times New Roman", serif';
const FONT_BODY    = '"Geist", "Inter", system-ui, sans-serif';
const FONT_MONO    = '"JetBrains Mono", ui-monospace, monospace';

/* ============================================================
   ARTIFACTS — 11 pieces of the suite
   ============================================================ */
const CHAPTERS = [
  {
    num: '01',
    actId: 'I',
    id: 'marketing',
    title: 'Marketing site',
    audience: 'Prospects · pre-signup',
    blurb: 'Editorial landing page with hero, problem framing, four-feature deep dive, AI banner, pricing, and comparison matrix. Built so a Wyoming oil & gas operator scrolling on their phone gets the message in 90 seconds.',
    tone: 'light',
    icon: Globe2,
    palette: T.copper,
    stats: [{ k: 'Sections', v: '9' }, { k: 'CTA blocks', v: '4' }, { k: 'Read time', v: '4 min' }],
  },
  {
    num: '02',
    actId: 'I',
    id: 'onboarding',
    title: 'Onboarding flow',
    audience: 'New firms · first 8 minutes',
    blurb: 'Seven-step setup wizard. Account → firm profile → migrate clients → integrations → team → white-label → finish. Real form state, real migration animation, real celebration screen.',
    tone: 'light',
    icon: Compass,
    palette: T.primary,
    stats: [{ k: 'Steps', v: '7' }, { k: 'Migration sources', v: '5' }, { k: 'Avg duration', v: '8 min' }],
  },
  {
    num: '03',
    actId: 'II',
    id: 'dashboard',
    title: 'Practice dashboard',
    audience: 'EAs · CPAs · daily desktop',
    blurb: 'The home base. Tax season pulse, KPI strip, client health × revenue scatter, predictive deadline radar, AI document inbox, automation proposals, revenue trend, activity feed.',
    tone: 'light',
    icon: LayoutDashboard,
    palette: T.primary,
    stats: [{ k: 'Live panels', v: '8' }, { k: 'Demo clients', v: '10' }, { k: 'Refresh rate', v: '34s' }],
  },
  {
    num: '04',
    actId: 'II',
    id: 'portal',
    title: 'Client portal · desktop',
    audience: 'Your clients · on a browser',
    blurb: 'What your client sees when they log in. Welcome hero, engagement timeline, action items board, AI-generated tax picture with deduction mix donut, recent activity. Co-branded with your firm.',
    tone: 'light',
    icon: User,
    palette: T.copper,
    stats: [{ k: 'Action types', v: '4' }, { k: 'Working flows', v: 'Sign · Upload' }, { k: 'White-label', v: 'Built-in' }],
  },
  {
    num: '05',
    actId: 'II',
    id: 'mobile',
    title: 'Mobile companion',
    audience: 'Clients · in their pocket',
    blurb: 'iOS-shaped phone frame with bottom tab nav and four working bottom sheets — sign engagement, snap-and-upload with AI extraction, pay invoice, review depreciation election. Built for truck cabs and job sites.',
    tone: 'light',
    icon: Smartphone,
    palette: T.gold,
    stats: [{ k: 'Tabs', v: '5' }, { k: 'Bottom sheets', v: '4' }, { k: 'Phone frames', v: '3' }],
  },
  {
    num: '06',
    actId: 'III',
    id: 'research',
    title: 'AI Research workspace',
    audience: 'EAs · daily research tool',
    blurb: 'Six-tool research IDE. Ask AI with structured citations, IRC + regs browser, case law library, depreciation calculator, drafting workspace with inline citations, saved snippet library. Grounded, cited, no hallucinations.',
    tone: 'light',
    icon: Sparkles,
    palette: T.copper,
    stats: [{ k: 'Tools', v: '6' }, { k: 'Citations', v: '6 sources' }, { k: 'Drafting', v: 'Inline cites' }],
  },
  {
    num: '07',
    actId: 'III',
    id: 'warroom',
    title: 'Tax season war room',
    audience: 'Firm partners · 60 days around April 15',
    blurb: 'Real-time ops dashboard. 7-stage pipeline kanban with 21 client cards, team load panel with rebalance suggestions, throughput chart, stuck engagements, live activity stream, deadline strip. Refreshes every 3 seconds.',
    tone: 'dark',
    icon: Activity,
    palette: T.copperLt,
    stats: [{ k: 'Pipeline stages', v: '7' }, { k: 'Live engagements', v: '21' }, { k: 'Sync', v: 'Every 3s' }],
  },
  {
    num: '08',
    actId: 'IV',
    id: 'settings',
    title: 'Settings & Team',
    audience: 'Firm admins · configuration',
    blurb: 'Seven-tab operational backbone. Firm profile, team & roles with full permission matrix, plan & billing with usage, integrations with reauth states, white-label live preview, security posture scoring, immutable audit log.',
    tone: 'light',
    icon: Settings,
    palette: T.primary2,
    stats: [{ k: 'Tabs', v: '7' }, { k: 'Permission rows', v: '7×5' }, { k: 'Audit retention', v: '7 yrs' }],
  },
  {
    num: '09',
    actId: 'IV',
    id: 'emails',
    title: 'Email templates',
    audience: 'Clients · in their inbox',
    blurb: 'Nine production-quality emails across six categories. Welcome, engagement letter, doc request, deadline reminder, IRS notice, invoice, payment receipt, return filed, weekly partner digest. Desktop, mobile, and HTML source views.',
    tone: 'light',
    icon: Mail,
    palette: T.gold,
    stats: [{ k: 'Templates', v: '9' }, { k: 'Categories', v: '6' }, { k: 'View modes', v: '3' }],
  },
  {
    num: '10',
    actId: 'V',
    id: 'deck',
    title: 'Investor pitch deck',
    audience: 'Capital partners · strategic conversations',
    blurb: 'Twelve-slide Series A deck in 16:9 with present mode and keyboard nav. Cover, opening, problem, why now, product, intelligence, wedge, market size, business model, traction, team, the ask.',
    tone: 'dark',
    icon: BarChart3,
    palette: T.copper,
    stats: [{ k: 'Slides', v: '12' }, { k: 'Charts', v: '5' }, { k: 'Round size', v: '$14M' }],
  },
  {
    num: '11',
    actId: 'V',
    id: 'tour',
    title: 'Product tour · this page',
    audience: 'Anyone evaluating Ledger',
    blurb: 'The master index. One canvas that links every artifact, shows how the suite hangs together, and lets prospects, investors, partners, or recruits navigate the entire story without losing their place.',
    tone: 'light',
    icon: Map,
    palette: T.copperLt,
    stats: [{ k: 'Artifacts', v: '11' }, { k: 'Acts', v: '5' }, { k: 'Self-referential', v: '1' }],
  },
];

/* The 5-act narrative structure */
const ACTS = [
  { id: 'I',   title: 'Acquisition',   blurb: 'How prospects find us · how firms sign up',                  chapters: ['marketing', 'onboarding'] },
  { id: 'II',  title: 'Daily product', blurb: 'The screens used every working day',                          chapters: ['dashboard', 'portal', 'mobile'] },
  { id: 'III', title: 'Power tools',    blurb: 'Where AI moves the EA from operator to strategist',           chapters: ['research', 'warroom'] },
  { id: 'IV',  title: 'Operations',     blurb: 'Backbone configuration · client communication',                chapters: ['settings', 'emails'] },
  { id: 'V',   title: 'Story & meta',   blurb: 'The narrative that ties product to capital',                  chapters: ['deck', 'tour'] },
];

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
    dark:    { bg: T.primaryDk, fg: T.copperLt, bd: T.primaryDk },
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
   STICKY NAV
   ============================================================ */
function Nav({ scrolled, scrollTo }) {
  return (
    <nav
      className="sticky top-0 z-40 transition-all"
      style={{
        background: scrolled ? 'rgba(244,239,230,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? `1px solid ${T.rule}` : '1px solid transparent',
        fontFamily: FONT_BODY,
      }}
    >
      <div className="mx-auto max-w-[1340px] px-10 py-4 flex items-center">
        <div className="flex items-center gap-2.5">
          <div
            className="flex items-center justify-center"
            style={{
              width: 30, height: 30, borderRadius: 4, background: T.primary,
              color: T.surface, fontFamily: FONT_DISPLAY, fontSize: 22, fontStyle: 'italic',
              lineHeight: 1, paddingBottom: 4,
            }}
          >L</div>
          <span style={{ fontFamily: FONT_DISPLAY, fontSize: 22, color: T.ink, lineHeight: 1, letterSpacing: '-0.01em' }}>
            Ledger<span style={{ color: T.copper }}>.</span>
          </span>
          <span className="ml-3 text-[10px] uppercase tracking-[0.18em]" style={{ color: T.muted }}>
            Vol. IV · Product Tour
          </span>
        </div>

        <div className="ml-12 flex items-center gap-7">
          {ACTS.map(a => (
            <button
              key={a.id}
              onClick={() => scrollTo(`act-${a.id}`)}
              className="text-[12px]"
              style={{ color: T.ink2 }}
            >
              <span style={{ color: T.copper, fontFamily: FONT_MONO, marginRight: 6, fontSize: 10 }}>{a.id}</span>
              {a.title}
            </button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-3">
          <span className="text-[11px]" style={{ color: T.muted }}>11 artifacts</span>
          <button
            className="px-3.5 py-2 text-[12px] flex items-center gap-1.5 rounded-[3px]"
            style={{ background: T.primary, color: T.surface, fontWeight: 500 }}
          >
            Book a walkthrough <ArrowRight size={12}/>
          </button>
        </div>
      </div>
    </nav>
  );
}

/* ============================================================
   HERO
   ============================================================ */
function Hero() {
  return (
    <section className="relative overflow-hidden" style={{ background: T.bg }}>
      {/* atmosphere */}
      <div
        aria-hidden
        style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(circle at 80% 20%, rgba(196,106,45,0.10), transparent 50%),
                       radial-gradient(circle at 10% 90%, rgba(11,61,58,0.08), transparent 55%)`,
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute', inset: 0, opacity: 0.4,
          backgroundImage: `linear-gradient(${T.rule} 1px, transparent 1px), linear-gradient(90deg, ${T.rule} 1px, transparent 1px)`,
          backgroundSize: '120px 120px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        }}
      />

      <div className="relative mx-auto max-w-[1340px] px-10 pt-16 pb-20">
        <div className="flex items-center gap-3 mb-7">
          <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: T.copper, fontFamily: FONT_BODY, fontWeight: 500 }}>00</span>
          <span style={{ width: 24, height: 1, background: T.rule2 }}/>
          <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: T.muted, fontFamily: FONT_BODY }}>The complete suite</span>
        </div>

        <h1
          style={{
            fontFamily: FONT_DISPLAY, fontSize: 110, lineHeight: 0.94,
            letterSpacing: '-0.03em', color: T.ink, fontStyle: 'italic',
            maxWidth: 1100,
          }}
        >
          One product story.<br/>
          <span style={{ color: T.copper }}>Eleven artifacts.</span><br/>
          The whole arc.
        </h1>

        <p
          className="mt-9 max-w-[680px]"
          style={{ fontFamily: FONT_BODY, fontSize: 17, color: T.ink2, lineHeight: 1.55 }}
        >
          From the marketing page that wins the prospect, through the 8-minute onboarding,
          past every screen used in daily practice, into the ops control surface for tax season,
          and out the other side as a Series A pitch — Ledger is one product, told fully.
        </p>

        <div className="mt-10 flex items-center gap-3">
          <button
            className="px-5 py-3 text-[13px] flex items-center gap-1.5 rounded-[3px]"
            style={{ background: T.primary, color: T.surface, fontWeight: 500, fontFamily: FONT_BODY }}
          >
            Walk the suite <ArrowRight size={13}/>
          </button>
          <button
            className="px-5 py-3 text-[13px] flex items-center gap-1.5 rounded-[3px]"
            style={{ background: 'transparent', color: T.ink, border: `1px solid ${T.rule2}`, fontFamily: FONT_BODY, fontWeight: 500 }}
          >
            <Play size={12}/> Watch the 4-min tour
          </button>
        </div>

        {/* Big stat strip */}
        <div className="mt-20 grid grid-cols-12 gap-px" style={{ background: T.rule, border: `1px solid ${T.rule}` }}>
          {[
            { v: '11', l: 'Artifacts in the suite',                d: 'each one production-grade' },
            { v: '5',  l: 'Acts that connect them',                 d: 'acquisition → narrative' },
            { v: '21', l: 'Demo clients across the products',       d: 'Wyoming book wired in' },
            { v: '1',  l: 'Brand world',                             d: 'one unified design language' },
          ].map((s, i) => (
            <div key={i} className="col-span-3 px-6 py-6" style={{ background: T.bg }}>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 64, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.03em', lineHeight: 1 }}>
                {s.v}
              </div>
              <div className="text-[12.5px] mt-3" style={{ color: T.ink2, fontFamily: FONT_BODY, fontWeight: 500, lineHeight: 1.4 }}>
                {s.l}
              </div>
              <div className="text-[10.5px] mt-1.5 italic" style={{ color: T.muted, fontFamily: FONT_BODY }}>
                {s.d}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   ACT INTRO
   ============================================================ */
function ActIntro({ act, scrollTo }) {
  return (
    <div id={`act-${act.id}`} className="mx-auto max-w-[1340px] px-10 pt-20 pb-10">
      <div className="grid grid-cols-12 gap-12 items-end">
        <div className="col-span-7">
          <div className="flex items-baseline gap-3 mb-5">
            <span style={{ fontFamily: FONT_DISPLAY, fontSize: 80, color: T.copper, fontStyle: 'italic', letterSpacing: '-0.04em', lineHeight: 0.85 }}>
              Act {act.id}
            </span>
            <span style={{ width: 80, height: 1, background: T.rule2, marginBottom: 18 }}/>
          </div>
          <h2
            style={{
              fontFamily: FONT_DISPLAY, fontSize: 56, lineHeight: 1.0,
              letterSpacing: '-0.025em', color: T.ink, fontStyle: 'italic',
            }}
          >
            {act.title}.
          </h2>
        </div>
        <div className="col-span-5">
          <p style={{ fontFamily: FONT_BODY, fontSize: 15, color: T.ink2, lineHeight: 1.65 }}>
            {act.blurb}
          </p>
          <div className="mt-3 text-[10.5px] uppercase tracking-[0.16em]" style={{ color: T.muted, fontFamily: FONT_BODY }}>
            <span style={{ color: T.copper, fontWeight: 500 }}>{act.chapters.length}</span> chapter{act.chapters.length > 1 ? 's' : ''} below
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   ARTIFACT CARDS — preview generators
   ============================================================ */
function MarketingPreview() {
  return (
    <div className="w-full h-full flex flex-col" style={{ background: T.bg, fontFamily: FONT_BODY }}>
      <div className="px-6 py-4 flex items-center" style={{ borderBottom: `1px solid ${T.rule}` }}>
        <div className="flex items-center gap-2">
          <div style={{ width: 22, height: 22, borderRadius: 3, background: T.primary, color: T.surface, fontFamily: FONT_DISPLAY, fontSize: 16, fontStyle: 'italic', lineHeight: 1, paddingBottom: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>L</div>
          <span style={{ fontFamily: FONT_DISPLAY, fontSize: 15, color: T.ink, letterSpacing: '-0.01em' }}>Ledger<span style={{ color: T.copper }}>.</span></span>
        </div>
        <div className="ml-auto flex gap-3 text-[9.5px]" style={{ color: T.muted }}>
          <span>Product</span><span>Pricing</span><span>Customers</span>
        </div>
      </div>
      <div className="flex-1 px-6 pt-7 pb-4 flex flex-col">
        <div style={{ fontSize: 8.5, letterSpacing: '0.22em', color: T.copper, textTransform: 'uppercase', fontWeight: 500, marginBottom: 8 }}>
          01 — A practice suite for the post-AI era
        </div>
        <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 32, lineHeight: 0.95, letterSpacing: '-0.025em', fontStyle: 'italic', color: T.ink }}>
          The practice suite<br/>that thinks <span style={{ color: T.copper }}>ahead</span><br/>of you.
        </h3>
        <div className="flex items-center gap-2 mt-4">
          <span className="px-2 py-1 rounded-[2px]" style={{ background: T.primary, color: T.surface, fontSize: 9, fontWeight: 500 }}>Start trial →</span>
          <span className="px-2 py-1 rounded-[2px]" style={{ border: `1px solid ${T.rule2}`, color: T.ink2, fontSize: 9 }}>Watch tour</span>
        </div>
      </div>
    </div>
  );
}

function OnboardingPreview() {
  return (
    <div className="w-full h-full flex" style={{ background: T.bg, fontFamily: FONT_BODY }}>
      {/* Sidebar */}
      <div style={{ width: '38%', background: T.primaryDk, color: T.surface, padding: 14, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: -30, top: -30, width: 100, height: 100, border: `1px solid rgba(255,253,248,0.08)`, borderRadius: '50%' }} aria-hidden/>
        <div className="flex items-center gap-1.5 mb-3">
          <div style={{ width: 18, height: 18, borderRadius: 2, background: T.copper, color: T.surface, fontSize: 11, fontFamily: FONT_DISPLAY, fontStyle: 'italic', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: 2, lineHeight: 1 }}>L</div>
          <span style={{ fontSize: 11, fontFamily: FONT_DISPLAY, fontStyle: 'italic' }}>Ledger.</span>
        </div>
        <div style={{ fontSize: 8, letterSpacing: '0.16em', color: T.copperLt, textTransform: 'uppercase', marginBottom: 6 }}>Welcome</div>
        <div style={{ fontFamily: FONT_DISPLAY, fontSize: 15, fontStyle: 'italic', letterSpacing: '-0.01em', lineHeight: 1.15 }}>
          Set up your practice in 8 minutes.
        </div>
        <div className="mt-3 h-[2px] rounded-full" style={{ background: 'rgba(255,253,248,0.12)' }}>
          <div style={{ height: '100%', width: '42%', background: T.copperLt }}/>
        </div>
        <div className="mt-3 flex flex-col gap-1.5">
          {['Welcome', 'Firm', 'Migrate', 'Connect', 'Team'].map((s, i) => (
            <div key={s} className="flex items-center gap-1.5">
              <span style={{ width: 12, height: 12, borderRadius: '50%', background: i < 2 ? T.ok : i === 2 ? T.copper : 'transparent', border: `1px solid ${i < 2 ? T.ok : i === 2 ? T.copper : 'rgba(255,253,248,0.25)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {i < 2 && <CheckCircle2 size={7} style={{ color: T.surface }} strokeWidth={3}/>}
              </span>
              <span style={{ fontSize: 9, color: i === 2 ? T.surface : 'rgba(255,253,248,0.6)', fontWeight: i === 2 ? 500 : 400 }}>
                {s}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Main */}
      <div className="flex-1 p-5">
        <div style={{ fontSize: 8.5, letterSpacing: '0.22em', color: T.copper, textTransform: 'uppercase', fontWeight: 500, marginBottom: 6 }}>
          03 — Migrate clients
        </div>
        <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 24, lineHeight: 1.0, letterSpacing: '-0.02em', fontStyle: 'italic', color: T.ink }}>
          Bring your book over.
        </h3>
        <div className="grid grid-cols-3 gap-1.5 mt-3">
          {['TaxDome', 'Canopy', 'Karbon'].map((s, i) => (
            <div key={s} className="p-2 rounded-[2px]" style={{ background: T.surface, border: `1px solid ${T.rule}` }}>
              <div style={{ width: 18, height: 18, borderRadius: 3, background: T.surface2, border: `1px solid ${T.rule}`, color: T.primary, fontFamily: FONT_DISPLAY, fontStyle: 'italic', fontSize: 10, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {s.slice(0, 2)}
              </div>
              <div style={{ fontSize: 9, color: T.ink, fontWeight: 500, marginTop: 4 }}>{s}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DashboardPreview() {
  return (
    <div className="w-full h-full flex flex-col" style={{ background: T.bg, fontFamily: FONT_BODY }}>
      <div className="px-4 py-2 flex items-center gap-2" style={{ background: T.surface, borderBottom: `1px solid ${T.rule}` }}>
        <div className="flex gap-1">
          <span className="w-2 h-2 rounded-full" style={{ background: '#E5C0AC' }}/>
          <span className="w-2 h-2 rounded-full" style={{ background: '#EAD79A' }}/>
          <span className="w-2 h-2 rounded-full" style={{ background: '#B8D4BE' }}/>
        </div>
        <span className="ml-2 text-[8.5px] uppercase tracking-[0.14em]" style={{ color: T.muted }}>Practice / Dashboard</span>
      </div>
      {/* Hero */}
      <div className="m-3 rounded-[3px] p-3 relative overflow-hidden" style={{ background: T.primary, color: T.surface }}>
        <div style={{ position: 'absolute', right: -16, top: -16, width: 64, height: 64, border: `1px solid rgba(255,253,248,0.10)`, borderRadius: '50%' }} aria-hidden/>
        <div style={{ fontSize: 7.5, letterSpacing: '0.18em', color: T.copperLt, textTransform: 'uppercase' }}>Tax Season · post-April</div>
        <div style={{ fontFamily: FONT_DISPLAY, fontSize: 15, fontStyle: 'italic', marginTop: 3, lineHeight: 1.15, letterSpacing: '-0.01em' }}>
          5 days. Q1 941 due Apr 30.
        </div>
        <div className="mt-2 h-[2px] rounded-full" style={{ background: 'rgba(255,253,248,0.15)' }}>
          <div style={{ width: '62%', height: '100%', background: T.copperLt, borderRadius: 999 }}/>
        </div>
      </div>
      {/* KPIs + scatter */}
      <div className="px-3 grid grid-cols-3 gap-1.5">
        {[['42','clients'],['$16k','MRR'],['28','tasks']].map(([v, l]) => (
          <div key={l} className="p-1.5 rounded-[2px]" style={{ background: T.surface2, border: `1px solid ${T.rule}` }}>
            <div style={{ fontSize: 7, letterSpacing: '0.14em', color: T.muted, textTransform: 'uppercase' }}>{l}</div>
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 14, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.01em', marginTop: 1 }}>{v}</div>
          </div>
        ))}
      </div>
      <div className="m-3 mt-2 p-2 rounded-[2px] flex-1" style={{ background: T.surface, border: `1px solid ${T.rule}` }}>
        <div style={{ fontSize: 7.5, letterSpacing: '0.14em', color: T.muted, textTransform: 'uppercase', marginBottom: 4 }}>Health × Revenue</div>
        <svg viewBox="0 0 200 80" width="100%">
          <line x1={6} y1={64} x2={194} y2={64} stroke={T.rule} strokeWidth={0.5}/>
          <line x1={100} y1={6} x2={100} y2={64} stroke={T.rule} strokeWidth={0.5} strokeDasharray="2 3"/>
          {[
            { x: 170, y: 18, c: T.ok }, { x: 145, y: 25, c: T.ok }, { x: 130, y: 30, c: T.ok },
            { x: 90, y: 36, c: T.warn }, { x: 70, y: 48, c: T.warn },
            { x: 40, y: 52, c: T.danger }, { x: 30, y: 58, c: T.danger },
          ].map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r={4} fill={p.c} stroke={T.surface} strokeWidth={1}/>
          ))}
        </svg>
      </div>
    </div>
  );
}

function PortalPreview() {
  return (
    <div className="w-full h-full flex flex-col" style={{ background: T.bg, fontFamily: FONT_BODY }}>
      <div className="px-4 py-2 flex items-center gap-2" style={{ background: T.surface, borderBottom: `1px solid ${T.rule}` }}>
        <div style={{ width: 18, height: 18, borderRadius: 3, background: T.primary, color: T.surface, fontFamily: FONT_DISPLAY, fontSize: 11, fontStyle: 'italic', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: 2, lineHeight: 1 }}>H</div>
        <span style={{ fontFamily: FONT_DISPLAY, fontSize: 12, color: T.ink, fontStyle: 'italic' }}>HYK Tax<span style={{ color: T.copper }}>.</span></span>
        <span className="ml-1 text-[7.5px] uppercase tracking-[0.14em]" style={{ color: T.muted }}>Client Portal</span>
      </div>
      {/* Hero */}
      <div className="m-3 rounded-[3px] p-3 relative overflow-hidden" style={{ background: T.primary, color: T.surface }}>
        <div style={{ position: 'absolute', right: -16, top: -16, width: 64, height: 64, border: `1px solid rgba(255,253,248,0.10)`, borderRadius: '50%' }} aria-hidden/>
        <div style={{ fontSize: 7.5, letterSpacing: '0.18em', color: T.copperLt, textTransform: 'uppercase' }}>Apr 25</div>
        <div style={{ fontFamily: FONT_DISPLAY, fontSize: 18, fontStyle: 'italic', marginTop: 3, lineHeight: 1.1, letterSpacing: '-0.01em' }}>
          Welcome back,<br/>Cody.
        </div>
        <div style={{ fontSize: 9, marginTop: 3, color: 'rgba(255,253,248,0.75)' }}>
          <span style={{ color: T.copperLt }}>4 items</span> need your attention.
        </div>
      </div>
      {/* Action items */}
      <div className="px-3 pb-3 grid grid-cols-2 gap-1.5">
        {[
          { i: FileSignature, t: 'Sign engagement', tone: 'med' },
          { i: Upload,         t: 'Upload Q1 stmt',  tone: 'high' },
          { i: Eye,            t: 'Confirm rig dep', tone: 'med' },
          { i: CreditCard,     t: 'Pay $1,850',       tone: 'low' },
        ].map((a, i) => {
          const Icon = a.i;
          return (
            <div key={i} className="p-1.5 rounded-[2px]" style={{ background: T.surface, border: `1px solid ${T.rule}` }}>
              <div className="flex items-center gap-1.5">
                <div style={{ width: 16, height: 16, borderRadius: 3, background: a.tone === 'high' ? T.copper : T.primary, color: T.surface, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={8}/>
                </div>
                <span style={{ fontSize: 8.5, color: T.ink, fontWeight: 500 }}>{a.t}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MobilePreview() {
  return (
    <div className="w-full h-full flex items-center justify-center" style={{ background: T.bgDeep, fontFamily: FONT_BODY }}>
      <div
        style={{
          width: 130, height: 240,
          background: '#1a1612', borderRadius: 22, padding: 4,
          boxShadow: '0 16px 30px -10px rgba(20,15,8,0.35)',
        }}
      >
        <div style={{ width: '100%', height: '100%', borderRadius: 18, background: T.bg, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ height: 16, padding: '4px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', fontSize: 7, fontWeight: 600 }}>
            <span>9:41</span>
            <div style={{ position: 'absolute', left: '50%', top: 4, transform: 'translateX(-50%)', width: 36, height: 8, background: '#000', borderRadius: 999 }}/>
            <Wifi size={6}/>
          </div>
          <div style={{ padding: '4px 10px' }}>
            <div style={{ fontSize: 6, letterSpacing: '0.16em', color: T.muted, textTransform: 'uppercase' }}>Apr 25</div>
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 13, fontStyle: 'italic', color: T.ink, letterSpacing: '-0.01em', marginTop: 1 }}>Hi, Cody.</div>
          </div>
          <div style={{ margin: '2px 6px', padding: 6, borderRadius: 4, background: T.primary, color: T.surface }}>
            <div style={{ fontSize: 5.5, letterSpacing: '0.14em', color: T.copperLt, textTransform: 'uppercase' }}>2025 · on track</div>
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 9, fontStyle: 'italic', marginTop: 1, lineHeight: 1.15 }}>
              4 things need<br/>your attention.
            </div>
          </div>
          <div style={{ padding: '4px 6px', display: 'flex', flexDirection: 'column', gap: 2 }}>
            {[FileSignature, Upload, Eye].map((Icon, i) => (
              <div key={i} style={{ background: T.surface, border: `1px solid ${T.rule}`, borderRadius: 3, padding: 3, display: 'flex', alignItems: 'center', gap: 4 }}>
                <div style={{ width: 12, height: 12, borderRadius: 2, background: i === 1 ? T.copper : T.primary, color: T.surface, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={6}/>
                </div>
                <span style={{ fontSize: 6, color: T.ink, fontWeight: 500 }}>Action {i + 1}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-around', padding: '4px 6px', borderTop: `1px solid ${T.rule}`, background: T.surface }}>
            {[Inbox, FileText, Plus, MessageSquare, User].map((Icon, i) => (
              <div key={i} style={{ width: 14, height: 14, borderRadius: '50%', background: i === 2 ? T.primary : 'transparent', color: i === 2 ? T.surface : T.muted, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={7}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ResearchPreview() {
  return (
    <div className="w-full h-full flex" style={{ background: T.bg, fontFamily: FONT_BODY }}>
      <div style={{ width: '24%', background: T.surface, borderRight: `1px solid ${T.rule}`, padding: 10 }}>
        <div className="flex items-center gap-1 mb-3">
          <div style={{ width: 16, height: 16, borderRadius: 2, background: T.primary, color: T.surface, fontSize: 10, fontFamily: FONT_DISPLAY, fontStyle: 'italic', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: 2, lineHeight: 1 }}>L</div>
          <span style={{ fontFamily: FONT_DISPLAY, fontSize: 11, fontStyle: 'italic' }}>Ledger.</span>
        </div>
        {[
          { i: Sparkles, l: 'Ask', a: true },
          { i: BookOpen, l: 'IRC' },
          { i: Scale, l: 'Cases' },
          { i: Calculator, l: 'Calc' },
          { i: FileText, l: 'Drafts' },
        ].map((tool, i) => {
          const Icon = tool.i;
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '3px 4px', background: tool.a ? T.surface2 : 'transparent', borderRadius: 2, borderLeft: `2px solid ${tool.a ? T.copper : 'transparent'}`, marginBottom: 1 }}>
              <Icon size={9} style={{ color: tool.a ? T.primary : T.muted }}/>
              <span style={{ fontSize: 9, color: tool.a ? T.ink : T.ink2, fontWeight: tool.a ? 500 : 400 }}>{tool.l}</span>
            </div>
          );
        })}
      </div>
      <div className="flex-1 p-3 overflow-hidden">
        <div className="flex items-center gap-1 mb-1.5">
          <span style={{ background: '#F8E2D1', color: T.copper, fontSize: 6.5, padding: '1px 4px', borderRadius: 1, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500 }}>AI answer</span>
          <span style={{ background: '#E2EBE3', color: T.ok, fontSize: 6.5, padding: '1px 4px', borderRadius: 1, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500 }}>High conf.</span>
        </div>
        <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 13, fontStyle: 'italic', color: T.ink, letterSpacing: '-0.01em', lineHeight: 1.2 }}>
          Compare §179 vs 60% bonus on $284k drilling rig.
        </h3>
        {/* TLDR card */}
        <div className="mt-2 p-2 rounded-[2px] relative overflow-hidden" style={{ background: T.surface, border: `1px solid ${T.copper}` }}>
          <div style={{ position: 'absolute', right: -10, top: -10, width: 36, height: 36, border: `1px solid ${T.copper}`, opacity: 0.18, borderRadius: '50%' }} aria-hidden/>
          <div style={{ fontSize: 6.5, letterSpacing: '0.16em', color: T.copper, textTransform: 'uppercase', fontWeight: 500 }}>Recommendation</div>
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 11, fontStyle: 'italic', color: T.ink, lineHeight: 1.3, marginTop: 2, letterSpacing: '-0.005em' }}>
            Take 60% bonus depreciation. ~$28.4k savings.
          </div>
        </div>
        {/* Citations */}
        <div className="mt-2 flex flex-col gap-0.5">
          {[
            { c: '§168(k)', t: 'Bonus depreciation' },
            { c: '§179',    t: 'Election' },
            { c: 'Sharp v. Comm\'r', t: 'Placed-in-service' },
          ].map((cite, i) => (
            <div key={i} style={{ fontSize: 7, color: T.muted, padding: '2px 0' }}>
              <span style={{ color: T.copper, fontFamily: FONT_MONO, fontWeight: 500 }}>{cite.c}</span> · {cite.t}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function WarroomPreview() {
  return (
    <div className="w-full h-full flex flex-col" style={{ background: T.bg, fontFamily: FONT_BODY }}>
      <div className="px-3 py-2 flex items-center gap-2" style={{ background: T.primaryDk, color: T.surface }}>
        <div style={{ width: 18, height: 18, borderRadius: 2, background: T.copper, color: T.surface, fontSize: 11, fontFamily: FONT_DISPLAY, fontStyle: 'italic', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: 2, lineHeight: 1 }}>L</div>
        <span style={{ fontFamily: FONT_DISPLAY, fontSize: 12, fontStyle: 'italic' }}>War Room</span>
        <span style={{ width: 5, height: 5, borderRadius: '50%', background: T.copper, marginLeft: 4 }}/>
        <span style={{ fontSize: 7, letterSpacing: '0.14em', color: T.copperLt, textTransform: 'uppercase' }}>Live</span>
        <div className="ml-auto flex flex-col items-end">
          <span style={{ fontSize: 6.5, letterSpacing: '0.14em', color: T.copperLt, textTransform: 'uppercase' }}>Q1 941</span>
          <span style={{ fontFamily: FONT_DISPLAY, fontSize: 11, fontStyle: 'italic', lineHeight: 1 }}>5d 14h</span>
        </div>
      </div>
      {/* Pipeline */}
      <div className="px-3 pt-2 flex gap-1">
        {['Docs', 'Books', 'Prep', 'Review', 'E-File', 'Filed'].map((s, i) => (
          <div key={s} className="flex-1 p-1 rounded-[2px]" style={{ background: T.surface, border: `1px solid ${T.rule}` }}>
            <div style={{ fontSize: 6, letterSpacing: '0.14em', color: T.muted, textTransform: 'uppercase' }}>{s}</div>
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 12, fontStyle: 'italic', color: T.ink, letterSpacing: '-0.01em', lineHeight: 1, marginTop: 1 }}>{[5,2,4,3,3,4][i]}</div>
          </div>
        ))}
      </div>
      {/* Cards */}
      <div className="px-3 pt-2 flex gap-1 flex-1">
        {[
          { c: T.danger, n: 'Cheyenne Ridge' },
          { c: T.warn, n: 'Big Horn Logistics' },
          { c: T.warn, n: 'Niobrara Energy' },
        ].map((card, i) => (
          <div key={i} className="flex-1 p-1.5 rounded-[2px]" style={{ background: T.surface, border: `1px solid ${T.rule}`, borderLeft: `2px solid ${card.c}` }}>
            <div style={{ fontSize: 7, color: T.ink, fontWeight: 500, lineHeight: 1.2 }}>{card.n}</div>
            <div style={{ fontSize: 6, color: T.muted, marginTop: 1, fontFamily: FONT_MONO }}>1120 · WY</div>
            <div className="mt-1 flex items-center gap-0.5">
              <span style={{ background: '#F8E2D1', color: T.copper, fontSize: 5.5, padding: '0.5px 3px', borderRadius: 1, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500 }}>stuck</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsPreview() {
  return (
    <div className="w-full h-full flex" style={{ background: T.bg, fontFamily: FONT_BODY }}>
      <div style={{ width: '32%', background: T.surface, borderRight: `1px solid ${T.rule}`, padding: 10 }}>
        <div className="flex items-center gap-1 mb-2">
          <div style={{ width: 16, height: 16, borderRadius: 2, background: T.primary, color: T.surface, fontSize: 10, fontFamily: FONT_DISPLAY, fontStyle: 'italic', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: 2, lineHeight: 1 }}>L</div>
          <span style={{ fontFamily: FONT_DISPLAY, fontSize: 11, fontStyle: 'italic' }}>Ledger.</span>
        </div>
        <div style={{ fontSize: 6.5, letterSpacing: '0.14em', color: T.faint, textTransform: 'uppercase', marginBottom: 4 }}>Configure</div>
        {[
          { i: Building2, l: 'Firm', a: false },
          { i: Users,     l: 'Team', a: true },
          { i: CreditCard,l: 'Billing' },
          { i: Link2,     l: 'Integrations' },
          { i: Shield,    l: 'Security' },
        ].map((tab, i) => {
          const Icon = tab.i;
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '3px 4px', background: tab.a ? T.surface2 : 'transparent', borderRadius: 2, borderLeft: `2px solid ${tab.a ? T.copper : 'transparent'}`, marginBottom: 1 }}>
              <Icon size={8} style={{ color: tab.a ? T.primary : T.muted }}/>
              <span style={{ fontSize: 8.5, color: tab.a ? T.ink : T.ink2 }}>{tab.l}</span>
            </div>
          );
        })}
      </div>
      <div className="flex-1 p-3">
        <div style={{ fontSize: 7, letterSpacing: '0.22em', color: T.copper, textTransform: 'uppercase', fontWeight: 500, marginBottom: 4 }}>02 — Team</div>
        <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 16, lineHeight: 1.0, letterSpacing: '-0.02em', fontStyle: 'italic', color: T.ink }}>
          Your people,<br/>their permissions.
        </h3>
        <div className="mt-3 flex flex-col gap-1">
          {[
            { i: 'SP', n: 'Suresh Patel', r: 'admin', c: T.copper },
            { i: 'MR', n: 'Margaux R.',    r: 'admin', c: T.primary },
            { i: 'HG', n: 'Hollis G.',     r: 'preparer', c: T.gold },
          ].map((m, i) => (
            <div key={i} className="flex items-center gap-2 p-1.5 rounded-[2px]" style={{ background: T.surface, border: `1px solid ${T.rule}` }}>
              <div style={{ width: 16, height: 16, borderRadius: '50%', background: m.c, color: T.surface, fontSize: 7, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {m.i}
              </div>
              <span style={{ fontSize: 8.5, color: T.ink, fontWeight: 500 }}>{m.n}</span>
              <span style={{ fontSize: 6, color: T.copper, padding: '0.5px 3px', background: '#F8E2D1', borderRadius: 1, marginLeft: 'auto', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{m.r}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function EmailPreview() {
  return (
    <div className="w-full h-full flex items-start justify-center pt-3" style={{ background: T.bgDeep, fontFamily: FONT_BODY, overflow: 'hidden' }}>
      <div style={{ width: '78%', background: T.surface, borderRadius: 4, border: `1px solid ${T.rule}`, overflow: 'hidden' }}>
        {/* Letterhead */}
        <div style={{ padding: '10px 14px', borderTop: `2px solid ${T.copper}` }}>
          <div className="flex items-center gap-1.5">
            <div style={{ width: 18, height: 18, borderRadius: 2, background: T.primary, color: T.surface, fontSize: 11, fontFamily: FONT_DISPLAY, fontStyle: 'italic', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: 2, lineHeight: 1 }}>H</div>
            <span style={{ fontFamily: FONT_DISPLAY, fontSize: 12, fontStyle: 'italic', color: T.ink }}>HYK Tax<span style={{ color: T.copper }}>.</span></span>
          </div>
        </div>
        {/* Body */}
        <div style={{ padding: '6px 14px 14px' }}>
          <div style={{ fontSize: 6.5, letterSpacing: '0.18em', color: T.copper, textTransform: 'uppercase', fontWeight: 500 }}>Action requested</div>
          <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 16, lineHeight: 1.0, letterSpacing: '-0.02em', fontStyle: 'italic', color: T.ink, marginTop: 4 }}>
            Your 2026 letter,<br/>ready to sign.
          </h3>
          <p style={{ fontSize: 8, color: T.ink2, lineHeight: 1.6, marginTop: 6 }}>
            Hi Cody — same scope as last year, fees unchanged. Should take you about 90 seconds.
          </p>
          {/* Card */}
          <div style={{ marginTop: 6, background: T.surface2, border: `1px solid ${T.copper}`, borderLeft: `3px solid ${T.copper}`, borderRadius: 2, padding: 6 }}>
            {[['Engagement','2026 TY'],['Retainer','$1,850']].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 7, padding: '2px 0', borderBottom: k === 'Engagement' ? `1px dashed ${T.rule2}` : 'none' }}>
                <span style={{ color: T.muted, letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: 5.5 }}>{k}</span>
                <span style={{ color: T.ink, fontWeight: 500, fontFamily: FONT_MONO }}>{v}</span>
              </div>
            ))}
          </div>
          {/* CTA */}
          <div style={{ marginTop: 8 }}>
            <span style={{ display: 'inline-block', background: T.primary, color: T.surface, padding: '4px 10px', borderRadius: 2, fontSize: 7.5, fontWeight: 500 }}>
              Review & sign →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function DeckPreview() {
  return (
    <div className="w-full h-full relative overflow-hidden flex flex-col" style={{ background: T.primaryDk, color: T.surface, fontFamily: FONT_BODY }}>
      <div style={{ position: 'absolute', right: -60, top: -60, width: 220, height: 220, border: `1px solid rgba(255,253,248,0.06)`, borderRadius: '50%' }} aria-hidden/>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 70% 30%, rgba(196,106,45,0.18), transparent 55%)` }} aria-hidden/>
      <div className="relative px-5 pt-5 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div style={{ width: 18, height: 18, borderRadius: 2, background: T.copper, color: T.surface, fontSize: 11, fontFamily: FONT_DISPLAY, fontStyle: 'italic', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: 2, lineHeight: 1 }}>L</div>
          <span style={{ fontFamily: FONT_DISPLAY, fontSize: 13, fontStyle: 'italic' }}>Ledger.</span>
        </div>
        <span style={{ fontSize: 7, letterSpacing: '0.18em', color: 'rgba(255,253,248,0.55)', textTransform: 'uppercase' }}>Series A · Q2 2026</span>
      </div>
      <div className="relative flex-1 px-5 flex flex-col justify-center">
        <div className="flex items-center gap-1.5 mb-2">
          <span style={{ fontSize: 7, letterSpacing: '0.22em', color: T.copperLt, textTransform: 'uppercase', fontWeight: 500 }}>Vol. IV</span>
          <span style={{ width: 14, height: 1, background: 'rgba(255,253,248,0.25)' }}/>
          <span style={{ fontSize: 7, letterSpacing: '0.22em', color: 'rgba(255,253,248,0.55)', textTransform: 'uppercase' }}>The pitch</span>
        </div>
        <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 28, lineHeight: 0.94, fontStyle: 'italic', letterSpacing: '-0.025em' }}>
          The practice<br/>
          suite that<br/>
          <span style={{ color: T.copperLt }}>thinks ahead</span><br/>
          of you.
        </h3>
      </div>
      <div className="relative px-5 pb-3 flex items-end justify-between" style={{ borderTop: `1px solid rgba(255,253,248,0.12)`, paddingTop: 6 }}>
        <div>
          <div style={{ fontSize: 6, letterSpacing: '0.16em', color: 'rgba(255,253,248,0.5)', textTransform: 'uppercase' }}>Raising</div>
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 13, fontStyle: 'italic', color: T.copperLt, letterSpacing: '-0.01em' }}>$14M</div>
        </div>
        <div style={{ fontSize: 6, letterSpacing: '0.16em', color: 'rgba(255,253,248,0.4)', textTransform: 'uppercase' }}>00 / 11</div>
      </div>
    </div>
  );
}

function TourPreview() {
  // Self-referential — recursive tiny version
  return (
    <div className="w-full h-full flex flex-col" style={{ background: T.bg, fontFamily: FONT_BODY }}>
      <div className="px-4 py-2 flex items-center gap-1.5" style={{ background: T.surface, borderBottom: `1px solid ${T.rule}` }}>
        <div style={{ width: 18, height: 18, borderRadius: 2, background: T.primary, color: T.surface, fontSize: 11, fontFamily: FONT_DISPLAY, fontStyle: 'italic', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: 2, lineHeight: 1 }}>L</div>
        <span style={{ fontFamily: FONT_DISPLAY, fontSize: 12, fontStyle: 'italic', color: T.ink }}>Ledger<span style={{ color: T.copper }}>.</span></span>
        <span style={{ fontSize: 6.5, letterSpacing: '0.14em', color: T.muted, textTransform: 'uppercase', marginLeft: 4 }}>Vol. IV · Tour</span>
      </div>
      <div className="flex-1 px-4 pt-4 pb-3">
        <div style={{ fontSize: 6.5, letterSpacing: '0.22em', color: T.copper, textTransform: 'uppercase', fontWeight: 500 }}>00 — Complete suite</div>
        <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 20, lineHeight: 0.94, letterSpacing: '-0.025em', fontStyle: 'italic', color: T.ink, marginTop: 4 }}>
          One product story.<br/>
          <span style={{ color: T.copper }}>Eleven artifacts.</span>
        </h3>
        <div className="mt-3 grid grid-cols-3 gap-1">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="rounded-[2px]" style={{
              background: T.surface, border: `1px solid ${T.rule}`,
              aspectRatio: '4/3', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: FONT_DISPLAY, fontSize: 13, fontStyle: 'italic', color: T.copper,
              letterSpacing: '-0.02em',
            }}>
              {String(i).padStart(2,'0')}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const PREVIEWS = {
  marketing:  MarketingPreview,
  onboarding: OnboardingPreview,
  dashboard:  DashboardPreview,
  portal:     PortalPreview,
  mobile:     MobilePreview,
  research:   ResearchPreview,
  warroom:    WarroomPreview,
  settings:   SettingsPreview,
  emails:     EmailPreview,
  deck:       DeckPreview,
  tour:       TourPreview,
};

/* ============================================================
   ARTIFACT CARD
   ============================================================ */
function ArtifactCard({ chapter, layout, onOpen }) {
  const Icon = chapter.icon;
  const Preview = PREVIEWS[chapter.id];
  const isWide = layout === 'wide';
  const isHero = layout === 'hero';

  return (
    <div
      className={cx(
        'group relative rounded-[4px] overflow-hidden transition-transform hover:-translate-y-0.5',
        isHero ? 'col-span-12' : isWide ? 'col-span-7' : 'col-span-5',
      )}
      style={{
        background: T.surface,
        border: `1px solid ${T.rule}`,
        cursor: 'pointer',
      }}
      onClick={() => onOpen(chapter)}
    >
      <div className={cx('grid', isHero ? 'grid-cols-12 gap-0' : 'grid-cols-1')}>
        {/* Preview */}
        <div
          className={cx(isHero ? 'col-span-7 order-2' : 'col-span-1')}
          style={{
            aspectRatio: isHero ? '16/9' : '16/9',
            borderBottom: !isHero ? `1px solid ${T.rule}` : 'none',
            borderLeft:    isHero ? `1px solid ${T.rule}` : 'none',
            background: T.bgDeep,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Preview/>
          {/* Open hover overlay */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-opacity opacity-0 group-hover:opacity-100"
            style={{ background: 'rgba(11,61,58,0.85)', color: T.surface }}
          >
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-[3px]" style={{ background: T.copper, fontFamily: FONT_BODY, fontSize: 12, fontWeight: 500 }}>
              <Eye size={12}/> Open artifact
            </div>
          </div>
        </div>

        {/* Meta */}
        <div className={cx('flex flex-col', isHero ? 'col-span-5 order-1 p-8' : 'p-5')}>
          <div className="flex items-center gap-2 mb-3">
            <span style={{ fontFamily: FONT_MONO, fontSize: 11, color: T.copper, fontWeight: 500, letterSpacing: '0.06em' }}>
              {chapter.num}
            </span>
            <span style={{ width: 16, height: 1, background: T.rule2 }}/>
            <Icon size={12} style={{ color: chapter.palette }}/>
            <span className="text-[10px] uppercase tracking-[0.14em]" style={{ color: T.muted, fontFamily: FONT_BODY, fontWeight: 500 }}>
              {chapter.audience}
            </span>
          </div>

          <h3
            style={{
              fontFamily: FONT_DISPLAY,
              fontSize: isHero ? 38 : 24,
              lineHeight: 1.1,
              letterSpacing: '-0.015em',
              color: T.ink,
              fontStyle: 'italic',
            }}
          >
            {chapter.title}
          </h3>

          <p
            className="mt-3 flex-1"
            style={{
              fontFamily: FONT_BODY,
              fontSize: isHero ? 14 : 12.5,
              color: T.ink2,
              lineHeight: 1.6,
            }}
          >
            {chapter.blurb}
          </p>

          {/* Stats */}
          <div className="mt-4 flex items-center gap-4 flex-wrap">
            {chapter.stats.map((s, i) => (
              <div key={i} className="flex items-baseline gap-1.5">
                <span style={{ fontFamily: FONT_DISPLAY, fontSize: 16, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.01em' }}>
                  {s.v}
                </span>
                <span className="text-[9.5px] uppercase tracking-[0.14em]" style={{ color: T.muted, fontFamily: FONT_BODY }}>
                  {s.k}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-5 pt-4 flex items-center justify-between" style={{ borderTop: `1px dashed ${T.rule2}` }}>
            <button className="flex items-center gap-1 text-[11.5px]" style={{ color: chapter.palette, fontFamily: FONT_BODY, fontWeight: 500 }}>
              Open artifact <ArrowRight size={11}/>
            </button>
            <span className="text-[9.5px] uppercase tracking-[0.16em]" style={{ color: T.faint }}>
              Chapter {chapter.num}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   ACT CHAPTERS GRID — different layouts per act
   ============================================================ */
function ActChapters({ act, onOpen }) {
  const chapters = act.chapters.map(id => CHAPTERS.find(c => c.id === id));

  // Layout strategy
  // - Single chapter: hero
  // - Two chapters: 7 + 5 (wide left, narrow right)
  // - Three chapters: hero, then split
  if (chapters.length === 1) {
    return (
      <div className="mx-auto max-w-[1340px] px-10 grid grid-cols-12 gap-5 mb-12">
        <ArtifactCard chapter={chapters[0]} layout="hero" onOpen={onOpen}/>
      </div>
    );
  }
  if (chapters.length === 2) {
    return (
      <div className="mx-auto max-w-[1340px] px-10 grid grid-cols-12 gap-5 mb-12">
        <ArtifactCard chapter={chapters[0]} layout="wide" onOpen={onOpen}/>
        <ArtifactCard chapter={chapters[1]} layout="narrow" onOpen={onOpen}/>
      </div>
    );
  }
  // Three chapters: hero on top, two-up below
  return (
    <div className="mx-auto max-w-[1340px] px-10 grid grid-cols-12 gap-5 mb-12">
      <ArtifactCard chapter={chapters[0]} layout="hero" onOpen={onOpen}/>
      <ArtifactCard chapter={chapters[1]} layout="wide" onOpen={onOpen}/>
      <ArtifactCard chapter={chapters[2]} layout="narrow" onOpen={onOpen}/>
    </div>
  );
}

/* ============================================================
   STORY FLOW SECTION — visual map of how artifacts connect
   ============================================================ */
function StoryFlow() {
  const nodes = [
    { id: 'marketing',  x: 50,  y: 60,  label: 'Marketing' },
    { id: 'onboarding', x: 200, y: 60,  label: 'Onboarding' },
    { id: 'dashboard',  x: 380, y: 60,  label: 'Dashboard' },
    { id: 'portal',     x: 380, y: 180, label: 'Portal · web' },
    { id: 'mobile',     x: 380, y: 300, label: 'Mobile' },
    { id: 'research',   x: 580, y: 60,  label: 'AI Research' },
    { id: 'warroom',    x: 580, y: 180, label: 'War Room' },
    { id: 'settings',   x: 760, y: 60,  label: 'Settings' },
    { id: 'emails',     x: 760, y: 180, label: 'Emails' },
    { id: 'deck',       x: 940, y: 60,  label: 'Pitch Deck' },
    { id: 'tour',       x: 940, y: 180, label: 'This Tour' },
  ];
  const edges = [
    ['marketing', 'onboarding'],
    ['onboarding', 'dashboard'],
    ['onboarding', 'portal'],
    ['portal', 'mobile'],
    ['dashboard', 'research'],
    ['dashboard', 'warroom'],
    ['dashboard', 'settings'],
    ['settings', 'emails'],
    ['emails', 'portal'],
    ['emails', 'mobile'],
    ['research', 'deck'],
    ['warroom', 'deck'],
    ['deck', 'tour'],
  ];
  const findNode = (id) => nodes.find(n => n.id === id);

  return (
    <section style={{ background: T.surface, borderTop: `1px solid ${T.rule}`, borderBottom: `1px solid ${T.rule}` }}>
      <div className="mx-auto max-w-[1340px] px-10 py-20">
        <div className="grid grid-cols-12 gap-12 items-center">
          <div className="col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: T.copper, fontFamily: FONT_BODY, fontWeight: 500 }}>How it connects</span>
            </div>
            <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 48, lineHeight: 1.0, letterSpacing: '-0.025em', color: T.ink, fontStyle: 'italic' }}>
              Eleven<br/>artifacts.<br/>
              <span style={{ color: T.copper }}>One graph.</span>
            </h2>
            <p className="mt-5 text-[14px]" style={{ color: T.ink2, lineHeight: 1.6, fontFamily: FONT_BODY }}>
              Every artifact references every other. Sign an engagement on the
              client portal and it shows up on the dashboard, surfaces in the war
              room, generates an email, and gets logged in the audit trail.
              Nothing is decoration — everything threads into the same story.
            </p>
            <div className="mt-6 flex flex-col gap-2 text-[12px]" style={{ color: T.muted, fontFamily: FONT_BODY }}>
              <div className="flex items-center gap-2">
                <span style={{ width: 16, height: 2, background: T.copper }}/>
                <span>Direct dependency</span>
              </div>
              <div className="flex items-center gap-2">
                <span style={{ width: 16, height: 1, background: T.rule2, borderTop: `1px dashed ${T.rule2}` }}/>
                <span>Data flow</span>
              </div>
            </div>
          </div>

          <div className="col-span-8">
            <div className="rounded-[3px] p-6" style={{ background: T.bg, border: `1px solid ${T.rule}` }}>
              <svg viewBox="0 0 1040 380" width="100%" style={{ display: 'block' }}>
                {/* Edges */}
                {edges.map(([from, to], i) => {
                  const a = findNode(from);
                  const b = findNode(to);
                  if (!a || !b) return null;
                  return (
                    <line
                      key={i}
                      x1={a.x} y1={a.y}
                      x2={b.x} y2={b.y}
                      stroke={T.rule2}
                      strokeWidth={1}
                      strokeDasharray="3 4"
                    />
                  );
                })}
                {/* Highlighted main path */}
                {[
                  ['marketing','onboarding'],
                  ['onboarding','dashboard'],
                  ['dashboard','research'],
                  ['research','deck'],
                ].map(([from, to], i) => {
                  const a = findNode(from);
                  const b = findNode(to);
                  return (
                    <line
                      key={`hl-${i}`}
                      x1={a.x} y1={a.y}
                      x2={b.x} y2={b.y}
                      stroke={T.copper}
                      strokeWidth={2}
                    />
                  );
                })}

                {/* Nodes */}
                {nodes.map(n => {
                  const ch = CHAPTERS.find(c => c.id === n.id);
                  if (!ch) return null;
                  const Icon = ch.icon;
                  return (
                    <g key={n.id}>
                      {/* Halo for hovered (decorative for now) */}
                      <circle cx={n.x} cy={n.y} r={26} fill={T.surface} stroke={T.rule} strokeWidth={1}/>
                      <circle cx={n.x} cy={n.y} r={20} fill={ch.palette} fillOpacity={0.15} stroke={ch.palette} strokeWidth={1}/>
                      {/* Number */}
                      <text
                        x={n.x} y={n.y + 5}
                        textAnchor="middle"
                        fontSize={14}
                        fill={ch.palette}
                        fontFamily={FONT_DISPLAY}
                        fontStyle="italic"
                        fontWeight={500}
                        letterSpacing={-0.5}
                      >
                        {ch.num}
                      </text>
                      {/* Label */}
                      <text
                        x={n.x} y={n.y + 44}
                        textAnchor="middle"
                        fontSize={10.5}
                        fill={T.ink2}
                        fontFamily={FONT_BODY}
                        fontWeight={500}
                      >
                        {n.label}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
            <div className="mt-3 flex items-center justify-between text-[11px]" style={{ color: T.muted, fontFamily: FONT_BODY }}>
              <span>11 nodes · 13 edges · 1 product</span>
              <span style={{ color: T.copper, fontWeight: 500 }}>Highlighted: prospect → fundraise main path</span>
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
      <div
        aria-hidden
        style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(circle at 80% 50%, rgba(196,106,45,0.10), transparent 60%)`,
        }}
      />

      <div className="relative mx-auto max-w-[1340px] px-10 py-20">
        <div className="grid grid-cols-12 gap-12 items-center">
          <div className="col-span-7">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: T.copperLt, fontFamily: FONT_BODY, fontWeight: 500 }}>End of tour</span>
              <span style={{ width: 24, height: 1, background: 'rgba(255,253,248,0.25)' }}/>
              <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: 'rgba(255,253,248,0.55)' }}>Vol. IV · 2026</span>
            </div>
            <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 64, lineHeight: 0.96, letterSpacing: '-0.025em', fontStyle: 'italic' }}>
              That's the suite.<br/>
              <span style={{ color: T.copperLt }}>Want to talk?</span>
            </h2>
            <p className="mt-6 max-w-[520px] text-[15px]" style={{ color: 'rgba(255,253,248,0.75)', fontFamily: FONT_BODY, lineHeight: 1.6 }}>
              Whether you're an EA evaluating a stack, a partner sizing a deal, or a capital partner kicking the tires —
              we'll walk you through any artifact in 15 minutes.
            </p>
            <div className="mt-9 flex items-center gap-3">
              <button className="px-5 py-3 text-[13px] flex items-center gap-1.5 rounded-[3px]" style={{ background: T.copper, color: T.surface, fontWeight: 500, fontFamily: FONT_BODY }}>
                Book a 15-min walkthrough <ArrowRight size={13}/>
              </button>
              <button className="px-5 py-3 text-[13px] flex items-center gap-1.5 rounded-[3px]" style={{ background: 'transparent', color: T.surface, border: `1px solid rgba(255,253,248,0.3)`, fontFamily: FONT_BODY, fontWeight: 500 }}>
                <Download size={12}/> Download deck PDF
              </button>
            </div>

            <div className="mt-12 flex items-center gap-5 text-[11px]" style={{ color: 'rgba(255,253,248,0.55)' }}>
              <span className="flex items-center gap-1.5"><Mail size={12}/><span style={{ fontFamily: FONT_MONO }}>founders@ledger.app</span></span>
              <span>·</span>
              <span>Suresh Patel, CEO</span>
              <span>·</span>
              <span>HYK Tax · Cheyenne, WY</span>
            </div>
          </div>

          <div className="col-span-5">
            <div
              className="p-7 rounded-[4px]"
              style={{ background: 'rgba(255,253,248,0.06)', border: `1px solid rgba(255,253,248,0.18)` }}
            >
              <div className="text-[10px] uppercase tracking-[0.18em] mb-4" style={{ color: T.copperLt, fontWeight: 500 }}>
                What you just walked through
              </div>
              <div className="grid grid-cols-2 gap-x-3 gap-y-2.5">
                {CHAPTERS.map(c => {
                  const Icon = c.icon;
                  return (
                    <div key={c.id} className="flex items-center gap-2 text-[11px]" style={{ color: 'rgba(255,253,248,0.85)' }}>
                      <Icon size={11} style={{ color: T.copperLt, flexShrink: 0 }}/>
                      <span style={{ fontFamily: FONT_MONO, color: 'rgba(255,253,248,0.5)', fontSize: 9.5, marginRight: 2 }}>{c.num}</span>
                      <span className="truncate">{c.title}</span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-5 pt-4 flex items-center justify-between text-[10px]" style={{ borderTop: `1px solid rgba(255,253,248,0.12)`, color: 'rgba(255,253,248,0.55)' }}>
                <span>11 of 11 artifacts</span>
                <span style={{ color: T.copperLt, fontWeight: 500 }}>100% complete</span>
              </div>
            </div>
          </div>
        </div>

        <div
          className="mt-16 pt-6 flex items-end justify-between"
          style={{ borderTop: `1px solid rgba(255,253,248,0.12)` }}
        >
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 64, lineHeight: 0.85, color: T.surface, fontStyle: 'italic', letterSpacing: '-0.04em' }}>
            <span style={{ color: T.copperLt }}>Ledger.</span>
          </div>
          <div className="text-[10.5px]" style={{ color: 'rgba(255,253,248,0.5)', fontFamily: FONT_BODY, textAlign: 'right' }}>
            <div>© 2026 Ledger Practice Systems, Inc.</div>
            <div className="mt-1 flex items-center gap-3 justify-end" style={{ fontSize: 9.5 }}>
              <span className="flex items-center gap-1.5"><Shield size={10}/> SOC 2 Type II</span>
              <span className="flex items-center gap-1.5"><Lock size={10}/> 256-bit encryption</span>
              <span className="flex items-center gap-1.5"><Globe size={10}/> 47 states</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   ARTIFACT MODAL — fullscreen viewer when clicked
   ============================================================ */
function ArtifactModal({ chapter, onClose }) {
  if (!chapter) return null;
  const Icon = chapter.icon;
  const Preview = PREVIEWS[chapter.id];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ background: 'rgba(20,15,8,0.65)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[1280px] h-[88vh] rounded-[6px] overflow-hidden flex flex-col"
        style={{
          background: T.surface,
          border: `1px solid ${T.rule}`,
          boxShadow: '0 60px 120px -30px rgba(20,15,8,0.5)',
          fontFamily: FONT_BODY,
        }}
      >
        {/* Header */}
        <div className="px-8 py-5 flex items-center gap-4" style={{ borderBottom: `1px solid ${T.rule}`, background: T.surface }}>
          <div className="flex items-center gap-3">
            <span style={{ fontFamily: FONT_MONO, fontSize: 13, color: T.copper, fontWeight: 500, letterSpacing: '0.08em' }}>
              {chapter.num}
            </span>
            <span style={{ width: 24, height: 1, background: T.rule2 }}/>
            <Icon size={14} style={{ color: chapter.palette }}/>
            <span className="text-[10px] uppercase tracking-[0.16em]" style={{ color: T.muted, fontWeight: 500 }}>
              {chapter.audience}
            </span>
          </div>

          <div className="flex-1"/>

          <button
            className="px-3 py-1.5 text-[11px] flex items-center gap-1.5 rounded-[3px]"
            style={{ background: T.surface2, color: T.ink2, border: `1px solid ${T.rule}` }}
          >
            <ExternalLink size={11}/> Open in new tab
          </button>
          <button onClick={onClose} className="p-2 rounded-[3px]" style={{ background: T.surface2, border: `1px solid ${T.rule}` }}>
            <X size={14} style={{ color: T.ink2 }}/>
          </button>
        </div>

        {/* Title strip */}
        <div className="px-8 pt-6 pb-5" style={{ borderBottom: `1px solid ${T.rule}` }}>
          <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 44, lineHeight: 1.0, letterSpacing: '-0.02em', color: T.ink, fontStyle: 'italic' }}>
            {chapter.title}
          </h2>
          <p className="mt-3 max-w-[760px] text-[14px]" style={{ color: T.ink2, lineHeight: 1.6 }}>
            {chapter.blurb}
          </p>

          <div className="mt-5 flex items-center gap-5">
            {chapter.stats.map((s, i) => (
              <div key={i} className="flex items-baseline gap-1.5">
                <span style={{ fontFamily: FONT_DISPLAY, fontSize: 22, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.02em' }}>
                  {s.v}
                </span>
                <span className="text-[10px] uppercase tracking-[0.14em]" style={{ color: T.muted, fontWeight: 500 }}>
                  {s.k}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Big preview */}
        <div className="flex-1 p-8 overflow-hidden" style={{ background: T.bgDeep }}>
          <div
            className="w-full h-full rounded-[4px] overflow-hidden"
            style={{ border: `1px solid ${T.rule}`, boxShadow: '0 30px 60px -20px rgba(20,15,8,0.25)' }}
          >
            <Preview/>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-4 flex items-center justify-between" style={{ borderTop: `1px solid ${T.rule}`, background: T.surface }}>
          <div className="text-[11px]" style={{ color: T.muted, fontFamily: FONT_BODY }}>
            This is a preview of the artifact. Open the full file to interact with it.
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-[11.5px] flex items-center gap-1.5 rounded-[3px]" style={{ background: T.surface2, color: T.ink2, border: `1px solid ${T.rule}` }}>
              <Copy size={11}/> Copy link
            </button>
            <button className="px-3 py-1.5 text-[11.5px] flex items-center gap-1.5 rounded-[3px]" style={{ background: T.primary, color: T.surface, fontWeight: 500 }}>
              Open full artifact <ArrowRight size={11}/>
            </button>
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
  const [openChapter, setOpenChapter] = useState(null);

  useEffect(() => {
    const id = 'ledger-tour-fonts';
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
      if (e.key === 'Escape') setOpenChapter(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <div style={{ background: T.bg, color: T.ink, fontFamily: FONT_BODY }}>
      <Nav scrolled={scrolled} scrollTo={scrollTo}/>
      <Hero/>

      {ACTS.map(act => (
        <React.Fragment key={act.id}>
          <ActIntro act={act} scrollTo={scrollTo}/>
          <ActChapters act={act} onOpen={setOpenChapter}/>
        </React.Fragment>
      ))}

      <StoryFlow/>
      <Footer/>

      <ArtifactModal chapter={openChapter} onClose={() => setOpenChapter(null)}/>
    </div>
  );
}
