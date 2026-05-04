import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight, ArrowUpRight, Check, X, Sparkles, Zap, Brain, Shield,
  PenLine, Receipt, Calendar, FileText, Users, MessageSquare,
  TrendingUp, Lock, ChevronDown, Play, Star, Quote, Plus, Menu,
  Factory, Truck, HardHat, Building2, CircleDot, CheckCircle2,
  Inbox, Bell, BarChart3, Globe, Clock, AlertTriangle,
} from 'lucide-react';

/* ============================================================
   THEME (consistent with practice suite + portal)
   ============================================================ */
const T = {
  bg:        '#F4EFE6',
  bgDeep:    '#EAE3D0',
  surface:   '#FFFDF8',
  surface2:  '#FAF6EC',
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
   SHARED PRIMITIVES
   ============================================================ */
function SectionTag({ children, num, dark }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className="text-[10px] uppercase tracking-[0.22em]"
        style={{ color: dark ? T.copperLt : T.copper, fontFamily: FONT_BODY, fontWeight: 500 }}
      >
        {num}
      </span>
      <span style={{ width: 24, height: 1, background: dark ? 'rgba(255,253,248,0.25)' : T.rule2 }}/>
      <span
        className="text-[10px] uppercase tracking-[0.22em]"
        style={{ color: dark ? 'rgba(255,253,248,0.65)' : T.muted, fontFamily: FONT_BODY }}
      >
        {children}
      </span>
    </div>
  );
}

function PrimaryButton({ children, dark }) {
  return (
    <button
      className="px-5 py-3 text-[13px] flex items-center gap-1.5 rounded-[3px] transition-transform hover:-translate-y-px"
      style={{
        background: dark ? T.copper : T.primary,
        color: T.surface, fontWeight: 500, fontFamily: FONT_BODY,
      }}
    >
      {children}
    </button>
  );
}

function GhostButton({ children, dark }) {
  return (
    <button
      className="px-5 py-3 text-[13px] flex items-center gap-1.5 rounded-[3px]"
      style={{
        background: 'transparent',
        color: dark ? T.surface : T.ink,
        border: `1px solid ${dark ? 'rgba(255,253,248,0.3)' : T.rule2}`,
        fontFamily: FONT_BODY, fontWeight: 500,
      }}
    >
      {children}
    </button>
  );
}

