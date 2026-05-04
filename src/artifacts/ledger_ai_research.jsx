import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Sparkles, Send, BookOpen, Scale, Calculator, FileText, Library,
  Search, ChevronRight, ChevronDown, ChevronLeft, ArrowRight, ArrowUp,
  Plus, X, Star, Bookmark, Copy, Download, Share2, MoreHorizontal,
  History, Settings, Lightbulb, Brain, Zap, Filter, Hash, AtSign,
  CheckCircle2, AlertTriangle, Info, ShieldCheck, Lock, Quote,
  Building2, User, Users, Factory, Truck, HardHat, MapPin, Calendar,
  Paperclip, ChevronUp, Eye, Edit3, MessageSquare, Receipt, Inbox,
  Layers, Globe, FilePlus, Trash2, RefreshCw, Pin, Maximize2, Minimize2,
  Folder, FolderOpen, ArrowDownRight, ArrowUpRight, TrendingUp,
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
   DATA — research sessions, sources, etc
   ============================================================ */
const SESSIONS = [
  { id: 1, title: '§179 vs bonus depreciation — Bison rig',  client: 'Bison Crude Services',         when: 'Today',    pinned: true,  icon: Factory },
  { id: 2, title: 'CP2000 response strategy',                 client: 'Cheyenne Ridge Construction',  when: 'Today',    pinned: true,  icon: HardHat },
  { id: 3, title: 'IDC deduction · 2 wells brought online',   client: 'Powder River Drilling',        when: 'Yesterday',pinned: false, icon: Factory },
  { id: 4, title: 'WY → CO nexus for hauling subcontracts',   client: 'Big Horn Logistics',           when: 'Yesterday',pinned: false, icon: Truck },
  { id: 5, title: 'K-1 special allocations — 704(b) test',    client: 'Niobrara Energy Partners',     when: '2d ago',   pinned: false, icon: Factory },
  { id: 6, title: 'Cost segregation feasibility',             client: 'Powder River field office',     when: '3d ago',   pinned: false, icon: Building2 },
  { id: 7, title: 'R&D credit for directional drilling tech', client: 'Powder River Drilling',        when: '4d ago',   pinned: false, icon: Factory },
  { id: 8, title: 'Defined benefit vs SEP-IRA for owners',    client: 'Multiple',                     when: '1w ago',   pinned: false, icon: Users },
];

const PRIMARY_TOOLS = [
  { id: 'chat',     label: 'Ask',          icon: Sparkles, hint: 'Conversational research' },
  { id: 'irc',      label: 'IRC & Regs',   icon: BookOpen, hint: 'Code, regulations, revenue rulings' },
  { id: 'caselaw',  label: 'Case Law',     icon: Scale,    hint: 'Tax Court, Circuit, Supreme Court' },
  { id: 'calc',     label: 'Calculators',  icon: Calculator, hint: 'Scenarios, comparisons, projections' },
  { id: 'drafts',   label: 'Drafts',       icon: FileText, hint: 'Memos, letters, election statements' },
  { id: 'library',  label: 'My Library',   icon: Library,  hint: 'Saved snippets, citations, templates' },
];

const SUGGESTIONS = [
  'Compare §179 vs 60% bonus for a $284k drilling rig in Wyoming',
  'Draft a CP2000 response challenging proposed assessment',
  'Cost segregation eligibility for a 2024-built field office',
  'IDC vs depletion — when does each apply to oil & gas operators?',
  'WY domicile rules for a trucker hauling primarily into Colorado',
  'Form 7203 basis tracking for an S-corp shareholder',
];

/* The detailed answer to the active question — modeled as structured blocks */
const RESEARCH_ANSWER = {
  question: 'Compare §179 vs 60% bonus depreciation for a $284,000 drilling rig acquired by Bison Crude (WY partnership) in Feb 2026.',
  client: 'Bison Crude Services · 1065 · WY',
  generated: 'Just now',
  confidence: 'high',
  blocks: [
    {
      kind: 'tldr',
      title: 'Recommendation',
      tone: 'copper',
      body: "Take 60% bonus depreciation on the rig. It produces ~$28,400 in 2026 federal tax savings vs. ~$24,800 under §179 — and crucially, it isn't capped by taxable income, which matters because Bison's projected 2027 revenue is flat (the deduction loses value in a falling-income year).",
    },
    {
      kind: 'rules',
      title: 'Governing rules',
      items: [
        {
          cite: 'IRC §168(k)(6)',
          line: 'Bonus depreciation rate is 60% in 2026, 40% in 2027, 20% in 2028, 0% thereafter (absent legislative extension).',
        },
        {
          cite: 'IRC §179(b)(1)',
          line: '2026 §179 maximum deduction: $1,160,000. Investment phase-out begins at $2,890,000.',
        },
        {
          cite: 'IRC §179(b)(3)',
          line: '§179 deduction limited to taxable income from active trade or business. Excess carries forward.',
        },
        {
          cite: 'Rev. Proc. 2024-19',
          line: 'Inflation adjustments confirming 2026 §179 limits and §168 rate schedule.',
        },
      ],
    },
    {
      kind: 'compare',
      title: 'Numerical comparison',
      cols: ['', '§179 election', '60% bonus dep.'],
      rows: [
        ['Asset basis',          '$284,000',           '$284,000'],
        ['First-year deduction', '$284,000',           '$170,400'],
        ['Plus regular MACRS yr 1', '—',              '$11,376 (7-yr 200%DB on $113.6k)'],
        ['Total yr 1 deduction', '$284,000',           '$181,776'],
        ['Marginal rate (37% + SE)','—',                '—'],
        ['Yr 1 federal tax savings','~$24,800',         '~$28,400 over project life'],
        ['Income cap risk',      'Yes — capped at TI', 'No cap'],
        ['State conformity (WY)','N/A · no state tax', 'N/A · no state tax'],
        ['Carryforward if denied','Yes',                'No (flows to NOL)'],
      ],
    },
    {
      kind: 'reasoning',
      title: 'Why bonus wins here',
      body: "Three factors push this toward bonus. First, the 60% rate is meaningfully higher than the 40% rate Bison would face in 2027 if they delay — taking the deduction now captures more value before the phase-down. Second, §179 is hard-capped by taxable income; if Bison has a soft year, §179 carries forward but bonus flows directly into a partnership loss the partners can use against other income (subject to §704(d) basis and §469 passive rules — but here the partners are active). Third, you preserve §179 capacity for the smaller equipment buys you mentioned for Q3 — wireline tools, smaller pumps — which often have shorter recovery periods and respond better to §179.",
    },
    {
      kind: 'risks',
      title: 'Watch-outs',
      items: [
        'Confirm the rig is "qualified property" — used drilling equipment qualifies under §168(k)(2)(E)(ii) as long as it wasn\'t previously used by Bison or a related party.',
        'Document placed-in-service date carefully — Feb 2026 is fine, but if any installation/calibration extends past year-end, the deduction shifts to 2027.',
        'Recapture risk if asset sold or removed from service within 5 years — §1245 ordinary income on the lesser of gain or accumulated depreciation.',
        'If Bison ever takes on passive partners, §469 PAL rules kick in and the loss could suspend.',
      ],
    },
    {
      kind: 'next',
      title: 'Next steps',
      items: [
        { l: 'Draft a §168(k) election statement for the 1065 return', cta: 'Draft now' },
        { l: 'Run the 5-year depreciation projection for the partnership', cta: 'Open calculator' },
        { l: 'Add this to Bison Crude\'s tax position log',                cta: 'Save to client' },
      ],
    },
  ],
  citations: [
    { id: 1, kind: 'IRC',     code: '§168(k)',         title: 'Special allowance for certain property',          excerpt: 'In the case of qualified property, the depreciation deduction provided by section 167(a) for the taxable year in which such property is placed in service shall include an allowance equal to the applicable percentage of the adjusted basis of such property.', date: 'Current through 2026' },
    { id: 2, kind: 'IRC',     code: '§179',            title: 'Election to expense certain depreciable assets',  excerpt: 'A taxpayer may elect to treat the cost of any section 179 property as an expense which is not chargeable to capital account. Any cost so treated shall be allowed as a deduction for the taxable year in which the section 179 property is placed in service.',                       date: 'Current through 2026' },
    { id: 3, kind: 'Reg',     code: 'Treas. Reg. §1.168(k)-2', title: 'Additional first year depreciation deduction',     excerpt: 'Qualified property is depreciable property that meets all the requirements in this paragraph and is placed in service during specified time periods.', date: 'Final · 2020' },
    { id: 4, kind: 'RevProc', code: 'Rev. Proc. 2024-19', title: '2026 inflation adjustments',                            excerpt: 'For taxable years beginning in 2026, under section 179(b)(1) the aggregate cost of any section 179 property a taxpayer may elect to treat as an expense cannot exceed $1,160,000.', date: 'Issued Oct 2024' },
    { id: 5, kind: 'Case',    code: 'Sharp v. Comm\'r', title: '180 T.C. 14 (2024)',                                      excerpt: 'The Tax Court held that a drilling operator placed property in service when the equipment was first available for its specifically assigned function, even if not yet used in revenue-producing activity.',                date: 'Tax Court · 2024' },
    { id: 6, kind: 'Case',    code: 'Loudermilk Bros.', title: 'T.C. Memo 2023-118',                                       excerpt: 'The court applied a "ready-and-available" standard to placed-in-service determinations for heavy oilfield equipment, looking to operational availability rather than first revenue use.', date: 'T.C. Memo · 2023' },
  ],
};

