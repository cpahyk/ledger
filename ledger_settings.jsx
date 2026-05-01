import React, { useState, useEffect } from 'react';
import {
  Settings, User, Users, Building2, Shield, Lock, Key, CreditCard,
  Receipt, Link2, Zap, Bell, Mail, Globe, Palette, FileText,
  ChevronRight, ChevronDown, ChevronLeft, ArrowRight, Check, X,
  Plus, Search, Filter, MoreHorizontal, Trash2, Edit3, Eye, EyeOff,
  Copy, Download, Upload, Sparkles, AlertTriangle, CheckCircle2,
  Circle, CircleDot, Clock, Calendar, Phone, AtSign, Hash, Star,
  Pin, Image as ImageIcon, RefreshCw, ExternalLink, Info,
  ShieldCheck, ShieldAlert, Database, Server, Activity, Smartphone,
  Monitor, Wifi, MapPin, LogOut, BadgeCheck, FileCheck, Sliders,
  TrendingUp, ArrowUpRight, ArrowDownRight, Briefcase, Award,
  HardHat, Truck, Factory,
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
   DATA
   ============================================================ */
const TABS = [
  { id: 'firm',         label: 'Firm profile',     icon: Building2 },
  { id: 'team',         label: 'Team & roles',     icon: Users,    badge: 4 },
  { id: 'billing',      label: 'Plan & billing',   icon: CreditCard },
  { id: 'integrations', label: 'Integrations',     icon: Link2 },
  { id: 'whitelabel',   label: 'White-label',      icon: Palette },
  { id: 'security',     label: 'Security',         icon: Shield },
  { id: 'audit',        label: 'Audit log',        icon: Activity },
];

const TEAM = [
  {
    id: 1, name: 'Suresh Patel',  initial: 'SP', role: 'admin',     credential: 'EA',
    email: 'suresh@hyktax.co',     phone: '+1 (307) 555-0142', joined: 'Aug 2024',
    twofa: true, lastActive: 'just now', clients: 42, color: T.copper, you: true,
  },
  {
    id: 2, name: 'Margaux Renault',  initial: 'MR', role: 'admin', credential: 'CPA, MST',
    email: 'margaux@hyktax.co',  phone: '+1 (307) 555-0188', joined: 'Sep 2024',
    twofa: true, lastActive: '2h ago', clients: 28, color: T.primary, you: false,
  },
  {
    id: 3, name: 'Hollis Garner',    initial: 'HG', role: 'preparer', credential: 'EA',
    email: 'hollis@hyktax.co',  phone: '+1 (307) 555-0166', joined: 'Jan 2025',
    twofa: true, lastActive: 'Yesterday', clients: 14, color: T.gold, you: false,
  },
  {
    id: 4, name: 'Della Marston',    initial: 'DM', role: 'bookkeeper', credential: 'QBO ProAdvisor',
    email: 'della@hyktax.co',   phone: '+1 (406) 555-0177', joined: 'Mar 2025',
    twofa: false, lastActive: '3d ago', clients: 9, color: T.primary2, you: false,
  },
];

const PENDING_INVITES = [
  { id: 1, email: 'wyatt@hyktax.co',     role: 'preparer',  sent: '2 days ago' },
  { id: 2, email: 'tessa@hyktax.co',     role: 'reviewer',  sent: '5 days ago' },
];

const ROLES = [
  {
    k: 'admin', name: 'Admin', desc: 'Full access · billing · team management',
    perms: { clients: 'all', billing: true, team: true, settings: true, sign: true, delete: true },
  },
  {
    k: 'preparer', name: 'Preparer', desc: 'Tax prep · client comms · cannot delete',
    perms: { clients: 'assigned', billing: false, team: false, settings: false, sign: true, delete: false },
  },
  {
    k: 'reviewer', name: 'Reviewer', desc: 'Read + sign-off · final review only',
    perms: { clients: 'assigned', billing: false, team: false, settings: false, sign: true, delete: false },
  },
  {
    k: 'bookkeeper', name: 'Bookkeeper', desc: 'Books only · cannot see returns',
    perms: { clients: 'assigned', billing: false, team: false, settings: false, sign: false, delete: false },
  },
  {
    k: 'staff', name: 'Admin staff', desc: 'Scheduling, billing, no client work',
    perms: { clients: 'none', billing: true, team: false, settings: false, sign: false, delete: false },
  },
];

const INTEGRATIONS_DATA = [
  { k: 'qb',       name: 'QuickBooks Online',  cat: 'Bookkeeping',   status: 'connected',   linked: '12 clients',   lastSync: '4 min ago' },
  { k: 'stripe',   name: 'Stripe',              cat: 'Payments',     status: 'connected',   linked: 'Practice',     lastSync: '1 hr ago' },
  { k: 'gmail',    name: 'Gmail',                cat: 'Email',       status: 'connected',   linked: '2 mailboxes',  lastSync: '12 min ago' },
  { k: 'gcal',     name: 'Google Calendar',      cat: 'Calendar',    status: 'connected',   linked: 'Personal',     lastSync: '3 min ago' },
  { k: 'plaid',    name: 'Plaid',                cat: 'Bank feeds',  status: 'needs-auth',  linked: '8 clients',    lastSync: 'Auth expired' },
  { k: 'drake',    name: 'Drake Tax',            cat: 'Tax software',status: 'connected',   linked: '2026 season',  lastSync: 'Yesterday' },
  { k: 'zoom',     name: 'Zoom',                 cat: 'Meetings',    status: 'available',   linked: '—',            lastSync: '—' },
  { k: 'slack',    name: 'Slack',                cat: 'Team chat',   status: 'available',   linked: '—',            lastSync: '—' },
  { k: 'docusign', name: 'DocuSign',             cat: 'E-signature', status: 'available',   linked: '—',            lastSync: '—' },
];

const AUDIT_EVENTS = [
  { id: 1, who: 'Suresh Patel',  what: 'opened',    obj: "Cheyenne Ridge Construction · CP2000 response", when: '12 min ago',  ip: '203.0.113.42',  device: 'Chrome · macOS', sev: 'info' },
  { id: 2, who: 'Hollis Garner', what: 'signed',     obj: 'Form 7004 extension · Niobrara Energy',         when: '47 min ago',  ip: '198.51.100.7',  device: 'Safari · macOS', sev: 'info' },
  { id: 3, who: 'AI',             what: 'classified', obj: '14 documents auto-routed to client folders',    when: '1h ago',      ip: '—',             device: 'system',         sev: 'info' },
  { id: 4, who: 'Cody Whitman',   what: 'signed',     obj: 'Engagement Letter 2026 · Powder River',         when: '2h ago',      ip: '173.245.55.193',device: 'iOS · iPhone',   sev: 'success' },
  { id: 5, who: 'Suresh Patel',   what: 'updated',    obj: 'Firm payout method · ACH ****8421',             when: '3h ago',      ip: '203.0.113.42',  device: 'Chrome · macOS', sev: 'critical' },
  { id: 6, who: 'Margaux Renault',what: 'invited',    obj: 'wyatt@hyktax.co as Preparer',                    when: 'Yesterday',  ip: '198.51.100.14', device: 'Chrome · Windows',sev: 'info' },
  { id: 7, who: 'Della Marston',  what: 'failed login',obj:'2FA code mismatch · 3 attempts',                 when: 'Yesterday',  ip: '45.32.104.221', device: 'unknown',        sev: 'warn' },
  { id: 8, who: 'Suresh Patel',   what: 'enabled',    obj: 'SSO via Google Workspace',                       when: '2d ago',     ip: '203.0.113.42',  device: 'Chrome · macOS', sev: 'critical' },
];

const ACTIVE_SESSIONS = [
  { id: 1, device: 'MacBook Pro · Chrome 134',  loc: 'Surat, India',     ip: '203.0.113.42',  current: true,  last: 'now' },
  { id: 2, device: 'iPhone 15 · Safari',         loc: 'Surat, India',     ip: '203.0.113.42',  current: false, last: '14 min ago' },
  { id: 3, device: 'iPad · Ledger app',          loc: 'Cheyenne, WY (VPN)', ip: '198.51.100.221', current: false, last: '2 days ago' },
];

const INVOICES = [
  { id: 'LEDG-2604', date: 'Apr 1, 2026', amount: 149.00, status: 'paid', desc: 'Practice plan — March' },
  { id: 'LEDG-2589', date: 'Mar 1, 2026', amount: 149.00, status: 'paid', desc: 'Practice plan — February' },
  { id: 'LEDG-2571', date: 'Feb 1, 2026', amount: 149.00, status: 'paid', desc: 'Practice plan — January' },
  { id: 'LEDG-2554', date: 'Jan 1, 2026', amount: 149.00, status: 'paid', desc: 'Practice plan — December' },
  { id: 'LEDG-2538', date: 'Dec 1, 2025', amount:  98.00, status: 'paid', desc: 'Pro-rata · upgraded mid-month' },
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

function Toggle({ on, onChange }) {
  return (
    <button
      onClick={() => onChange(!on)}
      className="flex items-center"
      style={{
        width: 38, height: 22, borderRadius: 11, padding: 2,
        background: on ? T.primary : T.rule2,
        transition: 'background 200ms',
        position: 'relative',
      }}
    >
      <span
        style={{
          width: 18, height: 18, borderRadius: '50%', background: T.surface,
          position: 'absolute', left: on ? 18 : 2,
          transition: 'left 200ms cubic-bezier(.2,.8,.2,1)',
          boxShadow: '0 1px 3px rgba(20,15,8,0.2)',
        }}
      />
    </button>
  );
}

function Section({ title, subtitle, children, action }) {
  return (
    <section className="mb-10">
      <div className="flex items-end justify-between mb-4">
        <div>
          <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 22, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.01em', lineHeight: 1.15 }}>
            {title}
          </h3>
          {subtitle && <p className="mt-1 text-[12.5px]" style={{ color: T.muted, fontFamily: FONT_BODY }}>{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

function Field({ label, hint, children, full }) {
  return (
    <div className={cx('flex flex-col gap-1.5', full && 'col-span-2')}>
      <div className="flex items-baseline justify-between">
        <label className="text-[10.5px] uppercase tracking-[0.14em]" style={{ color: T.muted, fontFamily: FONT_BODY, fontWeight: 500 }}>
          {label}
        </label>
        {hint && <span className="text-[10px]" style={{ color: T.faint, fontFamily: FONT_BODY }}>{hint}</span>}
      </div>
      {children}
    </div>
  );
}

function Input(props) {
  return (
    <input
      {...props}
      className={cx('w-full px-3 py-2.5 outline-none rounded-[3px] text-[13px]', props.className)}
      style={{ background: T.surface2, border: `1px solid ${T.rule}`, color: T.ink, fontFamily: FONT_BODY, ...props.style }}
    />
  );
}

/* ============================================================
   SHELL — top-level settings page with sidebar tabs
   ============================================================ */
function Shell({ active, setActive, children }) {
  return (
    <div className="flex h-screen overflow-hidden" style={{ background: T.bg, fontFamily: FONT_BODY }}>
      {/* Sidebar */}
      <aside
        className="flex flex-col"
        style={{
          width: 260, background: T.surface, borderRight: `1px solid ${T.rule}`,
        }}
      >
        {/* Header */}
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
              <span style={{ fontFamily: FONT_DISPLAY, fontSize: 19, color: T.ink, lineHeight: 1, letterSpacing: '-0.01em' }}>
                Ledger<span style={{ color: T.copper }}>.</span>
              </span>
              <span className="text-[9px] uppercase tracking-[0.16em]" style={{ color: T.muted, marginTop: 1 }}>
                Settings
              </span>
            </div>
          </div>

          <button className="mt-5 flex items-center gap-1.5 text-[11.5px]" style={{ color: T.muted }}>
            <ChevronLeft size={12}/> Back to dashboard
          </button>
        </div>

        {/* Tabs */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <div className="text-[9.5px] uppercase tracking-[0.16em] px-2 pb-2" style={{ color: T.faint }}>Configure</div>
          {TABS.map(t => {
            const Icon = t.icon;
            const isActive = active === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className="w-full flex items-center gap-2.5 px-2 py-[7px] mb-[2px] text-[13px] text-left rounded-[3px]"
                style={{
                  background: isActive ? T.surface2 : 'transparent',
                  color: isActive ? T.ink : T.ink2,
                  borderLeft: `2px solid ${isActive ? T.copper : 'transparent'}`,
                  paddingLeft: 8,
                  fontWeight: isActive ? 500 : 400,
                }}
              >
                <Icon size={14} strokeWidth={1.6} style={{ color: isActive ? T.primary : T.muted }}/>
                <span className="flex-1">{t.label}</span>
                {t.badge && (
                  <span className="text-[9.5px] px-1.5 rounded-full" style={{ background: T.copper, color: T.surface, fontFamily: FONT_MONO }}>
                    {t.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="text-[9.5px] uppercase tracking-[0.16em] px-2 pt-5 pb-2" style={{ color: T.faint }}>Account</div>
          <button className="w-full flex items-center gap-2.5 px-2 py-[7px] text-[13px] text-left" style={{ color: T.ink2 }}>
            <User size={14} strokeWidth={1.6} style={{ color: T.muted }}/>
            <span>Personal preferences</span>
          </button>
          <button className="w-full flex items-center gap-2.5 px-2 py-[7px] text-[13px] text-left" style={{ color: T.ink2 }}>
            <Bell size={14} strokeWidth={1.6} style={{ color: T.muted }}/>
            <span>Notifications</span>
          </button>
          <button className="w-full flex items-center gap-2.5 px-2 py-[7px] text-[13px] text-left" style={{ color: T.ink2 }}>
            <FileText size={14} strokeWidth={1.6} style={{ color: T.muted }}/>
            <span>Email templates</span>
          </button>
        </nav>

        <div className="px-5 py-4" style={{ borderTop: `1px solid ${T.rule}` }}>
          <div
            className="flex items-center gap-2.5 px-3 py-2 rounded-[3px]"
            style={{ background: T.surface2 }}
          >
            <div
              className="flex items-center justify-center text-[11px]"
              style={{ width: 26, height: 26, borderRadius: '50%', background: T.copper, color: T.surface, fontWeight: 600 }}
            >SP</div>
            <div className="flex-1 min-w-0">
              <div className="text-[12px] truncate" style={{ color: T.ink, fontWeight: 500 }}>HYK Tax</div>
              <div className="text-[10px]" style={{ color: T.muted }}>Practice · 4 seats</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

function PageHeader({ num, eyebrow, title, subtitle, action }) {
  return (
    <header
      className="px-12 pt-10 pb-6"
      style={{ borderBottom: `1px solid ${T.rule}`, background: T.bg }}
    >
      <div className="flex items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: T.copper, fontWeight: 500 }}>{num}</span>
            <span style={{ width: 24, height: 1, background: T.rule2 }}/>
            <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: T.muted }}>{eyebrow}</span>
          </div>
          <h1
            className="mt-4"
            style={{
              fontFamily: FONT_DISPLAY, fontSize: 44, lineHeight: 1.05,
              letterSpacing: '-0.025em', color: T.ink, fontStyle: 'italic',
            }}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="mt-3 max-w-[640px] text-[14px]" style={{ color: T.ink2, lineHeight: 1.55 }}>
              {subtitle}
            </p>
          )}
        </div>
        {action}
      </div>
    </header>
  );
}

/* ============================================================
   FIRM PROFILE
   ============================================================ */
function FirmTab() {
  const [data, setData] = useState({
    firmName: 'HYK Tax',
    legalName: 'HYK Tax Services LLC',
    ein: '83-2104998',
    state: 'Wyoming',
    address: '142 W 17th St, Suite 304, Cheyenne, WY 82001',
    phone: '+1 (307) 555-0142',
    website: 'hyktax.co',
    timezone: 'America/Denver',
    fy: 'Calendar year (Dec 31)',
    primarySpecialties: ['Oil & Gas', 'Trucking', 'Construction', 'Partnerships'],
    ptin: 'P02174921',
    efin: '742190',
    naics: '541213',
  });

  return (
    <>
      <PageHeader
        num="01"
        eyebrow="Firm profile"
        title={<>Your firm,<br/>on the record.</>}
        subtitle="This information appears on engagement letters, invoices, IRS authorizations, and your client portal."
        action={
          <button
            className="px-3.5 py-2 text-[12px] flex items-center gap-1.5 rounded-[3px]"
            style={{ background: T.primary, color: T.surface, fontWeight: 500 }}
          >
            <CheckCircle2 size={13}/> Save changes
          </button>
        }
      />

      <div className="px-12 py-8 max-w-[1100px]">
        <Section title="Identity" subtitle="The names and numbers your clients and the IRS see.">
          <div className="p-6 rounded-[3px]" style={{ background: T.surface, border: `1px solid ${T.rule}` }}>
            <div className="grid grid-cols-2 gap-5">
              <Field label="Display name" hint="Shown in portal & emails">
                <Input value={data.firmName} onChange={(e) => setData({ ...data, firmName: e.target.value })}/>
              </Field>
              <Field label="Legal entity name" hint="As registered with the state">
                <Input value={data.legalName} onChange={(e) => setData({ ...data, legalName: e.target.value })}/>
              </Field>
              <Field label="EIN">
                <Input value={data.ein} onChange={(e) => setData({ ...data, ein: e.target.value })} style={{ fontFamily: FONT_MONO }}/>
              </Field>
              <Field label="NAICS code" hint="541213 = Tax preparation">
                <Input value={data.naics} onChange={(e) => setData({ ...data, naics: e.target.value })} style={{ fontFamily: FONT_MONO }}/>
              </Field>
              <Field label="PTIN">
                <Input value={data.ptin} onChange={(e) => setData({ ...data, ptin: e.target.value })} style={{ fontFamily: FONT_MONO }}/>
              </Field>
              <Field label="EFIN">
                <Input value={data.efin} onChange={(e) => setData({ ...data, efin: e.target.value })} style={{ fontFamily: FONT_MONO }}/>
              </Field>
            </div>
          </div>
        </Section>

        <Section title="Contact" subtitle="Used by clients and on every official document.">
          <div className="p-6 rounded-[3px]" style={{ background: T.surface, border: `1px solid ${T.rule}` }}>
            <div className="grid grid-cols-2 gap-5">
              <Field label="Address" full>
                <Input value={data.address} onChange={(e) => setData({ ...data, address: e.target.value })}/>
              </Field>
              <Field label="Phone">
                <Input value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })}/>
              </Field>
              <Field label="Website">
                <Input value={data.website} onChange={(e) => setData({ ...data, website: e.target.value })}/>
              </Field>
              <Field label="Time zone">
                <Input value={data.timezone} onChange={(e) => setData({ ...data, timezone: e.target.value })}/>
              </Field>
              <Field label="Fiscal year">
                <Input value={data.fy} onChange={(e) => setData({ ...data, fy: e.target.value })}/>
              </Field>
            </div>
          </div>
        </Section>

        <Section title="Specialties" subtitle="Tunes the AI co-pilot, deadline radar, and document classifier.">
          <div className="p-6 rounded-[3px]" style={{ background: T.surface, border: `1px solid ${T.rule}` }}>
            <div className="flex items-center gap-2 flex-wrap">
              {data.primarySpecialties.map(s => (
                <span
                  key={s}
                  className="px-3 py-1.5 text-[12px] flex items-center gap-1.5 rounded-[3px]"
                  style={{ background: T.surface2, border: `1px solid ${T.copper}`, color: T.ink2 }}
                >
                  {s}
                  <button onClick={() => setData({ ...data, primarySpecialties: data.primarySpecialties.filter(x => x !== s) })}>
                    <X size={11} style={{ color: T.muted }}/>
                  </button>
                </span>
              ))}
              <button className="px-3 py-1.5 text-[12px] flex items-center gap-1 rounded-[3px]" style={{ background: T.surface2, border: `1px dashed ${T.rule2}`, color: T.muted }}>
                <Plus size={12}/> Add specialty
              </button>
            </div>

            <div className="mt-4 p-3 rounded-[3px] flex items-start gap-2.5" style={{ background: T.surface2, border: `1px dashed ${T.rule2}` }}>
              <Sparkles size={13} style={{ color: T.copper, marginTop: 2, flexShrink: 0 }}/>
              <div className="text-[11.5px]" style={{ color: T.ink2, lineHeight: 1.55 }}>
                <span style={{ color: T.ink, fontWeight: 500 }}>AI is tuned for:</span>{' '}
                IDC and §263A capitalization for oil & gas, per-diem and fuel tax credits for trucking,
                §460 long-term contracts for construction, and K-1 allocations and basis tracking for partnerships.
              </div>
            </div>
          </div>
        </Section>
      </div>
    </>
  );
}

/* ============================================================
   TEAM & ROLES
   ============================================================ */
function TeamTab() {
  const [activeMember, setActiveMember] = useState(1);
  const [showRoleMatrix, setShowRoleMatrix] = useState(true);

  const member = TEAM.find(m => m.id === activeMember);

  return (
    <>
      <PageHeader
        num="02"
        eyebrow="Team & roles"
        title={<>Your people,<br/>their permissions.</>}
        subtitle="Add teammates, set role-based access, and review who's doing what across the firm."
        action={
          <button className="px-3.5 py-2 text-[12px] flex items-center gap-1.5 rounded-[3px]" style={{ background: T.primary, color: T.surface, fontWeight: 500 }}>
            <Plus size={13}/> Invite teammate
          </button>
        }
      />

      <div className="px-12 py-8 max-w-[1280px]">
        {/* Stats row */}
        <div className="grid grid-cols-4 gap-3 mb-8">
          {[
            { l: 'Active seats',  v: '4',   d: '$76/mo · 1 included' },
            { l: 'Pending invites', v: '2', d: 'Sent ≤ 7 days ago' },
            { l: '2FA enabled',   v: '3 / 4', d: 'Della needs setup' },
            { l: 'Avg client load', v: '23', d: 'Across 4 preparers' },
          ].map((s, i) => (
            <div key={i} className="p-4 rounded-[3px]" style={{ background: T.surface, border: `1px solid ${T.rule}` }}>
              <div className="text-[10px] uppercase tracking-[0.14em]" style={{ color: T.muted }}>{s.l}</div>
              <div className="mt-1.5" style={{ fontFamily: FONT_DISPLAY, fontSize: 26, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.02em', lineHeight: 1 }}>
                {s.v}
              </div>
              <div className="text-[11px] mt-1" style={{ color: T.muted }}>{s.d}</div>
            </div>
          ))}
        </div>

        {/* Two-pane: list + detail */}
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-7">
            <Section title="Team members" subtitle="Click a teammate to see and edit their role.">
              <div style={{ background: T.surface, border: `1px solid ${T.rule}`, borderRadius: 3 }}>
                <div
                  className="grid grid-cols-12 px-4 py-2 text-[9.5px] uppercase tracking-[0.14em]"
                  style={{ color: T.muted, borderBottom: `1px solid ${T.rule}`, background: T.surface2 }}
                >
                  <div className="col-span-5">Member</div>
                  <div className="col-span-3">Role</div>
                  <div className="col-span-2">Clients</div>
                  <div className="col-span-2 text-right">Last active</div>
                </div>
                {TEAM.map(m => {
                  const isActive = activeMember === m.id;
                  return (
                    <button
                      key={m.id}
                      onClick={() => setActiveMember(m.id)}
                      className="w-full grid grid-cols-12 px-4 py-3 items-center text-left"
                      style={{
                        background: isActive ? T.surface2 : T.surface,
                        borderBottom: `1px solid ${T.rule}`,
                        borderLeft: `2px solid ${isActive ? T.copper : 'transparent'}`,
                      }}
                    >
                      <div className="col-span-5 flex items-center gap-2.5">
                        <div
                          className="flex items-center justify-center text-[11px] shrink-0"
                          style={{ width: 30, height: 30, borderRadius: '50%', background: m.color, color: T.surface, fontWeight: 600 }}
                        >
                          {m.initial}
                        </div>
                        <div className="min-w-0">
                          <div className="text-[12.5px] truncate flex items-center gap-1.5" style={{ color: T.ink, fontWeight: 500 }}>
                            {m.name}
                            {m.you && <Pill tone="primary" tiny>You</Pill>}
                            {m.twofa && <ShieldCheck size={11} style={{ color: T.ok }}/>}
                          </div>
                          <div className="text-[10.5px]" style={{ color: T.muted }}>{m.email}</div>
                        </div>
                      </div>
                      <div className="col-span-3">
                        <Pill tone={m.role === 'admin' ? 'copper' : 'primary'}>{m.role}</Pill>
                      </div>
                      <div className="col-span-2 text-[12px]" style={{ color: T.ink, fontFamily: FONT_MONO }}>
                        {m.clients}
                      </div>
                      <div className="col-span-2 text-right text-[10.5px]" style={{ color: T.muted, fontFamily: FONT_MONO }}>
                        {m.lastActive}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Pending */}
              <div className="mt-4">
                <div className="text-[10px] uppercase tracking-[0.16em] mb-2" style={{ color: T.muted, fontWeight: 500 }}>
                  Pending invites
                </div>
                <div style={{ background: T.surface, border: `1px solid ${T.rule}`, borderRadius: 3 }}>
                  {PENDING_INVITES.map(inv => (
                    <div key={inv.id} className="grid grid-cols-12 px-4 py-3 items-center" style={{ borderBottom: `1px solid ${T.rule}` }}>
                      <div className="col-span-5 flex items-center gap-2.5">
                        <div
                          className="flex items-center justify-center text-[10px]"
                          style={{ width: 28, height: 28, borderRadius: '50%', background: T.surface2, border: `1px dashed ${T.rule2}`, color: T.muted, fontFamily: FONT_MONO, fontWeight: 600 }}
                        >
                          {inv.email[0].toUpperCase()}
                        </div>
                        <span className="text-[12px]" style={{ color: T.ink2, fontFamily: FONT_MONO }}>{inv.email}</span>
                      </div>
                      <div className="col-span-3"><Pill tone="primary">{inv.role}</Pill></div>
                      <div className="col-span-2 text-[10.5px]" style={{ color: T.muted }}>Sent {inv.sent}</div>
                      <div className="col-span-2 flex items-center justify-end gap-1.5">
                        <button className="text-[10.5px] flex items-center gap-1 px-2 py-1 rounded-[2px]" style={{ color: T.ink2, border: `1px solid ${T.rule}` }}>
                          <RefreshCw size={10}/> Resend
                        </button>
                        <button className="p-1 rounded-[2px]" style={{ border: `1px solid ${T.rule}` }}>
                          <Trash2 size={10} style={{ color: T.muted }}/>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Section>
          </div>

          {/* Detail pane */}
          <div className="col-span-5">
            {member && (
              <div className="sticky top-6 p-6 rounded-[3px]" style={{ background: T.surface, border: `1px solid ${T.rule}` }}>
                <div className="flex items-start gap-4">
                  <div
                    className="flex items-center justify-center text-[18px] shrink-0"
                    style={{ width: 56, height: 56, borderRadius: '50%', background: member.color, color: T.surface, fontWeight: 600 }}
                  >
                    {member.initial}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 22, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.01em', lineHeight: 1.1 }}>
                      {member.name}
                    </h3>
                    <div className="text-[11.5px] mt-0.5" style={{ color: T.muted }}>{member.credential}</div>
                    <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                      <Pill tone={member.role === 'admin' ? 'copper' : 'primary'}>{member.role}</Pill>
                      {member.twofa
                        ? <Pill tone="low"><ShieldCheck size={9}/> 2FA on</Pill>
                        : <Pill tone="med"><ShieldAlert size={9}/> 2FA off</Pill>
                      }
                    </div>
                  </div>
                  <button className="p-1.5 rounded-[3px]" style={{ border: `1px solid ${T.rule}` }}>
                    <MoreHorizontal size={13} style={{ color: T.muted }}/>
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-2.5">
                  <KV label="Email"     value={member.email}     mono/>
                  <KV label="Phone"     value={member.phone}     mono/>
                  <KV label="Joined"    value={member.joined}/>
                  <KV label="Clients"   value={`${member.clients} active`}/>
                  <KV label="Last active" value={member.lastActive}/>
                </div>

                <button
                  onClick={() => setShowRoleMatrix(!showRoleMatrix)}
                  className="mt-5 w-full flex items-center justify-between px-3 py-2 rounded-[3px]"
                  style={{ background: T.surface2, border: `1px solid ${T.rule}` }}
                >
                  <span className="text-[11.5px]" style={{ color: T.ink, fontWeight: 500 }}>
                    Permissions for "{member.role}"
                  </span>
                  {showRoleMatrix ? <ChevronUp size={13} style={{ color: T.muted }}/> : <ChevronDown size={13} style={{ color: T.muted }}/>}
                </button>

                {showRoleMatrix && (
                  <div className="mt-2 p-3 rounded-[3px]" style={{ background: T.surface2, border: `1px dashed ${T.rule2}` }}>
                    {[
                      ['View clients', ROLES.find(r => r.k === member.role)?.perms.clients !== 'none'],
                      ['Edit billing', ROLES.find(r => r.k === member.role)?.perms.billing],
                      ['Manage team', ROLES.find(r => r.k === member.role)?.perms.team],
                      ['Sign documents', ROLES.find(r => r.k === member.role)?.perms.sign],
                      ['Delete records', ROLES.find(r => r.k === member.role)?.perms.delete],
                    ].map(([k, v]) => (
                      <div key={k} className="flex items-center justify-between py-1.5 text-[11.5px]" style={{ color: T.ink2 }}>
                        <span>{k}</span>
                        {v ? <CheckCircle2 size={13} style={{ color: T.ok }}/> : <X size={13} style={{ color: T.faint }}/>}
                      </div>
                    ))}
                  </div>
                )}

                {!member.you && (
                  <div className="mt-5 flex items-center gap-2">
                    <button className="flex-1 text-[11.5px] py-2 rounded-[3px]" style={{ background: T.primary, color: T.surface, fontWeight: 500 }}>
                      Edit role
                    </button>
                    <button className="text-[11.5px] py-2 px-3 rounded-[3px]" style={{ background: T.surface2, color: T.danger, border: `1px solid ${T.rule}` }}>
                      Suspend
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Role matrix */}
        <Section title="Role matrix" subtitle="Granular permissions for each role.">
          <div className="rounded-[3px] overflow-hidden" style={{ background: T.surface, border: `1px solid ${T.rule}` }}>
            <div
              className="grid"
              style={{ gridTemplateColumns: '2fr repeat(5, 1fr)', borderBottom: `1px solid ${T.rule}`, background: T.surface2 }}
            >
              <div className="px-4 py-2.5 text-[10px] uppercase tracking-[0.14em]" style={{ color: T.muted }}>Permission</div>
              {ROLES.map(r => (
                <div key={r.k} className="px-2 py-2.5 text-center text-[11.5px]" style={{ color: T.ink, fontWeight: 500, borderLeft: `1px solid ${T.rule}` }}>
                  {r.name}
                </div>
              ))}
            </div>
            {[
              { k: 'View all clients',          map: r => r.perms.clients === 'all' },
              { k: 'View assigned clients',     map: r => r.perms.clients === 'assigned' || r.perms.clients === 'all' },
              { k: 'Sign engagement letters',   map: r => r.perms.sign },
              { k: 'Edit billing & invoicing',  map: r => r.perms.billing },
              { k: 'Manage team members',       map: r => r.perms.team },
              { k: 'Delete records',             map: r => r.perms.delete },
              { k: 'Configure firm settings',    map: r => r.perms.settings },
            ].map((row, i) => (
              <div
                key={i}
                className="grid"
                style={{
                  gridTemplateColumns: '2fr repeat(5, 1fr)',
                  borderBottom: i < 6 ? `1px solid ${T.rule}` : 'none',
                  background: i % 2 === 1 ? T.surface2 : T.surface,
                }}
              >
                <div className="px-4 py-2.5 text-[12px]" style={{ color: T.ink2 }}>{row.k}</div>
                {ROLES.map(r => (
                  <div key={r.k} className="px-2 py-2.5 flex items-center justify-center" style={{ borderLeft: `1px solid ${T.rule}` }}>
                    {row.map(r) ? <Check size={13} style={{ color: T.ok }} strokeWidth={2.5}/> : <X size={13} style={{ color: T.faint }} strokeWidth={2}/>}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Section>
      </div>
    </>
  );
}

function KV({ label, value, mono }) {
  return (
    <div className="flex items-baseline justify-between gap-3 py-1.5" style={{ borderBottom: `1px dashed ${T.rule}` }}>
      <span className="text-[10.5px] uppercase tracking-[0.12em]" style={{ color: T.muted }}>{label}</span>
      <span className="text-[12px] truncate" style={{ color: T.ink, fontFamily: mono ? FONT_MONO : FONT_BODY }}>{value}</span>
    </div>
  );
}

/* ============================================================
   PLAN & BILLING
   ============================================================ */
function BillingTab() {
  return (
    <>
      <PageHeader
        num="03"
        eyebrow="Plan & billing"
        title={<>The bill stays<br/>predictable.</>}
        subtitle="One per-practice plan plus per-seat add-ons. No per-client charges, no per-signature fees."
      />

      <div className="px-12 py-8 max-w-[1100px]">
        {/* Current plan */}
        <Section title="Current plan">
          <div
            className="p-7 rounded-[3px] relative overflow-hidden"
            style={{ background: T.primary, color: T.surface }}
          >
            <div
              aria-hidden
              style={{
                position: 'absolute', right: -50, top: -50, width: 220, height: 220,
                border: `1px solid rgba(255,253,248,0.10)`, borderRadius: '50%',
              }}
            />
            <div
              aria-hidden
              style={{
                position: 'absolute', right: -20, bottom: -80, width: 140, height: 140,
                border: `1px solid rgba(196,106,45,0.20)`, borderRadius: '50%',
              }}
            />
            <div className="relative grid grid-cols-12 gap-6 items-end">
              <div className="col-span-7">
                <div className="text-[10px] uppercase tracking-[0.18em]" style={{ color: T.copperLt, fontFamily: FONT_BODY, fontWeight: 500 }}>
                  Practice plan · annual billing
                </div>
                <h2
                  className="mt-2"
                  style={{ fontFamily: FONT_DISPLAY, fontSize: 38, fontStyle: 'italic', letterSpacing: '-0.02em', lineHeight: 1 }}
                >
                  $149 <span style={{ fontSize: 16, color: 'rgba(255,253,248,0.65)', fontStyle: 'normal', fontFamily: FONT_BODY }}>/ mo + $19/seat</span>
                </h2>
                <div className="mt-2 text-[12.5px]" style={{ color: 'rgba(255,253,248,0.7)' }}>
                  Annual billing saves you 17% — your next charge is May 1, 2026.
                </div>
                <div className="flex items-center gap-3 mt-5">
                  <button className="px-4 py-2 text-[12.5px] rounded-[3px]" style={{ background: T.copper, color: T.surface, fontWeight: 500 }}>
                    Upgrade to Firm plan
                  </button>
                  <button className="px-4 py-2 text-[12.5px]" style={{ color: 'rgba(255,253,248,0.85)' }}>
                    Switch to monthly billing
                  </button>
                </div>
              </div>
              <div className="col-span-5">
                <div className="grid grid-cols-2 gap-px" style={{ background: 'rgba(255,253,248,0.12)', borderRadius: 3 }}>
                  {[
                    { l: 'Seats',     v: '4', s: '+ $57/mo' },
                    { l: 'Clients',   v: '42', s: 'unlimited' },
                    { l: 'AI queries',v: '412 / 1000', s: 'this month' },
                    { l: 'Storage',   v: '8.4 GB', s: 'of 50 GB' },
                  ].map((s, i) => (
                    <div key={i} className="px-3 py-3" style={{ background: 'rgba(11,61,58,0.6)', backdropFilter: 'blur(2px)' }}>
                      <div className="text-[9px] uppercase tracking-[0.14em]" style={{ color: 'rgba(255,253,248,0.55)' }}>{s.l}</div>
                      <div className="mt-1" style={{ fontFamily: FONT_DISPLAY, fontSize: 22, fontStyle: 'italic', letterSpacing: '-0.01em', lineHeight: 1 }}>{s.v}</div>
                      <div className="text-[10px] mt-1" style={{ color: T.copperLt }}>{s.s}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Plan comparison cards */}
        <Section title="Plans">
          <div className="grid grid-cols-3 gap-3">
            {[
              { k: 'solo',     name: 'Solo',     p: 49,   blurb: 'For one EA or CPA',           perks: ['25 active clients','1k docs/mo AI','Portal & e-sign','Deadline radar'], current: false },
              { k: 'practice', name: 'Practice', p: 149,  blurb: 'For growing firms',           perks: ['Unlimited clients','10k docs/mo','Health matrix','Automation proposals','QB · Stripe · Drake'], current: true },
              { k: 'firm',     name: 'Firm',     p: null, blurb: 'Multi-partner, custom',       perks: ['Everything in Practice','White-label removal','SSO/SAML','Dedicated CSM','Custom AI fine-tune'], current: false },
            ].map(p => (
              <div
                key={p.k}
                className="p-5 rounded-[3px] flex flex-col"
                style={{
                  background: p.current ? T.surface : T.surface,
                  border: `${p.current ? 2 : 1}px solid ${p.current ? T.copper : T.rule}`,
                }}
              >
                {p.current && <Pill tone="copper" tiny>Current plan</Pill>}
                <div className="mt-2" style={{ fontFamily: FONT_DISPLAY, fontSize: 26, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.01em' }}>
                  {p.name}
                </div>
                <div className="text-[11.5px]" style={{ color: T.muted }}>{p.blurb}</div>
                <div className="mt-3" style={{ fontFamily: FONT_DISPLAY, fontSize: p.p === null ? 28 : 36, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.02em', lineHeight: 1 }}>
                  {p.p === null ? 'Custom' : `$${p.p}`}
                </div>
                {p.p !== null && <div className="text-[11px]" style={{ color: T.muted }}>per month</div>}
                <ul className="mt-4 flex flex-col gap-1.5 flex-1">
                  {p.perks.map((perk, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-[11.5px]" style={{ color: T.ink2, lineHeight: 1.45 }}>
                      <Check size={11} style={{ color: T.ok, marginTop: 3, flexShrink: 0 }} strokeWidth={2.5}/>
                      {perk}
                    </li>
                  ))}
                </ul>
                {!p.current && (
                  <button className="mt-4 py-2 text-[11.5px] rounded-[3px]" style={{ background: T.primary, color: T.surface, fontWeight: 500 }}>
                    {p.k === 'firm' ? 'Talk to sales' : 'Switch to ' + p.name}
                  </button>
                )}
              </div>
            ))}
          </div>
        </Section>

        <Section title="Payment method">
          <div
            className="p-5 rounded-[3px] flex items-center gap-4"
            style={{ background: T.surface, border: `1px solid ${T.rule}` }}
          >
            <div
              className="flex items-center justify-center"
              style={{ width: 60, height: 38, borderRadius: 4, background: T.primary, color: T.surface, fontFamily: FONT_BODY, fontSize: 11, letterSpacing: 1, fontWeight: 700 }}
            >
              VISA
            </div>
            <div className="flex-1">
              <div className="text-[13px]" style={{ color: T.ink, fontFamily: FONT_MONO, fontWeight: 500 }}>•••• •••• •••• 4421</div>
              <div className="text-[11px]" style={{ color: T.muted }}>Expires 09/28 · Cody R. Whitman</div>
            </div>
            <button className="text-[12px] flex items-center gap-1.5 px-3 py-1.5 rounded-[3px]" style={{ background: T.surface2, color: T.ink2, border: `1px solid ${T.rule}` }}>
              <Edit3 size={11}/> Update
            </button>
          </div>
        </Section>

        <Section title="Billing history">
          <div className="rounded-[3px] overflow-hidden" style={{ background: T.surface, border: `1px solid ${T.rule}` }}>
            <div
              className="grid grid-cols-12 px-4 py-2 text-[9.5px] uppercase tracking-[0.14em]"
              style={{ color: T.muted, borderBottom: `1px solid ${T.rule}`, background: T.surface2 }}
            >
              <div className="col-span-3">Invoice</div>
              <div className="col-span-3">Date</div>
              <div className="col-span-3">Description</div>
              <div className="col-span-2 text-right">Amount</div>
              <div className="col-span-1 text-right">Status</div>
            </div>
            {INVOICES.map(inv => (
              <div key={inv.id} className="grid grid-cols-12 px-4 py-3 items-center" style={{ borderBottom: `1px solid ${T.rule}` }}>
                <div className="col-span-3 text-[12px]" style={{ color: T.copper, fontFamily: FONT_MONO }}>{inv.id}</div>
                <div className="col-span-3 text-[11.5px]" style={{ color: T.muted, fontFamily: FONT_MONO }}>{inv.date}</div>
                <div className="col-span-3 text-[12px]" style={{ color: T.ink2 }}>{inv.desc}</div>
                <div className="col-span-2 text-right text-[12px]" style={{ color: T.ink, fontFamily: FONT_MONO }}>${inv.amount.toFixed(2)}</div>
                <div className="col-span-1 text-right">
                  <Pill tone="low" tiny>{inv.status}</Pill>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </>
  );
}

/* ============================================================
   INTEGRATIONS
   ============================================================ */
function IntegrationsTab() {
  const connected = INTEGRATIONS_DATA.filter(i => i.status === 'connected');
  const needsAuth = INTEGRATIONS_DATA.filter(i => i.status === 'needs-auth');
  const available = INTEGRATIONS_DATA.filter(i => i.status === 'available');

  return (
    <>
      <PageHeader
        num="04"
        eyebrow="Integrations"
        title={<>Your stack,<br/>kept in sync.</>}
        subtitle="Two-way connections to the tools you and your clients already use. OAuth-based, revocable any time."
      />

      <div className="px-12 py-8 max-w-[1100px]">
        {/* Status banner */}
        {needsAuth.length > 0 && (
          <div
            className="p-4 rounded-[3px] flex items-start gap-3 mb-6"
            style={{ background: '#FBF1E0', border: `1px solid ${T.warn}` }}
          >
            <AlertTriangle size={16} style={{ color: T.warn, marginTop: 2, flexShrink: 0 }}/>
            <div className="flex-1">
              <div className="text-[12.5px]" style={{ color: T.ink, fontWeight: 500 }}>
                {needsAuth.length} integration{needsAuth.length > 1 ? 's' : ''} need re-authentication
              </div>
              <div className="text-[11.5px] mt-0.5" style={{ color: T.ink2 }}>
                {needsAuth.map(i => i.name).join(', ')} — bank feeds may be stale until reconnected.
              </div>
            </div>
            <button className="text-[11.5px] px-2.5 py-1.5 rounded-[3px]" style={{ background: T.warn, color: T.surface, fontWeight: 500 }}>
              Reconnect now
            </button>
          </div>
        )}

        <Section title={`Connected (${connected.length + needsAuth.length})`}>
          <div className="grid grid-cols-2 gap-3">
            {[...connected, ...needsAuth].map(it => (
              <IntegrationCard key={it.k} it={it}/>
            ))}
          </div>
        </Section>

        <Section title={`Available (${available.length})`} subtitle="One-click OAuth · we'll never modify your source systems.">
          <div className="grid grid-cols-3 gap-3">
            {available.map(it => (
              <IntegrationCard key={it.k} it={it} compact/>
            ))}
          </div>
        </Section>

        <Section title="Webhooks & API">
          <div className="p-5 rounded-[3px]" style={{ background: T.surface, border: `1px solid ${T.rule}` }}>
            <div className="grid grid-cols-2 gap-5">
              <div>
                <div className="text-[10.5px] uppercase tracking-[0.14em] mb-2" style={{ color: T.muted, fontWeight: 500 }}>API Key</div>
                <div className="flex items-center gap-2 px-3 py-2.5 rounded-[3px]" style={{ background: T.surface2, border: `1px solid ${T.rule}` }}>
                  <Lock size={12} style={{ color: T.muted }}/>
                  <span className="flex-1 text-[12px]" style={{ color: T.ink, fontFamily: FONT_MONO }}>sk_live_•••••••••••••8a2f</span>
                  <button className="p-1"><Eye size={11} style={{ color: T.muted }}/></button>
                  <button className="p-1"><Copy size={11} style={{ color: T.muted }}/></button>
                </div>
                <div className="text-[10.5px] mt-2" style={{ color: T.muted }}>Last rotated 14 days ago · <a href="#" style={{ color: T.copper }}>rotate now</a></div>
              </div>
              <div>
                <div className="text-[10.5px] uppercase tracking-[0.14em] mb-2" style={{ color: T.muted, fontWeight: 500 }}>Webhook endpoint</div>
                <div className="flex items-center gap-2 px-3 py-2.5 rounded-[3px]" style={{ background: T.surface2, border: `1px solid ${T.rule}` }}>
                  <Globe size={12} style={{ color: T.muted }}/>
                  <span className="flex-1 text-[12px] truncate" style={{ color: T.ink, fontFamily: FONT_MONO }}>https://hyktax.co/hooks/ledger</span>
                  <button className="p-1"><Edit3 size={11} style={{ color: T.muted }}/></button>
                </div>
                <div className="text-[10.5px] mt-2" style={{ color: T.muted }}>Receives <span style={{ color: T.ok }}>● 2,108 events</span> per month</div>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </>
  );
}

function IntegrationCard({ it, compact }) {
  const isConnected = it.status === 'connected';
  const needsAuth = it.status === 'needs-auth';
  const initials = it.name.split(' ').map(w => w[0]).join('').slice(0, 2);

  return (
    <div
      className="p-4 rounded-[3px] flex items-start gap-3"
      style={{
        background: T.surface,
        border: `1px solid ${needsAuth ? T.warn : T.rule}`,
      }}
    >
      <div
        className="flex items-center justify-center shrink-0"
        style={{
          width: 40, height: 40, borderRadius: 8, background: T.surface2,
          border: `1px solid ${T.rule}`, color: T.primary,
          fontFamily: FONT_DISPLAY, fontStyle: 'italic', fontSize: 14, fontWeight: 600,
        }}
      >
        {initials}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-[13px]" style={{ color: T.ink, fontWeight: 500 }}>{it.name}</span>
          {isConnected && <CheckCircle2 size={12} style={{ color: T.ok }}/>}
          {needsAuth && <AlertTriangle size={12} style={{ color: T.warn }}/>}
        </div>
        <div className="text-[10.5px] mt-0.5 uppercase tracking-[0.12em]" style={{ color: T.muted, fontWeight: 500 }}>{it.cat}</div>
        {!compact && (
          <div className="flex items-center gap-2 mt-2 text-[11px]" style={{ color: T.ink2 }}>
            <span>{it.linked}</span>
            <span style={{ color: T.muted }}>·</span>
            <span style={{ color: T.muted, fontFamily: FONT_MONO }}>{it.lastSync}</span>
          </div>
        )}
      </div>
      <button
        className="text-[10.5px] px-2 py-1 rounded-[2px] flex items-center gap-1"
        style={{
          background: needsAuth ? T.warn : isConnected ? T.surface2 : T.primary,
          color: needsAuth ? T.surface : isConnected ? T.ink2 : T.surface,
          border: isConnected && !needsAuth ? `1px solid ${T.rule}` : 'none',
          fontWeight: 500,
        }}
      >
        {needsAuth ? 'Reconnect' : isConnected ? 'Manage' : 'Connect'}
        {!isConnected && !needsAuth && <ArrowRight size={10}/>}
      </button>
    </div>
  );
}

/* ============================================================
   WHITE-LABEL
   ============================================================ */
function WhitelabelTab() {
  const [accent, setAccent] = useState(T.copper);
  const [accentName, setAccentName] = useState('Copper');
  const [brandName, setBrandName] = useState('HYK Tax');
  const [subdomain, setSubdomain] = useState('portal');
  const [tagline, setTagline] = useState('US tax done right, from anywhere.');
  const [removeBranding, setRemoveBranding] = useState(false);

  const palette = [
    { k: 'copper',  name: 'Copper',     val: '#C46A2D' },
    { k: 'forest',  name: 'Forest',     val: '#0B3D3A' },
    { k: 'navy',    name: 'Navy',       val: '#1F3856' },
    { k: 'plum',    name: 'Plum',       val: '#6B3550' },
    { k: 'rust',    name: 'Rust',       val: '#A8402E' },
    { k: 'olive',   name: 'Olive',      val: '#5B6630' },
  ];

  return (
    <>
      <PageHeader
        num="05"
        eyebrow="White-label"
        title={<>Your firm.<br/>Your name. Your brand.</>}
        subtitle="The Practice plan includes light white-labeling. Upgrade to Firm to fully remove Ledger branding and use your own domain."
      />

      <div className="px-12 py-8 max-w-[1280px]">
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-5">
            <Section title="Brand basics">
              <div className="p-6 rounded-[3px]" style={{ background: T.surface, border: `1px solid ${T.rule}` }}>
                <div className="flex flex-col gap-4">
                  <Field label="Display firm name" hint="Shown in portal header">
                    <Input value={brandName} onChange={(e) => setBrandName(e.target.value)}/>
                  </Field>

                  <Field label="Tagline" hint="One short sentence under your name">
                    <Input value={tagline} onChange={(e) => setTagline(e.target.value)}/>
                  </Field>

                  <Field label="Logo" hint="SVG or PNG · square · ≤ 2MB">
                    <button
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-[3px]"
                      style={{ background: T.surface2, border: `1px dashed ${T.rule2}` }}
                    >
                      <div
                        className="flex items-center justify-center"
                        style={{ width: 36, height: 36, borderRadius: 6, background: T.surface, border: `1px solid ${T.rule}` }}
                      >
                        <ImageIcon size={14} style={{ color: T.muted }}/>
                      </div>
                      <div className="flex-1 text-left">
                        <div className="text-[12px]" style={{ color: T.ink, fontWeight: 500 }}>Upload logo</div>
                        <div className="text-[10.5px]" style={{ color: T.muted }}>or skip — we'll use your initial</div>
                      </div>
                      <Upload size={13} style={{ color: T.muted }}/>
                    </button>
                  </Field>

                  <Field label="Accent color" hint="Used for buttons & highlights">
                    <div className="grid grid-cols-6 gap-2">
                      {palette.map(p => (
                        <button
                          key={p.k}
                          onClick={() => { setAccent(p.val); setAccentName(p.name); }}
                          className="flex flex-col items-center gap-1 p-2 rounded-[3px]"
                          style={{
                            background: accent === p.val ? T.surface2 : T.surface,
                            border: `${accent === p.val ? 2 : 1}px solid ${accent === p.val ? p.val : T.rule}`,
                          }}
                        >
                          <span style={{ width: 22, height: 22, borderRadius: '50%', background: p.val }}/>
                          <span className="text-[9.5px]" style={{ color: T.ink2 }}>{p.name}</span>
                        </button>
                      ))}
                    </div>
                  </Field>
                </div>
              </div>
            </Section>

            <Section title="Domain">
              <div className="p-6 rounded-[3px]" style={{ background: T.surface, border: `1px solid ${T.rule}` }}>
                <Field label="Subdomain" hint="Where your portal lives">
                  <div className="flex items-center gap-2">
                    <Input value={subdomain} onChange={(e) => setSubdomain(e.target.value)} style={{ fontFamily: FONT_MONO }}/>
                    <span className="text-[12px]" style={{ color: T.muted, fontFamily: FONT_MONO }}>.ledger.app</span>
                  </div>
                </Field>
                <div className="mt-4 p-3 rounded-[3px] flex items-start gap-2.5" style={{ background: T.surface2, border: `1px dashed ${T.rule2}` }}>
                  <Sparkles size={13} style={{ color: T.copper, marginTop: 2, flexShrink: 0 }}/>
                  <div className="text-[11.5px]" style={{ color: T.ink2, lineHeight: 1.55 }}>
                    Custom domain (e.g. <span style={{ fontFamily: FONT_MONO }}>portal.hyktax.co</span>) is available on the Firm plan with full white-labeling.
                  </div>
                </div>
              </div>
            </Section>

            <Section title="Advanced">
              <div className="p-6 rounded-[3px]" style={{ background: T.surface, border: `1px solid ${T.rule}` }}>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <div className="text-[12.5px]" style={{ color: T.ink, fontWeight: 500 }}>Remove "Powered by Ledger"</div>
                    <div className="text-[11px] mt-0.5" style={{ color: T.muted }}>Available on Firm plan</div>
                  </div>
                  <Toggle on={removeBranding} onChange={setRemoveBranding}/>
                </div>
                <div className="flex items-center justify-between py-2" style={{ borderTop: `1px solid ${T.rule}` }}>
                  <div>
                    <div className="text-[12.5px]" style={{ color: T.ink, fontWeight: 500 }}>Custom email sender</div>
                    <div className="text-[11px] mt-0.5" style={{ color: T.muted }}>Send portal emails from your domain</div>
                  </div>
                  <Pill tone="med" tiny>Firm plan</Pill>
                </div>
                <div className="flex items-center justify-between py-2" style={{ borderTop: `1px solid ${T.rule}` }}>
                  <div>
                    <div className="text-[12.5px]" style={{ color: T.ink, fontWeight: 500 }}>White-label mobile app</div>
                    <div className="text-[11px] mt-0.5" style={{ color: T.muted }}>Your firm in App Store and Play Store</div>
                  </div>
                  <Pill tone="med" tiny>Firm plan</Pill>
                </div>
              </div>
            </Section>
          </div>

          {/* Live preview */}
          <div className="col-span-7">
            <div className="sticky top-6">
              <div className="text-[10px] uppercase tracking-[0.16em] mb-2" style={{ color: T.muted, fontWeight: 500 }}>
                Live preview · what your clients see
              </div>
              <BrandPreview
                brandName={brandName}
                tagline={tagline}
                accent={accent}
                subdomain={subdomain}
                removeBranding={removeBranding}
              />
              <div className="mt-3 flex items-center justify-between text-[11px]" style={{ color: T.muted }}>
                <span>Updates live as you change settings</span>
                <button className="flex items-center gap-1 px-2 py-1 rounded-[2px]" style={{ color: T.ink2, border: `1px solid ${T.rule}` }}>
                  <ExternalLink size={10}/> Open in new tab
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function BrandPreview({ brandName, tagline, accent, subdomain, removeBranding }) {
  return (
    <div
      className="rounded-[6px] overflow-hidden"
      style={{ background: T.surface, border: `1px solid ${T.rule}`, boxShadow: '0 30px 60px -30px rgba(20,15,8,0.18)' }}
    >
      {/* Browser bar */}
      <div className="px-4 py-2 flex items-center gap-2" style={{ background: T.surface2, borderBottom: `1px solid ${T.rule}` }}>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full" style={{ background: '#E5C0AC' }}/>
          <span className="w-2 h-2 rounded-full" style={{ background: '#EAD79A' }}/>
          <span className="w-2 h-2 rounded-full" style={{ background: '#B8D4BE' }}/>
        </div>
        <div
          className="ml-2 flex-1 px-3 py-1 rounded-[3px] text-[10px] flex items-center gap-1.5"
          style={{ background: T.surface, border: `1px solid ${T.rule}`, color: T.muted, fontFamily: FONT_MONO }}
        >
          <Lock size={9}/>
          {subdomain || 'portal'}.ledger.app
        </div>
      </div>

      {/* Portal nav */}
      <div className="px-5 py-3 flex items-center gap-3" style={{ borderBottom: `1px solid ${T.rule}` }}>
        <div
          className="flex items-center justify-center"
          style={{
            width: 30, height: 30, borderRadius: 4, background: accent, color: T.surface,
            fontFamily: FONT_DISPLAY, fontSize: 18, fontStyle: 'italic', lineHeight: 1, paddingBottom: 3, fontWeight: 600,
          }}
        >
          {brandName[0]?.toUpperCase() || 'F'}
        </div>
        <div>
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 18, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.01em', lineHeight: 1 }}>
            {brandName || 'Your Firm'}
          </div>
          <div className="text-[8.5px] uppercase tracking-[0.16em] mt-0.5" style={{ color: T.muted }}>
            Client Portal
          </div>
        </div>
        <div className="ml-auto flex items-center gap-3 text-[11px]" style={{ color: T.muted }}>
          <span>Home</span><span>Documents</span><span>Messages</span><span>Billing</span>
        </div>
      </div>

      {/* Hero */}
      <div
        className="p-6 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${T.primary} 0%, ${T.primary2} 100%)`, color: T.surface }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute', right: -30, top: -40, width: 160, height: 160,
            border: `1px solid rgba(255,253,248,0.10)`, borderRadius: '50%',
          }}
        />
        <div className="text-[9.5px] uppercase tracking-[0.18em]" style={{ color: accent, opacity: 0.95 }}>
          Saturday · April 25
        </div>
        <h2 className="mt-1.5" style={{ fontFamily: FONT_DISPLAY, fontSize: 28, fontStyle: 'italic', letterSpacing: '-0.02em', lineHeight: 1.05 }}>
          Welcome back, Cody.
        </h2>
        <div className="text-[12.5px] mt-2 italic" style={{ color: 'rgba(255,253,248,0.65)' }}>
          {tagline}
        </div>
        <div className="text-[12.5px] mt-2" style={{ color: 'rgba(255,253,248,0.8)' }}>
          Your 2025 partnership return is on track. <span style={{ color: accent }}>4 items</span> need your attention.
        </div>
        <button
          className="mt-3 px-3 py-1.5 text-[11px] flex items-center gap-1 rounded-[3px]"
          style={{ background: accent, color: T.surface, fontWeight: 500 }}
        >
          View action items <ArrowRight size={11}/>
        </button>
      </div>

      <div className="p-5">
        <div className="grid grid-cols-2 gap-2">
          {[
            { i: FileText, t: 'Sign 2026 engagement', useAccent: false },
            { i: Upload,   t: 'Upload Q1 bank stmt',  useAccent: true  },
          ].map((a, i) => {
            const Icon = a.i;
            return (
              <div key={i} className="p-3 rounded-[3px]" style={{ background: T.surface2, border: `1px solid ${T.rule}` }}>
                <div className="flex items-start gap-2">
                  <div
                    className="flex items-center justify-center shrink-0"
                    style={{ width: 24, height: 24, borderRadius: 4, background: a.useAccent ? accent : T.primary, color: T.surface }}
                  >
                    <Icon size={11}/>
                  </div>
                  <div className="text-[11px]" style={{ color: T.ink, fontWeight: 500 }}>{a.t}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-3 text-[9px] uppercase tracking-[0.16em] flex items-center gap-1.5" style={{ color: T.faint }}>
          {removeBranding ? <span>—</span> : <span>Powered by Ledger · removable on Firm plan</span>}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   SECURITY
   ============================================================ */
function SecurityTab() {
  const [twoFA, set2FA] = useState(true);
  const [sso, setSSO] = useState(true);
  const [require2FA, setRequire2FA] = useState(false);
  const [ipAllow, setIpAllow] = useState(false);
  const [ssoOnly, setSsoOnly] = useState(false);
  const [autoLogout, setAutoLogout] = useState(60);

  return (
    <>
      <PageHeader
        num="06"
        eyebrow="Security"
        title={<>Your firm's<br/>defense in depth.</>}
        subtitle="2FA, SSO, session limits, and a real audit trail. Your clients are trusting you with their financial life — these settings show them you take that seriously."
      />

      <div className="px-12 py-8 max-w-[1100px]">
        {/* Score card */}
        <Section title="Security posture">
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-5 p-6 rounded-[3px]" style={{ background: T.surface, border: `1px solid ${T.rule}` }}>
              <div className="flex items-baseline gap-2">
                <span style={{ fontFamily: FONT_DISPLAY, fontSize: 56, color: T.ok, fontStyle: 'italic', letterSpacing: '-0.025em', lineHeight: 1 }}>
                  92
                </span>
                <span className="text-[16px]" style={{ color: T.muted, fontFamily: FONT_MONO }}>/ 100</span>
              </div>
              <div className="text-[11px] uppercase tracking-[0.14em] mt-2" style={{ color: T.ok, fontWeight: 600 }}>Strong posture</div>
              <div className="text-[12px] mt-3" style={{ color: T.ink2, lineHeight: 1.5 }}>
                Your firm is in the top 12% of Ledger practices for security configuration. One opportunity below.
              </div>
            </div>
            <div className="col-span-7">
              <div className="grid grid-cols-1 gap-2">
                {[
                  { k: '2FA enabled for 75% of team', tone: 'med', icon: ShieldAlert, action: 'Require for everyone' },
                  { k: 'SSO via Google Workspace active', tone: 'low', icon: ShieldCheck },
                  { k: 'Session timeout: 60 min', tone: 'low', icon: Clock },
                  { k: 'API key rotated 14 days ago', tone: 'low', icon: Key },
                  { k: 'IP allowlist: not enforced', tone: 'med', icon: Globe, action: 'Configure' },
                ].map((p, i) => {
                  const Icon = p.icon;
                  return (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-[3px]" style={{ background: T.surface, border: `1px solid ${T.rule}` }}>
                      <Icon size={14} style={{ color: p.tone === 'low' ? T.ok : T.warn }}/>
                      <span className="flex-1 text-[12.5px]" style={{ color: T.ink2 }}>{p.k}</span>
                      {p.action && (
                        <button className="text-[11px] flex items-center gap-1" style={{ color: T.copper, fontWeight: 500 }}>
                          {p.action} <ArrowRight size={10}/>
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Section>

        <Section title="Authentication">
          <div className="p-6 rounded-[3px] flex flex-col gap-1" style={{ background: T.surface, border: `1px solid ${T.rule}` }}>
            <SecuritySwitch
              icon={Key}
              title="Two-factor authentication"
              desc="Required for all admins. Authenticator app or SMS code on every login."
              on={twoFA}
              setOn={set2FA}
            />
            <SecuritySwitch
              icon={Users}
              title="Require 2FA for all team members"
              desc="No team member can log in without enrolling 2FA — stricter than just admins."
              on={require2FA}
              setOn={setRequire2FA}
              warn={!require2FA && '1 of 4 team members has not enrolled 2FA'}
            />
            <SecuritySwitch
              icon={BadgeCheck}
              title="Single sign-on (SSO)"
              desc="Google Workspace · users sign in with their Google identity."
              on={sso}
              setOn={setSSO}
              tag={<Pill tone="low" tiny>Active</Pill>}
            />
            <SecuritySwitch
              icon={Lock}
              title="SSO required (no password fallback)"
              desc="Available on Firm plan. Disable password auth entirely for SSO-enrolled users."
              on={ssoOnly}
              setOn={setSsoOnly}
              tag={<Pill tone="med" tiny>Firm plan</Pill>}
              dim
            />
          </div>
        </Section>

        <Section title="Network & sessions">
          <div className="p-6 rounded-[3px] flex flex-col gap-1" style={{ background: T.surface, border: `1px solid ${T.rule}` }}>
            <SecuritySwitch
              icon={Globe}
              title="IP address allowlist"
              desc="Block all logins outside your firm's office IPs. Recommended for firms with stable WFH/office routines."
              on={ipAllow}
              setOn={setIpAllow}
            />
            <div className="py-3 border-t" style={{ borderTop: `1px solid ${T.rule}` }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Clock size={14} style={{ color: T.primary }}/>
                  <div>
                    <div className="text-[12.5px]" style={{ color: T.ink, fontWeight: 500 }}>Auto-logout after inactivity</div>
                    <div className="text-[11px] mt-0.5" style={{ color: T.muted }}>Sessions end after the chosen idle period.</div>
                  </div>
                </div>
                <select
                  value={autoLogout}
                  onChange={(e) => setAutoLogout(Number(e.target.value))}
                  className="px-3 py-2 outline-none rounded-[3px] text-[12px]"
                  style={{ background: T.surface2, border: `1px solid ${T.rule}`, color: T.ink, fontFamily: FONT_BODY }}
                >
                  <option value={15}>15 min</option>
                  <option value={30}>30 min</option>
                  <option value={60}>60 min</option>
                  <option value={240}>4 hours</option>
                  <option value={0}>Never (not recommended)</option>
                </select>
              </div>
            </div>
          </div>
        </Section>

        <Section title="Active sessions" subtitle="Where you're signed in right now.">
          <div style={{ background: T.surface, border: `1px solid ${T.rule}`, borderRadius: 3 }}>
            {ACTIVE_SESSIONS.map((s, i) => (
              <div key={s.id} className="grid grid-cols-12 px-4 py-3 items-center" style={{ borderBottom: i < ACTIVE_SESSIONS.length - 1 ? `1px solid ${T.rule}` : 'none' }}>
                <div className="col-span-1">
                  {s.device.includes('Phone') || s.device.includes('iPad') ? (
                    <Smartphone size={14} style={{ color: T.muted }}/>
                  ) : (
                    <Monitor size={14} style={{ color: T.muted }}/>
                  )}
                </div>
                <div className="col-span-4">
                  <div className="text-[12.5px]" style={{ color: T.ink, fontWeight: 500 }}>
                    {s.device} {s.current && <Pill tone="low" tiny>This device</Pill>}
                  </div>
                </div>
                <div className="col-span-3 text-[11.5px] flex items-center gap-1.5" style={{ color: T.ink2 }}>
                  <MapPin size={11} style={{ color: T.muted }}/>
                  {s.loc}
                </div>
                <div className="col-span-2 text-[11px]" style={{ color: T.muted, fontFamily: FONT_MONO }}>
                  {s.ip}
                </div>
                <div className="col-span-1 text-right text-[11px]" style={{ color: T.muted, fontFamily: FONT_MONO }}>
                  {s.last}
                </div>
                <div className="col-span-1 text-right">
                  {!s.current && (
                    <button className="text-[10.5px] px-2 py-1 rounded-[2px]" style={{ color: T.danger, border: `1px solid ${T.rule}` }}>
                      Revoke
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 text-right">
            <button className="text-[11.5px] flex items-center gap-1 ml-auto" style={{ color: T.danger }}>
              <LogOut size={12}/> Sign out all other sessions
            </button>
          </div>
        </Section>

        <Section title="Compliance & data">
          <div className="grid grid-cols-3 gap-3">
            {[
              { i: ShieldCheck, t: 'SOC 2 Type II',     d: 'Audited annually · report on request' },
              { i: Database,    t: 'US data residency', d: 'AWS us-east-1 · isolated VPC' },
              { i: FileCheck,   t: 'GLBA & §7216',      d: 'Tax practitioner safeguards in effect' },
              { i: Lock,        t: '256-bit encryption',d: 'AES-256 at rest · TLS 1.3 in transit' },
              { i: Server,      t: 'Backup retention',  d: '90 days · point-in-time restore' },
              { i: ShieldAlert, t: 'Breach SLA',         d: 'Notification within 24 hours' },
            ].map((c, i) => {
              const Icon = c.i;
              return (
                <div key={i} className="p-4 rounded-[3px] flex items-start gap-3" style={{ background: T.surface, border: `1px solid ${T.rule}` }}>
                  <Icon size={16} style={{ color: T.primary, marginTop: 1, flexShrink: 0 }}/>
                  <div>
                    <div className="text-[12.5px]" style={{ color: T.ink, fontWeight: 500 }}>{c.t}</div>
                    <div className="text-[11px] mt-1" style={{ color: T.muted, lineHeight: 1.5 }}>{c.d}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </Section>
      </div>
    </>
  );
}

function SecuritySwitch({ icon: Icon, title, desc, on, setOn, warn, tag, dim }) {
  return (
    <div className="py-3 flex items-center justify-between" style={{ borderTop: `1px solid ${T.rule}`, opacity: dim ? 0.7 : 1 }}>
      <div className="flex items-start gap-3">
        <Icon size={14} style={{ color: T.primary, marginTop: 3 }}/>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[12.5px]" style={{ color: T.ink, fontWeight: 500 }}>{title}</span>
            {tag}
          </div>
          <div className="text-[11px] mt-0.5" style={{ color: T.muted, lineHeight: 1.5 }}>{desc}</div>
          {warn && <div className="text-[11px] mt-1" style={{ color: T.warn, fontStyle: 'italic' }}>⚠ {warn}</div>}
        </div>
      </div>
      <Toggle on={on} onChange={setOn}/>
    </div>
  );
}

/* ============================================================
   AUDIT LOG
   ============================================================ */
function AuditTab() {
  const [filter, setFilter] = useState('all');
  const filters = [['all','All'], ['critical','Critical only'], ['failed','Failed actions'], ['ai','AI activity']];
  const visible = filter === 'all' ? AUDIT_EVENTS
    : filter === 'critical' ? AUDIT_EVENTS.filter(e => e.sev === 'critical')
    : filter === 'failed' ? AUDIT_EVENTS.filter(e => e.what.includes('failed'))
    : AUDIT_EVENTS.filter(e => e.who === 'AI');

  return (
    <>
      <PageHeader
        num="07"
        eyebrow="Audit log"
        title={<>Every action,<br/>on the record.</>}
        subtitle="Immutable activity log retained for 7 years. Use this to demonstrate IRC §7216 compliance and respond to client inquiries about who saw what."
        action={
          <button className="px-3.5 py-2 text-[12px] flex items-center gap-1.5 rounded-[3px]" style={{ background: T.surface, color: T.ink2, border: `1px solid ${T.rule}` }}>
            <Download size={12}/> Export CSV
          </button>
        }
      />

      <div className="px-12 py-8 max-w-[1280px]">
        <div className="flex items-center gap-2 mb-5 flex-wrap">
          {filters.map(([k, v]) => (
            <button
              key={k}
              onClick={() => setFilter(k)}
              className="text-[11.5px] px-3 py-1.5 rounded-[3px]"
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
          <div className="flex items-center gap-2 ml-auto">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-[3px]" style={{ background: T.surface, border: `1px solid ${T.rule}` }}>
              <Search size={12} style={{ color: T.muted }}/>
              <input placeholder="Search by user, action, IP…" className="text-[12px] bg-transparent outline-none w-[200px]" style={{ color: T.ink }}/>
            </div>
          </div>
        </div>

        <div style={{ background: T.surface, border: `1px solid ${T.rule}`, borderRadius: 3 }}>
          <div
            className="grid grid-cols-12 px-4 py-2 text-[9.5px] uppercase tracking-[0.14em]"
            style={{ color: T.muted, borderBottom: `1px solid ${T.rule}`, background: T.surface2 }}
          >
            <div className="col-span-3">Who</div>
            <div className="col-span-5">Event</div>
            <div className="col-span-2">Device & IP</div>
            <div className="col-span-2 text-right">When</div>
          </div>
          {visible.map(e => {
            const sevColor = e.sev === 'critical' ? T.copper : e.sev === 'warn' ? T.warn : e.sev === 'success' ? T.ok : T.muted;
            return (
              <div key={e.id} className="grid grid-cols-12 px-4 py-3 items-center" style={{ borderBottom: `1px solid ${T.rule}` }}>
                <div className="col-span-3 flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: sevColor }}/>
                  <span className="text-[12px]" style={{ color: T.ink, fontWeight: e.sev === 'critical' ? 500 : 400 }}>
                    {e.who}
                  </span>
                </div>
                <div className="col-span-5">
                  <span className="text-[12px]" style={{ color: T.muted }}>{e.what} </span>
                  <span className="text-[12px]" style={{ color: T.ink2 }}>{e.obj}</span>
                </div>
                <div className="col-span-2 text-[10.5px]" style={{ color: T.muted, fontFamily: FONT_MONO, lineHeight: 1.4 }}>
                  <div>{e.device}</div>
                  <div>{e.ip}</div>
                </div>
                <div className="col-span-2 text-right text-[11px]" style={{ color: T.muted, fontFamily: FONT_MONO }}>
                  {e.when}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-[11px]" style={{ color: T.muted }}>
            Showing {visible.length} of <span style={{ fontFamily: FONT_MONO }}>14,328</span> events · retained 7 years
          </div>
          <div className="flex items-center gap-2">
            <button className="text-[11px] px-2 py-1 rounded-[2px]" style={{ color: T.ink2, border: `1px solid ${T.rule}` }}>← Prev</button>
            <button className="text-[11px] px-2 py-1 rounded-[2px]" style={{ background: T.primary, color: T.surface }}>Next →</button>
          </div>
        </div>

        <div
          className="mt-8 p-4 rounded-[3px] flex items-start gap-3"
          style={{ background: T.surface2, border: `1px dashed ${T.rule2}` }}
        >
          <Info size={14} style={{ color: T.primary, marginTop: 2, flexShrink: 0 }}/>
          <div className="text-[12px]" style={{ color: T.ink2, lineHeight: 1.55 }}>
            <span style={{ color: T.ink, fontWeight: 500 }}>Audit log is immutable.</span> Even Ledger admins can't edit or delete entries. If a client requests an access record, export the CSV and email it directly — that's audit-grade evidence.
          </div>
        </div>
      </div>
    </>
  );
}

/* ============================================================
   APP
   ============================================================ */
export default function App() {
  const [active, setActive] = useState('firm');

  useEffect(() => {
    const id = 'ledger-settings-fonts';
    if (document.getElementById(id)) return;
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap';
    document.head.appendChild(link);
  }, []);

  return (
    <Shell active={active} setActive={setActive}>
      {active === 'firm'         && <FirmTab/>}
      {active === 'team'         && <TeamTab/>}
      {active === 'billing'      && <BillingTab/>}
      {active === 'integrations' && <IntegrationsTab/>}
      {active === 'whitelabel'   && <WhitelabelTab/>}
      {active === 'security'     && <SecurityTab/>}
      {active === 'audit'        && <AuditTab/>}
    </Shell>
  );
}

/* small stub */
function ChevronUp(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 14} height={props.size || 14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="18 15 12 9 6 15"/>
    </svg>
  );
}
