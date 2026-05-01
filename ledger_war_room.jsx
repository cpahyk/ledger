import React, { useState, useEffect, useMemo } from 'react';
import {
  AlertTriangle, Clock, Calendar, FileText, FileCheck, FileWarning,
  Users, User, ChevronRight, ChevronDown, ChevronUp, ArrowRight,
  ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown, Activity,
  Sparkles, Zap, Brain, Filter, Search, MoreHorizontal, Plus, X,
  CheckCircle2, Circle, CircleDot, Bell, Wifi, RefreshCw, Pause,
  Play, Maximize2, Pin, Coffee, Flame, Snowflake, Target, Award,
  Factory, Truck, HardHat, Building2, Briefcase, Globe, MapPin,
  Phone, Mail, MessageSquare, Send, Inbox, Receipt, Eye, Edit3,
  PlayCircle, PauseCircle, BarChart3, Hash, AtSign, Star, Layers,
  Volume2, VolumeX, Sun, Moon, Settings, ExternalLink,
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
  dangerLt:  '#D67358',
};

const FONT_DISPLAY = '"Instrument Serif", "Times New Roman", serif';
const FONT_BODY    = '"Geist", "Inter", system-ui, sans-serif';
const FONT_MONO    = '"JetBrains Mono", ui-monospace, monospace';

/* ============================================================
   DATA — full firm pipeline
   ============================================================ */
const PIPELINE_STAGES = [
  { id: 'docs',     label: 'Awaiting Docs',  short: 'Docs',     color: T.faint },
  { id: 'books',    label: 'Books / Recon',  short: 'Books',    color: T.copper },
  { id: 'prep',     label: 'In Prep',        short: 'Prep',     color: T.gold },
  { id: 'review',   label: 'Internal Review',short: 'Review',   color: T.primary },
  { id: 'client',   label: 'Client Review',  short: 'Client',   color: T.primary2 },
  { id: 'efile',    label: 'Ready to E-File',short: 'E-File',   color: T.warn },
  { id: 'filed',    label: 'Filed',          short: 'Filed',    color: T.ok },
];

const TEAM = [
  { id: 1, name: 'Suresh',   initial: 'SP', color: T.copper, capacity: 14, load: 11 },
  { id: 2, name: 'Margaux',  initial: 'MR', color: T.primary, capacity: 14, load: 13 },
  { id: 3, name: 'Hollis',   initial: 'HG', color: T.gold,    capacity: 12, load: 9  },
  { id: 4, name: 'Della',    initial: 'DM', color: T.primary2, capacity: 10, load: 5 },
];

const CLIENTS = [
  { id: 1,  name: 'Powder River Drilling',     entity: '1065',  preparer: 1, stage: 'review', state: 'WY', risk: 'low',     daysInStage: 2, hoursLeft: 4,   icon: Factory, fee: 1850, due: 'Sep 15', flags: [], notes: 5 },
  { id: 2,  name: 'Big Horn Logistics',        entity: '1120-S',preparer: 2, stage: 'docs',   state: 'WY', risk: 'high',    daysInStage: 11,hoursLeft: 18,  icon: Truck,   fee: 1450, due: 'Sep 15', flags: ['stuck','docs'], notes: 4 },
  { id: 3,  name: 'Sweetwater Welding',        entity: '1120-S',preparer: 1, stage: 'prep',   state: 'WY', risk: 'low',     daysInStage: 4, hoursLeft: 6,   icon: HardHat, fee: 1200, due: 'Sep 15', flags: [], notes: 2 },
  { id: 4,  name: 'Cheyenne Ridge Const.',     entity: '1120',  preparer: 2, stage: 'prep',   state: 'WY', risk: 'high',    daysInStage: 8, hoursLeft: 22,  icon: HardHat, fee: 2200, due: 'Sep 15', flags: ['cp2000','complex'], notes: 8 },
  { id: 5,  name: 'Bison Crude Services',      entity: '1065',  preparer: 1, stage: 'efile',  state: 'WY', risk: 'low',     daysInStage: 1, hoursLeft: 0.5, icon: Factory, fee: 1650, due: 'Sep 15', flags: [], notes: 3 },
  { id: 6,  name: 'High Plains Freight',       entity: '1120-S',preparer: 3, stage: 'books',  state: 'MT', risk: 'medium',  daysInStage: 6, hoursLeft: 8,   icon: Truck,   fee: 1320, due: 'Sep 15', flags: [], notes: 2 },
  { id: 7,  name: 'Rampart Steel Erectors',    entity: '1120',  preparer: 2, stage: 'review', state: 'CO', risk: 'low',     daysInStage: 3, hoursLeft: 3,   icon: HardHat, fee: 1980, due: 'Sep 15', flags: [], notes: 6 },
  { id: 8,  name: 'Niobrara Energy Partners',  entity: '1065',  preparer: 1, stage: 'docs',   state: 'WY', risk: 'medium',  daysInStage: 14,hoursLeft: 24,  icon: Factory, fee: 2400, due: 'Sep 15', flags: ['stuck','complex'], notes: 7 },
  { id: 9,  name: 'Wind River Hauling',         entity: '1065',  preparer: 3, stage: 'client', state: 'WY', risk: 'low',     daysInStage: 2, hoursLeft: 1,   icon: Truck,   fee: 980,  due: 'Sep 15', flags: [], notes: 1 },
  { id: 10, name: 'Granite Peak Builders',      entity: '1120-S',preparer: 4, stage: 'books',  state: 'ID', risk: 'medium',  daysInStage: 9, hoursLeft: 12,  icon: HardHat, fee: 1100, due: 'Sep 15', flags: ['stuck'], notes: 3 },
  { id: 11, name: 'Yellowstone Pipeline LLC',    entity: '1065',  preparer: 2, stage: 'efile',  state: 'WY', risk: 'low',     daysInStage: 0, hoursLeft: 0.5, icon: Factory, fee: 1750, due: 'Sep 15', flags: [], notes: 2 },
  { id: 12, name: 'Buffalo Springs Concrete',    entity: '1120-S',preparer: 3, stage: 'prep',   state: 'WY', risk: 'low',     daysInStage: 5, hoursLeft: 9,   icon: HardHat, fee: 1400, due: 'Sep 15', flags: [], notes: 4 },
  { id: 13, name: 'Antelope Crossing Express',  entity: '1120-S',preparer: 4, stage: 'docs',   state: 'WY', risk: 'medium',  daysInStage: 7, hoursLeft: 14,  icon: Truck,   fee: 1200, due: 'Sep 15', flags: ['docs'], notes: 2 },
  { id: 14, name: 'Cody Whitman 1040',           entity: '1040',  preparer: 1, stage: 'filed',  state: 'WY', risk: 'low',     daysInStage: 6, hoursLeft: 0,   icon: User,    fee: 450,  due: 'Oct 15', flags: [], notes: 2 },
  { id: 15, name: 'Ashlyn Reeves 1040',          entity: '1040',  preparer: 2, stage: 'filed',  state: 'WY', risk: 'low',     daysInStage: 4, hoursLeft: 0,   icon: User,    fee: 380,  due: 'Oct 15', flags: [], notes: 1 },
  { id: 16, name: 'Marlene Hayes 1040',          entity: '1040',  preparer: 3, stage: 'review', state: 'WY', risk: 'medium',  daysInStage: 3, hoursLeft: 2,   icon: User,    fee: 420,  due: 'Oct 15', flags: [], notes: 3 },
  { id: 17, name: 'Wyatt Kessler 1040',          entity: '1040',  preparer: 1, stage: 'client', state: 'WY', risk: 'low',     daysInStage: 1, hoursLeft: 0.5, icon: User,    fee: 410,  due: 'Oct 15', flags: [], notes: 0 },
  { id: 18, name: 'Hollis Garner 1040',          entity: '1040',  preparer: 2, stage: 'efile',  state: 'WY', risk: 'low',     daysInStage: 0, hoursLeft: 0.5, icon: User,    fee: 350,  due: 'Oct 15', flags: [], notes: 1 },
  { id: 19, name: 'Bonneville Field Services',   entity: '1065',  preparer: 4, stage: 'docs',   state: 'WY', risk: 'high',    daysInStage: 17,hoursLeft: 20,  icon: Factory, fee: 1900, due: 'Sep 15', flags: ['stuck','docs','complex'], notes: 4 },
  { id: 20, name: 'Brock Tillman 1040',          entity: '1040',  preparer: 3, stage: 'filed',  state: 'CO', risk: 'low',     daysInStage: 8, hoursLeft: 0,   icon: User,    fee: 480,  due: 'Oct 15', flags: [], notes: 1 },
  { id: 21, name: 'Tessa Nordquist 1040',        entity: '1040',  preparer: 4, stage: 'filed',  state: 'ID', risk: 'low',     daysInStage: 5, hoursLeft: 0,   icon: User,    fee: 360,  due: 'Oct 15', flags: [], notes: 0 },
];

