import React, { useState, useEffect, useMemo } from 'react';
import {
  ArrowRight, ArrowUpRight, ArrowLeft, ChevronRight, ChevronDown, ChevronUp,
  ExternalLink, Sparkles, Zap, Brain, Shield, Lock, Globe, Globe2,
  Users, User, Building2, Clock, Calendar, FileText, FileCheck,
  FileSignature, Receipt, Mail, MessageSquare, Inbox, Bell, Hash,
  AtSign, Plus, Filter, Star, Pin, BookOpen, Library, Award,
  Activity, Layers, MapPin, Phone, Heart, Settings,
  Smartphone, Monitor, Code, Eye, Send, Camera, Upload, CreditCard,
  ShieldCheck, Database, Server, Wifi, Volume2, Maximize2, Download,
  Share2, Copy, RefreshCw, MoreHorizontal, AlertTriangle, CheckCircle2,
  Circle, Mic, Image as ImageIcon, BadgeCheck, Compass, Map, Link2,
  HelpCircle, LifeBuoy, MessageCircle, Lightbulb, Key,
  Bookmark, ThumbsUp, ThumbsDown, GraduationCap, Wand2, Truck,
  Factory, HardHat, GitBranch, GitMerge, GitCommit, GitPullRequest,
  Tag, Folder, Briefcase, Hourglass, Rocket, Telescope, Hammer,
  TestTube, Beaker, Workflow, Boxes, Anchor, Flag, Megaphone,
  Cpu, Network, ListChecks, BarChart3, Palette, Ban, ChevronsRight,
  Coffee, Snowflake, Flame, Quote, Shapes, Scale, Calculator,
  PieChart, FilePlus, Crown, Bug, Wrench, Cog, AlertCircle,
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
   ROADMAP DATA — the four pillars
   ============================================================ */
const ROADMAP_COLUMNS = [
  {
    id: 'shipped',
    title: 'Shipped',
    icon: CheckCircle2,
    color: T.ok,
    bg: '#E2EBE3',
    label: 'Live · in production',
    blurb: 'The last 90 days',
    count: 14,
  },
  {
    id: 'progress',
    title: 'In progress',
    icon: Hammer,
    color: T.copper,
    bg: '#F8E2D1',
    label: 'Building right now',
    blurb: 'Q2 2026 commits',
    count: 6,
  },
  {
    id: 'next',
    title: 'Up next',
    icon: Telescope,
    color: T.gold,
    bg: '#F2E5C5',
    label: 'Q3 2026 plan',
    blurb: 'Designs + scoped',
    count: 8,
  },
  {
    id: 'exploring',
    title: 'Exploring',
    icon: Beaker,
    color: T.muted,
    bg: T.surface3,
    label: 'Maybe · validating',
    blurb: 'Listening for signal',
    count: 11,
  },
];

const ROADMAP_ITEMS = {
  shipped: [
    { id: 's1',  title: 'AI document classification',         desc: 'Auto-route uploads into client folders by tax form type, year, and entity. 94.2% accuracy across the first 500k docs.', tag: 'AI',         votes: 348, ship: 'v4.7 · Apr 22, 2026' },
    { id: 's2',  title: 'Predictive deadline radar',            desc: 'Surface filings at risk of slipping 7-30 days before the deadline based on document state and historical pattern.',     tag: 'Practice',   votes: 289, ship: 'v4.7 · Apr 14, 2026' },
    { id: 's3',  title: 'War Room dashboard',                  desc: 'Real-time tax season ops view with 7-stage pipeline, team load, and stuck engagement detection.',                       tag: 'Practice',   votes: 412, ship: 'v4.6 · Mar 28, 2026' },
    { id: 's4',  title: 'IRS notice CP2000 drafting',          desc: 'Generate a defensible CP2000 reply draft from a notice scan in under 30 seconds. Cited inline.',                          tag: 'AI',         votes: 267, ship: 'v4.6 · Mar 12, 2026' },
    { id: 's5',  title: 'White-label client portal',           desc: 'Replace Ledger branding with your firm\'s logo, colors, and tagline. Live preview as you customize.',                  tag: 'Portal',     votes: 198, ship: 'v4.5 · Feb 22, 2026' },
    { id: 's6',  title: 'Mobile app · iOS',                    desc: 'Native iPhone app with the four critical client flows: sign · upload · pay · review.',                                  tag: 'Portal',     votes: 234, ship: 'v4.5 · Feb 8, 2026' },
    { id: 's7',  title: 'TaxDome migration tool',              desc: 'One-click export from TaxDome into Ledger with documents, engagement state, and contact metadata preserved.',         tag: 'Onboarding', votes: 312, ship: 'v4.4 · Jan 24, 2026' },
  ],
  progress: [
    { id: 'p1', title: 'Multi-state tax engine',              desc: 'Native handling of nexus, apportionment, and conformity for all 47 states. Calculator preview already live.',          tag: 'Tax engine', votes: 267, eta: 'Jun 2026', progress: 72 },
    { id: 'p2', title: 'AI Research workspace · v2',          desc: 'Doubling citation accuracy with a fine-tuned model on 2.4M anonymized tax positions. Beta with 12 firms.',             tag: 'AI',         votes: 421, eta: 'Jun 2026', progress: 58 },
    { id: 'p3', title: 'QuickBooks Desktop two-way sync',      desc: 'Read + write transactions directly to QBD via Intuit\'s deprecated SDK and our migration shim.',                       tag: 'Integrations', votes: 189, eta: 'Jul 2026', progress: 34 },
    { id: 'p4', title: 'Drake Tax engagement push',            desc: 'Push completed engagements directly into Drake without re-keying. Field mapping done, e-file integration next.',     tag: 'Integrations', votes: 156, eta: 'Jul 2026', progress: 41 },
    { id: 'p5', title: 'Slack & Teams notifications',          desc: 'Send deadline alerts, document arrivals, and engagement updates to your firm\'s chat tool.',                            tag: 'Integrations', votes: 98,  eta: 'Aug 2026', progress: 22 },
    { id: 'p6', title: 'AI summarized client meetings',        desc: 'Connect a Zoom or Google Meet recording, get a tax-aware summary with action items and follow-up emails drafted.',     tag: 'AI',         votes: 144, eta: 'Sep 2026', progress: 14 },
  ],
  next: [
    { id: 'n1', title: 'State e-file gateway · all 47',        desc: 'Native state e-file without bouncing through Drake. Federal first, then states ranked by request volume.',            tag: 'Tax engine',      votes: 287, eta: 'Q3 2026' },
    { id: 'n2', title: 'Client text/SMS reminders',            desc: 'Two-way SMS through Twilio for clients who don\'t live in their email inbox.',                                          tag: 'Portal',          votes: 178, eta: 'Q3 2026' },
    { id: 'n3', title: 'Audit & exam representation hub',     desc: 'Full-fledged workspace for IRS exams: Form 2848 management, document requests tracking, response drafting.',         tag: 'Practice',        votes: 234, eta: 'Q3 2026' },
    { id: 'n4', title: 'Bookkeeper sub-account roles',         desc: 'Lower-permission seats for outsourced bookkeepers without exposing client tax positions.',                            tag: 'Admin',           votes: 89,  eta: 'Q3 2026' },
    { id: 'n5', title: 'Refer-a-firm referral program',         desc: 'In-product flow for firm-to-firm referrals with revenue share tracking.',                                              tag: 'Growth',          votes: 67,  eta: 'Q3 2026' },
    { id: 'n6', title: 'Tax planning scenario modeling',        desc: 'Save side-by-side scenarios for a client and share comparative outputs with them.',                                  tag: 'AI',              votes: 198, eta: 'Q3 2026' },
    { id: 'n7', title: 'Andriod mobile app',                    desc: 'Native Android app with feature parity to iOS. Public beta first, then the Play Store.',                              tag: 'Portal',          votes: 134, eta: 'Q3 2026' },
    { id: 'n8', title: 'SOC 2 Type II audit · 2026',           desc: 'Annual recertification audit with new infrastructure scope. Customer-facing report available on request.',           tag: 'Compliance',      votes: 56,  eta: 'Q3 2026' },
  ],
  exploring: [
    { id: 'e1',  title: 'International returns · 1040-NR',     desc: 'Filing for non-resident aliens with US-source income. Hearing strong demand from EAs in border states.',              tag: 'Tax engine' },
    { id: 'e2',  title: 'Estate & trust returns · 1041',       desc: 'High-complexity, niche, but recurring revenue.',                                                                       tag: 'Tax engine' },
    { id: 'e3',  title: 'Bookkeeping module · in-product',     desc: 'A real bookkeeping ledger inside Ledger. Could replace QBO for solos with simple books.',                              tag: 'New surface' },
    { id: 'e4',  title: 'Client referrals via portal',         desc: 'Make it dead simple for happy clients to refer their network from inside their portal.',                              tag: 'Growth' },
    { id: 'e5',  title: 'AI tax research → published memo',    desc: 'One-click conversion of an AI research thread into a citable, branded memo PDF.',                                     tag: 'AI' },
    { id: 'e6',  title: 'CPA exam prep via product usage',     desc: 'Earn CPE credit for time spent in research workspace. Speculative.',                                                  tag: 'Learning' },
    { id: 'e7',  title: 'Insurance workflow · E&O coverage',   desc: 'Embedded E&O insurance offering for solo practitioners. Marketplace, not own product.',                                tag: 'Adjacent' },
    { id: 'e8',  title: 'Voice transcription for client calls',desc: 'On-device recording with speaker diarization, then summarized into the engagement notes.',                              tag: 'AI' },
    { id: 'e9',  title: 'Multi-tenant for accounting school',   desc: 'Universities licensing Ledger for their accounting programs. Pipeline of 14 schools.',                                tag: 'Adjacent' },
  ],
};

const TAG_COLORS = {
  AI:            T.copper,
  Practice:      T.primary,
  Portal:        T.gold,
  Onboarding:    T.copperLt,
  'Tax engine':  T.primary2,
  Integrations:  T.gold,
  Admin:         T.muted,
  Growth:        T.copper,
  Compliance:    T.danger,
  'New surface': T.copper,
  Learning:      T.primary,
  Adjacent:      T.muted,
};

/* ============================================================
   CHANGELOG DATA — the recent ship history
   ============================================================ */
const CHANGELOG = [
  {
    version: 'v4.7.2',
    date: 'Apr 30, 2026',
    title: 'AI document inbox · classification accuracy',
    blurb: 'A focused release that doubled down on the AI document inbox after 30 days of production data.',
    author: { name: 'Aanya Kapoor',  initial: 'AK', role: 'Head of AI' },
    hero: 'ai-inbox',
    sections: [
      { kind: 'major', icon: Sparkles, label: 'New', items: [
        'Auto-detection of K-1 forms across 12 partnership tax software vendors',
        'Confidence scoring on every classification (visible to firms with admin role)',
        'Bulk reclassification UI for correcting AI mistakes 50 docs at a time',
      ] },
      { kind: 'improved', icon: Wrench, label: 'Improved', items: [
        'Classification accuracy now 94.2%, up from 89.1% last release',
        'Inbox sort order respects "needs review" first by default',
        'PDF text extraction is 3.2× faster on multi-page documents',
      ] },
      { kind: 'fixed', icon: Bug, label: 'Fixed', items: [
        'Wage statements with 2-up printing now correctly split into per-employee files',
        'Mac Preview-edited PDFs no longer fail extraction',
        'Edge case where copy-paste from a screenshot would create empty document records',
      ] },
    ],
  },
  {
    version: 'v4.7.1',
    date: 'Apr 22, 2026',
    title: 'Tax season hardening',
    blurb: 'Reliability fixes and small UX wins from feedback during the April 15 push.',
    author: { name: 'Jordan Tran', initial: 'JT', role: 'Head of Eng' },
    hero: 'reliability',
    sections: [
      { kind: 'improved', icon: Wrench, label: 'Improved', items: [
        'War Room now refreshes every 3 seconds (was 8) — feels noticeably more "live"',
        'Dashboard scatter plot tooltips no longer flicker on hover',
        'Search across the practice now indexes engagement notes, not just client names',
        'Signature confirmation emails arrive within 4 seconds of signing (was ~25)',
      ] },
      { kind: 'fixed', icon: Bug, label: 'Fixed', items: [
        'Drake Tax push for 1120-S returns with > 50 shareholders no longer truncates',
        'CP2000 drafter occasionally hallucinated incorrect IRC subsection — now grounded against new test set',
        'White-label preview wouldn\'t reload when changing accent color twice in a row',
      ] },
    ],
  },
  {
    version: 'v4.7.0',
    date: 'Apr 14, 2026',
    title: 'Predictive deadline radar',
    blurb: 'Our biggest practice-management ship of the year. Spot at-risk filings 7-30 days before they slip.',
    author: { name: 'Suresh Patel', initial: 'SP', role: 'CEO' },
    hero: 'radar',
    sections: [
      { kind: 'major', icon: Sparkles, label: 'New', items: [
        'Predictive Deadline Radar — risk-scores every active engagement against the calendar',
        'Stuck Engagements panel — surfaces clients who haven\'t moved in 7+ days with intervention suggestions',
        'AI rebalance suggestions — recommends reassignments across team based on capacity and specialty',
      ] },
      { kind: 'improved', icon: Wrench, label: 'Improved', items: [
        'Pipeline kanban now drag-drop with optimistic UI; perceived latency drops to ~50ms',
        'Engagement detail drawer shows blockers ranked by likelihood',
      ] },
    ],
  },
  {
    version: 'v4.6.4',
    date: 'Mar 28, 2026',
    title: 'War Room launch',
    blurb: 'Real-time tax season ops view, built for the 60 days around April 15.',
    author: { name: 'Margaux Renault', initial: 'MR', role: 'Head of Tax' },
    hero: 'warroom',
    sections: [
      { kind: 'major', icon: Sparkles, label: 'New', items: [
        '7-stage pipeline kanban with 21 client cards and risk-colored borders',
        'Team Load panel with utilization bars and AI rebalance prompts',
        'Throughput chart vs. daily target across the working week',
        'Activity stream pulsing every 3 seconds during operating hours',
      ] },
    ],
  },
  {
    version: 'v4.6.0',
    date: 'Mar 12, 2026',
    title: 'CP2000 reply drafting',
    blurb: 'Upload a notice scan, get a defensible reply draft in 30 seconds, fully cited.',
    author: { name: 'Aanya Kapoor', initial: 'AK', role: 'Head of AI' },
    hero: 'cp2000',
    sections: [
      { kind: 'major', icon: Sparkles, label: 'New', items: [
        'CP2000 notice ingestion via portal upload or AI inbox',
        'Auto-generated reply with three outcome scenarios (likely / possible / unlikely)',
        'Inline IRC and Treasury Reg citations on every claim',
        'Direct push to client portal for review and signature',
      ] },
    ],
  },
];

/* ============================================================
   STATS · THE TICKER
   ============================================================ */
const STATS = [
  { l: 'Releases',         v: '47',     d: 'in the last 12 months' },
  { l: 'Avg ship cadence', v: '7.6 d',  d: 'between releases' },
  { l: 'User-requested',    v: '78%',   d: 'of features ship from voted ideas' },
  { l: 'On-time delivery',  v: '94%',   d: 'of committed roadmap items' },
];

/* ============================================================
   HELPERS
   ============================================================ */
const cx = (...a) => a.filter(Boolean).join(' ');

function Pill({ children, tone = 'neutral', tiny = false, mono = false, custom }) {
  if (custom) {
    const sz = tiny ? 'px-1.5 py-[1px] text-[8.5px]' : 'px-2 py-[2px] text-[10px]';
    return (
      <span
        className={`inline-flex items-center gap-1 ${sz} uppercase tracking-[0.08em] border rounded-[2px]`}
        style={{ background: custom.bg, color: custom.fg, borderColor: custom.bd, fontFamily: mono ? FONT_MONO : FONT_BODY, fontWeight: 500 }}
      >
        {children}
      </span>
    );
  }
  const tones = {
    neutral: { bg: '#EFE8D6', fg: T.ink2,    bd: T.rule2 },
    low:     { bg: '#E2EBE3', fg: T.ok,      bd: '#C8D8CB' },
    med:     { bg: '#F5E6C9', fg: '#8A6418', bd: '#E5D2A7' },
    high:    { bg: '#F2D9D1', fg: T.danger,  bd: '#E8C2B6' },
    primary: { bg: '#D8E5E3', fg: T.primary, bd: '#B8CECB' },
    copper:  { bg: '#F8E2D1', fg: T.copper,  bd: '#EFCDB1' },
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

function TagPill({ tag, tiny }) {
  const c = TAG_COLORS[tag] || T.muted;
  return (
    <Pill custom={{ bg: c + '15', fg: c, bd: c + '35' }} tiny={tiny}>{tag}</Pill>
  );
}

/* ============================================================
   STICKY NAV
   ============================================================ */
function Nav({ scrolled, view, setView }) {
  return (
    <nav
      className="sticky top-0 z-40 transition-all"
      style={{
        background: scrolled ? 'rgba(244,239,230,0.85)' : T.bg,
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: `1px solid ${scrolled ? T.rule : 'transparent'}`,
        fontFamily: FONT_BODY,
      }}
    >
      <div className="mx-auto max-w-[1380px] px-10 py-4 flex items-center">
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
            Roadmap & Changelog
          </span>
        </div>

        <div className="ml-12 flex items-center gap-1 p-0.5 rounded-[3px]" style={{ background: T.surface, border: `1px solid ${T.rule}` }}>
          {[
            ['roadmap', 'Roadmap', Map],
            ['changelog', 'Changelog', GitCommit],
            ['principles', 'Principles', Anchor],
          ].map(([k, v, Icon]) => (
            <button
              key={k}
              onClick={() => setView(k)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-[3px] text-[12px]"
              style={{
                background: view === k ? T.primary : 'transparent',
                color: view === k ? T.surface : T.ink2,
                fontWeight: view === k ? 500 : 400,
              }}
            >
              <Icon size={11}/> {v}
            </button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-3">
          <a
            className="text-[11.5px] flex items-center gap-1.5"
            style={{ color: T.muted }}
            href="#"
          >
            <Bell size={12}/> Subscribe
          </a>
          <button
            className="px-3.5 py-2 text-[12px] flex items-center gap-1.5 rounded-[3px]"
            style={{ background: T.copper, color: T.surface, fontWeight: 500 }}
          >
            <Lightbulb size={12}/> Submit an idea
          </button>
        </div>
      </div>
    </nav>
  );
}

/* ============================================================
   ROADMAP HERO
   ============================================================ */
function RoadmapHero() {
  return (
    <section className="relative overflow-hidden" style={{ background: T.bg }}>
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

      <div className="relative mx-auto max-w-[1380px] px-10 pt-16 pb-14">
        <div className="flex items-center gap-3 mb-7">
          <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: T.copper, fontWeight: 500 }}>00</span>
          <span style={{ width: 24, height: 1, background: T.rule2 }}/>
          <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: T.muted }}>Roadmap · Vol. IV · live</span>
        </div>

        <div className="grid grid-cols-12 gap-8 items-end">
          <div className="col-span-8">
            <h1
              style={{
                fontFamily: FONT_DISPLAY, fontSize: 96, lineHeight: 0.94,
                letterSpacing: '-0.03em', color: T.ink, fontStyle: 'italic',
              }}
            >
              What we're<br/>
              <span style={{ color: T.copper }}>shipping</span> —<br/>
              and what we're not.
            </h1>
            <p
              className="mt-7 max-w-[640px]"
              style={{ fontSize: 16, color: T.ink2, lineHeight: 1.6 }}
            >
              An open record of every release we've shipped, every commit we've made for the next quarter,
              and every idea we're considering. We tell you what we won't build, too. Especially that.
            </p>
          </div>

          <div className="col-span-4">
            <div className="grid grid-cols-2 gap-px" style={{ background: T.rule }}>
              {STATS.map((s, i) => (
                <div key={i} className="px-4 py-4" style={{ background: T.bg }}>
                  <div className="text-[9px] uppercase tracking-[0.16em]" style={{ color: T.muted, fontWeight: 500 }}>{s.l}</div>
                  <div style={{ fontFamily: FONT_DISPLAY, fontSize: 32, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.025em', lineHeight: 1, marginTop: 4 }}>
                    {s.v}
                  </div>
                  <div className="text-[10px] mt-1.5" style={{ color: T.muted, lineHeight: 1.4 }}>{s.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   ROADMAP BOARD — 4-column kanban
   ============================================================ */
function RoadmapBoard() {
  const [filter, setFilter] = useState('all');
  const [openItem, setOpenItem] = useState(null);
  const allTags = useMemo(() => {
    const set = new Set();
    Object.values(ROADMAP_ITEMS).flat().forEach(i => set.add(i.tag));
    return ['all', ...Array.from(set)];
  }, []);

  const itemsFor = (col) => {
    const items = ROADMAP_ITEMS[col] || [];
    if (filter === 'all') return items;
    return items.filter(i => i.tag === filter);
  };

  return (
    <section style={{ background: T.bg }}>
      <div className="mx-auto max-w-[1380px] px-10 pt-2 pb-14">
        {/* Filter row */}
        <div className="mb-5 flex items-center gap-2 flex-wrap">
          <span className="text-[10px] uppercase tracking-[0.16em]" style={{ color: T.muted, marginRight: 6 }}>Filter by tag</span>
          {allTags.map(t => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className="text-[11px] px-2.5 py-1.5 rounded-[3px] capitalize"
              style={{
                background: filter === t ? T.primary : T.surface,
                color: filter === t ? T.surface : T.ink2,
                border: `1px solid ${filter === t ? T.primary : T.rule}`,
                fontWeight: filter === t ? 500 : 400,
              }}
            >
              {t === 'all' ? 'All' : t}
            </button>
          ))}
          <span className="ml-auto text-[10.5px]" style={{ color: T.muted }}>
            <span style={{ color: T.copper, fontWeight: 500, fontFamily: FONT_MONO }}>
              {ROADMAP_COLUMNS.reduce((s, c) => s + itemsFor(c.id).length, 0)}
            </span> items shown
          </span>
        </div>

        {/* The four columns */}
        <div className="grid grid-cols-4 gap-4">
          {ROADMAP_COLUMNS.map(col => {
            const items = itemsFor(col.id);
            const Icon = col.icon;
            return (
              <div key={col.id} className="flex flex-col">
                {/* Column header */}
                <div
                  className="px-4 py-4 rounded-t-[4px]"
                  style={{
                    background: col.bg,
                    border: `1px solid ${col.color}30`,
                    borderBottom: 'none',
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Icon size={14} style={{ color: col.color }}/>
                    <span style={{ fontFamily: FONT_DISPLAY, fontSize: 22, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.01em', lineHeight: 1 }}>
                      {col.title}
                    </span>
                    <span className="text-[10.5px] ml-auto" style={{ color: col.color, fontFamily: FONT_MONO, fontWeight: 500 }}>
                      {items.length}
                    </span>
                  </div>
                  <div className="text-[10.5px] uppercase tracking-[0.12em]" style={{ color: T.muted, fontWeight: 500 }}>{col.label}</div>
                  <div className="text-[10.5px] italic mt-0.5" style={{ color: T.muted }}>{col.blurb}</div>
                </div>

                {/* Items */}
                <div
                  className="flex-1 p-2.5 flex flex-col gap-2 rounded-b-[4px]"
                  style={{
                    background: T.surface3,
                    border: `1px solid ${col.color}30`,
                    borderTop: 'none',
                    minHeight: 360,
                  }}
                >
                  {items.length === 0 ? (
                    <div className="text-[11px] italic text-center py-8" style={{ color: T.faint }}>
                      No items match this filter
                    </div>
                  ) : items.map(item => (
                    <RoadmapCard
                      key={item.id}
                      item={item}
                      column={col}
                      onOpen={() => setOpenItem({ ...item, column: col })}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {openItem && <RoadmapModal item={openItem} onClose={() => setOpenItem(null)}/>}
      </div>
    </section>
  );
}

function RoadmapCard({ item, column, onOpen }) {
  return (
    <button
      onClick={onOpen}
      className="text-left p-3 rounded-[3px] transition-transform hover:-translate-y-px group"
      style={{
        background: T.surface,
        border: `1px solid ${T.rule}`,
        borderLeft: `3px solid ${column.color}`,
      }}
    >
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <div className="text-[12.5px]" style={{ color: T.ink, fontWeight: 500, lineHeight: 1.3 }}>
          {item.title}
        </div>
      </div>
      <div className="text-[10.5px]" style={{ color: T.ink2, lineHeight: 1.5, marginBottom: 8 }}>
        {item.desc.length > 90 ? item.desc.slice(0, 90) + '…' : item.desc}
      </div>

      {/* Progress bar for in-progress */}
      {item.progress != null && (
        <div className="mt-2 mb-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[9px] uppercase tracking-[0.14em]" style={{ color: T.muted, fontWeight: 500 }}>Progress</span>
            <span className="text-[9.5px]" style={{ color: column.color, fontFamily: FONT_MONO, fontWeight: 500 }}>{item.progress}%</span>
          </div>
          <div className="h-[3px] rounded-full" style={{ background: T.rule }}>
            <div style={{ height: '100%', width: `${item.progress}%`, background: column.color, borderRadius: 999 }}/>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between gap-2 pt-2" style={{ borderTop: `1px dashed ${T.rule2}` }}>
        <TagPill tag={item.tag} tiny/>
        <div className="flex items-center gap-1.5">
          {item.votes != null && (
            <span className="text-[10px] flex items-center gap-1" style={{ color: T.muted }}>
              <ThumbsUp size={9}/> <span style={{ fontFamily: FONT_MONO, color: T.ink2, fontWeight: 500 }}>{item.votes}</span>
            </span>
          )}
          {(item.eta || item.ship) && (
            <span className="text-[9.5px]" style={{ color: column.color, fontFamily: FONT_MONO, fontWeight: 500 }}>
              {(item.eta || item.ship).split(' · ')[0]}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

function RoadmapModal({ item, onClose }) {
  const Icon = item.column.icon;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ background: 'rgba(20,15,8,0.55)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[640px] rounded-[6px] overflow-hidden"
        style={{
          background: T.surface,
          border: `1px solid ${T.rule}`,
          boxShadow: '0 60px 120px -30px rgba(20,15,8,0.5)',
          fontFamily: FONT_BODY,
        }}
      >
        <div
          className="px-7 py-6"
          style={{
            background: item.column.bg,
            borderBottom: `1px solid ${item.column.color}30`,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Icon size={13} style={{ color: item.column.color }}/>
                <span style={{ fontFamily: FONT_MONO, fontSize: 10, color: item.column.color, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 500 }}>
                  {item.column.title}
                </span>
                <span style={{ width: 16, height: 1, background: item.column.color + '40' }}/>
                <TagPill tag={item.tag} tiny/>
              </div>
              <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 32, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.015em', lineHeight: 1.1 }}>
                {item.title}
              </h2>
            </div>
            <button onClick={onClose} className="p-2 rounded-[3px]" style={{ background: T.surface, border: `1px solid ${T.rule}` }}>
              <ChevronRight style={{ transform: 'rotate(45deg)' }} size={14}/>
            </button>
          </div>
        </div>

        <div className="px-7 py-6">
          <p className="text-[14px]" style={{ color: T.ink2, lineHeight: 1.7 }}>
            {item.desc}
          </p>

          <div className="mt-6 grid grid-cols-3 gap-2">
            <div className="p-3 rounded-[3px]" style={{ background: T.surface2, border: `1px solid ${T.rule}` }}>
              <div className="text-[9px] uppercase tracking-[0.14em]" style={{ color: T.muted, fontWeight: 500 }}>Status</div>
              <div className="mt-1" style={{ fontFamily: FONT_DISPLAY, fontSize: 18, fontStyle: 'italic', color: item.column.color, letterSpacing: '-0.01em', lineHeight: 1 }}>
                {item.column.title}
              </div>
            </div>
            {item.votes != null && (
              <div className="p-3 rounded-[3px]" style={{ background: T.surface2, border: `1px solid ${T.rule}` }}>
                <div className="text-[9px] uppercase tracking-[0.14em]" style={{ color: T.muted, fontWeight: 500 }}>Votes</div>
                <div className="mt-1" style={{ fontFamily: FONT_DISPLAY, fontSize: 18, fontStyle: 'italic', color: T.ink, letterSpacing: '-0.01em', lineHeight: 1 }}>
                  {item.votes}
                </div>
              </div>
            )}
            {(item.eta || item.ship) && (
              <div className="p-3 rounded-[3px]" style={{ background: T.surface2, border: `1px solid ${T.rule}` }}>
                <div className="text-[9px] uppercase tracking-[0.14em]" style={{ color: T.muted, fontWeight: 500 }}>
                  {item.ship ? 'Shipped' : 'ETA'}
                </div>
                <div className="mt-1 text-[12.5px]" style={{ color: T.ink, fontFamily: FONT_MONO, fontWeight: 500, lineHeight: 1.2 }}>
                  {item.eta || item.ship}
                </div>
              </div>
            )}
          </div>

          {item.progress != null && (
            <div className="mt-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase tracking-[0.14em]" style={{ color: T.muted, fontWeight: 500 }}>Build progress</span>
                <span className="text-[12px]" style={{ color: item.column.color, fontFamily: FONT_MONO, fontWeight: 500 }}>{item.progress}%</span>
              </div>
              <div className="h-[6px] rounded-full" style={{ background: T.rule }}>
                <div style={{ height: '100%', width: `${item.progress}%`, background: item.column.color, borderRadius: 999 }}/>
              </div>
            </div>
          )}

          {!item.ship && (
            <div className="mt-6 pt-5 flex items-center justify-between" style={{ borderTop: `1px solid ${T.rule}` }}>
              <span className="text-[12px]" style={{ color: T.ink2 }}>
                Want this sooner? Vote it up.
              </span>
              <button className="px-3 py-2 text-[11.5px] flex items-center gap-1.5 rounded-[3px]" style={{ background: T.primary, color: T.surface, fontWeight: 500 }}>
                <ThumbsUp size={11}/> Vote · adds your firm
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   WONT BUILD SECTION
   ============================================================ */
function WontBuild() {
  const items = [
    {
      title: 'Per-client billing',
      reason: 'TaxDome\'s revenue model penalizes growing firms. We charge per practice and per seat — your book can grow without our bill growing with it.',
      decided: 'Decided · Q4 2025',
    },
    {
      title: 'Generic ChatGPT integration',
      reason: 'Bolting GPT onto a search box doesn\'t make tax software AI-native. Our co-pilot is grounded in IRC, regs, and case law — never just freeform.',
      decided: 'Decided · Q4 2025',
    },
    {
      title: 'TurboTax-style consumer 1040 prep',
      reason: 'We serve the practitioner, not the consumer. Selling direct-to-consumer would put us in conflict with the customer we actually want to win.',
      decided: 'Decided · Q1 2026',
    },
    {
      title: 'In-product cryptocurrency tax module',
      reason: 'Real demand exists, but the regulatory surface is too volatile and we\'d rather integrate with CoinTracker than reinvent.',
      decided: 'Decided · Q1 2026',
    },
  ];
  return (
    <section style={{ background: T.surface, borderTop: `1px solid ${T.rule}`, borderBottom: `1px solid ${T.rule}` }}>
      <div className="mx-auto max-w-[1380px] px-10 py-16">
        <div className="grid grid-cols-12 gap-12 items-start">
          <div className="col-span-4">
            <div className="text-[10px] uppercase tracking-[0.22em]" style={{ color: T.copper, fontWeight: 500 }}>02 · The other list</div>
            <h2 className="mt-2" style={{ fontFamily: FONT_DISPLAY, fontSize: 56, lineHeight: 0.96, letterSpacing: '-0.025em', color: T.ink, fontStyle: 'italic' }}>
              What we<br/>
              <span style={{ color: T.copper }}>won't</span> build.
            </h2>
            <p className="mt-5 text-[14px] max-w-[340px]" style={{ color: T.ink2, lineHeight: 1.6 }}>
              Most roadmaps say what's coming. Few say what isn't. We say both. It's how customers can plan around us instead of for us.
            </p>
          </div>

          <div className="col-span-8 grid grid-cols-2 gap-3">
            {items.map((item, i) => (
              <div key={i} className="p-5 rounded-[3px]" style={{ background: T.bg, border: `1px solid ${T.rule}` }}>
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="flex items-center justify-center"
                    style={{ width: 26, height: 26, background: T.surface2, border: `1px solid ${T.rule}`, borderRadius: 4 }}
                  >
                    <Ban size={12} style={{ color: T.danger }}/>
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.14em]" style={{ color: T.danger, fontWeight: 500 }}>Won't build</span>
                </div>
                <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 22, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.01em', lineHeight: 1.15 }}>
                  {item.title}
                </h3>
                <p className="mt-3 text-[12.5px]" style={{ color: T.ink2, lineHeight: 1.6 }}>
                  {item.reason}
                </p>
                <div className="mt-4 pt-3 text-[10px] italic" style={{ color: T.muted, borderTop: `1px dashed ${T.rule2}` }}>
                  {item.decided}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FEEDBACK CTA
   ============================================================ */
function FeedbackCTA() {
  return (
    <section style={{ background: T.primaryDk, color: T.surface, position: 'relative', overflow: 'hidden' }}>
      <div
        aria-hidden
        style={{
          position: 'absolute', right: -200, top: -150, width: 600, height: 600,
          border: `1px solid rgba(255,253,248,0.06)`, borderRadius: '50%',
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(circle at 80% 50%, rgba(196,106,45,0.12), transparent 60%)`,
        }}
      />
      <div className="relative mx-auto max-w-[1380px] px-10 py-16">
        <div className="grid grid-cols-12 gap-12 items-center">
          <div className="col-span-7">
            <div className="text-[10px] uppercase tracking-[0.22em]" style={{ color: T.copperLt, fontWeight: 500 }}>03 · Influence what we ship</div>
            <h2 className="mt-2" style={{ fontFamily: FONT_DISPLAY, fontSize: 60, lineHeight: 0.96, letterSpacing: '-0.025em', fontStyle: 'italic' }}>
              We read every<br/>idea. <span style={{ color: T.copperLt }}>Twice.</span>
            </h2>
            <p className="mt-5 max-w-[480px] text-[15px]" style={{ color: 'rgba(255,253,248,0.75)', lineHeight: 1.6 }}>
              78% of features ship from the votes you cast on this page. Submit an idea, vote on someone else's, or tell us we got something wrong.
            </p>

            <div className="mt-9 flex items-center gap-3">
              <button className="px-5 py-3 text-[13px] flex items-center gap-1.5 rounded-[3px]" style={{ background: T.copper, color: T.surface, fontWeight: 500 }}>
                <Lightbulb size={13}/> Submit an idea <ArrowRight size={12}/>
              </button>
              <button className="px-5 py-3 text-[13px] flex items-center gap-1.5 rounded-[3px]" style={{ background: 'transparent', color: T.surface, border: `1px solid rgba(255,253,248,0.3)`, fontWeight: 500 }}>
                <MessageCircle size={12}/> Talk to a founder
              </button>
            </div>
          </div>

          <div className="col-span-5">
            <div className="p-6 rounded-[4px]" style={{ background: 'rgba(255,253,248,0.06)', border: `1px solid rgba(255,253,248,0.18)` }}>
              <div className="text-[10px] uppercase tracking-[0.18em] mb-4" style={{ color: T.copperLt, fontWeight: 500 }}>Recent ideas from firms</div>
              <div className="flex flex-col gap-3">
                {[
                  { f: 'Renault & Wendell',  i: 'Native Form 2553 e-filing on S-corp election',          v: 47 },
                  { f: 'Powder River CPA',    i: 'Bulk K-1 generation from a partnership return',         v: 34 },
                  { f: 'Big Horn Bookkeeping', i: 'QuickBooks Desktop bidirectional sync',                  v: 89 },
                  { f: 'Anonymous',            i: 'Per-state quarterly estimate planning calculator',       v: 23 },
                ].map((idea, i) => (
                  <div key={i} className="flex items-start gap-3 py-2" style={{ borderTop: i > 0 ? `1px dashed rgba(255,253,248,0.12)` : 'none' }}>
                    <div className="flex-1">
                      <div className="text-[12.5px]" style={{ color: T.surface, lineHeight: 1.4 }}>{idea.i}</div>
                      <div className="text-[10px] mt-1" style={{ color: 'rgba(255,253,248,0.55)' }}>by {idea.f}</div>
                    </div>
                    <button className="flex flex-col items-center px-2 py-1 rounded-[3px]" style={{ background: 'rgba(255,253,248,0.06)', border: `1px solid rgba(255,253,248,0.15)` }}>
                      <ThumbsUp size={11} style={{ color: T.copperLt }}/>
                      <span className="text-[10px] mt-0.5" style={{ color: T.surface, fontFamily: FONT_MONO, fontWeight: 500 }}>{idea.v}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CHANGELOG VIEW
   ============================================================ */
function ChangelogView() {
  return (
    <>
      <ChangelogHero/>
      <ChangelogList/>
      <FeedbackCTA/>
    </>
  );
}

function ChangelogHero() {
  return (
    <section className="relative overflow-hidden" style={{ background: T.bg }}>
      <div
        aria-hidden
        style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(circle at 70% 30%, rgba(196,106,45,0.10), transparent 50%)`,
        }}
      />
      <div className="relative mx-auto max-w-[1380px] px-10 pt-16 pb-12">
        <div className="flex items-center gap-3 mb-7">
          <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: T.copper, fontWeight: 500 }}>00</span>
          <span style={{ width: 24, height: 1, background: T.rule2 }}/>
          <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: T.muted }}>Changelog · {CHANGELOG.length} entries shown</span>
        </div>

        <div className="grid grid-cols-12 gap-8 items-end">
          <div className="col-span-8">
            <h1
              style={{
                fontFamily: FONT_DISPLAY, fontSize: 88, lineHeight: 0.94,
                letterSpacing: '-0.03em', color: T.ink, fontStyle: 'italic',
              }}
            >
              Every release.<br/>
              Every <span style={{ color: T.copper }}>commit</span>.<br/>
              On the record.
            </h1>
            <p className="mt-7 max-w-[600px] text-[16px]" style={{ color: T.ink2, lineHeight: 1.6 }}>
              Notable releases since launch. We ship every Tuesday and again on Thursday when the team has the energy.
              No marketing fluff — what shipped, what got fixed, who built it.
            </p>
          </div>
          <div className="col-span-4">
            <div className="p-5 rounded-[3px]" style={{ background: T.surface, border: `1px solid ${T.rule}` }}>
              <div className="text-[10px] uppercase tracking-[0.16em] mb-3" style={{ color: T.muted, fontWeight: 500 }}>Latest release</div>
              <div className="flex items-baseline gap-3">
                <span style={{ fontFamily: FONT_DISPLAY, fontSize: 36, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.025em', lineHeight: 1 }}>
                  {CHANGELOG[0].version}
                </span>
                <span className="text-[11px]" style={{ color: T.muted, fontFamily: FONT_MONO }}>{CHANGELOG[0].date}</span>
              </div>
              <div className="mt-3 text-[12.5px]" style={{ color: T.ink, fontWeight: 500 }}>
                {CHANGELOG[0].title}
              </div>
              <button className="mt-4 w-full text-[11.5px] py-2 rounded-[3px] flex items-center justify-center gap-1.5" style={{ background: T.copper, color: T.surface, fontWeight: 500 }}>
                Subscribe to releases <Bell size={11}/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChangelogList() {
  return (
    <section style={{ background: T.bg }}>
      <div className="mx-auto max-w-[1380px] px-10 pb-20">
        <div className="grid grid-cols-12 gap-12">
          {/* Sticky version index */}
          <aside className="col-span-3">
            <div className="sticky top-24">
              <div className="text-[9.5px] uppercase tracking-[0.18em] mb-3" style={{ color: T.muted, fontWeight: 500 }}>
                <span style={{ color: T.copper, fontFamily: FONT_MONO, marginRight: 6 }}>01</span>
                All releases
              </div>
              <div className="flex flex-col">
                {CHANGELOG.map((r, i) => (
                  <a
                    key={i}
                    href={`#${r.version.replace(/\./g, '-')}`}
                    className="flex items-baseline gap-2 py-2 text-[11.5px]"
                    style={{
                      color: i === 0 ? T.copper : T.ink2,
                      fontWeight: i === 0 ? 500 : 400,
                      borderLeft: `2px solid ${i === 0 ? T.copper : T.rule}`,
                      paddingLeft: 12,
                    }}
                  >
                    <span style={{ fontFamily: FONT_MONO, fontSize: 11, color: i === 0 ? T.copper : T.muted, minWidth: 50 }}>
                      {r.version}
                    </span>
                    <span className="truncate">{r.title}</span>
                  </a>
                ))}
              </div>

              <div className="mt-8 p-4 rounded-[3px]" style={{ background: T.surface, border: `1px solid ${T.rule}` }}>
                <div className="text-[10px] uppercase tracking-[0.14em] mb-2" style={{ color: T.muted, fontWeight: 500 }}>Subscribe</div>
                <p className="text-[11.5px]" style={{ color: T.ink2, lineHeight: 1.55 }}>
                  Get release notes by email or RSS — every Tuesday morning.
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <button className="text-[10.5px] px-2.5 py-1.5 flex items-center gap-1 rounded-[3px]" style={{ background: T.surface2, color: T.ink2, border: `1px solid ${T.rule}` }}>
                    <Mail size={10}/> Email
                  </button>
                  <button className="text-[10.5px] px-2.5 py-1.5 flex items-center gap-1 rounded-[3px]" style={{ background: T.surface2, color: T.ink2, border: `1px solid ${T.rule}` }}>
                    <Globe size={10}/> RSS
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Release entries */}
          <div className="col-span-9 flex flex-col gap-12">
            {CHANGELOG.map((r, i) => (
              <ReleaseEntry key={i} release={r} pinned={i === 0}/>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ReleaseEntry({ release, pinned }) {
  return (
    <article
      id={release.version.replace(/\./g, '-')}
      className="rounded-[4px] overflow-hidden"
      style={{ background: T.surface, border: `1px solid ${pinned ? T.copper : T.rule}` }}
    >
      {/* Hero / cover */}
      <ReleaseHero kind={release.hero} version={release.version}/>

      <div className="px-8 py-7">
        {/* Meta */}
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <span style={{ fontFamily: FONT_MONO, fontSize: 13, color: T.copper, fontWeight: 500, letterSpacing: '0.04em' }}>
            {release.version}
          </span>
          <span style={{ width: 16, height: 1, background: T.rule2 }}/>
          <span className="text-[11px]" style={{ color: T.muted, fontFamily: FONT_MONO }}>{release.date}</span>
          {pinned && <Pill tone="copper" tiny><Star size={8}/> Latest</Pill>}
        </div>

        <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 38, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.02em', lineHeight: 1.05 }}>
          {release.title}
        </h2>
        <p className="mt-3 max-w-[640px] text-[14.5px]" style={{ color: T.ink2, lineHeight: 1.6 }}>
          {release.blurb}
        </p>

        {/* Author */}
        <div className="mt-5 pb-6 flex items-center gap-3" style={{ borderBottom: `1px solid ${T.rule}` }}>
          <div
            className="flex items-center justify-center text-[11px]"
            style={{ width: 30, height: 30, borderRadius: '50%', background: T.primary, color: T.surface, fontWeight: 600 }}
          >
            {release.author.initial}
          </div>
          <div className="flex-1">
            <div className="text-[12px]" style={{ color: T.ink, fontWeight: 500 }}>Shipped by {release.author.name}</div>
            <div className="text-[10.5px]" style={{ color: T.muted }}>{release.author.role}</div>
          </div>
          <button className="text-[10.5px] px-2.5 py-1 rounded-[2px] flex items-center gap-1" style={{ color: T.muted, border: `1px solid ${T.rule}` }}>
            <Copy size={10}/> Copy link
          </button>
        </div>

        {/* Sections */}
        <div className="mt-6 flex flex-col gap-6">
          {release.sections.map((sect, i) => {
            const Icon = sect.icon;
            const colors = {
              major:    { fg: T.copper,  bg: '#F8E2D1', label: 'New' },
              improved: { fg: T.primary, bg: '#D8E5E3', label: 'Improved' },
              fixed:    { fg: T.ok,      bg: '#E2EBE3', label: 'Fixed' },
            };
            const c = colors[sect.kind];
            return (
              <div key={i}>
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="flex items-center justify-center"
                    style={{ width: 24, height: 24, borderRadius: 4, background: c.bg, border: `1px solid ${c.fg}30` }}
                  >
                    <Icon size={12} style={{ color: c.fg }}/>
                  </div>
                  <span className="text-[10.5px] uppercase tracking-[0.16em]" style={{ color: c.fg, fontWeight: 600 }}>{sect.label}</span>
                  <span className="text-[10px]" style={{ color: T.muted, fontFamily: FONT_MONO }}>· {sect.items.length} items</span>
                </div>
                <ul className="flex flex-col gap-2 pl-2">
                  {sect.items.map((item, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2.5 text-[13px]"
                      style={{ color: T.ink2, lineHeight: 1.65, fontFamily: FONT_BODY }}
                    >
                      <span
                        className="mt-2 shrink-0"
                        style={{ width: 4, height: 4, borderRadius: '50%', background: c.fg }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </article>
  );
}

function ReleaseHero({ kind, version }) {
  const heroes = {
    'ai-inbox': {
      bg: T.copper,
      fg: T.surface,
      title: 'AI Inbox',
      sub: '94.2% accuracy',
      shape: 'circles',
    },
    'reliability': {
      bg: T.primary,
      fg: T.copperLt,
      title: 'Hardening',
      sub: 'Tax season fixes',
      shape: 'grid',
    },
    'radar': {
      bg: T.primaryDk,
      fg: T.copperLt,
      title: 'Deadline Radar',
      sub: 'Predictive risk',
      shape: 'radar',
    },
    'warroom': {
      bg: T.primaryDk,
      fg: T.copperLt,
      title: 'War Room',
      sub: 'Live ops',
      shape: 'pulse',
    },
    'cp2000': {
      bg: T.primary2,
      fg: T.copperLt,
      title: 'CP2000 Drafter',
      sub: '30-second replies',
      shape: 'document',
    },
  };
  const h = heroes[kind] || heroes['ai-inbox'];

  return (
    <div
      className="relative flex items-end justify-between px-8 pt-7 pb-7 overflow-hidden"
      style={{ background: h.bg, color: h.fg, minHeight: 160 }}
    >
      {/* Atmospheric */}
      {h.shape === 'circles' && (
        <>
          <div aria-hidden style={{ position: 'absolute', right: -60, top: -60, width: 220, height: 220, border: `1px solid rgba(255,253,248,0.18)`, borderRadius: '50%' }}/>
          <div aria-hidden style={{ position: 'absolute', right: -20, top: -20, width: 140, height: 140, border: `1px solid rgba(255,253,248,0.25)`, borderRadius: '50%' }}/>
          <div aria-hidden style={{ position: 'absolute', right: 30, top: 30, width: 60, height: 60, background: 'rgba(255,253,248,0.15)', borderRadius: '50%' }}/>
        </>
      )}
      {h.shape === 'grid' && (
        <div
          aria-hidden
          style={{
            position: 'absolute', inset: 0, opacity: 0.5,
            backgroundImage: `linear-gradient(rgba(255,253,248,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,253,248,0.08) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
      )}
      {h.shape === 'radar' && (
        <svg
          aria-hidden
          width={300} height={300}
          style={{ position: 'absolute', right: -80, top: -120, opacity: 0.35 }}
          viewBox="0 0 300 300"
        >
          {[1,2,3,4].map(i => <circle key={i} cx={150} cy={150} r={i * 32} fill="none" stroke="rgba(255,253,248,0.4)" strokeWidth={1}/>)}
          <line x1={150} y1={20} x2={150} y2={280} stroke="rgba(255,253,248,0.25)" strokeWidth={1}/>
          <line x1={20} y1={150} x2={280} y2={150} stroke="rgba(255,253,248,0.25)" strokeWidth={1}/>
          <circle cx={186} cy={94} r={4} fill={T.copperLt}/>
          <circle cx={108} cy={172} r={4} fill={T.copperLt}/>
          <circle cx={210} cy={208} r={4} fill={T.copperLt}/>
        </svg>
      )}
      {h.shape === 'pulse' && (
        <>
          <div aria-hidden style={{ position: 'absolute', right: -40, top: -40, width: 180, height: 180, border: `1px solid rgba(196,106,45,0.35)`, borderRadius: '50%' }}/>
          <svg aria-hidden width={300} height={120} style={{ position: 'absolute', right: 20, bottom: 20, opacity: 0.4 }} viewBox="0 0 300 120">
            <polyline points="0,80 40,80 50,40 70,90 90,30 110,70 130,80 160,30 180,80 220,80 240,50 260,80 300,80" fill="none" stroke={T.copperLt} strokeWidth={2}/>
          </svg>
        </>
      )}
      {h.shape === 'document' && (
        <>
          <div aria-hidden style={{ position: 'absolute', right: 30, top: 25, width: 90, height: 110, background: 'rgba(255,253,248,0.10)', borderRadius: 4, transform: 'rotate(-6deg)' }}/>
          <div aria-hidden style={{ position: 'absolute', right: 50, top: 35, width: 90, height: 110, background: 'rgba(255,253,248,0.15)', borderRadius: 4, transform: 'rotate(3deg)' }}/>
        </>
      )}

      <div className="relative">
        <div className="text-[9.5px] uppercase tracking-[0.22em] mb-3" style={{ color: 'rgba(255,253,248,0.7)', fontWeight: 500 }}>
          {version}
        </div>
        <div style={{ fontFamily: FONT_DISPLAY, fontSize: 38, fontStyle: 'italic', letterSpacing: '-0.02em', lineHeight: 1, color: T.surface }}>
          {h.title}
        </div>
        <div className="mt-2 text-[11px]" style={{ color: 'rgba(255,253,248,0.65)', fontFamily: FONT_MONO }}>
          {h.sub}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   PRINCIPLES VIEW
   ============================================================ */
function PrinciplesView() {
  const principles = [
    {
      n: '01',
      title: 'Ship every Tuesday',
      blurb: 'A predictable cadence beats heroic launches. We ship something — usually small — every Tuesday morning. Customers can plan around us.',
      tags: ['Cadence', 'Reliability'],
    },
    {
      n: '02',
      title: 'AI is grounded, not generative',
      blurb: 'Our co-pilot cites IRC, regs, and case law. If we can\'t cite it, we don\'t say it. Tax positions made up from thin air are how firms lose clients.',
      tags: ['AI', 'Trust'],
    },
    {
      n: '03',
      title: 'Charge per practice, not per client',
      blurb: 'TaxDome\'s revenue model penalizes firms that grow. Ours doesn\'t. Your book can scale 10× without our bill scaling with it.',
      tags: ['Pricing', 'Alignment'],
    },
    {
      n: '04',
      title: 'White-label is included, not extra',
      blurb: 'Your firm\'s name on your portal is core, not a paywalled enterprise feature. Available on every plan from day one.',
      tags: ['Branding', 'Fairness'],
    },
    {
      n: '05',
      title: 'No model training on client data',
      blurb: 'Period. Tax data is privileged. We use it to serve you and we delete it on request. Your competitors don\'t train on your filings.',
      tags: ['Privacy', 'Compliance'],
    },
    {
      n: '06',
      title: '78% of features come from votes',
      blurb: 'Our roadmap isn\'t our roadmap. It\'s the firms\' roadmap. We measure the % of releases that ship from voted ideas. The number stays high deliberately.',
      tags: ['Listening', 'Process'],
    },
    {
      n: '07',
      title: 'Build for the practitioner, not the consumer',
      blurb: 'We will never sell direct-to-consumer 1040s. The practitioner is our customer; competing with our customer would betray that.',
      tags: ['Positioning'],
    },
    {
      n: '08',
      title: 'Tell people what we won\'t build',
      blurb: 'A real "won\'t" is more useful than a vague "will". Our roadmap has a "Won\'t build" section so firms can plan around us with confidence.',
      tags: ['Honesty', 'Roadmap'],
    },
  ];

  return (
    <section style={{ background: T.bg }}>
      <div className="mx-auto max-w-[1380px] px-10 pt-16 pb-20">
        <div className="flex items-center gap-3 mb-7">
          <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: T.copper, fontWeight: 500 }}>00</span>
          <span style={{ width: 24, height: 1, background: T.rule2 }}/>
          <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: T.muted }}>Engineering principles · Vol. IV</span>
        </div>

        <div className="grid grid-cols-12 gap-8 mb-14">
          <div className="col-span-7">
            <h1
              style={{
                fontFamily: FONT_DISPLAY, fontSize: 88, lineHeight: 0.94,
                letterSpacing: '-0.03em', color: T.ink, fontStyle: 'italic',
              }}
            >
              How we<br/>
              <span style={{ color: T.copper }}>build</span>.
            </h1>
            <p className="mt-7 max-w-[600px] text-[16px]" style={{ color: T.ink2, lineHeight: 1.6 }}>
              The eight principles that govern every decision on our roadmap. We commit to them publicly so you can hold us to them.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {principles.map((p, i) => (
            <article
              key={i}
              className="p-7 rounded-[4px] relative overflow-hidden"
              style={{
                background: i % 4 === 0 ? T.primary : T.surface,
                color: i % 4 === 0 ? T.surface : T.ink,
                border: `1px solid ${i % 4 === 0 ? T.primary : T.rule}`,
              }}
            >
              <div className="flex items-baseline justify-between mb-5">
                <span style={{ fontFamily: FONT_DISPLAY, fontSize: 56, color: i % 4 === 0 ? T.copperLt : T.copper, fontStyle: 'italic', letterSpacing: '-0.025em', lineHeight: 0.85 }}>
                  {p.n}
                </span>
                <Anchor size={16} style={{ color: i % 4 === 0 ? T.copperLt : T.copper, opacity: 0.6 }}/>
              </div>
              <h3
                style={{
                  fontFamily: FONT_DISPLAY, fontSize: 28, fontStyle: 'italic',
                  letterSpacing: '-0.015em', lineHeight: 1.1,
                }}
              >
                {p.title}.
              </h3>
              <p className="mt-3 text-[13.5px]" style={{ color: i % 4 === 0 ? 'rgba(255,253,248,0.8)' : T.ink2, lineHeight: 1.65 }}>
                {p.blurb}
              </p>
              <div className="mt-5 pt-4 flex items-center gap-1.5 flex-wrap" style={{ borderTop: `1px dashed ${i % 4 === 0 ? 'rgba(255,253,248,0.2)' : T.rule2}` }}>
                {p.tags.map(t => (
                  <span
                    key={t}
                    className="text-[9.5px] px-2 py-[2px] rounded-[2px] uppercase tracking-[0.1em]"
                    style={{
                      background: i % 4 === 0 ? 'rgba(255,253,248,0.10)' : T.surface2,
                      color: i % 4 === 0 ? T.copperLt : T.muted,
                      border: `1px solid ${i % 4 === 0 ? 'rgba(255,253,248,0.18)' : T.rule}`,
                      fontWeight: 500,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
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
    <footer style={{ background: T.surface, borderTop: `1px solid ${T.rule}` }}>
      <div className="mx-auto max-w-[1380px] px-10 py-10">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2.5">
            <div
              className="flex items-center justify-center"
              style={{
                width: 26, height: 26, borderRadius: 3, background: T.primary,
                color: T.surface, fontFamily: FONT_DISPLAY, fontSize: 18, fontStyle: 'italic',
                lineHeight: 1, paddingBottom: 3,
              }}
            >L</div>
            <span style={{ fontFamily: FONT_DISPLAY, fontSize: 17, color: T.ink, letterSpacing: '-0.01em' }}>
              Ledger<span style={{ color: T.copper }}>.</span>
            </span>
            <span className="ml-3 text-[10px] uppercase tracking-[0.18em]" style={{ color: T.muted }}>
              Vol. IV · 2026
            </span>
          </div>

          <div className="flex items-center gap-5 text-[11px]" style={{ color: T.muted, fontFamily: FONT_BODY }}>
            <a href="#">Status</a>
            <a href="#">Help Center</a>
            <a href="#">API docs</a>
            <a href="#">Customers</a>
            <a href="#">Privacy</a>
            <span className="flex items-center gap-1.5">
              <span className="rounded-full" style={{ width: 6, height: 6, background: T.warn }}/>
              <span>1 incident · degraded</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   APP
   ============================================================ */
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [view, setView] = useState('roadmap');

  useEffect(() => {
    const id = 'ledger-roadmap-fonts';
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view]);

  return (
    <div style={{ background: T.bg, color: T.ink, fontFamily: FONT_BODY, minHeight: '100vh' }}>
      <Nav scrolled={scrolled} view={view} setView={setView}/>

      {view === 'roadmap' && (
        <>
          <RoadmapHero/>
          <RoadmapBoard/>
          <WontBuild/>
          <FeedbackCTA/>
        </>
      )}
      {view === 'changelog' && <ChangelogView/>}
      {view === 'principles' && <PrinciplesView/>}

      <Footer/>
    </div>
  );
}
