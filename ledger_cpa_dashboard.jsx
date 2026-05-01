import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  LayoutDashboard, Users, FileText, ListChecks, MessageSquare, PenLine,
  Receipt, Calendar, BarChart3, Sparkles, Search, Bell, ChevronRight,
  ChevronDown, Plus, Filter, MoreHorizontal, ArrowUpRight, ArrowDownRight,
  AlertTriangle, CheckCircle2, Clock, FileCheck, FileWarning, Inbox,
  Zap, Brain, TrendingUp, TrendingDown, Building2, Truck, HardHat,
  Factory, Briefcase, X, Send, Paperclip, Download, Eye, ShieldCheck,
  CircleDot, Mail, Phone, MapPin, DollarSign, Activity, Settings,
  ArrowRight, Bot, Sliders, ChevronUp, FolderOpen, Hash, AtSign,
} from 'lucide-react';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid,
  LineChart, Line,
} from 'recharts';

/* ============================================================
   THEME TOKENS
   ============================================================ */
const T = {
  bg:        '#F4EFE6',    // warm bone paper
  surface:   '#FFFDF8',    // paper white
  surface2:  '#FAF6EC',
  ink:       '#171411',    // warm near-black
  ink2:      '#3B342B',
  muted:     '#7A7163',
  faint:     '#B5AC9B',
  rule:      '#E5DDC9',
  rule2:     '#D9CFB6',
  primary:   '#0B3D3A',    // deep forest petrol
  primary2:  '#1A5C57',
  copper:    '#C46A2D',    // warm copper accent
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
   DEMO DATA — realistic US tax practice
   ============================================================ */
const CLIENTS = [
  { id: 1, name: 'Powder River Drilling LLC',  industry: 'Oil & Gas',   icon: Factory,  state: 'WY', entity: '1065', mrr: 1850, ytd: 22200, health: 92, risk: 'low',    status: 'Filing Prep', last: '2d',   contact: 'Cody Whitman',   email: 'cody@powderriverdrill.com',  phone: '(307) 555-0142', tasks: 3,  notes: 5, openInv: 0     },
  { id: 2, name: 'Big Horn Logistics Inc.',     industry: 'Trucking',    icon: Truck,    state: 'WY', entity: '1120-S',mrr: 1450, ytd: 17400, health: 64, risk: 'medium', status: 'Awaiting Docs',last: '11d',  contact: 'Marlene Hayes',   email: 'm.hayes@bighornlog.com',     phone: '(307) 555-0188', tasks: 7,  notes: 4, openInv: 2950  },
  { id: 3, name: 'Sweetwater Welding & Fab',    industry: 'Construction',icon: HardHat,  state: 'WY', entity: '1120-S',mrr: 1200, ytd: 14400, health: 78, risk: 'low',    status: 'In Review',    last: '4d',   contact: 'Jed Brennan',     email: 'jed@sweetwaterfab.io',       phone: '(307) 555-0199', tasks: 2,  notes: 2, openInv: 0     },
  { id: 4, name: 'Cheyenne Ridge Construction', industry: 'Construction',icon: HardHat,  state: 'WY', entity: '1120',  mrr: 2200, ytd: 26400, health: 45, risk: 'high',   status: 'IRS Notice',   last: '21d',  contact: 'Ashlyn Reeves',   email: 'ashlyn@cheyenneridge.co',    phone: '(307) 555-0166', tasks: 11, notes: 8, openInv: 5400  },
  { id: 5, name: 'Bison Crude Services',        industry: 'Oil & Gas',   icon: Factory,  state: 'WY', entity: '1065',  mrr: 1650, ytd: 19800, health: 88, risk: 'low',    status: 'Filed',        last: '6d',   contact: 'Wyatt Kessler',   email: 'wyatt@bisoncrude.us',        phone: '(307) 555-0121', tasks: 1,  notes: 3, openInv: 0     },
  { id: 6, name: 'High Plains Freight Co.',     industry: 'Trucking',    icon: Truck,    state: 'MT', entity: '1120-S',mrr: 1320, ytd: 15840, health: 71, risk: 'medium', status: 'Bookkeeping',  last: '8d',   contact: 'Della Marston',   email: 'della@hpfreight.com',        phone: '(406) 555-0177', tasks: 5,  notes: 2, openInv: 1200  },
  { id: 7, name: 'Rampart Steel Erectors',      industry: 'Construction',icon: HardHat,  state: 'CO', entity: '1120',  mrr: 1980, ytd: 23760, health: 83, risk: 'low',    status: 'Filing Prep',  last: '3d',   contact: 'Brock Tillman',   email: 'brock@rampartsteel.net',     phone: '(720) 555-0103', tasks: 4,  notes: 6, openInv: 0     },
  { id: 8, name: 'Niobrara Energy Partners',    industry: 'Oil & Gas',   icon: Factory,  state: 'WY', entity: '1065',  mrr: 2400, ytd: 28800, health: 56, risk: 'medium', status: 'Awaiting Docs',last: '14d',  contact: 'Hollis Garner',   email: 'hollis@niobrara-ep.com',     phone: '(307) 555-0155', tasks: 9,  notes: 7, openInv: 4800  },
  { id: 9, name: 'Wind River Hauling LLC',      industry: 'Trucking',    icon: Truck,    state: 'WY', entity: '1065',  mrr: 980,  ytd: 11760, health: 81, risk: 'low',    status: 'In Review',    last: '5d',   contact: 'Jorah Linley',    email: 'jorah@windriverhaul.com',    phone: '(307) 555-0172', tasks: 2,  notes: 1, openInv: 0     },
  { id: 10,name: 'Granite Peak Builders',       industry: 'Construction',icon: HardHat,  state: 'ID', entity: '1120-S',mrr: 1100, ytd: 13200, health: 68, risk: 'medium', status: 'Bookkeeping',  last: '9d',   contact: 'Tessa Nordquist',  email: 'tessa@granitepeak.build',    phone: '(208) 555-0145', tasks: 6,  notes: 3, openInv: 1750  },
];

const DEADLINES = [
  { id: 1, form: 'Form 941',     label: 'Q1 Payroll Tax',         due: 'Apr 30, 2026', daysOut: 5,  client: 'Big Horn Logistics Inc.',     risk: 'high',   reason: 'Missing March payroll docs' },
  { id: 2, form: 'Form 1120-S',  label: 'S-Corp Return (Ext)',    due: 'Sep 15, 2026', daysOut: 143,client: 'Cheyenne Ridge Construction', risk: 'medium', reason: 'Open IRS CP2000 unresolved' },
  { id: 3, form: 'Form 1065',    label: 'Partnership (Ext)',      due: 'Sep 15, 2026', daysOut: 143,client: 'Niobrara Energy Partners',     risk: 'medium', reason: 'K-1 allocations pending' },
  { id: 4, form: 'Form 1040',    label: 'Personal (Ext)',         due: 'Oct 15, 2026', daysOut: 173,client: 'Cody Whitman',                 risk: 'low',    reason: 'On track' },
  { id: 5, form: 'Form 940',     label: 'FUTA Annual',            due: 'Jan 31, 2027', daysOut: 281,client: 'All payroll clients',          risk: 'low',    reason: 'Standard cycle' },
  { id: 6, form: 'Form 1099-NEC',label: 'Contractor Reporting',   due: 'Jan 31, 2027', daysOut: 281,client: 'Sweetwater Welding & Fab',     risk: 'low',    reason: 'On track' },
];

const AI_INBOX = [
  { id: 1, file: 'BHL_bank_stmt_Mar2026.pdf',     client: 'Big Horn Logistics Inc.',     type: 'Bank Statement',   confidence: 98, extracted: { 'Account': '****8421', 'Period': 'Mar 1–31', 'Deposits': '$84,200', 'Withdrawals': '$71,840' }, action: 'Categorize transactions' },
  { id: 2, file: 'IRS_CP2000_Cheyenne.pdf',       client: 'Cheyenne Ridge Construction', type: 'IRS Notice',       confidence: 99, extracted: { 'Notice': 'CP2000', 'Tax Year': '2024', 'Proposed Bal.': '$8,412.00', 'Reply By': 'May 12, 2026' }, action: 'Draft response' },
  { id: 3, file: 'W2_Powder_River_2025.pdf',      client: 'Powder River Drilling LLC',   type: 'W-2',              confidence: 97, extracted: { 'Employees': '14', 'Total Wages': '$612,840', 'FIT W/H': '$74,108' },                            action: 'Reconcile to 941s' },
  { id: 4, file: 'K1_Niobrara_partner3.pdf',      client: 'Niobrara Energy Partners',     type: 'Schedule K-1',     confidence: 95, extracted: { 'Partner': 'L. Pemberton', 'Ord. Inc.': '$48,200', 'Distributions': '$32,500' },             action: 'Post to partner cap' },
  { id: 5, file: 'invoice_AcmeFuel_Apr03.pdf',    client: 'Bison Crude Services',         type: 'Vendor Invoice',   confidence: 92, extracted: { 'Vendor': 'Acme Fuel', 'Amount': '$3,420.18', 'Date': 'Apr 3, 2026' },                       action: 'Auto-categorized: COGS' },
];

const AUTOMATION_SUGGESTIONS = [
  { id: 1, title: 'Auto-send 941 reminders 14 days before quarter close', impact: 'Saves ~3hr / quarter', confidence: 'High',   trigger: '6 of 8 payroll clients missed last quarter' },
  { id: 2, title: 'Route IRS notices to "Urgent" workflow on receipt',     impact: 'Cuts response time 40%', confidence: 'High', trigger: 'Pattern detected in CP2000 + LT11 emails' },
  { id: 3, title: 'Bundle K-1 prep tasks into single Sept sprint',         impact: 'Saves ~11hr / season', confidence: 'Medium',trigger: '4 partnership clients with similar timing' },
];

const TASKS = [
  { id: 1, title: 'Reconcile Q1 bank feed',          client: 'Big Horn Logistics',     due: 'Apr 27', priority: 'high',   status: 'in_progress', assignee: 'You' },
  { id: 2, title: 'Draft CP2000 response letter',    client: 'Cheyenne Ridge Const.',  due: 'May 1',  priority: 'high',   status: 'todo',        assignee: 'You' },
  { id: 3, title: 'K-1 allocations partner review',   client: 'Niobrara Energy',        due: 'May 10', priority: 'medium', status: 'review',      assignee: 'You' },
  { id: 4, title: 'Issue extension confirmations',    client: 'Multiple (5)',           due: 'Apr 26', priority: 'medium', status: 'in_progress', assignee: 'You' },
  { id: 5, title: 'Year-end planning call',           client: 'Powder River Drilling',  due: 'May 15', priority: 'low',    status: 'todo',        assignee: 'You' },
  { id: 6, title: 'Reconcile vendor 1099 list',       client: 'Sweetwater Welding',     due: 'May 22', priority: 'low',    status: 'todo',        assignee: 'You' },
];

const MESSAGES = [
  { id: 1, from: 'Cody Whitman',     org: 'Powder River',        time: '2h',  preview: 'Got the prior year depreciation schedule — uploading now.', unread: true },
  { id: 2, from: 'Ashlyn Reeves',    org: 'Cheyenne Ridge',      time: '5h',  preview: 'Can you join a call Friday 2pm to discuss the IRS notice?', unread: true },
  { id: 3, from: 'Marlene Hayes',    org: 'Big Horn Logistics',  time: '1d',  preview: 'Sending the trucker per-diem logs for Q1 reconciliation.',  unread: false },
  { id: 4, from: 'Wyatt Kessler',    org: 'Bison Crude',         time: '2d',  preview: 'Quick question on §179 vs bonus dep for the new rig.',     unread: false },
];

const ACTIVITY = [
  { id:1, who: 'You',          what: 'filed extension',  obj: 'Form 7004 — Cheyenne Ridge', time: '34m ago' },
  { id:2, who: 'Cody Whitman', what: 'uploaded',          obj: 'Bank Stmt Mar 2026',         time: '2h ago' },
  { id:3, who: 'AI',           what: 'classified',        obj: 'IRS CP2000 — Cheyenne',       time: '2h ago' },
  { id:4, who: 'You',          what: 'sent invoice',      obj: '#INV-2204 to Big Horn',       time: '5h ago' },
  { id:5, who: 'Marlene Hayes',what: 'signed',            obj: 'Engagement Letter 2026',     time: '1d ago' },
  { id:6, who: 'AI',           what: 'flagged anomaly',   obj: 'Niobrara fuel exp +312% MoM', time: '1d ago' },
];

const REVENUE_TREND = [
  { m: 'Nov', v: 12400 }, { m: 'Dec', v: 13100 }, { m: 'Jan', v: 14800 },
  { m: 'Feb', v: 15600 }, { m: 'Mar', v: 16900 }, { m: 'Apr', v: 16130 },
];

/* ============================================================
   SMALL UTILITIES
   ============================================================ */
const fmt = (n) => '$' + Number(n).toLocaleString('en-US');
const cx = (...a) => a.filter(Boolean).join(' ');

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
      style={{ background: c.bg, color: c.fg, borderColor: c.bd, fontFamily: mono ? FONT_MONO : FONT_BODY, fontWeight: 500 }}
    >
      {children}
    </span>
  );
}

