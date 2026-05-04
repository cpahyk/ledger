import React, { useState, useEffect, useRef } from 'react';
import {
  Home, FileText, MessageSquare, PenLine, Receipt, Calendar,
  Upload, Download, Eye, ChevronRight, ArrowRight, ArrowUpRight,
  CheckCircle2, Circle, CircleDot, Clock, AlertTriangle, Sparkles,
  Send, Paperclip, Phone, Mail, MapPin, HelpCircle, LogOut, Bell,
  Shield, Lock, FileCheck, FileSignature, CreditCard, TrendingUp,
  TrendingDown, Factory, ArrowDown, Plus, X, Inbox, Bot,
  ChevronDown, Star, Info,
} from 'lucide-react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip,
  PieChart, Pie, Cell,
} from 'recharts';

/* ============================================================
   THEME (matches practice suite — warm bone, forest, copper)
   ============================================================ */
const T = {
  bg:        '#F4EFE6',
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
   CLIENT DATA (Cody Whitman — Powder River Drilling LLC, WY)
   ============================================================ */
const CLIENT = {
  contact: 'Cody Whitman',
  initial: 'CW',
  company: 'Powder River Drilling LLC',
  ein:     '83-0421988',
  state:   'Wyoming',
  entity:  'Partnership · Form 1065',
  fyEnd:   'Dec 31',
  industry:'Oil & Gas Services',
  joined:  'Aug 2024',
};

const CPA = {
  name:    'Suresh Patel, EA',
  firm:    'HYK Tax · Surat',
  email:   'suresh@hyktax.co',
  phone:   '+1 (307) 555-0142 · WhatsApp',
  bio:     'Enrolled Agent specializing in US partnership taxation, oil & gas operators, and multi-state filings. Federal tax authorization in all 50 states.',
};

const ENGAGEMENT_STAGES = [
  { id: 1, label: 'Engagement signed',  state: 'done',     date: 'Aug 14, 2024' },
  { id: 2, label: 'Books reconciled',    state: 'done',     date: 'Mar 22, 2026' },
  { id: 3, label: 'Documents collected', state: 'current',  date: '4 of 6 received' },
  { id: 4, label: 'Return drafted',      state: 'upcoming', date: 'Est. May 12' },
  { id: 5, label: 'Your review',         state: 'upcoming', date: 'Est. May 18' },
  { id: 6, label: 'Filed with IRS',      state: 'upcoming', date: 'Sep 15 (ext.)' },
];

const ACTION_ITEMS = [
  {
    id: 1,
    icon: FileSignature,
    title: 'Sign 2026 engagement renewal',
    desc:  'Your annual engagement letter is ready. Standard scope, fees unchanged from 2025.',
    cta:   'Review & Sign',
    urgency: 'medium',
    due: 'Apr 30',
    type: 'sign',
  },
  {
    id: 2,
    icon: Upload,
    title: 'Upload Q1 bank statements',
    desc:  'Need March 2026 statements for First National Wyoming acct ****8421 to close out Q1 reconciliation.',
    cta:   'Upload Files',
    urgency: 'high',
    due: 'Apr 28',
    type: 'upload',
  },
  {
    id: 3,
    icon: Eye,
    title: 'Confirm depreciation election for new rig',
    desc:  'Two options for the $284,000 drilling rig acquired in Feb. I prepared a comparison — your call.',
    cta:   'Review Comparison',
    urgency: 'medium',
    due: 'May 5',
    type: 'review',
  },
  {
    id: 4,
    icon: CreditCard,
    title: 'Invoice #INV-2204',
    desc:  'March monthly retainer + Q1 work',
    cta:   'Pay $1,850',
    urgency: 'low',
    due: 'May 10',
    type: 'pay',
  },
];

const RECENT_DOCS = [
  { id:1, name: '2024_Form_1065_FILED.pdf',          from: 'Suresh',   tag: 'Tax Return',     date: 'Mar 14, 2025', size: '1.2 MB' },
  { id:2, name: 'K1_Whitman_2024.pdf',                from: 'Suresh',   tag: 'K-1',            date: 'Mar 14, 2025', size: '218 KB' },
  { id:3, name: 'Engagement_Letter_2026.pdf',         from: 'Suresh',   tag: 'For Signature',  date: 'Apr 22, 2026', size: '94 KB',  highlight: true },
  { id:4, name: 'Depreciation_Comparison_Rig.pdf',    from: 'Suresh',   tag: 'For Review',     date: 'Apr 24, 2026', size: '186 KB', highlight: true },
  { id:5, name: 'Bank_Stmt_Feb2026.pdf',              from: 'You',      tag: 'Bank Statement', date: 'Mar 12, 2026', size: '604 KB' },
  { id:6, name: 'Bank_Stmt_Jan2026.pdf',              from: 'You',      tag: 'Bank Statement', date: 'Feb 11, 2026', size: '598 KB' },
  { id:7, name: 'Vendor_W9_AcmeFuel.pdf',             from: 'You',      tag: 'W-9',            date: 'Jan 30, 2026', size: '78 KB'  },
  { id:8, name: 'PriorYr_Depreciation_Schedule.xlsx', from: 'Suresh',   tag: 'Workpaper',      date: 'Mar 18, 2025', size: '32 KB'  },
];

const MESSAGES = [
  {
    id: 1, from: 'cpa',
    text: "Hi Cody — engagement letter for 2026 is in the documents tab when you have a sec. Also, I prepped that depreciation comparison for the new rig. Bonus depreciation gives you a bigger 2026 deduction; §179 has tighter limits but works better if you expect higher income next year. Happy to discuss on a call.",
    time: 'Apr 24, 2:14 PM',
  },
  {
    id: 2, from: 'client',
    text: "Thanks Suresh. Will sign the engagement today. For the rig — we're projecting flatter revenue in 2027 because two contracts wind down. Lean toward bonus then?",
    time: 'Apr 24, 4:38 PM',
  },
  {
    id: 3, from: 'cpa',
    text: "Yeah — if 2027 is flatter, take the deduction now. I'll lock in 60% bonus on the rig and we keep §179 capacity for the smaller equipment buys. Sending the election memo for your records.",
    time: 'Apr 24, 5:02 PM',
  },
  {
    id: 4, from: 'client',
    text: "Perfect. Also — March bank stmt should be available end of week, will upload Friday.",
    time: 'Yesterday',
  },
];

const TAX_PICTURE = [
  { year: '2022', fed: 24800, state: 0,    note: 'Filed' },
  { year: '2023', fed: 31200, state: 0,    note: 'Filed' },
  { year: '2024', fed: 38400, state: 0,    note: 'Filed' },
  { year: '2025', fed: 42100, state: 0,    note: 'In prep · est.' },
];

const DEDUCTIONS_BREAKDOWN = [
  { name: 'Equipment & depreciation',  value: 168000, color: '#0B3D3A' },
  { name: 'Fuel & lubricants',         value: 84000,  color: '#1A5C57' },
  { name: 'Labor & contractors',       value: 142000, color: '#C46A2D' },
  { name: 'Insurance & licenses',      value: 38000,  color: '#B8893C' },
  { name: 'Other operating',           value: 56000,  color: '#7A7163' },
];

const NAV = [
  { id: 'home',     label: 'Home',          icon: Home },
  { id: 'tasks',    label: 'Action Items',  icon: CircleDot, badge: 4 },
  { id: 'docs',     label: 'Documents',     icon: FileText },
  { id: 'messages', label: 'Messages',      icon: MessageSquare, badge: 1 },
  { id: 'billing',  label: 'Billing',       icon: Receipt },
  { id: 'tax',      label: 'My Tax Picture',icon: TrendingUp },
];

/* ============================================================
   UTILS
   ============================================================ */
const fmt = (n) => '$' + Number(n).toLocaleString('en-US');
const cx  = (...a) => a.filter(Boolean).join(' ');

function Pill({ children, tone = 'neutral', mono = false }) {
  const tones = {
    neutral: { bg: '#EFE8D6', fg: T.ink2,    bd: T.rule2 },
    low:     { bg: '#E2EBE3', fg: T.ok,      bd: '#C8D8CB' },
    med:     { bg: '#F5E6C9', fg: '#8A6418', bd: '#E5D2A7' },
    high:    { bg: '#F2D9D1', fg: T.danger,  bd: '#E8C2B6' },
    primary: { bg: '#D8E5E3', fg: T.primary, bd: '#B8CECB' },
    copper:  { bg: '#F8E2D1', fg: T.copper,  bd: '#EFCDB1' },
  };
  const c = tones[tone] || tones.neutral;
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-[2px] text-[10.5px] uppercase tracking-[0.08em] border rounded-[2px]"
      style={{
        background: c.bg, color: c.fg, borderColor: c.bd,
        fontFamily: mono ? FONT_MONO : FONT_BODY, fontWeight: 500,
      }}
    >
      {children}
    </span>
  );
}

