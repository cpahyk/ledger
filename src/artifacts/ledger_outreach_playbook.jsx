import React, { useState, useEffect, useMemo } from 'react';
import {
  Target, Mail, Phone, MessageSquare, Calendar, FileText, Calculator,
  TrendingUp, Users, User, Building2, Factory, Truck, HardHat,
  MapPin, Globe, ChevronRight, ArrowRight, Plus, X, Search, Copy,
  Edit3, Send, CheckCircle2, Sparkles, Star, BookOpen, DollarSign,
  Eye, Inbox, FileSignature, BarChart3, Activity, Award, Flag,
  RefreshCw, Settings, ExternalLink, Hash, Coffee, Lightbulb, Heart,
  ShieldCheck, Lock, Headphones, Quote, Snowflake, Flame, ArrowUp,
  Download, Briefcase, Clock, AlertTriangle, Brain, ArrowDownRight,
  ArrowUpRight, MoreHorizontal,
} from 'lucide-react';

const T = {
  bg: '#F4EFE6', bgDeep: '#EAE3D0', surface: '#FFFDF8', surface2: '#FAF6EC',
  surface3: '#F5EFE0', ink: '#171411', ink2: '#3B342B', muted: '#7A7163',
  faint: '#B5AC9B', rule: '#E5DDC9', rule2: '#D9CFB6',
  primary: '#0B3D3A', primary2: '#1A5C57', primaryDk: '#062624',
  copper: '#C46A2D', copperLt: '#E89762', gold: '#B8893C',
  ok: '#3F7355', warn: '#C28A2A', danger: '#A8402E',
};
const FONT_DISPLAY = '"Instrument Serif", "Times New Roman", serif';
const FONT_BODY = '"Geist", "Inter", system-ui, sans-serif';
const FONT_MONO = '"JetBrains Mono", ui-monospace, monospace';

const TABS = [
  { id: 'strategy', label: 'Strategy', icon: Target, num: '01' },
  { id: 'prospects', label: 'Prospects', icon: Users, num: '02', badge: 10 },
  { id: 'sequences', label: 'Outreach', icon: Mail, num: '03' },
  { id: 'discovery', label: 'Discovery script', icon: Headphones, num: '04' },
  { id: 'roi', label: 'ROI calculator', icon: Calculator, num: '05' },
  { id: 'proposal', label: 'Proposal', icon: FileSignature, num: '06' },
  { id: 'pipeline', label: 'Pipeline', icon: BarChart3, num: '07' },
];

const ICPS = [
  { id: 1, name: 'Wyoming oil & gas operator', icon: Factory, color: T.copper, avgFee: 22000, cycleTime: '3-6 weeks', closeRate: '34%',
    pain: ['IDC vs depletion election errors', 'Cost basis on equipment', 'Multi-state if drilling crosses borders'],
    triggers: ['New rig acquired', 'Partner buy-in/buy-out', 'Recent IRS notice', 'Switching from QB Self-Employed'],
    where: ['WyTax oil & gas conferences', 'WY Energy Authority directory', 'Casper Petroleum Club', 'WY O&G Conservation filings'],
    sample: 'Powder River Drilling LLC' },
  { id: 2, name: 'Owner-operator trucker', icon: Truck, color: T.primary, avgFee: 8400, cycleTime: '1-3 weeks', closeRate: '52%',
    pain: ['Per-diem substantiation logs', 'Multi-state apportionment', '1099 vs W-2 for owner-ops'],
    triggers: ['New truck purchase', 'Forming an LLC/S-Corp', 'Hit by IRS audit', 'Switching from strip-mall preparer'],
    where: ['OOIDA member directory', 'WY Trucking Association', 'Trucker forums (Reddit, Facebook)', 'Truck stop bulletin boards'],
    sample: 'Big Horn Logistics' },
  { id: 3, name: 'Construction GC', icon: HardHat, color: T.gold, avgFee: 18500, cycleTime: '4-8 weeks', closeRate: '28%',
    pain: ['§460 long-term contract methods', 'WIP & retainage tracking', 'Sales tax across project sites'],
    triggers: ['Bonding requirements', '$10M revenue threshold', 'Adding subs', 'New entity formation'],
    where: ['AGC Wyoming chapter', 'WY Contractors Association', 'County permit filings', 'Bid posting boards'],
    sample: 'Cheyenne Ridge Construction' },
];

const PROSPECTS = [
  { id: 1, company: 'Sage Creek Drilling', contact: 'Ray Holloway', industry: 'Oil & Gas', stage: 'qualified', source: 'WY O&G Comm.', city: 'Gillette', state: 'WY', icon: Factory, fee: 24000, lastTouch: '2d ago', signals: ['CP2000', 'rig purchased Q4'], nextStep: 'Follow up email #2' },
  { id: 2, company: 'Rocky Mtn. Hauling', contact: 'Della Marston', industry: 'Trucking', stage: 'meeting', source: 'Referral · Big Horn', city: 'Casper', state: 'WY', icon: Truck, fee: 9200, lastTouch: 'Today', signals: ['Forming S-Corp'], nextStep: 'Discovery call Wed 2pm' },
  { id: 3, company: 'Bighorn Pipeline', contact: 'Jed Brennan', industry: 'Oil & Gas', stage: 'cold', source: 'Cold list', city: 'Buffalo', state: 'WY', icon: Factory, fee: 21000, lastTouch: '—', signals: [], nextStep: 'Send email #1' },
  { id: 4, company: 'Niobrara Steel Erectors', contact: 'Hollis Garner', industry: 'Construction', stage: 'qualified', source: 'AGC referral', city: 'Cheyenne', state: 'WY', icon: HardHat, fee: 17800, lastTouch: '5d ago', signals: ['Bonding requirement'], nextStep: 'Send proposal' },
  { id: 5, company: 'Wyatt Trucking', contact: 'Wyatt Kessler', industry: 'Trucking', stage: 'won', source: 'Truck stop ad', city: 'Sheridan', state: 'WY', icon: Truck, fee: 7800, lastTouch: 'Yesterday', signals: ['Onboarded'], nextStep: 'Welcome sequence' },
  { id: 6, company: 'Powder River Steel', contact: 'Tessa Nordquist', industry: 'Construction', stage: 'meeting', source: 'LinkedIn', city: 'Gillette', state: 'WY', icon: HardHat, fee: 19500, lastTouch: '1d ago', signals: ['$10M threshold'], nextStep: 'Discovery call Fri' },
  { id: 7, company: 'Sweetwater Frac', contact: 'Brock Tillman', industry: 'Oil & Gas', stage: 'cold', source: 'WY Energy Auth.', city: 'Rock Springs', state: 'WY', icon: Factory, fee: 23500, lastTouch: '—', signals: [], nextStep: 'Send email #1' },
  { id: 8, company: 'Antelope Crossing Express', contact: 'Ashlyn Reeves', industry: 'Trucking', stage: 'proposal', source: 'OOIDA list', city: 'Riverton', state: 'WY', icon: Truck, fee: 8800, lastTouch: '3d ago', signals: ['New truck loan'], nextStep: 'Follow on proposal' },
  { id: 9, company: 'Granite Peak GC', contact: 'Marlene Hayes', industry: 'Construction', stage: 'qualified', source: 'County permits', city: 'Laramie', state: 'WY', icon: HardHat, fee: 16400, lastTouch: '1d ago', signals: ['Subcontractor team'], nextStep: 'Discovery call' },
  { id: 10, company: 'Cody Whitman 1040', contact: 'Cody Whitman', industry: 'Personal', stage: 'won', source: 'Existing client', city: 'Buffalo', state: 'WY', icon: User, fee: 3200, lastTouch: '2 wks ago', signals: ['Active'], nextStep: 'Annual planning call' },
];

const STAGE_DEFS = [
  { id: 'cold', label: 'Cold', color: T.faint, desc: 'On the list · not contacted yet' },
  { id: 'contacted', label: 'Contacted', color: T.gold, desc: 'Email/call sent · awaiting reply' },
  { id: 'qualified', label: 'Qualified', color: T.copper, desc: 'Replied or showed interest' },
  { id: 'meeting', label: 'Meeting', color: T.primary, desc: 'Discovery call scheduled or held' },
  { id: 'proposal', label: 'Proposal', color: T.primary2, desc: 'Proposal sent · awaiting decision' },
  { id: 'won', label: 'Won', color: T.ok, desc: 'Engagement signed · onboarded' },
  { id: 'lost', label: 'Lost', color: T.danger, desc: 'Closed · with reason logged' },
];