function HealthBar({ value }) {
  const tone = value >= 80 ? T.ok : value >= 60 ? T.warn : T.danger;
  return (
    <div className="flex items-center gap-2 w-full">
      <div className="flex-1 h-[6px] rounded-full overflow-hidden" style={{ background: T.rule }}>
        <div className="h-full" style={{ width: `${value}%`, background: tone, transition: 'width 600ms ease' }} />
      </div>
      <span className="text-[11px] tabular-nums" style={{ fontFamily: FONT_MONO, color: T.ink2, minWidth: 22, textAlign: 'right' }}>
        {value}
      </span>
    </div>
  );
}

function Rule({ vertical = false, style = {} }) {
  return vertical
    ? <div style={{ width: 1, alignSelf: 'stretch', background: T.rule, ...style }} />
    : <div style={{ height: 1, width: '100%', background: T.rule, ...style }} />;
}

/* ============================================================
   SIDEBAR
   ============================================================ */
const NAV = [
  { id: 'dashboard',   label: 'Dashboard',   icon: LayoutDashboard },
  { id: 'clients',     label: 'Clients',     icon: Users },
  { id: 'documents',   label: 'Documents',   icon: FileText },
  { id: 'tasks',       label: 'Tasks & Workflows', icon: ListChecks },
  { id: 'messages',    label: 'Messages',    icon: MessageSquare, badge: 2 },
  { id: 'esign',       label: 'E-Signatures',icon: PenLine },
  { id: 'invoicing',   label: 'Invoicing',   icon: Receipt },
  { id: 'calendar',    label: 'Calendar',    icon: Calendar },
  { id: 'reports',     label: 'Reports',     icon: BarChart3 },
];

