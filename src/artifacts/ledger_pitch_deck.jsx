import React, { useState, useEffect, useCallback } from 'react';
import {
  ArrowRight, ArrowLeft, ChevronLeft, ChevronRight, Play, Pause,
  Maximize2, Download, Share2, X, Sparkles, Zap, Brain, Shield,
  Lock, Globe, Users, User, Building2, Factory, Truck, HardHat,
  TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Target,
  CheckCircle2, Circle, CircleDot, AlertTriangle, Quote, Star,
  FileText, FileCheck, FileSignature, Calendar, Clock, Receipt,
  MessageSquare, Inbox, Bell, Calculator, BookOpen, Scale, Library,
  Award, BarChart3, PieChart, Activity, Layers, Hash, AtSign,
  Mail, Phone, MapPin, Plus, Filter, Search, MoreHorizontal,
  Snowflake, Flame, Eye, Send, Camera, Upload, CreditCard,
  ShieldCheck, Database, Server, Wifi, Heart, Settings, Pin,
  Smartphone, Monitor, Code as CodeIcon,
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
   SLIDES META
   ============================================================ */
const SLIDES = [
  { num: '00', title: 'Cover',           kind: 'cover' },
  { num: '01', title: 'The opening',     kind: 'big-statement' },
  { num: '02', title: 'The problem',     kind: 'problem' },
  { num: '03', title: 'Why now',         kind: 'why-now' },
  { num: '04', title: 'The product',     kind: 'product' },
  { num: '05', title: 'The intelligence',kind: 'intelligence' },
  { num: '06', title: 'The wedge',       kind: 'wedge' },
  { num: '07', title: 'Market size',     kind: 'market' },
  { num: '08', title: 'Business model',  kind: 'business' },
  { num: '09', title: 'Traction',        kind: 'traction' },
  { num: '10', title: 'Team',            kind: 'team' },
  { num: '11', title: 'The ask',         kind: 'ask' },
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

function SlideHeader({ num, label, slideIdx, total }) {
  return (
    <div className="flex items-center justify-between" style={{ fontFamily: FONT_BODY }}>
      <div className="flex items-center gap-3">
        <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: T.copper, fontWeight: 500 }}>{num}</span>
        <span style={{ width: 24, height: 1, background: T.rule2 }}/>
        <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: T.muted }}>{label}</span>
      </div>
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em]" style={{ color: T.faint }}>
        <span>Ledger · Series A · Q2 2026</span>
        <span style={{ fontFamily: FONT_MONO }}>{String(slideIdx).padStart(2,'0')} / {String(total - 1).padStart(2,'0')}</span>
      </div>
    </div>
  );
}