function Rule() {
  return <div style={{ height: 1, width: '100%', background: T.rule }} />;
}

/* ============================================================
   TOP BAR — co-branded
   ============================================================ */
function TopBar({ active, setActive }) {
  return (
    <header
      style={{
        background: T.surface, borderBottom: `1px solid ${T.rule}`,
        fontFamily: FONT_BODY,
      }}
    >
      <div className="px-7 py-3 flex items-center gap-6">
        {/* Brand + co-brand */}
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center"
            style={{
              width: 30, height: 30, borderRadius: 4, background: T.primary,
              color: T.surface, fontFamily: FONT_DISPLAY, fontSize: 22, fontStyle: 'italic',
              lineHeight: 1, paddingBottom: 4,
            }}
          >L</div>
          <div className="flex flex-col">
            <span style={{ fontFamily: FONT_DISPLAY, fontSize: 19, color: T.ink, lineHeight: 1, letterSpacing: '-0.01em' }}>
              Ledger<span style={{ color: T.copper }}>.</span>
            </span>
            <span className="text-[9px] uppercase tracking-[0.16em]" style={{ color: T.muted, marginTop: 1 }}>
              Client Portal
            </span>
          </div>

          <div style={{ width: 1, height: 24, background: T.rule, marginLeft: 8 }} />
          <div className="flex items-center gap-2 ml-2">
            <div
              className="flex items-center justify-center"
              style={{ width: 26, height: 26, borderRadius: 3, background: T.surface2, border: `1px solid ${T.rule}` }}
            >
              <Factory size={13} style={{ color: T.primary }}/>
            </div>
            <div className="flex flex-col">
              <span className="text-[12px]" style={{ color: T.ink, fontWeight: 500, lineHeight: 1.1 }}>{CLIENT.company}</span>
              <span className="text-[9.5px]" style={{ color: T.muted }}>EIN {CLIENT.ein} · {CLIENT.state}</span>
            </div>
          </div>
        </div>

        <div className="flex-1" />

        <button className="flex items-center gap-1.5 text-[11.5px] px-2.5 py-1.5 rounded-[3px]" style={{ color: T.ink2, border: `1px solid ${T.rule}` }}>
          <HelpCircle size={13} style={{ color: T.muted }}/> Help
        </button>
        <button className="p-2 rounded-[3px]" style={{ background: T.surface2, border: `1px solid ${T.rule}` }}>
          <Bell size={14} style={{ color: T.ink2 }}/>
        </button>
        <div className="flex items-center gap-2 pl-3" style={{ borderLeft: `1px solid ${T.rule}` }}>
          <div
            className="flex items-center justify-center text-[11px]"
            style={{ width: 30, height: 30, borderRadius: '50%', background: T.copper, color: T.surface, fontWeight: 600 }}
          >{CLIENT.initial}</div>
          <div className="flex flex-col">
            <span className="text-[12px]" style={{ color: T.ink, fontWeight: 500, lineHeight: 1.1 }}>{CLIENT.contact}</span>
            <span className="text-[9.5px]" style={{ color: T.muted }}>Owner · Member-Manager</span>
          </div>
        </div>
      </div>

      {/* Tab nav */}
      <nav className="px-7 flex items-center gap-1" style={{ borderTop: `1px solid ${T.rule}` }}>
        {NAV.map(item => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className="flex items-center gap-1.5 px-3 py-2.5 text-[12px]"
              style={{
                color: isActive ? T.ink : T.muted,
                borderBottom: `2px solid ${isActive ? T.copper : 'transparent'}`,
                fontWeight: isActive ? 500 : 400,
                marginBottom: -1,
              }}
            >
              <Icon size={13} strokeWidth={1.7}/>
              {item.label}
              {item.badge && (
                <span className="text-[9.5px] px-1.5 rounded-full ml-0.5" style={{ background: T.copper, color: T.surface, fontFamily: FONT_MONO }}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </header>
  );
}

/* ============================================================
   HOME — HERO STRIP
   ============================================================ */
function Hero() {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        background: `linear-gradient(110deg, ${T.primary} 0%, ${T.primary2} 60%, #1F6B65 100%)`,
        color: T.surface, borderRadius: 4, padding: '28px 32px',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute', right: -50, top: -60, width: 260, height: 260,
          border: `1px solid rgba(255,253,248,0.10)`, borderRadius: '50%',
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute', right: 30, bottom: -80, width: 160, height: 160,
          border: `1px solid rgba(255,253,248,0.08)`, borderRadius: '50%',
        }}
      />
      <div className="relative flex items-start justify-between gap-8">
        <div className="max-w-[640px]">
          <div className="text-[10.5px] uppercase tracking-[0.18em] mb-2" style={{ color: T.copperLt, fontFamily: FONT_BODY }}>
            Saturday · April 25, 2026
          </div>
          <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: 40, lineHeight: 1.05, fontStyle: 'italic', letterSpacing: '-0.02em' }}>
            Welcome back, Cody.
          </h1>
          <p className="text-[14px] mt-3 leading-[1.55]" style={{ color: 'rgba(255,253,248,0.8)', fontFamily: FONT_BODY }}>
            Your 2025 partnership return is on track. We've collected most of what we need —
            <span style={{ color: T.copperLt }}> 4 items need your attention </span>
            before we can move to drafting.
          </p>

          <div className="flex items-center gap-3 mt-5">
            <button
              className="px-4 py-2 text-[12.5px] rounded-[3px] flex items-center gap-1.5"
              style={{ background: T.copper, color: T.surface, fontWeight: 500 }}
            >
              View action items <ArrowRight size={13}/>
            </button>
            <button
              className="px-4 py-2 text-[12.5px] rounded-[3px]"
              style={{ background: 'transparent', color: T.surface, border: `1px solid rgba(255,253,248,0.3)` }}
            >
              Message Suresh
            </button>
          </div>
        </div>

        {/* CPA card */}
        <div
          className="flex flex-col gap-3 p-4 rounded-[3px]"
          style={{ background: 'rgba(255,253,248,0.07)', border: `1px solid rgba(255,253,248,0.15)`, width: 280 }}
        >
          <div className="text-[9.5px] uppercase tracking-[0.16em]" style={{ color: T.copperLt }}>Your accountant</div>
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center text-[15px]"
              style={{ width: 44, height: 44, borderRadius: '50%', background: T.copper, color: T.surface, fontWeight: 600 }}
            >SP</div>
            <div>
              <div className="text-[14px]" style={{ fontWeight: 500 }}>{CPA.name}</div>
              <div className="text-[10.5px]" style={{ color: 'rgba(255,253,248,0.6)' }}>{CPA.firm}</div>
            </div>
          </div>
          <div className="flex flex-col gap-1.5 text-[11px]" style={{ color: 'rgba(255,253,248,0.7)' }}>
            <span className="flex items-center gap-1.5"><Mail size={11}/>{CPA.email}</span>
            <span className="flex items-center gap-1.5"><Phone size={11}/>{CPA.phone}</span>
          </div>
          <div className="flex items-center gap-2 pt-2" style={{ borderTop: `1px solid rgba(255,253,248,0.12)` }}>
            <Shield size={11} style={{ color: T.copperLt }}/>
            <span className="text-[10px]" style={{ color: 'rgba(255,253,248,0.7)' }}>
              Federal authorization · Form 2848
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   HOME — ENGAGEMENT TIMELINE
   ============================================================ */
function EngagementTimeline() {
  return (
    <div className="p-6" style={{ background: T.surface, border: `1px solid ${T.rule}`, borderRadius: 3 }}>
      <div className="flex items-end justify-between mb-5">
        <div>
          <div className="text-[10px] uppercase tracking-[0.16em]" style={{ color: T.muted, fontFamily: FONT_BODY }}>
            Tax Year 2025 · Form 1065
          </div>
          <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 24, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.01em', lineHeight: 1.15 }}>
            Where we are
          </h2>
        </div>
        <Pill tone="primary">Stage 3 of 6 · on track</Pill>
      </div>

      <div className="flex items-stretch">
        {ENGAGEMENT_STAGES.map((s, i) => {
          const isLast = i === ENGAGEMENT_STAGES.length - 1;
          const isDone = s.state === 'done';
          const isCurrent = s.state === 'current';
          const dotColor = isDone ? T.ok : isCurrent ? T.copper : T.faint;
          const lineColor = i < 2 ? T.ok : i === 2 ? T.copper : T.rule2;
          return (
            <div key={s.id} className="flex-1 flex flex-col" style={{ minWidth: 0 }}>
              {/* dot + line */}
              <div className="flex items-center" style={{ height: 24 }}>
                <div className="relative" style={{ width: 24, height: 24 }}>
                  {isDone && <CheckCircle2 size={20} style={{ color: dotColor }} strokeWidth={2}/>}
                  {isCurrent && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="absolute" style={{ width: 22, height: 22, borderRadius: '50%', background: T.copper, opacity: 0.18, animation: 'lp 1.6s ease-in-out infinite' }}/>
                      <CircleDot size={20} style={{ color: dotColor }} strokeWidth={2}/>
                    </div>
                  )}
                  {!isDone && !isCurrent && <Circle size={18} style={{ color: dotColor }} strokeWidth={1.5}/>}
                </div>
                {!isLast && (
                  <div className="flex-1" style={{ height: 2, background: lineColor }} />
                )}
              </div>
              {/* label */}
              <div className="pr-3 pt-2.5">
                <div
                  className="text-[12px]"
                  style={{
                    color: isCurrent ? T.ink : isDone ? T.ink2 : T.muted,
                    fontWeight: isCurrent ? 600 : 400,
                  }}
                >
                  {s.label}
                </div>
                <div className="text-[10.5px] mt-0.5" style={{ color: T.muted, fontFamily: FONT_MONO }}>
                  {s.date}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`@keyframes lp { 0%,100%{transform:scale(1);opacity:.18} 50%{transform:scale(1.4);opacity:0} }`}</style>
    </div>
  );
}

/* ============================================================
   HOME — ACTION ITEMS
   ============================================================ */
function ActionItems({ onOpenSign, onOpenUpload }) {
  return (
    <div className="p-6" style={{ background: T.surface, border: `1px solid ${T.rule}`, borderRadius: 3 }}>
      <div className="flex items-end justify-between mb-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.16em]" style={{ color: T.muted, fontFamily: FONT_BODY }}>
            Needs your attention
          </div>
          <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 26, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.01em', lineHeight: 1.15 }}>
            What I need from you
          </h2>
        </div>
        <Pill tone="copper">{ACTION_ITEMS.length} items</Pill>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {ACTION_ITEMS.map(item => {
          const Icon = item.icon;
          const onClick =
            item.type === 'sign'   ? onOpenSign  :
            item.type === 'upload' ? onOpenUpload :
            undefined;
          return (
            <div
              key={item.id}
              className="p-4 rounded-[3px] flex flex-col"
              style={{ background: T.surface2, border: `1px solid ${T.rule}` }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="flex items-center justify-center shrink-0"
                  style={{
                    width: 32, height: 32, borderRadius: 3,
                    background: item.urgency === 'high' ? T.copper : T.primary,
                    color: T.surface,
                  }}
                >
                  <Icon size={14} strokeWidth={2}/>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px]" style={{ color: T.ink, fontWeight: 500, lineHeight: 1.3 }}>
                    {item.title}
                  </div>
                  <div className="text-[11.5px] mt-1 leading-[1.45]" style={{ color: T.muted }}>
                    {item.desc}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3" style={{ borderTop: `1px dashed ${T.rule2}` }}>
                <div className="flex items-center gap-2">
                  <Pill tone={item.urgency === 'high' ? 'high' : item.urgency === 'medium' ? 'med' : 'low'}>
                    {item.urgency}
                  </Pill>
                  <span className="text-[10.5px]" style={{ color: T.muted, fontFamily: FONT_MONO }}>
                    Due {item.due}
                  </span>
                </div>
                <button
                  onClick={onClick}
                  className="text-[11.5px] flex items-center gap-1 px-2.5 py-1 rounded-[3px]"
                  style={{ background: T.primary, color: T.surface, fontWeight: 500 }}
                >
                  {item.cta} <ChevronRight size={12}/>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ============================================================
   HOME — TAX PICTURE WIDGET (upgraded feature)
   ============================================================ */
function TaxPictureWidget() {
  const totalDeductions = DEDUCTIONS_BREAKDOWN.reduce((s, x) => s + x.value, 0);
  return (
    <div className="p-6" style={{ background: T.surface, border: `1px solid ${T.rule}`, borderRadius: 3 }}>
      <div className="flex items-start justify-between mb-1">
        <div>
          <div className="text-[10px] uppercase tracking-[0.16em] flex items-center gap-1.5" style={{ color: T.muted, fontFamily: FONT_BODY }}>
            <Sparkles size={10} style={{ color: T.copper }}/> AI-generated insight
          </div>
          <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 24, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.01em', lineHeight: 1.15 }}>
            Your 2025 tax picture
          </h2>
        </div>
        <Pill tone="primary">Estimated</Pill>
      </div>

      <div className="grid grid-cols-12 gap-5 mt-4">
        <div className="col-span-7">
          <div className="text-[10px] uppercase tracking-[0.14em] mb-2" style={{ color: T.muted }}>4-year federal liability</div>
          <div style={{ height: 160 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={TAX_PICTURE} margin={{ left: -16, right: 4, top: 4, bottom: 0 }}>
                <XAxis dataKey="year" tick={{ fill: T.muted, fontSize: 10, fontFamily: FONT_BODY }} axisLine={false} tickLine={false}/>
                <YAxis tick={{ fill: T.muted, fontSize: 9, fontFamily: FONT_MONO }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v/1000}k`}/>
                <Tooltip
                  cursor={{ fill: T.surface2 }}
                  contentStyle={{ background: T.surface, border: `1px solid ${T.rule}`, fontSize: 11, fontFamily: FONT_BODY, borderRadius: 3 }}
                  formatter={(v) => [fmt(v), 'Federal']}
                />
                <Bar dataKey="fed" radius={[3,3,0,0]}>
                  {TAX_PICTURE.map((d, i) => (
                    <Cell key={i} fill={i === TAX_PICTURE.length - 1 ? T.copper : T.primary}/>
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-[10.5px] mt-1 italic" style={{ color: T.muted }}>
            Wyoming has no state income tax — your only federal exposure.
          </div>
        </div>

        <div className="col-span-5">
          <div className="text-[10px] uppercase tracking-[0.14em] mb-2" style={{ color: T.muted }}>2025 deduction mix</div>
          <div className="flex items-center gap-3">
            <div style={{ width: 120, height: 120 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={DEDUCTIONS_BREAKDOWN} dataKey="value" innerRadius={32} outerRadius={56} paddingAngle={2} stroke="none">
                    {DEDUCTIONS_BREAKDOWN.map((d, i) => <Cell key={i} fill={d.color}/>)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col gap-1.5 text-[10.5px]">
              {DEDUCTIONS_BREAKDOWN.map(d => (
                <div key={d.name} className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ background: d.color }}/>
                  <span style={{ color: T.ink2 }}>{d.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-2 text-[11px]" style={{ color: T.muted }}>
            Total deductions <span style={{ color: T.ink, fontFamily: FONT_MONO }}>{fmt(totalDeductions)}</span>
          </div>
        </div>
      </div>

      <div
        className="mt-5 p-3 rounded-[3px] flex items-start gap-2.5"
        style={{ background: T.surface2, border: `1px dashed ${T.rule2}` }}
      >
        <Sparkles size={14} style={{ color: T.copper, flexShrink: 0, marginTop: 2 }}/>
        <div className="text-[11.5px]" style={{ color: T.ink2, lineHeight: 1.5 }}>
          <span style={{ color: T.ink, fontWeight: 500 }}>Suresh's note:</span> Your federal liability is up ~10% YoY but
          mostly tracks with revenue growth. Bonus depreciation on the new rig will pull this number down by ~$28k once we
          finalize the election.
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   HOME — RECENT ACTIVITY
   ============================================================ */
function RecentActivity() {
  const activity = [
    { id:1, who: 'Suresh', what: 'shared',  obj: 'Engagement Letter 2026',         time: '2 days ago', icon: FileSignature, color: T.copper },
    { id:2, who: 'Suresh', what: 'shared',  obj: 'Depreciation Comparison · Rig',  time: '1 day ago',  icon: FileText,      color: T.primary },
    { id:3, who: 'Suresh', what: 'noted',   obj: 'Q1 reconciliation 90% complete', time: '4 days ago', icon: CheckCircle2,  color: T.ok },
    { id:4, who: 'You',    what: 'uploaded',obj: 'Bank Stmt Feb 2026',             time: '6 weeks ago',icon: Upload,        color: T.ink2 },
  ];
  return (
    <div className="p-6" style={{ background: T.surface, border: `1px solid ${T.rule}`, borderRadius: 3 }}>
      <div className="text-[10px] uppercase tracking-[0.16em] mb-1" style={{ color: T.muted, fontFamily: FONT_BODY }}>Recent</div>
      <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 22, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.01em', lineHeight: 1.15, marginBottom: 14 }}>
        Activity stream
      </h2>
      <ul className="flex flex-col gap-3">
        {activity.map(a => {
          const Icon = a.icon;
          return (
            <li key={a.id} className="flex items-start gap-3 text-[12.5px]" style={{ color: T.ink2 }}>
              <div
                className="flex items-center justify-center mt-0.5"
                style={{ width: 24, height: 24, background: T.surface2, border: `1px solid ${T.rule}`, borderRadius: 2 }}
              >
                <Icon size={12} style={{ color: a.color }} strokeWidth={1.8}/>
              </div>
              <div className="flex-1">
                <div>
                  <span style={{ color: T.ink, fontWeight: 500 }}>{a.who}</span>
                  <span style={{ color: T.muted }}> {a.what} </span>
                  <span style={{ color: T.ink }}>{a.obj}</span>
                </div>
                <div className="text-[10.5px] mt-0.5" style={{ color: T.muted }}>{a.time}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ============================================================
   HOME VIEW
   ============================================================ */
function HomeView({ onOpenSign, onOpenUpload }) {
  return (
    <div className="px-7 py-6 flex flex-col gap-5">
      <Hero/>
      <EngagementTimeline/>
      <ActionItems onOpenSign={onOpenSign} onOpenUpload={onOpenUpload}/>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-8"><TaxPictureWidget/></div>
        <div className="col-span-4"><RecentActivity/></div>
      </div>
      <div className="text-[10px] uppercase tracking-[0.18em] py-3 text-center" style={{ color: T.faint }}>
        — End · You're caught up —
      </div>
    </div>
  );
}

/* ============================================================
   DOCUMENTS VIEW
   ============================================================ */
function DocumentsView({ onOpenUpload }) {
  const [filter, setFilter] = useState('all');
  const filters = [
    ['all', 'All', RECENT_DOCS.length],
    ['cpa', 'From Suresh', RECENT_DOCS.filter(d => d.from === 'Suresh').length],
    ['mine','My uploads', RECENT_DOCS.filter(d => d.from === 'You').length],
    ['action','Need action', RECENT_DOCS.filter(d => d.highlight).length],
  ];
  const visible = filter === 'all'
    ? RECENT_DOCS
    : filter === 'cpa' ? RECENT_DOCS.filter(d => d.from === 'Suresh')
    : filter === 'mine'? RECENT_DOCS.filter(d => d.from === 'You')
    : RECENT_DOCS.filter(d => d.highlight);

  return (
    <div className="px-7 py-6 flex flex-col gap-5">
      <div className="flex items-end justify-between">
        <div>
          <div className="text-[10.5px] uppercase tracking-[0.18em]" style={{ color: T.muted }}>Encrypted vault · 256-bit</div>
          <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: 38, lineHeight: 1.05, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.02em' }}>
            Documents
          </h1>
        </div>
        <button
          onClick={onOpenUpload}
          className="px-3.5 py-2 text-[12.5px] flex items-center gap-1.5 rounded-[3px]"
          style={{ background: T.primary, color: T.surface, fontWeight: 500 }}
        >
          <Upload size={13}/> Upload Files
        </button>
      </div>

      {/* Drag-drop hint */}
      <div
        className="px-5 py-4 rounded-[3px] flex items-center gap-4"
        style={{ background: T.surface2, border: `1px dashed ${T.rule2}` }}
      >
        <div
          className="flex items-center justify-center"
          style={{ width: 40, height: 40, borderRadius: '50%', background: T.surface, border: `1px solid ${T.rule}` }}
        >
          <Upload size={16} style={{ color: T.copper }}/>
        </div>
        <div className="flex-1">
          <div className="text-[13px]" style={{ color: T.ink, fontWeight: 500 }}>
            Drag files anywhere on this page to upload
          </div>
          <div className="text-[11px]" style={{ color: T.muted }}>
            PDFs, photos, spreadsheets, statements — Suresh will sort and categorize automatically.
          </div>
        </div>
        <Pill tone="primary"><Lock size={9}/> Encrypted in transit & at rest</Pill>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-2">
        {filters.map(([k, v, n]) => (
          <button
            key={k}
            onClick={() => setFilter(k)}
            className="text-[11.5px] px-3 py-1.5 rounded-[3px] flex items-center gap-1.5"
            style={{
              background: filter === k ? T.primary : T.surface,
              color:      filter === k ? T.surface : T.ink2,
              border: `1px solid ${T.rule}`,
              fontWeight: filter === k ? 500 : 400,
            }}
          >
            {v}
            <span className="text-[10px]" style={{ opacity: 0.7, fontFamily: FONT_MONO }}>{n}</span>
          </button>
        ))}
      </div>

      {/* List */}
      <div style={{ background: T.surface, border: `1px solid ${T.rule}`, borderRadius: 3 }}>
        <div
          className="grid grid-cols-12 px-4 py-2 text-[9.5px] uppercase tracking-[0.14em]"
          style={{ color: T.muted, borderBottom: `1px solid ${T.rule}` }}
        >
          <div className="col-span-6">Document</div>
          <div className="col-span-2">From</div>
          <div className="col-span-2">Date</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>
        {visible.map(d => (
          <div
            key={d.id}
            className="grid grid-cols-12 px-4 py-3 items-center"
            style={{
              borderBottom: `1px solid ${T.rule}`,
              background: d.highlight ? '#FBF6E8' : T.surface,
              borderLeft: `2px solid ${d.highlight ? T.copper : 'transparent'}`,
            }}
          >
            <div className="col-span-6 flex items-center gap-3 min-w-0">
              <div
                className="flex items-center justify-center"
                style={{ width: 32, height: 38, background: T.surface2, border: `1px solid ${T.rule}`, borderRadius: 2 }}
              >
                <FileText size={14} style={{ color: T.primary }}/>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[12px] truncate" style={{ color: T.ink, fontFamily: FONT_MONO }}>{d.name}</span>
                  {d.highlight && <Pill tone="copper">action</Pill>}
                </div>
                <div className="text-[10.5px] mt-0.5" style={{ color: T.muted }}>{d.tag} · {d.size}</div>
              </div>
            </div>
            <div className="col-span-2">
              <div className="flex items-center gap-1.5">
                <div
                  className="flex items-center justify-center text-[9px]"
                  style={{
                    width: 20, height: 20, borderRadius: '50%',
                    background: d.from === 'Suresh' ? T.copper : T.primary, color: T.surface, fontWeight: 600,
                  }}
                >
                  {d.from === 'Suresh' ? 'SP' : 'CW'}
                </div>
                <span className="text-[11.5px]" style={{ color: T.ink2 }}>{d.from}</span>
              </div>
            </div>
            <div className="col-span-2 text-[11px]" style={{ color: T.muted, fontFamily: FONT_MONO }}>
              {d.date}
            </div>
            <div className="col-span-2 flex items-center justify-end gap-1">
              <button className="p-1.5 rounded-[2px]" style={{ border: `1px solid ${T.rule}` }}><Eye size={12} style={{ color: T.muted }}/></button>
              <button className="p-1.5 rounded-[2px]" style={{ border: `1px solid ${T.rule}` }}><Download size={12} style={{ color: T.muted }}/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   MESSAGES VIEW
   ============================================================ */
function MessagesView() {
  const [draft, setDraft] = useState('');
  const [thread, setThread] = useState(MESSAGES);
  const endRef = useRef(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [thread]);

  const send = () => {
    if (!draft.trim()) return;
    setThread(t => [...t, { id: Date.now(), from: 'client', text: draft, time: 'just now' }]);
    setDraft('');
  };

  return (
    <div className="px-7 py-6 flex flex-col gap-5">
      <div>
        <div className="text-[10.5px] uppercase tracking-[0.18em]" style={{ color: T.muted }}>Direct line</div>
        <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: 38, lineHeight: 1.05, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.02em' }}>
          Messages
        </h1>
      </div>

      <div style={{ background: T.surface, border: `1px solid ${T.rule}`, borderRadius: 3 }}>
        {/* Thread header */}
        <div className="px-5 py-3 flex items-center gap-3" style={{ borderBottom: `1px solid ${T.rule}`, background: T.surface2 }}>
          <div
            className="flex items-center justify-center text-[13px]"
            style={{ width: 36, height: 36, borderRadius: '50%', background: T.copper, color: T.surface, fontWeight: 600 }}
          >SP</div>
          <div className="flex-1">
            <div className="text-[13px]" style={{ color: T.ink, fontWeight: 500 }}>{CPA.name}</div>
            <div className="text-[10.5px] flex items-center gap-1.5" style={{ color: T.muted }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: T.ok }}/>
              Online · usually replies within 2 hours
            </div>
          </div>
          <button className="text-[11px] flex items-center gap-1 px-2.5 py-1 rounded-[3px]" style={{ border: `1px solid ${T.rule}`, color: T.ink2 }}>
            <Phone size={11}/> Schedule a call
          </button>
        </div>

        {/* Messages */}
        <div className="px-5 py-5 flex flex-col gap-3" style={{ minHeight: 360, maxHeight: 480, overflowY: 'auto' }}>
          {thread.map(m => {
            const isClient = m.from === 'client';
            return (
              <div key={m.id} className={cx('flex items-end gap-2', isClient ? 'justify-end' : 'justify-start')}>
                {!isClient && (
                  <div
                    className="flex items-center justify-center text-[10px]"
                    style={{ width: 24, height: 24, borderRadius: '50%', background: T.copper, color: T.surface, fontWeight: 600 }}
                  >SP</div>
                )}
                <div
                  className="max-w-[70%] px-3.5 py-2.5 text-[12.5px] leading-[1.5] rounded-[8px]"
                  style={{
                    background: isClient ? T.primary : T.surface2,
                    color: isClient ? T.surface : T.ink,
                    border: isClient ? 'none' : `1px solid ${T.rule}`,
                    fontFamily: FONT_BODY,
                  }}
                >
                  {m.text}
                  <div
                    className="text-[10px] mt-1.5"
                    style={{
                      color: isClient ? 'rgba(255,253,248,0.6)' : T.muted,
                      fontFamily: FONT_MONO,
                    }}
                  >
                    {m.time}
                  </div>
                </div>
                {isClient && (
                  <div
                    className="flex items-center justify-center text-[10px]"
                    style={{ width: 24, height: 24, borderRadius: '50%', background: T.primary, color: T.surface, fontWeight: 600 }}
                  >CW</div>
                )}
              </div>
            );
          })}
          <div ref={endRef}/>
        </div>

        {/* Compose */}
        <div className="px-3 py-3 flex items-center gap-2" style={{ borderTop: `1px solid ${T.rule}`, background: T.surface2 }}>
          <button className="p-2 rounded-[3px]" style={{ background: T.surface, border: `1px solid ${T.rule}` }}>
            <Paperclip size={13} style={{ color: T.muted }}/>
          </button>
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
            placeholder="Type a message to Suresh…"
            className="flex-1 px-3 py-2 text-[12.5px] outline-none rounded-[3px]"
            style={{ background: T.surface, border: `1px solid ${T.rule}`, color: T.ink }}
          />
          <button onClick={send} className="px-3 py-2 rounded-[3px] flex items-center gap-1.5 text-[12px]" style={{ background: T.primary, color: T.surface, fontWeight: 500 }}>
            Send <Send size={12}/>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   BILLING VIEW
   ============================================================ */
function BillingView() {
  const invoices = [
    { id: 'INV-2204', date: 'Apr 1, 2026',  desc: 'March retainer + Q1 work',  amount: 1850, status: 'open' },
    { id: 'INV-2189', date: 'Mar 1, 2026',  desc: 'February retainer',          amount: 1850, status: 'paid' },
    { id: 'INV-2168', date: 'Feb 1, 2026',  desc: 'January retainer + extras',  amount: 2150, status: 'paid' },
    { id: 'INV-2147', date: 'Jan 1, 2026',  desc: 'December retainer',          amount: 1850, status: 'paid' },
    { id: 'INV-2129', date: 'Dec 1, 2025',  desc: 'November retainer',          amount: 1850, status: 'paid' },
  ];
  const ytdPaid = invoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.amount, 0);
  return (
    <div className="px-7 py-6 flex flex-col gap-5">
      <div>
        <div className="text-[10.5px] uppercase tracking-[0.18em]" style={{ color: T.muted }}>Statements & payments</div>
        <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: 38, lineHeight: 1.05, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.02em' }}>
          Billing
        </h1>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <BillStat label="Outstanding" value={fmt(1850)} sub="1 invoice" tone="copper"/>
        <BillStat label="Paid YTD"    value={fmt(ytdPaid)} sub={`${invoices.filter(i=>i.status==='paid').length} invoices`}/>
        <BillStat label="On retainer" value={fmt(1850)} sub="monthly"/>
      </div>

      {/* Open invoice prominent */}
      <div
        className="p-6 rounded-[3px] relative overflow-hidden"
        style={{ background: T.surface, border: `1px solid ${T.copper}` }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute', right: -40, top: -40, width: 160, height: 160,
            border: `1px solid ${T.copper}`, opacity: 0.15, borderRadius: '50%',
          }}
        />
        <div className="flex items-start justify-between gap-6 relative">
          <div>
            <Pill tone="copper">Open · due May 10</Pill>
            <h2 className="mt-2" style={{ fontFamily: FONT_DISPLAY, fontSize: 26, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.01em' }}>
              Invoice #INV-2204
            </h2>
            <div className="text-[12px] mt-1" style={{ color: T.muted }}>
              March retainer + Q1 reconciliation work · 14 hours total
            </div>
            <div className="flex items-center gap-4 mt-4">
              <div>
                <div className="text-[9.5px] uppercase tracking-[0.14em]" style={{ color: T.muted }}>Amount</div>
                <div style={{ fontFamily: FONT_DISPLAY, fontSize: 32, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.02em', lineHeight: 1 }}>
                  $1,850.00
                </div>
              </div>
              <div style={{ width: 1, height: 32, background: T.rule }}/>
              <div>
                <div className="text-[9.5px] uppercase tracking-[0.14em]" style={{ color: T.muted }}>Issued</div>
                <div className="text-[13px] mt-0.5" style={{ color: T.ink, fontFamily: FONT_MONO }}>Apr 1, 2026</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <button className="px-4 py-2.5 text-[13px] rounded-[3px] flex items-center gap-2" style={{ background: T.primary, color: T.surface, fontWeight: 500 }}>
              <CreditCard size={14}/> Pay with card
            </button>
            <button className="px-4 py-2.5 text-[13px] rounded-[3px] flex items-center gap-2" style={{ background: T.surface2, color: T.ink2, border: `1px solid ${T.rule}` }}>
              ACH bank transfer
            </button>
            <button className="text-[11px] flex items-center gap-1 self-center mt-1" style={{ color: T.muted }}>
              <Download size={11}/> Download PDF
            </button>
          </div>
        </div>
      </div>

      <div style={{ background: T.surface, border: `1px solid ${T.rule}`, borderRadius: 3 }}>
        <div className="px-4 py-2.5 text-[10px] uppercase tracking-[0.14em]" style={{ color: T.muted, borderBottom: `1px solid ${T.rule}` }}>
          History
        </div>
        {invoices.slice(1).map(inv => (
          <div key={inv.id} className="grid grid-cols-12 px-4 py-3 items-center" style={{ borderBottom: `1px solid ${T.rule}` }}>
            <div className="col-span-3 text-[12px]" style={{ color: T.ink, fontFamily: FONT_MONO }}>{inv.id}</div>
            <div className="col-span-3 text-[11.5px]" style={{ color: T.muted, fontFamily: FONT_MONO }}>{inv.date}</div>
            <div className="col-span-4 text-[12px]" style={{ color: T.ink2 }}>{inv.desc}</div>
            <div className="col-span-1 text-right text-[12px]" style={{ color: T.ink, fontFamily: FONT_MONO }}>{fmt(inv.amount)}</div>
            <div className="col-span-1 text-right">
              <Pill tone="low">paid</Pill>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BillStat({ label, value, sub, tone }) {
  return (
    <div className="p-4" style={{ background: T.surface, border: `1px solid ${tone === 'copper' ? T.copper : T.rule}`, borderRadius: 3 }}>
      <div className="text-[10px] uppercase tracking-[0.14em]" style={{ color: T.muted }}>{label}</div>
      <div className="mt-2" style={{ fontFamily: FONT_DISPLAY, fontSize: 28, color: tone === 'copper' ? T.copper : T.ink, fontStyle: 'italic', letterSpacing: '-0.02em', lineHeight: 1 }}>
        {value}
      </div>
      <div className="text-[11px] mt-1" style={{ color: T.muted }}>{sub}</div>
    </div>
  );
}

/* ============================================================
   TASKS / ACTION ITEMS VIEW (full)
   ============================================================ */
function TasksView({ onOpenSign, onOpenUpload }) {
  return (
    <div className="px-7 py-6 flex flex-col gap-5">
      <div>
        <div className="text-[10.5px] uppercase tracking-[0.18em]" style={{ color: T.muted }}>Your queue</div>
        <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: 38, lineHeight: 1.05, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.02em' }}>
          Action Items
        </h1>
      </div>
      <ActionItems onOpenSign={onOpenSign} onOpenUpload={onOpenUpload}/>
      <div className="text-[11.5px] p-4 rounded-[3px]" style={{ background: T.surface, border: `1px dashed ${T.rule2}`, color: T.muted, textAlign: 'center', fontStyle: 'italic' }}>
        Completed items archive after 30 days · Need to re-do something? Message Suresh.
      </div>
    </div>
  );
}

/* ============================================================
   TAX PICTURE FULL VIEW
   ============================================================ */
function TaxView() {
  return (
    <div className="px-7 py-6 flex flex-col gap-5">
      <div>
        <div className="text-[10.5px] uppercase tracking-[0.18em]" style={{ color: T.muted }}>Personalized analysis</div>
        <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: 38, lineHeight: 1.05, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.02em' }}>
          My Tax Picture
        </h1>
      </div>
      <TaxPictureWidget/>

      <div className="grid grid-cols-2 gap-5">
        <div className="p-6" style={{ background: T.surface, border: `1px solid ${T.rule}`, borderRadius: 3 }}>
          <div className="text-[10px] uppercase tracking-[0.16em]" style={{ color: T.muted, fontFamily: FONT_BODY }}>Strategies in play</div>
          <h3 className="mb-4" style={{ fontFamily: FONT_DISPLAY, fontSize: 22, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.01em' }}>
            Active tax positions
          </h3>
          <div className="flex flex-col gap-3">
            {[
              { t: 'Bonus depreciation election · drilling rig',     v: '−$28,400 fed liability', tone: T.ok },
              { t: 'IDC deduction · 2 wells brought online Q1',      v: '−$18,200 fed liability', tone: T.ok },
              { t: 'QBI 20% deduction · §199A',                       v: '−$11,600 fed liability', tone: T.ok },
              { t: 'Wyoming domicile · no state income tax',          v: 'Saved vs. CO/MT peers', tone: T.primary },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-3 py-2" style={{ borderBottom: i < 3 ? `1px solid ${T.rule}` : 'none' }}>
                <CheckCircle2 size={14} style={{ color: s.tone, flexShrink: 0 }}/>
                <span className="flex-1 text-[12.5px]" style={{ color: T.ink2 }}>{s.t}</span>
                <span className="text-[11px]" style={{ color: s.tone, fontFamily: FONT_MONO, fontWeight: 500 }}>{s.v}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6" style={{ background: T.surface, border: `1px solid ${T.rule}`, borderRadius: 3 }}>
          <div className="text-[10px] uppercase tracking-[0.16em] flex items-center gap-1.5" style={{ color: T.muted, fontFamily: FONT_BODY }}>
            <Sparkles size={10} style={{ color: T.copper }}/> AI-suggested
          </div>
          <h3 className="mb-4" style={{ fontFamily: FONT_DISPLAY, fontSize: 22, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.01em' }}>
            Opportunities worth a conversation
          </h3>
          <div className="flex flex-col gap-3">
            {[
              { t: 'R&D credit for new directional drilling tech',  v: 'Est. ~$8k credit',  desc: 'Documentation needs review' },
              { t: 'Cost segregation on field office building',     v: 'Est. ~$14k accel.', desc: 'Property purchased 2024' },
              { t: 'Defined benefit plan for member-managers',      v: 'Up to $84k deferral/yr', desc: 'Higher savings vs SEP-IRA' },
            ].map((s, i) => (
              <div key={i} className="p-3 rounded-[3px]" style={{ background: T.surface2, border: `1px dashed ${T.rule2}` }}>
                <div className="flex items-start justify-between gap-3">
                  <div className="text-[12.5px]" style={{ color: T.ink, fontWeight: 500 }}>{s.t}</div>
                  <span className="text-[11px] whitespace-nowrap" style={{ color: T.copper, fontFamily: FONT_MONO, fontWeight: 500 }}>{s.v}</span>
                </div>
                <div className="text-[11px] mt-1" style={{ color: T.muted }}>{s.desc}</div>
              </div>
            ))}
            <button className="text-[11.5px] py-1.5 rounded-[3px] mt-1" style={{ background: T.primary, color: T.surface, fontWeight: 500 }}>
              Schedule planning call
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   E-SIGN MODAL
   ============================================================ */
function SignModal({ onClose }) {
  const [signed, setSigned] = useState(false);
  const [name, setName] = useState('');
  const [agree, setAgree] = useState(false);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ background: 'rgba(20,15,10,0.55)', zIndex: 60 }}
    >
      <div
        className="flex flex-col"
        style={{
          width: 720, maxHeight: '90vh', background: T.surface, borderRadius: 4,
          boxShadow: '0 30px 60px -20px rgba(20,15,8,0.45)', fontFamily: FONT_BODY,
        }}
      >
        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: `1px solid ${T.rule}` }}>
          <div className="flex items-center gap-2.5">
            <FileSignature size={16} style={{ color: T.copper }}/>
            <span className="text-[14px]" style={{ color: T.ink, fontWeight: 500 }}>2026 Engagement Letter</span>
            <Pill tone="copper">For your signature</Pill>
          </div>
          <button onClick={onClose} className="p-1 rounded-[3px]"><X size={16} style={{ color: T.muted }}/></button>
        </div>

        {/* Doc body */}
        <div
          className="flex-1 overflow-y-auto px-8 py-6"
          style={{ background: T.surface2 }}
        >
          <div
            className="mx-auto p-8"
            style={{
              maxWidth: 560, background: T.surface, border: `1px solid ${T.rule}`,
              fontFamily: FONT_DISPLAY, color: T.ink,
            }}
          >
            <div className="text-center" style={{ fontSize: 18, fontStyle: 'italic', letterSpacing: '-0.01em' }}>HYK Tax</div>
            <div className="text-center text-[10px] uppercase tracking-[0.18em]" style={{ color: T.muted, fontFamily: FONT_BODY, marginTop: 4 }}>
              Suresh Patel, EA · Federal Authorization
            </div>
            <Rule/>
            <h3 style={{ fontSize: 22, marginTop: 18, fontStyle: 'italic' }}>
              Engagement Letter — Tax Year 2026
            </h3>
            <div className="text-[11.5px] mt-4 leading-[1.65]" style={{ color: T.ink2, fontFamily: FONT_BODY }}>
              <p>This letter confirms our engagement to provide tax preparation, advisory, and representation services to <span style={{ color: T.ink, fontWeight: 500 }}>Powder River Drilling LLC</span> (EIN 83-0421988) for tax year ending December 31, 2026.</p>
              <p className="mt-3"><span style={{ color: T.ink, fontWeight: 500 }}>Scope.</span> Federal Form 1065 partnership return; partner Schedules K-1; quarterly estimated tax planning; payroll tax filings; bookkeeping oversight; and IRS correspondence as needed.</p>
              <p className="mt-3"><span style={{ color: T.ink, fontWeight: 500 }}>Fees.</span> Monthly retainer of $1,850, billed first of month. Out-of-scope projects (audits, R&D credit studies, cost segregations) billed separately at agreed rates.</p>
              <p className="mt-3"><span style={{ color: T.ink, fontWeight: 500 }}>Term.</span> Effective January 1, 2026 through December 31, 2026, with 30-day termination notice from either party.</p>
              <p className="mt-3"><span style={{ color: T.ink, fontWeight: 500 }}>Confidentiality.</span> All client information held under IRC §7216 and applicable Circular 230 standards.</p>
            </div>
          </div>
        </div>

        {/* Sign */}
        {!signed ? (
          <div className="p-6" style={{ borderTop: `1px solid ${T.rule}` }}>
            <div className="flex items-start gap-2 mb-4">
              <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-1" />
              <span className="text-[12px]" style={{ color: T.ink2 }}>
                I have read this engagement letter and agree to its terms. I understand my electronic signature has the same legal effect as a wet-ink signature.
              </span>
            </div>
            <div className="flex items-end gap-3">
              <div className="flex-1">
                <div className="text-[9.5px] uppercase tracking-[0.14em] mb-1" style={{ color: T.muted }}>Type your full legal name</div>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Cody R. Whitman"
                  className="w-full px-3 py-2 outline-none rounded-[3px]"
                  style={{
                    background: T.surface2, border: `1px solid ${T.rule}`,
                    fontFamily: FONT_DISPLAY, fontSize: 22, fontStyle: 'italic', color: T.ink,
                  }}
                />
              </div>
              <button
                onClick={() => agree && name.trim() && setSigned(true)}
                className="px-5 py-2.5 text-[12.5px] rounded-[3px] flex items-center gap-1.5"
                style={{
                  background: agree && name.trim() ? T.primary : T.faint,
                  color: T.surface, fontWeight: 500, opacity: agree && name.trim() ? 1 : 0.7,
                  cursor: agree && name.trim() ? 'pointer' : 'not-allowed',
                }}
              >
                <FileSignature size={13}/> Sign Document
              </button>
            </div>
            <div className="flex items-center gap-2 mt-3 text-[10.5px]" style={{ color: T.muted }}>
              <Lock size={11}/> ESIGN Act compliant · audit trail captured · IP, timestamp, and device logged
            </div>
          </div>
        ) : (
          <div className="p-8 flex flex-col items-center gap-3" style={{ borderTop: `1px solid ${T.rule}` }}>
            <div className="flex items-center justify-center" style={{ width: 48, height: 48, borderRadius: '50%', background: '#E2EBE3' }}>
              <CheckCircle2 size={22} style={{ color: T.ok }}/>
            </div>
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 22, color: T.ink, fontStyle: 'italic' }}>Signed and sealed.</div>
            <div className="text-[12px] text-center" style={{ color: T.muted }}>
              A countersigned copy will appear in your Documents tab within a few minutes. Suresh has been notified.
            </div>
            <button onClick={onClose} className="px-4 py-2 text-[12.5px] rounded-[3px] mt-2" style={{ background: T.primary, color: T.surface, fontWeight: 500 }}>
              Back to Portal
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   UPLOAD MODAL
   ============================================================ */
function UploadModal({ onClose }) {
  const [files, setFiles] = useState([]);
  const fileInput = useRef(null);

  const onDrop = (e) => {
    e.preventDefault();
    const list = [...e.dataTransfer.files].map(f => ({
      name: f.name, size: f.size, status: 'classifying',
    }));
    addFiles(list);
  };

  const onPick = (e) => {
    const list = [...e.target.files].map(f => ({
      name: f.name, size: f.size, status: 'classifying',
    }));
    addFiles(list);
  };

  const addFiles = (list) => {
    setFiles(prev => [...prev, ...list]);
    list.forEach((f, i) => {
      setTimeout(() => {
        setFiles(prev => prev.map(x => x.name === f.name ? { ...x, status: 'classified', tag: classify(f.name) } : x));
      }, 800 + i * 250);
    });
  };

  const classify = (n) => {
    const s = n.toLowerCase();
    if (s.includes('bank') || s.includes('stmt') || s.includes('statement')) return 'Bank Statement';
    if (s.includes('w9') || s.includes('w-9')) return 'W-9';
    if (s.includes('w2') || s.includes('w-2')) return 'W-2';
    if (s.includes('1099')) return '1099';
    if (s.includes('invoice')) return 'Invoice';
    if (s.includes('receipt')) return 'Receipt';
    return 'Document';
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ background: 'rgba(20,15,10,0.55)', zIndex: 60 }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 600, background: T.surface, borderRadius: 4,
          boxShadow: '0 30px 60px -20px rgba(20,15,8,0.45)', fontFamily: FONT_BODY,
        }}
      >
        <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: `1px solid ${T.rule}` }}>
          <div className="flex items-center gap-2.5">
            <Upload size={16} style={{ color: T.copper }}/>
            <span className="text-[14px]" style={{ color: T.ink, fontWeight: 500 }}>Upload to Suresh</span>
          </div>
          <button onClick={onClose} className="p-1"><X size={16} style={{ color: T.muted }}/></button>
        </div>

        <div className="p-6">
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDrop}
            onClick={() => fileInput.current?.click()}
            className="px-6 py-10 flex flex-col items-center gap-3 rounded-[3px] cursor-pointer"
            style={{ background: T.surface2, border: `2px dashed ${T.rule2}` }}
          >
            <input ref={fileInput} type="file" multiple className="hidden" onChange={onPick}/>
            <div className="flex items-center justify-center" style={{ width: 48, height: 48, borderRadius: '50%', background: T.surface, border: `1px solid ${T.rule}` }}>
              <Upload size={20} style={{ color: T.copper }}/>
            </div>
            <div className="text-[14px]" style={{ color: T.ink, fontWeight: 500 }}>Drop files here or click to browse</div>
            <div className="text-[11px]" style={{ color: T.muted }}>PDF, JPG, PNG, XLSX · up to 50 MB each</div>
          </div>

          {files.length > 0 && (
            <div className="mt-5 flex flex-col gap-2">
              {files.map((f, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-[3px]" style={{ background: T.surface2, border: `1px solid ${T.rule}` }}>
                  <FileText size={14} style={{ color: T.primary }}/>
                  <div className="flex-1 min-w-0">
                    <div className="text-[12px] truncate" style={{ color: T.ink, fontFamily: FONT_MONO }}>{f.name}</div>
                    <div className="text-[10.5px]" style={{ color: T.muted }}>{(f.size / 1024).toFixed(0)} KB</div>
                  </div>
                  {f.status === 'classifying' && (
                    <div className="flex items-center gap-1.5 text-[10.5px]" style={{ color: T.muted }}>
                      <Sparkles size={11} style={{ color: T.copper }}/>
                      <span style={{ fontStyle: 'italic' }}>AI classifying…</span>
                    </div>
                  )}
                  {f.status === 'classified' && (
                    <div className="flex items-center gap-2">
                      <Pill tone="primary">{f.tag}</Pill>
                      <CheckCircle2 size={14} style={{ color: T.ok }}/>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between mt-5 pt-4" style={{ borderTop: `1px solid ${T.rule}` }}>
            <div className="flex items-center gap-1.5 text-[10.5px]" style={{ color: T.muted }}>
              <Lock size={11}/> 256-bit encrypted upload
            </div>
            <div className="flex items-center gap-2">
              <button onClick={onClose} className="px-3 py-1.5 text-[12px]" style={{ color: T.muted }}>Cancel</button>
              <button
                onClick={onClose}
                disabled={files.length === 0}
                className="px-4 py-2 text-[12.5px] rounded-[3px]"
                style={{
                  background: files.length === 0 ? T.faint : T.primary,
                  color: T.surface, fontWeight: 500,
                  opacity: files.length === 0 ? 0.6 : 1,
                  cursor: files.length === 0 ? 'not-allowed' : 'pointer',
                }}
              >
                Send to Suresh
              </button>
            </div>
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
  const [active, setActive] = useState('home');
  const [signOpen, setSignOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);

  useEffect(() => {
    const id = 'ledger-portal-fonts';
    if (document.getElementById(id)) return;
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap';
    document.head.appendChild(link);
  }, []);

  const onSign   = () => setSignOpen(true);
  const onUpload = () => setUploadOpen(true);

  return (
    <div className="flex flex-col h-screen" style={{ background: T.bg, color: T.ink, fontFamily: FONT_BODY }}>
      <TopBar active={active} setActive={setActive}/>
      <div className="flex-1 overflow-y-auto" style={{ background: T.bg }}>
        {active === 'home'     && <HomeView     onOpenSign={onSign} onOpenUpload={onUpload}/>}
        {active === 'tasks'    && <TasksView    onOpenSign={onSign} onOpenUpload={onUpload}/>}
        {active === 'docs'     && <DocumentsView onOpenUpload={onUpload}/>}
        {active === 'messages' && <MessagesView/>}
        {active === 'billing'  && <BillingView/>}
        {active === 'tax'      && <TaxView/>}
      </div>

      {signOpen   && <SignModal   onClose={() => setSignOpen(false)}/>}
      {uploadOpen && <UploadModal onClose={() => setUploadOpen(false)}/>}
    </div>
  );
}