function Sidebar({ active, setActive, onAi }) {
  return (
    <aside
      className="flex flex-col"
      style={{
        width: 240, background: T.surface, borderRight: `1px solid ${T.rule}`,
        fontFamily: FONT_BODY,
      }}
    >
      {/* Brand */}
      <div className="px-5 pt-6 pb-5" style={{ borderBottom: `1px solid ${T.rule}` }}>
        <div className="flex items-center gap-2.5">
          <div
            className="flex items-center justify-center"
            style={{
              width: 30, height: 30, borderRadius: 4, background: T.primary,
              color: T.surface, fontFamily: FONT_DISPLAY, fontSize: 22, fontStyle: 'italic',
              lineHeight: 1, paddingBottom: 4,
            }}
          >L</div>
          <div className="flex flex-col">
            <span style={{ fontFamily: FONT_DISPLAY, fontSize: 22, color: T.ink, lineHeight: 1, letterSpacing: '-0.01em' }}>
              Ledger<span style={{ color: T.copper }}>.</span>
            </span>
            <span className="text-[9.5px] uppercase tracking-[0.18em]" style={{ color: T.muted, marginTop: 2 }}>
              Practice Suite
            </span>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <div className="text-[9.5px] uppercase tracking-[0.16em] px-2 pb-2" style={{ color: T.faint }}>Workspace</div>
        {NAV.map(item => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className="w-full flex items-center gap-2.5 px-2 py-[7px] mb-[2px] text-[13px] text-left transition-colors"
              style={{
                background: isActive ? T.surface2 : 'transparent',
                color: isActive ? T.ink : T.ink2,
                borderRadius: 3,
                borderLeft: `2px solid ${isActive ? T.copper : 'transparent'}`,
                paddingLeft: 8,
                fontWeight: isActive ? 500 : 400,
              }}
            >
              <Icon size={15} strokeWidth={1.6} style={{ color: isActive ? T.primary : T.muted }} />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="text-[10px] px-1.5 rounded-full" style={{ background: T.copper, color: T.surface, fontFamily: FONT_MONO }}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        <div className="text-[9.5px] uppercase tracking-[0.16em] px-2 pt-5 pb-2" style={{ color: T.faint }}>Intelligence</div>
        <button
          onClick={onAi}
          className="w-full flex items-center gap-2.5 px-2 py-[7px] text-[13px] text-left"
          style={{
            background: `linear-gradient(135deg, ${T.primary} 0%, ${T.primary2} 100%)`,
            color: T.surface, borderRadius: 3,
          }}
        >
          <Sparkles size={15} strokeWidth={1.8} />
          <span className="flex-1">AI Tax Assistant</span>
          <span className="text-[9px] uppercase tracking-[0.12em]" style={{ color: T.copperLt }}>New</span>
        </button>
      </nav>

      {/* User pill */}
      <div className="px-3 py-3" style={{ borderTop: `1px solid ${T.rule}` }}>
        <div className="flex items-center gap-2.5 px-2 py-1.5 rounded-[3px]" style={{ background: T.surface2 }}>
          <div
            className="flex items-center justify-center text-[12px]"
            style={{ width: 30, height: 30, borderRadius: '50%', background: T.copper, color: T.surface, fontWeight: 600, fontFamily: FONT_BODY }}
          >SP</div>
          <div className="flex-1 min-w-0">
            <div className="text-[12.5px] truncate" style={{ color: T.ink, fontWeight: 500 }}>Suresh Patel, EA</div>
            <div className="text-[10px]" style={{ color: T.muted }}>HYK Tax · Surat</div>
          </div>
          <Settings size={14} style={{ color: T.muted }} />
        </div>
      </div>
    </aside>
  );
}

/* ============================================================
   TOP BAR
   ============================================================ */
function TopBar({ active, q, setQ }) {
  const labels = {
    dashboard: 'Dashboard',
    clients: 'Clients',
    documents: 'Documents',
    tasks: 'Tasks & Workflows',
    messages: 'Messages',
    esign: 'E-Signatures',
    invoicing: 'Invoicing',
    calendar: 'Calendar',
    reports: 'Reports',
  };
  return (
    <div
      className="flex items-center px-7 py-4"
      style={{ background: T.surface, borderBottom: `1px solid ${T.rule}`, fontFamily: FONT_BODY }}
    >
      <div className="flex items-baseline gap-3">
        <span className="text-[10.5px] uppercase tracking-[0.18em]" style={{ color: T.muted }}>Practice /</span>
        <span style={{ fontFamily: FONT_DISPLAY, fontSize: 22, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.01em' }}>
          {labels[active]}
        </span>
      </div>

      <div className="flex-1 flex items-center justify-center px-10">
        <div
          className="flex items-center gap-2 px-3 py-[7px] rounded-[3px]"
          style={{ background: T.surface2, border: `1px solid ${T.rule}`, width: '100%', maxWidth: 460 }}
        >
          <Search size={14} style={{ color: T.muted }} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search clients, documents, EINs, forms…"
            className="flex-1 bg-transparent outline-none text-[12.5px]"
            style={{ color: T.ink }}
          />
          <span className="text-[10px] px-1.5 py-[1px] rounded-[2px]" style={{ background: T.surface, border: `1px solid ${T.rule}`, color: T.muted, fontFamily: FONT_MONO }}>⌘K</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="px-3 py-1.5 text-[12px] flex items-center gap-1.5 rounded-[3px]" style={{ background: T.primary, color: T.surface, fontWeight: 500 }}>
          <Plus size={13} strokeWidth={2}/> New Client
        </button>
        <button className="p-2 rounded-[3px]" style={{ background: T.surface2, border: `1px solid ${T.rule}` }}>
          <Bell size={14} style={{ color: T.ink2 }}/>
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   DASHBOARD — KPI ROW
   ============================================================ */
function Kpi({ label, value, sub, delta, deltaTone = 'up', mono = true }) {
  const Icon = deltaTone === 'up' ? ArrowUpRight : ArrowDownRight;
  const dColor = deltaTone === 'up' ? T.ok : T.danger;
  return (
    <div className="flex flex-col p-4" style={{ background: T.surface, border: `1px solid ${T.rule}`, borderRadius: 3, minHeight: 104 }}>
      <div className="flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-[0.14em]" style={{ color: T.muted, fontFamily: FONT_BODY }}>{label}</span>
        {delta != null && (
          <span className="flex items-center gap-0.5 text-[10.5px]" style={{ color: dColor, fontFamily: FONT_MONO }}>
            <Icon size={11} strokeWidth={2} />{delta}
          </span>
        )}
      </div>
      <div
        className="mt-2"
        style={{
          fontFamily: mono ? FONT_DISPLAY : FONT_BODY,
          fontSize: 30, color: T.ink, lineHeight: 1.05, letterSpacing: '-0.02em',
          fontStyle: mono ? 'italic' : 'normal',
        }}
      >
        {value}
      </div>
      {sub && <div className="text-[11px] mt-auto pt-2" style={{ color: T.muted }}>{sub}</div>}
    </div>
  );
}

/* ============================================================
   DASHBOARD — TAX SEASON PULSE BAR
   ============================================================ */
function SeasonPulse() {
  // April 25, 2026 — main 1040 deadline (Apr 15) just passed; on extensions now
  return (
    <div
      className="relative overflow-hidden"
      style={{
        background: `linear-gradient(110deg, ${T.primary} 0%, ${T.primary2} 55%, #1F6B65 100%)`,
        color: T.surface, borderRadius: 3, padding: '20px 24px',
      }}
    >
      {/* decorative corner mark */}
      <div
        aria-hidden
        style={{
          position: 'absolute', right: -40, top: -40, width: 220, height: 220,
          border: `1px solid rgba(255,253,248,0.12)`, borderRadius: '50%',
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute', right: -10, bottom: -60, width: 140, height: 140,
          border: `1px solid rgba(255,253,248,0.08)`, borderRadius: '50%',
        }}
      />

      <div className="flex items-start justify-between gap-6 relative">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: T.copperLt, boxShadow: `0 0 0 4px rgba(232,151,98,0.18)` }} />
            <span className="text-[10.5px] uppercase tracking-[0.18em]" style={{ color: T.copperLt, fontFamily: FONT_BODY }}>
              Tax Season · Post-April Cycle
            </span>
          </div>
          <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 30, lineHeight: 1.1, fontStyle: 'italic', letterSpacing: '-0.015em' }}>
            10 days into extensions. <span style={{ color: T.copperLt }}>Cheyenne Ridge</span> needs your eyes today.
          </h2>
          <p className="text-[12.5px] mt-1.5 max-w-[640px]" style={{ color: 'rgba(255,253,248,0.75)', fontFamily: FONT_BODY }}>
            Extensions filed for 7 of 9 returning clients. CP2000 response window closes in 17 days. Q1 941s due Apr 30.
          </p>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <span className="text-[10.5px] uppercase tracking-[0.14em]" style={{ color: T.copperLt, fontFamily: FONT_BODY }}>Next Critical</span>
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 36, lineHeight: 1, fontStyle: 'italic' }}>
            5 <span style={{ fontSize: 14, fontStyle: 'normal', fontFamily: FONT_BODY, letterSpacing: '0.05em' }}>DAYS</span>
          </div>
          <div className="text-[11px]" style={{ color: 'rgba(255,253,248,0.7)', fontFamily: FONT_MONO }}>
            941 · Apr 30
          </div>
        </div>
      </div>

      {/* progress strip */}
      <div className="flex items-center gap-3 mt-5 relative">
        <span className="text-[10px] uppercase tracking-[0.12em]" style={{ color: 'rgba(255,253,248,0.55)' }}>Mar 15</span>
        <div className="flex-1 relative h-[3px] rounded-full" style={{ background: 'rgba(255,253,248,0.12)' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: '62%', background: T.copperLt, borderRadius: 999 }} />
          {/* tick markers */}
          <span style={{ position: 'absolute', left: '20%', top: -4, width: 1, height: 11, background: 'rgba(255,253,248,0.3)' }} />
          <span style={{ position: 'absolute', left: '50%', top: -4, width: 1, height: 11, background: 'rgba(255,253,248,0.3)' }} />
          <span style={{ position: 'absolute', left: '62%', top: -7, width: 13, height: 13, borderRadius: '50%', background: T.copperLt, transform: 'translateX(-50%)', boxShadow: `0 0 0 4px rgba(232,151,98,0.25)` }} />
          <span style={{ position: 'absolute', left: '78%', top: -4, width: 1, height: 11, background: 'rgba(255,253,248,0.3)' }} />
        </div>
        <span className="text-[10px] uppercase tracking-[0.12em]" style={{ color: 'rgba(255,253,248,0.55)' }}>Oct 15</span>
      </div>
    </div>
  );
}

/* ============================================================
   DASHBOARD — CLIENT HEALTH MATRIX (custom SVG scatter)
   ============================================================ */