const SEQUENCES = [
  { id: 'cold-oilgas', name: 'Cold · Oil & Gas Operator', icon: Factory, color: T.copper, audience: 'Wyoming O&G operators', duration: '14 days', avgReply: '18%', avgClose: '6.4%',
    steps: [
      { day: 0, channel: 'email', subject: '{{first}}, quick question about your IDC strategy',
        body: `Hi {{first}} —\n\nI noticed {{company}} has been active in the Powder River basin. Quick question: who handles your IDC vs depletion election each year?\n\nReason I ask — I work with three other operators your size in {{state}}, and the difference between an EA who actually understands oil & gas tax positioning and a generic CPA is usually $30-80k/year in unnecessary federal tax.\n\nWorth a 20-minute call to compare what you're doing today vs. what your peers are doing? I can share specific numbers (anonymized) from similar operators.\n\nNo pitch deck. Just numbers.\n\n— Suresh Patel, EA\nHYK Tax · Federal authorization · all 50 states` },
      { day: 4, channel: 'email', subject: 'RE: IDC strategy — quick follow-up',
        body: `Hi {{first}} — wanted to make sure my note didn't get buried.\n\nIf you're not the right person for this, no worries — could you point me to whoever handles {{company}}'s tax work?\n\nIf timing is just bad, totally fair. Happy to circle back in Q3 when extension season eases up.\n\n— Suresh` },
      { day: 7, channel: 'linkedin', subject: 'Connection request',
        body: `Hi {{first}} — sent a couple notes about IDC strategy for {{company}}. Connecting here in case email isn't the best channel. Happy to chat anytime.` },
      { day: 11, channel: 'email', subject: 'A specific number for {{company}}',
        body: `Hi {{first}} — last note from me unless I hear back.\n\nI ran a rough scenario for an operator your size with similar drilling activity:\n\n• Generic CPA approach (depletion only): ~$84k federal liability\n• EA approach (IDC + bonus dep + §263A correctly applied): ~$52k federal liability\n• Annual delta: ~$32k\n\nThat's real money. If even half of that is on the table for {{company}}, a 20-minute call costs you nothing.\n\nIf this isn't for you, I get it. I won't follow up again.\n\n— Suresh Patel, EA` },
      { day: 14, channel: 'task', subject: 'Move to nurture or close',
        body: `No reply after 4 touches. Move to "Q3 nurture" list if WY operator with >$5M revenue. Otherwise close as cold-no-reply.` },
    ]},
  { id: 'cold-trucking', name: 'Cold · Trucker / Owner-Op', icon: Truck, color: T.primary, audience: 'Owner-op truckers · WY/MT', duration: '10 days', avgReply: '24%', avgClose: '11.2%',
    steps: [
      { day: 0, channel: 'email', subject: 'Quick question, {{first}} — per-diem',
        body: `Hi {{first}} —\n\nAre you tracking your per-diem the standard $80/day way, or are you using actual receipts? Most owner-ops are leaving real money on the table because they don't know which one wins for their route mix.\n\nI work with 14 owner-ops and small fleets across WY and MT. My average client saves $4,200/yr in federal tax just by getting per-diem and fuel tax credits right.\n\n20-minute call, no pitch. Want to compare notes?\n\n— Suresh, EA` },
      { day: 3, channel: 'sms', subject: 'SMS · personal',
        body: `Hi {{first}} — Suresh here, EA out of WY. Sent you an email about per-diem tracking. If text is better, here works too. — S` },
      { day: 7, channel: 'email', subject: 'Last note — a number for {{company}}',
        body: `{{first}} — last note from me.\n\nFor an owner-op driving ~110k miles/yr, the typical federal tax win between "okay tax prep" and "trucking-specialist tax prep" is $3,800-$5,400/yr.\n\nIf you're paying $400 to H&R or a strip-mall preparer right now, you're losing 10x that on the back end.\n\nNot a hard sell. If this isn't the right time, all good.\n\n— Suresh` },
      { day: 10, channel: 'task', subject: 'Move to nurture',
        body: `Move to quarterly nurture list if active owner-op. Send Q3 reminder during peak per-diem season.` },
    ]},
  { id: 'cold-construction', name: 'Cold · Construction GC', icon: HardHat, color: T.gold, audience: 'WY/CO/MT construction GCs', duration: '21 days', avgReply: '14%', avgClose: '4.8%',
    steps: [
      { day: 0, channel: 'email', subject: '{{company}} · §460 question',
        body: `Hi {{first}} —\n\nSpecific question: are you using percentage-of-completion or completed-contract for your long-term jobs?\n\nIf you're under the small-contractor exception ($31M average gross receipts), you have a choice. If you're over it, you don't. A lot of GCs in your range get this wrong and overpay by $40-100k a year.\n\nI work with three GCs in WY/CO. Happy to share what they're doing if useful.\n\n— Suresh Patel, EA` },
      { day: 6, channel: 'phone', subject: 'Phone · cold call',
        body: `Reference the §460 email · ask if 5 minutes is okay · pivot to "what does your current tax prep look like" question.` },
      { day: 12, channel: 'email', subject: 'Different angle — bonding',
        body: `Hi {{first}} — different angle.\n\nIf {{company}} is approaching bonding requirements or already bonded, your CPA is part of your bondability story. Surety underwriters look at how clean your books and tax filings are. A specialist tax practice can sometimes shift your bonding capacity by $1-3M just by reorganizing how revenue and WIP get reported.\n\nWorth talking?\n\n— Suresh` },
      { day: 21, channel: 'task', subject: 'Move to long nurture',
        body: `GC sales cycles are long. Move to bi-monthly nurture · email at year-end with §199A planning angle.` },
    ]},
  { id: 'referral', name: 'Referral · Warm Intro', icon: Heart, color: T.ok, audience: 'Referrals from existing clients', duration: '7 days', avgReply: '78%', avgClose: '52%',
    steps: [
      { day: 0, channel: 'email', subject: '{{first}} — intro from {{referrer}}',
        body: `Hi {{first}} —\n\n{{referrer}} mentioned you might be looking for tax help for {{company}}. Happy to chat anytime.\n\nQuick context on me: EA, federally authorized in all 50 states, work primarily with {{industry}} businesses across WY/MT/CO. {{referrer}} has been a client for {{tenure}} — happy to give you their perspective if useful.\n\nWhat's your week look like? I'm flexible.\n\n— Suresh` },
      { day: 4, channel: 'email', subject: 'Following up',
        body: `Hi {{first}} — circling back. Want to grab 30 minutes this week or next? I can do early mornings, evenings, or weekends — whatever works for your schedule.\n\n— Suresh` },
      { day: 7, channel: 'task', subject: 'Loop in referrer',
        body: `If no response, ping {{referrer}} for warm re-intro · usually closes the loop quickly.` },
    ]},
];

const DISCOVERY = [
  { section: 'Open', blurb: 'Build rapport · let them talk', qs: [
    { q: 'Tell me about {{company}} — how did it start, where are you today?', why: 'Lets them talk · you learn entity, age, partners, size' },
    { q: 'What does a typical week look like for you running it?', why: 'Surfaces operational complexity · hints at tax pain' },
    { q: 'What\'s the best part of running this business? What keeps you up at night?', why: 'Emotional anchor · helps you frame your value later' },
  ]},
  { section: 'Current state', blurb: 'Diagnose what they have today', qs: [
    { q: 'Walk me through what your tax & accounting setup looks like right now.', why: 'You need to know: who, what software, how often' },
    { q: 'How long have you been with your current preparer?', why: 'Long tenure = harder switch · short = easier' },
    { q: 'How would you grade them — A through F? Why that grade?', why: 'Forces a real answer · reveals dissatisfaction' },
    { q: 'When was the last time they proactively suggested something — a strategy, deduction, deadline?', why: 'If "never" — you have an opening' },
    { q: 'Have you ever gotten an IRS notice? How did your preparer handle it?', why: 'IRS notice handling is a major switching trigger' },
  ]},
  { section: 'Pain · cost', blurb: 'Quantify what bad tax work costs them', qs: [
    { q: 'What did you owe in federal tax last year — ballpark?', why: 'Anchors the conversation in real money' },
    { q: 'Do you feel that number was as low as it could be — or do you suspect you\'re leaving money on the table?', why: 'Almost everyone says "leaving money" · gives you permission to find it' },
    { q: 'How many hours a month do you (or your bookkeeper) spend on tax-related admin?', why: 'Time cost · you can give some of that back' },
    { q: 'When was the last time you and your tax person sat down for an actual planning conversation?', why: 'Most prospects say "never" · this is your wedge' },
  ]},
  { section: 'Future', blurb: 'Where are they trying to go?', qs: [
    { q: 'Where do you want {{company}} to be in three years?', why: 'Growth = more complex tax = more value for a specialist' },
    { q: 'Any major moves coming — new equipment, partners, entity, real estate?', why: 'Each one is a tax planning opportunity' },
    { q: 'If we worked together, what would have to be true 12 months from now for you to call it a win?', why: 'Their definition of value · use this verbatim in your proposal' },
  ]},
  { section: 'Close', blurb: 'Move to next step or kindly disqualify', qs: [
    { q: 'On a scale of 1-10, how interested are you in seeing what we could do for {{company}}?', why: 'Forces commitment · 1-7 means more education needed' },
    { q: 'What would have to be true for you to make a switch?', why: 'Surfaces real objections you can address in proposal' },
    { q: 'If we put together a proposal showing specifically what we\'d save you in tax, when could we walk through it together?', why: 'Books the next meeting before you hang up' },
  ]},
];

const cx = (...a) => a.filter(Boolean).join(' ');
const fmt = (n) => '$' + Number(n).toLocaleString('en-US');

function Pill({ children, tone = 'neutral', tiny = false }) {
  const tones = {
    neutral: { bg: '#EFE8D6', fg: T.ink2, bd: T.rule2 },
    low: { bg: '#E2EBE3', fg: T.ok, bd: '#C8D8CB' },
    med: { bg: '#F5E6C9', fg: '#8A6418', bd: '#E5D2A7' },
    high: { bg: '#F2D9D1', fg: T.danger, bd: '#E8C2B6' },
    primary: { bg: '#D8E5E3', fg: T.primary, bd: '#B8CECB' },
    copper: { bg: '#F8E2D1', fg: T.copper, bd: '#EFCDB1' },
    gold: { bg: '#F2E5C5', fg: T.gold, bd: '#E0D0A0' },
  };
  const c = tones[tone] || tones.neutral;
  const sz = tiny ? 'px-1.5 py-[1px] text-[8.5px]' : 'px-2 py-[2px] text-[10px]';
  return (
    <span className={`inline-flex items-center gap-1 ${sz} uppercase tracking-[0.08em] border rounded-[2px]`}
      style={{ background: c.bg, color: c.fg, borderColor: c.bd, fontFamily: FONT_BODY, fontWeight: 500 }}>
      {children}
    </span>
  );
}

function StageBadge({ stage }) {
  const def = STAGE_DEFS.find(s => s.id === stage);
  if (!def) return null;
  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-[3px] text-[10px] uppercase tracking-[0.1em] rounded-[2px]"
      style={{ background: def.color + '20', color: def.color, border: `1px solid ${def.color}40`, fontFamily: FONT_BODY, fontWeight: 500 }}>
      <span className="rounded-full" style={{ width: 5, height: 5, background: def.color }}/>
      {def.label}
    </span>
  );
}

function PageHeader({ num, eyebrow, title, subtitle, action }) {
  return (
    <header className="px-12 pt-10 pb-6" style={{ borderBottom: `1px solid ${T.rule}`, background: T.bg }}>
      <div className="flex items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: T.copper, fontWeight: 500 }}>{num}</span>
            <span style={{ width: 24, height: 1, background: T.rule2 }}/>
            <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: T.muted }}>{eyebrow}</span>
          </div>
          <h1 className="mt-4" style={{ fontFamily: FONT_DISPLAY, fontSize: 44, lineHeight: 1.05, letterSpacing: '-0.025em', color: T.ink, fontStyle: 'italic' }}>
            {title}
          </h1>
          {subtitle && <p className="mt-3 max-w-[680px] text-[14px]" style={{ color: T.ink2, lineHeight: 1.55 }}>{subtitle}</p>}
        </div>
        {action}
      </div>
    </header>
  );
}

/* ============================================================
   01 STRATEGY
   ============================================================ */