/* ============================================================
   NAV
   ============================================================ */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
      <div className="mx-auto max-w-[1280px] px-8 py-4 flex items-center">
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
        </div>

        <div className="ml-12 flex items-center gap-7">
          {['Product', 'Pricing', 'Customers', 'Resources'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="text-[12.5px] flex items-center gap-1" style={{ color: T.ink2 }}>
              {l}
              {l === 'Product' && <ChevronDown size={11} style={{ color: T.muted }}/>}
            </a>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-3">
          <a href="#" className="text-[12.5px]" style={{ color: T.ink2 }}>Sign in</a>
          <button
            className="px-3.5 py-2 text-[12px] flex items-center gap-1.5 rounded-[3px]"
            style={{ background: T.primary, color: T.surface, fontWeight: 500 }}
          >
            Book a demo <ArrowRight size={12}/>
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
    <section
      className="relative overflow-hidden"
      style={{ background: T.bg }}
    >
      {/* atmospheric texture */}
      <div
        aria-hidden
        style={{
          position: 'absolute', inset: 0,
          backgroundImage: `radial-gradient(circle at 80% 20%, rgba(196,106,45,0.10), transparent 50%),
                            radial-gradient(circle at 10% 90%, rgba(11,61,58,0.08), transparent 55%)`,
        }}
      />
      {/* fine grid */}
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

      <div className="relative mx-auto max-w-[1280px] px-8 pt-20 pb-24">
        <div className="grid grid-cols-12 gap-10 items-end">
          <div className="col-span-7">
            <SectionTag num="01">A practice suite for the post-AI era</SectionTag>

            <h1
              className="mt-7"
              style={{
                fontFamily: FONT_DISPLAY, fontSize: 88, lineHeight: 0.96,
                letterSpacing: '-0.025em', color: T.ink, fontStyle: 'italic',
              }}
            >
              The practice suite<br/>
              that thinks <span style={{ color: T.copper }}>ahead</span><br/>
              of you.
            </h1>

            <p
              className="mt-7 max-w-[560px]"
              style={{ fontFamily: FONT_BODY, fontSize: 16, color: T.ink2, lineHeight: 1.55 }}
            >
              Ledger combines client management, secure document handling, and tax
              intelligence into one quiet platform. It learns the rhythm of your firm —
              then runs ahead, classifying documents, surfacing risks, and proposing
              automations before you ask.
            </p>

            <div className="mt-9 flex items-center gap-3">
              <PrimaryButton>Start 30-day trial <ArrowRight size={13}/></PrimaryButton>
              <GhostButton><Play size={12}/>Watch 2-min tour</GhostButton>
            </div>

            <div className="mt-12 flex items-center gap-7">
              <div>
                <div className="text-[10px] uppercase tracking-[0.18em]" style={{ color: T.muted }}>Free for 30 days</div>
                <div className="text-[11px] mt-0.5" style={{ color: T.ink2 }}>No card required · all plans included</div>
              </div>
              <div style={{ width: 1, height: 28, background: T.rule2 }}/>
              <div>
                <div className="text-[10px] uppercase tracking-[0.18em]" style={{ color: T.muted }}>Migrate from</div>
                <div className="text-[11px] mt-0.5" style={{ color: T.ink2 }}>TaxDome · Canopy · Karbon</div>
              </div>
            </div>
          </div>

          <div className="col-span-5">
            <HeroProductMock/>
          </div>
        </div>

        {/* big serial number footer to ground page */}
        <div
          className="mt-20 flex items-end justify-between pt-8"
          style={{ borderTop: `1px solid ${T.rule}` }}
        >
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 96, lineHeight: 0.85, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.04em' }}>
            <span style={{ color: T.copper }}>VOL.</span> IV
            <span style={{ fontSize: 28, color: T.muted, marginLeft: 14, fontStyle: 'normal', fontFamily: FONT_BODY, letterSpacing: '0.16em', textTransform: 'uppercase', verticalAlign: 'top' }}>
              Spring · 2026
            </span>
          </div>
          <div className="text-[11px] uppercase tracking-[0.18em] flex items-center gap-2" style={{ color: T.muted }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: T.ok }}/>
            All systems operational
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   HERO PRODUCT MOCK — stylized inline dashboard
   ============================================================ */
function HeroProductMock() {
  return (
    <div className="relative" style={{ perspective: 1200 }}>
      {/* shadow */}
      <div
        aria-hidden
        style={{
          position: 'absolute', inset: '60px -40px -30px 20px',
          background: 'rgba(20,15,8,0.18)', filter: 'blur(40px)', borderRadius: 20,
        }}
      />

      {/* main panel */}
      <div
        className="relative"
        style={{
          background: T.surface, border: `1px solid ${T.rule}`, borderRadius: 6,
          transform: 'rotateY(-6deg) rotateX(2deg)',
          boxShadow: '0 30px 50px -20px rgba(20,15,8,0.18)',
          fontFamily: FONT_BODY,
        }}
      >
        {/* mini topbar */}
        <div className="flex items-center gap-2 px-4 py-2.5" style={{ borderBottom: `1px solid ${T.rule}` }}>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full" style={{ background: '#E5C0AC' }}/>
            <span className="w-2 h-2 rounded-full" style={{ background: '#EAD79A' }}/>
            <span className="w-2 h-2 rounded-full" style={{ background: '#B8D4BE' }}/>
          </div>
          <div className="ml-2 flex-1 flex items-center gap-1.5">
            <span className="text-[9.5px] uppercase tracking-[0.16em]" style={{ color: T.muted }}>practice /</span>
            <span style={{ fontFamily: FONT_DISPLAY, fontSize: 13, color: T.ink, fontStyle: 'italic' }}>Dashboard</span>
          </div>
          <div className="text-[9px] px-1.5 py-[1px] rounded-[2px]" style={{ background: T.surface2, border: `1px solid ${T.rule}`, color: T.muted, fontFamily: FONT_MONO }}>⌘K</div>
        </div>

        {/* season pulse mini */}
        <div className="m-3 rounded-[3px] p-3 relative overflow-hidden" style={{ background: T.primary, color: T.surface }}>
          <div
            aria-hidden
            style={{
              position: 'absolute', right: -16, top: -16, width: 80, height: 80,
              border: `1px solid rgba(255,253,248,0.15)`, borderRadius: '50%',
            }}
          />
          <div className="text-[7.5px] uppercase tracking-[0.18em]" style={{ color: T.copperLt }}>Tax Season · Post-April</div>
          <div className="mt-1" style={{ fontFamily: FONT_DISPLAY, fontSize: 16, fontStyle: 'italic', lineHeight: 1.15, letterSpacing: '-0.01em' }}>
            5 days. Q1 941 due Apr 30.
          </div>
          <div className="mt-2 h-[2px] rounded-full" style={{ background: 'rgba(255,253,248,0.15)' }}>
            <div style={{ width: '62%', height: '100%', background: T.copperLt, borderRadius: 999 }}/>
          </div>
        </div>

        {/* KPI mini */}
        <div className="grid grid-cols-3 gap-1.5 mx-3 mb-3">
          {[
            { l: 'Active', v: '42' },
            { l: 'Tasks', v: '28' },
            { l: 'MRR', v: '$16.1k' },
          ].map((k, i) => (
            <div key={i} className="p-2 rounded-[2px]" style={{ background: T.surface2, border: `1px solid ${T.rule}` }}>
              <div className="text-[7px] uppercase tracking-[0.14em]" style={{ color: T.muted }}>{k.l}</div>
              <div className="mt-0.5" style={{ fontFamily: FONT_DISPLAY, fontSize: 16, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.02em' }}>
                {k.v}
              </div>
            </div>
          ))}
        </div>

        {/* mini scatter */}
        <div className="mx-3 mb-3 p-3 rounded-[3px]" style={{ background: T.surface2, border: `1px solid ${T.rule}` }}>
          <div className="text-[7.5px] uppercase tracking-[0.16em] mb-1.5" style={{ color: T.muted }}>Client Health × Revenue</div>
          <svg viewBox="0 0 220 90" width="100%">
            <line x1={6} y1={70} x2={210} y2={70} stroke={T.rule2} strokeWidth={0.5}/>
            <line x1={6} y1={45} x2={210} y2={45} stroke={T.rule2} strokeWidth={0.5} strokeDasharray="2 3"/>
            <line x1={108} y1={6} x2={108} y2={70} stroke={T.rule2} strokeWidth={0.5} strokeDasharray="2 3"/>
            {[
              { x: 180, y: 22, r: 5, c: T.ok },
              { x: 165, y: 28, r: 4, c: T.ok },
              { x: 130, y: 32, r: 5, c: T.ok },
              { x: 145, y: 48, r: 4, c: T.warn },
              { x: 95,  y: 38, r: 5, c: T.warn },
              { x: 70,  y: 52, r: 6, c: T.warn },
              { x: 45,  y: 55, r: 7, c: T.danger },
              { x: 30,  y: 62, r: 4, c: T.danger },
            ].map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r={p.r} fill={p.c} opacity={0.85} stroke={T.surface} strokeWidth={1}/>
            ))}
            <text x={208} y={14} textAnchor="end" fontSize={6} fill={T.ok} fontFamily={FONT_BODY} letterSpacing={1.2} fontWeight={600}>STARS</text>
            <text x={9} y={66} fontSize={6} fill={T.danger} fontFamily={FONT_BODY} letterSpacing={1.2} fontWeight={600}>AT RISK</text>
          </svg>
        </div>
      </div>

      {/* floating AI badge */}
      <div
        className="absolute flex items-center gap-2 px-3 py-2 rounded-full"
        style={{
          right: -20, top: 220, background: T.surface, border: `1px solid ${T.copper}`,
          boxShadow: '0 16px 30px -10px rgba(196,106,45,0.35)', fontFamily: FONT_BODY,
          transform: 'rotate(2deg)',
        }}
      >
        <Sparkles size={13} style={{ color: T.copper }}/>
        <span className="text-[11px]" style={{ color: T.ink, fontWeight: 500 }}>AI classified 12 docs</span>
      </div>

      {/* floating deadline card */}
      <div
        className="absolute flex flex-col gap-1 px-3 py-2.5 rounded-[3px]"
        style={{
          left: -30, top: 80, background: T.surface, border: `1px solid ${T.rule}`,
          boxShadow: '0 16px 30px -10px rgba(20,15,8,0.15)', fontFamily: FONT_BODY,
          transform: 'rotate(-3deg)', width: 140,
        }}
      >
        <div className="text-[8.5px] uppercase tracking-[0.16em]" style={{ color: T.muted }}>Deadline Radar</div>
        <div className="flex items-baseline gap-1">
          <span style={{ fontFamily: FONT_DISPLAY, fontSize: 22, fontStyle: 'italic', color: T.ink, lineHeight: 1, letterSpacing: '-0.02em' }}>5</span>
          <span className="text-[10px]" style={{ color: T.muted }}>days</span>
        </div>
        <div className="text-[10px]" style={{ color: T.ink2 }}>Form 941 · Q1</div>
        <div className="flex items-center gap-1 text-[9px]" style={{ color: T.danger }}>
          <span className="w-1 h-1 rounded-full" style={{ background: T.danger }}/>
          Missing March data
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   TRUST STRIP
   ============================================================ */
function TrustStrip() {
  return (
    <section style={{ background: T.bgDeep, borderTop: `1px solid ${T.rule2}`, borderBottom: `1px solid ${T.rule2}` }}>
      <div className="mx-auto max-w-[1280px] px-8 py-10">
        <div className="grid grid-cols-12 gap-8 items-center">
          <div className="col-span-3">
            <div className="text-[10.5px] uppercase tracking-[0.22em]" style={{ color: T.muted, fontFamily: FONT_BODY }}>
              Trusted by
            </div>
            <div className="mt-1" style={{ fontFamily: FONT_DISPLAY, fontSize: 24, fontStyle: 'italic', color: T.ink, letterSpacing: '-0.01em', lineHeight: 1.15 }}>
              1,200+ practices<br/>across 47 states
            </div>
          </div>

          <div className="col-span-9 grid grid-cols-4 gap-px" style={{ background: T.rule2 }}>
            {[
              { v: '$2.4B', l: 'in returns processed annually' },
              { v: '410k', l: 'documents classified by AI/mo' },
              { v: '98.4%', l: 'client retention rate' },
              { v: '11.2hr', l: 'saved per practice / week' },
            ].map((s, i) => (
              <div key={i} className="px-5 py-4" style={{ background: T.bgDeep }}>
                <div style={{ fontFamily: FONT_DISPLAY, fontSize: 32, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.02em', lineHeight: 1 }}>
                  {s.v}
                </div>
                <div className="text-[10.5px] mt-1.5" style={{ color: T.muted, fontFamily: FONT_BODY }}>
                  {s.l}
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
   PROBLEM SECTION
   ============================================================ */
function Problem() {
  const pains = [
    {
      icon: Inbox,
      title: 'Documents arrive in chaos',
      body: 'PDFs in email, photos in WhatsApp, spreadsheets in Drive. Your week starts with sorting other people\'s mess.',
    },
    {
      icon: Bell,
      title: 'Deadlines are reactive',
      body: 'You know the dates. But which client is actually at risk? Spreadsheets don\'t flag the one missing March payroll.',
    },
    {
      icon: Building2,
      title: 'Every tool is an island',
      body: 'CRM here, e-sign there, billing somewhere else. Five logins. Three sources of truth. Zero context-passing.',
    },
    {
      icon: Brain,
      title: 'Your expertise gets buried',
      body: 'You know §179 cold. You know which clients need cost-seg. But that knowledge lives in your head, not your software.',
    },
  ];
  return (
    <section style={{ background: T.bg }}>
      <div className="mx-auto max-w-[1280px] px-8 py-24">
        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-5">
            <SectionTag num="02">The problem</SectionTag>
            <h2
              className="mt-7"
              style={{
                fontFamily: FONT_DISPLAY, fontSize: 56, lineHeight: 1.02,
                letterSpacing: '-0.02em', color: T.ink, fontStyle: 'italic',
              }}
            >
              Your firm runs<br/>on tax knowledge.<br/>
              <span style={{ color: T.copper }}>Your software</span><br/>should too.
            </h2>
            <p className="mt-6 text-[14px] max-w-[420px]" style={{ color: T.ink2, fontFamily: FONT_BODY, lineHeight: 1.6 }}>
              Most practice suites track work. They don't understand it. Ledger reads
              the same things you read — IRS notices, K-1s, bank statements — and
              moves first.
            </p>
          </div>

          <div className="col-span-7">
            <div className="grid grid-cols-2 gap-px" style={{ background: T.rule }}>
              {pains.map((p, i) => {
                const Icon = p.icon;
                return (
                  <div key={i} className="p-6" style={{ background: T.bg }}>
                    <Icon size={20} style={{ color: T.copper }} strokeWidth={1.5}/>
                    <div className="mt-4 text-[16px]" style={{ color: T.ink, fontFamily: FONT_BODY, fontWeight: 500, lineHeight: 1.3 }}>
                      {p.title}
                    </div>
                    <div className="mt-2 text-[12.5px]" style={{ color: T.ink2, fontFamily: FONT_BODY, lineHeight: 1.55 }}>
                      {p.body}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FEATURES (long-form, alternating)
   ============================================================ */
function Features() {
  return (
    <section id="product" style={{ background: T.surface, borderTop: `1px solid ${T.rule}` }}>
      <div className="mx-auto max-w-[1280px] px-8 py-24">
        <div className="max-w-[760px]">
          <SectionTag num="03">What's inside</SectionTag>
          <h2
            className="mt-7"
            style={{
              fontFamily: FONT_DISPLAY, fontSize: 56, lineHeight: 1.05,
              letterSpacing: '-0.02em', color: T.ink, fontStyle: 'italic',
            }}
          >
            One platform for the entire arc<br/>
            of a tax engagement.
          </h2>
          <p className="mt-5 text-[15px]" style={{ color: T.muted, fontFamily: FONT_BODY, lineHeight: 1.55 }}>
            From signed engagement letter to filed return to next year's planning conversation —
            no app-switching, no copy-pasting between tools.
          </p>
        </div>

        {/* Feature row 1 — AI Inbox */}
        <FeatureRow
          num="3.1"
          title="The AI Document Inbox"
          subtitle="Documents classify themselves. Data extracts itself."
          body={`Drop a bank statement, a CP2000, a K-1, a W-2 — Ledger reads it, knows what it is, pulls the fields that matter, and routes it to the right client folder with a suggested next action. You confirm in one click instead of typing for fifteen minutes.`}
          bullets={[
            'Classifies 32 US tax document types out of the box',
            'Pulls structured fields (account, period, amounts, deadlines)',
            'Routes IRS notices into urgent workflow automatically',
            'Confidence scoring — only escalates ambiguous cases',
          ]}
          mock={<MockAiInbox/>}
          dir="rtl"
        />

        {/* Feature row 2 — Health Matrix */}
        <FeatureRow
          num="3.2"
          title="Client Health Matrix"
          subtitle="See your book the way a partner reads a P&L."
          body={`Every client gets a live health score blending document responsiveness, deadline risk, A/R aging, and engagement signals. Plot them against revenue and you see star accounts, slipping clients, and your firm's attention budget — all in one chart.`}
          bullets={[
            'Health score updated daily from 14 signals',
            'Quadrant view: Stars · Steady · Slipping · At Risk',
            'Drill-through to client workspace from any dot',
            'Alert thresholds you control',
          ]}
          mock={<MockHealthMatrix/>}
          dir="ltr"
        />

        {/* Feature row 3 — Deadline Radar */}
        <FeatureRow
          num="3.3"
          title="Predictive Deadline Radar"
          subtitle="Not just dates. Risk."
          body={`Every form has a date. Ledger tells you which deadlines are actually at risk — based on what's missing, what's stuck, and what historical patterns suggest. The Q1 941 isn't on the radar because it's due Friday; it's on the radar because Big Horn hasn't sent March payroll yet.`}
          bullets={[
            'Federal + 50 state deadline coverage',
            'Risk model trained on missing-doc patterns',
            'One-click bulk reminder sequences',
            'Auto-extension drafts for slipping returns',
          ]}
          mock={<MockDeadlineRadar/>}
          dir="rtl"
        />

        {/* Feature row 4 — Client portal */}
        <FeatureRow
          num="3.4"
          title="A client portal clients actually use"
          subtitle="Your engagement, narrated."
          body={`Most portals are a folder with a login. Ledger's portal shows your client where they are in the process, what they need to do next, and what their tax position looks like — narrated in plain English. Less email, fewer "did you get my doc?" calls, faster signatures.`}
          bullets={[
            'Engagement timeline with live progress',
            'Action items with mobile-first signing & upload',
            'Personalized "Tax Picture" — strategies in play, opportunities to discuss',
            'White-label with your firm branding',
          ]}
          mock={<MockClientPortal/>}
          dir="ltr"
        />
      </div>
    </section>
  );
}

function FeatureRow({ num, title, subtitle, body, bullets, mock, dir }) {
  const isRtl = dir === 'rtl';
  return (
    <div className="grid grid-cols-12 gap-12 mt-24 items-center">
      <div className={isRtl ? 'col-span-5 order-2' : 'col-span-5'}>
        <div className="text-[10px] uppercase tracking-[0.22em]" style={{ color: T.copper, fontFamily: FONT_BODY, fontWeight: 500 }}>
          {num}
        </div>
        <h3
          className="mt-3"
          style={{ fontFamily: FONT_DISPLAY, fontSize: 36, lineHeight: 1.08, letterSpacing: '-0.02em', color: T.ink, fontStyle: 'italic' }}
        >
          {title}
        </h3>
        <div className="mt-2 text-[15px]" style={{ color: T.copper, fontFamily: FONT_DISPLAY, fontStyle: 'italic' }}>
          {subtitle}
        </div>
        <p className="mt-4 text-[13.5px]" style={{ color: T.ink2, fontFamily: FONT_BODY, lineHeight: 1.65 }}>
          {body}
        </p>
        <ul className="mt-5 flex flex-col gap-2.5">
          {bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-2.5 text-[12.5px]" style={{ color: T.ink2, fontFamily: FONT_BODY, lineHeight: 1.5 }}>
              <Check size={13} style={{ color: T.ok, marginTop: 3, flexShrink: 0 }} strokeWidth={2.5}/>
              {b}
            </li>
          ))}
        </ul>
      </div>
      <div className={isRtl ? 'col-span-7 order-1' : 'col-span-7'}>
        <div
          className="p-1 rounded-[6px]"
          style={{
            background: `linear-gradient(135deg, ${T.surface2}, ${T.bg})`,
            border: `1px solid ${T.rule}`,
            boxShadow: '0 30px 60px -30px rgba(20,15,8,0.18)',
          }}
        >
          {mock}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   FEATURE MOCKS
   ============================================================ */
function MockAiInbox() {
  const docs = [
    { f: 'IRS_CP2000_Cheyenne.pdf',     t: 'IRS Notice',     c: 99, fields: ['CP2000', 'TY 2024', '$8,412', 'Reply by May 12'] },
    { f: 'BHL_bank_stmt_Mar2026.pdf',   t: 'Bank Statement', c: 98, fields: ['****8421', 'Mar 1–31', '$84,200 in', '$71,840 out'] },
    { f: 'K1_Niobrara_partner3.pdf',    t: 'Schedule K-1',   c: 95, fields: ['L. Pemberton', '$48,200 ord. inc.', '$32,500 dist.'] },
  ];
  return (
    <div className="p-6 rounded-[5px]" style={{ background: T.surface, fontFamily: FONT_BODY }}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles size={14} style={{ color: T.copper }}/>
          <span className="text-[11.5px]" style={{ color: T.ink, fontWeight: 500 }}>AI Document Inbox</span>
          <span className="text-[10.5px] px-1.5 rounded-[2px]" style={{ background: T.surface2, color: T.muted, fontFamily: FONT_MONO }}>3 new</span>
        </div>
        <div className="text-[10px]" style={{ color: T.muted }}>last sync 34s ago</div>
      </div>
      <div className="flex flex-col" style={{ borderTop: `1px solid ${T.rule}` }}>
        {docs.map((d, i) => (
          <div key={i} className="py-3 flex items-start gap-3" style={{ borderBottom: `1px solid ${T.rule}` }}>
            <div
              className="flex items-center justify-center"
              style={{ width: 28, height: 32, background: T.surface2, border: `1px solid ${T.rule}`, borderRadius: 2 }}
            >
              <FileText size={13} style={{ color: T.primary }}/>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[11.5px]" style={{ color: T.ink, fontFamily: FONT_MONO }}>{d.f}</span>
                <span className="text-[9.5px] px-1.5 py-[1px] rounded-[2px]" style={{ background: '#D8E5E3', color: T.primary, fontWeight: 500, letterSpacing: 0.5, textTransform: 'uppercase' }}>{d.t}</span>
              </div>
              <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                {d.fields.map((f, j) => (
                  <span key={j} className="text-[10px] flex items-center gap-1" style={{ color: T.ink2 }}>
                    <span className="w-0.5 h-0.5 rounded-full" style={{ background: T.copper }}/>
                    <span style={{ fontFamily: FONT_MONO }}>{f}</span>
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-end gap-1.5 shrink-0">
              <span className="text-[9.5px]" style={{ color: T.ok, fontFamily: FONT_MONO }}>{d.c}% match</span>
              <button className="text-[10px] px-2 py-0.5 rounded-[2px] flex items-center gap-1" style={{ background: T.primary, color: T.surface, fontWeight: 500 }}>
                <Zap size={9}/> Run
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="text-[10px] mt-3 italic" style={{ color: T.muted }}>
        Average extraction time: 1.2s · Confidence threshold: 92%
      </div>
    </div>
  );
}

function MockHealthMatrix() {
  return (
    <div className="p-6 rounded-[5px]" style={{ background: T.surface, fontFamily: FONT_BODY }}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11.5px]" style={{ color: T.ink, fontWeight: 500 }}>Client Health × YTD Revenue</span>
        <span className="text-[10px]" style={{ color: T.muted }}>42 clients</span>
      </div>
      <svg viewBox="0 0 540 270" width="100%">
        {/* quadrants tint */}
        <rect x={272} y={20} width={244} height={115} fill={T.ok} opacity={0.05}/>
        <rect x={28}  y={135} width={244} height={115} fill={T.danger} opacity={0.05}/>
        {/* grid */}
        {[0, 1, 2, 3].map(i => (
          <line key={i} x1={28} y1={50 + i*55} x2={516} y2={50 + i*55} stroke={T.rule} strokeWidth={0.5} strokeDasharray="2 4"/>
        ))}
        <line x1={272} y1={20} x2={272} y2={250} stroke={T.rule2} strokeWidth={0.5}/>
        {/* points */}
        {[
          { x: 460, y: 50,  r: 10, c: T.ok,     l: 'Powder River' },
          { x: 415, y: 60,  r: 9,  c: T.ok,     l: 'Bison Crude' },
          { x: 430, y: 90,  r: 11, c: T.ok,     l: 'Rampart Steel' },
          { x: 380, y: 105, r: 8,  c: T.ok,     l: 'Sweetwater' },
          { x: 350, y: 130, r: 7,  c: T.ok,     l: 'Wind River' },
          { x: 320, y: 145, r: 8,  c: T.warn,   l: 'High Plains' },
          { x: 245, y: 160, r: 9,  c: T.warn,   l: 'Big Horn Log.' },
          { x: 220, y: 195, r: 8,  c: T.warn,   l: 'Granite Peak' },
          { x: 175, y: 110, r: 13, c: T.warn,   l: 'Niobrara Energy' },
          { x: 110, y: 105, r: 12, c: T.danger, l: 'Cheyenne Ridge' },
        ].map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r={p.r + 3} fill={p.c} opacity={0.12}/>
            <circle cx={p.x} cy={p.y} r={p.r} fill={p.c} opacity={0.85} stroke={T.surface} strokeWidth={1.5}/>
          </g>
        ))}
        {/* labels */}
        <text x={510} y={36} textAnchor="end" fontSize={9} fill={T.ok} fontFamily={FONT_BODY} letterSpacing={1.5} fontWeight={600}>STAR ACCOUNTS</text>
        <text x={34} y={244} textAnchor="start" fontSize={9} fill={T.danger} fontFamily={FONT_BODY} letterSpacing={1.5} fontWeight={600}>AT RISK</text>
        <text x={510} y={262} textAnchor="end" fontSize={8} fill={T.faint} fontFamily={FONT_BODY} letterSpacing={1.2}>HEALTH SCORE →</text>
        {/* annotation arrow to Cheyenne */}
        <line x1={150} y1={75} x2={120} y2={100} stroke={T.copper} strokeWidth={1} strokeDasharray="2 2"/>
        <text x={155} y={72} fontSize={9} fill={T.copper} fontFamily={FONT_DISPLAY} fontStyle="italic">Cheyenne Ridge — open CP2000</text>
      </svg>
    </div>
  );
}

function MockDeadlineRadar() {
  const items = [
    { d: 5,   form: 'Form 941',    label: 'Q1 Payroll',         risk: 'high',   reason: 'Missing March payroll docs' },
    { d: 18,  form: 'CP2000 reply',label: 'IRS notice',          risk: 'medium', reason: 'Draft started — needs review' },
    { d: 143, form: 'Form 1065',   label: 'Partnership (ext)',   risk: 'medium', reason: 'K-1 allocations pending' },
    { d: 173, form: 'Form 1040',   label: 'Personal (ext)',      risk: 'low',    reason: 'On track' },
  ];
  return (
    <div className="p-6 rounded-[5px]" style={{ background: T.surface, fontFamily: FONT_BODY }}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <Brain size={13} style={{ color: T.copper }}/>
          <span className="text-[11.5px]" style={{ color: T.ink, fontWeight: 500 }}>Deadline Radar — AI ranked</span>
        </div>
        <span className="text-[10px]" style={{ color: T.muted }}>next 60 days</span>
      </div>
      <div className="flex flex-col gap-px" style={{ background: T.rule }}>
        {items.map((it, i) => {
          const dot = it.risk === 'high' ? T.danger : it.risk === 'medium' ? T.warn : T.ok;
          return (
            <div key={i} className="flex items-center gap-3 px-3 py-2.5" style={{ background: T.surface }}>
              <div className="text-center" style={{ width: 38 }}>
                <div style={{ fontFamily: FONT_DISPLAY, fontSize: 22, fontStyle: 'italic', color: T.ink, lineHeight: 1, letterSpacing: '-0.02em' }}>{it.d}</div>
                <div className="text-[7.5px] uppercase tracking-[0.12em]" style={{ color: T.muted }}>days</div>
              </div>
              <div style={{ width: 1, height: 32, background: T.rule }}/>
              <div className="flex-1 min-w-0">
                <div className="text-[11.5px]" style={{ color: T.ink, fontWeight: 500 }}>{it.form} <span style={{ color: T.muted, fontWeight: 400 }}>· {it.label}</span></div>
                <div className="text-[10px] mt-0.5 flex items-center gap-1" style={{ color: T.muted, fontStyle: 'italic' }}>
                  <span className="w-1 h-1 rounded-full" style={{ background: dot }}/>
                  {it.reason}
                </div>
              </div>
              <span
                className="text-[9px] px-1.5 py-[1px] rounded-[2px] uppercase tracking-wider"
                style={{
                  background: it.risk === 'high' ? '#F2D9D1' : it.risk === 'medium' ? '#F5E6C9' : '#E2EBE3',
                  color: dot, fontWeight: 500,
                }}
              >
                {it.risk}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MockClientPortal() {
  return (
    <div className="rounded-[5px] overflow-hidden" style={{ background: T.surface, fontFamily: FONT_BODY }}>
      {/* portal hero */}
      <div className="p-5 relative overflow-hidden" style={{ background: T.primary, color: T.surface }}>
        <div
          aria-hidden
          style={{
            position: 'absolute', right: -30, top: -40, width: 160, height: 160,
            border: `1px solid rgba(255,253,248,0.10)`, borderRadius: '50%',
          }}
        />
        <div className="text-[9px] uppercase tracking-[0.18em]" style={{ color: T.copperLt }}>Client Portal · Powder River Drilling</div>
        <div className="mt-1.5" style={{ fontFamily: FONT_DISPLAY, fontSize: 24, fontStyle: 'italic', letterSpacing: '-0.02em', lineHeight: 1.05 }}>
          Welcome back, Cody.
        </div>
        <div className="text-[11.5px] mt-2" style={{ color: 'rgba(255,253,248,0.75)' }}>
          Your 2025 partnership return is on track. <span style={{ color: T.copperLt }}>4 items need your attention.</span>
        </div>
      </div>
      {/* timeline strip */}
      <div className="px-5 py-4" style={{ borderBottom: `1px solid ${T.rule}` }}>
        <div className="text-[8.5px] uppercase tracking-[0.16em] mb-2" style={{ color: T.muted }}>Engagement progress</div>
        <div className="flex items-center gap-1">
          {['Engaged', 'Books', 'Docs', 'Drafted', 'Review', 'Filed'].map((s, i) => (
            <React.Fragment key={s}>
              <div className="flex flex-col items-center" style={{ minWidth: 0, flex: '0 0 auto' }}>
                <div
                  className="rounded-full"
                  style={{
                    width: 12, height: 12,
                    background: i < 2 ? T.ok : i === 2 ? T.copper : T.surface2,
                    border: `1.5px solid ${i < 2 ? T.ok : i === 2 ? T.copper : T.rule2}`,
                  }}
                />
                <div className="text-[8.5px] mt-1" style={{ color: i <= 2 ? T.ink2 : T.muted }}>{s}</div>
              </div>
              {i < 5 && <div className="flex-1" style={{ height: 1.5, background: i < 2 ? T.ok : i === 2 ? T.copper : T.rule2 }}/>}
            </React.Fragment>
          ))}
        </div>
      </div>
      {/* action items */}
      <div className="p-5 grid grid-cols-2 gap-2.5">
        {[
          { i: PenLine, t: 'Sign 2026 engagement', d: 'medium', cta: 'Review & Sign' },
          { i: FileText,t: 'Upload Q1 bank stmt',  d: 'high',   cta: 'Upload' },
        ].map((a, i) => {
          const Icon = a.i;
          return (
            <div key={i} className="p-3 rounded-[3px]" style={{ background: T.surface2, border: `1px solid ${T.rule}` }}>
              <div className="flex items-start gap-2">
                <div
                  className="flex items-center justify-center"
                  style={{ width: 24, height: 24, borderRadius: 2, background: a.d === 'high' ? T.copper : T.primary, color: T.surface }}
                >
                  <Icon size={11}/>
                </div>
                <div className="flex-1">
                  <div className="text-[11px]" style={{ color: T.ink, fontWeight: 500 }}>{a.t}</div>
                  <div className="flex items-center justify-between mt-2">
                    <span
                      className="text-[8.5px] px-1.5 py-[1px] rounded-[2px] uppercase tracking-wider"
                      style={{
                        background: a.d === 'high' ? '#F2D9D1' : '#F5E6C9',
                        color: a.d === 'high' ? T.danger : '#8A6418',
                        fontWeight: 500,
                      }}
                    >{a.d}</span>
                    <button className="text-[9.5px] px-2 py-0.5 rounded-[2px]" style={{ background: T.primary, color: T.surface, fontWeight: 500 }}>
                      {a.cta}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ============================================================
   AI BANNER (dark interlude)
   ============================================================ */
function AiBanner() {
  return (
    <section style={{ background: T.primaryDk, color: T.surface }}>
      <div className="mx-auto max-w-[1280px] px-8 py-24 relative overflow-hidden">
        {/* atmospheric */}
        <div
          aria-hidden
          style={{
            position: 'absolute', right: -100, top: -100, width: 500, height: 500,
            border: `1px solid rgba(255,253,248,0.08)`, borderRadius: '50%',
          }}
        />
        <div
          aria-hidden
          style={{
            position: 'absolute', right: 50, top: 50, width: 320, height: 320,
            border: `1px solid rgba(196,106,45,0.15)`, borderRadius: '50%',
          }}
        />
        <div
          aria-hidden
          style={{
            position: 'absolute', inset: 0,
            background: `radial-gradient(circle at 70% 50%, rgba(196,106,45,0.10), transparent 60%)`,
          }}
        />

        <div className="relative grid grid-cols-12 gap-10">
          <div className="col-span-7">
            <SectionTag num="04" dark>The intelligence layer</SectionTag>
            <h2
              className="mt-7"
              style={{
                fontFamily: FONT_DISPLAY, fontSize: 64, lineHeight: 1.02,
                letterSpacing: '-0.025em', fontStyle: 'italic',
              }}
            >
              An EA-trained co-pilot,<br/>
              not a chatbot.
            </h2>
            <p className="mt-6 max-w-[540px] text-[15px]" style={{ color: 'rgba(255,253,248,0.75)', fontFamily: FONT_BODY, lineHeight: 1.6 }}>
              Most AI in tax software is a search box bolted to ChatGPT. Ledger AI is grounded
              in the IRC, current Treasury Regs, and your firm's own engagement data. It doesn't
              hallucinate §179 limits — it cites them.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6">
              {[
                { i: FileText,    t: 'Cites IRC, Reg, and Pub. references inline' },
                { i: Shield,      t: 'Trained on 2.4M anonymized tax positions' },
                { i: Brain,       t: 'Drafts CP2000 replies, response letters, memos' },
                { i: BarChart3,   t: 'Runs scenario calcs across §179 / bonus / QBI' },
              ].map((f, i) => {
                const Icon = f.i;
                return (
                  <div key={i} className="flex items-start gap-3">
                    <Icon size={16} style={{ color: T.copperLt, flexShrink: 0, marginTop: 2 }} strokeWidth={1.5}/>
                    <span className="text-[13px]" style={{ color: 'rgba(255,253,248,0.85)', fontFamily: FONT_BODY }}>{f.t}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="col-span-5">
            <MockAiChat/>
          </div>
        </div>
      </div>
    </section>
  );
}

function MockAiChat() {
  return (
    <div
      className="relative"
      style={{
        background: 'rgba(255,253,248,0.04)',
        border: `1px solid rgba(255,253,248,0.12)`,
        borderRadius: 4,
        backdropFilter: 'blur(8px)',
        fontFamily: FONT_BODY,
      }}
    >
      <div className="px-4 py-3 flex items-center gap-2.5" style={{ borderBottom: `1px solid rgba(255,253,248,0.08)` }}>
        <div
          className="flex items-center justify-center"
          style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(255,253,248,0.10)' }}
        >
          <Sparkles size={11} style={{ color: T.copperLt }}/>
        </div>
        <span className="text-[12px]" style={{ color: T.surface, fontWeight: 500 }}>Ledger AI</span>
        <span className="text-[9.5px] px-1.5 py-[1px] rounded-[2px] uppercase tracking-wider" style={{ background: 'rgba(232,151,98,0.15)', color: T.copperLt, fontWeight: 500 }}>Tax Co-Pilot</span>
      </div>

      <div className="p-4 flex flex-col gap-3">
        <div className="self-end max-w-[80%] px-3 py-2 text-[12px] rounded-[6px]" style={{ background: T.copper, color: T.surface, lineHeight: 1.5 }}>
          For Bison Crude's new $284k drilling rig — should we take §179 or bonus?
        </div>
        <div className="self-start max-w-[88%] px-3 py-2.5 text-[12px] rounded-[6px]" style={{ background: 'rgba(255,253,248,0.08)', color: 'rgba(255,253,248,0.92)', lineHeight: 1.55, border: `1px solid rgba(255,253,248,0.10)` }}>
          For 2026, run bonus depreciation. Here's why:
          <div className="mt-2 flex flex-col gap-1.5 text-[11px]" style={{ color: 'rgba(255,253,248,0.85)' }}>
            <div>· §179 caps at <span style={{ fontFamily: FONT_MONO, color: T.copperLt }}>$1.16M</span> with phase-out at $2.89M</div>
            <div>· Bonus is <span style={{ fontFamily: FONT_MONO, color: T.copperLt }}>60%</span> in 2026, dropping to <span style={{ fontFamily: FONT_MONO, color: T.copperLt }}>40%</span> in 2027</div>
            <div>· Bison's projected 2027 revenue is flat → take deduction now</div>
            <div>· Wyoming has no state conformity issue</div>
          </div>
          <div className="mt-2 text-[10.5px] italic" style={{ color: 'rgba(255,253,248,0.55)' }}>
            IRC §168(k) · Rev. Proc. 2024-19
          </div>
        </div>
        <div className="self-start flex items-center gap-1.5 mt-1">
          <button className="text-[10px] px-2 py-1 rounded-[3px]" style={{ background: 'rgba(255,253,248,0.10)', color: T.surface, border: `1px solid rgba(255,253,248,0.12)` }}>
            Draft election memo
          </button>
          <button className="text-[10px] px-2 py-1 rounded-[3px]" style={{ background: 'rgba(255,253,248,0.10)', color: T.surface, border: `1px solid rgba(255,253,248,0.12)` }}>
            Run scenario calc
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   TESTIMONIAL
   ============================================================ */
function Testimonial() {
  return (
    <section style={{ background: T.bg }}>
      <div className="mx-auto max-w-[1280px] px-8 py-24">
        <div className="grid grid-cols-12 gap-10 items-center">
          <div className="col-span-1">
            <Quote size={48} style={{ color: T.copper }} strokeWidth={1}/>
          </div>
          <div className="col-span-8">
            <blockquote
              style={{
                fontFamily: FONT_DISPLAY, fontSize: 38, lineHeight: 1.2,
                letterSpacing: '-0.015em', color: T.ink, fontStyle: 'italic',
              }}
            >
              "We migrated our 84-client book off TaxDome over a weekend. Three months in,
              I'd already cut about <span style={{ color: T.copper }}>11 hours a week of admin</span>.
              The AI inbox alone paid for the year."
            </blockquote>
            <div className="mt-6 flex items-center gap-4">
              <div
                className="flex items-center justify-center text-[14px]"
                style={{ width: 48, height: 48, borderRadius: '50%', background: T.primary, color: T.surface, fontWeight: 600, fontFamily: FONT_BODY }}
              >
                MR
              </div>
              <div style={{ fontFamily: FONT_BODY }}>
                <div className="text-[13.5px]" style={{ color: T.ink, fontWeight: 500 }}>Margaux Renault, EA, MST</div>
                <div className="text-[11.5px]" style={{ color: T.muted }}>Managing Partner · Renault & Wendell · Cheyenne, WY</div>
              </div>
            </div>
          </div>
          <div className="col-span-3">
            <div className="grid grid-cols-2 gap-px" style={{ background: T.rule2 }}>
              {[
                { v: '11hr', l: '/wk saved' },
                { v: '84',   l: 'clients migrated' },
                { v: '0',    l: 'data lost' },
                { v: '3mo',  l: 'to ROI' },
              ].map((s, i) => (
                <div key={i} className="px-3 py-3" style={{ background: T.bg }}>
                  <div style={{ fontFamily: FONT_DISPLAY, fontSize: 22, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.01em', lineHeight: 1 }}>{s.v}</div>
                  <div className="text-[9.5px] uppercase tracking-[0.12em] mt-1" style={{ color: T.muted, fontFamily: FONT_BODY }}>{s.l}</div>
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
   PRICING
   ============================================================ */
const PLANS = [
  {
    name: 'Solo',
    sub: 'For one EA or CPA running their own book.',
    price: 49, cap: 'per month',
    accent: false,
    perks: [
      'Up to 25 active clients',
      'AI document classification (1k docs/mo)',
      'Client portal & e-signatures',
      'Deadline radar',
      'Email support',
    ],
    cta: 'Start free trial',
  },
  {
    name: 'Practice',
    sub: 'For growing firms with a partner-led team.',
    price: 149, cap: 'per month + $19 per seat',
    accent: true,
    perks: [
      'Unlimited active clients',
      'AI document classification (10k docs/mo)',
      'Predictive deadline radar + risk model',
      'Health matrix & automation proposals',
      'Workflow templates & client billing',
      'QuickBooks, Stripe, Drake integrations',
      'Priority support',
    ],
    cta: 'Most popular · start free trial',
    badge: 'Most popular',
  },
  {
    name: 'Firm',
    sub: 'For multi-partner firms with custom workflows.',
    price: 'Custom', cap: 'volume pricing',
    accent: false,
    perks: [
      'Everything in Practice',
      'White-label client portal',
      'SOC 2 evidence & SSO/SAML',
      'Dedicated CSM & migration team',
      'Custom AI fine-tune on your firm data',
      '99.9% SLA',
    ],
    cta: 'Talk to sales',
  },
];

function Pricing() {
  return (
    <section id="pricing" style={{ background: T.surface, borderTop: `1px solid ${T.rule}` }}>
      <div className="mx-auto max-w-[1280px] px-8 py-24">
        <div className="text-center max-w-[640px] mx-auto">
          <SectionTag num="05">Pricing</SectionTag>
          <h2
            className="mt-7"
            style={{
              fontFamily: FONT_DISPLAY, fontSize: 56, lineHeight: 1.02,
              letterSpacing: '-0.02em', color: T.ink, fontStyle: 'italic',
            }}
          >
            Honest pricing. No per-client tax.
          </h2>
          <p className="mt-5 text-[14px]" style={{ color: T.muted, fontFamily: FONT_BODY, lineHeight: 1.6 }}>
            Other practice suites charge per client, per signature, per workflow.
            We charge per practice. Grow your book without growing your bill.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-5">
          {PLANS.map((p, i) => (
            <div
              key={p.name}
              className="relative flex flex-col p-7 rounded-[4px]"
              style={{
                background: p.accent ? T.primary : T.bg,
                color: p.accent ? T.surface : T.ink,
                border: p.accent ? `1px solid ${T.primary}` : `1px solid ${T.rule}`,
                fontFamily: FONT_BODY,
              }}
            >
              {p.badge && (
                <div
                  className="absolute"
                  style={{
                    top: -12, left: 24, padding: '3px 10px',
                    background: T.copper, color: T.surface,
                    fontSize: 9.5, letterSpacing: '0.16em', textTransform: 'uppercase',
                    fontWeight: 600, borderRadius: 2,
                  }}
                >
                  {p.badge}
                </div>
              )}
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 28, fontStyle: 'italic', letterSpacing: '-0.01em', lineHeight: 1 }}>
                {p.name}
              </div>
              <div className="text-[12.5px] mt-2" style={{ color: p.accent ? 'rgba(255,253,248,0.7)' : T.muted, lineHeight: 1.5 }}>
                {p.sub}
              </div>

              <div className="mt-6 flex items-baseline gap-1.5">
                {typeof p.price === 'number' ? (
                  <>
                    <span style={{ fontFamily: FONT_DISPLAY, fontSize: 56, fontStyle: 'italic', letterSpacing: '-0.025em', lineHeight: 1 }}>
                      ${p.price}
                    </span>
                    <span className="text-[12px]" style={{ color: p.accent ? 'rgba(255,253,248,0.7)' : T.muted }}>
                      {p.cap}
                    </span>
                  </>
                ) : (
                  <span style={{ fontFamily: FONT_DISPLAY, fontSize: 36, fontStyle: 'italic', letterSpacing: '-0.02em', lineHeight: 1 }}>
                    {p.price}
                  </span>
                )}
              </div>

              <ul className="mt-7 flex flex-col gap-2.5 flex-1">
                {p.perks.map((perk, j) => (
                  <li key={j} className="flex items-start gap-2 text-[12.5px]" style={{ color: p.accent ? 'rgba(255,253,248,0.85)' : T.ink2, lineHeight: 1.5 }}>
                    <Check size={12} style={{ color: p.accent ? T.copperLt : T.ok, marginTop: 4, flexShrink: 0 }} strokeWidth={2.5}/>
                    {perk}
                  </li>
                ))}
              </ul>

              <button
                className="mt-7 px-4 py-2.5 text-[12.5px] rounded-[3px] flex items-center justify-center gap-1.5"
                style={{
                  background: p.accent ? T.copper : T.primary,
                  color: T.surface, fontWeight: 500,
                }}
              >
                {p.cta} <ArrowRight size={12}/>
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center text-[11px]" style={{ color: T.muted, fontFamily: FONT_BODY }}>
          All plans include a 30-day free trial · cancel anytime · annual billing saves 17%
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   COMPARISON TABLE
   ============================================================ */
const COMP_ROWS = [
  { f: 'AI document classification & extraction',  l: true,  td: false, can: false, ka: 'partial' },
  { f: 'Predictive deadline risk scoring',           l: true,  td: false, can: false, ka: false },
  { f: 'Client health matrix',                       l: true,  td: false, can: false, ka: false },
  { f: 'AI tax co-pilot with IRC citations',         l: true,  td: false, can: 'partial', ka: 'partial' },
  { f: 'Automation pattern proposals',               l: true,  td: false, can: false, ka: false },
  { f: 'Client portal with engagement timeline',     l: true,  td: 'partial', can: 'partial', ka: false },
  { f: 'E-signatures (ESIGN/UETA, IRS 8879)',        l: true,  td: true,  can: true,  ka: true },
  { f: 'Recurring billing & invoicing',              l: true,  td: true,  can: true,  ka: true },
  { f: 'Mobile-first client experience',             l: true,  td: 'partial', can: 'partial', ka: 'partial' },
  { f: 'Per-practice pricing (not per-client)',      l: true,  td: false, can: false, ka: 'partial' },
  { f: 'White-label firm branding',                  l: true,  td: true,  can: true,  ka: true },
];

function Comparison() {
  const Icon = ({ v }) => {
    if (v === true)      return <Check size={14}  style={{ color: T.ok }} strokeWidth={2.5}/>;
    if (v === false)     return <X size={14}      style={{ color: T.faint }} strokeWidth={2}/>;
    if (v === 'partial') return <CircleDot size={13} style={{ color: T.warn }} strokeWidth={2}/>;
    return null;
  };
  return (
    <section style={{ background: T.bg, borderTop: `1px solid ${T.rule}` }}>
      <div className="mx-auto max-w-[1100px] px-8 py-24">
        <div className="text-center max-w-[640px] mx-auto">
          <SectionTag num="06">How we compare</SectionTag>
          <h2
            className="mt-7"
            style={{
              fontFamily: FONT_DISPLAY, fontSize: 48, lineHeight: 1.05,
              letterSpacing: '-0.02em', color: T.ink, fontStyle: 'italic',
            }}
          >
            Ledger vs. the usual suspects.
          </h2>
          <p className="mt-4 text-[13px]" style={{ color: T.muted, fontFamily: FONT_BODY }}>
            An honest, opinionated comparison. Last updated April 2026 from public docs.
          </p>
        </div>

        <div
          className="mt-12 rounded-[3px] overflow-hidden"
          style={{ background: T.surface, border: `1px solid ${T.rule}`, fontFamily: FONT_BODY }}
        >
          <div
            className="grid"
            style={{ gridTemplateColumns: '2.4fr 1fr 1fr 1fr 1fr', borderBottom: `1px solid ${T.rule}`, background: T.surface2 }}
          >
            <div className="px-5 py-3 text-[10px] uppercase tracking-[0.16em]" style={{ color: T.muted }}>Capability</div>
            <div className="px-3 py-3 text-center flex items-center justify-center gap-1.5" style={{ borderLeft: `1px solid ${T.rule}` }}>
              <div
                className="flex items-center justify-center"
                style={{ width: 20, height: 20, borderRadius: 3, background: T.primary, color: T.surface, fontFamily: FONT_DISPLAY, fontSize: 14, fontStyle: 'italic', lineHeight: 1, paddingBottom: 2 }}
              >L</div>
              <span className="text-[12px]" style={{ color: T.ink, fontWeight: 600 }}>Ledger</span>
            </div>
            <div className="px-3 py-3 text-center text-[12px]" style={{ borderLeft: `1px solid ${T.rule}`, color: T.ink2 }}>TaxDome</div>
            <div className="px-3 py-3 text-center text-[12px]" style={{ borderLeft: `1px solid ${T.rule}`, color: T.ink2 }}>Canopy</div>
            <div className="px-3 py-3 text-center text-[12px]" style={{ borderLeft: `1px solid ${T.rule}`, color: T.ink2 }}>Karbon</div>
          </div>

          {COMP_ROWS.map((r, i) => (
            <div
              key={i}
              className="grid"
              style={{
                gridTemplateColumns: '2.4fr 1fr 1fr 1fr 1fr',
                borderBottom: i < COMP_ROWS.length - 1 ? `1px solid ${T.rule}` : 'none',
                background: i % 2 === 1 ? T.surface2 : T.surface,
              }}
            >
              <div className="px-5 py-3 text-[12.5px]" style={{ color: T.ink2 }}>{r.f}</div>
              <div className="px-3 py-3 flex items-center justify-center" style={{ borderLeft: `1px solid ${T.rule}`, background: 'rgba(11,61,58,0.04)' }}>
                <Icon v={r.l}/>
              </div>
              <div className="px-3 py-3 flex items-center justify-center" style={{ borderLeft: `1px solid ${T.rule}` }}>
                <Icon v={r.td}/>
              </div>
              <div className="px-3 py-3 flex items-center justify-center" style={{ borderLeft: `1px solid ${T.rule}` }}>
                <Icon v={r.can}/>
              </div>
              <div className="px-3 py-3 flex items-center justify-center" style={{ borderLeft: `1px solid ${T.rule}` }}>
                <Icon v={r.ka}/>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-center gap-5 text-[11px]" style={{ color: T.muted, fontFamily: FONT_BODY }}>
          <span className="flex items-center gap-1.5"><Check size={12} style={{ color: T.ok }} strokeWidth={2.5}/> Full</span>
          <span className="flex items-center gap-1.5"><CircleDot size={11} style={{ color: T.warn }} strokeWidth={2}/> Partial</span>
          <span className="flex items-center gap-1.5"><X size={12} style={{ color: T.faint }} strokeWidth={2}/> Not available</span>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FINAL CTA
   ============================================================ */
function FinalCta() {
  return (
    <section style={{ background: T.primaryDk, color: T.surface }}>
      <div className="mx-auto max-w-[1280px] px-8 py-28 relative overflow-hidden">
        <div
          aria-hidden
          style={{
            position: 'absolute', right: -200, top: -200, width: 700, height: 700,
            border: `1px solid rgba(255,253,248,0.06)`, borderRadius: '50%',
          }}
        />
        <div
          aria-hidden
          style={{
            position: 'absolute', right: -100, top: -100, width: 480, height: 480,
            border: `1px solid rgba(196,106,45,0.10)`, borderRadius: '50%',
          }}
        />

        <div className="relative grid grid-cols-12 gap-8 items-end">
          <div className="col-span-7">
            <SectionTag num="07" dark>Ready when you are</SectionTag>
            <h2
              className="mt-7"
              style={{
                fontFamily: FONT_DISPLAY, fontSize: 80, lineHeight: 0.96,
                letterSpacing: '-0.025em', fontStyle: 'italic',
              }}
            >
              Run the firm<br/>
              you actually want<br/>
              <span style={{ color: T.copperLt }}>to run.</span>
            </h2>
            <p className="mt-7 max-w-[520px] text-[15px]" style={{ color: 'rgba(255,253,248,0.75)', fontFamily: FONT_BODY, lineHeight: 1.6 }}>
              30 days free. We'll migrate your existing book in a weekend. If it's not better
              than what you have today, we'll help you move back.
            </p>
            <div className="mt-9 flex items-center gap-3">
              <button
                className="px-5 py-3 text-[13px] flex items-center gap-1.5 rounded-[3px]"
                style={{ background: T.copper, color: T.surface, fontWeight: 500, fontFamily: FONT_BODY }}
              >
                Start 30-day trial <ArrowRight size={13}/>
              </button>
              <button
                className="px-5 py-3 text-[13px] flex items-center gap-1.5 rounded-[3px]"
                style={{ background: 'transparent', color: T.surface, border: `1px solid rgba(255,253,248,0.3)`, fontFamily: FONT_BODY, fontWeight: 500 }}
              >
                Book a 30-min walkthrough
              </button>
            </div>
          </div>

          <div className="col-span-5">
            <div
              className="p-6 rounded-[4px]"
              style={{ background: 'rgba(255,253,248,0.05)', border: `1px solid rgba(255,253,248,0.12)` }}
            >
              <div className="text-[10.5px] uppercase tracking-[0.16em] mb-3" style={{ color: T.copperLt, fontFamily: FONT_BODY }}>
                What "free trial" actually means
              </div>
              <ul className="flex flex-col gap-3">
                {[
                  'No credit card · no auto-charge after 30 days',
                  'Migration help included — your data, your timeline',
                  'Full feature set unlocked, including AI inbox',
                  'Talk to a real human within 4 business hours',
                ].map((t, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[13px]" style={{ color: 'rgba(255,253,248,0.85)', fontFamily: FONT_BODY, lineHeight: 1.5 }}>
                    <Check size={14} style={{ color: T.copperLt, marginTop: 2, flexShrink: 0 }} strokeWidth={2.5}/>
                    {t}
                  </li>
                ))}
              </ul>
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
  const cols = [
    { h: 'Product',   links: ['Practice Dashboard', 'Client Portal', 'AI Inbox', 'Deadline Radar', 'Mobile app', 'Changelog'] },
    { h: 'Solutions', links: ['Solo EAs & CPAs', 'Multi-partner firms', 'Bookkeeping practices', 'Tax-only firms', 'Migrating from TaxDome'] },
    { h: 'Resources', links: ['Documentation', 'API & integrations', 'Blog', 'Tax calendar', 'Webinars', 'Customer stories'] },
    { h: 'Company',   links: ['About', 'Careers', 'Security', 'Privacy', 'Terms', 'Contact'] },
  ];
  return (
    <footer style={{ background: T.bgDeep, color: T.ink2, fontFamily: FONT_BODY }}>
      <div className="mx-auto max-w-[1280px] px-8 py-16">
        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-4">
            <div className="flex items-center gap-2.5">
              <div
                className="flex items-center justify-center"
                style={{ width: 30, height: 30, borderRadius: 4, background: T.primary, color: T.surface, fontFamily: FONT_DISPLAY, fontSize: 22, fontStyle: 'italic', lineHeight: 1, paddingBottom: 4 }}
              >L</div>
              <span style={{ fontFamily: FONT_DISPLAY, fontSize: 22, color: T.ink, lineHeight: 1, letterSpacing: '-0.01em' }}>
                Ledger<span style={{ color: T.copper }}>.</span>
              </span>
            </div>
            <p className="mt-4 text-[12.5px]" style={{ color: T.muted, lineHeight: 1.6, maxWidth: 320 }}>
              The practice suite for the post-AI era of US tax. Built by EAs and CPAs in
              partnership with practitioners who got tired of patching their toolchain together.
            </p>
            <div className="mt-6 flex items-center gap-4">
              {['Twitter', 'LinkedIn', 'YouTube', 'GitHub'].map(s => (
                <a key={s} href="#" className="text-[11.5px]" style={{ color: T.ink2 }}>{s}</a>
              ))}
            </div>
          </div>
          {cols.map((c, i) => (
            <div key={i} className="col-span-2">
              <div className="text-[10px] uppercase tracking-[0.18em]" style={{ color: T.muted, fontWeight: 500 }}>{c.h}</div>
              <ul className="mt-4 flex flex-col gap-2.5">
                {c.links.map(l => (
                  <li key={l}><a href="#" className="text-[12px]" style={{ color: T.ink2 }}>{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-6 flex items-end justify-between" style={{ borderTop: `1px solid ${T.rule2}` }}>
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 80, lineHeight: 0.85, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.04em' }}>
            <span style={{ color: T.copper }}>Ledger.</span>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-3 text-[10.5px]" style={{ color: T.muted }}>
              <span className="flex items-center gap-1.5"><Shield size={11}/> SOC 2 Type II</span>
              <span className="flex items-center gap-1.5"><Lock size={11}/> 256-bit encryption</span>
              <span className="flex items-center gap-1.5"><Globe size={11}/> 47 states</span>
            </div>
            <div className="text-[10.5px] mt-1" style={{ color: T.muted }}>
              © 2026 Ledger Practice Systems, Inc. · Made for accountants.
            </div>
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
  useEffect(() => {
    const id = 'ledger-mkt-fonts';
    if (document.getElementById(id)) return;
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap';
    document.head.appendChild(link);
  }, []);

  return (
    <div style={{ background: T.bg, color: T.ink, fontFamily: FONT_BODY }}>
      <Nav/>
      <Hero/>
      <TrustStrip/>
      <Problem/>
      <Features/>
      <AiBanner/>
      <Testimonial/>
      <Pricing/>
      <Comparison/>
      <FinalCta/>
      <Footer/>
    </div>
  );
}