function BrandFooter() {
  return (
    <div className="flex items-center justify-between" style={{ fontFamily: FONT_BODY }}>
      <div className="flex items-center gap-2">
        <div
          style={{
            width: 22, height: 22, borderRadius: 3, background: T.primary,
            color: T.surface, fontFamily: FONT_DISPLAY, fontSize: 16, fontStyle: 'italic',
            lineHeight: 1, paddingBottom: 3,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >L</div>
        <span style={{ fontFamily: FONT_DISPLAY, fontSize: 15, color: T.ink, letterSpacing: '-0.01em' }}>
          Ledger<span style={{ color: T.copper }}>.</span>
        </span>
      </div>
      <div className="text-[9.5px] uppercase tracking-[0.18em]" style={{ color: T.faint }}>Confidential · For investor review</div>
    </div>
  );
}

/* ============================================================
   SLIDE WRAPPER
   ============================================================ */
function Slide({ children, dark, padded = true, slideIdx, ...rest }) {
  return (
    <div
      className="relative w-full h-full overflow-hidden flex flex-col"
      style={{
        background: dark ? T.primaryDk : T.bg,
        color: dark ? T.surface : T.ink,
        padding: padded ? '36px 48px' : 0,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

/* ============================================================
   SLIDE 0 — COVER
   ============================================================ */
function CoverSlide() {
  return (
    <Slide dark padded={false}>
      {/* Atmospheric */}
      <div
        aria-hidden
        style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(circle at 80% 30%, rgba(196,106,45,0.18), transparent 55%),
                       radial-gradient(circle at 15% 80%, rgba(255,253,248,0.06), transparent 50%)`,
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute', right: -200, top: -200, width: 700, height: 700,
          border: `1px solid rgba(255,253,248,0.08)`, borderRadius: '50%',
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute', right: -100, top: -100, width: 480, height: 480,
          border: `1px solid rgba(196,106,45,0.12)`, borderRadius: '50%',
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute', inset: 0, opacity: 0.3,
          backgroundImage: `linear-gradient(rgba(255,253,248,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,253,248,0.04) 1px, transparent 1px)`,
          backgroundSize: '120px 120px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
        }}
      />

      <div className="relative flex-1 flex flex-col px-12 pt-10 pb-10" style={{ fontFamily: FONT_BODY, color: T.surface }}>
        {/* Top */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className="flex items-center justify-center"
              style={{
                width: 32, height: 32, borderRadius: 4, background: T.copper,
                color: T.surface, fontFamily: FONT_DISPLAY, fontSize: 24, fontStyle: 'italic',
                lineHeight: 1, paddingBottom: 4,
              }}
            >L</div>
            <span style={{ fontFamily: FONT_DISPLAY, fontSize: 24, color: T.surface, letterSpacing: '-0.01em' }}>
              Ledger<span style={{ color: T.copperLt }}>.</span>
            </span>
          </div>
          <div className="text-[10px] uppercase tracking-[0.22em]" style={{ color: 'rgba(255,253,248,0.55)' }}>
            Series A · Q2 2026
          </div>
        </div>

        {/* Center hero */}
        <div className="flex-1 flex flex-col justify-center max-w-[820px]">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[10.5px] uppercase tracking-[0.22em]" style={{ color: T.copperLt, fontWeight: 500 }}>Vol. IV</span>
            <span style={{ width: 24, height: 1, background: 'rgba(255,253,248,0.25)' }}/>
            <span className="text-[10.5px] uppercase tracking-[0.22em]" style={{ color: 'rgba(255,253,248,0.55)' }}>The pitch</span>
          </div>

          <h1
            style={{
              fontFamily: FONT_DISPLAY, fontSize: 110, lineHeight: 0.94,
              letterSpacing: '-0.03em', fontStyle: 'italic',
            }}
          >
            The practice<br/>
            suite that<br/>
            <span style={{ color: T.copperLt }}>thinks ahead</span><br/>
            of you.
          </h1>

          <p
            className="mt-8 max-w-[640px]"
            style={{ fontSize: 17, color: 'rgba(255,253,248,0.75)', lineHeight: 1.55 }}
          >
            We're building the operating system for the 110,000 small US tax practices —
            and the AI co-pilot they're asking us to ship faster.
          </p>
        </div>

        {/* Bottom */}
        <div className="flex items-end justify-between" style={{ borderTop: `1px solid rgba(255,253,248,0.12)`, paddingTop: 18 }}>
          <div>
            <div className="text-[10px] uppercase tracking-[0.18em]" style={{ color: 'rgba(255,253,248,0.5)' }}>Prepared for</div>
            <div className="mt-1" style={{ fontFamily: FONT_DISPLAY, fontSize: 22, fontStyle: 'italic', letterSpacing: '-0.01em', color: T.surface }}>
              Capital Partners · Series A Round
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-[0.18em]" style={{ color: 'rgba(255,253,248,0.5)' }}>Raising</div>
            <div className="mt-1" style={{ fontFamily: FONT_DISPLAY, fontSize: 22, fontStyle: 'italic', letterSpacing: '-0.01em', color: T.copperLt }}>
              $14M · led
            </div>
          </div>
        </div>
      </div>
    </Slide>
  );
}

/* ============================================================
   SLIDE 1 — BIG OPENING STATEMENT
   ============================================================ */
function OpeningSlide({ slideIdx }) {
  return (
    <Slide slideIdx={slideIdx}>
      <SlideHeader num="01" label="The opening" slideIdx={slideIdx} total={SLIDES.length}/>

      <div className="flex-1 flex flex-col justify-center">
        <h1
          style={{
            fontFamily: FONT_DISPLAY, fontSize: 80, lineHeight: 1.0,
            letterSpacing: '-0.025em', color: T.ink, fontStyle: 'italic',
            maxWidth: 1100,
          }}
        >
          Every accountant in America runs<br/>
          their practice on the <span style={{ color: T.copper }}>same broken stack</span> —<br/>
          and the IRS just made it worse.
        </h1>

        <div className="mt-12 grid grid-cols-3 gap-6 max-w-[1080px]">
          {[
            { v: '110k',  l: 'small US tax practices', s: 'avg. 23 clients each' },
            { v: '$1.2B', l: 'spent annually on tax practice software', s: 'fragmented across 12+ tools' },
            { v: '4.2hr', l: 'wasted per practitioner per week', s: 'on manual document handling' },
          ].map((s, i) => (
            <div key={i}>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 56, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.025em', lineHeight: 1 }}>
                {s.v}
              </div>
              <div className="text-[14px] mt-3" style={{ color: T.ink2, fontFamily: FONT_BODY, lineHeight: 1.4 }}>
                {s.l}
              </div>
              <div className="text-[11.5px] mt-1.5 italic" style={{ color: T.muted, fontFamily: FONT_BODY }}>
                {s.s}
              </div>
            </div>
          ))}
        </div>
      </div>

      <BrandFooter/>
    </Slide>
  );
}

/* ============================================================
   SLIDE 2 — PROBLEM
   ============================================================ */
function ProblemSlide({ slideIdx }) {
  return (
    <Slide slideIdx={slideIdx}>
      <SlideHeader num="02" label="The problem" slideIdx={slideIdx} total={SLIDES.length}/>

      <div className="flex-1 grid grid-cols-12 gap-12 items-center">
        <div className="col-span-5">
          <h1
            style={{
              fontFamily: FONT_DISPLAY, fontSize: 60, lineHeight: 1.0,
              letterSpacing: '-0.025em', color: T.ink, fontStyle: 'italic',
            }}
          >
            Today's tax<br/>practitioner is<br/>
            <span style={{ color: T.copper }}>a system<br/>integrator,</span><br/>
            not an accountant.
          </h1>
          <p className="mt-6 text-[15px] max-w-[420px]" style={{ color: T.ink2, lineHeight: 1.6 }}>
            They glue together 12 tools to do one job. Each tool has its own login,
            its own client list, its own version of the truth. The AI moment arrived,
            and incumbents bolted ChatGPT onto a search box.
          </p>
        </div>

        <div className="col-span-7">
          <div className="grid grid-cols-2 gap-px" style={{ background: T.rule }}>
            {[
              { n: '01', t: 'Documents arrive in chaos', b: 'Email · WhatsApp · Drive · paper. Monday starts with sorting.' },
              { n: '02', t: 'Deadlines are reactive',     b: 'You know the dates. You don\'t know which client is at risk.' },
              { n: '03', t: '12 tools, 0 source of truth', b: 'CRM, e-sign, billing, prep, books — none speak to each other.' },
              { n: '04', t: 'Expertise stays in heads',    b: 'You know §179 cold. Your software can\'t use that knowledge.' },
            ].map((p, i) => (
              <div key={i} className="p-7" style={{ background: T.bg }}>
                <span style={{ fontFamily: FONT_DISPLAY, fontSize: 38, fontStyle: 'italic', color: T.copper, letterSpacing: '-0.02em', lineHeight: 1 }}>
                  {p.n}
                </span>
                <div className="mt-4 text-[18px]" style={{ color: T.ink, fontFamily: FONT_BODY, fontWeight: 500, lineHeight: 1.25 }}>
                  {p.t}
                </div>
                <div className="mt-2.5 text-[12.5px]" style={{ color: T.ink2, fontFamily: FONT_BODY, lineHeight: 1.55 }}>
                  {p.b}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BrandFooter/>
    </Slide>
  );
}

/* ============================================================
   SLIDE 3 — WHY NOW
   ============================================================ */
function WhyNowSlide({ slideIdx }) {
  return (
    <Slide slideIdx={slideIdx}>
      <SlideHeader num="03" label="Why now" slideIdx={slideIdx} total={SLIDES.length}/>

      <div className="flex-1 flex flex-col justify-center">
        <h1
          style={{
            fontFamily: FONT_DISPLAY, fontSize: 56, lineHeight: 1.05,
            letterSpacing: '-0.02em', color: T.ink, fontStyle: 'italic',
            maxWidth: 1000,
          }}
        >
          Three forces collided<br/>
          in the last 18 months —<br/>
          and made this market <span style={{ color: T.copper }}>inevitable.</span>
        </h1>

        <div className="mt-12 grid grid-cols-3 gap-5 max-w-[1180px]">
          {[
            {
              n: '01',
              t: 'AI got good enough',
              b: 'GPT-4-class models can read CP2000s, classify K-1s, and cite IRC sections. The tax-specific domain is finally reachable without bespoke ML teams.',
              meta: 'IRC corpus indexable for ~$8k/yr',
            },
            {
              n: '02',
              t: 'TaxDome stagnated',
              b: 'The category leader hit ~$80M ARR and turned into a feature factory for forms and forms. Practitioners are openly asking for a successor.',
              meta: '34% NPS · 11k feature requests open',
            },
            {
              n: '03',
              t: 'The boomer succession cliff',
              b: '70% of CPA firm owners are over 55. The next generation expects software that looks like Linear, not 2014 Salesforce. They\'re buying.',
              meta: '$340B in firm value changing hands',
            },
          ].map((f, i) => (
            <div
              key={i}
              className="p-6 rounded-[3px]"
              style={{ background: T.surface, border: `1px solid ${T.rule}` }}
            >
              <div className="flex items-baseline justify-between mb-4">
                <span style={{ fontFamily: FONT_DISPLAY, fontSize: 32, fontStyle: 'italic', color: T.copper, letterSpacing: '-0.02em', lineHeight: 1 }}>
                  {f.n}
                </span>
                <Sparkles size={14} style={{ color: T.copper }}/>
              </div>
              <div className="text-[18px]" style={{ color: T.ink, fontFamily: FONT_BODY, fontWeight: 500, lineHeight: 1.3 }}>
                {f.t}
              </div>
              <div className="text-[12.5px] mt-3" style={{ color: T.ink2, fontFamily: FONT_BODY, lineHeight: 1.6 }}>
                {f.b}
              </div>
              <div className="mt-4 pt-3 text-[10.5px] italic" style={{ color: T.muted, borderTop: `1px dashed ${T.rule2}`, fontFamily: FONT_BODY }}>
                {f.meta}
              </div>
            </div>
          ))}
        </div>
      </div>

      <BrandFooter/>
    </Slide>
  );
}

/* ============================================================
   SLIDE 4 — THE PRODUCT (full page mock collage)
   ============================================================ */
function ProductSlide({ slideIdx }) {
  return (
    <Slide slideIdx={slideIdx}>
      <SlideHeader num="04" label="The product" slideIdx={slideIdx} total={SLIDES.length}/>

      <div className="flex-1 grid grid-cols-12 gap-10 items-center">
        <div className="col-span-5">
          <h1
            style={{
              fontFamily: FONT_DISPLAY, fontSize: 60, lineHeight: 1.0,
              letterSpacing: '-0.025em', color: T.ink, fontStyle: 'italic',
            }}
          >
            One platform.<br/>
            <span style={{ color: T.copper }}>Five surfaces.</span><br/>
            Built for the<br/>
            entire arc of a<br/>tax engagement.
          </h1>
          <p className="mt-6 text-[14px] max-w-[440px]" style={{ color: T.ink2, lineHeight: 1.6 }}>
            From signed engagement letter to filed return, every workflow lives in
            one place — with an AI layer that reads, classifies, drafts, and cites.
          </p>

          <div className="mt-7 flex flex-col gap-2.5">
            {[
              { n: '01', l: 'Practice dashboard',     d: 'Live pipeline · health matrix · radar' },
              { n: '02', l: 'Client portal · web + iOS',d: 'Sign · upload · pay · message' },
              { n: '03', l: 'AI Research Workspace',  d: 'IRC + case law + drafting' },
              { n: '04', l: 'Tax Season War Room',    d: 'Real-time ops · team load' },
              { n: '05', l: 'Document AI',             d: 'Auto-classification · field extraction' },
            ].map((s, i) => (
              <div key={i} className="flex items-baseline gap-3 py-1">
                <span style={{ fontFamily: FONT_MONO, fontSize: 11, color: T.copper, letterSpacing: '0.06em', minWidth: 24 }}>
                  {s.n}
                </span>
                <span style={{ fontFamily: FONT_DISPLAY, fontSize: 18, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.005em' }}>
                  {s.l}
                </span>
                <span className="text-[11.5px]" style={{ color: T.muted, fontFamily: FONT_BODY }}>{s.d}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-7 relative" style={{ height: 480 }}>
          {/* Layered product mocks */}
          <ProductCollage/>
        </div>
      </div>

      <BrandFooter/>
    </Slide>
  );
}

function ProductCollage() {
  return (
    <div className="relative w-full h-full" style={{ fontFamily: FONT_BODY }}>
      {/* Phone mock — left */}
      <div
        className="absolute"
        style={{
          left: 0, top: 50, width: 200, height: 400,
          background: '#1a1612', borderRadius: 30, padding: 6,
          transform: 'rotate(-6deg)',
          boxShadow: '0 30px 60px -20px rgba(20,15,8,0.35)',
        }}
      >
        <div style={{ width: '100%', height: '100%', borderRadius: 24, background: T.bg, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {/* Status bar */}
          <div style={{ height: 26, padding: '8px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
            <span style={{ fontSize: 9, fontWeight: 600 }}>9:41</span>
            <div style={{ position: 'absolute', left: '50%', top: 6, transform: 'translateX(-50%)', width: 60, height: 14, background: '#000', borderRadius: 999 }}/>
            <Wifi size={9}/>
          </div>
          {/* Mini portal */}
          <div style={{ padding: '8px 14px' }}>
            <div style={{ fontSize: 7, letterSpacing: '0.16em', color: T.muted, textTransform: 'uppercase' }}>Apr 25</div>
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 18, fontStyle: 'italic', color: T.ink, letterSpacing: '-0.01em', marginTop: 2 }}>
              Hi, Cody.
            </div>
          </div>
          {/* Hero */}
          <div style={{ margin: '4px 10px', padding: 10, borderRadius: 8, background: T.primary, color: T.surface, position: 'relative', overflow: 'hidden' }}>
            <div style={{ fontSize: 6, letterSpacing: '0.16em', color: T.copperLt, textTransform: 'uppercase' }}>2025 Form 1065 · on track</div>
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 13, fontStyle: 'italic', marginTop: 3, lineHeight: 1.2 }}>
              4 things need<br/>your attention.
            </div>
          </div>
          {/* Action items */}
          <div style={{ padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 5 }}>
            {[
              { i: FileSignature, t: 'Sign engagement', tone: 'med' },
              { i: Upload,         t: 'Upload Q1 stmt',  tone: 'high' },
              { i: Eye,            t: 'Confirm rig dep.',tone: 'med' },
            ].map((a, i) => {
              const Icon = a.i;
              return (
                <div key={i} style={{ background: T.surface, border: `1px solid ${T.rule}`, borderRadius: 5, padding: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 18, height: 18, borderRadius: 3, background: a.tone === 'high' ? T.copper : T.primary, color: T.surface, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={9}/>
                  </div>
                  <span style={{ fontSize: 8.5, color: T.ink, fontWeight: 500 }}>{a.t}</span>
                </div>
              );
            })}
          </div>
          {/* Tab bar */}
          <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-around', padding: '6px 10px', borderTop: `1px solid ${T.rule}`, background: T.surface }}>
            {[Inbox, FileText, Plus, MessageSquare, User].map((Icon, i) => (
              <div key={i} style={{ width: 24, height: 24, borderRadius: '50%', background: i === 2 ? T.primary : 'transparent', color: i === 2 ? T.surface : T.muted, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={11}/>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dashboard mock — right (bigger) */}
      <div
        className="absolute"
        style={{
          right: 0, top: 0, width: 460, height: 350,
          background: T.surface, borderRadius: 8, border: `1px solid ${T.rule}`,
          transform: 'rotate(3deg)',
          boxShadow: '0 30px 60px -20px rgba(20,15,8,0.18)',
          overflow: 'hidden',
        }}
      >
        {/* Toolbar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px', borderBottom: `1px solid ${T.rule}`, background: T.surface2 }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#E5C0AC' }}/>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#EAD79A' }}/>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#B8D4BE' }}/>
          <span style={{ marginLeft: 8, fontSize: 9, color: T.muted, letterSpacing: '0.14em', textTransform: 'uppercase' }}>Practice / Dashboard</span>
        </div>

        {/* Hero strip */}
        <div style={{ margin: 10, padding: 14, borderRadius: 4, background: T.primary, color: T.surface, position: 'relative', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', right: -20, top: -20, width: 100, height: 100,
            border: `1px solid rgba(255,253,248,0.10)`, borderRadius: '50%',
          }} aria-hidden/>
          <div style={{ fontSize: 8, letterSpacing: '0.16em', color: T.copperLt, textTransform: 'uppercase' }}>Tax Season · post-April</div>
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 17, fontStyle: 'italic', marginTop: 3, lineHeight: 1.15, letterSpacing: '-0.01em' }}>
            10 days into extensions. Cheyenne Ridge needs your eyes today.
          </div>
        </div>

        {/* KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6, padding: '0 10px' }}>
          {[
            { l: 'Active', v: '42' },
            { l: 'Tasks', v: '28' },
            { l: 'MRR', v: '$16.1k' },
            { l: 'A/R', v: '$28.4k' },
          ].map((k, i) => (
            <div key={i} style={{ padding: '6px 8px', background: T.surface2, border: `1px solid ${T.rule}`, borderRadius: 3 }}>
              <div style={{ fontSize: 7, letterSpacing: '0.14em', color: T.muted, textTransform: 'uppercase' }}>{k.l}</div>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 16, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.02em', marginTop: 2 }}>
                {k.v}
              </div>
            </div>
          ))}
        </div>

        {/* Mini scatter */}
        <div style={{ margin: '10px 10px 10px', padding: 8, background: T.surface2, border: `1px solid ${T.rule}`, borderRadius: 4 }}>
          <div style={{ fontSize: 8, letterSpacing: '0.14em', color: T.muted, textTransform: 'uppercase', marginBottom: 4 }}>Health × Revenue</div>
          <svg viewBox="0 0 380 100" width="100%">
            <line x1={10} y1={80} x2={370} y2={80} stroke={T.rule} strokeWidth={0.5}/>
            <line x1={10} y1={50} x2={370} y2={50} stroke={T.rule} strokeWidth={0.5} strokeDasharray="2 3"/>
            <line x1={190} y1={10} x2={190} y2={80} stroke={T.rule} strokeWidth={0.5} strokeDasharray="2 3"/>
            {[
              { x: 320, y: 25, r: 7, c: T.ok },
              { x: 290, y: 32, r: 6, c: T.ok },
              { x: 240, y: 38, r: 7, c: T.ok },
              { x: 250, y: 55, r: 5, c: T.warn },
              { x: 170, y: 42, r: 7, c: T.warn },
              { x: 130, y: 60, r: 8, c: T.warn },
              { x: 70, y: 62, r: 8, c: T.danger },
              { x: 50, y: 72, r: 5, c: T.danger },
            ].map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r={p.r} fill={p.c} opacity={0.85} stroke={T.surface} strokeWidth={1.5}/>
            ))}
            <text x={365} y={20} textAnchor="end" fontSize={7} fill={T.ok} fontWeight={600} letterSpacing={1}>STARS</text>
            <text x={15} y={75} fontSize={7} fill={T.danger} fontWeight={600} letterSpacing={1}>AT RISK</text>
          </svg>
        </div>
      </div>

      {/* Floating AI badge */}
      <div
        className="absolute"
        style={{
          right: 60, bottom: 30,
          background: T.surface, borderRadius: 999, padding: '6px 12px',
          border: `1px solid ${T.copper}`,
          boxShadow: '0 10px 25px -8px rgba(196,106,45,0.4)',
          transform: 'rotate(-4deg)',
          display: 'flex', alignItems: 'center', gap: 6,
        }}
      >
        <Sparkles size={12} style={{ color: T.copper }}/>
        <span style={{ fontSize: 11, color: T.ink, fontWeight: 500 }}>AI classified 12 docs</span>
      </div>

      {/* Floating deadline card */}
      <div
        className="absolute"
        style={{
          left: 220, bottom: 70,
          background: T.surface, borderRadius: 4, padding: 8,
          border: `1px solid ${T.rule}`,
          boxShadow: '0 10px 25px -8px rgba(20,15,8,0.18)',
          transform: 'rotate(-2deg)',
          width: 130,
        }}
      >
        <div style={{ fontSize: 8, letterSpacing: '0.14em', color: T.muted, textTransform: 'uppercase' }}>Deadline Radar</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 2 }}>
          <span style={{ fontFamily: FONT_DISPLAY, fontSize: 24, fontStyle: 'italic', color: T.ink, lineHeight: 1, letterSpacing: '-0.02em' }}>
            5
          </span>
          <span style={{ fontSize: 9, color: T.muted }}>days</span>
        </div>
        <div style={{ fontSize: 9, color: T.ink2, marginTop: 1 }}>Form 941 · Q1</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 8, color: T.danger, marginTop: 2 }}>
          <span style={{ width: 4, height: 4, borderRadius: '50%', background: T.danger }}/>
          Missing March data
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   SLIDE 5 — THE INTELLIGENCE LAYER
   ============================================================ */
function IntelligenceSlide({ slideIdx }) {
  return (
    <Slide slideIdx={slideIdx} dark>
      <SlideHeader num="05" label="The intelligence" slideIdx={slideIdx} total={SLIDES.length}/>

      <div
        aria-hidden
        style={{
          position: 'absolute', right: -150, top: -150, width: 600, height: 600,
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

      <div className="relative flex-1 grid grid-cols-12 gap-10 items-center">
        <div className="col-span-7">
          <h1
            style={{
              fontFamily: FONT_DISPLAY, fontSize: 70, lineHeight: 1.0,
              letterSpacing: '-0.025em', color: T.surface, fontStyle: 'italic',
            }}
          >
            An EA-trained<br/>
            co-pilot,<br/>
            <span style={{ color: T.copperLt }}>not a chatbot.</span>
          </h1>
          <p className="mt-6 max-w-[560px] text-[15px]" style={{ color: 'rgba(255,253,248,0.75)', lineHeight: 1.65 }}>
            Most AI in tax software is a search box bolted to ChatGPT. Ledger AI is grounded
            in the IRC, current Treasury Regs, and your firm's own engagement data. It doesn't
            hallucinate §179 limits — it cites them.
          </p>

          <div className="mt-9 grid grid-cols-2 gap-x-6 gap-y-4 max-w-[560px]">
            {[
              { i: BookOpen,   t: 'IRC, Reg, Pub references inline' },
              { i: Scale,      t: '2.4M anonymized tax positions' },
              { i: FileText,   t: 'Drafts CP2000 replies, election memos' },
              { i: Calculator, t: 'Live scenario calculators across positions' },
              { i: Brain,      t: 'Pattern-detected automation proposals' },
              { i: Shield,     t: 'No model training on client data' },
            ].map((f, i) => {
              const Icon = f.i;
              return (
                <div key={i} className="flex items-start gap-3">
                  <Icon size={15} style={{ color: T.copperLt, marginTop: 2, flexShrink: 0 }} strokeWidth={1.5}/>
                  <span className="text-[13.5px]" style={{ color: 'rgba(255,253,248,0.85)' }}>{f.t}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="col-span-5">
          <ResearchMock/>
        </div>
      </div>

      <div style={{ position: 'relative' }}>
        <div className="flex items-center justify-between" style={{ fontFamily: FONT_BODY, color: 'rgba(255,253,248,0.5)' }}>
          <div className="flex items-center gap-2">
            <div style={{ width: 22, height: 22, borderRadius: 3, background: T.copper, color: T.surface, fontFamily: FONT_DISPLAY, fontSize: 16, fontStyle: 'italic', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: 3, lineHeight: 1 }}>L</div>
            <span style={{ fontFamily: FONT_DISPLAY, fontSize: 15, color: T.surface, letterSpacing: '-0.01em' }}>
              Ledger<span style={{ color: T.copperLt }}>.</span>
            </span>
          </div>
          <div className="text-[9.5px] uppercase tracking-[0.18em]">Confidential · For investor review</div>
        </div>
      </div>
    </Slide>
  );
}

function ResearchMock() {
  return (
    <div
      className="rounded-[6px] overflow-hidden"
      style={{
        background: 'rgba(255,253,248,0.05)',
        border: `1px solid rgba(255,253,248,0.12)`,
        backdropFilter: 'blur(8px)',
        fontFamily: FONT_BODY,
      }}
    >
      <div className="px-4 py-3 flex items-center gap-2.5" style={{ borderBottom: `1px solid rgba(255,253,248,0.08)` }}>
        <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(255,253,248,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Sparkles size={11} style={{ color: T.copperLt }}/>
        </div>
        <span className="text-[12px]" style={{ color: T.surface, fontWeight: 500 }}>Ledger AI</span>
        <span style={{ background: 'rgba(232,151,98,0.15)', color: T.copperLt, padding: '2px 6px', borderRadius: 2, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 500 }}>Tax Co-Pilot</span>
      </div>

      <div className="p-4 flex flex-col gap-3">
        <div className="self-end max-w-[80%] px-3 py-2 text-[11.5px] rounded-[6px]" style={{ background: T.copper, color: T.surface, lineHeight: 1.5 }}>
          §179 vs bonus for Bison's $284k drilling rig — what should we elect?
        </div>

        <div
          className="self-start max-w-[88%] px-3 py-2.5 rounded-[6px]"
          style={{ background: 'rgba(255,253,248,0.08)', color: 'rgba(255,253,248,0.92)', border: `1px solid rgba(255,253,248,0.10)`, fontSize: 11.5, lineHeight: 1.55 }}
        >
          <span style={{ color: T.copperLt, fontWeight: 600 }}>Recommendation: </span>
          take 60% bonus depreciation. Here's why:
          <div className="mt-2 flex flex-col gap-1.5" style={{ fontSize: 10.5, color: 'rgba(255,253,248,0.85)' }}>
            <div>· §179 caps at <span style={{ fontFamily: FONT_MONO, color: T.copperLt }}>$1.16M</span>, phased out by income</div>
            <div>· Bonus is <span style={{ fontFamily: FONT_MONO, color: T.copperLt }}>60%</span> in 2026, <span style={{ fontFamily: FONT_MONO }}>40%</span> in 2027</div>
            <div>· Bison's projected 2027 revenue is flat → take it now</div>
            <div>· Wyoming has no state conformity issue</div>
          </div>
          <div className="mt-2 text-[9.5px] italic" style={{ color: 'rgba(255,253,248,0.5)' }}>
            IRC §168(k) · Rev. Proc. 2024-19 · Sharp v. Comm'r 180 T.C. 14
          </div>
        </div>

        <div className="self-start flex items-center gap-1.5 mt-1">
          <button className="text-[9.5px] px-2 py-1 rounded-[3px]" style={{ background: 'rgba(255,253,248,0.10)', color: T.surface, border: `1px solid rgba(255,253,248,0.12)` }}>
            Draft election memo
          </button>
          <button className="text-[9.5px] px-2 py-1 rounded-[3px]" style={{ background: 'rgba(255,253,248,0.10)', color: T.surface, border: `1px solid rgba(255,253,248,0.12)` }}>
            Run scenario
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   SLIDE 6 — THE WEDGE (positioning)
   ============================================================ */
function WedgeSlide({ slideIdx }) {
  return (
    <Slide slideIdx={slideIdx}>
      <SlideHeader num="06" label="The wedge" slideIdx={slideIdx} total={SLIDES.length}/>

      <div className="flex-1 flex flex-col">
        <h1
          style={{
            fontFamily: FONT_DISPLAY, fontSize: 56, lineHeight: 1.05,
            letterSpacing: '-0.02em', color: T.ink, fontStyle: 'italic',
            maxWidth: 900, marginBottom: 12,
          }}
        >
          We don't compete with TaxDome.<br/>
          We <span style={{ color: T.copper }}>obsolete the category</span> they live in.
        </h1>
        <p className="mt-2 max-w-[760px] text-[14px]" style={{ color: T.ink2, lineHeight: 1.6 }}>
          TaxDome and Canopy sell digital folders. Karbon sells task management.
          We sell something they structurally can't ship: an AI-native operating system that grows tax knowledge as the firm uses it.
        </p>

        <div className="mt-10 grid grid-cols-12 gap-2 flex-1">
          {/* Header row */}
          <div className="col-span-12 grid grid-cols-12 gap-2 mb-1">
            <div className="col-span-4"/>
            {['Ledger', 'TaxDome', 'Canopy', 'Karbon'].map((h, i) => (
              <div
                key={h}
                className={cx('col-span-2 px-3 py-2 text-center rounded-t-[3px]', i === 0 && 'relative')}
                style={{
                  background: i === 0 ? T.primary : T.surface,
                  border: `1px solid ${i === 0 ? T.primary : T.rule}`,
                  color: i === 0 ? T.surface : T.ink,
                }}
              >
                <div style={{ fontFamily: FONT_DISPLAY, fontSize: i === 0 ? 18 : 16, fontStyle: 'italic', letterSpacing: '-0.01em', lineHeight: 1.1 }}>
                  {h}
                </div>
                {i === 0 && (
                  <div className="absolute" style={{ top: -10, left: '50%', transform: 'translateX(-50%)', padding: '2px 8px', background: T.copper, color: T.surface, fontSize: 8.5, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600, borderRadius: 2 }}>
                    Us
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Rows */}
          {[
            ['Underlying mental model',           'AI-native OS',   'Digital folder', 'Practice mgmt', 'Task tracker'],
            ['Document AI · classification',       'Native',          'No',              'Limited',        'No'],
            ['Predictive deadline risk',            'Native',          'No',              'No',              'No'],
            ['IRC + case law co-pilot',             'Native · cited', 'No',              'GPT add-on',     'GPT add-on'],
            ['Real-time tax season ops',           'Native',          'Calendar only',  'Calendar only', 'Workboard'],
            ['Per-practice pricing',                  'Yes',            'Per client',     'Per seat',       'Per seat'],
            ['Mobile-first client portal',           'Native',          'Reskinned web', 'Reskinned web', 'No'],
            ['White-label · firm domain',           'Yes (Firm plan)', 'Add-on',         'Add-on',         'No'],
          ].map((row, i) => (
            <div key={i} className="col-span-12 grid grid-cols-12 gap-2">
              <div
                className="col-span-4 px-3 py-2 text-[12.5px]"
                style={{ background: T.surface, color: T.ink2, border: `1px solid ${T.rule}` }}
              >
                {row[0]}
              </div>
              {row.slice(1).map((cell, j) => {
                const isUs = j === 0;
                const isYes = ['Native', 'Yes', 'AI-native OS', 'Native · cited', 'Yes (Firm plan)'].includes(cell);
                const isLimited = cell === 'Limited' || cell.includes('add-on') || cell.includes('only') || cell === 'Reskinned web' || cell === 'Workboard' || cell === 'Practice mgmt' || cell === 'Task tracker' || cell === 'Per seat' || cell === 'Per client' || cell === 'Add-on' || cell === 'Calendar only' || cell === 'Digital folder' || cell === 'GPT add-on';
                return (
                  <div
                    key={j}
                    className="col-span-2 px-3 py-2 text-center text-[11.5px]"
                    style={{
                      background: isUs ? '#FBF6E8' : T.surface,
                      border: `1px solid ${isUs ? T.copper : T.rule}`,
                      color: isUs ? T.ink : (cell === 'No' ? T.faint : T.ink2),
                      fontWeight: isUs ? 500 : 400,
                      fontFamily: FONT_BODY,
                    }}
                  >
                    {cell === 'No' && <X size={13} style={{ color: T.faint, margin: '0 auto', display: 'block' }}/>}
                    {cell !== 'No' && cell}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <BrandFooter/>
    </Slide>
  );
}

/* ============================================================
   SLIDE 7 — MARKET SIZE
   ============================================================ */
function MarketSlide({ slideIdx }) {
  return (
    <Slide slideIdx={slideIdx}>
      <SlideHeader num="07" label="Market size" slideIdx={slideIdx} total={SLIDES.length}/>

      <div className="flex-1 grid grid-cols-12 gap-12 items-center">
        <div className="col-span-5">
          <h1
            style={{
              fontFamily: FONT_DISPLAY, fontSize: 60, lineHeight: 1.0,
              letterSpacing: '-0.025em', color: T.ink, fontStyle: 'italic',
            }}
          >
            A market<br/>
            <span style={{ color: T.copper }}>everyone sees</span><br/>
            but no one<br/>has actually built<br/>for.
          </h1>
          <p className="mt-6 text-[14px] max-w-[420px]" style={{ color: T.ink2, lineHeight: 1.6 }}>
            US tax software is a $7B+ category dominated by 1990s-era incumbents.
            We win the long tail — small firms with 5-50 clients — first, then move up.
          </p>

          <div className="mt-8 flex flex-col gap-3">
            {[
              { l: 'Initial wedge',        v: '$680M',  d: '110k US small tax practices · 5-50 clients' },
              { l: 'Mid-market',           v: '$2.1B',  d: '14k mid firms · 50-500 clients' },
              { l: 'Adjacent · bookkeeping','v': '$1.4B', d: 'Bookkeepers expanding into tax' },
              { l: 'Long-term TAM',        v: '$7.4B',  d: 'Including enterprise · adjacent · intl.' },
            ].map((m, i) => (
              <div key={i} className="flex items-baseline gap-3 py-2" style={{ borderBottom: i < 3 ? `1px solid ${T.rule}` : 'none' }}>
                <div className="flex-1">
                  <div className="text-[10.5px] uppercase tracking-[0.14em]" style={{ color: T.muted }}>{m.l}</div>
                  <div className="text-[11.5px] mt-0.5" style={{ color: T.ink2 }}>{m.d}</div>
                </div>
                <div style={{ fontFamily: FONT_DISPLAY, fontSize: 28, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.02em', lineHeight: 1 }}>
                  {m.v}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Concentric circles diagram */}
        <div className="col-span-7 relative" style={{ height: 540 }}>
          <MarketDiagram/>
        </div>
      </div>

      <BrandFooter/>
    </Slide>
  );
}

function MarketDiagram() {
  return (
    <div className="relative w-full h-full flex items-center justify-center" style={{ fontFamily: FONT_BODY }}>
      {/* TAM ring */}
      <div
        className="absolute flex items-center justify-center"
        style={{
          width: 540, height: 540, borderRadius: '50%',
          border: `1px solid ${T.rule2}`,
        }}
      >
        <div style={{ position: 'absolute', top: 8, fontSize: 9.5, letterSpacing: '0.18em', color: T.muted, textTransform: 'uppercase' }}>
          TAM · $7.4B · long term
        </div>
      </div>
      <div
        className="absolute"
        style={{
          width: 540, height: 540, borderRadius: '50%',
          background: `radial-gradient(circle, transparent 50%, rgba(196,106,45,0.04) 100%)`,
        }}
      />

      {/* SAM ring */}
      <div
        className="absolute flex items-center justify-center"
        style={{
          width: 380, height: 380, borderRadius: '50%',
          border: `1px solid ${T.rule2}`,
          background: 'rgba(196,106,45,0.05)',
        }}
      >
        <div style={{ position: 'absolute', top: 8, fontSize: 9.5, letterSpacing: '0.18em', color: T.copper, textTransform: 'uppercase', fontWeight: 600 }}>
          SAM · $4.2B · 5 years
        </div>
      </div>

      {/* SOM ring */}
      <div
        className="absolute flex items-center justify-center"
        style={{
          width: 240, height: 240, borderRadius: '50%',
          background: T.copper, color: T.surface,
        }}
      >
        <div className="text-center">
          <div style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500, color: 'rgba(255,253,248,0.75)' }}>SOM · 3 years</div>
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 56, fontStyle: 'italic', letterSpacing: '-0.025em', lineHeight: 1, marginTop: 4 }}>
            $680M
          </div>
          <div style={{ fontSize: 11, marginTop: 4, color: 'rgba(255,253,248,0.85)' }}>110k small tax practices</div>
          <div style={{ fontSize: 9.5, marginTop: 8, color: 'rgba(255,253,248,0.6)', letterSpacing: '0.06em' }}>
            avg ARPA $6,180/yr · 4% capture goal
          </div>
        </div>
      </div>

      {/* Floating labels */}
      <div
        className="absolute"
        style={{
          right: 30, top: 60, padding: '6px 10px', background: T.surface, border: `1px solid ${T.rule}`,
          borderRadius: 4, fontSize: 11, color: T.ink2, lineHeight: 1.5,
          boxShadow: '0 8px 18px -6px rgba(20,15,8,0.15)',
          maxWidth: 180,
        }}
      >
        <div style={{ fontSize: 9, letterSpacing: '0.16em', color: T.muted, textTransform: 'uppercase', fontWeight: 600, marginBottom: 4 }}>Year 1</div>
        ~600 firms · $3.8M ARR
      </div>
      <div
        className="absolute"
        style={{
          left: 0, bottom: 80, padding: '6px 10px', background: T.surface, border: `1px solid ${T.rule}`,
          borderRadius: 4, fontSize: 11, color: T.ink2, lineHeight: 1.5,
          boxShadow: '0 8px 18px -6px rgba(20,15,8,0.15)',
          maxWidth: 180,
        }}
      >
        <div style={{ fontSize: 9, letterSpacing: '0.16em', color: T.muted, textTransform: 'uppercase', fontWeight: 600, marginBottom: 4 }}>Year 3</div>
        ~4,400 firms · $27M ARR
      </div>
    </div>
  );
}

/* ============================================================
   SLIDE 8 — BUSINESS MODEL
   ============================================================ */
function BusinessSlide({ slideIdx }) {
  return (
    <Slide slideIdx={slideIdx}>
      <SlideHeader num="08" label="Business model" slideIdx={slideIdx} total={SLIDES.length}/>

      <div className="flex-1 flex flex-col">
        <h1
          style={{
            fontFamily: FONT_DISPLAY, fontSize: 56, lineHeight: 1.05,
            letterSpacing: '-0.02em', color: T.ink, fontStyle: 'italic',
            maxWidth: 900,
          }}
        >
          Per-practice pricing.<br/>
          <span style={{ color: T.copper }}>Predictable economics.</span>
        </h1>
        <p className="mt-3 max-w-[640px] text-[13.5px]" style={{ color: T.ink2, lineHeight: 1.6 }}>
          Competitors charge per client and per signature — billing penalizes growth.
          We charge per practice and per seat. Firms grow their book without growing our bill.
        </p>

        <div className="mt-9 grid grid-cols-12 gap-5 flex-1">
          {/* Plans */}
          <div className="col-span-7">
            <div className="grid grid-cols-3 gap-3 h-full">
              {[
                { name: 'Solo',     p: 49,   blurb: 'For one EA or CPA',           perks: ['25 clients', '1k AI docs/mo', 'Portal', 'E-sign'], current: false },
                { name: 'Practice', p: 149,  blurb: 'For growing firms',           perks: ['Unlimited clients', '10k AI docs/mo', 'Health matrix', 'Automation', 'QB · Stripe · Drake'], current: true },
                { name: 'Firm',     p: null, blurb: 'Multi-partner · custom',      perks: ['Everything', 'White-label', 'SSO/SAML', 'Custom AI fine-tune', 'Dedicated CSM'], current: false },
              ].map(p => (
                <div
                  key={p.name}
                  className="p-5 rounded-[3px] flex flex-col relative"
                  style={{
                    background: p.current ? T.primary : T.surface,
                    color: p.current ? T.surface : T.ink,
                    border: `1px solid ${p.current ? T.primary : T.rule}`,
                  }}
                >
                  {p.current && (
                    <div
                      className="absolute"
                      style={{
                        top: -10, left: 16, padding: '2px 8px', background: T.copper, color: T.surface,
                        fontSize: 8.5, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600,
                        borderRadius: 2,
                      }}
                    >
                      Most popular
                    </div>
                  )}
                  <div style={{ fontFamily: FONT_DISPLAY, fontSize: 24, fontStyle: 'italic', letterSpacing: '-0.01em' }}>
                    {p.name}
                  </div>
                  <div className="text-[11.5px] mt-1" style={{ color: p.current ? 'rgba(255,253,248,0.6)' : T.muted }}>
                    {p.blurb}
                  </div>
                  <div className="mt-3" style={{ fontFamily: FONT_DISPLAY, fontSize: p.p === null ? 28 : 38, fontStyle: 'italic', letterSpacing: '-0.025em', lineHeight: 1 }}>
                    {p.p === null ? 'Custom' : `$${p.p}`}
                  </div>
                  {p.p !== null && <div className="text-[10.5px]" style={{ color: p.current ? 'rgba(255,253,248,0.6)' : T.muted }}>per month</div>}
                  <ul className="mt-4 flex flex-col gap-1 flex-1">
                    {p.perks.map((perk, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-[11px]" style={{ color: p.current ? 'rgba(255,253,248,0.85)' : T.ink2, lineHeight: 1.45 }}>
                        <CheckCircle2 size={10} style={{ color: p.current ? T.copperLt : T.ok, marginTop: 2.5, flexShrink: 0 }} strokeWidth={2.5}/>
                        {perk}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Unit economics */}
          <div className="col-span-5 p-6 rounded-[3px]" style={{ background: T.surface, border: `1px solid ${T.rule}` }}>
            <div className="text-[10px] uppercase tracking-[0.18em] mb-4" style={{ color: T.muted, fontWeight: 500 }}>
              Unit economics · year 2
            </div>
            <div className="flex flex-col gap-3">
              {[
                ['ARPA blended',          '$6,180', T.ink],
                ['Gross margin',          '82%',    T.ok],
                ['CAC payback',           '7.2 mo', T.ok],
                ['Logo retention',         '94%',    T.ok],
                ['Net revenue retention',  '128%',   T.ok],
                ['Sales-led ACV (mid-mkt)','$24k',   T.copper],
              ].map(([k, v, c], i) => (
                <div key={i} className="flex items-baseline justify-between" style={{ borderBottom: i < 5 ? `1px dashed ${T.rule2}` : 'none', paddingBottom: 8 }}>
                  <span className="text-[11.5px]" style={{ color: T.ink2 }}>{k}</span>
                  <span style={{ fontFamily: FONT_DISPLAY, fontSize: 22, color: c, fontStyle: 'italic', letterSpacing: '-0.02em', lineHeight: 1 }}>
                    {v}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5 p-3 rounded-[3px] flex items-start gap-2" style={{ background: T.surface2, border: `1px dashed ${T.rule2}` }}>
              <Sparkles size={12} style={{ color: T.copper, marginTop: 1, flexShrink: 0 }}/>
              <span className="text-[10.5px]" style={{ color: T.ink2, lineHeight: 1.5 }}>
                NRR of 128% comes from seat expansion as firms grow + Solo→Practice→Firm tier migration as books scale.
              </span>
            </div>
          </div>
        </div>
      </div>

      <BrandFooter/>
    </Slide>
  );
}

/* ============================================================
   SLIDE 9 — TRACTION
   ============================================================ */
function TractionSlide({ slideIdx }) {
  return (
    <Slide slideIdx={slideIdx}>
      <SlideHeader num="09" label="Traction" slideIdx={slideIdx} total={SLIDES.length}/>

      <div className="flex-1 flex flex-col">
        <h1
          style={{
            fontFamily: FONT_DISPLAY, fontSize: 60, lineHeight: 1.0,
            letterSpacing: '-0.025em', color: T.ink, fontStyle: 'italic',
            maxWidth: 900,
          }}
        >
          Eight months in.<br/>
          <span style={{ color: T.copper }}>The numbers</span> are early but pointed.
        </h1>

        <div className="mt-10 grid grid-cols-12 gap-5 flex-1">
          {/* Big chart */}
          <div className="col-span-8 p-6 rounded-[3px]" style={{ background: T.surface, border: `1px solid ${T.rule}` }}>
            <div className="flex items-end justify-between mb-4">
              <div>
                <div className="text-[10px] uppercase tracking-[0.18em]" style={{ color: T.muted, fontWeight: 500 }}>ARR · last 8 months</div>
                <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 24, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.01em', lineHeight: 1.1 }}>
                  $1.84M ARR · growing 38% MoM
                </h3>
              </div>
              <div className="text-right">
                <div className="text-[10.5px]" style={{ color: T.ok, fontFamily: FONT_MONO }}>+$472k MoM net new</div>
              </div>
            </div>
            <ARRChart/>
          </div>

          {/* Stat blocks */}
          <div className="col-span-4 flex flex-col gap-3">
            {[
              { l: 'Paying firms',     v: '298',     d: 'Up from 12 in Sep',    tone: T.copper },
              { l: 'Practitioners',    v: '724',     d: '2.4 seats per firm',   tone: T.ink },
              { l: 'AI docs / week',    v: '184k',    d: '+22% WoW',              tone: T.ok },
              { l: 'Logo retention',    v: '94%',     d: 'Cohort tracking 8 mos',tone: T.ok },
              { l: 'Inbound demo · wk', v: '47',      d: 'No paid acquisition',  tone: T.copper },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-[3px]" style={{ background: T.surface, border: `1px solid ${T.rule}` }}>
                <div className="flex-1">
                  <div className="text-[10px] uppercase tracking-[0.14em]" style={{ color: T.muted }}>{s.l}</div>
                  <div className="text-[10.5px] mt-0.5" style={{ color: T.muted }}>{s.d}</div>
                </div>
                <div style={{ fontFamily: FONT_DISPLAY, fontSize: 32, color: s.tone, fontStyle: 'italic', letterSpacing: '-0.02em', lineHeight: 1 }}>
                  {s.v}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quote strip */}
        <div className="mt-5 p-5 flex items-center gap-5 rounded-[3px]" style={{ background: T.surface2, border: `1px solid ${T.rule}` }}>
          <Quote size={32} style={{ color: T.copper, flexShrink: 0 }} strokeWidth={1}/>
          <div className="flex-1">
            <p style={{ fontFamily: FONT_DISPLAY, fontSize: 18, fontStyle: 'italic', color: T.ink, lineHeight: 1.4, letterSpacing: '-0.005em' }}>
              "We migrated our 84-client book off TaxDome over a weekend. Three months in, I'd already cut <span style={{ color: T.copper }}>11 hours of admin per week.</span> The AI inbox alone paid for the year."
            </p>
            <div className="mt-3 flex items-center gap-3">
              <div
                className="flex items-center justify-center text-[12px]"
                style={{ width: 36, height: 36, borderRadius: '50%', background: T.primary, color: T.surface, fontWeight: 600 }}
              >MR</div>
              <div>
                <div className="text-[12px]" style={{ color: T.ink, fontWeight: 500 }}>Margaux Renault, EA, MST</div>
                <div className="text-[10.5px]" style={{ color: T.muted }}>Managing Partner · Renault & Wendell · Cheyenne, WY</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BrandFooter/>
    </Slide>
  );
}

function ARRChart() {
  const data = [
    { m: 'Sep', v: 90 },
    { m: 'Oct', v: 180 },
    { m: 'Nov', v: 320 },
    { m: 'Dec', v: 510 },
    { m: 'Jan', v: 780 },
    { m: 'Feb', v: 1100 },
    { m: 'Mar', v: 1480 },
    { m: 'Apr', v: 1840 },
  ];
  const max = Math.max(...data.map(d => d.v));
  const W = 720, H = 200, P = 28;
  const pts = data.map((d, i) => {
    const x = P + (i * (W - P * 2)) / (data.length - 1);
    const y = H - P - (d.v / max) * (H - P * 2);
    return { x, y, v: d.v, m: d.m };
  });
  const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  const fillPath = `${path} L${pts[pts.length-1].x},${H-P} L${pts[0].x},${H-P} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block' }}>
      <defs>
        <linearGradient id="arrFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={T.copper} stopOpacity={0.25}/>
          <stop offset="100%" stopColor={T.copper} stopOpacity={0}/>
        </linearGradient>
      </defs>
      {[0, 0.25, 0.5, 0.75, 1].map((p, i) => {
        const y = H - P - p * (H - P * 2);
        return (
          <g key={i}>
            <line x1={P} y1={y} x2={W-P} y2={y} stroke={T.rule} strokeWidth={0.5} strokeDasharray="2 4"/>
            <text x={P-6} y={y+3} textAnchor="end" fontSize={9} fill={T.muted} fontFamily={FONT_MONO}>
              ${Math.round((max * p) / 1000) * 1000 / 1000}M
            </text>
          </g>
        );
      })}
      <path d={fillPath} fill="url(#arrFill)"/>
      <path d={path} fill="none" stroke={T.copper} strokeWidth={2.5}/>
      {pts.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r={4} fill={T.surface} stroke={T.copper} strokeWidth={2}/>
          {i === pts.length - 1 && (
            <>
              <circle cx={p.x} cy={p.y} r={9} fill={T.copper} opacity={0.18}/>
              <text x={p.x} y={p.y - 14} textAnchor="middle" fontSize={11} fill={T.ink} fontFamily={FONT_MONO} fontWeight={600}>
                ${(p.v / 1000).toFixed(2)}M
              </text>
            </>
          )}
          <text x={p.x} y={H - P + 14} textAnchor="middle" fontSize={9} fill={T.muted} fontFamily={FONT_BODY}>
            {p.m}
          </text>
        </g>
      ))}
    </svg>
  );
}

/* ============================================================
   SLIDE 10 — TEAM
   ============================================================ */
function TeamSlide({ slideIdx }) {
  return (
    <Slide slideIdx={slideIdx}>
      <SlideHeader num="10" label="Team" slideIdx={slideIdx} total={SLIDES.length}/>

      <div className="flex-1 flex flex-col">
        <h1
          style={{
            fontFamily: FONT_DISPLAY, fontSize: 56, lineHeight: 1.05,
            letterSpacing: '-0.025em', color: T.ink, fontStyle: 'italic',
            maxWidth: 900,
          }}
        >
          Practitioners and operators —<br/>
          <span style={{ color: T.copper }}>not tourists.</span>
        </h1>
        <p className="mt-3 max-w-[640px] text-[13.5px]" style={{ color: T.ink2, lineHeight: 1.55 }}>
          Tax software fails when it's built by people who've never filed a return.
          Three of our four founding leaders have closed at least one tax season as the responsible party.
        </p>

        <div className="mt-10 grid grid-cols-4 gap-4 flex-1">
          {[
            { initial: 'SP', color: T.copper,   name: 'Suresh Patel',   role: 'Co-founder · CEO',         bg: 'EA · 8 yrs at HYK Tax · oil & gas specialty', logos: ['HYK Tax', 'Drake', 'NAEA'] },
            { initial: 'MR', color: T.primary,  name: 'Margaux Renault', role: 'Co-founder · Head of Tax', bg: 'CPA · MST · partner at Renault & Wendell · WY', logos: ['Big 4', 'WSCPA'] },
            { initial: 'AK', color: T.gold,     name: 'Aanya Kapoor',    role: 'Co-founder · Head of AI',  bg: 'Ex-Anthropic · led tools eval · PhD CMU',          logos: ['Anthropic', 'CMU'] },
            { initial: 'JT', color: T.primary2, name: 'Jordan Tran',     role: 'Co-founder · Head of Eng', bg: 'Built Stripe Atlas · early eng at Linear',          logos: ['Stripe', 'Linear'] },
          ].map((p, i) => (
            <div key={i} className="p-5 rounded-[3px] flex flex-col" style={{ background: T.surface, border: `1px solid ${T.rule}` }}>
              <div
                className="flex items-center justify-center text-[20px] mb-4"
                style={{ width: 64, height: 64, borderRadius: '50%', background: p.color, color: T.surface, fontWeight: 600 }}
              >
                {p.initial}
              </div>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 22, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.01em', lineHeight: 1.1 }}>
                {p.name}
              </div>
              <div className="text-[11px] uppercase tracking-[0.14em] mt-1" style={{ color: T.copper, fontWeight: 500 }}>
                {p.role}
              </div>
              <div className="text-[12px] mt-3 flex-1" style={{ color: T.ink2, lineHeight: 1.55 }}>
                {p.bg}
              </div>
              <div className="mt-3 pt-3 flex items-center gap-1.5 flex-wrap" style={{ borderTop: `1px dashed ${T.rule2}` }}>
                {p.logos.map(l => (
                  <span key={l} className="text-[9.5px] px-1.5 py-[1px] rounded-[2px]" style={{ background: T.surface2, color: T.muted, border: `1px solid ${T.rule}`, fontFamily: FONT_MONO }}>
                    {l}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Advisors */}
        <div className="mt-5 p-4 rounded-[3px] flex items-center gap-5" style={{ background: T.surface2, border: `1px solid ${T.rule}` }}>
          <div className="text-[10px] uppercase tracking-[0.16em] flex-shrink-0" style={{ color: T.muted, fontWeight: 500 }}>
            Advised by
          </div>
          <div style={{ width: 1, height: 22, background: T.rule }}/>
          <div className="flex-1 flex items-center gap-5 flex-wrap text-[12px]" style={{ color: T.ink2 }}>
            <span><span style={{ color: T.ink, fontWeight: 500 }}>David Lederer</span> · ex-CTO TaxDome</span>
            <span><span style={{ color: T.ink, fontWeight: 500 }}>Marcia Tanner-Weiss, JD/CPA</span> · former IRS Office of Chief Counsel</span>
            <span><span style={{ color: T.ink, fontWeight: 500 }}>Brett Halloran</span> · founder Pilot, exited to Plaid</span>
          </div>
        </div>
      </div>

      <BrandFooter/>
    </Slide>
  );
}

/* ============================================================
   SLIDE 11 — THE ASK
   ============================================================ */
function AskSlide({ slideIdx }) {
  return (
    <Slide slideIdx={slideIdx} dark padded={false}>
      <div
        aria-hidden
        style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(circle at 70% 30%, rgba(196,106,45,0.18), transparent 55%)`,
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute', right: -250, top: -250, width: 800, height: 800,
          border: `1px solid rgba(255,253,248,0.06)`, borderRadius: '50%',
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute', right: -100, top: -100, width: 480, height: 480,
          border: `1px solid rgba(196,106,45,0.12)`, borderRadius: '50%',
        }}
      />

      <div className="relative flex-1 flex flex-col px-12 pt-9 pb-9" style={{ fontFamily: FONT_BODY, color: T.surface }}>
        <SlideHeader num="11" label="The ask" slideIdx={slideIdx} total={SLIDES.length}/>

        <div className="flex-1 grid grid-cols-12 gap-10 items-center mt-6">
          <div className="col-span-7">
            <h1
              style={{
                fontFamily: FONT_DISPLAY, fontSize: 90, lineHeight: 0.96,
                letterSpacing: '-0.03em', fontStyle: 'italic',
              }}
            >
              We're raising<br/>
              <span style={{ color: T.copperLt }}>$14M Series A</span><br/>
              to win the next<br/>five years.
            </h1>

            <div className="mt-9 max-w-[520px]">
              <div className="text-[10.5px] uppercase tracking-[0.18em] mb-3" style={{ color: T.copperLt, fontWeight: 500 }}>
                Use of funds
              </div>
              {[
                { l: 'AI & research engineering',         pct: 38 },
                { l: 'Sales & customer success',           pct: 28 },
                { l: 'Product & design',                    pct: 18 },
                { l: 'Compliance · SOC 2 · enterprise',    pct: 10 },
                { l: 'G&A · runway · contingency',         pct: 6  },
              ].map((u, i) => (
                <div key={i} className="flex items-center gap-3 py-2">
                  <div className="text-[12px]" style={{ color: 'rgba(255,253,248,0.85)', flex: 1 }}>{u.l}</div>
                  <div className="flex items-center gap-2" style={{ flex: 1.5 }}>
                    <div className="flex-1 h-[3px] rounded-full" style={{ background: 'rgba(255,253,248,0.10)' }}>
                      <div style={{ height: '100%', width: `${u.pct}%`, background: T.copperLt, borderRadius: 999 }}/>
                    </div>
                    <span className="text-[11px]" style={{ color: T.copperLt, fontFamily: FONT_MONO, minWidth: 26, textAlign: 'right' }}>{u.pct}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-5">
            <div
              className="p-7 rounded-[4px]"
              style={{ background: 'rgba(255,253,248,0.06)', border: `1px solid rgba(255,253,248,0.18)` }}
            >
              <div className="text-[10px] uppercase tracking-[0.18em] mb-4" style={{ color: T.copperLt, fontWeight: 500 }}>
                Round terms · indicative
              </div>
              <div className="flex flex-col gap-3">
                {[
                  ['Round size',      '$14M'],
                  ['Pre-money',        '$72M'],
                  ['Lead reserved',    '$8M'],
                  ['Strategic angels', '$2M committed'],
                  ['Closing target',    'Aug 2026'],
                  ['Runway',           '28 months'],
                ].map(([k, v], i) => (
                  <div
                    key={i}
                    className="flex items-baseline justify-between"
                    style={{ paddingBottom: 8, borderBottom: i < 5 ? `1px dashed rgba(255,253,248,0.12)` : 'none' }}
                  >
                    <span className="text-[11.5px]" style={{ color: 'rgba(255,253,248,0.7)' }}>{k}</span>
                    <span style={{ fontFamily: FONT_DISPLAY, fontSize: 22, color: T.surface, fontStyle: 'italic', letterSpacing: '-0.01em', lineHeight: 1 }}>
                      {v}
                    </span>
                  </div>
                ))}
              </div>

              <button
                className="mt-7 w-full py-3 text-[13px] flex items-center justify-center gap-1.5 rounded-[3px]"
                style={{ background: T.copper, color: T.surface, fontWeight: 500 }}
              >
                Schedule a deeper dive <ArrowRight size={13}/>
              </button>
              <div className="mt-3 text-[10px] text-center" style={{ color: 'rgba(255,253,248,0.55)' }}>
                Diligence room available on request
              </div>
            </div>

            <div className="mt-5 flex items-center gap-3 text-[11px]" style={{ color: 'rgba(255,253,248,0.65)' }}>
              <Mail size={12}/>
              <span style={{ fontFamily: FONT_MONO }}>founders@ledger.app</span>
              <span>·</span>
              <span>Suresh Patel, CEO</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between" style={{ borderTop: `1px solid rgba(255,253,248,0.12)`, paddingTop: 16, marginTop: 16 }}>
          <div className="flex items-center gap-2">
            <div style={{ width: 22, height: 22, borderRadius: 3, background: T.copper, color: T.surface, fontFamily: FONT_DISPLAY, fontSize: 16, fontStyle: 'italic', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: 3, lineHeight: 1 }}>L</div>
            <span style={{ fontFamily: FONT_DISPLAY, fontSize: 15, color: T.surface, letterSpacing: '-0.01em' }}>
              Ledger<span style={{ color: T.copperLt }}>.</span>
            </span>
          </div>
          <div className="text-[9.5px] uppercase tracking-[0.18em]" style={{ color: 'rgba(255,253,248,0.4)' }}>
            Confidential · For investor review · Vol. IV
          </div>
        </div>
      </div>
    </Slide>
  );
}

/* ============================================================
   APP SHELL — slide navigation
   ============================================================ */
export default function App() {
  const [idx, setIdx] = useState(0);
  const [presentMode, setPresentMode] = useState(false);

  useEffect(() => {
    const id = 'ledger-deck-fonts';
    if (document.getElementById(id)) return;
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap';
    document.head.appendChild(link);
  }, []);

  const next = useCallback(() => setIdx(i => Math.min(i + 1, SLIDES.length - 1)), []);
  const prev = useCallback(() => setIdx(i => Math.max(i - 1, 0)), []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') next();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'Escape') setPresentMode(false);
      if (e.key === 'f') setPresentMode(true);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  const renderSlide = () => {
    const s = SLIDES[idx];
    switch (s.kind) {
      case 'cover':         return <CoverSlide/>;
      case 'big-statement': return <OpeningSlide slideIdx={idx}/>;
      case 'problem':        return <ProblemSlide slideIdx={idx}/>;
      case 'why-now':        return <WhyNowSlide slideIdx={idx}/>;
      case 'product':        return <ProductSlide slideIdx={idx}/>;
      case 'intelligence':   return <IntelligenceSlide slideIdx={idx}/>;
      case 'wedge':          return <WedgeSlide slideIdx={idx}/>;
      case 'market':         return <MarketSlide slideIdx={idx}/>;
      case 'business':       return <BusinessSlide slideIdx={idx}/>;
      case 'traction':       return <TractionSlide slideIdx={idx}/>;
      case 'team':           return <TeamSlide slideIdx={idx}/>;
      case 'ask':            return <AskSlide slideIdx={idx}/>;
      default: return null;
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden" style={{ background: T.bgDeep, fontFamily: FONT_BODY }}>
      {/* Top bar */}
      {!presentMode && (
        <header
          className="flex items-center px-6 py-3 gap-4"
          style={{ background: T.surface, borderBottom: `1px solid ${T.rule}` }}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="flex items-center justify-center"
              style={{
                width: 28, height: 28, borderRadius: 4, background: T.primary,
                color: T.surface, fontFamily: FONT_DISPLAY, fontSize: 20, fontStyle: 'italic',
                lineHeight: 1, paddingBottom: 4,
              }}
            >L</div>
            <span style={{ fontFamily: FONT_DISPLAY, fontSize: 18, color: T.ink, letterSpacing: '-0.01em' }}>
              Ledger<span style={{ color: T.copper }}>.</span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.18em] ml-2" style={{ color: T.muted }}>
              Series A · Pitch Deck
            </span>
          </div>

          <div className="flex-1"/>

          <span className="text-[11px]" style={{ color: T.muted, fontFamily: FONT_MONO }}>
            {String(idx).padStart(2,'0')} / {String(SLIDES.length - 1).padStart(2,'0')} · {SLIDES[idx].title}
          </span>

          <div className="flex items-center gap-1">
            <button
              onClick={prev}
              disabled={idx === 0}
              className="p-2 rounded-[3px]"
              style={{ background: T.surface2, color: T.ink2, border: `1px solid ${T.rule}`, opacity: idx === 0 ? 0.4 : 1 }}
            >
              <ChevronLeft size={14}/>
            </button>
            <button
              onClick={next}
              disabled={idx === SLIDES.length - 1}
              className="p-2 rounded-[3px]"
              style={{ background: T.surface2, color: T.ink2, border: `1px solid ${T.rule}`, opacity: idx === SLIDES.length - 1 ? 0.4 : 1 }}
            >
              <ChevronRight size={14}/>
            </button>
          </div>

          <button
            onClick={() => setPresentMode(true)}
            className="px-3 py-1.5 text-[11.5px] flex items-center gap-1.5 rounded-[3px]"
            style={{ background: T.primary, color: T.surface, fontWeight: 500 }}
          >
            <Play size={11}/> Present
          </button>
          <button className="p-2 rounded-[3px]" style={{ background: T.surface2, border: `1px solid ${T.rule}` }}>
            <Download size={13} style={{ color: T.ink2 }}/>
          </button>
          <button className="p-2 rounded-[3px]" style={{ background: T.surface2, border: `1px solid ${T.rule}` }}>
            <Share2 size={13} style={{ color: T.ink2 }}/>
          </button>
        </header>
      )}

      {/* Slide canvas */}
      <div className="flex-1 flex items-center justify-center p-6 overflow-hidden">
        <div
          className="relative shadow-2xl"
          style={{
            width: '100%',
            maxWidth: presentMode ? '100%' : 1280,
            aspectRatio: '16 / 9',
            maxHeight: '100%',
            background: T.bg,
            borderRadius: presentMode ? 0 : 6,
            overflow: 'hidden',
            border: presentMode ? 'none' : `1px solid ${T.rule}`,
            boxShadow: presentMode ? 'none' : '0 30px 60px -20px rgba(20,15,8,0.25)',
          }}
        >
          {renderSlide()}

          {/* Present mode controls */}
          {presentMode && (
            <>
              <button
                onClick={() => setPresentMode(false)}
                className="absolute top-4 right-4 p-2 rounded-[3px]"
                style={{ background: 'rgba(20,15,8,0.4)', color: T.surface, backdropFilter: 'blur(6px)' }}
              >
                <X size={16}/>
              </button>
              <div
                className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full"
                style={{ background: 'rgba(20,15,8,0.6)', backdropFilter: 'blur(8px)', color: T.surface }}
              >
                <button onClick={prev} disabled={idx === 0}>
                  <ChevronLeft size={16} style={{ opacity: idx === 0 ? 0.3 : 1 }}/>
                </button>
                <span className="text-[11px]" style={{ fontFamily: FONT_MONO }}>
                  {idx + 1} / {SLIDES.length}
                </span>
                <button onClick={next} disabled={idx === SLIDES.length - 1}>
                  <ChevronRight size={16} style={{ opacity: idx === SLIDES.length - 1 ? 0.3 : 1 }}/>
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Slide thumbnails strip */}
      {!presentMode && (
        <div
          className="px-6 py-3 flex items-center gap-2 overflow-x-auto"
          style={{ background: T.surface, borderTop: `1px solid ${T.rule}` }}
        >
          {SLIDES.map((s, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className="flex flex-col items-start gap-1 shrink-0"
              style={{ width: 96 }}
            >
              <div
                className="w-full rounded-[3px] flex items-center justify-center"
                style={{
                  height: 56,
                  background: i === idx ? T.primary : T.surface2,
                  border: `1px solid ${i === idx ? T.primary : T.rule}`,
                  color: i === idx ? T.surface : T.ink2,
                  fontFamily: FONT_DISPLAY, fontSize: 22, fontStyle: 'italic',
                  letterSpacing: '-0.02em',
                }}
              >
                {s.num}
              </div>
              <span className="text-[10px] truncate w-full" style={{ color: i === idx ? T.copper : T.muted, fontFamily: FONT_BODY, fontWeight: i === idx ? 500 : 400 }}>
                {s.title}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