function StrategyTab() {
  return (
    <>
      <PageHeader num="01" eyebrow="The strategy"
        title={<>Three ICPs.<br/>One state. <span style={{ color: T.copper }}>Win the wedge.</span></>}
        subtitle="Wyoming has 110+ small oil & gas operators, 280+ owner-op truckers, and 340+ construction GCs in the $2-30M revenue band. You don't need many. You need the right ones, won deliberately."/>

      <div className="px-12 py-8 max-w-[1200px]">
        {/* Goal card */}
        <div className="p-6 rounded-[3px] mb-8 relative overflow-hidden" style={{ background: T.primary, color: T.surface }}>
          <div aria-hidden style={{ position: 'absolute', right: -50, top: -50, width: 200, height: 200, border: `1px solid rgba(255,253,248,0.10)`, borderRadius: '50%' }}/>
          <div className="relative grid grid-cols-12 gap-6 items-center">
            <div className="col-span-7">
              <div className="text-[10px] uppercase tracking-[0.18em]" style={{ color: T.copperLt, fontWeight: 500 }}>The 12-month goal</div>
              <h2 className="mt-2" style={{ fontFamily: FONT_DISPLAY, fontSize: 32, fontStyle: 'italic', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                40 active clients. <span style={{ color: T.copperLt }}>$540k ARR.</span><br/>One full season under your belt.
              </h2>
              <p className="mt-3 max-w-[520px] text-[12.5px]" style={{ color: 'rgba(255,253,248,0.75)', lineHeight: 1.6 }}>
                Working backward: 40 clients ÷ 12 months = ~3.3 closes/mo. At a 28-34% close rate from qualified prospects, that's ~10 qualified/mo, which is ~50 cold touches/mo. Math is friendly. Execution wins.
              </p>
            </div>
            <div className="col-span-5">
              <div className="grid grid-cols-2 gap-px" style={{ background: 'rgba(255,253,248,0.12)', borderRadius: 3 }}>
                {[{ l: 'Cold touches/mo', v: '50' }, { l: 'Qualified/mo', v: '10' }, { l: 'Meetings/mo', v: '7' }, { l: 'Closes/mo', v: '3.3' }].map((s, i) => (
                  <div key={i} className="px-4 py-3" style={{ background: 'rgba(11,61,58,0.6)' }}>
                    <div className="text-[9px] uppercase tracking-[0.14em]" style={{ color: 'rgba(255,253,248,0.55)' }}>{s.l}</div>
                    <div className="mt-1" style={{ fontFamily: FONT_DISPLAY, fontSize: 26, fontStyle: 'italic', letterSpacing: '-0.02em', lineHeight: 1 }}>{s.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ICPs */}
        <div className="mb-3">
          <div className="text-[10px] uppercase tracking-[0.18em]" style={{ color: T.muted, fontWeight: 500 }}>Your three ICPs</div>
          <h2 className="mt-1" style={{ fontFamily: FONT_DISPLAY, fontSize: 28, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.01em', lineHeight: 1.15 }}>
            Who you go after — and why
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {ICPS.map(p => {
            const Icon = p.icon;
            return (
              <div key={p.id} className="rounded-[3px] overflow-hidden" style={{ background: T.surface, border: `1px solid ${T.rule}` }}>
                <div className="px-5 pt-5 pb-4" style={{ borderBottom: `1px solid ${T.rule}` }}>
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex items-center justify-center shrink-0" style={{ width: 44, height: 44, borderRadius: 4, background: p.color, color: T.surface }}>
                      <Icon size={20}/>
                    </div>
                    <div className="flex-1">
                      <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 22, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.01em', lineHeight: 1.1 }}>{p.name}</h3>
                      <div className="text-[10.5px] mt-1.5 italic" style={{ color: T.muted }}>e.g. {p.sample}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <div className="text-[9px] uppercase tracking-[0.12em]" style={{ color: T.muted }}>Avg fee</div>
                      <div className="mt-0.5" style={{ fontFamily: FONT_DISPLAY, fontSize: 18, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.01em', lineHeight: 1 }}>{fmt(p.avgFee)}</div>
                    </div>
                    <div>
                      <div className="text-[9px] uppercase tracking-[0.12em]" style={{ color: T.muted }}>Cycle</div>
                      <div className="mt-0.5 text-[12px]" style={{ color: T.ink, fontFamily: FONT_MONO, lineHeight: 1.1 }}>{p.cycleTime}</div>
                    </div>
                    <div>
                      <div className="text-[9px] uppercase tracking-[0.12em]" style={{ color: T.muted }}>Close</div>
                      <div className="mt-0.5" style={{ fontFamily: FONT_DISPLAY, fontSize: 18, color: T.ok, fontStyle: 'italic', letterSpacing: '-0.01em', lineHeight: 1 }}>{p.closeRate}</div>
                    </div>
                  </div>
                </div>
                <div className="px-5 py-4" style={{ borderBottom: `1px solid ${T.rule}` }}>
                  <div className="text-[9.5px] uppercase tracking-[0.14em] mb-2" style={{ color: T.muted, fontWeight: 500 }}>Pain points</div>
                  <ul className="flex flex-col gap-1.5">
                    {p.pain.map((x, i) => (
                      <li key={i} className="flex items-start gap-2 text-[11.5px]" style={{ color: T.ink2, lineHeight: 1.45 }}>
                        <span className="mt-1.5" style={{ width: 4, height: 4, borderRadius: '50%', background: p.color, flexShrink: 0 }}/>
                        {x}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="px-5 py-4" style={{ borderBottom: `1px solid ${T.rule}` }}>
                  <div className="text-[9.5px] uppercase tracking-[0.14em] mb-2" style={{ color: T.muted, fontWeight: 500 }}>Buying triggers</div>
                  <div className="flex flex-wrap gap-1">
                    {p.triggers.map((t, i) => (
                      <span key={i} className="text-[10px] px-2 py-[3px] rounded-[2px]" style={{ background: T.surface2, color: T.ink2, border: `1px solid ${T.rule}` }}>{t}</span>
                    ))}
                  </div>
                </div>
                <div className="px-5 py-4">
                  <div className="text-[9.5px] uppercase tracking-[0.14em] mb-2" style={{ color: T.muted, fontWeight: 500 }}>Where to find them</div>
                  <ul className="flex flex-col gap-1">
                    {p.where.map((w, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-[11px]" style={{ color: T.ink2, lineHeight: 1.4 }}>
                        <MapPin size={9} style={{ color: p.color, marginTop: 3, flexShrink: 0 }}/>
                        {w}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Positioning */}
        <div className="mt-12">
          <div className="text-[10px] uppercase tracking-[0.18em]" style={{ color: T.muted, fontWeight: 500 }}>Your positioning</div>
          <h2 className="mt-1 mb-5" style={{ fontFamily: FONT_DISPLAY, fontSize: 28, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.01em', lineHeight: 1.15 }}>
            What you say when someone asks
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { ctx: '30-second elevator', tone: 'copper', text: '"I\'m an EA — federally authorized to represent any taxpayer in the US — and I work primarily with Wyoming oil & gas operators, owner-op truckers, and small construction GCs. I save my average client $20-40k/year in federal tax just by knowing the specialty rules their generic CPA misses."' },
              { ctx: 'Why offshore? (the elephant)', tone: 'primary', text: '"I\'m based in India but I work US tax exclusively, with full federal authorization (Form 2848 in all 50 states). My clients use me because I\'m available 7am-7pm Mountain time, charge 30-40% less than equivalent US firms, and answer the phone same-day. I\'m more accessible than the local CPA, not less."' },
              { ctx: 'Vs. their existing CPA', tone: 'gold', text: '"Your current CPA isn\'t bad — they\'re generalist. They handle 1040s, S-Corps, contractors, restaurants, you name it. I do almost nothing but {{specialty}}. Specialty changes what gets caught. The math usually works out heavily in your favor even after my fee."' },
              { ctx: 'Vs. TurboTax / strip-mall preparer', tone: 'low', text: '"For your business size and complexity, the gap between $400 retail prep and $1,500-2,000/mo specialist work isn\'t the price — it\'s the $20-50k+ in tax you\'re overpaying because no one\'s actually planning, just preparing."' },
            ].map((s, i) => (
              <div key={i} className="p-5 rounded-[3px]" style={{ background: T.surface, border: `1px solid ${T.rule}` }}>
                <Pill tone={s.tone}>{s.ctx}</Pill>
                <p className="mt-3" style={{ color: T.ink, fontFamily: FONT_DISPLAY, fontSize: 15, fontStyle: 'italic', lineHeight: 1.5, letterSpacing: '-0.005em' }}>{s.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-[10px] uppercase tracking-[0.18em] py-8 text-center" style={{ color: T.faint }}>
          — End of strategy · proceed to prospects —
        </div>
      </div>
    </>
  );
}

/* ============================================================
   02 PROSPECTS
   ============================================================ */
function ProspectsTab() {
  const [filter, setFilter] = useState('all');
  const [stageFilter, setStageFilter] = useState('all');
  const visible = useMemo(() => PROSPECTS.filter(p => {
    if (filter !== 'all' && p.industry.toLowerCase() !== filter) return false;
    if (stageFilter !== 'all' && p.stage !== stageFilter) return false;
    return true;
  }), [filter, stageFilter]);

  return (
    <>
      <PageHeader num="02" eyebrow="Prospect database"
        title={<>The list.<br/>Live, ranked, <span style={{ color: T.copper }}>workable.</span></>}
        subtitle="Every Wyoming prospect with a name, contact, source, signals, and a single next step. The database is your weekly to-do list."
        action={<button className="px-3.5 py-2 text-[12px] flex items-center gap-1.5 rounded-[3px]" style={{ background: T.primary, color: T.surface, fontWeight: 500 }}><Plus size={13}/> Add prospect</button>}/>

      <div className="px-12 py-6 max-w-[1340px]">
        {/* Stage funnel */}
        <div className="grid grid-cols-7 gap-2 mb-6">
          {STAGE_DEFS.map(s => {
            const count = PROSPECTS.filter(p => p.stage === s.id).length;
            return (
              <button key={s.id} onClick={() => setStageFilter(stageFilter === s.id ? 'all' : s.id)}
                className="p-3 rounded-[3px] text-left"
                style={{ background: stageFilter === s.id ? T.surface2 : T.surface, border: `1px solid ${stageFilter === s.id ? s.color : T.rule}`, borderLeft: `3px solid ${s.color}` }}>
                <div className="text-[9.5px] uppercase tracking-[0.12em]" style={{ color: T.muted, fontWeight: 500 }}>{s.label}</div>
                <div className="mt-1" style={{ fontFamily: FONT_DISPLAY, fontSize: 24, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.02em', lineHeight: 1 }}>{count}</div>
                <div className="text-[10px] mt-1.5" style={{ color: T.muted, lineHeight: 1.3 }}>{s.desc}</div>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 mb-4 flex-wrap">
          {[['all', 'All industries'], ['oil & gas', 'Oil & Gas'], ['trucking', 'Trucking'], ['construction', 'Construction'], ['personal', 'Personal']].map(([k, v]) => (
            <button key={k} onClick={() => setFilter(k)} className="text-[11.5px] px-3 py-1.5 rounded-[3px]"
              style={{ background: filter === k ? T.primary : T.surface, color: filter === k ? T.surface : T.ink2, border: `1px solid ${T.rule}`, fontWeight: filter === k ? 500 : 400 }}>
              {v}
            </button>
          ))}
          <span className="ml-auto text-[11px]" style={{ color: T.muted }}>
            <span style={{ color: T.copper, fontWeight: 500 }}>{visible.length}</span> shown of {PROSPECTS.length}
          </span>
        </div>

        <div style={{ background: T.surface, border: `1px solid ${T.rule}`, borderRadius: 3 }}>
          <div className="grid grid-cols-12 px-4 py-2.5 text-[9.5px] uppercase tracking-[0.14em]"
            style={{ color: T.muted, borderBottom: `1px solid ${T.rule}`, background: T.surface2 }}>
            <div className="col-span-4">Prospect</div>
            <div className="col-span-2">Stage</div>
            <div className="col-span-2">Source</div>
            <div className="col-span-2">Signals</div>
            <div className="col-span-1 text-right">Fee</div>
            <div className="col-span-1 text-right">Action</div>
          </div>
          {visible.map(p => {
            const Icon = p.icon;
            return (
              <div key={p.id} className="grid grid-cols-12 px-4 py-3 items-center" style={{ borderBottom: `1px solid ${T.rule}` }}>
                <div className="col-span-4 flex items-center gap-2.5 min-w-0">
                  <div className="flex items-center justify-center shrink-0" style={{ width: 30, height: 30, background: T.surface2, border: `1px solid ${T.rule}`, borderRadius: 3 }}>
                    <Icon size={13} style={{ color: T.primary }}/>
                  </div>
                  <div className="min-w-0">
                    <div className="text-[12.5px] truncate" style={{ color: T.ink, fontWeight: 500 }}>{p.company}</div>
                    <div className="text-[10.5px]" style={{ color: T.muted }}>{p.contact} · {p.city}, {p.state}</div>
                  </div>
                </div>
                <div className="col-span-2"><StageBadge stage={p.stage}/></div>
                <div className="col-span-2 text-[11.5px]" style={{ color: T.ink2 }}>{p.source}</div>
                <div className="col-span-2 flex flex-wrap gap-1">
                  {p.signals.length === 0 ? <span className="text-[10px] italic" style={{ color: T.faint }}>—</span> :
                    p.signals.map((s, i) => (
                      <span key={i} className="text-[9.5px] px-1.5 py-[1px] rounded-[2px]" style={{ background: T.surface2, color: T.copper, border: `1px solid ${T.rule}` }}>{s}</span>
                    ))}
                </div>
                <div className="col-span-1 text-right text-[12px]" style={{ color: T.ink, fontFamily: FONT_MONO }}>{fmt(p.fee)}</div>
                <div className="col-span-1 text-right">
                  <button className="text-[10px] flex items-center gap-1 ml-auto px-2 py-1 rounded-[2px]" style={{ background: T.copper, color: T.surface, fontWeight: 500 }}>
                    <ArrowRight size={9}/> Do
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sources */}
        <div className="mt-10">
          <div className="text-[10px] uppercase tracking-[0.18em]" style={{ color: T.muted, fontWeight: 500 }}>Where leads come from</div>
          <h2 className="mt-1 mb-4" style={{ fontFamily: FONT_DISPLAY, fontSize: 26, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.01em' }}>Source attribution</h2>
          <div className="grid grid-cols-4 gap-3">
            {[{ l: 'Cold list', n: 8, c: 0.06, color: T.faint },
              { l: 'Referrals', n: 4, c: 0.62, color: T.ok },
              { l: 'Industry assoc.', n: 6, c: 0.18, color: T.copper },
              { l: 'LinkedIn', n: 5, c: 0.10, color: T.primary }].map((s, i) => (
              <div key={i} className="p-4 rounded-[3px]" style={{ background: T.surface, border: `1px solid ${T.rule}`, borderLeft: `3px solid ${s.color}` }}>
                <div className="text-[10px] uppercase tracking-[0.14em]" style={{ color: T.muted, fontWeight: 500 }}>{s.l}</div>
                <div className="flex items-baseline gap-3 mt-2">
                  <span style={{ fontFamily: FONT_DISPLAY, fontSize: 28, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.02em', lineHeight: 1 }}>{s.n}</span>
                  <span className="text-[10.5px]" style={{ color: T.muted }}>prospects</span>
                </div>
                <div className="mt-2 text-[10.5px]" style={{ color: s.color, fontFamily: FONT_MONO }}>Close rate · {Math.round(s.c * 100)}%</div>
              </div>
            ))}
          </div>
          <div className="mt-3 p-3 rounded-[3px] flex items-start gap-2.5" style={{ background: T.surface2, border: `1px dashed ${T.rule2}` }}>
            <Sparkles size={13} style={{ color: T.copper, marginTop: 2, flexShrink: 0 }}/>
            <div className="text-[11.5px]" style={{ color: T.ink2, lineHeight: 1.55 }}>
              <span style={{ color: T.ink, fontWeight: 500 }}>Insight:</span> referrals close at 10x the rate of cold lists. Every existing client should be asked for one referral every quarter — that's free pipeline.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ============================================================
   03 SEQUENCES
   ============================================================ */
function SequencesTab() {
  const [active, setActive] = useState(SEQUENCES[0].id);
  const seq = SEQUENCES.find(s => s.id === active);
  const Icon = seq.icon;

  return (
    <>
      <PageHeader num="03" eyebrow="Outreach sequences"
        title={<>The four sequences<br/>that <span style={{ color: T.copper }}>actually work.</span></>}
        subtitle="Tested copy. Tested cadence. Personalize the variables and send — every line earns its place."/>

      <div className="px-12 py-6 max-w-[1340px]">
        <div className="grid grid-cols-4 gap-3 mb-6">
          {SEQUENCES.map(s => {
            const SIcon = s.icon;
            const isActive = active === s.id;
            return (
              <button key={s.id} onClick={() => setActive(s.id)} className="p-4 rounded-[3px] text-left"
                style={{ background: T.surface, border: `${isActive ? 2 : 1}px solid ${isActive ? s.color : T.rule}`, borderLeft: `3px solid ${s.color}` }}>
                <div className="flex items-start gap-2.5">
                  <div className="flex items-center justify-center shrink-0" style={{ width: 32, height: 32, background: T.surface2, border: `1px solid ${T.rule}`, borderRadius: 4 }}>
                    <SIcon size={14} style={{ color: s.color }}/>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[12.5px]" style={{ color: T.ink, fontWeight: 500, lineHeight: 1.25 }}>{s.name}</div>
                    <div className="text-[10.5px] mt-1" style={{ color: T.muted }}>{s.audience}</div>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-3 text-[10px]" style={{ color: T.muted }}>
                  <span><span style={{ color: T.copper, fontFamily: FONT_MONO, fontWeight: 500 }}>{s.avgReply}</span> reply</span>
                  <span><span style={{ color: T.ok, fontFamily: FONT_MONO, fontWeight: 500 }}>{s.avgClose}</span> close</span>
                  <span style={{ marginLeft: 'auto', fontFamily: FONT_MONO }}>{s.duration}</span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex items-end justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Icon size={14} style={{ color: seq.color }}/>
              <span className="text-[10px] uppercase tracking-[0.18em]" style={{ color: seq.color, fontWeight: 500 }}>Sequence</span>
            </div>
            <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 30, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.015em', lineHeight: 1.1 }}>
              {seq.name}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button className="text-[11px] flex items-center gap-1.5 px-3 py-1.5 rounded-[3px]" style={{ background: T.surface, color: T.ink2, border: `1px solid ${T.rule}` }}>
              <Copy size={11}/> Duplicate
            </button>
            <button className="text-[11px] flex items-center gap-1.5 px-3 py-1.5 rounded-[3px]" style={{ background: T.primary, color: T.surface, fontWeight: 500 }}>
              <Send size={11}/> Enroll prospects
            </button>
          </div>
        </div>

        {/* Timeline */}
        <div className="flex items-center gap-1 mb-6">
          {seq.steps.map((step, i) => {
            const ChIcon = step.channel === 'email' ? Mail : step.channel === 'phone' ? Phone : step.channel === 'sms' ? MessageSquare : step.channel === 'linkedin' ? Globe : Flag;
            return (
              <React.Fragment key={i}>
                <div className="flex flex-col items-center" style={{ flex: '0 0 auto' }}>
                  <div className="rounded-full flex items-center justify-center"
                    style={{ width: 32, height: 32, background: step.channel === 'task' ? T.surface : seq.color, color: step.channel === 'task' ? seq.color : T.surface, border: step.channel === 'task' ? `2px solid ${seq.color}` : 'none' }}>
                    <ChIcon size={14}/>
                  </div>
                  <div className="text-[10px] mt-1.5" style={{ color: T.muted, fontFamily: FONT_MONO }}>Day {step.day}</div>
                </div>
                {i < seq.steps.length - 1 && (
                  <div className="flex-1 flex items-center" style={{ minWidth: 16 }}>
                    <div className="w-full" style={{ height: 1.5, background: T.rule2, marginBottom: 16 }}/>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-8 flex flex-col gap-3">
            {seq.steps.map((step, i) => {
              const ChIcon = step.channel === 'email' ? Mail : step.channel === 'phone' ? Phone : step.channel === 'sms' ? MessageSquare : step.channel === 'linkedin' ? Globe : Flag;
              return (
                <div key={i} className="rounded-[3px] overflow-hidden" style={{ background: T.surface, border: `1px solid ${T.rule}` }}>
                  <div className="px-5 py-3 flex items-center gap-3" style={{ borderBottom: `1px solid ${T.rule}`, background: T.surface2 }}>
                    <div className="flex items-center justify-center"
                      style={{ width: 28, height: 28, borderRadius: 4, background: step.channel === 'task' ? 'transparent' : seq.color, color: step.channel === 'task' ? seq.color : T.surface, border: step.channel === 'task' ? `1.5px solid ${seq.color}` : 'none' }}>
                      <ChIcon size={13}/>
                    </div>
                    <div className="flex-1">
                      <div className="text-[10px] uppercase tracking-[0.16em]" style={{ color: T.muted, fontWeight: 500 }}>
                        Step {i + 1} · Day {step.day} · {step.channel}
                      </div>
                      <div className="text-[13px]" style={{ color: T.ink, fontWeight: 500 }}>{step.subject}</div>
                    </div>
                    <button className="p-1.5 rounded-[3px]" style={{ border: `1px solid ${T.rule}` }}>
                      <Copy size={11} style={{ color: T.muted }}/>
                    </button>
                  </div>
                  <div className="px-5 py-4">
                    <pre style={{ whiteSpace: 'pre-wrap', fontFamily: FONT_BODY, fontSize: 13, color: T.ink2, lineHeight: 1.65, margin: 0 }}>{step.body}</pre>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="col-span-4 flex flex-col gap-4">
            <div className="p-4 rounded-[3px]" style={{ background: T.surface, border: `1px solid ${T.rule}` }}>
              <div className="text-[10px] uppercase tracking-[0.16em] mb-2.5" style={{ color: T.muted, fontWeight: 500 }}>Merge variables</div>
              <div className="flex flex-col gap-1.5">
                {[['{{first}}', 'First name'], ['{{company}}', 'Company name'], ['{{state}}', 'State (WY/MT/CO)'], ['{{industry}}', 'Industry · auto-tagged'], ['{{referrer}}', 'Referring client (warm only)'], ['{{tenure}}', 'Referrer tenure']].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between gap-2 text-[10.5px]">
                    <span style={{ fontFamily: FONT_MONO, color: T.copper }}>{k}</span>
                    <span style={{ color: T.muted, textAlign: 'right' }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-[3px]" style={{ background: T.surface, border: `1px dashed ${T.copper}` }}>
              <div className="text-[10px] uppercase tracking-[0.16em] mb-2.5 flex items-center gap-1.5" style={{ color: T.copper, fontWeight: 500 }}>
                <Lightbulb size={11}/> Common objections
              </div>
              <div className="flex flex-col gap-3">
                {[
                  { o: '"Why are you in India?"', a: 'Lead with US tax exclusivity, federal authorization, mountain-time hours, same-day responsiveness. Don\'t apologize.' },
                  { o: '"My CPA does fine."', a: 'Don\'t attack. "I\'m sure they do — would you mind if I just compared notes? No hard sell." Then find one specific gap in 20 minutes.' },
                  { o: '"I can\'t afford it."', a: 'Reframe: "What did you owe in federal tax last year? My fee is usually 5-8% of what I save you."' },
                  { o: '"Send me more info."', a: 'Stalling. "Happy to — but the actual value is in 20 minutes of looking at your specific numbers."' },
                ].map((x, i) => (
                  <div key={i} className="text-[11px]" style={{ color: T.ink2, lineHeight: 1.55 }}>
                    <div style={{ color: T.ink, fontWeight: 500, fontStyle: 'italic' }}>{x.o}</div>
                    <div className="mt-0.5" style={{ color: T.muted }}>→ {x.a}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ============================================================
   04 DISCOVERY
   ============================================================ */
function DiscoveryTab() {
  return (
    <>
      <PageHeader num="04" eyebrow="Discovery script"
        title={<>The 30-minute<br/>discovery <span style={{ color: T.copper }}>that closes.</span></>}
        subtitle="Five sections, ~25 questions. You don't ask all of them — you ask the ones the conversation invites. Goal: leave with their definition of value, their pain, and a booked next step."/>

      <div className="px-12 py-8 max-w-[1100px]">
        <div className="p-5 rounded-[3px] mb-8 flex items-start gap-3" style={{ background: T.primary, color: T.surface }}>
          <Headphones size={18} style={{ color: T.copperLt, flexShrink: 0, marginTop: 2 }}/>
          <div className="flex-1">
            <div className="text-[10px] uppercase tracking-[0.18em] mb-1" style={{ color: T.copperLt, fontWeight: 500 }}>The rule</div>
            <div className="text-[14px]" style={{ lineHeight: 1.55 }}>
              <span style={{ fontFamily: FONT_DISPLAY, fontStyle: 'italic', fontSize: 18 }}>Talk 30%, listen 70%.</span>{' '}
              The discovery isn't a presentation — it's a diagnosis. If you find yourself explaining what you do for more than 90 seconds at a time, you're losing.
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {DISCOVERY.map((sect, i) => (
            <div key={i} className="rounded-[3px] overflow-hidden" style={{ background: T.surface, border: `1px solid ${T.rule}` }}>
              <div className="px-6 py-4 flex items-baseline justify-between" style={{ borderBottom: `1px solid ${T.rule}`, background: T.surface2 }}>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span style={{ fontFamily: FONT_MONO, fontSize: 11, color: T.copper, fontWeight: 500, letterSpacing: '0.08em' }}>0{i + 1}</span>
                    <span style={{ width: 16, height: 1, background: T.rule2 }}/>
                    <span className="text-[10px] uppercase tracking-[0.16em]" style={{ color: T.muted, fontWeight: 500 }}>~5 min</span>
                  </div>
                  <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 22, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.01em', lineHeight: 1.1 }}>{sect.section}</h3>
                  <div className="text-[11.5px] mt-0.5 italic" style={{ color: T.muted }}>{sect.blurb}</div>
                </div>
                <span className="text-[10.5px]" style={{ color: T.muted, fontFamily: FONT_MONO }}>{sect.qs.length} questions</span>
              </div>
              <div className="px-6 py-2">
                {sect.qs.map((q, j) => (
                  <div key={j} className="flex items-start gap-4 py-3" style={{ borderBottom: j < sect.qs.length - 1 ? `1px dashed ${T.rule2}` : 'none' }}>
                    <span className="flex items-center justify-center shrink-0 mt-1"
                      style={{ width: 22, height: 22, borderRadius: '50%', background: T.surface2, border: `1px solid ${T.rule}`, color: T.copper, fontFamily: FONT_MONO, fontSize: 9.5, fontWeight: 600 }}>
                      Q{j + 1}
                    </span>
                    <div className="flex-1">
                      <div style={{ fontFamily: FONT_DISPLAY, fontSize: 17, fontStyle: 'italic', color: T.ink, lineHeight: 1.4, letterSpacing: '-0.005em' }}>{q.q}</div>
                      <div className="mt-1.5 text-[11.5px] flex items-start gap-1.5" style={{ color: T.muted }}>
                        <Lightbulb size={10} style={{ color: T.copper, marginTop: 2.5, flexShrink: 0 }}/>
                        <span style={{ lineHeight: 1.55 }}><span style={{ color: T.copper, fontWeight: 500 }}>Why ask:</span> {q.why}</span>
                      </div>
                    </div>
                    <button className="p-1.5 rounded-[3px]" style={{ border: `1px solid ${T.rule}` }}>
                      <Copy size={11} style={{ color: T.muted }}/>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-5 rounded-[3px]" style={{ background: T.surface2, border: `1px dashed ${T.rule2}` }}>
          <div className="text-[10px] uppercase tracking-[0.18em] mb-2 flex items-center gap-1.5" style={{ color: T.copper, fontWeight: 500 }}>
            <Award size={11}/> Closing the call
          </div>
          <div className="text-[13px]" style={{ color: T.ink2, lineHeight: 1.65 }}>
            End every discovery with: <span style={{ fontFamily: FONT_DISPLAY, fontStyle: 'italic', fontSize: 16, color: T.ink }}>"Based on what you've told me, I think I can save {{company}} between $X and $Y per year. I'd like to put together a specific proposal showing exactly how. Can we book 30 minutes next week to walk through it together?"</span>
            <br/><br/>
            Specific number. Specific time. Specific next step. If they say yes — you've earned the proposal slot. If they hesitate, ask why and address it now.
          </div>
        </div>
      </div>
    </>
  );
}

/* ============================================================
   05 ROI CALCULATOR — interactive
   ============================================================ */
function ROITab() {
  const [revenue, setRevenue] = useState(4500000);
  const [industry, setIndustry] = useState('oil-gas');
  const [currentFee, setCurrentFee] = useState(8000);
  const [hoursAdmin, setHoursAdmin] = useState(12);

  // Industry-specific savings calculations
  const savingsRates = {
    'oil-gas': { rate: 0.018, label: 'IDC + bonus depreciation + §263A', range: '1.5% - 2.5%' },
    'trucking': { rate: 0.011, label: 'Per-diem + fuel tax credits + §179', range: '0.8% - 1.4%' },
    'construction': { rate: 0.014, label: '§460 method + §199A + WIP', range: '1.0% - 1.8%' },
    'professional': { rate: 0.008, label: 'Entity selection + §199A + retirement', range: '0.5% - 1.2%' },
  };

  const industryData = savingsRates[industry];
  const taxSavings = Math.round(revenue * industryData.rate);
  const myFee = Math.round((industry === 'oil-gas' ? 22000 : industry === 'trucking' ? 8400 : industry === 'construction' ? 18500 : 12000));
  const feeDelta = myFee - currentFee;
  const netGain = taxSavings - feeDelta;
  const hoursReturned = Math.round(hoursAdmin * 0.7);
  const roi = Math.round((netGain / myFee) * 100);

  return (
    <>
      <PageHeader num="05" eyebrow="ROI calculator"
        title={<>The math,<br/><span style={{ color: T.copper }}>plain.</span></>}
        subtitle="Plug in their revenue and industry, and the tool spits out specific savings, your fee delta, hours returned, and net gain. Every prospect gets a printable version with their proposal."/>

      <div className="px-12 py-8 max-w-[1200px]">
        <div className="grid grid-cols-12 gap-5">
          {/* Inputs */}
          <div className="col-span-5">
            <div className="p-6 rounded-[3px]" style={{ background: T.surface, border: `1px solid ${T.rule}` }}>
              <div className="text-[10px] uppercase tracking-[0.18em] mb-4" style={{ color: T.muted, fontWeight: 500 }}>Inputs · prospect details</div>

              <div className="flex flex-col gap-5">
                <div>
                  <div className="flex items-baseline justify-between mb-2">
                    <label className="text-[10.5px] uppercase tracking-[0.14em]" style={{ color: T.muted, fontWeight: 500 }}>Annual revenue</label>
                    <span style={{ fontFamily: FONT_DISPLAY, fontSize: 22, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.01em', lineHeight: 1 }}>{fmt(revenue)}</span>
                  </div>
                  <input type="range" min={500000} max={30000000} step={100000} value={revenue} onChange={(e) => setRevenue(Number(e.target.value))} className="w-full"
                    style={{ accentColor: T.copper }}/>
                  <div className="flex justify-between mt-1 text-[9.5px]" style={{ color: T.faint, fontFamily: FONT_MONO }}>
                    <span>$500k</span><span>$30M</span>
                  </div>
                </div>

                <div>
                  <label className="text-[10.5px] uppercase tracking-[0.14em] block mb-2" style={{ color: T.muted, fontWeight: 500 }}>Industry</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'oil-gas', label: 'Oil & Gas', icon: Factory },
                      { id: 'trucking', label: 'Trucking', icon: Truck },
                      { id: 'construction', label: 'Construction', icon: HardHat },
                      { id: 'professional', label: 'Professional', icon: Briefcase },
                    ].map(opt => {
                      const Icon = opt.icon;
                      const isActive = industry === opt.id;
                      return (
                        <button key={opt.id} onClick={() => setIndustry(opt.id)} className="flex items-center gap-2 px-3 py-2 rounded-[3px] text-left"
                          style={{ background: isActive ? T.surface2 : T.surface, border: `${isActive ? 2 : 1}px solid ${isActive ? T.copper : T.rule}` }}>
                          <Icon size={13} style={{ color: isActive ? T.copper : T.muted }}/>
                          <span className="text-[12px]" style={{ color: T.ink, fontWeight: isActive ? 500 : 400 }}>{opt.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <div className="flex items-baseline justify-between mb-2">
                    <label className="text-[10.5px] uppercase tracking-[0.14em]" style={{ color: T.muted, fontWeight: 500 }}>Current annual tax fee</label>
                    <span style={{ fontFamily: FONT_DISPLAY, fontSize: 22, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.01em', lineHeight: 1 }}>{fmt(currentFee)}</span>
                  </div>
                  <input type="range" min={500} max={30000} step={500} value={currentFee} onChange={(e) => setCurrentFee(Number(e.target.value))} className="w-full"
                    style={{ accentColor: T.copper }}/>
                </div>

                <div>
                  <div className="flex items-baseline justify-between mb-2">
                    <label className="text-[10.5px] uppercase tracking-[0.14em]" style={{ color: T.muted, fontWeight: 500 }}>Hours/mo on tax admin</label>
                    <span style={{ fontFamily: FONT_DISPLAY, fontSize: 22, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.01em', lineHeight: 1 }}>{hoursAdmin}h</span>
                  </div>
                  <input type="range" min={2} max={40} step={1} value={hoursAdmin} onChange={(e) => setHoursAdmin(Number(e.target.value))} className="w-full"
                    style={{ accentColor: T.copper }}/>
                </div>
              </div>

              <div className="mt-5 pt-4 flex items-start gap-2.5 text-[11px]" style={{ color: T.muted, lineHeight: 1.55, borderTop: `1px solid ${T.rule}` }}>
                <Brain size={12} style={{ color: T.copper, marginTop: 2, flexShrink: 0 }}/>
                <span><span style={{ color: T.ink, fontWeight: 500 }}>Calculation method:</span> {industryData.range} of revenue, based on {industryData.label}. Conservative — actual savings often higher for well-positioned operators.</span>
              </div>
            </div>
          </div>

          {/* Output */}
          <div className="col-span-7">
            <div className="p-7 rounded-[3px] mb-3 relative overflow-hidden" style={{ background: T.primary, color: T.surface }}>
              <div aria-hidden style={{ position: 'absolute', right: -50, top: -50, width: 200, height: 200, border: `1px solid rgba(255,253,248,0.10)`, borderRadius: '50%' }}/>
              <div className="relative">
                <div className="text-[10px] uppercase tracking-[0.18em]" style={{ color: T.copperLt, fontWeight: 500 }}>Net gain · year 1</div>
                <div className="flex items-baseline gap-3 mt-2">
                  <span style={{ fontFamily: FONT_DISPLAY, fontSize: 72, fontStyle: 'italic', letterSpacing: '-0.025em', lineHeight: 1, color: T.copperLt }}>
                    {fmt(netGain)}
                  </span>
                  <span className="text-[14px]" style={{ color: 'rgba(255,253,248,0.75)' }}>net gain</span>
                </div>
                <div className="mt-2 text-[12.5px]" style={{ color: 'rgba(255,253,248,0.75)' }}>
                  {fmt(taxSavings)} tax saved · minus {fmt(feeDelta)} fee delta · plus {hoursReturned}h/mo of your time back
                </div>
                <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-[3px]" style={{ background: T.copper, color: T.surface, fontSize: 12, fontWeight: 500 }}>
                  <TrendingUp size={12}/> {roi}% ROI on the fee
                </div>
              </div>
            </div>

            {/* Breakdown */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              {[
                { l: 'Annual tax savings', v: fmt(taxSavings), d: industryData.label, c: T.ok, i: ArrowDownRight },
                { l: 'Fee delta', v: fmt(feeDelta), d: `My fee ${fmt(myFee)} vs current ${fmt(currentFee)}`, c: feeDelta > 0 ? T.warn : T.ok, i: ArrowUpRight },
                { l: 'Hours returned', v: `${hoursReturned}h/mo`, d: `${hoursReturned * 12}h/year for higher-value work`, c: T.copper, i: Clock },
                { l: 'Time-to-payback', v: `${Math.max(1, Math.round((feeDelta / taxSavings) * 12))} months`, d: 'Fee differential recovered', c: T.primary2, i: Award },
              ].map((s, i) => {
                const Icon = s.i;
                return (
                  <div key={i} className="p-4 rounded-[3px] flex items-start gap-3" style={{ background: T.surface, border: `1px solid ${T.rule}`, borderLeft: `3px solid ${s.c}` }}>
                    <Icon size={14} style={{ color: s.c, marginTop: 4 }}/>
                    <div className="flex-1">
                      <div className="text-[10px] uppercase tracking-[0.14em]" style={{ color: T.muted, fontWeight: 500 }}>{s.l}</div>
                      <div className="mt-1" style={{ fontFamily: FONT_DISPLAY, fontSize: 24, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.02em', lineHeight: 1 }}>{s.v}</div>
                      <div className="text-[10.5px] mt-1" style={{ color: T.muted, lineHeight: 1.4 }}>{s.d}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-5 rounded-[3px]" style={{ background: T.surface, border: `1px solid ${T.rule}` }}>
              <div className="text-[10px] uppercase tracking-[0.18em] mb-3" style={{ color: T.muted, fontWeight: 500 }}>5-year cumulative impact</div>
              <svg viewBox="0 0 600 130" width="100%" style={{ display: 'block' }}>
                {[1, 2, 3, 4, 5].map(yr => {
                  const cumulative = netGain * yr;
                  const max = netGain * 5;
                  const h = (cumulative / max) * 90;
                  const x = 30 + (yr - 1) * 110;
                  return (
                    <g key={yr}>
                      <rect x={x} y={110 - h} width={70} height={h} fill={T.copper} opacity={0.85} rx={2}/>
                      <text x={x + 35} y={110 - h - 6} textAnchor="middle" fontSize={11} fill={T.ink} fontFamily={FONT_MONO} fontWeight={600}>
                        {fmt(cumulative)}
                      </text>
                      <text x={x + 35} y={124} textAnchor="middle" fontSize={9.5} fill={T.muted} fontFamily={FONT_BODY}>Year {yr}</text>
                    </g>
                  );
                })}
              </svg>
              <div className="mt-3 text-[12px] text-center" style={{ color: T.ink2, fontStyle: 'italic', fontFamily: FONT_DISPLAY, fontSize: 16 }}>
                Total 5-year net gain: <span style={{ color: T.copper, fontWeight: 500 }}>{fmt(netGain * 5)}</span>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <button className="flex-1 text-[12px] py-2.5 rounded-[3px] flex items-center justify-center gap-1.5" style={{ background: T.copper, color: T.surface, fontWeight: 500 }}>
                <Download size={12}/> Generate proposal with these numbers
              </button>
              <button className="text-[12px] py-2.5 px-4 rounded-[3px]" style={{ background: T.surface, color: T.ink2, border: `1px solid ${T.rule}` }}>
                <Copy size={12}/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ============================================================
   06 PROPOSAL
   ============================================================ */
function ProposalTab() {
  return (
    <>
      <PageHeader num="06" eyebrow="Proposal template"
        title={<>The proposal<br/>that <span style={{ color: T.copper }}>signs itself.</span></>}
        subtitle="Two-page proposal. Their pain · the math · the scope · the fee. Every section earns its place. Sent as a PDF inside an email; e-signed in their portal."/>

      <div className="px-12 py-8 max-w-[1100px]">
        <div className="flex items-center gap-2 mb-5">
          <button className="text-[11.5px] flex items-center gap-1.5 px-3 py-1.5 rounded-[3px]" style={{ background: T.surface, color: T.ink2, border: `1px solid ${T.rule}` }}>
            <Edit3 size={11}/> Edit template
          </button>
          <button className="text-[11.5px] flex items-center gap-1.5 px-3 py-1.5 rounded-[3px]" style={{ background: T.surface, color: T.ink2, border: `1px solid ${T.rule}` }}>
            <Copy size={11}/> Duplicate
          </button>
          <div className="flex-1"/>
          <button className="text-[11.5px] flex items-center gap-1.5 px-3 py-1.5 rounded-[3px]" style={{ background: T.primary, color: T.surface, fontWeight: 500 }}>
            <Send size={11}/> Send to Sage Creek Drilling
          </button>
        </div>

        {/* Proposal preview - styled as the actual document */}
        <div className="rounded-[3px] overflow-hidden" style={{ background: T.surface, border: `1px solid ${T.rule}`, boxShadow: '0 30px 60px -30px rgba(20,15,8,0.18)' }}>
          {/* Letterhead */}
          <div className="px-12 pt-10 pb-6" style={{ borderTop: `4px solid ${T.copper}`, borderBottom: `1px solid ${T.rule}` }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center" style={{ width: 36, height: 36, borderRadius: 4, background: T.copper, color: T.surface, fontFamily: FONT_DISPLAY, fontSize: 26, fontStyle: 'italic', lineHeight: 1, paddingBottom: 4 }}>H</div>
                <div>
                  <div style={{ fontFamily: FONT_DISPLAY, fontSize: 22, color: T.ink, lineHeight: 1, letterSpacing: '-0.01em' }}>HYK Tax<span style={{ color: T.copper }}>.</span></div>
                  <div className="text-[10px] uppercase tracking-[0.16em] mt-1" style={{ color: T.muted }}>Suresh Patel, EA · Federal authorization</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] uppercase tracking-[0.18em]" style={{ color: T.copper, fontWeight: 500 }}>Engagement proposal</div>
                <div className="text-[11px] mt-1" style={{ color: T.muted, fontFamily: FONT_MONO }}>HYK-2026-0078</div>
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="px-12 pt-10 pb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: T.copper, fontWeight: 500 }}>Prepared for</span>
              <span style={{ width: 24, height: 1, background: T.rule2 }}/>
              <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: T.muted }}>May 5, 2026</span>
            </div>
            <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: 56, lineHeight: 1.0, letterSpacing: '-0.025em', color: T.ink, fontStyle: 'italic' }}>
              Sage Creek Drilling, LLC<br/>
              <span style={{ color: T.copper }}>Tax engagement · 2026.</span>
            </h1>
            <p className="mt-5 max-w-[620px] text-[14px]" style={{ color: T.ink2, lineHeight: 1.6 }}>
              Ray, thank you for the conversation last Thursday. Below is what I'd recommend for Sage Creek's 2026 tax year — the scope, the projected savings, and what it costs.
            </p>
          </div>

          {/* The math */}
          <div className="mx-12 mb-8 p-6 rounded-[3px] relative overflow-hidden" style={{ background: T.primary, color: T.surface }}>
            <div aria-hidden style={{ position: 'absolute', right: -40, top: -40, width: 160, height: 160, border: `1px solid rgba(255,253,248,0.10)`, borderRadius: '50%' }}/>
            <div className="relative">
              <div className="text-[10px] uppercase tracking-[0.18em]" style={{ color: T.copperLt, fontWeight: 500 }}>The math · Year 1</div>
              <div className="grid grid-cols-3 gap-6 mt-4">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.14em]" style={{ color: 'rgba(255,253,248,0.6)' }}>Current federal liability</div>
                  <div className="mt-1" style={{ fontFamily: FONT_DISPLAY, fontSize: 32, fontStyle: 'italic', letterSpacing: '-0.02em', lineHeight: 1 }}>$84,000</div>
                  <div className="text-[10.5px] mt-1" style={{ color: 'rgba(255,253,248,0.5)' }}>at depletion-only</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.14em]" style={{ color: 'rgba(255,253,248,0.6)' }}>Projected liability</div>
                  <div className="mt-1" style={{ fontFamily: FONT_DISPLAY, fontSize: 32, fontStyle: 'italic', letterSpacing: '-0.02em', lineHeight: 1, color: T.copperLt }}>$52,000</div>
                  <div className="text-[10.5px] mt-1" style={{ color: 'rgba(255,253,248,0.5)' }}>w/ IDC + bonus + §263A</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.14em]" style={{ color: 'rgba(255,253,248,0.6)' }}>Annual savings</div>
                  <div className="mt-1" style={{ fontFamily: FONT_DISPLAY, fontSize: 32, fontStyle: 'italic', letterSpacing: '-0.02em', lineHeight: 1, color: T.copperLt }}>$32,000</div>
                  <div className="text-[10.5px] mt-1" style={{ color: 'rgba(255,253,248,0.5)' }}>+ 11h/mo time saved</div>
                </div>
              </div>
            </div>
          </div>

          {/* Scope */}
          <div className="px-12 pb-8">
            <div className="text-[10px] uppercase tracking-[0.18em] mb-3" style={{ color: T.muted, fontWeight: 500 }}>Scope of engagement</div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { t: 'Form 1065 · Partnership return + K-1s', d: 'Federal & WY state filings · annual' },
                { t: 'Quarterly tax planning sessions', d: 'Forward-looking · scenario modeling' },
                { t: 'Payroll · Forms 941 · W-2s · 1099s', d: 'All filings, deposits, year-end reconciliation' },
                { t: 'IRS representation', d: 'Form 2848 authorization · notices, audits, appeals' },
                { t: 'Bookkeeping oversight', d: 'Monthly review · QBO reconciliation · close' },
                { t: 'Year-end planning memo', d: 'November session · December close-out' },
              ].map((s, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-[3px]" style={{ background: T.surface2, border: `1px solid ${T.rule}` }}>
                  <CheckCircle2 size={14} style={{ color: T.ok, marginTop: 1, flexShrink: 0 }} strokeWidth={2.5}/>
                  <div>
                    <div className="text-[12.5px]" style={{ color: T.ink, fontWeight: 500 }}>{s.t}</div>
                    <div className="text-[11px] mt-0.5" style={{ color: T.muted, lineHeight: 1.5 }}>{s.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fee */}
          <div className="mx-12 mb-8 p-6 rounded-[3px]" style={{ background: T.surface2, border: `1px solid ${T.copper}`, borderLeft: `3px solid ${T.copper}` }}>
            <div className="grid grid-cols-12 gap-6 items-center">
              <div className="col-span-7">
                <div className="text-[10px] uppercase tracking-[0.18em]" style={{ color: T.copper, fontWeight: 500 }}>Investment</div>
                <h3 className="mt-1" style={{ fontFamily: FONT_DISPLAY, fontSize: 28, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                  $1,850/mo · $22,200/year
                </h3>
                <p className="mt-2 text-[12px]" style={{ color: T.ink2, lineHeight: 1.6 }}>
                  All-inclusive · no hourly billing surprises · no per-signature fees · cancel anytime with 30 days notice.
                </p>
              </div>
              <div className="col-span-5">
                <div className="p-4 rounded-[3px]" style={{ background: T.surface, border: `1px solid ${T.rule}` }}>
                  <div className="text-[9.5px] uppercase tracking-[0.14em] mb-2" style={{ color: T.muted, fontWeight: 500 }}>Net to you · year 1</div>
                  <div style={{ fontFamily: FONT_DISPLAY, fontSize: 36, color: T.ok, fontStyle: 'italic', letterSpacing: '-0.025em', lineHeight: 1 }}>$9,800</div>
                  <div className="text-[11px] mt-1" style={{ color: T.muted, lineHeight: 1.5 }}>$32k tax saved − $22.2k fee = $9,800 net + 132h/yr returned</div>
                </div>
              </div>
            </div>
          </div>

          {/* Sign */}
          <div className="px-12 pb-10">
            <div className="text-[10px] uppercase tracking-[0.18em] mb-3" style={{ color: T.muted, fontWeight: 500 }}>Next step</div>
            <div className="p-5 rounded-[3px] flex items-center gap-4" style={{ background: T.primary, color: T.surface }}>
              <FileSignature size={24} style={{ color: T.copperLt, flexShrink: 0 }}/>
              <div className="flex-1">
                <div className="text-[14px]" style={{ fontWeight: 500 }}>Sign electronically · 90 seconds</div>
                <div className="text-[11.5px] mt-0.5" style={{ color: 'rgba(255,253,248,0.7)' }}>I'll have us onboarded within 48 hours · first quarterly planning session within 2 weeks.</div>
              </div>
              <button className="px-4 py-2.5 text-[12.5px] rounded-[3px] flex items-center gap-1.5" style={{ background: T.copper, color: T.surface, fontWeight: 500 }}>
                Review & sign <ArrowRight size={13}/>
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="px-12 py-5 flex items-center justify-between" style={{ background: T.surface2, borderTop: `1px solid ${T.rule}` }}>
            <div className="text-[10.5px]" style={{ color: T.muted, fontFamily: FONT_BODY }}>
              <span style={{ color: T.ink, fontWeight: 500 }}>Suresh Patel, EA</span> · suresh@hyktax.co · (307) 555-0142
            </div>
            <div className="flex items-center gap-3 text-[9.5px]" style={{ color: T.muted }}>
              <span className="flex items-center gap-1"><Lock size={9}/> Confidential</span>
              <span>·</span>
              <span>IRC §7216 protected</span>
              <span>·</span>
              <span>Valid 30 days</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ============================================================
   07 PIPELINE
   ============================================================ */
function PipelineTab() {
  const stages = STAGE_DEFS.slice(0, 6);
  const grouped = stages.map(s => ({ ...s, prospects: PROSPECTS.filter(p => p.stage === s.id) }));
  const totalValue = PROSPECTS.filter(p => !['won', 'lost'].includes(p.stage)).reduce((sum, p) => sum + p.fee, 0);
  const wonValue = PROSPECTS.filter(p => p.stage === 'won').reduce((sum, p) => sum + p.fee, 0);

  return (
    <>
      <PageHeader num="07" eyebrow="Pipeline · live"
        title={<>The whole pipeline,<br/><span style={{ color: T.copper }}>one view.</span></>}
        subtitle="Drag prospects across stages. Track value at each stage. Spot the bottleneck before it costs you a month of pipeline."/>

      <div className="px-12 py-6">
        {/* KPI strip */}
        <div className="grid grid-cols-5 gap-3 mb-6">
          {[
            { l: 'Pipeline value', v: fmt(totalValue), d: 'across all open stages', c: T.copper, i: TrendingUp },
            { l: 'Closed this year', v: fmt(wonValue), d: '2 clients onboarded', c: T.ok, i: Award },
            { l: 'Avg deal size', v: '$13.2k', d: 'across won deals', c: T.primary, i: DollarSign },
            { l: 'Avg cycle time', v: '34 days', d: 'cold to close', c: T.gold, i: Clock },
            { l: 'Conversion rate', v: '11%', d: 'cold → won', c: T.primary2, i: Target },
          ].map((k, i) => {
            const Icon = k.i;
            return (
              <div key={i} className="p-4 rounded-[3px] flex items-start gap-3" style={{ background: T.surface, border: `1px solid ${T.rule}`, borderLeft: `3px solid ${k.c}` }}>
                <div className="flex items-center justify-center shrink-0" style={{ width: 32, height: 32, background: T.surface2, border: `1px solid ${T.rule}`, borderRadius: 4 }}>
                  <Icon size={14} style={{ color: k.c }}/>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[9.5px] uppercase tracking-[0.14em]" style={{ color: T.muted, fontWeight: 500 }}>{k.l}</div>
                  <div style={{ fontFamily: FONT_DISPLAY, fontSize: 22, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.02em', lineHeight: 1, marginTop: 2 }}>{k.v}</div>
                  <div className="text-[10px] mt-1.5" style={{ color: T.muted }}>{k.d}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stage funnel summary */}
        <div className="mb-6 p-5 rounded-[3px]" style={{ background: T.surface, border: `1px solid ${T.rule}` }}>
          <div className="flex items-end justify-between mb-4">
            <div>
              <div className="text-[10px] uppercase tracking-[0.18em]" style={{ color: T.muted, fontWeight: 500 }}>Stage flow</div>
              <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 22, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.01em', lineHeight: 1.1 }}>
                Where the deals are
              </h3>
            </div>
            <span className="text-[10.5px]" style={{ color: T.muted, fontFamily: FONT_MONO }}>{PROSPECTS.length} total prospects</span>
          </div>
          <div className="flex items-stretch gap-2">
            {grouped.map((g, i) => {
              const stageValue = g.prospects.reduce((sum, p) => sum + p.fee, 0);
              return (
                <React.Fragment key={g.id}>
                  <div className="flex-1 p-3 rounded-[3px]" style={{ background: T.surface2, border: `1px solid ${T.rule}`, borderTop: `3px solid ${g.color}` }}>
                    <div className="text-[9.5px] uppercase tracking-[0.12em]" style={{ color: T.muted, fontWeight: 500 }}>{g.label}</div>
                    <div className="flex items-baseline gap-1.5 mt-1">
                      <span style={{ fontFamily: FONT_DISPLAY, fontSize: 22, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.02em', lineHeight: 1 }}>{g.prospects.length}</span>
                    </div>
                    <div className="text-[10px] mt-1" style={{ color: T.muted, fontFamily: FONT_MONO }}>{stageValue > 0 ? fmt(stageValue) : '—'}</div>
                  </div>
                  {i < grouped.length - 1 && <ChevronRight size={11} style={{ color: T.faint, alignSelf: 'center' }}/>}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Kanban board */}
        <div className="flex gap-2 overflow-x-auto pb-3" style={{ scrollbarWidth: 'thin' }}>
          {grouped.map(g => (
            <div key={g.id} className="flex flex-col" style={{ minWidth: 240, flex: 1 }}>
              <div className="px-3 py-2.5 flex items-center justify-between rounded-t-[3px]" style={{ background: T.surface, border: `1px solid ${T.rule}`, borderTop: `3px solid ${g.color}` }}>
                <div className="flex items-center gap-1.5">
                  <span className="rounded-full" style={{ width: 6, height: 6, background: g.color }}/>
                  <span className="text-[10px] uppercase tracking-[0.14em]" style={{ color: T.ink2, fontWeight: 500 }}>{g.label}</span>
                </div>
                <span className="text-[10.5px]" style={{ color: T.muted, fontFamily: FONT_MONO }}>{g.prospects.length}</span>
              </div>
              <div className="flex flex-col gap-1.5 p-1.5 flex-1"
                style={{ background: T.surface3, borderLeft: `1px solid ${T.rule}`, borderRight: `1px solid ${T.rule}`, borderBottom: `1px solid ${T.rule}`, borderBottomLeftRadius: 3, borderBottomRightRadius: 3, minHeight: 280 }}>
                {g.prospects.map(p => {
                  const Icon = p.icon;
                  return (
                    <div key={p.id} className="p-2.5 rounded-[3px]" style={{ background: T.surface, border: `1px solid ${T.rule}`, borderLeft: `3px solid ${g.color}`, cursor: 'grab' }}>
                      <div className="flex items-start gap-2">
                        <div className="flex items-center justify-center shrink-0" style={{ width: 22, height: 22, background: T.surface2, border: `1px solid ${T.rule}`, borderRadius: 3 }}>
                          <Icon size={10} style={{ color: T.primary }}/>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[11.5px] truncate" style={{ color: T.ink, fontWeight: 500, lineHeight: 1.25 }}>{p.company}</div>
                          <div className="text-[9.5px]" style={{ color: T.muted }}>{p.contact}</div>
                        </div>
                      </div>
                      <div className="mt-2 pt-2 flex items-center justify-between" style={{ borderTop: `1px dashed ${T.rule2}` }}>
                        <span className="text-[9.5px]" style={{ color: T.muted }}>{p.lastTouch}</span>
                        <span className="text-[10px]" style={{ color: T.copper, fontFamily: FONT_MONO }}>{fmt(p.fee)}</span>
                      </div>
                      <div className="mt-2 text-[9.5px] italic" style={{ color: T.ink2, lineHeight: 1.4 }}>
                        Next: {p.nextStep}
                      </div>
                    </div>
                  );
                })}
                {g.prospects.length === 0 && (
                  <div className="text-[10.5px] italic text-center py-6" style={{ color: T.faint }}>nothing in {g.label.toLowerCase()}</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottleneck insight */}
        <div className="mt-6 p-4 rounded-[3px] flex items-start gap-3" style={{ background: T.surface2, border: `1px dashed ${T.copper}` }}>
          <Sparkles size={14} style={{ color: T.copper, marginTop: 2, flexShrink: 0 }}/>
          <div className="flex-1">
            <div className="text-[10px] uppercase tracking-[0.16em] mb-1" style={{ color: T.copper, fontWeight: 500 }}>AI insight · this week</div>
            <div className="text-[12.5px]" style={{ color: T.ink2, lineHeight: 1.6 }}>
              <span style={{ color: T.ink, fontWeight: 500 }}>Your bottleneck is the meeting → proposal jump.</span> You have 2 prospects in "meeting" stage that have been there 8+ days. The longer a discovery sits without a proposal, the colder it gets. Send proposals to <span style={{ color: T.copper, fontWeight: 500 }}>Rocky Mtn Hauling</span> and <span style={{ color: T.copper, fontWeight: 500 }}>Powder River Steel</span> by end of week.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ============================================================
   SHELL
   ============================================================ */
function Shell({ active, setActive, children }) {
  return (
    <div className="flex h-screen overflow-hidden" style={{ background: T.bg, fontFamily: FONT_BODY }}>
      <aside className="flex flex-col" style={{ width: 268, background: T.surface, borderRight: `1px solid ${T.rule}` }}>
        <div className="px-5 pt-6 pb-5" style={{ borderBottom: `1px solid ${T.rule}` }}>
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center"
              style={{ width: 30, height: 30, borderRadius: 4, background: T.copper, color: T.surface, fontFamily: FONT_DISPLAY, fontSize: 22, fontStyle: 'italic', lineHeight: 1, paddingBottom: 4 }}>H</div>
            <div className="flex flex-col">
              <span style={{ fontFamily: FONT_DISPLAY, fontSize: 19, color: T.ink, lineHeight: 1, letterSpacing: '-0.01em' }}>HYK Tax<span style={{ color: T.copper }}>.</span></span>
              <span className="text-[9px] uppercase tracking-[0.16em]" style={{ color: T.muted, marginTop: 1 }}>Outreach Playbook</span>
            </div>
          </div>
          <div className="mt-5 text-[10.5px]" style={{ color: T.muted, lineHeight: 1.5 }}>
            Your sales motion. Wyoming-first.<br/>Built to convert <span style={{ color: T.copper, fontWeight: 500 }}>3-5 clients/mo</span>.
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <div className="text-[9.5px] uppercase tracking-[0.16em] px-2 pb-2" style={{ color: T.faint }}>The motion</div>
          {TABS.map(t => {
            const Icon = t.icon;
            const isActive = active === t.id;
            return (
              <button key={t.id} onClick={() => setActive(t.id)}
                className="w-full flex items-center gap-2.5 px-2 py-[7px] mb-[2px] text-[13px] text-left rounded-[3px]"
                style={{ background: isActive ? T.surface2 : 'transparent', color: isActive ? T.ink : T.ink2, borderLeft: `2px solid ${isActive ? T.copper : 'transparent'}`, paddingLeft: 8, fontWeight: isActive ? 500 : 400 }}>
                <span style={{ fontFamily: FONT_MONO, fontSize: 9, color: isActive ? T.copper : T.faint, letterSpacing: '0.06em', minWidth: 18 }}>{t.num}</span>
                <Icon size={14} strokeWidth={1.6} style={{ color: isActive ? T.primary : T.muted }}/>
                <span className="flex-1">{t.label}</span>
                {t.badge && (
                  <span className="text-[9.5px] px-1.5 rounded-full" style={{ background: T.copper, color: T.surface, fontFamily: FONT_MONO }}>{t.badge}</span>
                )}
              </button>
            );
          })}

          <div className="text-[9.5px] uppercase tracking-[0.16em] px-2 pt-5 pb-2" style={{ color: T.faint }}>This week's targets</div>
          {[
            { l: 'Outbound', a: 14, t: 20, c: T.copper },
            { l: 'Discovery calls', a: 3, t: 5, c: T.ok },
            { l: 'Proposals', a: 2, t: 3, c: T.gold },
            { l: 'Closes', a: 1, t: 1, c: T.copperLt, dark: true },
          ].map((s, i) => (
            <div key={i} className="px-2 py-2 rounded-[3px] mt-1.5" style={{ background: s.dark ? T.primary : T.surface2, color: s.dark ? T.surface : T.ink }}>
              <div className="flex items-baseline justify-between mb-1">
                <span className="text-[10.5px] uppercase tracking-[0.14em]" style={{ color: s.dark ? T.copperLt : T.muted, fontWeight: 500 }}>{s.l}</span>
                <span className="text-[10px]" style={{ color: s.c, fontFamily: FONT_MONO }}>{s.a} / {s.t}</span>
              </div>
              <div className="h-[3px] rounded-full" style={{ background: s.dark ? 'rgba(255,253,248,0.15)' : T.rule }}>
                <div style={{ height: '100%', width: `${(s.a / s.t) * 100}%`, background: s.c, borderRadius: 999 }}/>
              </div>
            </div>
          ))}
        </nav>

        <div className="px-5 py-3" style={{ borderTop: `1px solid ${T.rule}` }}>
          <div className="flex items-center gap-2.5 px-2 py-1.5 rounded-[3px]" style={{ background: T.surface2 }}>
            <div className="flex items-center justify-center text-[11px]" style={{ width: 28, height: 28, borderRadius: '50%', background: T.copper, color: T.surface, fontWeight: 600 }}>SP</div>
            <div className="flex-1 min-w-0">
              <div className="text-[12px]" style={{ color: T.ink, fontWeight: 500 }}>Suresh Patel, EA</div>
              <div className="text-[10px]" style={{ color: T.muted }}>Solo · WY-focused</div>
            </div>
          </div>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}

/* ============================================================
   APP
   ============================================================ */
export default function App() {
  const [active, setActive] = useState('strategy');

  useEffect(() => {
    const id = 'ledger-playbook-fonts';
    if (document.getElementById(id)) return;
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap';
    document.head.appendChild(link);
  }, []);

  return (
    <Shell active={active} setActive={setActive}>
      {active === 'strategy' && <StrategyTab/>}
      {active === 'prospects' && <ProspectsTab/>}
      {active === 'sequences' && <SequencesTab/>}
      {active === 'discovery' && <DiscoveryTab/>}
      {active === 'roi' && <ROITab/>}
      {active === 'proposal' && <ProposalTab/>}
      {active === 'pipeline' && <PipelineTab/>}
    </Shell>
  );
}