const ACTIVITY_FEED = [
  { id: 1,  who: 'Margaux', what: 'filed', obj: 'Yellowstone Pipeline · Form 1065',           time: '2 min ago', icon: FileCheck, tone: 'ok' },
  { id: 2,  who: 'AI',      what: 'flagged', obj: 'Bonneville · 17 days in Docs · escalate',  time: '4 min ago', icon: AlertTriangle, tone: 'warn' },
  { id: 3,  who: 'Cody Whitman', what: 'signed', obj: 'Engagement letter · Powder River',     time: '8 min ago', icon: FileSignature, tone: 'ok' },
  { id: 4,  who: 'Suresh',  what: 'sent draft', obj: 'CP2000 reply · Cheyenne Ridge',          time: '14 min ago', icon: Send, tone: 'info' },
  { id: 5,  who: 'Hollis',  what: 'completed prep', obj: 'High Plains Freight · 1120-S',     time: '23 min ago', icon: CheckCircle2, tone: 'ok' },
  { id: 6,  who: 'AI',      what: 'classified', obj: '11 documents auto-routed',                time: '34 min ago', icon: Sparkles, tone: 'info' },
  { id: 7,  who: 'Margaux', what: 'reviewed', obj: 'Buffalo Springs · waiting on K-1 detail', time: '47 min ago', icon: Eye, tone: 'info' },
  { id: 8,  who: 'Della',   what: 'reconciled', obj: 'Granite Peak · March books',              time: '1h ago',    icon: CheckCircle2, tone: 'ok' },
];

// 24-hour filing throughput chart data — last 7 days
const FILING_THROUGHPUT = [
  { d: 'Mon', filed: 3, target: 4 },
  { d: 'Tue', filed: 5, target: 4 },
  { d: 'Wed', filed: 4, target: 4 },
  { d: 'Thu', filed: 6, target: 5 },
  { d: 'Fri', filed: 4, target: 5 },
  { d: 'Sat', filed: 1, target: 2 },
  { d: 'Sun', filed: 0, target: 0 },
];

const DEADLINES = [
  { id: 1, form: 'Form 941',       label: 'Q1 Payroll Tax',  due: 'Apr 30', daysLeft: 5,   risk: 'high',   count: 6 },
  { id: 2, form: 'Form 1065',      label: 'Partnership ext.',due: 'Sep 15', daysLeft: 143, risk: 'medium', count: 8 },
  { id: 3, form: 'Form 1120-S',    label: 'S-Corp ext.',     due: 'Sep 15', daysLeft: 143, risk: 'medium', count: 6 },
  { id: 4, form: 'Form 1120',      label: 'C-Corp ext.',     due: 'Sep 15', daysLeft: 143, risk: 'low',    count: 2 },
  { id: 5, form: 'Form 1040',      label: 'Personal ext.',   due: 'Oct 15', daysLeft: 173, risk: 'low',    count: 7 },
];

/* ============================================================
   HELPERS
   ============================================================ */
const cx = (...a) => a.filter(Boolean).join(' ');