function HealthMatrix({ onPick }) {
  const [hover, setHover] = useState(null);
  // x: health (0-100, left=risky, right=healthy)
  // y: ytd revenue (0..30000, bottom=low, top=high)
  const W = 540, H = 270, P = 28;
  const yMax = 30000;
  const xS = (v) => P + (v / 100) * (W - P * 2);
  const yS = (v) => H - P - (v / yMax) * (H - P * 2);
  const ticksX = [0, 25, 50, 75, 100];
  const ticksY = [0, 10000, 20000, 30000];

  return (
    <div className="p-5" style={{ background: T.surface, border: `1px solid ${T.rule}`, borderRadius: 3 }}>
      <div className="flex items-start justify-between mb-1">
        <div>
          <div className="text-[10px] uppercase tracking-[0.16em]" style={{ color: T.muted, fontFamily: FONT_BODY }}>Upgraded · AI-scored</div>
          <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 22, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.01em', lineHeight: 1.15 }}>
            Client Health × Revenue
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <Pill tone="primary">Live</Pill>
          <button className="text-[11px] flex items-center gap-1" style={{ color: T.muted, fontFamily: FONT_BODY }}>
            <Sliders size={11}/> Filters
          </button>
        </div>
      </div>

      <div className="relative" style={{ marginTop: 8 }}>
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block' }}>
          {/* quadrant tint — top-right (healthy + high rev) */}
          <rect x={xS(50)} y={yS(yMax)} width={W - P - xS(50)} height={yS(15000) - yS(yMax)} fill={T.ok} opacity={0.04}/>
          {/* bottom-left (risky + low rev) */}
          <rect x={P} y={yS(15000)} width={xS(50) - P} height={H - P - yS(15000)} fill={T.danger} opacity={0.04}/>

          {/* grid */}
          {ticksY.map(t => (
            <g key={'y'+t}>
              <line x1={P} y1={yS(t)} x2={W-P} y2={yS(t)} stroke={T.rule} strokeWidth={1} strokeDasharray="2 4"/>
              <text x={P-6} y={yS(t)+3} textAnchor="end" fontSize={9} fill={T.muted} fontFamily={FONT_MONO}>${(t/1000)}k</text>
            </g>
          ))}
          {ticksX.map(t => (
            <g key={'x'+t}>
              <line x1={xS(t)} y1={H-P} x2={xS(t)} y2={H-P+3} stroke={T.muted} strokeWidth={1}/>
              <text x={xS(t)} y={H-P+13} textAnchor="middle" fontSize={9} fill={T.muted} fontFamily={FONT_MONO}>{t}</text>
            </g>
          ))}

          {/* axes labels */}
          <text x={W-P} y={yS(0)-6} textAnchor="end" fontSize={9} fill={T.faint} fontFamily={FONT_BODY} letterSpacing={1.2}>HEALTH SCORE →</text>
          <text x={P+4} y={yS(yMax)-6} textAnchor="start" fontSize={9} fill={T.faint} fontFamily={FONT_BODY} letterSpacing={1.2}>↑ YTD REVENUE</text>

          {/* center cross */}
          <line x1={xS(50)} y1={P} x2={xS(50)} y2={H-P} stroke={T.rule2} strokeWidth={1}/>
          <line x1={P} y1={yS(15000)} x2={W-P} y2={yS(15000)} stroke={T.rule2} strokeWidth={1}/>

          {/* points */}
          {CLIENTS.map(c => {
            const cx = xS(c.health);
            const cy = yS(c.ytd);
            const r  = 5 + (c.mrr / 600);
            const fill = c.risk === 'low' ? T.ok : c.risk === 'medium' ? T.warn : T.danger;
            const isHover = hover === c.id;
            return (
              <g
                key={c.id}
                onMouseEnter={() => setHover(c.id)}
                onMouseLeave={() => setHover(null)}
                onClick={() => onPick && onPick(c)}
                style={{ cursor: 'pointer' }}
              >
                <circle cx={cx} cy={cy} r={r+4} fill={fill} opacity={isHover ? 0.18 : 0}/>
                <circle cx={cx} cy={cy} r={r} fill={fill} opacity={0.85} stroke={T.surface} strokeWidth={1.5}/>
                {isHover && (
                  <text x={cx+r+5} y={cy+3} fontSize={10} fill={T.ink} fontFamily={FONT_BODY} fontWeight={500}>
                    {c.name}
                  </text>
                )}
              </g>
            );
          })}

          {/* quadrant tags */}
          <text x={W-P-6} y={P+10} textAnchor="end" fontSize={9} fill={T.ok} fontFamily={FONT_BODY} letterSpacing={1.5} fontWeight={600}>STAR ACCOUNTS</text>
          <text x={P+6}   y={H-P-6}  textAnchor="start" fontSize={9} fill={T.danger} fontFamily={FONT_BODY} letterSpacing={1.5} fontWeight={600}>AT RISK</text>
        </svg>
      </div>

      <div className="flex items-center gap-4 mt-2 pt-3" style={{ borderTop: `1px solid ${T.rule}` }}>
        <div className="flex items-center gap-1.5 text-[10.5px]" style={{ color: T.muted }}>
          <span className="w-2 h-2 rounded-full" style={{ background: T.ok }} />Low risk
        </div>
        <div className="flex items-center gap-1.5 text-[10.5px]" style={{ color: T.muted }}>
          <span className="w-2 h-2 rounded-full" style={{ background: T.warn }} />Medium
        </div>
        <div className="flex items-center gap-1.5 text-[10.5px]" style={{ color: T.muted }}>
          <span className="w-2 h-2 rounded-full" style={{ background: T.danger }} />High risk
        </div>
        <div className="flex-1" />
        <span className="text-[10.5px]" style={{ color: T.muted }}>Bubble size = MRR</span>
      </div>
    </div>
  );
}

/* ============================================================
   DASHBOARD — DEADLINE RADAR
   ============================================================ */
function DeadlineRadar() {
  return (
    <div className="p-5 flex flex-col" style={{ background: T.surface, border: `1px solid ${T.rule}`, borderRadius: 3 }}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="text-[10px] uppercase tracking-[0.16em]" style={{ color: T.muted, fontFamily: FONT_BODY }}>Predictive · 60-day window</div>
          <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 22, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.01em', lineHeight: 1.15 }}>
            Deadline Radar
          </h3>
        </div>
        <Pill tone="copper"><Brain size={9}/> AI-ranked</Pill>
      </div>

      <div className="flex flex-col gap-px overflow-y-auto" style={{ background: T.rule }}>
        {DEADLINES.slice(0, 5).map(d => {
          const dotColor = d.risk === 'high' ? T.danger : d.risk === 'medium' ? T.warn : T.ok;
          return (
            <div key={d.id} className="flex items-center gap-3 px-3 py-2.5" style={{ background: T.surface }}>
              <div className="flex flex-col items-center" style={{ width: 42 }}>
                <span style={{ fontFamily: FONT_DISPLAY, fontSize: 22, fontStyle: 'italic', color: T.ink, lineHeight: 1 }}>
                  {d.daysOut}
                </span>
                <span className="text-[8.5px] uppercase tracking-[0.12em]" style={{ color: T.muted, marginTop: 2 }}>days</span>
              </div>
              <div style={{ width: 1, alignSelf: 'stretch', background: T.rule }} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[12.5px]" style={{ color: T.ink, fontWeight: 500 }}>{d.form}</span>
                  <span className="text-[10.5px]" style={{ color: T.muted }}>· {d.label}</span>
                </div>
                <div className="text-[11px] truncate" style={{ color: T.ink2 }}>
                  {d.client}
                </div>
                <div className="text-[10.5px] flex items-center gap-1 mt-0.5" style={{ color: T.muted, fontStyle: 'italic' }}>
                  <span className="inline-block w-1 h-1 rounded-full" style={{ background: dotColor }} />
                  {d.reason}
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <Pill tone={d.risk === 'high' ? 'high' : d.risk === 'medium' ? 'med' : 'low'}>{d.risk}</Pill>
                <span className="text-[10px]" style={{ color: T.muted, fontFamily: FONT_MONO }}>{d.due}</span>
              </div>
            </div>
          );
        })}
      </div>

      <button
        className="mt-3 text-[11.5px] flex items-center justify-center gap-1 py-1.5 rounded-[3px]"
        style={{ color: T.primary, border: `1px solid ${T.rule}`, background: T.surface2, fontFamily: FONT_BODY, fontWeight: 500 }}
      >
        View all deadlines <ArrowRight size={12}/>
      </button>
    </div>
  );
}

/* ============================================================
   DASHBOARD — AI INBOX
   ============================================================ */
