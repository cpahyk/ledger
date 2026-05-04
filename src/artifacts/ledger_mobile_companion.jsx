import React, { useState, useEffect, useRef } from 'react';
import {
  Home, FileText, MessageSquare, Receipt, User,
  Bell, Camera, Upload, Download, ChevronRight, ChevronLeft,
  ArrowRight, ArrowUp, CheckCircle2, Circle, CircleDot, Clock,
  AlertTriangle, Sparkles, Send, Paperclip, Phone, Mail, Lock,
  Shield, FileSignature, CreditCard, Plus, X, MoreHorizontal,
  Mic, Image as ImageIcon, Smile, ChevronDown, Star,
  TrendingUp, Wifi, Battery, Signal, Search, Settings,
  Eye, Factory, Filter, RefreshCw, Zap,
} from 'lucide-react';

/* ============================================================
   THEME
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
   DATA
   ============================================================ */
const CLIENT = {
  contact: 'Cody Whitman',
  initial: 'CW',
  company: 'Powder River Drilling',
  state:   'WY',
};

const ACTIONS = [
  {
    id: 1, type: 'sign',
    icon: FileSignature,
    title: 'Sign 2026 engagement',
    desc:  'Annual letter, fees unchanged.',
    urgency: 'medium', due: 'Apr 30',
    cta: 'Review & Sign',
  },
  {
    id: 2, type: 'upload',
    icon: Upload,
    title: 'Q1 bank statements',
    desc:  'March 2026 · First Nat\'l ****8421',
    urgency: 'high', due: 'Apr 28',
    cta: 'Snap or Upload',
  },
  {
    id: 3, type: 'review',
    icon: Eye,
    title: 'Confirm rig depreciation',
    desc:  'New $284k drilling rig — your call.',
    urgency: 'medium', due: 'May 5',
    cta: 'Review',
  },
  {
    id: 4, type: 'pay',
    icon: CreditCard,
    title: 'Invoice #INV-2204',
    desc:  'March retainer + Q1 work',
    urgency: 'low', due: 'May 10',
    cta: 'Pay $1,850',
  },
];

const STAGES = [
  { label: 'Engaged',  done: true,  current: false },
  { label: 'Books',    done: true,  current: false },
  { label: 'Docs',     done: false, current: true  },
  { label: 'Drafted',  done: false, current: false },
  { label: 'Review',   done: false, current: false },
  { label: 'Filed',    done: false, current: false },
];

const DOCS = [
  { id:1, name: 'Engagement_Letter_2026.pdf', tag: 'For signature', date: 'Apr 22', from: 'Suresh', highlight: true, size: '94 KB' },
  { id:2, name: 'Depreciation_Compare.pdf',   tag: 'For review',    date: 'Apr 24', from: 'Suresh', highlight: true, size: '186 KB' },
  { id:3, name: '2024_Form_1065_FILED.pdf',   tag: 'Tax return',    date: 'Mar 14', from: 'Suresh', size: '1.2 MB' },
  { id:4, name: 'K1_Whitman_2024.pdf',         tag: 'K-1',           date: 'Mar 14', from: 'Suresh', size: '218 KB' },
  { id:5, name: 'Bank_Stmt_Feb2026.pdf',       tag: 'Bank stmt',     date: 'Mar 12', from: 'You',    size: '604 KB' },
  { id:6, name: 'Bank_Stmt_Jan2026.pdf',       tag: 'Bank stmt',     date: 'Feb 11', from: 'You',    size: '598 KB' },
];

const MESSAGES = [
  { id: 1, who: 'cpa',    text: "Hi Cody — engagement letter is in your portal when you have a sec. Also prepped that depreciation comparison for the new rig.", time: '2:14 PM' },
  { id: 2, who: 'client', text: "Thanks Suresh. Will sign today. For the rig — we're projecting flatter revenue in 2027. Lean toward bonus then?", time: '4:38 PM' },
  { id: 3, who: 'cpa',    text: "Yeah, take the deduction now. I'll lock in 60% bonus on the rig and we keep §179 capacity for smaller equipment. Sending the election memo.", time: '5:02 PM' },
  { id: 4, who: 'client', text: "Perfect. March stmt available end of week, will upload Friday.", time: 'Yesterday' },
];

/* ============================================================
   HELPERS
   ============================================================ */
const cx = (...a) => a.filter(Boolean).join(' ');

function Pill({ children, tone = 'neutral', tiny = false }) {
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
      style={{ background: c.bg, color: c.fg, borderColor: c.bd, fontFamily: FONT_BODY, fontWeight: 500 }}
    >
      {children}
    </span>
  );
}

/* ============================================================
   PHONE FRAME
   ============================================================ */
function PhoneFrame({ children, label }) {
  return (
    <div className="flex flex-col items-center" style={{ fontFamily: FONT_BODY }}>
      <div
        className="relative"
        style={{
          width: 380, height: 800, borderRadius: 54,
          background: '#1a1612',
          padding: 11,
          boxShadow: `
            0 0 0 1.5px #2a221c,
            0 50px 90px -30px rgba(20,15,8,0.45),
            0 25px 50px -20px rgba(20,15,8,0.25),
            inset 0 0 1px rgba(255,253,248,0.08)
          `,
        }}
      >
        {/* side buttons */}
        <div style={{ position: 'absolute', left: -2, top: 130, width: 3, height: 32, background: '#0e0b08', borderRadius: 2 }}/>
        <div style={{ position: 'absolute', left: -2, top: 180, width: 3, height: 56, background: '#0e0b08', borderRadius: 2 }}/>
        <div style={{ position: 'absolute', left: -2, top: 250, width: 3, height: 56, background: '#0e0b08', borderRadius: 2 }}/>
        <div style={{ position: 'absolute', right: -2, top: 200, width: 3, height: 80, background: '#0e0b08', borderRadius: 2 }}/>

        {/* screen */}
        <div
          className="relative overflow-hidden flex flex-col"
          style={{
            width: '100%', height: '100%', borderRadius: 44,
            background: T.bg, color: T.ink,
          }}
        >
          {/* dynamic island */}
          <div
            style={{
              position: 'absolute', left: '50%', top: 10, transform: 'translateX(-50%)',
              width: 110, height: 32, background: '#000', borderRadius: 999, zIndex: 50,
            }}
          />

          {/* status bar */}
          <div
            className="flex items-center justify-between px-7"
            style={{ height: 50, paddingTop: 12, fontFamily: FONT_BODY, color: T.ink, fontSize: 13, fontWeight: 600, position: 'relative', zIndex: 40 }}
          >
            <span style={{ letterSpacing: '-0.01em' }}>9:41</span>
            <div className="flex items-center gap-1">
              <Signal size={13} strokeWidth={2.5}/>
              <Wifi   size={13} strokeWidth={2.5}/>
              <Battery size={16} strokeWidth={2}/>
            </div>
          </div>

          {/* content */}
          {children}
        </div>
      </div>
      <div className="mt-4 text-[10.5px] uppercase tracking-[0.18em]" style={{ color: T.muted }}>
        {label}
      </div>
    </div>
  );
}

/* ============================================================
   BOTTOM TAB BAR
   ============================================================ */