function FileSignature(props) {
  return (
    <svg width={props.size||14} height={props.size||14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M14 3v4a1 1 0 0 0 1 1h4"/>
      <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z"/>
      <path d="M8 16s1.5-1 4-1 4 1 4 1"/>
    </svg>
  );
}

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
   TOP BAR — war room control center
   ============================================================ */
function TopBar({ live, setLive, sound, setSound, lastSync }) {
  return (
    <header
      className="flex items-center px-7 py-3 gap-5"
      style={{ background: T.primaryDk, color: T.surface, borderBottom: `1px solid ${T.primary}`, fontFamily: FONT_BODY }}
    >
      <div className="flex items-center gap-3">
        <div
          className="flex items-center justify-center"
          style={{
            width: 30, height: 30, borderRadius: 4, background: T.copper,
            color: T.surface, fontFamily: FONT_DISPLAY, fontSize: 22, fontStyle: 'italic',
            lineHeight: 1, paddingBottom: 4,
          }}
        >L</div>
        <div className="flex flex-col">
          <span style={{ fontFamily: FONT_DISPLAY, fontSize: 19, color: T.surface, lineHeight: 1, letterSpacing: '-0.01em', fontStyle: 'italic' }}>
            War Room
          </span>
          <span className="text-[9px] uppercase tracking-[0.18em]" style={{ color: T.copperLt, marginTop: 1 }}>
            Tax Season · Apr 25, 2026
          </span>
        </div>
      </div>

      <div style={{ width: 1, height: 28, background: 'rgba(255,253,248,0.12)' }}/>

      {/* Live indicator */}
      <div className="flex items-center gap-2 px-2.5 py-1 rounded-[3px]" style={{ background: 'rgba(255,253,248,0.06)', border: '1px solid rgba(255,253,248,0.10)' }}>
        <span
          className="rounded-full"
          style={{
            width: 7, height: 7, background: live ? T.copper : T.faint,
            boxShadow: live ? `0 0 0 4px rgba(196,106,45,0.18)` : 'none',
            animation: live ? 'pulseDot 1.6s ease-in-out infinite' : 'none',
          }}
        />
        <span className="text-[10.5px] uppercase tracking-[0.16em]" style={{ color: live ? T.copperLt : T.faint, fontWeight: 500 }}>
          {live ? 'Live' : 'Paused'}
        </span>
      </div>
      <span className="text-[10.5px]" style={{ color: 'rgba(255,253,248,0.6)', fontFamily: FONT_MONO }}>
        Synced {lastSync}s ago
      </span>

      <style>{`@keyframes pulseDot { 0%,100%{opacity:1} 50%{opacity:.5} }`}</style>

      <div className="flex-1"/>

      {/* Big season countdown */}
      <div className="flex items-center gap-3 px-3 py-1.5 rounded-[3px]" style={{ background: 'rgba(255,253,248,0.04)', border: '1px solid rgba(255,253,248,0.10)' }}>
        <div className="flex flex-col items-end">
          <span className="text-[8.5px] uppercase tracking-[0.16em]" style={{ color: T.copperLt }}>Q1 941 due in</span>
          <span style={{ fontFamily: FONT_DISPLAY, fontSize: 22, fontStyle: 'italic', color: T.surface, letterSpacing: '-0.01em', lineHeight: 1 }}>
            5d 14h
          </span>
        </div>
        <div style={{ width: 1, height: 28, background: 'rgba(255,253,248,0.12)' }}/>
        <div className="flex flex-col items-end">
          <span className="text-[8.5px] uppercase tracking-[0.16em]" style={{ color: T.copperLt }}>Sep 15 ext. in</span>
          <span style={{ fontFamily: FONT_DISPLAY, fontSize: 22, fontStyle: 'italic', color: T.surface, letterSpacing: '-0.01em', lineHeight: 1 }}>
            143d
          </span>
        </div>
      </div>

      {/* Controls */}
      <button
        onClick={() => setLive(!live)}
        className="p-2 rounded-[3px]"
        style={{ background: 'rgba(255,253,248,0.06)', border: '1px solid rgba(255,253,248,0.10)' }}
      >
        {live ? <PauseCircle size={14}/> : <PlayCircle size={14}/>}
      </button>
      <button
        onClick={() => setSound(!sound)}
        className="p-2 rounded-[3px]"
        style={{ background: 'rgba(255,253,248,0.06)', border: '1px solid rgba(255,253,248,0.10)' }}
      >
        {sound ? <Volume2 size={14}/> : <VolumeX size={14}/>}
      </button>
      <button className="p-2 rounded-[3px]" style={{ background: 'rgba(255,253,248,0.06)', border: '1px solid rgba(255,253,248,0.10)' }}>
        <Maximize2 size={14}/>
      </button>
    </header>
  );
}

/* ============================================================
   KPI BAR — top-line operational stats
   ============================================================ */
function KpiBar() {
  const totalActive = CLIENTS.filter(c => c.stage !== 'filed').length;
  const filedThisWk = CLIENTS.filter(c => c.stage === 'filed').length;
  const stuck = CLIENTS.filter(c => c.flags.includes('stuck')).length;
  const totalFee = CLIENTS.reduce((s, c) => s + c.fee, 0);

  const kpis = [
    { l: 'Active engagements', v: totalActive,  d: '7 stages · live',                  i: Activity, tone: T.primary },
    { l: 'Filed this week',     v: filedThisWk,   d: '+2 vs last wk',                    i: FileCheck, tone: T.ok },
    { l: 'Stuck > 7 days',      v: stuck,         d: 'Need intervention',                i: AlertTriangle, tone: stuck > 0 ? T.copper : T.muted },
    { l: 'Hours remaining',      v: '156',          d: 'across all open returns',         i: Clock, tone: T.gold },
    { l: 'Pipeline value',       v: '$26.9k',      d: 'fees in flight',                   i: TrendingUp, tone: T.copper },
    { l: 'Throughput today',      v: '4',          d: '/ 5 target',                       i: Target, tone: T.warn },
  ];

  return (
    <div className="grid grid-cols-6 gap-2 px-7 py-4" style={{ background: T.surface, borderBottom: `1px solid ${T.rule}`, fontFamily: FONT_BODY }}>
      {kpis.map((k, i) => {
        const Icon = k.i;
        return (
          <div key={i} className="flex items-start gap-3 p-3 rounded-[3px]" style={{ background: T.surface2, border: `1px solid ${T.rule}` }}>
            <div
              className="flex items-center justify-center shrink-0"
              style={{ width: 32, height: 32, background: T.surface, border: `1px solid ${T.rule}`, borderRadius: 4 }}
            >
              <Icon size={14} style={{ color: k.tone }}/>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[9.5px] uppercase tracking-[0.14em]" style={{ color: T.muted }}>{k.l}</div>
              <div
                style={{
                  fontFamily: FONT_DISPLAY, fontSize: 24, color: T.ink,
                  fontStyle: 'italic', letterSpacing: '-0.02em', lineHeight: 1,
                  marginTop: 2,
                }}
              >
                {k.v}
              </div>
              <div className="text-[10px] mt-1.5" style={{ color: T.muted }}>{k.d}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ============================================================
   PIPELINE BOARD — Kanban-style with all 7 stages
   ============================================================ */
function PipelineBoard({ filterPreparer, setSelected }) {
  const visible = filterPreparer
    ? CLIENTS.filter(c => c.preparer === filterPreparer)
    : CLIENTS;

  return (
    <div className="px-7 py-5" style={{ background: T.bg, fontFamily: FONT_BODY }}>
      <div className="flex items-end justify-between mb-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.18em] flex items-center gap-1.5" style={{ color: T.muted, fontWeight: 500 }}>
            <Activity size={10} style={{ color: T.copper }}/> Live pipeline
          </div>
          <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 26, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.01em', lineHeight: 1.1 }}>
            Filing pipeline · {visible.length} engagements
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-[11px] flex items-center gap-1 px-2.5 py-1.5 rounded-[3px]" style={{ background: T.surface, color: T.ink2, border: `1px solid ${T.rule}` }}>
            <Filter size={11}/> Filter
          </button>
          <button className="text-[11px] flex items-center gap-1 px-2.5 py-1.5 rounded-[3px]" style={{ background: T.surface, color: T.ink2, border: `1px solid ${T.rule}` }}>
            <Layers size={11}/> Group by entity
          </button>
        </div>
      </div>

      {/* Stage flow header — visual current state of pipeline */}
      <div className="flex items-stretch mb-3">
        {PIPELINE_STAGES.map((stage, i) => {
          const inStage = visible.filter(c => c.stage === stage.id).length;
          const isLast = i === PIPELINE_STAGES.length - 1;
          return (
            <React.Fragment key={stage.id}>
              <div className="flex-1 px-2 py-2.5 rounded-[3px]" style={{ background: T.surface, border: `1px solid ${T.rule}` }}>
                <div className="flex items-center gap-1.5">
                  <span className="rounded-full" style={{ width: 6, height: 6, background: stage.color }}/>
                  <span className="text-[9.5px] uppercase tracking-[0.12em] truncate" style={{ color: T.muted, fontWeight: 500 }}>
                    {stage.short}
                  </span>
                </div>
                <div className="flex items-baseline gap-1.5 mt-1">
                  <span style={{ fontFamily: FONT_DISPLAY, fontSize: 22, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.02em', lineHeight: 1 }}>
                    {inStage}
                  </span>
                  {inStage > 0 && (
                    <span className="text-[9.5px] uppercase" style={{ color: T.muted, fontFamily: FONT_BODY }}>
                      eng.
                    </span>
                  )}
                </div>
              </div>
              {!isLast && (
                <div className="flex items-center" style={{ width: 14 }}>
                  <ChevronRight size={11} style={{ color: T.faint, margin: '0 auto' }}/>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Kanban columns */}
      <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'thin' }}>
        {PIPELINE_STAGES.map(stage => {
          const cards = visible.filter(c => c.stage === stage.id);
          return (
            <div key={stage.id} className="flex flex-col" style={{ minWidth: 240, flex: 1 }}>
              <div className="px-3 py-2.5 flex items-center justify-between rounded-t-[3px]" style={{ background: T.surface, border: `1px solid ${T.rule}` }}>
                <div className="flex items-center gap-1.5">
                  <span className="rounded-full" style={{ width: 6, height: 6, background: stage.color }}/>
                  <span className="text-[10px] uppercase tracking-[0.14em]" style={{ color: T.ink2, fontWeight: 500 }}>{stage.short}</span>
                </div>
                <span className="text-[10.5px]" style={{ color: T.muted, fontFamily: FONT_MONO }}>{cards.length}</span>
              </div>
              <div
                className="flex flex-col gap-1.5 p-1.5 flex-1"
                style={{
                  background: T.surface3,
                  borderLeft: `1px solid ${T.rule}`,
                  borderRight: `1px solid ${T.rule}`,
                  borderBottom: `1px solid ${T.rule}`,
                  borderBottomLeftRadius: 3, borderBottomRightRadius: 3,
                  minHeight: 320,
                }}
              >
                {cards.map(c => <ClientCard key={c.id} c={c} onClick={() => setSelected(c)}/>)}
                {cards.length === 0 && (
                  <div className="text-[10.5px] italic text-center py-6" style={{ color: T.faint }}>
                    nothing in {stage.short.toLowerCase()}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ClientCard({ c, onClick }) {
  const Icon = c.icon;
  const preparer = TEAM.find(t => t.id === c.preparer);
  const isStuck = c.flags.includes('stuck');
  const hasComplex = c.flags.includes('complex');
  const hasIRS = c.flags.includes('cp2000');

  return (
    <button
      onClick={onClick}
      className="text-left p-2.5 rounded-[3px] transition-transform hover:-translate-y-px"
      style={{
        background: T.surface,
        border: `1px solid ${T.rule}`,
        borderLeft: `3px solid ${
          c.risk === 'high' ? T.danger :
          c.risk === 'medium' ? T.warn : T.ok
        }`,
        boxShadow: isStuck ? `0 0 0 1px ${T.copper}30` : 'none',
      }}
    >
      <div className="flex items-start gap-2">
        <div
          className="flex items-center justify-center shrink-0"
          style={{ width: 24, height: 24, background: T.surface2, border: `1px solid ${T.rule}`, borderRadius: 3 }}
        >
          <Icon size={11} style={{ color: T.primary }}/>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[11.5px] truncate" style={{ color: T.ink, fontWeight: 500, lineHeight: 1.25 }}>
            {c.name}
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-[9.5px]" style={{ color: T.muted, fontFamily: FONT_MONO }}>{c.entity}</span>
            <span className="text-[9.5px]" style={{ color: T.faint }}>·</span>
            <span className="text-[9.5px]" style={{ color: T.muted }}>{c.state}</span>
          </div>
        </div>
      </div>

      {/* Flags */}
      {(c.flags.length > 0 || c.daysInStage > 7) && (
        <div className="flex items-center gap-1 mt-2 flex-wrap">
          {isStuck && <Pill tone="copper" tiny><Snowflake size={8}/> stuck {c.daysInStage}d</Pill>}
          {hasComplex && <Pill tone="med" tiny><Flame size={8}/> complex</Pill>}
          {hasIRS && <Pill tone="high" tiny>CP2000</Pill>}
        </div>
      )}

      <div className="flex items-center gap-2 mt-2 pt-2" style={{ borderTop: `1px dashed ${T.rule2}` }}>
        <div
          className="flex items-center justify-center text-[8px]"
          style={{ width: 18, height: 18, borderRadius: '50%', background: preparer.color, color: T.surface, fontWeight: 600 }}
        >
          {preparer.initial}
        </div>
        <span className="text-[10px]" style={{ color: T.muted }}>
          {c.hoursLeft > 0 ? `${c.hoursLeft}h left` : 'ready'}
        </span>
        <div className="flex-1"/>
        <span className="text-[10px]" style={{ color: T.copper, fontFamily: FONT_MONO }}>${c.fee}</span>
      </div>
    </button>
  );
}

/* ============================================================
   TEAM LOAD PANEL
   ============================================================ */
function TeamLoadPanel({ filterPreparer, setFilterPreparer }) {
  return (
    <div className="p-5" style={{ background: T.surface, border: `1px solid ${T.rule}`, borderRadius: 3 }}>
      <div className="flex items-end justify-between mb-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.18em]" style={{ color: T.muted, fontWeight: 500 }}>Team load</div>
          <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 22, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.01em', lineHeight: 1.1 }}>
            Who's covering what
          </h3>
        </div>
        {filterPreparer && (
          <button
            onClick={() => setFilterPreparer(null)}
            className="text-[10.5px] flex items-center gap-1"
            style={{ color: T.copper }}
          >
            <X size={11}/> Clear filter
          </button>
        )}
      </div>

      <div className="flex flex-col gap-3">
        {TEAM.map(t => {
          const myClients = CLIENTS.filter(c => c.preparer === t.id && c.stage !== 'filed').length;
          const utilization = (t.load / t.capacity) * 100;
          const isOverloaded = utilization > 90;
          const isFiltered = filterPreparer === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setFilterPreparer(isFiltered ? null : t.id)}
              className="text-left p-3 rounded-[3px] transition-colors"
              style={{
                background: isFiltered ? T.surface2 : T.surface,
                border: `1px solid ${isFiltered ? T.copper : T.rule}`,
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="flex items-center justify-center text-[12px] shrink-0"
                  style={{ width: 32, height: 32, borderRadius: '50%', background: t.color, color: T.surface, fontWeight: 600 }}
                >
                  {t.initial}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[12.5px]" style={{ color: T.ink, fontWeight: 500 }}>{t.name}</span>
                    {isOverloaded && <Pill tone="high" tiny><Flame size={8}/> hot</Pill>}
                  </div>
                  <div className="text-[10.5px] mt-0.5" style={{ color: T.muted }}>
                    {myClients} active · <span style={{ fontFamily: FONT_MONO }}>{t.load}h / {t.capacity}h</span> day
                  </div>
                </div>
                <span style={{ fontFamily: FONT_DISPLAY, fontSize: 22, color: isOverloaded ? T.danger : T.ink, fontStyle: 'italic', letterSpacing: '-0.02em', lineHeight: 1 }}>
                  {Math.round(utilization)}%
                </span>
              </div>
              <div className="h-[4px] rounded-full" style={{ background: T.rule }}>
                <div
                  style={{
                    height: '100%',
                    width: `${Math.min(utilization, 100)}%`,
                    background: utilization > 95 ? T.danger : utilization > 80 ? T.warn : T.ok,
                    borderRadius: 999,
                    transition: 'width 600ms ease',
                  }}
                />
              </div>
            </button>
          );
        })}
      </div>

      <div
        className="mt-4 p-3 rounded-[3px] flex items-start gap-2.5"
        style={{ background: T.surface2, border: `1px dashed ${T.rule2}` }}
      >
        <Sparkles size={13} style={{ color: T.copper, marginTop: 2, flexShrink: 0 }}/>
        <div className="text-[11px]" style={{ color: T.ink2, lineHeight: 1.55 }}>
          <span style={{ color: T.ink, fontWeight: 500 }}>AI rebalance suggestion:</span>{' '}
          Move <span style={{ color: T.ink }}>Granite Peak</span> from Della to Hollis — frees 4 hours and matches Hollis's 1120-S expertise.
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   THROUGHPUT CHART
   ============================================================ */
function ThroughputPanel() {
  const max = Math.max(...FILING_THROUGHPUT.map(d => Math.max(d.filed, d.target)));
  const totalFiled = FILING_THROUGHPUT.reduce((s, d) => s + d.filed, 0);
  const totalTarget = FILING_THROUGHPUT.reduce((s, d) => s + d.target, 0);
  return (
    <div className="p-5" style={{ background: T.surface, border: `1px solid ${T.rule}`, borderRadius: 3 }}>
      <div className="flex items-end justify-between mb-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.18em]" style={{ color: T.muted, fontWeight: 500 }}>This week</div>
          <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 22, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.01em', lineHeight: 1.1 }}>
            Filing throughput
          </h3>
        </div>
        <div className="text-right">
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 26, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.02em', lineHeight: 1 }}>
            {totalFiled} <span style={{ color: T.muted, fontSize: 14 }}>/ {totalTarget}</span>
          </div>
          <div className="text-[10.5px] mt-0.5" style={{ color: totalFiled >= totalTarget ? T.ok : T.warn }}>
            {totalFiled >= totalTarget ? '✓ on pace' : `${totalTarget - totalFiled} behind`}
          </div>
        </div>
      </div>

      <svg viewBox="0 0 380 130" width="100%" style={{ display: 'block' }}>
        {/* y-grid */}
        {[0, 0.5, 1].map((p, i) => {
          const y = 110 - p * 90;
          return (
            <g key={i}>
              <line x1={20} y1={y} x2={370} y2={y} stroke={T.rule} strokeWidth={0.5} strokeDasharray="2 4"/>
              <text x={16} y={y + 3} textAnchor="end" fontSize={8.5} fill={T.muted} fontFamily={FONT_MONO}>
                {Math.round(p * max)}
              </text>
            </g>
          );
        })}
        {/* bars */}
        {FILING_THROUGHPUT.map((d, i) => {
          const x = 30 + i * 50;
          const fH = (d.filed / max) * 90;
          const tH = (d.target / max) * 90;
          const isToday = i === 4; // Friday
          return (
            <g key={i}>
              {/* Target line */}
              <line
                x1={x - 4} y1={110 - tH}
                x2={x + 28} y2={110 - tH}
                stroke={T.copper} strokeWidth={1.5} strokeDasharray="3 3"
              />
              {/* Filed bar */}
              <rect
                x={x} y={110 - fH}
                width={24} height={fH}
                fill={isToday ? T.copper : d.filed >= d.target ? T.ok : T.gold}
                rx={2}
              />
              {/* Value label */}
              <text x={x + 12} y={110 - fH - 6} textAnchor="middle" fontSize={9.5} fontFamily={FONT_MONO} fill={T.ink} fontWeight={500}>
                {d.filed}
              </text>
              {/* Day */}
              <text x={x + 12} y={124} textAnchor="middle" fontSize={9} fontFamily={FONT_BODY} fill={isToday ? T.copper : T.muted} fontWeight={isToday ? 600 : 400}>
                {d.d}{isToday ? ' ·' : ''}
              </text>
            </g>
          );
        })}
        {/* Legend */}
        <g transform="translate(220, 8)">
          <rect x={0} y={0} width={9} height={9} fill={T.ok} rx={2}/>
          <text x={13} y={8} fontSize={9} fill={T.ink2} fontFamily={FONT_BODY}>Filed</text>
          <line x1={50} y1={4.5} x2={62} y2={4.5} stroke={T.copper} strokeWidth={1.5} strokeDasharray="3 3"/>
          <text x={66} y={8} fontSize={9} fill={T.ink2} fontFamily={FONT_BODY}>Target</text>
          <rect x={108} y={0} width={9} height={9} fill={T.copper} rx={2}/>
          <text x={121} y={8} fontSize={9} fill={T.ink2} fontFamily={FONT_BODY}>Today</text>
        </g>
      </svg>
    </div>
  );
}

/* ============================================================
   STUCK ENGAGEMENTS PANEL
   ============================================================ */
function StuckPanel({ setSelected }) {
  const stuck = CLIENTS
    .filter(c => c.flags.includes('stuck') || c.daysInStage > 7)
    .sort((a, b) => b.daysInStage - a.daysInStage);

  return (
    <div className="p-5" style={{ background: T.surface, border: `1px solid ${T.rule}`, borderRadius: 3 }}>
      <div className="flex items-end justify-between mb-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.18em] flex items-center gap-1.5" style={{ color: T.muted, fontWeight: 500 }}>
            <Snowflake size={10} style={{ color: T.copper }}/> AI-flagged
          </div>
          <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 22, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.01em', lineHeight: 1.1 }}>
            Stuck engagements
          </h3>
        </div>
        <Pill tone="copper">{stuck.length}</Pill>
      </div>

      <div className="flex flex-col gap-px" style={{ background: T.rule }}>
        {stuck.slice(0, 5).map(c => {
          const Icon = c.icon;
          const preparer = TEAM.find(t => t.id === c.preparer);
          return (
            <button
              key={c.id}
              onClick={() => setSelected(c)}
              className="flex items-center gap-3 px-3 py-2.5 text-left"
              style={{ background: T.surface }}
            >
              <div className="flex flex-col items-center" style={{ width: 36 }}>
                <span style={{ fontFamily: FONT_DISPLAY, fontSize: 22, fontStyle: 'italic', color: T.danger, lineHeight: 1, letterSpacing: '-0.02em' }}>
                  {c.daysInStage}
                </span>
                <span className="text-[8px] uppercase tracking-[0.12em]" style={{ color: T.muted }}>days</span>
              </div>
              <div style={{ width: 1, alignSelf: 'stretch', background: T.rule }}/>
              <div
                className="flex items-center justify-center shrink-0"
                style={{ width: 24, height: 24, background: T.surface2, border: `1px solid ${T.rule}`, borderRadius: 3 }}
              >
                <Icon size={11} style={{ color: T.primary }}/>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[12px]" style={{ color: T.ink, fontWeight: 500 }}>{c.name}</div>
                <div className="flex items-center gap-1.5 mt-0.5 text-[10px]" style={{ color: T.muted }}>
                  <span>in {PIPELINE_STAGES.find(s => s.id === c.stage)?.short}</span>
                  <span>·</span>
                  <span>{preparer.name}</span>
                  <span>·</span>
                  <span style={{ fontFamily: FONT_MONO }}>${c.fee}</span>
                </div>
              </div>
              <ArrowRight size={12} style={{ color: T.faint }}/>
            </button>
          );
        })}
      </div>

      <button
        className="mt-4 w-full text-[11.5px] py-2 rounded-[3px] flex items-center justify-center gap-1.5"
        style={{ background: T.surface2, color: T.ink2, border: `1px solid ${T.rule}` }}
      >
        <Send size={11}/> Send batch nudge to all stuck clients
      </button>
    </div>
  );
}

/* ============================================================
   ACTIVITY FEED PANEL
   ============================================================ */
function ActivityFeed() {
  return (
    <div className="p-5 flex flex-col" style={{ background: T.surface, border: `1px solid ${T.rule}`, borderRadius: 3, height: '100%' }}>
      <div className="flex items-end justify-between mb-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.18em] flex items-center gap-1.5" style={{ color: T.muted, fontWeight: 500 }}>
            <Activity size={10} style={{ color: T.ok }}/> Live
          </div>
          <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 22, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.01em', lineHeight: 1.1 }}>
            Activity stream
          </h3>
        </div>
        <button className="text-[10px] uppercase tracking-[0.14em]" style={{ color: T.muted }}>View all</button>
      </div>

      <ul className="flex flex-col gap-3 flex-1 overflow-y-auto">
        {ACTIVITY_FEED.map(a => {
          const Icon = a.icon;
          const c = a.tone === 'ok' ? T.ok : a.tone === 'warn' ? T.warn : a.tone === 'info' ? T.primary : T.ink2;
          return (
            <li key={a.id} className="flex items-start gap-2.5 text-[12px]" style={{ color: T.ink2 }}>
              <div
                className="flex items-center justify-center mt-0.5 shrink-0"
                style={{ width: 22, height: 22, background: T.surface2, border: `1px solid ${T.rule}`, borderRadius: 2 }}
              >
                <Icon size={11} style={{ color: c }} strokeWidth={1.7}/>
              </div>
              <div className="flex-1 min-w-0">
                <div className="leading-tight">
                  <span style={{ color: T.ink, fontWeight: 500 }}>{a.who}</span>
                  <span style={{ color: T.muted }}> {a.what} </span>
                  <span style={{ color: T.ink }}>{a.obj}</span>
                </div>
                <div className="text-[10px] mt-0.5" style={{ color: T.muted, fontFamily: FONT_MONO }}>{a.time}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ============================================================
   DEADLINE STRIP — bottom strip showing upcoming deadlines
   ============================================================ */
function DeadlineStrip() {
  return (
    <div className="px-7 py-4" style={{ background: T.surface, borderTop: `1px solid ${T.rule}`, fontFamily: FONT_BODY }}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <Calendar size={14} style={{ color: T.copper }}/>
          <span className="text-[10px] uppercase tracking-[0.18em]" style={{ color: T.muted, fontWeight: 500 }}>
            Upcoming deadlines
          </span>
        </div>
        <button className="text-[10.5px] flex items-center gap-1" style={{ color: T.muted }}>
          Calendar view <ExternalLink size={10}/>
        </button>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {DEADLINES.map(d => {
          const tone = d.risk === 'high' ? T.danger : d.risk === 'medium' ? T.warn : T.ok;
          return (
            <div
              key={d.id}
              className="flex items-center gap-3 p-3 rounded-[3px]"
              style={{
                background: T.surface2,
                border: `1px solid ${T.rule}`,
                borderLeft: `3px solid ${tone}`,
              }}
            >
              <div className="flex flex-col items-center" style={{ width: 38 }}>
                <span style={{ fontFamily: FONT_DISPLAY, fontSize: 22, fontStyle: 'italic', color: T.ink, lineHeight: 1, letterSpacing: '-0.02em' }}>
                  {d.daysLeft}
                </span>
                <span className="text-[8px] uppercase tracking-[0.12em]" style={{ color: T.muted, marginTop: 1 }}>
                  {d.daysLeft === 1 ? 'day' : 'days'}
                </span>
              </div>
              <div style={{ width: 1, alignSelf: 'stretch', background: T.rule }}/>
              <div className="flex-1 min-w-0">
                <div className="text-[11.5px]" style={{ color: T.ink, fontWeight: 500, lineHeight: 1.2 }}>{d.form}</div>
                <div className="text-[10px] mt-0.5" style={{ color: T.muted }}>{d.label} · {d.due}</div>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <Pill tone={d.risk === 'high' ? 'high' : d.risk === 'medium' ? 'med' : 'low'} tiny>
                    {d.count} clients
                  </Pill>
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
   CLIENT DETAIL DRAWER (right side, slides in)
   ============================================================ */
function ClientDrawer({ c, onClose }) {
  if (!c) return null;
  const Icon = c.icon;
  const preparer = TEAM.find(t => t.id === c.preparer);
  const stage = PIPELINE_STAGES.find(s => s.id === c.stage);
  const isStuck = c.flags.includes('stuck');

  return (
    <>
      <div
        className="fixed inset-0 z-30"
        style={{ background: 'rgba(20,15,8,0.35)' }}
        onClick={onClose}
      />
      <div
        className="fixed right-0 top-0 h-full overflow-y-auto z-40 flex flex-col"
        style={{
          width: 460, background: T.surface, borderLeft: `1px solid ${T.rule}`,
          boxShadow: '-30px 0 60px -20px rgba(20,15,8,0.18)',
          fontFamily: FONT_BODY,
        }}
      >
        {/* Header */}
        <div className="px-6 py-5" style={{ background: T.primaryDk, color: T.surface }}>
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              <div
                className="flex items-center justify-center"
                style={{ width: 44, height: 44, background: T.copper, color: T.surface, borderRadius: 4 }}
              >
                <Icon size={20}/>
              </div>
              <div>
                <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 24, fontStyle: 'italic', letterSpacing: '-0.01em', lineHeight: 1.1 }}>
                  {c.name}
                </h3>
                <div className="flex items-center gap-1.5 mt-1">
                  <Pill tone="dark" tiny>{c.entity}</Pill>
                  <span className="text-[10.5px]" style={{ color: T.copperLt }}>{c.state}</span>
                </div>
              </div>
            </div>
            <button onClick={onClose} className="p-1"><X size={16} style={{ color: 'rgba(255,253,248,0.7)' }}/></button>
          </div>

          <div className="flex items-center gap-2 mt-3">
            <span className="rounded-full" style={{ width: 6, height: 6, background: stage.color }}/>
            <span className="text-[11px] uppercase tracking-[0.16em]" style={{ color: 'rgba(255,253,248,0.85)', fontWeight: 500 }}>
              In {stage.label}
            </span>
            <span className="text-[10.5px]" style={{ color: 'rgba(255,253,248,0.5)', fontFamily: FONT_MONO }}>
              · {c.daysInStage} days
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 px-6 py-5">
          {/* Vital stats */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            <Stat label="Hours left" value={c.hoursLeft > 0 ? `${c.hoursLeft}h` : 'Ready'}/>
            <Stat label="Risk" value={c.risk} tone={c.risk}/>
            <Stat label="Fee" value={`$${c.fee}`} mono/>
          </div>

          {isStuck && (
            <div
              className="p-4 mb-5 rounded-[3px] flex items-start gap-3"
              style={{ background: '#FBF1E0', border: `1px solid ${T.copper}` }}
            >
              <Snowflake size={14} style={{ color: T.copper, marginTop: 2, flexShrink: 0 }}/>
              <div className="flex-1">
                <div className="text-[12px]" style={{ color: T.ink, fontWeight: 500 }}>
                  This engagement has been stuck {c.daysInStage} days
                </div>
                <div className="text-[11px] mt-1" style={{ color: T.ink2, lineHeight: 1.5 }}>
                  AI suggests sending a polite nudge with the missing items list. {preparer.name} is the assigned preparer.
                </div>
                <div className="flex items-center gap-2 mt-2.5">
                  <button className="text-[10.5px] px-2.5 py-1 rounded-[2px] flex items-center gap-1" style={{ background: T.copper, color: T.surface, fontWeight: 500 }}>
                    <Send size={10}/> Send nudge
                  </button>
                  <button className="text-[10.5px] px-2.5 py-1 rounded-[2px]" style={{ background: T.surface, color: T.ink2, border: `1px solid ${T.rule}` }}>
                    Reassign
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Stage progress */}
          <div className="mb-5">
            <div className="text-[9.5px] uppercase tracking-[0.16em] mb-2" style={{ color: T.muted, fontWeight: 500 }}>
              Engagement progress
            </div>
            <div className="flex items-center gap-1">
              {PIPELINE_STAGES.map((s, i) => {
                const currentIdx = PIPELINE_STAGES.findIndex(x => x.id === c.stage);
                const isPast = i < currentIdx;
                const isCurrent = i === currentIdx;
                return (
                  <React.Fragment key={s.id}>
                    <div className="flex flex-col items-center" style={{ flex: '0 0 auto' }}>
                      <div
                        className="rounded-full flex items-center justify-center"
                        style={{
                          width: 16, height: 16,
                          background: isPast ? T.ok : isCurrent ? T.copper : T.surface,
                          border: `1.5px solid ${isPast ? T.ok : isCurrent ? T.copper : T.rule2}`,
                        }}
                      >
                        {isPast && <CheckCircle2 size={10} style={{ color: T.surface }} strokeWidth={3}/>}
                        {isCurrent && <span style={{ width: 4, height: 4, borderRadius: '50%', background: T.surface }}/>}
                      </div>
                      <div className="text-[8px] mt-1 max-w-[44px] text-center" style={{
                        color: isCurrent || isPast ? T.ink2 : T.muted,
                        fontWeight: isCurrent ? 600 : 400,
                      }}>
                        {s.short}
                      </div>
                    </div>
                    {i < PIPELINE_STAGES.length - 1 && (
                      <div className="flex-1" style={{ height: 1.5, background: isPast ? T.ok : T.rule2, marginBottom: 14 }}/>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Assigned to */}
          <div className="mb-5">
            <div className="text-[9.5px] uppercase tracking-[0.16em] mb-2" style={{ color: T.muted, fontWeight: 500 }}>
              Assigned preparer
            </div>
            <div className="flex items-center gap-3 p-3 rounded-[3px]" style={{ background: T.surface2, border: `1px solid ${T.rule}` }}>
              <div
                className="flex items-center justify-center text-[12px]"
                style={{ width: 32, height: 32, borderRadius: '50%', background: preparer.color, color: T.surface, fontWeight: 600 }}
              >
                {preparer.initial}
              </div>
              <div className="flex-1">
                <div className="text-[12.5px]" style={{ color: T.ink, fontWeight: 500 }}>{preparer.name}</div>
                <div className="text-[10.5px]" style={{ color: T.muted }}>{preparer.load}h / {preparer.capacity}h capacity today</div>
              </div>
              <button className="text-[10.5px] px-2.5 py-1 rounded-[2px]" style={{ color: T.ink2, border: `1px solid ${T.rule}` }}>
                Reassign
              </button>
            </div>
          </div>

          {/* Flags */}
          {c.flags.length > 0 && (
            <div className="mb-5">
              <div className="text-[9.5px] uppercase tracking-[0.16em] mb-2" style={{ color: T.muted, fontWeight: 500 }}>
                Flags
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {c.flags.includes('stuck') && <Pill tone="copper"><Snowflake size={9}/> Stuck</Pill>}
                {c.flags.includes('complex') && <Pill tone="med"><Flame size={9}/> Complex</Pill>}
                {c.flags.includes('docs') && <Pill tone="med">Awaiting docs</Pill>}
                {c.flags.includes('cp2000') && <Pill tone="high">IRS CP2000</Pill>}
              </div>
            </div>
          )}

          {/* AI insights */}
          <div className="p-4 rounded-[3px]" style={{ background: T.surface2, border: `1px dashed ${T.copper}` }}>
            <div className="text-[10px] uppercase tracking-[0.16em] flex items-center gap-1.5 mb-2" style={{ color: T.copper, fontWeight: 500 }}>
              <Sparkles size={10}/> AI insights
            </div>
            <ul className="flex flex-col gap-2">
              {[
                isStuck && 'Most likely blocker: missing 2 of 3 requested documents from previous nudge',
                c.flags.includes('cp2000') && 'CP2000 reply must be drafted within 17 days — don\'t let this engagement slip',
                c.risk === 'low' && 'Low risk · should clear pipeline cleanly',
                'Bonneville and Niobrara are similar profiles — batch your prep work',
              ].filter(Boolean).map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-[11.5px]" style={{ color: T.ink2, lineHeight: 1.5 }}>
                  <span className="mt-1.5" style={{ width: 4, height: 4, borderRadius: '50%', background: T.copper, flexShrink: 0 }}/>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sticky footer actions */}
        <div className="px-6 py-4 flex items-center gap-2" style={{ borderTop: `1px solid ${T.rule}`, background: T.surface2 }}>
          <button className="flex-1 text-[12px] py-2 rounded-[3px] flex items-center justify-center gap-1.5" style={{ background: T.primary, color: T.surface, fontWeight: 500 }}>
            Open workspace <ArrowRight size={12}/>
          </button>
          <button className="text-[12px] py-2 px-3 rounded-[3px]" style={{ background: T.surface, color: T.ink2, border: `1px solid ${T.rule}` }}>
            <MessageSquare size={13}/>
          </button>
          <button className="text-[12px] py-2 px-3 rounded-[3px]" style={{ background: T.surface, color: T.ink2, border: `1px solid ${T.rule}` }}>
            <MoreHorizontal size={13}/>
          </button>
        </div>
      </div>
    </>
  );
}

function Stat({ label, value, tone, mono }) {
  const c = tone === 'high' ? T.danger : tone === 'medium' ? T.warn : tone === 'low' ? T.ok : T.ink;
  return (
    <div className="p-3 rounded-[3px]" style={{ background: T.surface2, border: `1px solid ${T.rule}` }}>
      <div className="text-[9.5px] uppercase tracking-[0.14em]" style={{ color: T.muted }}>{label}</div>
      <div
        className="mt-0.5"
        style={{
          fontFamily: mono ? FONT_MONO : FONT_DISPLAY,
          fontSize: mono ? 16 : 22,
          color: c,
          fontStyle: mono ? 'normal' : 'italic',
          letterSpacing: '-0.01em',
          lineHeight: 1.1,
          textTransform: tone ? 'capitalize' : 'none',
        }}
      >
        {value}
      </div>
    </div>
  );
}

/* ============================================================
   APP
   ============================================================ */
export default function App() {
  const [live, setLive] = useState(true);
  const [sound, setSound] = useState(false);
  const [filterPreparer, setFilterPreparer] = useState(null);
  const [selected, setSelected] = useState(null);
  const [lastSync, setLastSync] = useState(0);

  // Heartbeat
  useEffect(() => {
    if (!live) return;
    const t = setInterval(() => {
      setLastSync(s => (s + 3) % 60);
    }, 3000);
    return () => clearInterval(t);
  }, [live]);

  useEffect(() => {
    const id = 'ledger-warroom-fonts';
    if (document.getElementById(id)) return;
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap';
    document.head.appendChild(link);
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-hidden" style={{ background: T.bg, fontFamily: FONT_BODY }}>
      <TopBar live={live} setLive={setLive} sound={sound} setSound={setSound} lastSync={lastSync}/>
      <KpiBar/>

      <div className="flex-1 overflow-y-auto">
        <PipelineBoard filterPreparer={filterPreparer} setSelected={setSelected}/>

        {/* Three-column ops panels */}
        <div className="grid grid-cols-12 gap-5 px-7 pb-5">
          <div className="col-span-4">
            <TeamLoadPanel filterPreparer={filterPreparer} setFilterPreparer={setFilterPreparer}/>
          </div>
          <div className="col-span-4 flex flex-col gap-5">
            <ThroughputPanel/>
            <StuckPanel setSelected={setSelected}/>
          </div>
          <div className="col-span-4">
            <ActivityFeed/>
          </div>
        </div>

        <DeadlineStrip/>

        <div className="text-[10px] uppercase tracking-[0.18em] py-4 text-center" style={{ color: T.faint }}>
          — War Room v4.7 · refreshes every 3 seconds —
        </div>
      </div>

      {/* Drawer */}
      {selected && <ClientDrawer c={selected} onClose={() => setSelected(null)}/>}
    </div>
  );
}
