import React, { useState, useEffect } from 'react';
import {
  Mail, Inbox, Send, Bell, Settings, ChevronRight, ChevronDown, ChevronLeft,
  ArrowRight, Sparkles, Eye, Edit3, Copy, Download, Search, Filter,
  Smartphone, Monitor, Code as CodeIcon, Globe, Lock, Shield,
  CheckCircle2, AlertTriangle, Clock, Calendar, FileText, FileSignature,
  Receipt, Upload, MessageSquare, CreditCard, User, Users, Building2,
  Phone, MapPin, Star, Plus, X, MoreHorizontal, RefreshCw, Heart,
  Factory, HardHat, Truck, BookOpen, Link as LinkIcon, ExternalLink,
  Quote, Hash, AtSign, ArrowUpRight, ArrowDownRight, TrendingUp,
  Award, Pin, FileCheck, Zap, BarChart3,
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
   TEMPLATES
   ============================================================ */
const CATEGORIES = [
  { id: 'onboarding',  label: 'Onboarding'    },
  { id: 'engagement',  label: 'Engagement'    },
  { id: 'reminders',   label: 'Reminders'     },
  { id: 'transactions',label: 'Transactions'  },
  { id: 'lifecycle',   label: 'Lifecycle'     },
  { id: 'admin',       label: 'Admin'         },
];

const TEMPLATES = [
  {
    id: 'welcome',
    cat: 'onboarding',
    name: 'Welcome to your portal',
    subject: 'Welcome, Cody — your HYK Tax portal is ready',
    preview: 'Your secure portal is set up. Here\'s how to get the most out of it.',
    tone: 'warm',
    audience: 'New client',
    icon: Heart,
    sentLast30: 12,
    openRate: 92,
  },
  {
    id: 'sign-engagement',
    cat: 'engagement',
    name: 'Engagement letter ready to sign',
    subject: 'Your 2026 engagement letter is ready',
    preview: 'Quick review and one-tap sign — fees unchanged from 2025.',
    tone: 'professional',
    audience: 'Returning client',
    icon: FileSignature,
    sentLast30: 38,
    openRate: 88,
  },
  {
    id: 'doc-request',
    cat: 'engagement',
    name: 'Document request',
    subject: 'Need a couple things to keep moving on your return',
    preview: 'Three documents on the list — should take ten minutes from your phone.',
    tone: 'warm',
    audience: 'Active engagement',
    icon: Upload,
    sentLast30: 67,
    openRate: 84,
  },
  {
    id: 'deadline-7d',
    cat: 'reminders',
    name: 'Deadline reminder · 7 days out',
    subject: 'Q1 941 due in 7 days — quick check-in',
    preview: 'Heads up on the upcoming filing — let me know if anything changed.',
    tone: 'professional',
    audience: 'Payroll clients',
    icon: Clock,
    sentLast30: 24,
    openRate: 91,
  },
  {
    id: 'irs-notice',
    cat: 'reminders',
    name: 'IRS notice received',
    subject: 'IRS notice received — no panic, here\'s the plan',
    preview: 'A CP2000 came in. Here\'s what it means and what we\'re doing about it.',
    tone: 'reassuring',
    audience: 'Affected client',
    icon: AlertTriangle,
    sentLast30: 4,
    openRate: 100,
  },
  {
    id: 'invoice',
    cat: 'transactions',
    name: 'Invoice issued',
    subject: 'Invoice #INV-2204 — $1,850 due May 10',
    preview: 'March retainer plus Q1 reconciliation work — pay in two taps.',
    tone: 'professional',
    audience: 'All clients',
    icon: Receipt,
    sentLast30: 42,
    openRate: 79,
  },
  {
    id: 'payment-receipt',
    cat: 'transactions',
    name: 'Payment received',
    subject: 'Got it — thanks, Cody',
    preview: '$1,850 received. Receipt attached.',
    tone: 'warm',
    audience: 'After payment',
    icon: CheckCircle2,
    sentLast30: 38,
    openRate: 96,
  },
  {
    id: 'return-filed',
    cat: 'lifecycle',
    name: 'Return filed',
    subject: 'Filed. Here\'s your 2025 return.',
    preview: 'Form 1065 accepted by IRS at 4:42 PM. Confirmation enclosed.',
    tone: 'celebratory',
    audience: 'After filing',
    icon: Award,
    sentLast30: 8,
    openRate: 98,
  },
  {
    id: 'weekly-digest',
    cat: 'admin',
    name: 'Weekly partner digest',
    subject: 'Your week at HYK Tax — Apr 21–27',
    preview: 'A look at your firm — what moved, what\'s slipping, what to plan for.',
    tone: 'professional',
    audience: 'Firm partners',
    icon: BarChart3,
    sentLast30: 4,
    openRate: 100,
  },
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
   EMAIL CHROME — wraps every email in branded letterhead + footer
   ============================================================ */
function EmailChrome({ children, mobile, preheader }) {
  const W = mobile ? 360 : 600;
  return (
    <div
      className="mx-auto"
      style={{
        width: W,
        background: T.bg,
        padding: mobile ? '20px 12px' : '28px 24px',
        fontFamily: FONT_BODY, color: T.ink,
      }}
    >
      {/* Preheader (the little gray text Gmail shows in the inbox preview) */}
      {preheader && (
        <div
          style={{
            fontSize: 11, color: T.muted, marginBottom: 16,
            fontStyle: 'italic', textAlign: 'center', lineHeight: 1.4,
          }}
        >
          {preheader}
        </div>
      )}

      {/* Letterhead */}
      <div
        style={{
          background: T.surface, padding: mobile ? '20px 18px' : '32px 36px 16px',
          borderTopLeftRadius: 6, borderTopRightRadius: 6,
          borderTop: `3px solid ${T.copper}`,
        }}
      >
        <div className="flex items-center gap-2.5">
          <div
            style={{
              width: 30, height: 30, borderRadius: 4, background: T.primary,
              color: T.surface, fontFamily: FONT_DISPLAY, fontSize: 22, fontStyle: 'italic',
              lineHeight: 1, paddingBottom: 4, textAlign: 'center',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >H</div>
          <div className="flex flex-col">
            <span style={{ fontFamily: FONT_DISPLAY, fontSize: 19, color: T.ink, lineHeight: 1, letterSpacing: '-0.01em' }}>
              HYK Tax<span style={{ color: T.copper }}>.</span>
            </span>
            <span style={{ fontSize: 9, letterSpacing: '0.16em', color: T.muted, marginTop: 2, textTransform: 'uppercase' }}>
              Suresh Patel, EA · Cheyenne, WY
            </span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div
        style={{
          background: T.surface, padding: mobile ? '12px 18px 24px' : '16px 36px 36px',
        }}
      >
        {children}
      </div>

      {/* Footer */}
      <div
        style={{
          background: T.surface2, padding: mobile ? '20px 18px' : '24px 36px',
          borderBottomLeftRadius: 6, borderBottomRightRadius: 6,
          borderTop: `1px solid ${T.rule}`,
          fontSize: 11, color: T.muted, lineHeight: 1.6,
        }}
      >
        <div className="flex items-start gap-3" style={{ flexDirection: mobile ? 'column' : 'row' }}>
          <div className="flex-1">
            <div style={{ color: T.ink2, fontWeight: 500 }}>Suresh Patel, EA</div>
            <div className="mt-1">HYK Tax · Federal Authorization · IRS Form 2848</div>
            <div className="mt-1" style={{ fontFamily: FONT_MONO, fontSize: 10.5 }}>suresh@hyktax.co · (307) 555-0142</div>
          </div>
          <div style={{ textAlign: mobile ? 'left' : 'right' }}>
            <div className="flex items-center gap-2 justify-start" style={{ justifyContent: mobile ? 'flex-start' : 'flex-end' }}>
              <Lock size={10} style={{ color: T.muted }}/>
              <span style={{ fontSize: 10 }}>Confidential · IRC §7216 protected</span>
            </div>
            <div className="mt-1.5 flex items-center gap-2" style={{ justifyContent: mobile ? 'flex-start' : 'flex-end' }}>
              <a href="#" style={{ color: T.muted, textDecoration: 'underline', fontSize: 10 }}>Manage preferences</a>
              <span>·</span>
              <a href="#" style={{ color: T.muted, textDecoration: 'underline', fontSize: 10 }}>Unsubscribe</a>
            </div>
          </div>
        </div>
        <div className="mt-4 pt-3 flex items-center gap-1.5 text-[9.5px]" style={{ borderTop: `1px dashed ${T.rule2}`, color: T.faint }}>
          <span>Powered by</span>
          <span style={{ fontFamily: FONT_DISPLAY, fontStyle: 'italic', color: T.muted }}>Ledger</span>
          <span>·</span>
          <span>Practice suite for accountants</span>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   EMAIL PRIMITIVES (used inside templates)
   ============================================================ */
function Greeting({ children, mobile }) {
  return (
    <h1
      style={{
        fontFamily: FONT_DISPLAY, fontSize: mobile ? 28 : 34, lineHeight: 1.05,
        letterSpacing: '-0.02em', color: T.ink, fontStyle: 'italic',
        margin: '20px 0 4px',
      }}
    >
      {children}
    </h1>
  );
}

function Body({ children, mobile }) {
  return (
    <div
      style={{
        fontSize: mobile ? 14 : 14.5, color: T.ink2, lineHeight: 1.7,
        fontFamily: FONT_BODY, marginTop: 16,
      }}
    >
      {children}
    </div>
  );
}

function Button({ children, mobile, accent = T.primary }) {
  return (
    <a
      href="#"
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        background: accent, color: T.surface, fontWeight: 500,
        padding: mobile ? '11px 18px' : '12px 22px',
        borderRadius: 4, textDecoration: 'none',
        fontSize: mobile ? 13 : 14, fontFamily: FONT_BODY,
        letterSpacing: '0.005em',
      }}
    >
      {children}
    </a>
  );
}

function Card({ children, accent }) {
  return (
    <div
      style={{
        background: T.surface2, border: `1px solid ${accent || T.rule}`,
        borderLeft: accent ? `3px solid ${accent}` : `1px solid ${T.rule}`,
        borderRadius: 4, padding: 16,
        margin: '16px 0',
      }}
    >
      {children}
    </div>
  );
}

function MetaRow({ label, value, mono }) {
  return (
    <div
      style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        padding: '6px 0', borderBottom: `1px dashed ${T.rule2}`,
        fontSize: 12, lineHeight: 1.5,
      }}
    >
      <span style={{ color: T.muted, textTransform: 'uppercase', letterSpacing: '0.12em', fontSize: 10 }}>{label}</span>
      <span style={{ color: T.ink, fontWeight: 500, fontFamily: mono ? FONT_MONO : FONT_BODY }}>{value}</span>
    </div>
  );
}

function Sig({ mobile }) {
  return (
    <div style={{ fontFamily: FONT_BODY, fontSize: mobile ? 14 : 14.5, color: T.ink2, lineHeight: 1.7, marginTop: 24 }}>
      — Suresh<br/>
      <span style={{ color: T.muted, fontSize: 12 }}>Suresh Patel, EA · HYK Tax</span>
    </div>
  );
}

/* ============================================================
   TEMPLATE 1 — WELCOME
   ============================================================ */
function WelcomeEmail({ mobile }) {
  return (
    <EmailChrome mobile={mobile} preheader="Your HYK Tax portal is set up — here's how to get the most out of it.">
      <div style={{ fontSize: 10.5, letterSpacing: '0.18em', color: T.copper, textTransform: 'uppercase', fontWeight: 500 }}>
        Welcome aboard
      </div>
      <Greeting mobile={mobile}>Welcome, Cody.</Greeting>

      <Body mobile={mobile}>
        Thanks for choosing HYK Tax. I'm Suresh, and I'll be the EA running point on your books and partnership return for Powder River Drilling.
        <br/><br/>
        Your secure portal is ready. Everything we do together — engagement letters, document uploads, IRS correspondence, invoices — lives in one place. No more email chains, no more "did you get my doc?" guessing.
      </Body>

      <Card accent={T.copper}>
        <div style={{ fontSize: 10, letterSpacing: '0.16em', color: T.copper, textTransform: 'uppercase', fontWeight: 500, marginBottom: 8 }}>
          Three things to do today
        </div>
        <ol style={{ margin: 0, padding: 0, listStyle: 'none', counterReset: 'step' }}>
          {[
            'Sign your 2026 engagement letter (90 seconds)',
            'Upload prior year return + bank statements',
            'Save Suresh\'s number — text any time',
          ].map((s, i) => (
            <li
              key={i}
              style={{
                fontSize: 13, color: T.ink2, lineHeight: 1.5, padding: '8px 0',
                borderBottom: i < 2 ? `1px solid ${T.rule}` : 'none',
                display: 'flex', alignItems: 'flex-start', gap: 10,
              }}
            >
              <span
                style={{
                  width: 20, height: 20, borderRadius: '50%', background: T.surface,
                  border: `1px solid ${T.rule}`, color: T.copper, fontFamily: FONT_MONO,
                  fontSize: 10, fontWeight: 600, display: 'inline-flex',
                  alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}
              >
                {i + 1}
              </span>
              {s}
            </li>
          ))}
        </ol>
      </Card>

      <div style={{ marginTop: 24 }}>
        <Button mobile={mobile} accent={T.primary}>Open my portal <ArrowRight size={13}/></Button>
      </div>

      <Body mobile={mobile}>
        Two quick notes — you can always reach me directly by replying to this email or calling/texting <span style={{ fontFamily: FONT_MONO, color: T.ink }}>(307) 555-0142</span>. And every document you ever upload to the portal is encrypted and yours forever, even if we part ways.
      </Body>

      <Sig mobile={mobile}/>
    </EmailChrome>
  );
}

/* ============================================================
   TEMPLATE 2 — ENGAGEMENT LETTER
   ============================================================ */
function EngagementEmail({ mobile }) {
  return (
    <EmailChrome mobile={mobile} preheader="Quick review and one-tap sign — fees unchanged from 2025.">
      <div style={{ fontSize: 10.5, letterSpacing: '0.18em', color: T.copper, textTransform: 'uppercase', fontWeight: 500 }}>
        Action requested
      </div>
      <Greeting mobile={mobile}>Your 2026 letter,<br/>ready to sign.</Greeting>

      <Body mobile={mobile}>
        Hi Cody — I prepared your 2026 engagement letter for Powder River Drilling. Same scope as last year, fees unchanged. Should take you about 90 seconds end to end.
      </Body>

      <Card>
        <MetaRow label="Engagement"    value="2026 Tax Year"/>
        <MetaRow label="Scope"          value="Form 1065 + K-1s + payroll"/>
        <MetaRow label="Monthly retainer" value="$1,850" mono/>
        <MetaRow label="Term"           value="Jan 1 – Dec 31, 2026"/>
        <MetaRow label="Sign by"         value="April 30, 2026" mono/>
      </Card>

      <div style={{ marginTop: 20 }}>
        <Button mobile={mobile} accent={T.primary}>Review & sign <ArrowRight size={13}/></Button>
        <span style={{ fontSize: 11, color: T.muted, marginLeft: 12, fontStyle: 'italic' }}>Takes ~90 seconds</span>
      </div>

      <div
        style={{
          background: T.surface3, border: `1px dashed ${T.rule2}`, borderRadius: 4,
          padding: 12, marginTop: 24, fontSize: 12, color: T.ink2, lineHeight: 1.6,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
          <Shield size={13} style={{ color: T.primary, flexShrink: 0, marginTop: 2 }}/>
          <div>
            <span style={{ fontWeight: 500, color: T.ink }}>About the e-signature:</span> ESIGN Act compliant. Your IP, timestamp, and device are logged for the audit trail. Same legal weight as a wet-ink signature.
          </div>
        </div>
      </div>

      <Sig mobile={mobile}/>
    </EmailChrome>
  );
}

/* ============================================================
   TEMPLATE 3 — DOCUMENT REQUEST
   ============================================================ */
function DocRequestEmail({ mobile }) {
  return (
    <EmailChrome mobile={mobile} preheader="Three documents on the list — should take ten minutes from your phone.">
      <div style={{ fontSize: 10.5, letterSpacing: '0.18em', color: T.copper, textTransform: 'uppercase', fontWeight: 500 }}>
        Document request
      </div>
      <Greeting mobile={mobile}>Three quick things,<br/>then we keep moving.</Greeting>

      <Body mobile={mobile}>
        Hey Cody — to wrap Q1 reconciliation and stay on track for the September extension deadline, I need three things from you. Snap with your phone, drop them in the portal — easiest path.
      </Body>

      <div style={{ margin: '16px 0' }}>
        {[
          { i: '01', t: 'March 2026 bank statement',     d: 'First National WY · acct ****8421' },
          { i: '02', t: 'Updated W-9 for Acme Fuel',     d: 'Their EIN looks new on the Q1 invoices' },
          { i: '03', t: 'Field office property tax bill', d: 'Just need the 2025 one for the depreciation schedule' },
        ].map((it, i) => (
          <div
            key={i}
            style={{
              background: T.surface, border: `1px solid ${T.rule}`,
              borderLeft: `2px solid ${T.copper}`,
              padding: 12, marginBottom: 8, borderRadius: 4,
              display: 'flex', alignItems: 'flex-start', gap: 12,
            }}
          >
            <span
              style={{
                fontFamily: FONT_DISPLAY, fontSize: 22, fontStyle: 'italic',
                color: T.copper, lineHeight: 1, letterSpacing: '-0.02em',
                flexShrink: 0, paddingTop: 4,
              }}
            >
              {it.i}
            </span>
            <div>
              <div style={{ fontSize: 13, color: T.ink, fontWeight: 500, lineHeight: 1.3 }}>{it.t}</div>
              <div style={{ fontSize: 11.5, color: T.muted, marginTop: 4, lineHeight: 1.5 }}>{it.d}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 20 }}>
        <Button mobile={mobile} accent={T.primary}>Upload via portal <ArrowRight size={13}/></Button>
      </div>

      <Body mobile={mobile}>
        Easiest path: open the Ledger app, hit the camera button, take photos. AI sorts them automatically. No need to label or categorize.
        <br/><br/>
        <span style={{ color: T.muted, fontStyle: 'italic', fontSize: 12.5 }}>Aiming to wrap this week — let me know if anything is delayed.</span>
      </Body>

      <Sig mobile={mobile}/>
    </EmailChrome>
  );
}

/* ============================================================
   TEMPLATE 4 — DEADLINE REMINDER
   ============================================================ */
function DeadlineEmail({ mobile }) {
  return (
    <EmailChrome mobile={mobile} preheader="Q1 941 due in 7 days — quick check-in to make sure we're aligned.">
      <div style={{ fontSize: 10.5, letterSpacing: '0.18em', color: T.copper, textTransform: 'uppercase', fontWeight: 500 }}>
        Heads up
      </div>
      <Greeting mobile={mobile}>Q1 941 due<br/>in 7 days.</Greeting>

      {/* Countdown card */}
      <div
        style={{
          background: `linear-gradient(135deg, ${T.primary} 0%, ${T.primary2} 100%)`,
          color: T.surface, padding: 24, borderRadius: 4, marginTop: 24,
          position: 'relative', overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute', right: -30, top: -30, width: 130, height: 130,
            border: `1px solid rgba(255,253,248,0.10)`, borderRadius: '50%',
          }}
          aria-hidden
        />
        <div style={{ position: 'relative' }}>
          <div style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: T.copperLt, marginBottom: 8 }}>
            Form 941 · Q1 Payroll Tax
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
            <span style={{ fontFamily: FONT_DISPLAY, fontSize: 64, fontStyle: 'italic', letterSpacing: '-0.025em', lineHeight: 1 }}>
              7
            </span>
            <span style={{ fontSize: 14, color: 'rgba(255,253,248,0.7)', letterSpacing: '0.05em' }}>DAYS REMAINING</span>
          </div>
          <div style={{ fontSize: 12, color: 'rgba(255,253,248,0.65)', marginTop: 4, fontFamily: FONT_MONO }}>
            Due Wednesday, April 30, 2026
          </div>
        </div>
      </div>

      <Body mobile={mobile}>
        Hi Cody — just a heads up: the Q1 941 (federal payroll tax) is due next Wednesday. I have everything I need on my end and will file ahead of the deadline, but wanted to flag it in case anything in your March payroll changed late (bonuses, contractors, terminations).
      </Body>

      <Card>
        <div style={{ fontSize: 10, letterSpacing: '0.14em', color: T.muted, textTransform: 'uppercase', marginBottom: 8 }}>
          Status check
        </div>
        {[
          ['March payroll data',  '✓ received', T.ok],
          ['Wage reconciliation',  '✓ matches Q1 totals', T.ok],
          ['Federal deposit',      '✓ on schedule', T.ok],
          ['Filing window',        '5 business days', T.copper],
        ].map(([k, v, c], i) => (
          <div
            key={i}
            style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '6px 0', fontSize: 12.5,
            }}
          >
            <span style={{ color: T.ink2 }}>{k}</span>
            <span style={{ color: c, fontFamily: FONT_MONO, fontWeight: 500 }}>{v}</span>
          </div>
        ))}
      </Card>

      <Body mobile={mobile}>
        If anything changed after Mar 31, reply to this email or text me by Monday and we'll fold it in. Otherwise, I'll file Tuesday and send confirmation.
      </Body>

      <Sig mobile={mobile}/>
    </EmailChrome>
  );
}

/* ============================================================
   TEMPLATE 5 — IRS NOTICE RECEIVED
   ============================================================ */
function IrsNoticeEmail({ mobile }) {
  return (
    <EmailChrome mobile={mobile} preheader="A CP2000 came in. Don't worry — here's what it means and what we're doing about it.">
      <div style={{ fontSize: 10.5, letterSpacing: '0.18em', color: T.copper, textTransform: 'uppercase', fontWeight: 500 }}>
        IRS notice received
      </div>
      <Greeting mobile={mobile}>Don't panic.<br/>Here's the plan.</Greeting>

      <Body mobile={mobile}>
        Hi Ashlyn — an IRS CP2000 notice came in for Cheyenne Ridge today. Before you spiral: <span style={{ color: T.ink, fontWeight: 500 }}>this is not an audit</span>, and we have time and options. Let me break down what it actually says.
      </Body>

      {/* Notice summary */}
      <div
        style={{
          background: T.surface, border: `2px solid ${T.copper}`,
          padding: 16, borderRadius: 4, marginTop: 16,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <FileText size={14} style={{ color: T.copper }}/>
          <span style={{ fontSize: 11, letterSpacing: '0.14em', color: T.copper, textTransform: 'uppercase', fontWeight: 600 }}>
            Notice summary
          </span>
        </div>
        <MetaRow label="Notice type"     value="CP2000 (Proposed change)"/>
        <MetaRow label="Tax year"        value="2024" mono/>
        <MetaRow label="Proposed balance" value="$8,412.00" mono/>
        <MetaRow label="Reply by"        value="May 12, 2026" mono/>
      </div>

      <Body mobile={mobile}>
        <span style={{ color: T.ink, fontWeight: 500 }}>What it means in English:</span> the IRS is saying their records (W-2s, 1099s reported by other parties) don't match what we filed on the 2024 return. They're <span style={{ fontStyle: 'italic' }}>proposing</span> a balance — not assessing one. We have 30 days to respond.
        <br/><br/>
        <span style={{ color: T.ink, fontWeight: 500 }}>What I'm already doing:</span> pulling the original return, your W-2 and 1099 records for 2024, and reconciling against what they claim. My initial read is they're missing a corrected 1099 you got in March 2025 — likely a fix, not a real balance.
      </Body>

      <Card accent={T.ok}>
        <div style={{ fontSize: 10, letterSpacing: '0.14em', color: T.ok, textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>
          Three likely outcomes
        </div>
        {[
          ['Most likely (75%)', 'No balance owed — corrected 1099 resolves discrepancy'],
          ['Possible (20%)',     'Small balance ($1k–2k) if a different mismatch exists'],
          ['Unlikely (5%)',      'Full proposed balance of $8,412 stands'],
        ].map(([h, t], i) => (
          <div
            key={i}
            style={{
              padding: '8px 0',
              borderTop: i > 0 ? `1px dashed ${T.rule2}` : 'none',
              fontSize: 12.5, color: T.ink2, lineHeight: 1.5,
            }}
          >
            <div style={{ color: T.ok, fontFamily: FONT_MONO, fontSize: 10.5, fontWeight: 600, marginBottom: 2 }}>{h}</div>
            {t}
          </div>
        ))}
      </Card>

      <div style={{ marginTop: 20 }}>
        <Button mobile={mobile} accent={T.primary}>See full notice in portal <ArrowRight size={13}/></Button>
      </div>

      <Body mobile={mobile}>
        Want to talk it through? Hit reply or grab time on my calendar — I have a 30-min slot Friday at 2pm if that works. Otherwise I'll send the draft response by Wednesday for your review.
      </Body>

      <Sig mobile={mobile}/>
    </EmailChrome>
  );
}

/* ============================================================
   TEMPLATE 6 — INVOICE
   ============================================================ */
function InvoiceEmail({ mobile }) {
  return (
    <EmailChrome mobile={mobile} preheader="March retainer plus Q1 reconciliation work — pay in two taps.">
      <div style={{ fontSize: 10.5, letterSpacing: '0.18em', color: T.copper, textTransform: 'uppercase', fontWeight: 500 }}>
        Invoice issued
      </div>
      <Greeting mobile={mobile}>Invoice<br/>#INV-2204</Greeting>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 8 }}>
        <span style={{ fontFamily: FONT_DISPLAY, fontSize: 48, fontStyle: 'italic', letterSpacing: '-0.025em', color: T.ink, lineHeight: 1 }}>
          $1,850.00
        </span>
        <span style={{ fontSize: 13, color: T.muted, fontFamily: FONT_BODY }}>due May 10</span>
      </div>

      <Body mobile={mobile}>
        Hi Cody — your March invoice is ready. Standard retainer plus Q1 reconciliation work. Two payment methods, both saved in your portal.
      </Body>

      <Card>
        <div style={{ fontSize: 10, letterSpacing: '0.14em', color: T.muted, textTransform: 'uppercase', marginBottom: 12 }}>
          Line items
        </div>
        {[
          ['March monthly retainer',         '$1,850.00'],
          ['Q1 bank reconciliation (4hr)',   'Included'],
          ['§168 election research (1hr)',   'Included'],
          ['IDC schedule update (1.5hr)',    'Included'],
        ].map(([l, v], i) => (
          <div
            key={i}
            style={{
              display: 'flex', justifyContent: 'space-between',
              padding: '6px 0', fontSize: 12.5,
              borderTop: i > 0 ? `1px dashed ${T.rule2}` : 'none',
            }}
          >
            <span style={{ color: T.ink2 }}>{l}</span>
            <span style={{ color: T.ink, fontFamily: FONT_MONO }}>{v}</span>
          </div>
        ))}
        <div
          style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
            paddingTop: 12, marginTop: 8, borderTop: `1px solid ${T.rule}`,
            fontSize: 14,
          }}
        >
          <span style={{ color: T.ink, fontWeight: 500 }}>Total due</span>
          <span style={{ color: T.ink, fontFamily: FONT_MONO, fontWeight: 600, fontSize: 16 }}>$1,850.00</span>
        </div>
      </Card>

      <div style={{ marginTop: 20, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <Button mobile={mobile} accent={T.primary}>
          <CreditCard size={12}/> Pay with card
        </Button>
        <Button mobile={mobile} accent={T.surface2}>
          <span style={{ color: T.ink2 }}>ACH bank transfer</span>
        </Button>
      </div>

      <Body mobile={mobile}>
        Card lands instantly, ACH takes 1–3 business days. Either is fine.
      </Body>

      <div
        style={{
          background: T.surface3, border: `1px dashed ${T.rule2}`, borderRadius: 4,
          padding: 12, marginTop: 16, fontSize: 11.5, color: T.muted, lineHeight: 1.55,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
          <Receipt size={12} style={{ color: T.muted, flexShrink: 0, marginTop: 2 }}/>
          <div>
            Auto-pay is available — opt in once and the monthly retainer charges to your card on the 1st. Never lose a discount or risk a late fee.
          </div>
        </div>
      </div>

      <Sig mobile={mobile}/>
    </EmailChrome>
  );
}

/* ============================================================
   TEMPLATE 7 — PAYMENT RECEIPT
   ============================================================ */
function ReceiptEmail({ mobile }) {
  return (
    <EmailChrome mobile={mobile} preheader="$1,850 received. Receipt attached.">
      <div style={{ fontSize: 10.5, letterSpacing: '0.18em', color: T.ok, textTransform: 'uppercase', fontWeight: 500 }}>
        Payment received
      </div>
      <Greeting mobile={mobile}>Got it — thanks,<br/>Cody.</Greeting>

      {/* Confirmation badge */}
      <div
        style={{
          display: 'flex', alignItems: 'center', gap: 14,
          background: '#E2EBE3', padding: 16, borderRadius: 4,
          marginTop: 20, border: `1px solid #C8D8CB`,
        }}
      >
        <div
          style={{
            width: 44, height: 44, borderRadius: '50%', background: T.ok,
            color: T.surface, display: 'inline-flex', alignItems: 'center',
            justifyContent: 'center', flexShrink: 0,
          }}
        >
          <CheckCircle2 size={22} strokeWidth={2.5}/>
        </div>
        <div>
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 26, fontStyle: 'italic', letterSpacing: '-0.01em', color: T.ink, lineHeight: 1.05 }}>
            $1,850.00 received
          </div>
          <div style={{ fontSize: 11.5, color: T.muted, marginTop: 4, fontFamily: FONT_MONO }}>
            Apr 25, 2026 · 4:42 PM MDT
          </div>
        </div>
      </div>

      <Body mobile={mobile}>
        Thanks for the prompt payment. Receipt is attached as PDF and saved in your portal under <span style={{ fontStyle: 'italic', color: T.ink }}>Documents → Billing</span>. Nothing else needed from you.
      </Body>

      <Card>
        <MetaRow label="Invoice"        value="#INV-2204" mono/>
        <MetaRow label="Method"          value="Visa ****4421" mono/>
        <MetaRow label="Reference"       value="ch_3PqLk2eZ" mono/>
        <MetaRow label="Next charge"     value="June 1, 2026" mono/>
      </Card>

      <Body mobile={mobile}>
        Quick reminder — your next monthly retainer charges automatically on June 1. Update payment method anytime from the portal.
      </Body>

      <Sig mobile={mobile}/>
    </EmailChrome>
  );
}

/* ============================================================
   TEMPLATE 8 — RETURN FILED
   ============================================================ */
function FiledEmail({ mobile }) {
  return (
    <EmailChrome mobile={mobile} preheader="Form 1065 accepted by IRS at 4:42 PM. Confirmation enclosed.">
      <div style={{ fontSize: 10.5, letterSpacing: '0.18em', color: T.ok, textTransform: 'uppercase', fontWeight: 500 }}>
        Return filed · accepted
      </div>
      <Greeting mobile={mobile}>Filed.<br/>Here's your<br/>2025 return.</Greeting>

      <Body mobile={mobile}>
        Hi Cody — your 2025 partnership return for Powder River Drilling was just accepted by the IRS. PDF copy and K-1s are saved in your portal under <span style={{ fontStyle: 'italic', color: T.ink }}>Documents → Tax Returns 2025</span>.
      </Body>

      <Card accent={T.ok}>
        <div style={{ fontSize: 10, letterSpacing: '0.14em', color: T.ok, textTransform: 'uppercase', fontWeight: 600, marginBottom: 12 }}>
          IRS confirmation
        </div>
        <MetaRow label="Form"             value="1065 · Partnership"/>
        <MetaRow label="Tax year"          value="2025" mono/>
        <MetaRow label="Filing status"     value="Accepted"/>
        <MetaRow label="Submission ID"     value="38291-04282-2026" mono/>
        <MetaRow label="Filed at"          value="Apr 25, 2026 · 4:42 PM MDT" mono/>
      </Card>

      <Body mobile={mobile}>
        <span style={{ color: T.ink, fontWeight: 500 }}>What happens next:</span> partner K-1s are uploaded and ready to share. Federal payment (if any) was processed via the elected method. State filings follow next week.
      </Body>

      <div
        style={{
          background: T.surface3, border: `1px dashed ${T.rule2}`,
          borderRadius: 4, padding: 16, marginTop: 16,
        }}
      >
        <div style={{ fontSize: 10.5, letterSpacing: '0.16em', color: T.copper, textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>
          Looking ahead to 2026
        </div>
        <div style={{ fontSize: 12.5, color: T.ink2, lineHeight: 1.6 }}>
          A few things I want to discuss when we meet next month:
          <ul style={{ marginTop: 8, paddingLeft: 18, marginBottom: 0 }}>
            <li>Bonus depreciation election on the new rig (rate drops to 40% in 2027)</li>
            <li>R&D credit eligibility for your directional drilling work</li>
            <li>Defined benefit plan vs SEP-IRA for the partners</li>
          </ul>
        </div>
      </div>

      <div style={{ marginTop: 20 }}>
        <Button mobile={mobile} accent={T.primary}>Download return PDF <ArrowRight size={13}/></Button>
      </div>

      <Body mobile={mobile}>
        Solid year. Thanks for the trust — looking forward to 2026.
      </Body>

      <Sig mobile={mobile}/>
    </EmailChrome>
  );
}

/* ============================================================
   TEMPLATE 9 — WEEKLY PARTNER DIGEST (internal)
   ============================================================ */
function WeeklyDigestEmail({ mobile }) {
  return (
    <EmailChrome mobile={mobile} preheader="Your week at HYK Tax — what moved, what's slipping, what to plan for.">
      <div style={{ fontSize: 10.5, letterSpacing: '0.18em', color: T.copper, textTransform: 'uppercase', fontWeight: 500 }}>
        Internal · partner digest
      </div>
      <Greeting mobile={mobile}>Your week<br/>at HYK Tax.</Greeting>
      <div style={{ fontSize: 12, color: T.muted, marginTop: 8, fontFamily: FONT_MONO }}>
        Apr 21 – Apr 27, 2026
      </div>

      <Body mobile={mobile}>
        A quick pulse on the firm — what moved, what's slipping, what's worth your attention before Monday.
      </Body>

      {/* KPI grid */}
      <div
        style={{
          display: 'grid', gridTemplateColumns: mobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          gap: 1, background: T.rule, marginTop: 16, borderRadius: 4, overflow: 'hidden',
        }}
      >
        {[
          { l: 'Revenue this wk',  v: '$4,280', d: '+12% WoW',  c: T.ok },
          { l: 'Returns filed',     v: '7',      d: '3 extensions', c: T.ink2 },
          { l: 'Open A/R',          v: '$28.4k', d: '−8% WoW',  c: T.ok },
          { l: 'New clients',        v: '2',      d: 'WY · CO',     c: T.ink2 },
        ].map((k, i) => (
          <div key={i} style={{ background: T.surface, padding: 14 }}>
            <div style={{ fontSize: 9.5, letterSpacing: '0.14em', color: T.muted, textTransform: 'uppercase' }}>{k.l}</div>
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 24, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.02em', lineHeight: 1, marginTop: 4 }}>
              {k.v}
            </div>
            <div style={{ fontSize: 10.5, color: k.c, marginTop: 4, fontFamily: FONT_MONO }}>{k.d}</div>
          </div>
        ))}
      </div>

      {/* Wins */}
      <div style={{ marginTop: 24 }}>
        <div style={{ fontSize: 10, letterSpacing: '0.16em', color: T.ok, textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>
          Wins this week
        </div>
        {[
          'Closed Bonner v. Comm\'r research → election memo signed by Bison',
          'Powder River 2025 return accepted by IRS · 0 errors',
          'Margaux\'s onboarding of new client (Granite Peak Builders) complete',
        ].map((w, i) => (
          <div
            key={i}
            style={{
              display: 'flex', alignItems: 'flex-start', gap: 10,
              fontSize: 12.5, color: T.ink2, padding: '6px 0', lineHeight: 1.5,
            }}
          >
            <CheckCircle2 size={13} style={{ color: T.ok, flexShrink: 0, marginTop: 3 }}/>
            {w}
          </div>
        ))}
      </div>

      {/* Watchlist */}
      <Card accent={T.warn}>
        <div style={{ fontSize: 10, letterSpacing: '0.16em', color: T.warn, textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>
          Watchlist · needs attention
        </div>
        {[
          { c: 'Cheyenne Ridge', n: 'CP2000 reply due May 12 · draft 70% complete' },
          { c: 'Niobrara Energy', n: 'K-1 allocations pending partner data · slipping' },
          { c: 'Big Horn Logistics', n: 'March payroll missing for Q1 941 · followed up Wed' },
        ].map((w, i) => (
          <div
            key={i}
            style={{
              padding: '8px 0', fontSize: 12.5,
              borderTop: i > 0 ? `1px dashed ${T.rule2}` : 'none',
            }}
          >
            <div style={{ color: T.ink, fontWeight: 500 }}>{w.c}</div>
            <div style={{ color: T.muted, marginTop: 2, lineHeight: 1.5 }}>{w.n}</div>
          </div>
        ))}
      </Card>

      {/* Calendar */}
      <div style={{ marginTop: 16 }}>
        <div style={{ fontSize: 10, letterSpacing: '0.16em', color: T.muted, textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>
          Coming up
        </div>
        {[
          ['Mon Apr 28', 'Filing window opens · Q1 941 batch'],
          ['Wed Apr 30', 'Form 941 Q1 deadline · 6 clients'],
          ['Fri May 2',   'CP2000 draft review with Ashlyn (Cheyenne Ridge)'],
          ['Mon May 5',   'Bison rig depreciation — election memo sign-off'],
        ].map(([d, e], i) => (
          <div
            key={i}
            style={{
              display: 'flex', gap: 16, fontSize: 12.5, color: T.ink2,
              padding: '6px 0',
              borderTop: i > 0 ? `1px dashed ${T.rule2}` : 'none',
            }}
          >
            <span style={{ fontFamily: FONT_MONO, color: T.copper, width: 100, fontSize: 11, fontWeight: 500 }}>{d}</span>
            <span style={{ flex: 1 }}>{e}</span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 20 }}>
        <Button mobile={mobile} accent={T.primary}>Open the full dashboard <ArrowRight size={13}/></Button>
      </div>
    </EmailChrome>
  );
}

/* ============================================================
   TEMPLATE PICKER
   ============================================================ */
function renderTemplate(id, mobile) {
  switch (id) {
    case 'welcome':         return <WelcomeEmail mobile={mobile}/>;
    case 'sign-engagement': return <EngagementEmail mobile={mobile}/>;
    case 'doc-request':     return <DocRequestEmail mobile={mobile}/>;
    case 'deadline-7d':     return <DeadlineEmail mobile={mobile}/>;
    case 'irs-notice':      return <IrsNoticeEmail mobile={mobile}/>;
    case 'invoice':         return <InvoiceEmail mobile={mobile}/>;
    case 'payment-receipt': return <ReceiptEmail mobile={mobile}/>;
    case 'return-filed':    return <FiledEmail mobile={mobile}/>;
    case 'weekly-digest':   return <WeeklyDigestEmail mobile={mobile}/>;
    default:                return null;
  }
}

/* ============================================================
   APP SHELL
   ============================================================ */
function Shell({ activeId, setActiveId, view, setView, children }) {
  const tmpl = TEMPLATES.find(t => t.id === activeId);
  const Icon = tmpl?.icon || Mail;

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: T.bg, fontFamily: FONT_BODY }}>
      {/* Left rail */}
      <aside
        className="flex flex-col"
        style={{ width: 320, background: T.surface, borderRight: `1px solid ${T.rule}` }}
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
              <span style={{ fontFamily: FONT_DISPLAY, fontSize: 19, color: T.ink, lineHeight: 1, letterSpacing: '-0.01em' }}>
                Ledger<span style={{ color: T.copper }}>.</span>
              </span>
              <span className="text-[9px] uppercase tracking-[0.16em]" style={{ color: T.muted, marginTop: 1 }}>
                Email templates
              </span>
            </div>
          </div>
          <button className="mt-5 flex items-center gap-1.5 text-[11.5px]" style={{ color: T.muted }}>
            <ChevronLeft size={12}/> Back to settings
          </button>
        </div>

        {/* Search */}
        <div className="px-3 pt-4 pb-2">
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-[3px]"
            style={{ background: T.surface2, border: `1px solid ${T.rule}` }}
          >
            <Search size={13} style={{ color: T.muted }}/>
            <input placeholder="Search templates…" className="flex-1 bg-transparent outline-none text-[12px]" style={{ color: T.ink }}/>
          </div>
        </div>

        {/* Categories + templates */}
        <div className="flex-1 overflow-y-auto px-3 pb-2">
          {CATEGORIES.map(cat => {
            const items = TEMPLATES.filter(t => t.cat === cat.id);
            if (items.length === 0) return null;
            return (
              <div key={cat.id} className="mt-3">
                <div className="text-[9.5px] uppercase tracking-[0.16em] px-2 pb-1.5" style={{ color: T.faint }}>
                  {cat.label}
                </div>
                {items.map(t => {
                  const Icon = t.icon;
                  const isActive = activeId === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setActiveId(t.id)}
                      className="w-full flex items-start gap-2.5 px-2 py-2 mb-[2px] text-left rounded-[3px]"
                      style={{
                        background: isActive ? T.surface2 : 'transparent',
                        borderLeft: `2px solid ${isActive ? T.copper : 'transparent'}`,
                        paddingLeft: 8,
                      }}
                    >
                      <div
                        className="flex items-center justify-center mt-0.5 shrink-0"
                        style={{ width: 24, height: 24, background: T.surface2, border: `1px solid ${T.rule}`, borderRadius: 3 }}
                      >
                        <Icon size={11} style={{ color: T.primary }}/>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[12px] truncate" style={{ color: T.ink, fontWeight: isActive ? 500 : 400, lineHeight: 1.3 }}>
                          {t.name}
                        </div>
                        <div className="flex items-center gap-1.5 mt-1 text-[9.5px]" style={{ color: T.muted }}>
                          <span>{t.audience}</span>
                          <span>·</span>
                          <span style={{ fontFamily: FONT_MONO }}>{t.openRate}% open</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-5 py-3" style={{ borderTop: `1px solid ${T.rule}` }}>
          <button className="w-full px-3 py-2 text-[11.5px] flex items-center justify-center gap-1.5 rounded-[3px]" style={{ background: T.primary, color: T.surface, fontWeight: 500 }}>
            <Plus size={12}/> New template
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header
          className="flex items-center px-7 py-3 gap-4"
          style={{ background: T.surface, borderBottom: `1px solid ${T.rule}` }}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className="flex items-center justify-center shrink-0"
              style={{ width: 30, height: 30, background: T.surface2, border: `1px solid ${T.rule}`, borderRadius: 4 }}
            >
              <Icon size={14} style={{ color: T.primary }}/>
            </div>
            <div className="min-w-0">
              <div className="flex items-baseline gap-2">
                <span className="text-[10.5px] uppercase tracking-[0.18em]" style={{ color: T.muted }}>
                  {CATEGORIES.find(c => c.id === tmpl?.cat)?.label} /
                </span>
                <span className="truncate" style={{ fontFamily: FONT_DISPLAY, fontSize: 19, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.01em' }}>
                  {tmpl?.name}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <Pill tone="primary" tiny>{tmpl?.audience}</Pill>
                <span className="text-[10px]" style={{ color: T.muted }}>
                  Sent {tmpl?.sentLast30}× · last 30 days
                </span>
                <span className="text-[10px]" style={{ color: T.ok, fontFamily: FONT_MONO }}>
                  {tmpl?.openRate}% open rate
                </span>
              </div>
            </div>
          </div>

          <div className="flex-1"/>

          {/* View toggle */}
          <div
            className="flex items-center p-0.5 rounded-[4px]"
            style={{ background: T.surface2, border: `1px solid ${T.rule}` }}
          >
            {[
              { k: 'desktop', l: 'Desktop',  i: Monitor    },
              { k: 'mobile',  l: 'Mobile',   i: Smartphone },
              { k: 'code',    l: 'HTML',     i: CodeIcon   },
            ].map(v => {
              const Icon = v.i;
              const isActive = view === v.k;
              return (
                <button
                  key={v.k}
                  onClick={() => setView(v.k)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-[3px] text-[11px]"
                  style={{
                    background: isActive ? T.primary : 'transparent',
                    color: isActive ? T.surface : T.ink2,
                    fontWeight: isActive ? 500 : 400,
                  }}
                >
                  <Icon size={11}/> {v.l}
                </button>
              );
            })}
          </div>

          <button className="p-2 rounded-[3px]" style={{ background: T.surface2, border: `1px solid ${T.rule}` }}>
            <Edit3 size={13} style={{ color: T.ink2 }}/>
          </button>
          <button className="px-3 py-2 text-[11.5px] flex items-center gap-1.5 rounded-[3px]" style={{ background: T.primary, color: T.surface, fontWeight: 500 }}>
            <Send size={12}/> Send test
          </button>
        </header>

        {/* Subject row (mock email metadata) */}
        <div
          className="px-7 py-3"
          style={{ background: T.surface2, borderBottom: `1px solid ${T.rule}` }}
        >
          <div className="grid grid-cols-12 gap-x-6 gap-y-1.5 text-[11.5px]" style={{ maxWidth: 940 }}>
            <div className="col-span-1 uppercase tracking-[0.14em]" style={{ color: T.muted, fontSize: 9.5 }}>From</div>
            <div className="col-span-11" style={{ color: T.ink2, fontFamily: FONT_MONO, fontSize: 11 }}>
              Suresh Patel, EA &lt;suresh@hyktax.co&gt;
            </div>
            <div className="col-span-1 uppercase tracking-[0.14em]" style={{ color: T.muted, fontSize: 9.5 }}>To</div>
            <div className="col-span-11" style={{ color: T.ink2, fontFamily: FONT_MONO, fontSize: 11 }}>
              Cody Whitman &lt;cody@powderriverdrill.com&gt;
            </div>
            <div className="col-span-1 uppercase tracking-[0.14em]" style={{ color: T.muted, fontSize: 9.5 }}>Subject</div>
            <div className="col-span-11" style={{ color: T.ink, fontWeight: 500 }}>
              {tmpl?.subject}
            </div>
          </div>
        </div>

        {/* Preview area */}
        <div className="flex-1 overflow-y-auto" style={{ background: T.bgDeep }}>
          {children}
        </div>
      </main>

      {/* Right inspector */}
      <Inspector tmpl={tmpl}/>
    </div>
  );
}

/* ============================================================
   RIGHT INSPECTOR — variables, send rules, performance
   ============================================================ */
function Inspector({ tmpl }) {
  return (
    <aside
      className="flex flex-col"
      style={{ width: 300, background: T.surface, borderLeft: `1px solid ${T.rule}` }}
    >
      <div className="px-5 pt-5 pb-4" style={{ borderBottom: `1px solid ${T.rule}` }}>
        <div className="text-[9.5px] uppercase tracking-[0.16em]" style={{ color: T.muted, fontWeight: 500 }}>Inspector</div>
        <div className="mt-1" style={{ fontFamily: FONT_DISPLAY, fontSize: 22, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.01em', lineHeight: 1.1 }}>
          {tmpl?.name}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Performance */}
        <div className="px-5 py-4" style={{ borderBottom: `1px solid ${T.rule}` }}>
          <div className="text-[9.5px] uppercase tracking-[0.16em] mb-3" style={{ color: T.muted, fontWeight: 500 }}>30-day performance</div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <div className="text-[9.5px] uppercase tracking-[0.12em]" style={{ color: T.muted }}>Sent</div>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 22, color: T.ink, fontStyle: 'italic', letterSpacing: '-0.01em', lineHeight: 1 }}>
                {tmpl?.sentLast30}
              </div>
            </div>
            <div>
              <div className="text-[9.5px] uppercase tracking-[0.12em]" style={{ color: T.muted }}>Open rate</div>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 22, color: T.ok, fontStyle: 'italic', letterSpacing: '-0.01em', lineHeight: 1 }}>
                {tmpl?.openRate}%
              </div>
            </div>
          </div>
          <div className="mt-3 h-[3px] rounded-full" style={{ background: T.rule }}>
            <div style={{ height: '100%', width: `${tmpl?.openRate}%`, background: T.ok, borderRadius: 999 }}/>
          </div>
          <div className="mt-2 flex items-center gap-1 text-[10.5px]" style={{ color: T.muted }}>
            <ArrowUpRight size={10} style={{ color: T.ok }}/>
            <span>4.2 pts above industry avg</span>
          </div>
        </div>

        {/* Variables */}
        <div className="px-5 py-4" style={{ borderBottom: `1px solid ${T.rule}` }}>
          <div className="text-[9.5px] uppercase tracking-[0.16em] mb-3" style={{ color: T.muted, fontWeight: 500 }}>Merge variables</div>
          <div className="flex flex-col gap-1.5">
            {[
              ['{{ client.first_name }}',     'Cody'],
              ['{{ client.entity_name }}',    'Powder River Drilling'],
              ['{{ engagement.fee }}',         '$1,850'],
              ['{{ engagement.scope }}',       'Form 1065 + K-1s'],
              ['{{ firm.name }}',              'HYK Tax'],
              ['{{ firm.contact }}',           'Suresh Patel, EA'],
            ].map(([k, v], i) => (
              <div key={i} className="flex items-center justify-between gap-2 text-[10.5px]" style={{ color: T.muted }}>
                <span style={{ fontFamily: FONT_MONO, color: T.copper }}>{k}</span>
                <span style={{ color: T.ink, fontFamily: FONT_BODY, fontWeight: 500 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Send rules */}
        <div className="px-5 py-4" style={{ borderBottom: `1px solid ${T.rule}` }}>
          <div className="text-[9.5px] uppercase tracking-[0.16em] mb-3" style={{ color: T.muted, fontWeight: 500 }}>Send rules</div>
          <div className="flex flex-col gap-2.5">
            {[
              { i: Zap,      k: 'Trigger',     v: tmpl?.id === 'welcome' ? 'On client onboarding' : tmpl?.id === 'invoice' ? 'On invoice issue' : 'Manual or scheduled' },
              { i: Clock,    k: 'Send window', v: 'Mon–Fri · 9am–5pm MDT' },
              { i: Globe,    k: 'Time zone',    v: 'Client local time' },
              { i: Bell,     k: 'Follow-up',    v: 'After 3 days · once' },
            ].map((r, i) => {
              const Icon = r.i;
              return (
                <div key={i} className="flex items-start gap-2 text-[11px]">
                  <Icon size={11} style={{ color: T.primary, marginTop: 2, flexShrink: 0 }}/>
                  <div className="flex-1 min-w-0">
                    <div className="text-[9.5px] uppercase tracking-[0.12em]" style={{ color: T.muted }}>{r.k}</div>
                    <div style={{ color: T.ink2, lineHeight: 1.4 }}>{r.v}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI suggestions */}
        <div className="px-5 py-4">
          <div className="text-[9.5px] uppercase tracking-[0.16em] mb-3 flex items-center gap-1.5" style={{ color: T.muted, fontWeight: 500 }}>
            <Sparkles size={10} style={{ color: T.copper }}/> AI suggestions
          </div>
          <div className="flex flex-col gap-2">
            {[
              'Subject line A/B: "Quick favor, Cody?" tested 14% higher open rate',
              'Add a calendar link button for clients to book follow-up',
              'Move CTA above first paragraph on mobile',
            ].map((s, i) => (
              <button
                key={i}
                className="flex items-start gap-2 p-2 text-left rounded-[3px]"
                style={{ background: T.surface2, border: `1px dashed ${T.rule2}` }}
              >
                <Plus size={10} style={{ color: T.copper, marginTop: 3, flexShrink: 0 }}/>
                <span className="text-[11px]" style={{ color: T.ink2, lineHeight: 1.4 }}>{s}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-5 py-4" style={{ borderTop: `1px solid ${T.rule}` }}>
        <button className="w-full text-[11.5px] py-2 rounded-[3px] flex items-center justify-center gap-1.5" style={{ background: T.surface2, color: T.ink2, border: `1px solid ${T.rule}` }}>
          <Copy size={11}/> Duplicate template
        </button>
      </div>
    </aside>
  );
}

/* ============================================================
   PREVIEW VARIANTS
   ============================================================ */
function MailClientChrome({ children }) {
  return (
    <div
      className="mx-auto my-8"
      style={{
        maxWidth: 720,
        background: T.surface, borderRadius: 6,
        border: `1px solid ${T.rule}`,
        boxShadow: '0 30px 60px -30px rgba(20,15,8,0.18)',
        overflow: 'hidden',
      }}
    >
      {/* Mock mail client header */}
      <div className="px-5 py-3 flex items-center gap-3" style={{ background: T.surface2, borderBottom: `1px solid ${T.rule}` }}>
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#E5C0AC' }}/>
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#EAD79A' }}/>
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#B8D4BE' }}/>
        </div>
        <div className="flex-1 flex items-center gap-2 text-[10.5px]" style={{ color: T.muted }}>
          <Mail size={12}/>
          <span>Inbox · cody@powderriverdrill.com</span>
        </div>
        <Pill tone="primary" tiny>Apple Mail · macOS</Pill>
      </div>
      {children}
    </div>
  );
}

function MobileMailFrame({ children }) {
  return (
    <div className="flex justify-center py-12">
      <div
        style={{
          width: 380, borderRadius: 50,
          background: '#1a1612', padding: 11,
          boxShadow: '0 50px 90px -30px rgba(20,15,8,0.45), 0 25px 50px -20px rgba(20,15,8,0.25)',
        }}
      >
        <div
          className="overflow-hidden flex flex-col"
          style={{ width: '100%', height: 760, borderRadius: 40, background: T.bg }}
        >
          {/* Status bar */}
          <div
            className="flex items-center justify-between px-7 relative"
            style={{ height: 40, paddingTop: 12, fontSize: 13, fontWeight: 600, color: T.ink }}
          >
            <span>9:41</span>
            <div
              style={{
                position: 'absolute', left: '50%', top: 8, transform: 'translateX(-50%)',
                width: 110, height: 26, background: '#000', borderRadius: 999,
              }}
            />
            <div className="flex items-center gap-1">
              <Globe size={11}/>
              <Lock size={11}/>
            </div>
          </div>

          {/* Mail header */}
          <div className="px-4 py-2 flex items-center gap-2" style={{ background: T.surface, borderBottom: `1px solid ${T.rule}` }}>
            <ChevronLeft size={18} style={{ color: T.copper }}/>
            <Mail size={13} style={{ color: T.muted }}/>
            <span className="text-[11px]" style={{ color: T.muted }}>Inbox</span>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto" style={{ background: T.bg }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

function CodeView({ tmpl }) {
  const code = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${tmpl?.subject}</title>
  <style>
    body { margin: 0; background: #F4EFE6; font-family: 'Geist', system-ui, sans-serif; color: #171411; }
    .container { max-width: 600px; margin: 0 auto; padding: 28px 24px; }
    .letterhead { background: #FFFDF8; padding: 32px 36px 16px; border-top: 3px solid #C46A2D; }
    .body { background: #FFFDF8; padding: 16px 36px 36px; }
    .footer { background: #FAF6EC; padding: 24px 36px; border-top: 1px solid #E5DDC9; font-size: 11px; color: #7A7163; }
    h1 { font-family: 'Instrument Serif', Georgia, serif; font-size: 34px; line-height: 1.05;
         font-style: italic; letter-spacing: -0.02em; color: #171411; margin: 20px 0 4px; }
    .eyebrow { font-size: 10.5px; letter-spacing: 0.18em; color: #C46A2D;
               text-transform: uppercase; font-weight: 500; }
    .btn { display: inline-flex; align-items: center; gap: 6px; background: #0B3D3A;
           color: #FFFDF8; font-weight: 500; padding: 12px 22px; border-radius: 4px;
           text-decoration: none; font-size: 14px; }
    .card { background: #FAF6EC; border: 1px solid #E5DDC9; border-left: 3px solid #C46A2D;
            border-radius: 4px; padding: 16px; margin: 16px 0; }
    p { font-size: 14.5px; color: #3B342B; line-height: 1.7; margin: 16px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="letterhead">
      <!-- HYK Tax brand mark -->
    </div>
    <div class="body">
      <div class="eyebrow">${tmpl?.cat === 'engagement' ? 'Action requested' : 'Welcome aboard'}</div>
      <h1>{{ greeting_serif }}</h1>
      <p>{{ body_paragraph_1 }}</p>
      <div class="card">
        {{ structured_data_block }}
      </div>
      <a class="btn" href="{{ portal_link }}">{{ cta_label }} →</a>
      <p>— {{ firm.contact }}<br/>{{ firm.contact_title }}</p>
    </div>
    <div class="footer">
      {{ firm.footer_signature }}
    </div>
  </div>
</body>
</html>`;
  return (
    <div className="px-12 py-8">
      <div className="text-[10.5px] uppercase tracking-[0.16em] mb-3 flex items-center gap-1.5" style={{ color: T.muted, fontWeight: 500 }}>
        <CodeIcon size={11}/> Email source · MJML-compiled HTML
      </div>
      <div
        style={{
          background: T.primaryDk, color: '#D4CDB6', borderRadius: 4,
          padding: 24, fontFamily: FONT_MONO, fontSize: 12, lineHeight: 1.7,
          maxWidth: 920, overflow: 'auto',
        }}
      >
        <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
          {code}
        </pre>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <button className="text-[11px] px-3 py-1.5 rounded-[3px] flex items-center gap-1.5" style={{ background: T.surface, color: T.ink2, border: `1px solid ${T.rule}` }}>
          <Copy size={11}/> Copy HTML
        </button>
        <button className="text-[11px] px-3 py-1.5 rounded-[3px] flex items-center gap-1.5" style={{ background: T.surface, color: T.ink2, border: `1px solid ${T.rule}` }}>
          <Download size={11}/> Download .mjml
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   APP
   ============================================================ */
export default function App() {
  const [activeId, setActiveId] = useState('welcome');
  const [view, setView] = useState('desktop');

  useEffect(() => {
    const id = 'ledger-emails-fonts';
    if (document.getElementById(id)) return;
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap';
    document.head.appendChild(link);
  }, []);

  const tmpl = TEMPLATES.find(t => t.id === activeId);

  return (
    <Shell activeId={activeId} setActiveId={setActiveId} view={view} setView={setView}>
      {view === 'desktop' && (
        <MailClientChrome>
          {renderTemplate(activeId, false)}
        </MailClientChrome>
      )}
      {view === 'mobile' && (
        <MobileMailFrame>
          {renderTemplate(activeId, true)}
        </MobileMailFrame>
      )}
      {view === 'code' && <CodeView tmpl={tmpl}/>}
    </Shell>
  );
}