function TabBar({ active, setActive }) {
  const tabs = [
    { id: 'home',     icon: Home,           label: 'Home' },
    { id: 'docs',     icon: FileText,       label: 'Docs' },
    { id: 'upload',   icon: Plus,           label: '',     center: true },
    { id: 'messages', icon: MessageSquare,  label: 'Chat', badge: 1 },
    { id: 'me',       icon: User,           label: 'Me' },
  ];
  return (
    <div
      className="flex items-end justify-around px-4"
      style={{
        height: 88, paddingBottom: 24,
        background: 'rgba(255,253,248,0.92)',
        backdropFilter: 'blur(20px)',
        borderTop: `1px solid ${T.rule}`,
        fontFamily: FONT_BODY,
      }}
    >
      {tabs.map(tab => {
        const Icon = tab.icon;
        const isActive = active === tab.id;
        if (tab.center) {
          return (
            <button
              key={tab.id}
              onClick={() => setActive('upload')}
              className="flex items-center justify-center"
              style={{
                width: 52, height: 52, borderRadius: '50%',
                background: T.primary, color: T.surface,
                marginBottom: 10,
                boxShadow: `0 8px 18px -4px ${T.primary}66`,
              }}
            >
              <Camera size={20} strokeWidth={2}/>
            </button>
          );
        }
        return (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className="flex flex-col items-center gap-0.5 relative"
            style={{ flex: 1, color: isActive ? T.primary : T.muted, paddingBottom: 6 }}
          >
            <div className="relative">
              <Icon size={20} strokeWidth={isActive ? 2 : 1.6}/>
              {tab.badge && (
                <span
                  className="absolute flex items-center justify-center"
                  style={{
                    top: -4, right: -7, minWidth: 14, height: 14, borderRadius: 999,
                    background: T.copper, color: T.surface, fontSize: 9, fontWeight: 600,
                    border: `1.5px solid ${T.surface}`,
                  }}
                >
                  {tab.badge}
                </span>
              )}
            </div>
            <span className="text-[9.5px]" style={{ fontWeight: isActive ? 600 : 400 }}>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ============================================================
   HOME SCREEN
   ============================================================ */
function HomeScreen({ setActive, openSheet }) {
  return (
    <>
      {/* scroll body */}
      <div className="flex-1 overflow-y-auto">
        {/* header */}
        <div className="px-6 pt-2 pb-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[10.5px] uppercase tracking-[0.18em]" style={{ color: T.muted }}>Saturday · Apr 25</div>
              <h1
                style={{
                  fontFamily: FONT_DISPLAY, fontSize: 32, lineHeight: 1.0,
                  letterSpacing: '-0.02em', color: T.ink, fontStyle: 'italic',
                  marginTop: 2,
                }}
              >
                Hi, Cody.
              </h1>
            </div>
            <button
              className="flex items-center justify-center relative"
              style={{
                width: 38, height: 38, borderRadius: '50%',
                background: T.surface, border: `1px solid ${T.rule}`,
              }}
            >
              <Bell size={15} style={{ color: T.ink2 }}/>
              <span
                style={{
                  position: 'absolute', top: 8, right: 9,
                  width: 7, height: 7, borderRadius: '50%',
                  background: T.copper, border: `1.5px solid ${T.surface}`,
                }}
              />
            </button>
          </div>
        </div>

        {/* hero status card */}
        <div className="px-4">
          <div
            className="relative overflow-hidden p-5 rounded-[16px]"
            style={{
              background: `linear-gradient(135deg, ${T.primary} 0%, ${T.primary2} 65%, #1F6B65 100%)`,
              color: T.surface,
            }}
          >
            <div
              aria-hidden
              style={{
                position: 'absolute', right: -40, top: -40, width: 160, height: 160,
                border: `1px solid rgba(255,253,248,0.10)`, borderRadius: '50%',
              }}
            />
            <div
              aria-hidden
              style={{
                position: 'absolute', right: -10, bottom: -50, width: 100, height: 100,
                border: `1px solid rgba(255,253,248,0.08)`, borderRadius: '50%',
              }}
            />
            <div className="text-[9px] uppercase tracking-[0.18em] flex items-center gap-1.5" style={{ color: T.copperLt }}>
              <span className="w-1 h-1 rounded-full" style={{ background: T.copperLt }}/>
              2025 Form 1065 · on track
            </div>
            <div
              className="mt-2 relative"
              style={{
                fontFamily: FONT_DISPLAY, fontSize: 22, lineHeight: 1.15,
                letterSpacing: '-0.015em', fontStyle: 'italic',
              }}
            >
              4 things need<br/>your attention.
            </div>
            <button
              onClick={() => setActive('home')}
              className="mt-4 px-3 py-2 text-[12px] flex items-center gap-1.5 rounded-[3px] relative"
              style={{ background: T.copper, color: T.surface, fontWeight: 500, fontFamily: FONT_BODY }}
            >
              View all <ChevronRight size={12}/>
            </button>
          </div>
        </div>

        {/* engagement progress */}
        <div className="px-6 mt-6">
          <div className="flex items-center justify-between mb-3">
            <div className="text-[9.5px] uppercase tracking-[0.16em]" style={{ color: T.muted }}>Where we are</div>
            <Pill tone="primary" tiny>3 of 6</Pill>
          </div>
          <div className="flex items-center gap-1">
            {STAGES.map((s, i) => (
              <React.Fragment key={s.label}>
                <div className="flex flex-col items-center" style={{ flex: '0 0 auto' }}>
                  <div
                    className="rounded-full flex items-center justify-center"
                    style={{
                      width: 18, height: 18,
                      background: s.done ? T.ok : s.current ? T.copper : T.surface,
                      border: `1.5px solid ${s.done ? T.ok : s.current ? T.copper : T.rule2}`,
                    }}
                  >
                    {s.done && <CheckCircle2 size={11} style={{ color: T.surface }} strokeWidth={3}/>}
                    {s.current && <span style={{ width: 5, height: 5, borderRadius: '50%', background: T.surface }}/>}
                  </div>
                  <div
                    className="text-[8.5px] mt-1.5"
                    style={{
                      color: s.done || s.current ? T.ink2 : T.muted,
                      fontWeight: s.current ? 600 : 400,
                      letterSpacing: '0.02em',
                    }}
                  >
                    {s.label}
                  </div>
                </div>
                {i < STAGES.length - 1 && (
                  <div
                    className="flex-1"
                    style={{
                      height: 2,
                      background: s.done ? T.ok : T.rule2,
                      marginBottom: 18,
                    }}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* action items */}
        <div className="px-4 mt-7">
          <div className="px-2 mb-3 flex items-center justify-between">
            <div>
              <div className="text-[9.5px] uppercase tracking-[0.16em]" style={{ color: T.muted }}>Your queue</div>
              <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 22, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.01em', lineHeight: 1.1, marginTop: 1 }}>
                What I need from you
              </h2>
            </div>
            <Pill tone="copper" tiny>{ACTIONS.length}</Pill>
          </div>
          <div className="flex flex-col gap-2.5">
            {ACTIONS.map(a => {
              const Icon = a.icon;
              const onTap =
                a.type === 'sign'   ? () => openSheet('sign') :
                a.type === 'upload' ? () => openSheet('upload') :
                a.type === 'pay'    ? () => openSheet('pay') :
                                       () => openSheet('review');
              return (
                <button
                  key={a.id}
                  onClick={onTap}
                  className="flex items-start gap-3 p-3.5 rounded-[12px] text-left"
                  style={{
                    background: T.surface, border: `1px solid ${T.rule}`,
                  }}
                >
                  <div
                    className="flex items-center justify-center shrink-0"
                    style={{
                      width: 36, height: 36, borderRadius: 9,
                      background: a.urgency === 'high' ? T.copper : T.primary,
                      color: T.surface,
                    }}
                  >
                    <Icon size={15} strokeWidth={2}/>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px]" style={{ color: T.ink, fontWeight: 500, lineHeight: 1.3 }}>
                      {a.title}
                    </div>
                    <div className="text-[11px] mt-1 leading-[1.4]" style={{ color: T.muted }}>
                      {a.desc}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Pill tone={a.urgency === 'high' ? 'high' : a.urgency === 'medium' ? 'med' : 'low'} tiny>{a.urgency}</Pill>
                      <span className="text-[10px]" style={{ color: T.muted, fontFamily: FONT_MONO }}>Due {a.due}</span>
                    </div>
                  </div>
                  <ChevronRight size={15} style={{ color: T.faint, marginTop: 3 }}/>
                </button>
              );
            })}
          </div>
        </div>

        {/* CPA card */}
        <div className="px-4 mt-7 mb-7">
          <div
            className="p-4 rounded-[12px] flex items-center gap-3"
            style={{ background: T.surface, border: `1px solid ${T.rule}` }}
          >
            <div
              className="flex items-center justify-center text-[14px] shrink-0"
              style={{ width: 48, height: 48, borderRadius: '50%', background: T.copper, color: T.surface, fontWeight: 600 }}
            >
              SP
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[12.5px]" style={{ color: T.ink, fontWeight: 500 }}>Suresh Patel, EA</div>
              <div className="text-[10.5px]" style={{ color: T.muted }}>HYK Tax · usually replies in 2hr</div>
            </div>
            <button
              onClick={() => setActive('messages')}
              className="flex items-center justify-center"
              style={{ width: 38, height: 38, borderRadius: '50%', background: T.primary, color: T.surface }}
            >
              <MessageSquare size={15}/>
            </button>
            <button
              className="flex items-center justify-center"
              style={{ width: 38, height: 38, borderRadius: '50%', background: T.surface2, color: T.primary, border: `1px solid ${T.rule}` }}
            >
              <Phone size={14}/>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

/* ============================================================
   DOCS SCREEN
   ============================================================ */
function DocsScreen({ openSheet }) {
  const [tab, setTab] = useState('all');
  const filters = [
    ['all',    'All',        DOCS.length],
    ['action', 'Action',     DOCS.filter(d => d.highlight).length],
    ['mine',   'Mine',       DOCS.filter(d => d.from === 'You').length],
    ['cpa',    'From Suresh',DOCS.filter(d => d.from === 'Suresh').length],
  ];
  const visible =
    tab === 'all'    ? DOCS :
    tab === 'action' ? DOCS.filter(d => d.highlight) :
    tab === 'mine'   ? DOCS.filter(d => d.from === 'You') :
                       DOCS.filter(d => d.from === 'Suresh');

  return (
    <div className="flex-1 overflow-y-auto">
      {/* header */}
      <div className="px-6 pt-2 pb-3">
        <div className="text-[10.5px] uppercase tracking-[0.18em]" style={{ color: T.muted }}>
          Encrypted vault
        </div>
        <h1
          style={{
            fontFamily: FONT_DISPLAY, fontSize: 32, lineHeight: 1.0,
            letterSpacing: '-0.02em', color: T.ink, fontStyle: 'italic', marginTop: 2,
          }}
        >
          Documents
        </h1>
      </div>

      {/* search */}
      <div className="px-4 mb-3">
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-[10px]"
          style={{ background: T.surface, border: `1px solid ${T.rule}` }}
        >
          <Search size={14} style={{ color: T.muted }}/>
          <span className="text-[12px]" style={{ color: T.faint }}>Search files…</span>
        </div>
      </div>

      {/* filter chips */}
      <div className="px-4 mb-3 flex items-center gap-1.5 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        {filters.map(([k, v, n]) => (
          <button
            key={k}
            onClick={() => setTab(k)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-[8px] whitespace-nowrap"
            style={{
              background: tab === k ? T.primary : T.surface,
              color:      tab === k ? T.surface : T.ink2,
              border: `1px solid ${T.rule}`,
              fontSize: 11.5, fontWeight: tab === k ? 500 : 400,
            }}
          >
            {v}
            <span style={{ opacity: 0.7, fontFamily: FONT_MONO, fontSize: 10 }}>{n}</span>
          </button>
        ))}
      </div>

      {/* upload prompt card */}
      <div className="px-4 mb-3">
        <button
          onClick={() => openSheet('upload')}
          className="w-full flex items-center gap-3 p-3 rounded-[12px] text-left"
          style={{ background: T.surface2, border: `1px dashed ${T.rule2}` }}
        >
          <div
            className="flex items-center justify-center shrink-0"
            style={{ width: 36, height: 36, borderRadius: '50%', background: T.surface, border: `1px solid ${T.rule}` }}
          >
            <Camera size={15} style={{ color: T.copper }}/>
          </div>
          <div className="flex-1">
            <div className="text-[12.5px]" style={{ color: T.ink, fontWeight: 500 }}>Snap a doc, send to Suresh</div>
            <div className="text-[10.5px]" style={{ color: T.muted }}>AI sorts & categorizes automatically</div>
          </div>
          <ChevronRight size={14} style={{ color: T.faint }}/>
        </button>
      </div>

      {/* doc list */}
      <div className="px-4 flex flex-col gap-2 pb-4">
        {visible.map(d => (
          <div
            key={d.id}
            className="flex items-center gap-3 p-3 rounded-[12px]"
            style={{
              background: T.surface,
              border: `1px solid ${T.rule}`,
              borderLeft: `3px solid ${d.highlight ? T.copper : 'transparent'}`,
            }}
          >
            <div
              className="flex items-center justify-center shrink-0"
              style={{ width: 38, height: 44, background: T.surface2, border: `1px solid ${T.rule}`, borderRadius: 4 }}
            >
              <FileText size={15} style={{ color: T.primary }}/>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <Pill tone={d.tag === 'For signature' || d.tag === 'For review' ? 'copper' : 'primary'} tiny>{d.tag}</Pill>
              </div>
              <div className="text-[11.5px] truncate" style={{ color: T.ink, fontFamily: FONT_MONO }}>{d.name}</div>
              <div className="flex items-center gap-2 mt-1 text-[10px]" style={{ color: T.muted }}>
                <span>{d.from}</span>
                <span>·</span>
                <span style={{ fontFamily: FONT_MONO }}>{d.date}</span>
                <span>·</span>
                <span style={{ fontFamily: FONT_MONO }}>{d.size}</span>
              </div>
            </div>
            <button
              className="flex items-center justify-center shrink-0"
              style={{ width: 32, height: 32, borderRadius: 8, background: T.surface2, border: `1px solid ${T.rule}` }}
            >
              <MoreHorizontal size={14} style={{ color: T.muted }}/>
            </button>
          </div>
        ))}
      </div>

      <div className="px-6 pb-4 flex items-center justify-center gap-1.5 text-[9.5px]" style={{ color: T.muted }}>
        <Lock size={10}/> 256-bit encrypted · audit log on every access
      </div>
    </div>
  );
}

/* ============================================================
   MESSAGES SCREEN
   ============================================================ */
function MessagesScreen({ goBack }) {
  const [draft, setDraft] = useState('');
  const [thread, setThread] = useState(MESSAGES);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [thread]);

  const send = () => {
    if (!draft.trim()) return;
    setThread(t => [...t, { id: Date.now(), who: 'client', text: draft, time: 'now' }]);
    setDraft('');
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* header */}
      <div
        className="px-4 pt-2 pb-3 flex items-center gap-3"
        style={{ borderBottom: `1px solid ${T.rule}`, background: T.surface }}
      >
        <button
          onClick={goBack}
          className="flex items-center justify-center"
          style={{ width: 32, height: 32, borderRadius: '50%', background: T.surface2, border: `1px solid ${T.rule}` }}
        >
          <ChevronLeft size={16} style={{ color: T.ink2 }}/>
        </button>
        <div
          className="flex items-center justify-center text-[12px] shrink-0"
          style={{ width: 36, height: 36, borderRadius: '50%', background: T.copper, color: T.surface, fontWeight: 600 }}
        >SP</div>
        <div className="flex-1 min-w-0">
          <div className="text-[13px]" style={{ color: T.ink, fontWeight: 500 }}>Suresh Patel, EA</div>
          <div className="text-[10.5px] flex items-center gap-1.5" style={{ color: T.muted }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: T.ok }}/>
            Online · replies in 2hr
          </div>
        </div>
        <button
          className="flex items-center justify-center"
          style={{ width: 36, height: 36, borderRadius: '50%', background: T.surface2, border: `1px solid ${T.rule}` }}
        >
          <Phone size={14} style={{ color: T.primary }}/>
        </button>
      </div>

      {/* messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-2.5" style={{ background: T.bg }}>
        <div className="text-center text-[10px] uppercase tracking-[0.18em] py-2" style={{ color: T.faint }}>
          Yesterday
        </div>
        {thread.map(m => {
          const isClient = m.who === 'client';
          return (
            <div key={m.id} className={cx('flex items-end gap-1.5', isClient ? 'justify-end' : 'justify-start')}>
              {!isClient && (
                <div
                  className="flex items-center justify-center text-[9px] shrink-0"
                  style={{ width: 22, height: 22, borderRadius: '50%', background: T.copper, color: T.surface, fontWeight: 600 }}
                >SP</div>
              )}
              <div
                className="max-w-[75%] px-3.5 py-2.5 text-[12.5px] rounded-[18px]"
                style={{
                  background: isClient ? T.primary : T.surface,
                  color: isClient ? T.surface : T.ink,
                  border: isClient ? 'none' : `1px solid ${T.rule}`,
                  borderBottomRightRadius: isClient ? 6 : 18,
                  borderBottomLeftRadius:  isClient ? 18 : 6,
                  lineHeight: 1.5,
                }}
              >
                {m.text}
                <div
                  className="text-[9.5px] mt-1"
                  style={{
                    color: isClient ? 'rgba(255,253,248,0.6)' : T.muted,
                    fontFamily: FONT_MONO,
                  }}
                >
                  {m.time}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={endRef}/>
      </div>

      {/* compose */}
      <div
        className="px-3 py-3 flex items-end gap-2"
        style={{ borderTop: `1px solid ${T.rule}`, background: T.surface }}
      >
        <button
          className="flex items-center justify-center shrink-0"
          style={{ width: 36, height: 36, borderRadius: '50%', background: T.surface2, border: `1px solid ${T.rule}` }}
        >
          <Plus size={15} style={{ color: T.ink2 }}/>
        </button>
        <div
          className="flex-1 flex items-center gap-2 px-3 py-2 rounded-[18px]"
          style={{ background: T.surface2, border: `1px solid ${T.rule}` }}
        >
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
            placeholder="Message Suresh…"
            className="flex-1 bg-transparent outline-none text-[12.5px]"
            style={{ color: T.ink }}
          />
          <Smile size={15} style={{ color: T.muted }}/>
        </div>
        <button
          onClick={draft.trim() ? send : undefined}
          className="flex items-center justify-center shrink-0"
          style={{
            width: 36, height: 36, borderRadius: '50%',
            background: draft.trim() ? T.primary : T.surface2,
            color: draft.trim() ? T.surface : T.muted,
            border: draft.trim() ? 'none' : `1px solid ${T.rule}`,
          }}
        >
          {draft.trim() ? <Send size={14}/> : <Mic size={15}/>}
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   ME / PROFILE SCREEN
   ============================================================ */
function MeScreen() {
  const items = [
    { i: User,        l: 'Account & business info' },
    { i: Shield,      l: 'Security & 2FA',         tag: 'On' },
    { i: Bell,        l: 'Notifications' },
    { i: CreditCard,  l: 'Payment methods' },
    { i: FileText,    l: 'Tax documents archive' },
    { i: Settings,    l: 'Preferences' },
  ];

  return (
    <div className="flex-1 overflow-y-auto pb-4">
      <div className="px-6 pt-2 pb-4">
        <div className="text-[10.5px] uppercase tracking-[0.18em]" style={{ color: T.muted }}>Profile</div>
        <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: 32, lineHeight: 1.0, letterSpacing: '-0.02em', color: T.ink, fontStyle: 'italic', marginTop: 2 }}>
          Account
        </h1>
      </div>

      {/* profile card */}
      <div className="px-4 mb-5">
        <div
          className="p-5 rounded-[16px] flex items-center gap-4"
          style={{ background: T.surface, border: `1px solid ${T.rule}` }}
        >
          <div
            className="flex items-center justify-center text-[18px] shrink-0"
            style={{ width: 56, height: 56, borderRadius: '50%', background: T.primary, color: T.surface, fontWeight: 600 }}
          >
            {CLIENT.initial}
          </div>
          <div className="flex-1 min-w-0">
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 20, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.01em', lineHeight: 1.05 }}>
              {CLIENT.contact}
            </div>
            <div className="text-[11.5px] mt-1" style={{ color: T.ink2 }}>{CLIENT.company}</div>
            <div className="flex items-center gap-2 mt-1.5">
              <Pill tone="primary" tiny>WY · 1065</Pill>
              <span className="text-[10px]" style={{ color: T.muted }}>Client since Aug 2024</span>
            </div>
          </div>
        </div>
      </div>

      {/* tax picture mini-card */}
      <div className="px-4 mb-5">
        <div
          className="p-4 rounded-[16px] relative overflow-hidden"
          style={{ background: T.primary, color: T.surface }}
        >
          <div
            aria-hidden
            style={{
              position: 'absolute', right: -30, top: -30, width: 110, height: 110,
              border: `1px solid rgba(255,253,248,0.10)`, borderRadius: '50%',
            }}
          />
          <div className="relative flex items-center justify-between">
            <div>
              <div className="text-[9px] uppercase tracking-[0.18em] flex items-center gap-1.5" style={{ color: T.copperLt }}>
                <Sparkles size={9}/> Tax Picture
              </div>
              <div className="mt-2" style={{ fontFamily: FONT_DISPLAY, fontSize: 28, fontStyle: 'italic', letterSpacing: '-0.02em', lineHeight: 1 }}>
                $42,100
              </div>
              <div className="text-[10.5px] mt-1" style={{ color: 'rgba(255,253,248,0.7)' }}>
                est. 2025 federal liability
              </div>
            </div>

            {/* tiny bar chart */}
            <svg width="100" height="56" viewBox="0 0 100 56">
              {[
                { x: 0,  h: 28, y: 28, c: 'rgba(255,253,248,0.4)' },
                { x: 22, h: 36, y: 20, c: 'rgba(255,253,248,0.55)' },
                { x: 44, h: 44, y: 12, c: 'rgba(255,253,248,0.7)' },
                { x: 66, h: 50, y: 6,  c: T.copperLt },
              ].map((b, i) => (
                <rect key={i} x={b.x} y={b.y} width={16} height={b.h} fill={b.c} rx={2}/>
              ))}
              <text x={8}  y={54} fontSize={7} fill="rgba(255,253,248,0.5)" fontFamily={FONT_MONO}>'22</text>
              <text x={30} y={54} fontSize={7} fill="rgba(255,253,248,0.5)" fontFamily={FONT_MONO}>'23</text>
              <text x={52} y={54} fontSize={7} fill="rgba(255,253,248,0.5)" fontFamily={FONT_MONO}>'24</text>
              <text x={74} y={54} fontSize={7} fill={T.copperLt}            fontFamily={FONT_MONO}>'25</text>
            </svg>
          </div>
          <button className="mt-3 text-[11px] flex items-center gap-1" style={{ color: T.copperLt }}>
            View full breakdown <ArrowRight size={11}/>
          </button>
        </div>
      </div>

      {/* settings list */}
      <div className="px-4">
        <div
          className="rounded-[16px] overflow-hidden"
          style={{ background: T.surface, border: `1px solid ${T.rule}` }}
        >
          {items.map((it, i) => {
            const Icon = it.i;
            return (
              <div
                key={it.l}
                className="flex items-center gap-3 px-4 py-3"
                style={{ borderBottom: i < items.length - 1 ? `1px solid ${T.rule}` : 'none' }}
              >
                <div
                  className="flex items-center justify-center shrink-0"
                  style={{ width: 30, height: 30, borderRadius: 8, background: T.surface2, border: `1px solid ${T.rule}` }}
                >
                  <Icon size={13} style={{ color: T.primary }}/>
                </div>
                <span className="flex-1 text-[12.5px]" style={{ color: T.ink }}>{it.l}</span>
                {it.tag && <Pill tone="low" tiny>{it.tag}</Pill>}
                <ChevronRight size={14} style={{ color: T.faint }}/>
              </div>
            );
          })}
        </div>
      </div>

      <div className="px-6 mt-6 text-center text-[10px]" style={{ color: T.muted }}>
        Ledger v4.7 · iOS 18.4
      </div>
    </div>
  );
}

/* ============================================================
   BOTTOM SHEETS
   ============================================================ */
function Sheet({ open, onClose, height = 540, children }) {
  if (!open) return null;
  return (
    <div
      className="absolute inset-0 flex items-end z-30"
      style={{ background: 'rgba(20,15,8,0.45)' }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full overflow-hidden flex flex-col"
        style={{
          background: T.surface, height,
          borderTopLeftRadius: 24, borderTopRightRadius: 24,
          boxShadow: '0 -10px 30px -10px rgba(20,15,8,0.18)',
        }}
      >
        {/* grabber */}
        <div className="flex justify-center pt-3 pb-1">
          <div style={{ width: 40, height: 4, borderRadius: 2, background: T.rule2 }}/>
        </div>
        {children}
      </div>
    </div>
  );
}

/* ----- SIGN SHEET ----- */
function SignSheet({ open, onClose }) {
  const [name, setName] = useState('');
  const [agree, setAgree] = useState(false);
  const [signed, setSigned] = useState(false);

  useEffect(() => {
    if (!open) {
      setName(''); setAgree(false); setSigned(false);
    }
  }, [open]);

  return (
    <Sheet open={open} onClose={onClose} height={680}>
      <div className="px-5 pt-2 pb-3 flex items-center justify-between" style={{ borderBottom: `1px solid ${T.rule}` }}>
        <div className="flex items-center gap-2">
          <FileSignature size={15} style={{ color: T.copper }}/>
          <span className="text-[13px]" style={{ color: T.ink, fontWeight: 500 }}>2026 Engagement</span>
        </div>
        <button onClick={onClose} className="p-1"><X size={16} style={{ color: T.muted }}/></button>
      </div>

      {!signed ? (
        <>
          {/* doc preview */}
          <div className="flex-1 overflow-y-auto px-5 py-5" style={{ background: T.surface2 }}>
            <div
              className="p-5 rounded-[6px]"
              style={{ background: T.surface, border: `1px solid ${T.rule}`, fontFamily: FONT_DISPLAY }}
            >
              <div className="text-center text-[14px] italic" style={{ letterSpacing: '-0.01em', color: T.ink }}>HYK Tax</div>
              <div className="text-center text-[8px] uppercase tracking-[0.18em] mt-1" style={{ color: T.muted, fontFamily: FONT_BODY }}>
                Suresh Patel, EA
              </div>
              <div style={{ height: 1, width: '100%', background: T.rule, margin: '12px 0' }}/>
              <h3 className="italic" style={{ fontSize: 16, marginTop: 6, color: T.ink }}>
                Engagement Letter — TY 2026
              </h3>
              <div className="text-[10.5px] mt-3 leading-[1.55]" style={{ color: T.ink2, fontFamily: FONT_BODY }}>
                <p>This letter confirms our engagement to provide tax preparation, advisory, and IRS representation services to Powder River Drilling LLC for tax year ending December 31, 2026.</p>
                <p className="mt-2"><span style={{ color: T.ink, fontWeight: 500 }}>Scope.</span> Federal Form 1065; partner K-1s; quarterly estimated tax planning; payroll filings; bookkeeping oversight.</p>
                <p className="mt-2"><span style={{ color: T.ink, fontWeight: 500 }}>Fees.</span> $1,850 monthly retainer. Out-of-scope work billed separately.</p>
                <p className="mt-2"><span style={{ color: T.ink, fontWeight: 500 }}>Term.</span> Jan 1 – Dec 31, 2026 with 30-day notice.</p>
              </div>
            </div>
          </div>

          {/* sign panel */}
          <div className="px-5 py-4" style={{ borderTop: `1px solid ${T.rule}` }}>
            <button
              onClick={() => setAgree(a => !a)}
              className="flex items-start gap-2.5 mb-3 text-left w-full"
            >
              <div
                className="flex items-center justify-center mt-0.5 shrink-0"
                style={{
                  width: 18, height: 18, borderRadius: 4,
                  background: agree ? T.primary : T.surface,
                  border: `1.5px solid ${agree ? T.primary : T.rule2}`,
                }}
              >
                {agree && <CheckCircle2 size={11} style={{ color: T.surface }} strokeWidth={3}/>}
              </div>
              <span className="text-[11px]" style={{ color: T.ink2, lineHeight: 1.4 }}>
                I have read and agree to this engagement letter. My e-signature has the same legal effect as a wet-ink signature.
              </span>
            </button>
            <div className="text-[9px] uppercase tracking-[0.14em] mb-1.5" style={{ color: T.muted }}>
              Type your full legal name
            </div>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Cody R. Whitman"
              className="w-full px-3 py-2.5 outline-none rounded-[8px]"
              style={{
                background: T.surface2, border: `1px solid ${T.rule}`,
                fontFamily: FONT_DISPLAY, fontSize: 22, fontStyle: 'italic', color: T.ink,
                letterSpacing: '-0.01em',
              }}
            />
            <button
              onClick={() => agree && name.trim() && setSigned(true)}
              disabled={!agree || !name.trim()}
              className="w-full mt-3 py-3 text-[13px] rounded-[10px] flex items-center justify-center gap-2"
              style={{
                background: agree && name.trim() ? T.primary : T.faint,
                color: T.surface, fontWeight: 500,
                opacity: agree && name.trim() ? 1 : 0.6,
              }}
            >
              <FileSignature size={14}/> Sign Document
            </button>
            <div className="flex items-center justify-center gap-1.5 mt-3 text-[9.5px]" style={{ color: T.muted }}>
              <Lock size={10}/> ESIGN Act compliant · IP & timestamp logged
            </div>
          </div>
        </>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center px-6 gap-4">
          <div className="flex items-center justify-center" style={{ width: 64, height: 64, borderRadius: '50%', background: '#E2EBE3' }}>
            <CheckCircle2 size={28} style={{ color: T.ok }} strokeWidth={2.5}/>
          </div>
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 28, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.01em', textAlign: 'center', lineHeight: 1.05 }}>
            Signed and sealed.
          </div>
          <div className="text-[12px] text-center px-4" style={{ color: T.muted, lineHeight: 1.5 }}>
            A countersigned copy will appear in your Documents tab in a few minutes. Suresh has been notified.
          </div>
          <button
            onClick={onClose}
            className="mt-2 px-5 py-2.5 text-[13px] rounded-[10px]"
            style={{ background: T.primary, color: T.surface, fontWeight: 500 }}
          >
            Back to Home
          </button>
        </div>
      )}
    </Sheet>
  );
}

/* ----- UPLOAD SHEET ----- */
function UploadSheet({ open, onClose }) {
  const [stage, setStage] = useState('pick'); // pick | scanning | done
  const [tag, setTag] = useState(null);

  useEffect(() => {
    if (!open) {
      setStage('pick'); setTag(null);
    }
  }, [open]);

  const startCapture = () => {
    setStage('scanning');
    setTimeout(() => {
      setTag('Bank Statement');
      setStage('done');
    }, 1700);
  };

  return (
    <Sheet open={open} onClose={onClose} height={520}>
      <div className="px-5 pt-2 pb-3 flex items-center justify-between" style={{ borderBottom: `1px solid ${T.rule}` }}>
        <div className="flex items-center gap-2">
          <Camera size={15} style={{ color: T.copper }}/>
          <span className="text-[13px]" style={{ color: T.ink, fontWeight: 500 }}>Upload to Suresh</span>
        </div>
        <button onClick={onClose} className="p-1"><X size={16} style={{ color: T.muted }}/></button>
      </div>

      {stage === 'pick' && (
        <div className="flex-1 px-5 py-5">
          <div className="text-[11px] uppercase tracking-[0.16em] mb-3" style={{ color: T.muted }}>Choose source</div>
          <div className="flex flex-col gap-2.5">
            {[
              { i: Camera,    t: 'Take a photo',           d: 'Best for paper docs · auto-crop' },
              { i: ImageIcon, t: 'From photo library',     d: 'Pick existing photos' },
              { i: FileText,  t: 'Browse files',            d: 'PDF, Excel, CSV from cloud storage' },
            ].map((o, i) => {
              const Icon = o.i;
              return (
                <button
                  key={i}
                  onClick={i === 0 ? startCapture : undefined}
                  className="flex items-center gap-3 p-3 rounded-[12px] text-left"
                  style={{ background: T.surface2, border: `1px solid ${T.rule}` }}
                >
                  <div
                    className="flex items-center justify-center shrink-0"
                    style={{ width: 40, height: 40, borderRadius: 10, background: T.surface, border: `1px solid ${T.rule}` }}
                  >
                    <Icon size={16} style={{ color: T.primary }}/>
                  </div>
                  <div className="flex-1">
                    <div className="text-[13px]" style={{ color: T.ink, fontWeight: 500 }}>{o.t}</div>
                    <div className="text-[10.5px]" style={{ color: T.muted }}>{o.d}</div>
                  </div>
                  <ChevronRight size={14} style={{ color: T.faint }}/>
                </button>
              );
            })}
          </div>

          <div className="mt-5 p-3 rounded-[10px] flex items-start gap-2" style={{ background: T.surface2, border: `1px dashed ${T.rule2}` }}>
            <Sparkles size={13} style={{ color: T.copper, marginTop: 1, flexShrink: 0 }}/>
            <div className="text-[11px]" style={{ color: T.ink2, lineHeight: 1.5 }}>
              Don't bother labeling — the AI sorts bank statements, W-9s, invoices, and 1099s automatically.
            </div>
          </div>
        </div>
      )}

      {stage === 'scanning' && (
        <div className="flex-1 flex flex-col items-center justify-center px-6 gap-4">
          <div
            className="flex items-center justify-center relative"
            style={{ width: 80, height: 80, borderRadius: '50%', background: T.surface2 }}
          >
            <span
              className="absolute"
              style={{
                width: 80, height: 80, borderRadius: '50%',
                border: `2px solid ${T.copper}`,
                animation: 'lp 1.4s ease-in-out infinite',
              }}
            />
            <Sparkles size={28} style={{ color: T.copper }}/>
          </div>
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 22, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.01em' }}>
            AI reading your doc…
          </div>
          <div className="text-[11.5px] text-center px-4" style={{ color: T.muted, lineHeight: 1.5 }}>
            Extracting account numbers, dates, and amounts. Routing to the right folder.
          </div>
          <style>{`@keyframes lp { 0%,100%{transform:scale(1);opacity:0.6} 50%{transform:scale(1.15);opacity:0.1} }`}</style>
        </div>
      )}

      {stage === 'done' && (
        <div className="flex-1 flex flex-col px-5 py-5">
          <div className="flex items-start gap-3 p-3.5 rounded-[12px]" style={{ background: T.surface2, border: `1px solid ${T.rule}` }}>
            <div
              className="flex items-center justify-center shrink-0"
              style={{ width: 38, height: 44, background: T.surface, border: `1px solid ${T.rule}`, borderRadius: 4 }}
            >
              <FileText size={15} style={{ color: T.primary }}/>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[11.5px] truncate" style={{ color: T.ink, fontFamily: FONT_MONO }}>
                BHL_bank_stmt_Mar2026.pdf
              </div>
              <div className="flex items-center gap-2 mt-1.5">
                <Pill tone="primary" tiny>{tag}</Pill>
                <span className="text-[9.5px]" style={{ color: T.ok, fontFamily: FONT_MONO }}>98% confidence</span>
              </div>
            </div>
            <CheckCircle2 size={16} style={{ color: T.ok, marginTop: 2 }}/>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            {[
              ['Account', '****8421'],
              ['Period',  'Mar 1–31'],
              ['In',      '$84,200'],
              ['Out',     '$71,840'],
            ].map(([k, v]) => (
              <div key={k} className="p-2.5 rounded-[8px]" style={{ background: T.surface2, border: `1px dashed ${T.rule2}` }}>
                <div className="text-[8.5px] uppercase tracking-[0.14em]" style={{ color: T.muted }}>{k}</div>
                <div className="text-[12px] mt-0.5" style={{ color: T.ink, fontFamily: FONT_MONO }}>{v}</div>
              </div>
            ))}
          </div>

          <div className="text-[11px] mt-4" style={{ color: T.muted, fontStyle: 'italic', textAlign: 'center' }}>
            Suresh has been notified · arrives in his inbox in a few seconds
          </div>

          <button
            onClick={onClose}
            className="mt-auto py-3 text-[13px] rounded-[10px]"
            style={{ background: T.primary, color: T.surface, fontWeight: 500 }}
          >
            Done
          </button>
        </div>
      )}
    </Sheet>
  );
}

/* ----- PAY SHEET ----- */
function PaySheet({ open, onClose }) {
  const [paid, setPaid] = useState(false);

  useEffect(() => { if (!open) setPaid(false); }, [open]);

  return (
    <Sheet open={open} onClose={onClose} height={540}>
      <div className="px-5 pt-2 pb-3 flex items-center justify-between" style={{ borderBottom: `1px solid ${T.rule}` }}>
        <div className="flex items-center gap-2">
          <Receipt size={15} style={{ color: T.copper }}/>
          <span className="text-[13px]" style={{ color: T.ink, fontWeight: 500 }}>Invoice #INV-2204</span>
        </div>
        <button onClick={onClose} className="p-1"><X size={16} style={{ color: T.muted }}/></button>
      </div>

      {!paid ? (
        <div className="flex-1 px-5 py-5 flex flex-col">
          {/* amount card */}
          <div
            className="p-5 rounded-[16px] relative overflow-hidden"
            style={{ background: T.primary, color: T.surface }}
          >
            <div
              aria-hidden
              style={{
                position: 'absolute', right: -30, top: -30, width: 140, height: 140,
                border: `1px solid rgba(255,253,248,0.10)`, borderRadius: '50%',
              }}
            />
            <div className="text-[10px] uppercase tracking-[0.18em]" style={{ color: T.copperLt }}>Amount due</div>
            <div className="mt-1" style={{ fontFamily: FONT_DISPLAY, fontSize: 48, fontStyle: 'italic', letterSpacing: '-0.025em', lineHeight: 1 }}>
              $1,850.00
            </div>
            <div className="text-[11px] mt-2" style={{ color: 'rgba(255,253,248,0.7)' }}>
              March retainer + Q1 reconciliation work
            </div>
            <div className="flex items-center gap-3 mt-4 text-[10.5px]" style={{ color: 'rgba(255,253,248,0.7)' }}>
              <span>Issued <span style={{ fontFamily: FONT_MONO, color: T.copperLt }}>Apr 1</span></span>
              <span>·</span>
              <span>Due <span style={{ fontFamily: FONT_MONO, color: T.copperLt }}>May 10</span></span>
            </div>
          </div>

          <div className="text-[10px] uppercase tracking-[0.16em] mt-5 mb-2" style={{ color: T.muted }}>
            Payment method
          </div>
          <div className="flex flex-col gap-2">
            <button
              className="flex items-center gap-3 p-3 rounded-[12px]"
              style={{ background: T.surface2, border: `2px solid ${T.primary}` }}
            >
              <div
                className="flex items-center justify-center shrink-0"
                style={{ width: 40, height: 28, borderRadius: 4, background: T.primary, color: T.surface, fontSize: 8.5, letterSpacing: 0.5, fontWeight: 600 }}
              >
                VISA
              </div>
              <div className="flex-1 text-left">
                <div className="text-[12px]" style={{ color: T.ink, fontFamily: FONT_MONO }}>•••• 4421</div>
                <div className="text-[10px]" style={{ color: T.muted }}>Expires 09/28</div>
              </div>
              <CircleDot size={15} style={{ color: T.primary }}/>
            </button>
            <button
              className="flex items-center gap-3 p-3 rounded-[12px]"
              style={{ background: T.surface, border: `1px solid ${T.rule}` }}
            >
              <div
                className="flex items-center justify-center shrink-0"
                style={{ width: 40, height: 28, borderRadius: 4, background: T.surface2, border: `1px solid ${T.rule}` }}
              >
                <span style={{ fontSize: 8, color: T.muted, letterSpacing: 0.5, fontWeight: 600 }}>ACH</span>
              </div>
              <div className="flex-1 text-left">
                <div className="text-[12px]" style={{ color: T.ink }}>Bank transfer</div>
                <div className="text-[10px]" style={{ color: T.muted }}>Free · 1-3 business days</div>
              </div>
              <Circle size={15} style={{ color: T.faint }}/>
            </button>
          </div>

          <button
            onClick={() => setPaid(true)}
            className="mt-auto py-3 text-[13px] rounded-[10px] flex items-center justify-center gap-2"
            style={{ background: T.primary, color: T.surface, fontWeight: 500 }}
          >
            <Lock size={13}/> Pay $1,850.00
          </button>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center px-6 gap-4">
          <div className="flex items-center justify-center" style={{ width: 64, height: 64, borderRadius: '50%', background: '#E2EBE3' }}>
            <CheckCircle2 size={28} style={{ color: T.ok }} strokeWidth={2.5}/>
          </div>
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 28, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.01em', textAlign: 'center', lineHeight: 1.05 }}>
            Paid in full.
          </div>
          <div className="text-[12px] text-center px-4" style={{ color: T.muted, lineHeight: 1.5 }}>
            Receipt sent to cody@powderriverdrill.com · also saved in your Documents.
          </div>
          <button
            onClick={onClose}
            className="mt-2 px-5 py-2.5 text-[13px] rounded-[10px]"
            style={{ background: T.primary, color: T.surface, fontWeight: 500 }}
          >
            Back to Home
          </button>
        </div>
      )}
    </Sheet>
  );
}

/* ----- REVIEW SHEET (lightweight) ----- */
function ReviewSheet({ open, onClose }) {
  return (
    <Sheet open={open} onClose={onClose} height={500}>
      <div className="px-5 pt-2 pb-3 flex items-center justify-between" style={{ borderBottom: `1px solid ${T.rule}` }}>
        <div className="flex items-center gap-2">
          <Eye size={15} style={{ color: T.copper }}/>
          <span className="text-[13px]" style={{ color: T.ink, fontWeight: 500 }}>Rig depreciation</span>
        </div>
        <button onClick={onClose} className="p-1"><X size={16} style={{ color: T.muted }}/></button>
      </div>
      <div className="flex-1 overflow-y-auto px-5 py-5">
        <div className="text-[11px] uppercase tracking-[0.14em]" style={{ color: T.muted }}>Asset</div>
        <div style={{ fontFamily: FONT_DISPLAY, fontSize: 22, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.01em', lineHeight: 1.1 }}>
          New $284,000 drilling rig
        </div>
        <div className="text-[11px] mt-1" style={{ color: T.muted }}>Acquired Feb 2026 · placed in service Mar 2026</div>

        <div className="mt-5 grid grid-cols-2 gap-2.5">
          <div className="p-3.5 rounded-[12px]" style={{ background: T.surface2, border: `1px solid ${T.rule}` }}>
            <div className="text-[10px] uppercase tracking-[0.14em]" style={{ color: T.muted }}>Option A</div>
            <div className="text-[12.5px] mt-1" style={{ color: T.ink, fontWeight: 500 }}>§179 election</div>
            <div className="text-[10.5px] mt-1" style={{ color: T.muted, lineHeight: 1.4 }}>Capped at $1.16M; tied to taxable income</div>
            <div className="mt-3" style={{ fontFamily: FONT_DISPLAY, fontSize: 22, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.01em' }}>
              −$24.8k
            </div>
            <div className="text-[9.5px]" style={{ color: T.muted }}>est. 2026 tax savings</div>
          </div>
          <div className="p-3.5 rounded-[12px]" style={{ background: T.surface, border: `2px solid ${T.copper}` }}>
            <div className="text-[10px] uppercase tracking-[0.14em] flex items-center gap-1" style={{ color: T.copper }}>
              <Sparkles size={9}/> Suggested
            </div>
            <div className="text-[12.5px] mt-1" style={{ color: T.ink, fontWeight: 500 }}>60% bonus dep.</div>
            <div className="text-[10.5px] mt-1" style={{ color: T.muted, lineHeight: 1.4 }}>No income cap · best with flat 2027</div>
            <div className="mt-3" style={{ fontFamily: FONT_DISPLAY, fontSize: 22, color: T.copper, fontStyle: 'italic', letterSpacing: '-0.01em' }}>
              −$28.4k
            </div>
            <div className="text-[9.5px]" style={{ color: T.muted }}>est. 2026 tax savings</div>
          </div>
        </div>

        <div className="mt-5 p-3 rounded-[10px] flex items-start gap-2" style={{ background: T.surface2, border: `1px dashed ${T.rule2}` }}>
          <span
            className="flex items-center justify-center text-[10px] shrink-0"
            style={{ width: 22, height: 22, borderRadius: '50%', background: T.copper, color: T.surface, fontWeight: 600 }}
          >SP</span>
          <div className="text-[11px]" style={{ color: T.ink2, lineHeight: 1.5 }}>
            <span style={{ color: T.ink, fontWeight: 500 }}>Suresh's note:</span> If 2027 will be flatter, take bonus now and save §179 capacity for smaller equipment buys later.
          </div>
        </div>
      </div>

      <div className="px-5 py-4 flex items-center gap-2" style={{ borderTop: `1px solid ${T.rule}` }}>
        <button
          onClick={onClose}
          className="flex-1 py-3 text-[12.5px] rounded-[10px]"
          style={{ background: T.surface2, color: T.ink2, border: `1px solid ${T.rule}` }}
        >
          Discuss first
        </button>
        <button
          onClick={onClose}
          className="flex-1 py-3 text-[12.5px] rounded-[10px]"
          style={{ background: T.primary, color: T.surface, fontWeight: 500 }}
        >
          Approve bonus
        </button>
      </div>
    </Sheet>
  );
}

/* ============================================================
   APP — three phones side by side
   ============================================================ */
function MobileApp() {
  const [active, setActive] = useState('home');
  const [sheet, setSheet] = useState(null);

  const openSheet = (s) => setSheet(s);

  return (
    <div className="relative w-full h-full flex flex-col">
      {/* main content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {active === 'home'     && <HomeScreen     setActive={setActive} openSheet={openSheet}/>}
        {active === 'docs'     && <DocsScreen     openSheet={openSheet}/>}
        {active === 'messages' && <MessagesScreen goBack={() => setActive('home')}/>}
        {active === 'me'       && <MeScreen/>}
      </div>

      {/* bottom tab bar (hidden on chat for full chat experience? keep visible for clarity) */}
      <TabBar active={active} setActive={(t) => {
        if (t === 'upload') {
          openSheet('upload');
        } else {
          setActive(t);
        }
      }}/>

      {/* sheets */}
      <SignSheet   open={sheet === 'sign'}   onClose={() => setSheet(null)}/>
      <UploadSheet open={sheet === 'upload'} onClose={() => setSheet(null)}/>
      <PaySheet    open={sheet === 'pay'}    onClose={() => setSheet(null)}/>
      <ReviewSheet open={sheet === 'review'} onClose={() => setSheet(null)}/>
    </div>
  );
}

/* ============================================================
   STATIC SCREENSHOTS — for the multi-phone showcase
   ============================================================ */
function StaticDocs() {
  return (
    <div className="relative w-full h-full flex flex-col">
      <div className="flex-1 overflow-hidden flex flex-col">
        <DocsScreen openSheet={() => {}}/>
      </div>
      <TabBar active="docs" setActive={() => {}}/>
    </div>
  );
}

function StaticMessages() {
  return (
    <div className="relative w-full h-full flex flex-col">
      <div className="flex-1 overflow-hidden flex flex-col">
        <MessagesScreen goBack={() => {}}/>
      </div>
      <TabBar active="messages" setActive={() => {}}/>
    </div>
  );
}

/* ============================================================
   SHOWCASE PAGE
   ============================================================ */
export default function App() {
  useEffect(() => {
    const id = 'ledger-mobile-fonts';
    if (document.getElementById(id)) return;
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap';
    document.head.appendChild(link);
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col" style={{ background: T.bgDeep, color: T.ink, fontFamily: FONT_BODY }}>
      {/* atmospheric */}
      <div
        aria-hidden
        style={{
          position: 'absolute', inset: 0,
          backgroundImage: `radial-gradient(circle at 80% 20%, rgba(196,106,45,0.10), transparent 50%),
                            radial-gradient(circle at 10% 90%, rgba(11,61,58,0.10), transparent 55%)`,
          pointerEvents: 'none',
        }}
      />

      {/* showcase header */}
      <div className="relative px-12 pt-12 pb-6 flex items-end justify-between max-w-[1400px] mx-auto w-full">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: T.copper, fontWeight: 500 }}>05</span>
            <span style={{ width: 24, height: 1, background: T.rule2 }}/>
            <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: T.muted }}>Mobile companion</span>
          </div>
          <h1
            className="mt-5"
            style={{
              fontFamily: FONT_DISPLAY, fontSize: 56, lineHeight: 1.0,
              letterSpacing: '-0.025em', color: T.ink, fontStyle: 'italic',
            }}
          >
            For the truck cab,<br/>the job site, the kitchen table.
          </h1>
          <p className="mt-5 max-w-[560px] text-[14px]" style={{ color: T.ink2, lineHeight: 1.55 }}>
            Most of your clients aren't behind a desk. The full Ledger client portal — sign,
            upload, pay, message — fits in one hand. Tap the center button to start any flow.
          </p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="text-[10px] uppercase tracking-[0.16em]" style={{ color: T.muted }}>iOS · Android · PWA</div>
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 32, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.02em', lineHeight: 1 }}>
            Ledger<span style={{ color: T.copper }}>.</span>
          </div>
        </div>
      </div>

      {/* three phones */}
      <div className="relative flex-1 flex items-center justify-center px-12 py-8 gap-10 flex-wrap">
        {/* docs (static) */}
        <div style={{ transform: 'translateY(20px) rotate(-3deg)' }}>
          <PhoneFrame label="01 · Encrypted document vault">
            <StaticDocs/>
          </PhoneFrame>
        </div>

        {/* main interactive */}
        <div style={{ transform: 'translateY(-20px)' }}>
          <PhoneFrame label="02 · Home · tap any action ↓">
            <MobileApp/>
          </PhoneFrame>
        </div>

        {/* messages (static) */}
        <div style={{ transform: 'translateY(20px) rotate(3deg)' }}>
          <PhoneFrame label="03 · Direct line to your CPA">
            <StaticMessages/>
          </PhoneFrame>
        </div>
      </div>

      {/* feature strip */}
      <div className="relative max-w-[1400px] mx-auto w-full px-12 py-10 grid grid-cols-4 gap-6">
        {[
          { i: Camera,        t: 'Snap & send', d: 'Camera-first uploads. AI sorts the rest.' },
          { i: FileSignature, t: 'One-tap signing', d: 'ESIGN-compliant. Audit trail on every doc.' },
          { i: CreditCard,    t: 'Pay from anywhere', d: 'Card, ACH, or saved methods.' },
          { i: MessageSquare, t: 'Direct line', d: 'No portal hunt — chat your CPA like a friend.' },
        ].map((f, i) => {
          const Icon = f.i;
          return (
            <div key={i} className="flex flex-col gap-2">
              <div
                className="flex items-center justify-center"
                style={{ width: 36, height: 36, borderRadius: 8, background: T.surface, border: `1px solid ${T.rule}` }}
              >
                <Icon size={16} style={{ color: T.copper }} strokeWidth={1.7}/>
              </div>
              <div className="text-[14px] mt-1" style={{ color: T.ink, fontWeight: 500 }}>{f.t}</div>
              <div className="text-[12px]" style={{ color: T.ink2, lineHeight: 1.55 }}>{f.d}</div>
            </div>
          );
        })}
      </div>

      <div className="text-center text-[10px] uppercase tracking-[0.18em] py-6" style={{ color: T.faint }}>
        — Ledger Practice Suite · Mobile Companion v4.7 —
      </div>
    </div>
  );
}