function AiInbox() {
  const [open, setOpen] = useState(2);
  return (
    <div className="p-5 flex flex-col" style={{ background: T.surface, border: `1px solid ${T.rule}`, borderRadius: 3 }}>
      <div className="flex items-start justify-between mb-1">
        <div>
          <div className="text-[10px] uppercase tracking-[0.16em] flex items-center gap-1.5" style={{ color: T.muted, fontFamily: FONT_BODY }}>
            <Sparkles size={10} style={{ color: T.copper }}/> Upgraded · auto-classified
          </div>
          <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 22, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.01em', lineHeight: 1.15 }}>
            AI Document Inbox
          </h3>
        </div>
        <Pill tone="copper">{AI_INBOX.length} new</Pill>
      </div>

      <div className="flex flex-col mt-2" style={{ borderTop: `1px solid ${T.rule}` }}>
        {AI_INBOX.map(d => {
          const isOpen = open === d.id;
          return (
            <div key={d.id} style={{ borderBottom: `1px solid ${T.rule}` }}>
              <button
                onClick={() => setOpen(isOpen ? null : d.id)}
                className="w-full flex items-center gap-3 py-3 text-left"
              >
                <div
                  className="flex items-center justify-center"
                  style={{ width: 30, height: 30, background: T.surface2, border: `1px solid ${T.rule}`, borderRadius: 3 }}
                >
                  <FileText size={14} style={{ color: T.primary }}/>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] truncate" style={{ color: T.ink, fontFamily: FONT_MONO }}>{d.file}</span>
                    <Pill tone="primary">{d.type}</Pill>
                  </div>
                  <div className="text-[10.5px] mt-0.5" style={{ color: T.muted }}>
                    {d.client}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-0.5">
                  <span className="text-[10px]" style={{ color: T.ok, fontFamily: FONT_MONO }}>{d.confidence}% match</span>
                  {isOpen ? <ChevronUp size={13} style={{ color: T.muted }}/> : <ChevronDown size={13} style={{ color: T.muted }}/>}
                </div>
              </button>
              {isOpen && (
                <div className="pb-3 pl-[42px] pr-1">
                  <div
                    className="grid grid-cols-2 gap-x-4 gap-y-1 p-3 rounded-[3px]"
                    style={{ background: T.surface2, border: `1px dashed ${T.rule2}` }}
                  >
                    {Object.entries(d.extracted).map(([k, v]) => (
                      <div key={k} className="flex items-baseline gap-2 text-[11px]">
                        <span className="uppercase tracking-[0.08em]" style={{ color: T.muted, fontSize: 9.5 }}>{k}</span>
                        <span style={{ color: T.ink, fontFamily: FONT_MONO }}>{v}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      className="text-[11px] px-2.5 py-1 rounded-[3px] flex items-center gap-1"
                      style={{ background: T.primary, color: T.surface, fontWeight: 500 }}
                    >
                      <Zap size={11}/> {d.action}
                    </button>
                    <button className="text-[11px] px-2.5 py-1 rounded-[3px]" style={{ border: `1px solid ${T.rule}`, color: T.ink2 }}>
                      Review
                    </button>
                    <span className="ml-auto text-[10px]" style={{ color: T.muted, fontStyle: 'italic' }}>
                      Extracted in 1.2s
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ============================================================
   DASHBOARD — AUTOMATION SUGGESTIONS
   ============================================================ */
function AutomationSuggestions() {
  return (
    <div className="p-5" style={{ background: T.surface, border: `1px solid ${T.rule}`, borderRadius: 3 }}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="text-[10px] uppercase tracking-[0.16em] flex items-center gap-1.5" style={{ color: T.muted, fontFamily: FONT_BODY }}>
            <Zap size={10} style={{ color: T.copper }}/> Upgraded · pattern learning
          </div>
          <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 22, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.01em', lineHeight: 1.15 }}>
            Automation Proposals
          </h3>
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        {AUTOMATION_SUGGESTIONS.map(s => (
          <div key={s.id} className="p-3 rounded-[3px]" style={{ background: T.surface2, border: `1px solid ${T.rule}` }}>
            <div className="flex items-start gap-2.5">
              <div
                className="flex items-center justify-center mt-0.5"
                style={{ width: 24, height: 24, background: T.copper, color: T.surface, borderRadius: 2 }}
              >
                <Zap size={12} strokeWidth={2}/>
              </div>
              <div className="flex-1">
                <div className="text-[12.5px]" style={{ color: T.ink, fontWeight: 500, lineHeight: 1.3 }}>
                  {s.title}
                </div>
                <div className="text-[10.5px] mt-1.5 flex items-center gap-2 flex-wrap" style={{ color: T.muted, fontStyle: 'italic' }}>
                  <span>{s.trigger}</span>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-[10.5px]" style={{ color: T.ok, fontFamily: FONT_MONO }}>
                    ↑ {s.impact}
                  </span>
                  <Pill tone={s.confidence === 'High' ? 'low' : 'med'}>{s.confidence} confidence</Pill>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2.5 ml-[34px]">
              <button className="text-[11px] px-2.5 py-1 rounded-[3px]" style={{ background: T.primary, color: T.surface, fontWeight: 500 }}>
                Enable
              </button>
              <button className="text-[11px] px-2.5 py-1 rounded-[3px]" style={{ color: T.muted }}>Dismiss</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   DASHBOARD — REVENUE TREND
   ============================================================ */
function RevenueTrend() {
  return (
    <div className="p-5" style={{ background: T.surface, border: `1px solid ${T.rule}`, borderRadius: 3 }}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="text-[10px] uppercase tracking-[0.16em]" style={{ color: T.muted, fontFamily: FONT_BODY }}>Last 6 months</div>
          <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 22, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.01em', lineHeight: 1.15 }}>
            Practice Revenue
          </h3>
        </div>
        <div className="flex items-baseline gap-1">
          <span style={{ fontFamily: FONT_DISPLAY, fontSize: 26, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.01em' }}>
            $16,130
          </span>
          <span className="text-[11px]" style={{ color: T.ok, fontFamily: FONT_MONO }}>+30.1% YoY</span>
        </div>
      </div>
      <div style={{ height: 130 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={REVENUE_TREND} margin={{ left: 0, right: 4, top: 4, bottom: 0 }}>
            <defs>
              <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={T.primary} stopOpacity={0.25}/>
                <stop offset="100%" stopColor={T.primary} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid stroke={T.rule} strokeDasharray="2 4" vertical={false}/>
            <XAxis dataKey="m" tick={{ fill: T.muted, fontSize: 10, fontFamily: FONT_BODY }} axisLine={false} tickLine={false}/>
            <YAxis hide domain={['dataMin - 1000', 'dataMax + 1000']}/>
            <Tooltip
              cursor={{ stroke: T.copper, strokeWidth: 1, strokeDasharray: '3 3' }}
              contentStyle={{ background: T.surface, border: `1px solid ${T.rule}`, fontSize: 11, fontFamily: FONT_BODY, borderRadius: 3 }}
              formatter={(v) => [fmt(v), 'Revenue']}
            />
            <Area type="monotone" dataKey="v" stroke={T.primary} strokeWidth={1.8} fill="url(#revFill)"/>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/* ============================================================
   DASHBOARD — ACTIVITY FEED
   ============================================================ */
function ActivityFeed() {
  const iconFor = (who, what) => {
    if (who === 'AI')               return { i: Brain,        c: T.copper };
    if (what.includes('signed'))    return { i: PenLine,      c: T.ok };
    if (what.includes('uploaded'))  return { i: FileText,     c: T.primary };
    if (what.includes('filed'))     return { i: FileCheck,    c: T.ok };
    if (what.includes('invoice'))   return { i: Receipt,      c: T.gold };
    if (what.includes('flagged'))   return { i: AlertTriangle,c: T.warn };
    return { i: Activity, c: T.ink2 };
  };
  return (
    <div className="p-5" style={{ background: T.surface, border: `1px solid ${T.rule}`, borderRadius: 3 }}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="text-[10px] uppercase tracking-[0.16em]" style={{ color: T.muted, fontFamily: FONT_BODY }}>Live · last 24h</div>
          <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 22, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.01em', lineHeight: 1.15 }}>
            Activity Stream
          </h3>
        </div>
      </div>
      <ul className="flex flex-col gap-3">
        {ACTIVITY.map(a => {
          const { i: Icon, c } = iconFor(a.who, a.what);
          return (
            <li key={a.id} className="flex items-start gap-3 text-[12.5px]" style={{ color: T.ink2 }}>
              <div
                className="flex items-center justify-center mt-0.5 shrink-0"
                style={{ width: 22, height: 22, background: T.surface2, border: `1px solid ${T.rule}`, borderRadius: 2 }}
              >
                <Icon size={11} style={{ color: c }} strokeWidth={1.8}/>
              </div>
              <div className="flex-1 min-w-0">
                <span style={{ color: T.ink, fontWeight: 500 }}>{a.who}</span>
                <span style={{ color: T.muted }}> {a.what} </span>
                <span style={{ color: T.ink }}>{a.obj}</span>
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
   DASHBOARD VIEW
   ============================================================ */
function DashboardView({ onPickClient }) {
  return (
    <div className="px-7 py-6 flex flex-col gap-5" style={{ fontFamily: FONT_BODY }}>
      {/* Greeting strip */}
      <div className="flex items-end justify-between">
        <div>
          <div className="text-[10.5px] uppercase tracking-[0.18em]" style={{ color: T.muted }}>
            Saturday · April 25, 2026
          </div>
          <h1 className="mt-1" style={{ fontFamily: FONT_DISPLAY, fontSize: 38, lineHeight: 1.05, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.02em' }}>
            Good afternoon, Suresh.
          </h1>
        </div>
        <div className="text-[11px]" style={{ color: T.muted }}>
          Synced 34s ago · <span style={{ color: T.ok }}>● online</span>
        </div>
      </div>

      <SeasonPulse/>

      {/* KPI row */}
      <div className="grid grid-cols-5 gap-3">
        <Kpi label="Active Clients"     value="42"     sub="3 onboarding"     delta="+4"   deltaTone="up"/>
        <Kpi label="Open Tasks"          value="28"     sub="6 due this week"  delta="-3"   deltaTone="up"/>
        <Kpi label="Pending Sigs"        value="07"     sub="$12.4k blocked"   delta="+2"   deltaTone="down"/>
        <Kpi label="MRR"                 value="$16.1k" sub="vs $13.4k last mo" delta="+20.1%" deltaTone="up"/>
        <Kpi label="A/R Outstanding"     value="$28.4k" sub="9 invoices"        delta="-8%"  deltaTone="up"/>
      </div>

      {/* Health matrix + deadline radar */}
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-7"><HealthMatrix onPick={onPickClient}/></div>
        <div className="col-span-5"><DeadlineRadar/></div>
      </div>

      {/* AI inbox + automation suggestions */}
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-7"><AiInbox/></div>
        <div className="col-span-5"><AutomationSuggestions/></div>
      </div>

      {/* Revenue + activity */}
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-7"><RevenueTrend/></div>
        <div className="col-span-5"><ActivityFeed/></div>
      </div>

      <div className="text-[10px] uppercase tracking-[0.18em] py-3 text-center" style={{ color: T.faint }}>
        — End of board · Ledger Practice Suite v4.7 —
      </div>
    </div>
  );
}

/* ============================================================
   CLIENTS VIEW
   ============================================================ */
function ClientsView({ pickedId, setPicked }) {
  const [filter, setFilter] = useState('all');
  const filtered = useMemo(() => {
    if (filter === 'all') return CLIENTS;
    return CLIENTS.filter(c => c.risk === filter);
  }, [filter]);
  const picked = CLIENTS.find(c => c.id === pickedId) || CLIENTS[0];

  return (
    <div className="px-7 py-6 grid grid-cols-12 gap-5" style={{ fontFamily: FONT_BODY }}>
      {/* List */}
      <div className="col-span-7">
        <div className="flex items-center justify-between mb-4">
          <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: 32, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.02em' }}>
            Clients <span style={{ color: T.muted, fontSize: 18 }}>· 42</span>
          </h1>
          <div className="flex items-center gap-2">
            {[
              ['all', 'All'], ['low', 'Low risk'], ['medium', 'Medium'], ['high', 'High'],
            ].map(([k, v]) => (
              <button
                key={k}
                onClick={() => setFilter(k)}
                className="text-[11px] px-2.5 py-1 rounded-[3px]"
                style={{
                  background: filter === k ? T.primary : T.surface,
                  color: filter === k ? T.surface : T.ink2,
                  border: `1px solid ${T.rule}`,
                  fontWeight: filter === k ? 500 : 400,
                }}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: T.surface, border: `1px solid ${T.rule}`, borderRadius: 3 }}>
          {/* header */}
          <div
            className="grid grid-cols-12 px-4 py-2 text-[9.5px] uppercase tracking-[0.14em]"
            style={{ color: T.muted, borderBottom: `1px solid ${T.rule}` }}
          >
            <div className="col-span-5">Client</div>
            <div className="col-span-2">Entity</div>
            <div className="col-span-2 text-right">MRR</div>
            <div className="col-span-3">Health</div>
          </div>
          {filtered.map(c => {
            const Icon = c.icon;
            const isPicked = c.id === picked.id;
            return (
              <button
                key={c.id}
                onClick={() => setPicked(c.id)}
                className="w-full grid grid-cols-12 px-4 py-3 items-center text-left transition-colors"
                style={{
                  background: isPicked ? T.surface2 : T.surface,
                  borderBottom: `1px solid ${T.rule}`,
                  borderLeft: `2px solid ${isPicked ? T.copper : 'transparent'}`,
                }}
              >
                <div className="col-span-5 flex items-center gap-2.5">
                  <div className="flex items-center justify-center" style={{ width: 28, height: 28, background: T.surface2, border: `1px solid ${T.rule}`, borderRadius: 3 }}>
                    <Icon size={13} style={{ color: T.primary }}/>
                  </div>
                  <div className="min-w-0">
                    <div className="text-[12.5px] truncate" style={{ color: T.ink, fontWeight: 500 }}>{c.name}</div>
                    <div className="text-[10.5px]" style={{ color: T.muted }}>{c.industry} · {c.state}</div>
                  </div>
                </div>
                <div className="col-span-2">
                  <Pill mono>{c.entity}</Pill>
                </div>
                <div className="col-span-2 text-right" style={{ fontFamily: FONT_MONO, fontSize: 12, color: T.ink }}>
                  {fmt(c.mrr)}
                </div>
                <div className="col-span-3"><HealthBar value={c.health}/></div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detail panel */}
      <div className="col-span-5">
        <ClientDetail c={picked}/>
      </div>
    </div>
  );
}

function ClientDetail({ c }) {
  const Icon = c.icon;
  const tabs = ['Overview', 'Documents', 'Tasks', 'Notes', 'Billing'];
  const [tab, setTab] = useState('Overview');

  return (
    <div className="sticky top-6" style={{ background: T.surface, border: `1px solid ${T.rule}`, borderRadius: 3 }}>
      {/* Header */}
      <div className="p-5" style={{ borderBottom: `1px solid ${T.rule}` }}>
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center" style={{ width: 44, height: 44, background: T.primary, color: T.surface, borderRadius: 3 }}>
            <Icon size={20}/>
          </div>
          <div className="flex-1 min-w-0">
            <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 22, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.01em', lineHeight: 1.15 }}>
              {c.name}
            </h3>
            <div className="text-[11px] mt-0.5" style={{ color: T.muted }}>
              {c.industry} · {c.state} · Entity {c.entity}
            </div>
          </div>
          <button className="p-1.5 rounded-[3px]" style={{ border: `1px solid ${T.rule}` }}>
            <MoreHorizontal size={13} style={{ color: T.muted }}/>
          </button>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3">
          <Stat label="Health" value={c.health} unit="/100" tone={c.risk}/>
          <Stat label="MRR" value={fmt(c.mrr)} mono/>
          <Stat label="Open A/R" value={c.openInv ? fmt(c.openInv) : '—'} mono tone={c.openInv > 2000 ? 'high' : 'low'}/>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex" style={{ borderBottom: `1px solid ${T.rule}` }}>
        {tabs.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="px-4 py-2.5 text-[11.5px]"
            style={{
              color: tab === t ? T.ink : T.muted,
              borderBottom: `2px solid ${tab === t ? T.copper : 'transparent'}`,
              fontWeight: tab === t ? 500 : 400,
              marginBottom: -1,
            }}
          >{t}</button>
        ))}
      </div>

      {/* Body */}
      <div className="p-5">
        {tab === 'Overview' && (
          <div className="flex flex-col gap-4">
            <div>
              <div className="text-[9.5px] uppercase tracking-[0.14em] mb-1.5" style={{ color: T.muted }}>Primary Contact</div>
              <div className="text-[13px]" style={{ color: T.ink, fontWeight: 500 }}>{c.contact}</div>
              <div className="flex flex-col gap-1 mt-1.5 text-[11.5px]" style={{ color: T.ink2 }}>
                <span className="flex items-center gap-1.5"><AtSign size={11} style={{ color: T.muted }}/>{c.email}</span>
                <span className="flex items-center gap-1.5"><Phone size={11} style={{ color: T.muted }}/>{c.phone}</span>
              </div>
            </div>
            <Rule/>
            <div>
              <div className="text-[9.5px] uppercase tracking-[0.14em] mb-1.5" style={{ color: T.muted }}>Current Status</div>
              <div className="flex items-center gap-2">
                <Pill tone={c.risk === 'low' ? 'low' : c.risk === 'medium' ? 'med' : 'high'}>{c.status}</Pill>
                <span className="text-[11px]" style={{ color: T.muted }}>last contact {c.last} ago</span>
              </div>
            </div>
            <Rule/>
            <div>
              <div className="text-[9.5px] uppercase tracking-[0.14em] mb-2" style={{ color: T.muted }}>AI Insights</div>
              <div className="flex flex-col gap-2">
                <Insight tone="warn" text="Fuel expense ratio +312% MoM — verify §263A capitalization rules."/>
                <Insight tone="info" text={`State of ${c.state} has no income tax — ensure no state filing obligations elsewhere.`}/>
                <Insight tone="ok"   text="Q1 estimated payments tracking on plan; safe harbor met."/>
              </div>
            </div>
          </div>
        )}
        {tab !== 'Overview' && (
          <div className="text-[12px] py-8 text-center" style={{ color: T.muted, fontStyle: 'italic' }}>
            {tab} view — {c.tasks} active items
          </div>
        )}
      </div>

      <div className="px-5 py-3 flex items-center gap-2" style={{ background: T.surface2, borderTop: `1px solid ${T.rule}` }}>
        <button className="flex-1 text-[11.5px] py-1.5 rounded-[3px]" style={{ background: T.primary, color: T.surface, fontWeight: 500 }}>Open Workspace</button>
        <button className="text-[11.5px] py-1.5 px-3 rounded-[3px]" style={{ border: `1px solid ${T.rule}`, color: T.ink2 }}>Message</button>
      </div>
    </div>
  );
}

function Stat({ label, value, unit, tone, mono }) {
  const c = tone === 'high' ? T.danger : tone === 'medium' ? T.warn : tone === 'low' ? T.ok : T.ink;
  return (
    <div>
      <div className="text-[9.5px] uppercase tracking-[0.14em]" style={{ color: T.muted }}>{label}</div>
      <div className="mt-0.5" style={{ fontFamily: mono ? FONT_MONO : FONT_DISPLAY, fontSize: mono ? 16 : 22, color: c, fontStyle: mono ? 'normal' : 'italic', lineHeight: 1.1 }}>
        {value}{unit && <span className="text-[10px]" style={{ color: T.muted, fontFamily: FONT_BODY, fontStyle: 'normal' }}>{unit}</span>}
      </div>
    </div>
  );
}

function Insight({ tone, text }) {
  const map = {
    warn: { c: T.warn,    Icon: AlertTriangle },
    ok:   { c: T.ok,      Icon: CheckCircle2 },
    info: { c: T.primary, Icon: ShieldCheck },
  };
  const { c, Icon } = map[tone] || map.info;
  return (
    <div className="flex items-start gap-2 text-[11.5px]" style={{ color: T.ink2, lineHeight: 1.45 }}>
      <Icon size={12} style={{ color: c, marginTop: 2, flexShrink: 0 }}/>
      {text}
    </div>
  );
}

/* ============================================================
   TASKS VIEW (Kanban-style)
   ============================================================ */
function TasksView() {
  const cols = [
    { id: 'todo',         label: 'To Do',       count: TASKS.filter(t => t.status === 'todo').length },
    { id: 'in_progress',  label: 'In Progress', count: TASKS.filter(t => t.status === 'in_progress').length },
    { id: 'review',       label: 'Review',      count: TASKS.filter(t => t.status === 'review').length },
    { id: 'done',         label: 'Done',        count: 14 },
  ];
  return (
    <div className="px-7 py-6" style={{ fontFamily: FONT_BODY }}>
      <div className="flex items-end justify-between mb-5">
        <div>
          <div className="text-[10.5px] uppercase tracking-[0.18em]" style={{ color: T.muted }}>Workflows</div>
          <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: 32, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.02em' }}>
            Tasks Board
          </h1>
        </div>
        <button className="px-3 py-1.5 text-[12px] flex items-center gap-1.5 rounded-[3px]" style={{ background: T.primary, color: T.surface, fontWeight: 500 }}>
          <Plus size={13}/> New Task
        </button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {cols.map(col => (
          <div key={col.id} style={{ background: T.surface, border: `1px solid ${T.rule}`, borderRadius: 3 }}>
            <div className="px-3 py-2.5 flex items-center justify-between" style={{ borderBottom: `1px solid ${T.rule}` }}>
              <span className="text-[11px] uppercase tracking-[0.14em]" style={{ color: T.ink2, fontWeight: 500 }}>{col.label}</span>
              <span className="text-[10.5px]" style={{ color: T.muted, fontFamily: FONT_MONO }}>{col.count}</span>
            </div>
            <div className="p-2.5 flex flex-col gap-2 min-h-[300px]">
              {TASKS.filter(t => t.status === col.id).map(t => (
                <div key={t.id} className="p-2.5 rounded-[3px]" style={{ background: T.surface2, border: `1px solid ${T.rule}` }}>
                  <div className="text-[12px] leading-tight mb-1.5" style={{ color: T.ink, fontWeight: 500 }}>{t.title}</div>
                  <div className="text-[10.5px] mb-2" style={{ color: T.muted }}>{t.client}</div>
                  <div className="flex items-center justify-between">
                    <Pill tone={t.priority === 'high' ? 'high' : t.priority === 'medium' ? 'med' : 'low'}>{t.priority}</Pill>
                    <span className="text-[10px]" style={{ color: T.muted, fontFamily: FONT_MONO }}>{t.due}</span>
                  </div>
                </div>
              ))}
              {col.id === 'done' && (
                <div className="text-[10.5px] py-4 text-center" style={{ color: T.faint, fontStyle: 'italic' }}>
                  + 14 archived this week
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   DOCUMENTS VIEW (compact)
   ============================================================ */
function DocumentsView() {
  const folders = [
    { name: 'Engagement Letters', count: 14 },
    { name: 'Tax Returns 2025',   count: 8  },
    { name: 'IRS Notices',        count: 4  },
    { name: 'Bank Statements',    count: 96 },
    { name: 'K-1s',               count: 11 },
    { name: '1099s',              count: 23 },
  ];
  return (
    <div className="px-7 py-6 grid grid-cols-12 gap-5" style={{ fontFamily: FONT_BODY }}>
      <div className="col-span-3">
        <h1 className="mb-4" style={{ fontFamily: FONT_DISPLAY, fontSize: 32, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.02em' }}>
          Documents
        </h1>
        <div style={{ background: T.surface, border: `1px solid ${T.rule}`, borderRadius: 3 }}>
          <div className="text-[9.5px] uppercase tracking-[0.14em] px-3 py-2" style={{ color: T.muted, borderBottom: `1px solid ${T.rule}` }}>Folders</div>
          {folders.map(f => (
            <div key={f.name} className="flex items-center gap-2.5 px-3 py-2 text-[12px]" style={{ borderBottom: `1px solid ${T.rule}`, color: T.ink2 }}>
              <FolderOpen size={13} style={{ color: T.copper }}/>
              <span className="flex-1">{f.name}</span>
              <span className="text-[10.5px]" style={{ color: T.muted, fontFamily: FONT_MONO }}>{f.count}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-9">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[12px]" style={{ color: T.muted }}>Recent · auto-classified by AI</span>
          <button className="px-3 py-1.5 text-[12px] flex items-center gap-1.5 rounded-[3px]" style={{ background: T.primary, color: T.surface, fontWeight: 500 }}>
            <Plus size={13}/> Upload
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {AI_INBOX.concat(AI_INBOX).slice(0, 9).map((d, i) => (
            <div key={i} className="p-4" style={{ background: T.surface, border: `1px solid ${T.rule}`, borderRadius: 3 }}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center justify-center" style={{ width: 36, height: 44, background: T.surface2, border: `1px solid ${T.rule}`, borderRadius: 2 }}>
                  <FileText size={16} style={{ color: T.primary }}/>
                </div>
                <Pill tone="primary">{d.type}</Pill>
              </div>
              <div className="text-[12px] truncate mb-1" style={{ color: T.ink, fontFamily: FONT_MONO }}>{d.file}</div>
              <div className="text-[10.5px]" style={{ color: T.muted }}>{d.client}</div>
              <div className="flex items-center justify-between mt-3 pt-2.5" style={{ borderTop: `1px solid ${T.rule}` }}>
                <span className="text-[10px]" style={{ color: T.ok, fontFamily: FONT_MONO }}>{d.confidence}% AI match</span>
                <div className="flex items-center gap-1.5">
                  <button className="p-1 rounded-[2px]" style={{ border: `1px solid ${T.rule}` }}><Eye size={11} style={{ color: T.muted }}/></button>
                  <button className="p-1 rounded-[2px]" style={{ border: `1px solid ${T.rule}` }}><Download size={11} style={{ color: T.muted }}/></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   MESSAGES VIEW (compact)
   ============================================================ */
function MessagesView() {
  const [picked, setPicked] = useState(2);
  const m = MESSAGES.find(x => x.id === picked) || MESSAGES[0];
  return (
    <div className="px-7 py-6 grid grid-cols-12 gap-5" style={{ fontFamily: FONT_BODY }}>
      <div className="col-span-4">
        <h1 className="mb-4" style={{ fontFamily: FONT_DISPLAY, fontSize: 32, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.02em' }}>
          Inbox
        </h1>
        <div style={{ background: T.surface, border: `1px solid ${T.rule}`, borderRadius: 3 }}>
          {MESSAGES.map(msg => (
            <button
              key={msg.id}
              onClick={() => setPicked(msg.id)}
              className="w-full flex items-start gap-3 p-3 text-left"
              style={{
                background: picked === msg.id ? T.surface2 : T.surface,
                borderBottom: `1px solid ${T.rule}`,
                borderLeft: `2px solid ${picked === msg.id ? T.copper : 'transparent'}`,
              }}
            >
              <div className="flex items-center justify-center text-[11px]" style={{ width: 30, height: 30, borderRadius: '50%', background: T.primary, color: T.surface, fontWeight: 600 }}>
                {msg.from.split(' ').map(s => s[0]).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[12.5px] truncate" style={{ color: T.ink, fontWeight: msg.unread ? 600 : 400 }}>{msg.from}</span>
                  {msg.unread && <span className="w-1.5 h-1.5 rounded-full" style={{ background: T.copper }}/>}
                  <span className="ml-auto text-[10.5px]" style={{ color: T.muted, fontFamily: FONT_MONO }}>{msg.time}</span>
                </div>
                <div className="text-[10.5px]" style={{ color: T.muted }}>{msg.org}</div>
                <div className="text-[11.5px] mt-1 truncate" style={{ color: T.ink2 }}>{msg.preview}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
      <div className="col-span-8">
        <div style={{ background: T.surface, border: `1px solid ${T.rule}`, borderRadius: 3, minHeight: 600 }}>
          <div className="p-5" style={{ borderBottom: `1px solid ${T.rule}` }}>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center text-[14px]" style={{ width: 44, height: 44, borderRadius: '50%', background: T.primary, color: T.surface, fontWeight: 600 }}>
                {m.from.split(' ').map(s => s[0]).join('')}
              </div>
              <div>
                <div className="text-[14px]" style={{ color: T.ink, fontWeight: 500 }}>{m.from}</div>
                <div className="text-[11px]" style={{ color: T.muted }}>{m.org} · {m.time} ago</div>
              </div>
            </div>
          </div>
          <div className="p-5">
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 22, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.01em', marginBottom: 8 }}>
              {m.preview.split('.')[0]}.
            </div>
            <div className="text-[13px] leading-[1.65]" style={{ color: T.ink2 }}>
              Hi Suresh, hope you're well. {m.preview} Let me know if you need anything else from our side — happy to jump on a call.
              <br/><br/>
              Thanks,<br/>{m.from}
            </div>
          </div>
          <div className="p-4 mt-2" style={{ borderTop: `1px solid ${T.rule}`, background: T.surface2 }}>
            <div className="flex items-center gap-2">
              <input
                placeholder="Reply…"
                className="flex-1 px-3 py-2 text-[12.5px] outline-none rounded-[3px]"
                style={{ background: T.surface, border: `1px solid ${T.rule}` }}
              />
              <button className="p-2 rounded-[3px]" style={{ background: T.primary }}>
                <Send size={14} style={{ color: T.surface }}/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   STUB VIEWS
   ============================================================ */
function StubView({ icon: Icon, title, text }) {
  return (
    <div className="px-7 py-6" style={{ fontFamily: FONT_BODY }}>
      <h1 className="mb-2" style={{ fontFamily: FONT_DISPLAY, fontSize: 32, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.02em' }}>
        {title}
      </h1>
      <p className="text-[13px] mb-6" style={{ color: T.muted }}>{text}</p>
      <div
        className="flex flex-col items-center justify-center py-20 rounded-[3px]"
        style={{ background: T.surface, border: `1px dashed ${T.rule2}` }}
      >
        <div className="flex items-center justify-center mb-3" style={{ width: 56, height: 56, borderRadius: '50%', background: T.surface2, border: `1px solid ${T.rule}` }}>
          <Icon size={22} style={{ color: T.primary }}/>
        </div>
        <div className="text-[14px]" style={{ color: T.ink2, fontWeight: 500 }}>Module ready · demo data wired in main views</div>
        <div className="text-[11.5px] mt-1.5" style={{ color: T.muted }}>Try Dashboard, Clients, Documents, Tasks, or Messages</div>
      </div>
    </div>
  );
}

/* ============================================================
   AI ASSISTANT FLOATING PANEL
   ============================================================ */
function AiAssistant({ open, setOpen }) {
  const [messages, setMessages] = useState([
    { who: 'ai',   text: "Hi Suresh — I'm your tax assistant. Ask me about IRC sections, client positions, or run quick analyses." },
    { who: 'user', text: 'Summarize Cheyenne Ridge open issues.' },
    { who: 'ai',   text: 'Cheyenne Ridge Construction (1120, WY): 1 open IRS CP2000 ($8,412 proposed) due May 12. Health 45 (high risk). 11 open tasks, 8 notes, $5,400 A/R 47 days aged. Priority: draft CP2000 response.' },
  ]);
  const [draft, setDraft] = useState('');
  const endRef = useRef(null);
  useEffect(() => { if (open) endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, open]);

  const send = () => {
    if (!draft.trim()) return;
    const userMsg = { who: 'user', text: draft };
    const reply = generateReply(draft);
    setMessages(m => [...m, userMsg, { who: 'ai', text: reply }]);
    setDraft('');
  };

  if (!open) return null;
  return (
    <div
      className="fixed flex flex-col"
      style={{
        right: 24, bottom: 24, width: 400, height: 560, background: T.surface,
        border: `1px solid ${T.rule}`, borderRadius: 4,
        boxShadow: '0 30px 60px -20px rgba(20,15,8,0.3), 0 12px 24px -10px rgba(20,15,8,0.15)',
        fontFamily: FONT_BODY, zIndex: 50,
      }}
    >
      <div className="flex items-center gap-2.5 px-4 py-3" style={{ background: T.primary, color: T.surface, borderRadius: '3px 3px 0 0' }}>
        <div
          className="flex items-center justify-center"
          style={{ width: 26, height: 26, borderRadius: '50%', background: 'rgba(255,253,248,0.15)' }}
        >
          <Bot size={14}/>
        </div>
        <div className="flex-1">
          <div className="text-[13px]" style={{ fontWeight: 500 }}>Ledger AI · Tax Co-Pilot</div>
          <div className="text-[10px]" style={{ color: T.copperLt }}>Trained on IRC, Treasury Regs, and your practice data</div>
        </div>
        <button onClick={() => setOpen(false)} className="p-1"><X size={14}/></button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3" style={{ background: T.surface2 }}>
        {messages.map((m, i) => (
          <div key={i} className={cx('flex', m.who === 'user' ? 'justify-end' : 'justify-start')}>
            <div
              className="text-[12.5px] px-3 py-2 max-w-[85%] rounded-[6px]"
              style={{
                background: m.who === 'user' ? T.primary : T.surface,
                color: m.who === 'user' ? T.surface : T.ink,
                border: m.who === 'user' ? 'none' : `1px solid ${T.rule}`,
                lineHeight: 1.5,
              }}
            >
              {m.text}
            </div>
          </div>
        ))}
        <div ref={endRef}/>
      </div>

      <div className="p-2.5 flex flex-col gap-2" style={{ borderTop: `1px solid ${T.rule}` }}>
        <div className="flex items-center gap-1.5 flex-wrap">
          {['Draft CP2000 reply', '§179 vs bonus', 'WY filing rules'].map(s => (
            <button
              key={s}
              onClick={() => setDraft(s)}
              className="text-[10.5px] px-2 py-0.5 rounded-[2px]"
              style={{ background: T.surface2, border: `1px solid ${T.rule}`, color: T.ink2 }}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
            placeholder="Ask about a client, form, or IRC section…"
            className="flex-1 px-3 py-2 text-[12px] outline-none rounded-[3px]"
            style={{ background: T.surface, border: `1px solid ${T.rule}`, color: T.ink }}
          />
          <button onClick={send} className="p-2 rounded-[3px]" style={{ background: T.primary }}>
            <Send size={13} style={{ color: T.surface }}/>
          </button>
        </div>
      </div>
    </div>
  );
}

function generateReply(q) {
  const s = q.toLowerCase();
  if (s.includes('179') || s.includes('bonus')) {
    return '§179 caps at $1.16M for 2024 with phase-out at $2.89M. Bonus depreciation is 60% in 2024, dropping to 40% in 2025. For Bison Crude\'s new rig: §179 if taxable income absorbs it; bonus otherwise. Different state conformity matters in CO/MT.';
  }
  if (s.includes('cp2000')) {
    return 'CP2000 response template for Cheyenne Ridge: (1) acknowledge proposed change, (2) attach corrected Schedule C with reconciliation, (3) request abatement under reasonable cause if penalty applies. Want me to draft the full letter?';
  }
  if (s.includes('wy') || s.includes('wyoming')) {
    return 'Wyoming has no state income tax for individuals or corporations. No state filing for income tax obligations. Sales/use tax applies (4% state). Annual report and license tax due to Secretary of State for entities — $60 minimum.';
  }
  if (s.includes('941')) {
    return 'Q1 941 due April 30. Six payroll clients pending: Big Horn (missing March), Powder River (W-2 reconciliation), Niobrara, High Plains, Granite Peak, Sweetwater. I can prep batch reminders.';
  }
  return 'I can pull client data, run tax position analyses, draft responses, or research IRC sections. Try: "summarize next 30 days of deadlines" or "compare §179 vs bonus for trucking clients."';
}

/* ============================================================
   APP
   ============================================================ */
export default function App() {
  const [active, setActive] = useState('dashboard');
  const [q, setQ] = useState('');
  const [aiOpen, setAiOpen] = useState(false);
  const [pickedClient, setPickedClient] = useState(4); // Cheyenne Ridge highlighted

  // Inject fonts
  useEffect(() => {
    const id = 'ledger-fonts';
    if (document.getElementById(id)) return;
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap';
    document.head.appendChild(link);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: T.bg, color: T.ink }}>
      <Sidebar active={active} setActive={setActive} onAi={() => setAiOpen(true)}/>

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar active={active} q={q} setQ={setQ}/>
        <div className="flex-1 overflow-y-auto" style={{ background: T.bg }}>
          {active === 'dashboard' && <DashboardView onPickClient={(c) => { setPickedClient(c.id); setActive('clients'); }}/>}
          {active === 'clients'   && <ClientsView pickedId={pickedClient} setPicked={setPickedClient}/>}
          {active === 'documents' && <DocumentsView/>}
          {active === 'tasks'     && <TasksView/>}
          {active === 'messages'  && <MessagesView/>}
          {active === 'esign'     && <StubView icon={PenLine}    title="E-Signatures"  text="Engagement letters, 8879 e-file authorizations, and disclosure forms — KBA & remote ID verification built in."/>}
          {active === 'invoicing' && <StubView icon={Receipt}    title="Invoicing"     text="Recurring monthly retainers, fixed-fee engagements, and time-based billing with Stripe / ACH integration."/>}
          {active === 'calendar'  && <StubView icon={Calendar}   title="Calendar"      text="Tax deadlines, client meetings, and court dates — synced with Google Calendar and Outlook."/>}
          {active === 'reports'   && <StubView icon={BarChart3}  title="Reports"       text="Realization, utilization, client profitability, and partner-level metrics."/>}
        </div>
      </div>

      {/* Floating AI button */}
      {!aiOpen && (
        <button
          onClick={() => setAiOpen(true)}
          className="fixed flex items-center gap-2 px-3.5 py-2.5 rounded-full"
          style={{
            right: 24, bottom: 24, background: T.primary, color: T.surface,
            boxShadow: '0 16px 30px -10px rgba(11,61,58,0.45)',
            border: `1px solid ${T.primary2}`,
            fontFamily: FONT_BODY, fontSize: 12.5, fontWeight: 500, zIndex: 40,
          }}
        >
          <Sparkles size={14} strokeWidth={2}/>
          Ask Ledger AI
        </button>
      )}

      <AiAssistant open={aiOpen} setOpen={setAiOpen}/>
    </div>
  );
}