const RECENT_DRAFTS = [
  { id: 1, title: 'CP2000 Response Letter — Cheyenne Ridge', kind: 'IRS Response',  edited: '12 min ago', words: 432 },
  { id: 2, title: '§168(k) Election Memo — Bison rig',        kind: 'Election',      edited: '2h ago',     words: 218 },
  { id: 3, title: 'Engagement letter 2026 — Powder River',    kind: 'Engagement',    edited: 'Yesterday',  words: 614 },
  { id: 4, title: 'IDC vs depletion memo — Niobrara',         kind: 'Tax Memo',      edited: '3d ago',     words: 1108 },
];

const LIBRARY_ITEMS = [
  { id: 1, kind: 'Snippet', title: 'WY domicile language',        usage: 14, last: 'Apr 22' },
  { id: 2, kind: 'Citation',title: 'Sharp v. Comm\'r placed-in-service', usage: 8, last: 'Apr 24' },
  { id: 3, kind: 'Template',title: 'CP2000 response template',    usage: 22, last: 'Apr 24' },
  { id: 4, kind: 'Template',title: '§168(k) election statement',  usage: 6,  last: 'Today' },
  { id: 5, kind: 'Snippet', title: 'Per-diem trucker calculation', usage: 11, last: 'Apr 18' },
  { id: 6, kind: 'Snippet', title: 'IDC option language for 1065', usage: 5,  last: 'Apr 15' },
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
   LEFT NAV — research sessions
   ============================================================ */
function NavRail({ activeTool, setActiveTool, activeSession, setActiveSession }) {
  return (
    <aside
      className="flex flex-col"
      style={{
        width: 280, background: T.surface, borderRight: `1px solid ${T.rule}`,
        fontFamily: FONT_BODY,
      }}
    >
      {/* brand */}
      <div className="px-5 pt-6 pb-4" style={{ borderBottom: `1px solid ${T.rule}` }}>
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
            <span className="text-[9px] uppercase tracking-[0.18em]" style={{ color: T.muted, marginTop: 1 }}>
              AI Research
            </span>
          </div>
        </div>
        <button
          className="w-full mt-4 px-3 py-2 text-[12px] flex items-center justify-center gap-1.5 rounded-[3px]"
          style={{ background: T.primary, color: T.surface, fontWeight: 500 }}
          onClick={() => setActiveSession(null)}
        >
          <Plus size={13}/> New research
        </button>
      </div>

      {/* tools */}
      <div className="px-3 pt-4">
        <div className="text-[9.5px] uppercase tracking-[0.16em] px-2 pb-2" style={{ color: T.faint }}>Tools</div>
        {PRIMARY_TOOLS.map(tool => {
          const Icon = tool.icon;
          const isActive = activeTool === tool.id;
          return (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id)}
              className="w-full flex items-center gap-2.5 px-2 py-[7px] mb-[2px] text-[12.5px] text-left"
              style={{
                background: isActive ? T.surface2 : 'transparent',
                color: isActive ? T.ink : T.ink2,
                borderRadius: 3,
                borderLeft: `2px solid ${isActive ? T.copper : 'transparent'}`,
                paddingLeft: 8,
                fontWeight: isActive ? 500 : 400,
              }}
            >
              <Icon size={14} strokeWidth={1.6} style={{ color: isActive ? T.primary : T.muted }}/>
              <span className="flex-1">{tool.label}</span>
            </button>
          );
        })}
      </div>

      {/* recent sessions */}
      <div className="px-3 pt-5 flex-1 overflow-y-auto">
        <div className="text-[9.5px] uppercase tracking-[0.16em] px-2 pb-2 flex items-center justify-between" style={{ color: T.faint }}>
          <span>Recent research</span>
          <History size={11}/>
        </div>
        {SESSIONS.map(s => {
          const Icon = s.icon;
          const isActive = activeSession === s.id;
          return (
            <button
              key={s.id}
              onClick={() => { setActiveSession(s.id); setActiveTool('chat'); }}
              className="w-full flex items-start gap-2 px-2 py-2 text-left rounded-[3px] mb-0.5"
              style={{
                background: isActive ? T.surface2 : 'transparent',
                borderLeft: `2px solid ${isActive ? T.copper : 'transparent'}`,
                paddingLeft: 8,
              }}
            >
              <div
                className="flex items-center justify-center mt-0.5 shrink-0"
                style={{ width: 22, height: 22, background: T.surface2, border: `1px solid ${T.rule}`, borderRadius: 3 }}
              >
                <Icon size={11} style={{ color: T.primary }}/>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  {s.pinned && <Pin size={9} style={{ color: T.copper, transform: 'rotate(45deg)' }}/>}
                  <span className="text-[11.5px] truncate" style={{ color: T.ink, fontWeight: isActive ? 500 : 400, lineHeight: 1.3 }}>
                    {s.title}
                  </span>
                </div>
                <div className="text-[10px] mt-0.5 flex items-center gap-1" style={{ color: T.muted }}>
                  <span className="truncate">{s.client}</span>
                  <span>·</span>
                  <span style={{ fontFamily: FONT_MONO }}>{s.when}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* footer */}
      <div className="px-3 py-3" style={{ borderTop: `1px solid ${T.rule}` }}>
        <div
          className="flex items-center gap-2.5 px-2 py-1.5 rounded-[3px]"
          style={{ background: T.surface2 }}
        >
          <div
            className="flex items-center justify-center text-[11px]"
            style={{ width: 28, height: 28, borderRadius: '50%', background: T.copper, color: T.surface, fontWeight: 600 }}
          >SP</div>
          <div className="flex-1 min-w-0">
            <div className="text-[12px] truncate" style={{ color: T.ink, fontWeight: 500 }}>Suresh Patel, EA</div>
            <div className="text-[10px]" style={{ color: T.muted }}>Free tier · 412 / 1000 queries</div>
          </div>
          <Settings size={13} style={{ color: T.muted }}/>
        </div>
      </div>
    </aside>
  );
}

/* ============================================================
   TOP BAR — context strip
   ============================================================ */
function TopBar({ session, drawerOpen, setDrawerOpen }) {
  return (
    <div
      className="px-6 py-3 flex items-center gap-4"
      style={{ background: T.surface, borderBottom: `1px solid ${T.rule}`, fontFamily: FONT_BODY }}
    >
      <div className="flex items-baseline gap-2">
        <span className="text-[10.5px] uppercase tracking-[0.18em]" style={{ color: T.muted }}>Research /</span>
        <span style={{ fontFamily: FONT_DISPLAY, fontSize: 19, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.01em' }}>
          {session?.title || 'New session'}
        </span>
      </div>
      {session && (
        <div className="flex items-center gap-2">
          <Pill tone="primary">{session.client}</Pill>
          <Pill tone="copper" tiny><Sparkles size={9}/> AI · IRC + Regs + Case Law</Pill>
        </div>
      )}
      <div className="flex-1"/>
      <div
        className="flex items-center gap-2 px-3 py-[7px] rounded-[3px] flex-1 max-w-[420px]"
        style={{ background: T.surface2, border: `1px solid ${T.rule}` }}
      >
        <Search size={13} style={{ color: T.muted }}/>
        <input
          placeholder="Search IRC, regs, case law…"
          className="flex-1 bg-transparent outline-none text-[12px]"
          style={{ color: T.ink }}
        />
        <span className="text-[10px] px-1.5 rounded-[2px]" style={{ background: T.surface, border: `1px solid ${T.rule}`, color: T.muted, fontFamily: FONT_MONO }}>⌘/</span>
      </div>
      <button className="p-2 rounded-[3px]" style={{ background: T.surface2, border: `1px solid ${T.rule}` }}>
        <Share2 size={13} style={{ color: T.ink2 }}/>
      </button>
      <button
        onClick={() => setDrawerOpen(!drawerOpen)}
        className="px-2.5 py-1.5 text-[11px] flex items-center gap-1.5 rounded-[3px]"
        style={{ background: drawerOpen ? T.primary : T.surface2, color: drawerOpen ? T.surface : T.ink2, border: drawerOpen ? 'none' : `1px solid ${T.rule}` }}
      >
        <Quote size={11}/> Citations <span style={{ fontFamily: FONT_MONO, opacity: 0.8 }}>· 6</span>
      </button>
    </div>
  );
}

/* ============================================================
   ANSWER BLOCKS
   ============================================================ */
function TldrBlock({ block }) {
  return (
    <div
      className="p-5 rounded-[3px] relative overflow-hidden"
      style={{ background: T.surface, border: `1px solid ${T.copper}` }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute', right: -30, top: -30, width: 100, height: 100,
          border: `1px solid ${T.copper}`, opacity: 0.18, borderRadius: '50%',
        }}
      />
      <div className="relative">
        <div className="text-[10px] uppercase tracking-[0.18em] flex items-center gap-1.5" style={{ color: T.copper, fontFamily: FONT_BODY, fontWeight: 500 }}>
          <Lightbulb size={11}/> {block.title}
        </div>
        <p
          className="mt-3"
          style={{
            fontFamily: FONT_DISPLAY, fontSize: 22, lineHeight: 1.4,
            letterSpacing: '-0.01em', color: T.ink, fontStyle: 'italic',
          }}
        >
          {block.body}
        </p>
      </div>
    </div>
  );
}

function RulesBlock({ block }) {
  return (
    <div className="p-5 rounded-[3px]" style={{ background: T.surface, border: `1px solid ${T.rule}` }}>
      <div className="flex items-center gap-2 mb-4">
        <BookOpen size={14} style={{ color: T.primary }}/>
        <span className="text-[10px] uppercase tracking-[0.18em]" style={{ color: T.muted, fontWeight: 500 }}>{block.title}</span>
      </div>
      <div className="flex flex-col">
        {block.items.map((it, i) => (
          <div
            key={i}
            className="grid grid-cols-12 gap-4 py-3"
            style={{ borderTop: i > 0 ? `1px solid ${T.rule}` : 'none' }}
          >
            <div className="col-span-3">
              <button
                className="text-[11px] font-medium flex items-center gap-1 hover:underline"
                style={{ color: T.copper, fontFamily: FONT_MONO }}
              >
                {it.cite} <ChevronRight size={11}/>
              </button>
            </div>
            <div className="col-span-9 text-[12.5px]" style={{ color: T.ink2, lineHeight: 1.55 }}>
              {it.line}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CompareBlock({ block }) {
  return (
    <div className="rounded-[3px] overflow-hidden" style={{ background: T.surface, border: `1px solid ${T.rule}` }}>
      <div className="px-5 py-3.5 flex items-center gap-2" style={{ borderBottom: `1px solid ${T.rule}` }}>
        <Calculator size={14} style={{ color: T.primary }}/>
        <span className="text-[10px] uppercase tracking-[0.18em]" style={{ color: T.muted, fontWeight: 500 }}>{block.title}</span>
        <button className="ml-auto text-[10.5px] flex items-center gap-1 px-2 py-1 rounded-[2px]" style={{ color: T.copper, border: `1px solid ${T.rule}` }}>
          <Calculator size={10}/> Open in calculator
        </button>
      </div>
      <div
        className="grid"
        style={{
          gridTemplateColumns: '1.5fr 1fr 1.2fr',
          fontFamily: FONT_BODY,
        }}
      >
        {/* header */}
        <div className="px-4 py-2.5 text-[10px] uppercase tracking-[0.14em]" style={{ color: T.muted, background: T.surface2, borderBottom: `1px solid ${T.rule}` }}>
          {block.cols[0]}
        </div>
        <div className="px-4 py-2.5 text-[11.5px] text-center" style={{ color: T.ink2, background: T.surface2, borderBottom: `1px solid ${T.rule}`, borderLeft: `1px solid ${T.rule}`, fontWeight: 500 }}>
          {block.cols[1]}
        </div>
        <div className="px-4 py-2.5 text-[11.5px] text-center" style={{ color: T.copper, background: '#FBF6E8', borderBottom: `1px solid ${T.rule}`, borderLeft: `1px solid ${T.rule}`, fontWeight: 600 }}>
          ★ {block.cols[2]}
        </div>

        {block.rows.map((row, i) => (
          <React.Fragment key={i}>
            <div
              className="px-4 py-2.5 text-[12px]"
              style={{ color: T.ink2, borderBottom: i < block.rows.length - 1 ? `1px solid ${T.rule}` : 'none' }}
            >
              {row[0]}
            </div>
            <div
              className="px-4 py-2.5 text-[12px] text-center"
              style={{
                color: T.ink, borderBottom: i < block.rows.length - 1 ? `1px solid ${T.rule}` : 'none',
                borderLeft: `1px solid ${T.rule}`, fontFamily: FONT_MONO,
              }}
            >
              {row[1]}
            </div>
            <div
              className="px-4 py-2.5 text-[12px] text-center"
              style={{
                color: T.ink, borderBottom: i < block.rows.length - 1 ? `1px solid ${T.rule}` : 'none',
                borderLeft: `1px solid ${T.rule}`, background: '#FCFAF2', fontFamily: FONT_MONO,
              }}
            >
              {row[2]}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function ReasoningBlock({ block }) {
  return (
    <div className="p-5 rounded-[3px]" style={{ background: T.surface, border: `1px solid ${T.rule}` }}>
      <div className="flex items-center gap-2 mb-3">
        <Brain size={14} style={{ color: T.primary }}/>
        <span className="text-[10px] uppercase tracking-[0.18em]" style={{ color: T.muted, fontWeight: 500 }}>{block.title}</span>
      </div>
      <p className="text-[13px]" style={{ color: T.ink2, lineHeight: 1.7, fontFamily: FONT_BODY }}>
        {block.body}
      </p>
    </div>
  );
}

function RisksBlock({ block }) {
  return (
    <div className="p-5 rounded-[3px]" style={{ background: T.surface, border: `1px solid ${T.rule}` }}>
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle size={14} style={{ color: T.warn }}/>
        <span className="text-[10px] uppercase tracking-[0.18em]" style={{ color: T.muted, fontWeight: 500 }}>{block.title}</span>
      </div>
      <ul className="flex flex-col gap-2.5">
        {block.items.map((it, i) => (
          <li key={i} className="flex items-start gap-2.5 text-[12.5px]" style={{ color: T.ink2, lineHeight: 1.55, fontFamily: FONT_BODY }}>
            <span className="mt-1.5" style={{ width: 4, height: 4, borderRadius: '50%', background: T.warn, flexShrink: 0 }}/>
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

function NextStepsBlock({ block, onJump }) {
  return (
    <div className="p-5 rounded-[3px]" style={{ background: T.surface2, border: `1px dashed ${T.rule2}` }}>
      <div className="text-[10px] uppercase tracking-[0.18em] mb-3" style={{ color: T.muted, fontWeight: 500 }}>{block.title}</div>
      <div className="flex flex-col gap-2">
        {block.items.map((it, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-[3px]" style={{ background: T.surface, border: `1px solid ${T.rule}` }}>
            <span className="flex items-center justify-center text-[10px]" style={{ width: 22, height: 22, borderRadius: '50%', background: T.surface2, border: `1px solid ${T.rule}`, color: T.muted, fontFamily: FONT_MONO, fontWeight: 600 }}>
              {i + 1}
            </span>
            <span className="flex-1 text-[12.5px]" style={{ color: T.ink2 }}>{it.l}</span>
            <button
              onClick={onJump}
              className="text-[11px] px-2.5 py-1 rounded-[3px] flex items-center gap-1"
              style={{ background: T.primary, color: T.surface, fontWeight: 500 }}
            >
              {it.cta} <ArrowRight size={10}/>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   ASK / CHAT VIEW — main canvas
   ============================================================ */
function AskView({ session, setActiveTool, setSession }) {
  const [draft, setDraft] = useState('');
  const [showAnswer, setShowAnswer] = useState(!!session);

  useEffect(() => {
    setShowAnswer(!!session);
  }, [session]);

  const submit = (text) => {
    if (!text.trim()) return;
    setShowAnswer(true);
    setSession({
      id: 1, title: '§179 vs bonus depreciation — Bison rig',
      client: 'Bison Crude Services', when: 'Today', pinned: true, icon: Factory,
    });
    setDraft('');
  };

  if (!showAnswer) {
    return <BlankCanvas onSubmit={submit} draft={draft} setDraft={setDraft}/>;
  }

  return (
    <div className="flex-1 overflow-y-auto" style={{ background: T.bg }}>
      <div className="max-w-[860px] mx-auto px-8 py-8" style={{ fontFamily: FONT_BODY }}>
        {/* Question header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Pill tone="copper" tiny><Sparkles size={9}/> AI answer</Pill>
            <span className="text-[10.5px]" style={{ color: T.muted }}>
              <span style={{ fontFamily: FONT_MONO }}>{RESEARCH_ANSWER.generated}</span> · grounded on IRC, Treasury Regs, and 6 cited cases
            </span>
            <Pill tone="low" tiny>High confidence</Pill>
          </div>
          <h1
            style={{
              fontFamily: FONT_DISPLAY, fontSize: 30, lineHeight: 1.2,
              letterSpacing: '-0.015em', color: T.ink, fontStyle: 'italic',
            }}
          >
            {RESEARCH_ANSWER.question}
          </h1>
          <div className="text-[11.5px] mt-2.5 flex items-center gap-2" style={{ color: T.muted }}>
            <Factory size={12} style={{ color: T.primary }}/>
            <span>{RESEARCH_ANSWER.client}</span>
          </div>
        </div>

        {/* Blocks */}
        <div className="flex flex-col gap-4">
          {RESEARCH_ANSWER.blocks.map((b, i) => {
            if (b.kind === 'tldr')      return <TldrBlock      key={i} block={b}/>;
            if (b.kind === 'rules')     return <RulesBlock     key={i} block={b}/>;
            if (b.kind === 'compare')   return <CompareBlock   key={i} block={b}/>;
            if (b.kind === 'reasoning') return <ReasoningBlock key={i} block={b}/>;
            if (b.kind === 'risks')     return <RisksBlock     key={i} block={b}/>;
            if (b.kind === 'next')      return <NextStepsBlock key={i} block={b} onJump={() => setActiveTool('drafts')}/>;
            return null;
          })}
        </div>

        {/* Action toolbar */}
        <div className="mt-6 p-3 rounded-[3px] flex items-center gap-2 flex-wrap" style={{ background: T.surface, border: `1px solid ${T.rule}` }}>
          <button className="text-[11px] px-3 py-1.5 rounded-[3px] flex items-center gap-1.5" style={{ background: T.surface2, color: T.ink2, border: `1px solid ${T.rule}` }}>
            <Bookmark size={12}/> Save to library
          </button>
          <button className="text-[11px] px-3 py-1.5 rounded-[3px] flex items-center gap-1.5" style={{ background: T.surface2, color: T.ink2, border: `1px solid ${T.rule}` }}>
            <FileText size={12}/> Save as memo
          </button>
          <button className="text-[11px] px-3 py-1.5 rounded-[3px] flex items-center gap-1.5" style={{ background: T.surface2, color: T.ink2, border: `1px solid ${T.rule}` }}>
            <Copy size={12}/> Copy
          </button>
          <button className="text-[11px] px-3 py-1.5 rounded-[3px] flex items-center gap-1.5" style={{ background: T.surface2, color: T.ink2, border: `1px solid ${T.rule}` }}>
            <Download size={12}/> Export PDF
          </button>
          <div className="flex-1"/>
          <button className="text-[11px] flex items-center gap-1" style={{ color: T.muted }}>
            <RefreshCw size={11}/> Regenerate
          </button>
        </div>

        {/* Follow-up prompt */}
        <div className="mt-6">
          <div className="text-[10px] uppercase tracking-[0.16em] mb-2" style={{ color: T.muted }}>Follow-up</div>
          <FollowUp draft={draft} setDraft={setDraft} onSubmit={submit}/>

          <div className="flex items-center gap-1.5 mt-3 flex-wrap">
            {[
              'What if Bison expects 2027 income to spike instead?',
              'Draft the §168(k) election statement',
              'Show me a 5-year depreciation projection',
              'How does WY treat this for franchise tax?',
            ].map(s => (
              <button
                key={s}
                onClick={() => setDraft(s)}
                className="text-[10.5px] px-2 py-1 rounded-[2px]"
                style={{ background: T.surface, color: T.ink2, border: `1px solid ${T.rule}` }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BlankCanvas({ draft, setDraft, onSubmit }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-8" style={{ background: T.bg, fontFamily: FONT_BODY }}>
      <div className="max-w-[760px] w-full text-center">
        <div
          className="inline-flex items-center justify-center mb-6"
          style={{ width: 56, height: 56, borderRadius: '50%', background: T.surface, border: `1px solid ${T.rule}` }}
        >
          <Sparkles size={22} style={{ color: T.copper }}/>
        </div>
        <h1
          style={{
            fontFamily: FONT_DISPLAY, fontSize: 48, lineHeight: 1.05,
            letterSpacing: '-0.025em', color: T.ink, fontStyle: 'italic',
          }}
        >
          What do you want<br/>to research, Suresh?
        </h1>
        <p className="mt-4 max-w-[560px] mx-auto text-[14px]" style={{ color: T.ink2, lineHeight: 1.6 }}>
          Ask in plain English. Ledger AI cites the IRC, Treasury Regs, and case law inline —
          and shows its work so you can verify before sending anything to a client.
        </p>

        <div className="mt-8 max-w-[640px] mx-auto">
          <FollowUp draft={draft} setDraft={setDraft} onSubmit={onSubmit} large/>
        </div>

        <div className="mt-8 max-w-[680px] mx-auto">
          <div className="text-[10px] uppercase tracking-[0.16em] mb-3" style={{ color: T.muted }}>Try one of these</div>
          <div className="flex flex-col gap-1.5">
            {SUGGESTIONS.map(s => (
              <button
                key={s}
                onClick={() => onSubmit(s)}
                className="flex items-center justify-between gap-3 px-4 py-2.5 text-[12.5px] text-left rounded-[3px] transition-transform hover:-translate-y-px"
                style={{ background: T.surface, border: `1px solid ${T.rule}`, color: T.ink2 }}
              >
                <span>{s}</span>
                <ArrowUp size={12} style={{ color: T.faint, transform: 'rotate(45deg)' }}/>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 flex items-center justify-center gap-5 text-[10.5px]" style={{ color: T.muted }}>
          <span className="flex items-center gap-1.5"><ShieldCheck size={11}/> Grounded on primary sources</span>
          <span className="flex items-center gap-1.5"><Lock size={11}/> Your queries stay private</span>
          <span className="flex items-center gap-1.5"><BookOpen size={11}/> 2.4M citations indexed</span>
        </div>
      </div>
    </div>
  );
}

function FollowUp({ draft, setDraft, onSubmit, large }) {
  return (
    <div
      className="flex items-end gap-2 p-2 rounded-[6px]"
      style={{
        background: T.surface, border: `1px solid ${T.rule2}`,
        boxShadow: large ? '0 12px 30px -12px rgba(11,61,58,0.15)' : 'none',
      }}
    >
      <button
        className="flex items-center justify-center"
        style={{ width: 32, height: 32, borderRadius: 4, background: T.surface2, border: `1px solid ${T.rule}` }}
      >
        <AtSign size={13} style={{ color: T.muted }}/>
      </button>
      <textarea
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSubmit(draft);
          }
        }}
        placeholder={large ? 'e.g. Compare §179 vs bonus depreciation for Bison\'s new rig' : 'Ask a follow-up…'}
        rows={large ? 2 : 1}
        className="flex-1 px-2 py-1.5 outline-none bg-transparent resize-none"
        style={{ fontSize: large ? 14 : 13, color: T.ink, fontFamily: FONT_BODY, lineHeight: 1.5, minHeight: large ? 56 : 30 }}
      />
      <button
        onClick={() => onSubmit(draft)}
        disabled={!draft.trim()}
        className="flex items-center justify-center gap-1 px-3"
        style={{
          height: 32, borderRadius: 4,
          background: draft.trim() ? T.primary : T.faint,
          color: T.surface, fontSize: 12, fontWeight: 500,
          opacity: draft.trim() ? 1 : 0.6,
        }}
      >
        <Send size={11}/> Send
      </button>
    </div>
  );
}

/* ============================================================
   IRC & REGS VIEW
   ============================================================ */
function IrcView() {
  const [open, setOpen] = useState({ '168': true, '179': true });
  return (
    <div className="flex-1 overflow-y-auto" style={{ background: T.bg, fontFamily: FONT_BODY }}>
      <div className="max-w-[920px] mx-auto px-8 py-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: T.copper, fontWeight: 500 }}>02</span>
          <span style={{ width: 24, height: 1, background: T.rule2 }}/>
          <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: T.muted }}>Code & regulations</span>
        </div>
        <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: 40, lineHeight: 1.05, letterSpacing: '-0.02em', color: T.ink, fontStyle: 'italic' }}>
          Internal Revenue Code
        </h1>
        <p className="mt-3 max-w-[560px] text-[13.5px]" style={{ color: T.ink2, lineHeight: 1.6 }}>
          Read the live text. The AI grounds answers here — and any phrase it cites links back to the exact section.
        </p>

        {/* Search */}
        <div className="mt-6 flex items-center gap-2">
          <div
            className="flex items-center gap-2 px-3 py-2.5 rounded-[3px] flex-1"
            style={{ background: T.surface, border: `1px solid ${T.rule}` }}
          >
            <Search size={13} style={{ color: T.muted }}/>
            <input
              defaultValue="§168(k) bonus depreciation"
              className="flex-1 bg-transparent outline-none text-[12.5px]"
              style={{ color: T.ink, fontFamily: FONT_MONO }}
            />
            <span className="text-[10px] px-1.5 py-[1px] rounded-[2px]" style={{ background: T.surface2, color: T.muted, fontFamily: FONT_MONO, border: `1px solid ${T.rule}` }}>148 results</span>
          </div>
          <button className="px-3 py-2.5 text-[11.5px] flex items-center gap-1.5 rounded-[3px]" style={{ background: T.surface, color: T.ink2, border: `1px solid ${T.rule}` }}>
            <Filter size={12}/> Filters
          </button>
        </div>

        {/* Code section */}
        <div className="mt-6 flex flex-col gap-3">
          {[
            { num: '§168', title: 'Accelerated cost recovery system', desc: 'MACRS recovery periods, alternative depreciation, bonus rules.' },
            { num: '§179', title: 'Election to expense certain depreciable assets', desc: 'Limits, phase-out, taxable income limitation, recapture.' },
            { num: '§263A', title: 'Capitalization and inclusion in inventory costs', desc: 'UNICAP rules; producer & reseller treatment.' },
            { num: '§460', title: 'Special rules for long-term contracts', desc: 'Percentage of completion; small contractor exception.' },
          ].map(s => {
            const isOpen = open[s.num.replace('§', '')];
            return (
              <div key={s.num} style={{ background: T.surface, border: `1px solid ${T.rule}`, borderRadius: 3 }}>
                <button
                  onClick={() => setOpen({ ...open, [s.num.replace('§', '')]: !isOpen })}
                  className="w-full flex items-center gap-4 px-5 py-4 text-left"
                >
                  <div
                    className="flex items-center justify-center"
                    style={{
                      width: 44, height: 44, background: T.surface2, border: `1px solid ${T.rule}`,
                      borderRadius: 4, fontFamily: FONT_DISPLAY, fontStyle: 'italic',
                      color: T.primary, fontSize: 18, fontWeight: 600,
                    }}
                  >
                    {s.num}
                  </div>
                  <div className="flex-1">
                    <div className="text-[14px]" style={{ color: T.ink, fontWeight: 500 }}>{s.title}</div>
                    <div className="text-[11.5px] mt-0.5" style={{ color: T.muted }}>{s.desc}</div>
                  </div>
                  <Pill tone="primary" tiny>Live</Pill>
                  {isOpen ? <ChevronUp size={14} style={{ color: T.muted }}/> : <ChevronDown size={14} style={{ color: T.muted }}/>}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1" style={{ borderTop: `1px solid ${T.rule}` }}>
                    <CodeExcerpt section={s.num}/>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function CodeExcerpt({ section }) {
  const text = section === '§168'
    ? `(k) Special allowance for certain property —
   (1) Additional allowance —
       In the case of any qualified property —
       (A) the depreciation deduction provided by section 167(a) for the taxable year in which such property is placed in service shall include an allowance equal to the applicable percentage of the adjusted basis of the qualified property, and
       (B) the adjusted basis of the qualified property shall be reduced by the amount of such deduction before computing the amount otherwise allowable as a depreciation deduction under this chapter for such taxable year and any subsequent taxable year.

   (6) Applicable percentage —
       (A) In general — Except as otherwise provided in this paragraph, the term "applicable percentage" means —
           (i) in the case of property placed in service after September 27, 2017, and before January 1, 2023, 100 percent,
           (ii) in the case of property placed in service in calendar year 2023, 80 percent,
           (iii) in the case of property placed in service in calendar year 2024, 60 percent,
           (iv) in the case of property placed in service in calendar year 2025, 40 percent...`
    : `(a) Treatment as expenses —
   A taxpayer may elect to treat the cost of any section 179 property as an expense which is not chargeable to capital account. Any cost so treated shall be allowed as a deduction for the taxable year in which the section 179 property is placed in service.

(b) Limitations —
   (1) Dollar limitation — The aggregate cost which may be taken into account under subsection (a) for any taxable year shall not exceed $1,000,000 [adjusted for inflation; $1,160,000 in 2026 per Rev. Proc. 2024-19].
   (2) Reduction in limitation — The limitation under paragraph (1) for any taxable year shall be reduced (but not below zero) by the amount by which the cost of section 179 property placed in service during such taxable year exceeds $2,500,000 [$2,890,000 in 2026].
   (3) Limitation based on income from trade or business — The aggregate cost of section 179 property taken into account under subsection (a) for any taxable year shall not exceed the aggregate amount of taxable income of the taxpayer for such taxable year which is derived from the active conduct by the taxpayer of any trade or business.`;
  return (
    <div className="flex flex-col gap-3 mt-3">
      <pre
        className="p-4 rounded-[3px] whitespace-pre-wrap"
        style={{
          background: T.surface2, border: `1px solid ${T.rule}`,
          fontFamily: FONT_MONO, fontSize: 11.5, color: T.ink2, lineHeight: 1.65,
        }}
      >
        {text}
      </pre>
      <div className="flex items-center gap-2">
        <Pill tone="copper" tiny><Sparkles size={9}/> AI summary</Pill>
        <span className="text-[11px]" style={{ color: T.muted, fontStyle: 'italic' }}>
          {section === '§168'
            ? 'Bonus depreciation phasing down: 60% (2026) → 40% (2027) → 20% (2028) → 0% absent extension.'
            : '2026 cap is $1.16M with phase-out beginning at $2.89M. Always limited by trade/business taxable income.'}
        </span>
      </div>
    </div>
  );
}

/* ============================================================
   CASE LAW VIEW
   ============================================================ */
const CASES = [
  { id:1, name: 'Sharp v. Commissioner',         cite: '180 T.C. 14 (2024)',     court: 'Tax Court',     topic: 'Placed-in-service · oilfield equipment', held: 'Held for taxpayer. Heavy drilling equipment "placed in service" when ready and available for assigned function.', strength: 'high', favorability: 'taxpayer', citedBy: 14, opensCircuit: false },
  { id:2, name: 'Loudermilk Bros. v. Comm\'r',   cite: 'T.C. Memo 2023-118',     court: 'Tax Court',     topic: 'Heavy oilfield equipment',                 held: 'Adopted "ready-and-available" standard. Operational availability over first revenue use.',                                          strength: 'high', favorability: 'taxpayer', citedBy: 8,  opensCircuit: false },
  { id:3, name: 'Petrohawk Energy v. Comm\'r',   cite: '142 T.C. 8 (2023)',      court: 'Tax Court',     topic: 'IDC vs depletion election',               held: 'Confirmed taxpayer\'s right to elect §263(c) IDC expensing on integrated drilling costs in same year.',                              strength: 'high', favorability: 'taxpayer', citedBy: 22, opensCircuit: false },
  { id:4, name: 'United States v. Whyatt',       cite: '983 F.3d 622 (10th Cir.)',court:'10th Circuit',  topic: 'Per-diem deduction · OTR truckers',       held: 'Affirmed substantiation requirements; logbook with date/route is sufficient if contemporaneous.',                                     strength: 'medium', favorability: 'mixed', citedBy: 31, opensCircuit: false },
  { id:5, name: 'Estate of Branham',             cite: 'T.C. Memo 2024-37',      court: 'Tax Court',     topic: '§754 election timing',                     held: 'Late §754 election permitted under Reg §301.9100-3 where taxpayer acted reasonably and in good faith.',                                strength: 'medium', favorability: 'taxpayer', citedBy: 6,  opensCircuit: false },
  { id:6, name: 'Bonner v. Commissioner',        cite: 'T.C. Memo 2025-12',      court: 'Tax Court',     topic: 'Cost segregation challenge',              held: 'IRS\'s cost segregation challenge denied where engineering study followed §1245 component framework.',                              strength: 'high', favorability: 'taxpayer', citedBy: 4,  opensCircuit: false },
];

function CaseLawView() {
  const [filter, setFilter] = useState('all');
  return (
    <div className="flex-1 overflow-y-auto" style={{ background: T.bg, fontFamily: FONT_BODY }}>
      <div className="max-w-[1080px] mx-auto px-8 py-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: T.copper, fontWeight: 500 }}>03</span>
          <span style={{ width: 24, height: 1, background: T.rule2 }}/>
          <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: T.muted }}>Decisions</span>
        </div>
        <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: 40, lineHeight: 1.05, letterSpacing: '-0.02em', color: T.ink, fontStyle: 'italic' }}>
          Case Law
        </h1>
        <p className="mt-3 max-w-[640px] text-[13.5px]" style={{ color: T.ink2, lineHeight: 1.6 }}>
          Tax Court, Circuit, and Supreme Court decisions filtered to your specialty. AI flags strength,
          favorability, and citation network — so you know whether to lean on a case or just acknowledge it.
        </p>

        <div className="mt-6 flex items-center gap-2 flex-wrap">
          {[['all','All cases'],['oil','Oil & gas'],['trucking','Trucking'],['depreciation','Depreciation'],['favorable','Favorable to taxpayer']].map(([k,v]) => (
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
          <span className="ml-auto text-[11px]" style={{ color: T.muted }}>{CASES.length} cases</span>
        </div>

        <div className="mt-5 flex flex-col gap-3">
          {CASES.map(c => (
            <div key={c.id} className="p-5 rounded-[3px] flex gap-4" style={{ background: T.surface, border: `1px solid ${T.rule}` }}>
              <div
                className="flex items-center justify-center shrink-0"
                style={{ width: 44, height: 44, background: T.surface2, border: `1px solid ${T.rule}`, borderRadius: 4 }}
              >
                <Scale size={18} style={{ color: T.primary }}/>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[14px]" style={{ color: T.ink, fontFamily: FONT_DISPLAY, fontSize: 18, fontStyle: 'italic', letterSpacing: '-0.01em', fontWeight: 500 }}>
                    {c.name}
                  </span>
                  <Pill tone="primary" tiny>{c.court}</Pill>
                  <Pill tone={c.favorability === 'taxpayer' ? 'low' : c.favorability === 'mixed' ? 'med' : 'high'} tiny>
                    {c.favorability}
                  </Pill>
                </div>
                <div className="text-[11px] mt-1" style={{ color: T.muted, fontFamily: FONT_MONO }}>
                  {c.cite} · {c.topic}
                </div>
                <p className="text-[12.5px] mt-3" style={{ color: T.ink2, lineHeight: 1.55 }}>
                  <span style={{ color: T.copper, fontWeight: 500 }}>Held — </span>{c.held}
                </p>

                <div className="flex items-center gap-3 mt-3 text-[10.5px]" style={{ color: T.muted }}>
                  <span className="flex items-center gap-1"><Quote size={10}/> {c.citedBy} citations</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: c.strength === 'high' ? T.ok : T.warn }}/>
                    Precedential strength: {c.strength}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-1.5 shrink-0">
                <button className="text-[10.5px] px-2.5 py-1.5 rounded-[3px] flex items-center gap-1" style={{ background: T.surface2, color: T.ink2, border: `1px solid ${T.rule}` }}>
                  <Eye size={11}/> Read
                </button>
                <button className="text-[10.5px] px-2.5 py-1.5 rounded-[3px] flex items-center gap-1" style={{ background: T.surface2, color: T.ink2, border: `1px solid ${T.rule}` }}>
                  <Bookmark size={11}/> Save
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   CALCULATORS VIEW — depreciation scenario sandbox
   ============================================================ */
function CalculatorView() {
  const [basis, setBasis] = useState(284000);
  const [useBonus, setUseBonus] = useState(true);
  const [recovery, setRecovery] = useState(7);
  const [rate, setRate] = useState(0.37);

  const yr1Bonus = useBonus ? basis * 0.6 : 0;
  const remainingBasis = basis - yr1Bonus;
  const macrsYr1 = remainingBasis * (recovery === 7 ? 0.1429 : recovery === 5 ? 0.20 : 0.10);
  const yr1Total = yr1Bonus + macrsYr1;
  const yr1Savings = yr1Total * rate;

  const yr179 = Math.min(basis, 1160000);
  const yr179Savings = yr179 * rate;

  const fmt = (n) => '$' + Math.round(n).toLocaleString('en-US');

  return (
    <div className="flex-1 overflow-y-auto" style={{ background: T.bg, fontFamily: FONT_BODY }}>
      <div className="max-w-[1100px] mx-auto px-8 py-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: T.copper, fontWeight: 500 }}>04</span>
          <span style={{ width: 24, height: 1, background: T.rule2 }}/>
          <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: T.muted }}>Sandboxes</span>
        </div>
        <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: 40, lineHeight: 1.05, letterSpacing: '-0.02em', color: T.ink, fontStyle: 'italic' }}>
          Depreciation Calculator
        </h1>
        <p className="mt-3 max-w-[560px] text-[13.5px]" style={{ color: T.ink2, lineHeight: 1.6 }}>
          Model the asset, choose your election, see year-by-year recovery and tax impact. Save scenarios to a client's tax position log.
        </p>

        <div className="mt-6 grid grid-cols-12 gap-5">
          {/* Inputs */}
          <div className="col-span-5">
            <div className="p-5 rounded-[3px]" style={{ background: T.surface, border: `1px solid ${T.rule}` }}>
              <div className="text-[10px] uppercase tracking-[0.16em] mb-3" style={{ color: T.muted, fontWeight: 500 }}>Inputs</div>

              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-[10.5px] uppercase tracking-[0.12em]" style={{ color: T.muted }}>Asset basis</label>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-[20px]" style={{ color: T.muted, fontFamily: FONT_DISPLAY, fontStyle: 'italic' }}>$</span>
                    <input
                      type="number"
                      value={basis}
                      onChange={(e) => setBasis(Number(e.target.value))}
                      className="flex-1 bg-transparent outline-none"
                      style={{ fontFamily: FONT_DISPLAY, fontSize: 28, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.02em' }}
                    />
                  </div>
                  <input
                    type="range" min={50000} max={1500000} step={1000}
                    value={basis}
                    onChange={(e) => setBasis(Number(e.target.value))}
                    className="w-full mt-2"
                    style={{ accentColor: T.primary }}
                  />
                </div>

                <div>
                  <label className="text-[10.5px] uppercase tracking-[0.12em]" style={{ color: T.muted }}>Recovery period</label>
                  <div className="grid grid-cols-3 gap-2 mt-1.5">
                    {[5, 7, 15].map(r => (
                      <button
                        key={r}
                        onClick={() => setRecovery(r)}
                        className="px-3 py-2 text-[12px] rounded-[3px]"
                        style={{
                          background: recovery === r ? T.surface2 : T.surface,
                          border: `${recovery === r ? 2 : 1}px solid ${recovery === r ? T.primary : T.rule}`,
                          color: T.ink2, fontWeight: recovery === r ? 500 : 400,
                        }}
                      >
                        {r} year
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[10.5px] uppercase tracking-[0.12em]" style={{ color: T.muted }}>Marginal tax rate</label>
                  <div className="grid grid-cols-4 gap-2 mt-1.5">
                    {[0.22, 0.24, 0.32, 0.37].map(r => (
                      <button
                        key={r}
                        onClick={() => setRate(r)}
                        className="px-2 py-2 text-[12px] rounded-[3px]"
                        style={{
                          background: rate === r ? T.surface2 : T.surface,
                          border: `${rate === r ? 2 : 1}px solid ${rate === r ? T.primary : T.rule}`,
                          color: T.ink2, fontWeight: rate === r ? 500 : 400,
                        }}
                      >
                        {Math.round(r * 100)}%
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2" style={{ borderTop: `1px solid ${T.rule}` }}>
                  <button
                    onClick={() => setUseBonus(!useBonus)}
                    className="flex items-center justify-center"
                    style={{
                      width: 40, height: 22, borderRadius: 11,
                      background: useBonus ? T.primary : T.rule2,
                      transition: 'background 200ms',
                      position: 'relative', padding: 2,
                    }}
                  >
                    <span
                      style={{
                        width: 18, height: 18, borderRadius: '50%', background: T.surface,
                        position: 'absolute', left: useBonus ? 20 : 2,
                        transition: 'left 200ms',
                      }}
                    />
                  </button>
                  <span className="text-[12.5px]" style={{ color: T.ink, fontWeight: 500 }}>Take 60% bonus depreciation</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="col-span-7">
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="p-5 rounded-[3px]" style={{ background: T.surface, border: `1px solid ${T.rule}` }}>
                <div className="text-[10px] uppercase tracking-[0.14em]" style={{ color: T.muted }}>§179 path</div>
                <div className="mt-2" style={{ fontFamily: FONT_DISPLAY, fontSize: 32, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.02em', lineHeight: 1 }}>
                  {fmt(yr179)}
                </div>
                <div className="text-[10.5px] mt-1" style={{ color: T.muted }}>year-1 deduction</div>
                <div className="mt-3 flex items-baseline gap-1.5">
                  <span className="text-[10px]" style={{ color: T.muted }}>Tax savings →</span>
                  <span className="text-[14px]" style={{ color: T.ok, fontFamily: FONT_MONO, fontWeight: 500 }}>{fmt(yr179Savings)}</span>
                </div>
              </div>

              <div className="p-5 rounded-[3px] relative" style={{ background: T.surface, border: `2px solid ${T.copper}` }}>
                <div className="text-[10px] uppercase tracking-[0.14em] flex items-center gap-1" style={{ color: T.copper }}>
                  <Sparkles size={9}/> Bonus + MACRS
                </div>
                <div className="mt-2" style={{ fontFamily: FONT_DISPLAY, fontSize: 32, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.02em', lineHeight: 1 }}>
                  {fmt(yr1Total)}
                </div>
                <div className="text-[10.5px] mt-1" style={{ color: T.muted }}>year-1 deduction</div>
                <div className="mt-3 flex items-baseline gap-1.5">
                  <span className="text-[10px]" style={{ color: T.muted }}>Tax savings →</span>
                  <span className="text-[14px]" style={{ color: T.copper, fontFamily: FONT_MONO, fontWeight: 600 }}>{fmt(yr1Savings)}</span>
                </div>
              </div>
            </div>

            {/* Year-by-year chart */}
            <div className="p-5 rounded-[3px]" style={{ background: T.surface, border: `1px solid ${T.rule}` }}>
              <div className="text-[10px] uppercase tracking-[0.16em] mb-3" style={{ color: T.muted, fontWeight: 500 }}>5-year recovery curve</div>
              <YearByYearChart basis={basis} useBonus={useBonus} recovery={recovery}/>
            </div>

            {/* Save / share */}
            <div className="mt-3 flex items-center gap-2">
              <button className="text-[11px] px-3 py-1.5 rounded-[3px] flex items-center gap-1.5" style={{ background: T.primary, color: T.surface, fontWeight: 500 }}>
                <Bookmark size={12}/> Save scenario to Bison Crude
              </button>
              <button className="text-[11px] px-3 py-1.5 rounded-[3px] flex items-center gap-1.5" style={{ background: T.surface2, color: T.ink2, border: `1px solid ${T.rule}` }}>
                <FileText size={12}/> Generate election memo
              </button>
              <button className="text-[11px] px-3 py-1.5 rounded-[3px] flex items-center gap-1.5" style={{ background: T.surface2, color: T.ink2, border: `1px solid ${T.rule}` }}>
                <Download size={12}/> Export
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function YearByYearChart({ basis, useBonus, recovery }) {
  // Compute a simple 5-year MACRS curve with optional bonus.
  const halfYearTable = {
    5:  [0.20, 0.32, 0.192, 0.1152, 0.1152, 0.0576],
    7:  [0.1429, 0.2449, 0.1749, 0.1249, 0.0893, 0.0892],
    15: [0.05, 0.095, 0.0855, 0.077, 0.0693, 0.0623],
  };
  const yrs = ['Yr 1', 'Yr 2', 'Yr 3', 'Yr 4', 'Yr 5'];
  const bonus = useBonus ? basis * 0.6 : 0;
  const remaining = basis - bonus;
  const tbl = halfYearTable[recovery];
  const macrsYears = yrs.map((_, i) => remaining * tbl[i]);
  const totals = macrsYears.map((m, i) => m + (i === 0 ? bonus : 0));
  const max = Math.max(...totals);

  const W = 540, H = 180, P = 24;
  const barW = (W - P * 2) / yrs.length - 12;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%">
      {/* y axis grid */}
      {[0, 0.25, 0.5, 0.75, 1].map((p, i) => {
        const y = H - P - p * (H - P * 2);
        return (
          <g key={i}>
            <line x1={P} y1={y} x2={W - P} y2={y} stroke={T.rule} strokeWidth={0.5} strokeDasharray="2 4"/>
            <text x={P - 6} y={y + 3} textAnchor="end" fontSize={8.5} fill={T.muted} fontFamily={FONT_MONO}>
              ${Math.round((max * p) / 1000)}k
            </text>
          </g>
        );
      })}
      {totals.map((v, i) => {
        const x = P + 6 + i * ((W - P * 2) / yrs.length);
        const h = (v / max) * (H - P * 2);
        const y = H - P - h;
        // bonus portion (yr 1 only)
        const bonusH = i === 0 ? (bonus / max) * (H - P * 2) : 0;
        const macrsH = h - bonusH;
        return (
          <g key={i}>
            {/* macrs portion */}
            <rect x={x} y={y + bonusH} width={barW} height={macrsH} fill={T.primary} rx={2}/>
            {/* bonus portion */}
            {bonusH > 0 && (
              <rect x={x} y={y} width={barW} height={bonusH} fill={T.copper} rx={2}/>
            )}
            <text x={x + barW / 2} y={y - 6} textAnchor="middle" fontSize={9} fill={T.ink} fontFamily={FONT_MONO} fontWeight={500}>
              ${Math.round(v / 1000)}k
            </text>
            <text x={x + barW / 2} y={H - P + 14} textAnchor="middle" fontSize={9.5} fill={T.muted} fontFamily={FONT_BODY}>
              {yrs[i]}
            </text>
          </g>
        );
      })}
      {/* legend */}
      <g transform={`translate(${P + 4}, ${P - 14})`}>
        <rect x={0} y={0} width={10} height={10} fill={T.copper} rx={2}/>
        <text x={14} y={9} fontSize={9} fill={T.ink2} fontFamily={FONT_BODY}>Bonus</text>
        <rect x={64} y={0} width={10} height={10} fill={T.primary} rx={2}/>
        <text x={78} y={9} fontSize={9} fill={T.ink2} fontFamily={FONT_BODY}>MACRS</text>
      </g>
    </svg>
  );
}

/* ============================================================
   DRAFTS VIEW
   ============================================================ */
function DraftsView() {
  const [active, setActive] = useState(2);
  const draft = RECENT_DRAFTS.find(d => d.id === active);

  return (
    <div className="flex-1 grid grid-cols-12" style={{ background: T.bg, fontFamily: FONT_BODY }}>
      {/* drafts list */}
      <div className="col-span-4 overflow-y-auto" style={{ background: T.surface, borderRight: `1px solid ${T.rule}` }}>
        <div className="px-5 py-4" style={{ borderBottom: `1px solid ${T.rule}` }}>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: T.copper, fontWeight: 500 }}>05</span>
            <span style={{ width: 16, height: 1, background: T.rule2 }}/>
            <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: T.muted }}>Drafts</span>
          </div>
          <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 24, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.01em', lineHeight: 1.05 }}>
            Drafting workspace
          </h2>
          <button className="mt-3 w-full px-3 py-2 text-[12px] flex items-center justify-center gap-1.5 rounded-[3px]" style={{ background: T.primary, color: T.surface, fontWeight: 500 }}>
            <FilePlus size={13}/> New draft
          </button>
        </div>
        {RECENT_DRAFTS.map(d => (
          <button
            key={d.id}
            onClick={() => setActive(d.id)}
            className="w-full flex flex-col gap-1 p-4 text-left"
            style={{
              background: active === d.id ? T.surface2 : T.surface,
              borderBottom: `1px solid ${T.rule}`,
              borderLeft: `2px solid ${active === d.id ? T.copper : 'transparent'}`,
            }}
          >
            <div className="flex items-center gap-2">
              <FileText size={12} style={{ color: T.primary }}/>
              <span className="text-[12.5px] truncate" style={{ color: T.ink, fontWeight: active === d.id ? 500 : 400 }}>{d.title}</span>
            </div>
            <div className="flex items-center gap-2 text-[10.5px]" style={{ color: T.muted }}>
              <Pill tone="primary" tiny>{d.kind}</Pill>
              <span style={{ fontFamily: FONT_MONO }}>{d.words} words</span>
              <span>·</span>
              <span>{d.edited}</span>
            </div>
          </button>
        ))}
      </div>

      {/* draft editor */}
      <div className="col-span-8 overflow-y-auto">
        <div className="max-w-[700px] mx-auto px-8 py-8">
          <div className="flex items-center gap-2 mb-4">
            <Pill tone="copper" tiny><Sparkles size={9}/> AI-drafted</Pill>
            <Pill tone="primary" tiny>{draft?.kind}</Pill>
            <span className="ml-auto text-[10.5px]" style={{ color: T.muted }}>Last edited {draft?.edited}</span>
          </div>

          <h1
            contentEditable
            suppressContentEditableWarning
            style={{
              fontFamily: FONT_DISPLAY, fontSize: 32, lineHeight: 1.1,
              letterSpacing: '-0.015em', color: T.ink, fontStyle: 'italic',
              outline: 'none',
            }}
          >
            §168(k) Bonus Depreciation Election Memo
          </h1>
          <div className="mt-2 text-[12px]" style={{ color: T.muted }}>
            Bison Crude Services LLC · EIN 84-XXXXXXX · Tax Year 2026
          </div>

          <div className="mt-6 flex flex-col gap-4">
            <p className="text-[13.5px]" style={{ color: T.ink2, lineHeight: 1.75, fontFamily: FONT_BODY }}>
              <span style={{ color: T.ink, fontWeight: 500 }}>Purpose. </span>
              This memorandum documents Bison Crude Services LLC's election under
              <span style={{ background: '#FBF6E8', padding: '0 4px', borderRadius: 2, fontFamily: FONT_MONO, color: T.copper, fontSize: 12 }}> IRC §168(k) </span>
              to claim the additional first-year depreciation allowance ("bonus depreciation") at the
              applicable 60% rate on qualified property placed in service in calendar year 2026.
            </p>

            <p className="text-[13.5px]" style={{ color: T.ink2, lineHeight: 1.75, fontFamily: FONT_BODY }}>
              <span style={{ color: T.ink, fontWeight: 500 }}>Asset. </span>
              The qualified property is one (1) drilling rig, placed in service February 14, 2026, with an
              adjusted basis of $284,000. The asset has a 7-year MACRS recovery period and constitutes
              "qualified property" within the meaning of
              <span style={{ background: '#FBF6E8', padding: '0 4px', borderRadius: 2, fontFamily: FONT_MONO, color: T.copper, fontSize: 12 }}> §168(k)(2)(E)(ii) </span>
              as the Partnership is the original user.
            </p>

            <p className="text-[13.5px]" style={{ color: T.ink2, lineHeight: 1.75, fontFamily: FONT_BODY }}>
              <span style={{ color: T.ink, fontWeight: 500 }}>Election. </span>
              Pursuant to
              <span style={{ background: '#FBF6E8', padding: '0 4px', borderRadius: 2, fontFamily: FONT_MONO, color: T.copper, fontSize: 12 }}> Treas. Reg. §1.168(k)-2 </span>
              and Rev. Proc. 2024-19, the Partnership elects to apply the 60% bonus depreciation allowance.
              First-year deduction:
              <span style={{ fontFamily: FONT_MONO, color: T.ink, fontWeight: 500 }}> $170,400</span>, with the remaining adjusted basis of
              <span style={{ fontFamily: FONT_MONO, color: T.ink, fontWeight: 500 }}> $113,600</span> recovered under MACRS over seven years.
            </p>

            <p className="text-[13.5px]" style={{ color: T.ink2, lineHeight: 1.75, fontFamily: FONT_BODY }}>
              <span style={{ color: T.ink, fontWeight: 500 }}>Authority. </span>
              The "ready-and-available" placed-in-service standard articulated in
              <span style={{ background: '#F5E8DA', padding: '0 4px', borderRadius: 2, fontFamily: FONT_MONO, color: T.primary, fontSize: 12 }}> Sharp v. Comm'r, 180 T.C. 14 (2024) </span>
              and applied to oilfield equipment in
              <span style={{ background: '#F5E8DA', padding: '0 4px', borderRadius: 2, fontFamily: FONT_MONO, color: T.primary, fontSize: 12 }}> Loudermilk Bros., T.C. Memo 2023-118 </span>
              supports treating the rig as placed in service on February 14, 2026.
            </p>
          </div>

          {/* AI suggestions hovering at side */}
          <div
            className="mt-6 p-4 rounded-[3px] flex items-start gap-3"
            style={{ background: T.surface, border: `1px dashed ${T.copper}` }}
          >
            <Sparkles size={14} style={{ color: T.copper, marginTop: 2, flexShrink: 0 }}/>
            <div className="flex-1">
              <div className="text-[10.5px] uppercase tracking-[0.14em] mb-1.5" style={{ color: T.copper, fontWeight: 500 }}>AI suggestions</div>
              <div className="flex flex-col gap-2">
                {[
                  'Add a "State conformity" paragraph noting WY has no state income tax.',
                  'Cite Petrohawk Energy v. Comm\'r for IDC interaction with §168(k).',
                  'Insert recapture warning under §1245 if asset disposed within 5 years.',
                ].map((s, i) => (
                  <button key={i} className="flex items-start gap-2 text-left text-[12px]" style={{ color: T.ink2, lineHeight: 1.5 }}>
                    <Plus size={11} style={{ color: T.copper, marginTop: 3, flexShrink: 0 }}/>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 flex items-center gap-2">
            <button className="text-[11.5px] px-3 py-1.5 rounded-[3px] flex items-center gap-1.5" style={{ background: T.primary, color: T.surface, fontWeight: 500 }}>
              <FileText size={12}/> Save & attach to Bison Crude
            </button>
            <button className="text-[11.5px] px-3 py-1.5 rounded-[3px] flex items-center gap-1.5" style={{ background: T.surface2, color: T.ink2, border: `1px solid ${T.rule}` }}>
              <Download size={12}/> Export DOCX
            </button>
            <button className="text-[11.5px] px-3 py-1.5 rounded-[3px] flex items-center gap-1.5" style={{ background: T.surface2, color: T.ink2, border: `1px solid ${T.rule}` }}>
              <Share2 size={12}/> Share with team
            </button>
            <span className="ml-auto text-[10.5px] flex items-center gap-1" style={{ color: T.muted }}>
              <CheckCircle2 size={11} style={{ color: T.ok }}/> Auto-saved
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   LIBRARY VIEW
   ============================================================ */
function LibraryView() {
  return (
    <div className="flex-1 overflow-y-auto" style={{ background: T.bg, fontFamily: FONT_BODY }}>
      <div className="max-w-[1080px] mx-auto px-8 py-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: T.copper, fontWeight: 500 }}>06</span>
          <span style={{ width: 24, height: 1, background: T.rule2 }}/>
          <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: T.muted }}>Saved</span>
        </div>
        <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: 40, lineHeight: 1.05, letterSpacing: '-0.02em', color: T.ink, fontStyle: 'italic' }}>
          Your Library
        </h1>
        <p className="mt-3 max-w-[560px] text-[13.5px]" style={{ color: T.ink2, lineHeight: 1.6 }}>
          Reusable snippets, citations, and templates. The longer you use Ledger, the more your firm's
          tax knowledge accumulates here — and the AI starts pulling from it before searching elsewhere.
        </p>

        <div className="mt-6 grid grid-cols-3 gap-3">
          {LIBRARY_ITEMS.map(it => (
            <div key={it.id} className="p-5 rounded-[3px]" style={{ background: T.surface, border: `1px solid ${T.rule}` }}>
              <div className="flex items-center gap-2 mb-3">
                <Pill tone="primary" tiny>{it.kind}</Pill>
                <span className="ml-auto text-[10px]" style={{ color: T.muted }}>used {it.usage}×</span>
              </div>
              <div className="text-[13.5px]" style={{ color: T.ink, fontWeight: 500, lineHeight: 1.4 }}>{it.title}</div>
              <div className="flex items-center justify-between mt-3 pt-3" style={{ borderTop: `1px solid ${T.rule}` }}>
                <span className="text-[10.5px]" style={{ color: T.muted, fontFamily: FONT_MONO }}>last used {it.last}</span>
                <button className="text-[10.5px] flex items-center gap-1" style={{ color: T.copper, fontWeight: 500 }}>
                  Insert <ArrowRight size={10}/>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   CITATION DRAWER (right)
   ============================================================ */
function CitationDrawer({ open, setOpen }) {
  if (!open) return null;
  return (
    <aside
      className="flex flex-col"
      style={{
        width: 360, background: T.surface, borderLeft: `1px solid ${T.rule}`,
        fontFamily: FONT_BODY,
      }}
    >
      <div className="px-5 py-3 flex items-center justify-between" style={{ borderBottom: `1px solid ${T.rule}` }}>
        <div className="flex items-center gap-2">
          <Quote size={14} style={{ color: T.primary }}/>
          <span className="text-[12.5px]" style={{ color: T.ink, fontWeight: 500 }}>Citations</span>
          <Pill tone="primary" tiny>{RESEARCH_ANSWER.citations.length}</Pill>
        </div>
        <button onClick={() => setOpen(false)} className="p-1"><X size={14} style={{ color: T.muted }}/></button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">
        {RESEARCH_ANSWER.citations.map(c => (
          <div key={c.id} className="p-3 rounded-[3px]" style={{ background: T.surface2, border: `1px solid ${T.rule}` }}>
            <div className="flex items-center gap-2 mb-2">
              <Pill tone={c.kind === 'Case' ? 'copper' : c.kind === 'IRC' ? 'primary' : 'neutral'} tiny>{c.kind}</Pill>
              <span className="text-[11px]" style={{ color: T.copper, fontFamily: FONT_MONO, fontWeight: 500 }}>{c.code}</span>
              <span className="ml-auto text-[9.5px]" style={{ color: T.muted, fontFamily: FONT_MONO }}>{c.date}</span>
            </div>
            <div className="text-[12px]" style={{ color: T.ink, fontWeight: 500, lineHeight: 1.4 }}>{c.title}</div>
            <p className="text-[11.5px] mt-2 italic" style={{ color: T.ink2, lineHeight: 1.55 }}>
              "{c.excerpt}"
            </p>
            <div className="flex items-center gap-2 mt-3 pt-3" style={{ borderTop: `1px dashed ${T.rule2}` }}>
              <button className="text-[10.5px] flex items-center gap-1" style={{ color: T.primary, fontWeight: 500 }}>
                <Eye size={10}/> Read full
              </button>
              <span style={{ color: T.muted }}>·</span>
              <button className="text-[10.5px] flex items-center gap-1" style={{ color: T.muted }}>
                <Bookmark size={10}/> Save
              </button>
              <span style={{ color: T.muted }}>·</span>
              <button className="text-[10.5px] flex items-center gap-1" style={{ color: T.muted }}>
                <Copy size={10}/> Cite
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="px-5 py-3 flex items-center gap-2" style={{ borderTop: `1px solid ${T.rule}`, background: T.surface2 }}>
        <ShieldCheck size={12} style={{ color: T.ok }}/>
        <span className="text-[10.5px]" style={{ color: T.muted, lineHeight: 1.4 }}>
          All citations verified against Cornell LII, Treasury, and Tax Court databases.
        </span>
      </div>
    </aside>
  );
}

/* ============================================================
   APP
   ============================================================ */
export default function App() {
  const [activeTool, setActiveTool] = useState('chat');
  const [activeSession, setActiveSession] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(true);

  const session = SESSIONS.find(s => s.id === activeSession);

  useEffect(() => {
    const id = 'ledger-research-fonts';
    if (document.getElementById(id)) return;
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap';
    document.head.appendChild(link);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: T.bg, color: T.ink }}>
      <NavRail
        activeTool={activeTool}
        setActiveTool={setActiveTool}
        activeSession={activeSession}
        setActiveSession={setActiveSession}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar session={session} drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen}/>

        <div className="flex-1 flex overflow-hidden">
          {activeTool === 'chat'    && <AskView session={session} setActiveTool={setActiveTool} setSession={(s) => setActiveSession(s?.id || 1)}/>}
          {activeTool === 'irc'     && <IrcView/>}
          {activeTool === 'caselaw' && <CaseLawView/>}
          {activeTool === 'calc'    && <CalculatorView/>}
          {activeTool === 'drafts'  && <DraftsView/>}
          {activeTool === 'library' && <LibraryView/>}

          {(activeTool === 'chat' || activeTool === 'caselaw' || activeTool === 'irc') && (
            <CitationDrawer open={drawerOpen} setOpen={setDrawerOpen}/>
          )}
        </div>
      </div>
    </div>
  );
}
