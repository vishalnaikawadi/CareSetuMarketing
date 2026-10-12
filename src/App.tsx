import { FormEvent, useState } from 'react'
import {
  Activity,
  ArrowDown,
  ArrowUpRight,
  Bot,
  CalendarDays,
  Check,
  CheckCircle2,
  CircleAlert,
  Clock3,
  FlaskConical,
  FileText,
  HeartPulse,
  Layers3,
  Hospital,
  LoaderCircle,
  Mail,
  Menu,
  ShieldCheck,
  Stethoscope,
  Pill,
  Search,
  UserRound,
  X,
  Languages,
  Mic,
  Printer,
  QrCode,
} from 'lucide-react'
import {
  features,
  audiences,
  careSettingOptions,
  interestOptions,
  navigation,
  serviceModelOptions,
  willingnessToPayOptions,
  roles,
  specialtyModules,
} from './config/content'
import type { InterestLevel, WaitlistFormData } from './types'

const initialForm: WaitlistFormData = {
  name: '',
  email: '',
  role: '',
  careSettings: [],
  interestLevel: '',
  featuresSelected: [],
  featuresToExclude: [],
  serviceModels: [],
  serviceModelOther: '',
  willingnessToPay: '',
  willingnessToPayOther: '',
  missingFeatures: '',
  generalFeedback: '',
  website: '',
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

const SUBMISSION_SETTLE_TIMEOUT_MS = 6_000

function BrandMark() {
  return (
    <span className="grid h-10 w-10 place-items-center rounded-xl bg-ink text-teal-200 shadow-card" aria-hidden="true">
      <svg viewBox="0 0 32 32" className="h-6 w-6" fill="none">
        <path d="M4 16h6l3-7 5 14 3-7h7" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )
}

function CareNetworkDiagram() {
  const partners = [
    { label: 'Doctors', icon: Stethoscope },
    { label: 'Labs', icon: FlaskConical },
    { label: 'Pharmacies', icon: Pill },
    { label: 'Patients', icon: UserRound },
  ]
  const leftPartners = [partners[0], partners[3]]
  const rightPartners = [partners[1], partners[2]]
  const renderPartner = (partner: (typeof partners)[number], side: 'left' | 'right') => {
    const Icon = partner.icon
    const connector = side === 'left'
      ? "after:absolute after:right-0 after:top-1/2 after:h-[2px] after:w-8 after:translate-x-full after:-translate-y-1/2 after:bg-[#93d5cf] after:content-['']"
      : "before:absolute before:left-0 before:top-1/2 before:h-[2px] before:w-8 before:-translate-x-full before:-translate-y-1/2 before:bg-[#93d5cf] before:content-['']"
    return <div key={partner.label} className={`relative z-10 flex min-h-[62px] items-center justify-center gap-2.5 rounded-2xl border border-line bg-[#f5f9f8] px-3 text-sm font-semibold text-ink shadow-card ${connector}`}><Icon size={18} className="shrink-0 text-teal-700" aria-hidden="true" /><span>{partner.label}</span></div>
  }

  return (
    <figure className="mx-auto w-full max-w-5xl rounded-3xl border border-line bg-white p-4 shadow-card sm:p-7" aria-label="Proposed Care Setu care network">
      <figcaption className="sr-only">Doctors, labs, pharmacies and patients connected through Care Setu, with facility permissions and integrations.</figcaption>
      <div className="mx-auto hidden w-full max-w-[800px] grid-cols-[minmax(0,1fr)_180px_minmax(0,1fr)] items-center gap-x-8 md:grid">
        <div className="grid gap-y-7">{leftPartners.map((partner) => renderPartner(partner, 'left'))}</div>
        <div className="relative z-20 grid h-[112px] w-[180px] place-content-center rounded-[2rem] bg-ink text-center text-white shadow-card">
          <span className="mx-auto mb-2 h-1 w-9 rounded-full bg-teal-200" aria-hidden="true" />
          <span className="text-lg font-semibold">Care Setu</span>
          <span className="mt-1 text-[11px] text-slate-200">Shared care platform</span>
        </div>
        <div className="grid gap-y-7">{rightPartners.map((partner) => renderPartner(partner, 'right'))}</div>
      </div>
      <div className="md:hidden">
        <div className="mx-auto grid min-h-20 max-w-[240px] place-content-center rounded-2xl bg-ink px-5 text-center text-white shadow-card">
          <span className="text-base font-semibold">Care Setu</span><span className="mt-1 text-[11px] text-slate-200">Shared care platform</span>
        </div>
        <div className="mx-auto h-6 w-px bg-[#93d5cf]" aria-hidden="true" />
        <div className="mx-auto h-px max-w-[270px] bg-[#93d5cf]" aria-hidden="true" />
        <div className="mx-auto grid max-w-[320px] grid-cols-2 gap-3">
          {partners.map(({ label, icon: Icon }) => <div key={label} className="relative flex min-h-14 items-center justify-center gap-2 rounded-xl border border-line bg-[#f5f9f8] px-2 text-sm font-semibold text-ink shadow-sm before:absolute before:-top-3 before:left-1/2 before:h-3 before:w-px before:bg-[#93d5cf] before:content-['']"><Icon size={17} className="shrink-0 text-teal-700" aria-hidden="true" /><span>{label}</span></div>)}
        </div>
      </div>
      <p className="mt-4 text-center text-xs leading-5 text-slate-500">Illustrative network · access and connections depend on facility requirements, permissions and validated integrations.</p>
    </figure>
  )
}
function HospitalDashboardMock() {
  return (
    <figure className="overflow-hidden rounded-2xl border border-line bg-white shadow-soft" aria-label="Illustrative hospital operations dashboard with fictional data">
      <figcaption className="sr-only">Concept hospital dashboard showing appointments, arrivals, care teams, and a patient queue.</figcaption>
      <div className="flex items-center justify-between border-b border-line bg-white px-4 py-3 sm:px-5">
        <div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-xl bg-teal-50 text-teal-700"><Hospital size={19} aria-hidden="true" /></span><div><p className="text-sm font-semibold">Care Setu <span className="font-normal text-slate-500">/ Hospital overview</span></p><p className="text-[11px] text-slate-500">Illustrative concept · fictional data</p></div></div>
        <span className="rounded-full border border-line bg-mist px-3 py-1 text-xs font-medium text-slate-600">Today</span>
      </div>
      <div className="grid sm:grid-cols-[120px_1fr]">
        <aside className="hidden border-r border-line bg-mist/70 p-4 sm:block" aria-hidden="true"><p className="mb-4 text-[10px] font-semibold uppercase tracking-wider text-slate-500">Workspace</p>{['Overview', 'Appointments', 'Care teams', 'Departments'].map((item, index) => <div key={item} className={`mb-1 rounded-lg px-2 py-2 text-[11px] ${index === 0 ? 'bg-white font-semibold text-ink shadow-sm' : 'text-slate-500'}`}>{item}</div>)}</aside>
        <div className="min-w-0 p-4 sm:p-5">
          <div className="mb-4 flex items-end justify-between"><div><p className="text-xs text-slate-500">Monday · daily snapshot</p><h3 className="mt-1 text-lg font-semibold">Hospital overview</h3></div><span className="text-[11px] font-medium text-teal-700">All departments</span></div>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            { [['Appointments','128'],['Arrived','34'],['Care teams','12']].map(([label,value]) => <div key={label} className="rounded-xl border border-line bg-[#f5f9f8] p-2.5 sm:p-3"><p className="text-[10px] leading-4 text-slate-500 sm:text-xs">{label}</p><p className="mt-1 text-lg font-semibold tracking-tight text-ink sm:text-xl">{value}</p></div>) }
          </div>
          <div className="mt-3 grid gap-3 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-xl border border-line p-3 sm:p-4"><div className="flex items-center justify-between"><p className="text-xs font-semibold">Current queue</p><span className="text-[10px] text-slate-500">34 patients</span></div><div className="mt-2 divide-y divide-line">{[['General medicine','12 waiting'],['Cardiology','8 waiting'],['Pediatrics','6 waiting']].map(([dept,count]) => <div key={dept} className="flex items-center justify-between gap-2 py-2"><span className="truncate text-[11px] text-slate-700">{dept}</span><span className="shrink-0 rounded-full bg-teal-50 px-2 py-1 text-[10px] font-medium text-teal-700">{count}</span></div>)}</div></div>
            <div className="rounded-xl border border-line bg-mist/60 p-3 sm:p-4"><p className="text-xs font-semibold">Connected services</p><div className="mt-3 flex flex-wrap gap-1.5">{['Doctors','Labs','Pharmacies','Patients'].map((service) => <span key={service} className="rounded-full border border-line bg-white px-2.5 py-1.5 text-[10px] font-medium text-slate-600">{service}</span>)}</div><p className="mt-3 text-[10px] leading-4 text-slate-500">Connections shown as a concept; availability varies by facility.</p></div>
          </div>
        </div>
      </div>
    </figure>
  )
}

function LabTrendsMock() {
  return (
    <figure className="overflow-hidden rounded-2xl border border-line bg-white shadow-card" aria-label="Concept clinician screen showing lab findings as a trend with links to source reports">
      <figcaption className="border-b border-line px-5 py-5">
      <p className="eyebrow">Clinician panel · concept screen</p>
        <h3 className="mt-2 text-xl font-semibold">Lab changes at a glance.</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">Compare findings across visits, then open the original report to verify.</p>
      </figcaption>
      <div className="border-b border-line bg-white px-4 py-3 sm:px-5">
        <div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-xl bg-teal-50 text-teal-700"><FlaskConical size={18} aria-hidden="true" /></span><div><p className="text-sm font-semibold">Care Setu <span className="font-normal text-slate-500">/ Patient results</span></p><p className="text-[11px] text-slate-500">Concept screen · fictional data</p></div></div>
      </div>
      <div className="bg-[#f2f7f7] p-4 sm:p-5">
        <div className="flex items-center justify-between gap-2"><div><p className="text-[10px] font-semibold uppercase tracking-wider text-teal-700">Selected patient · sample record</p><p className="mt-1 text-sm font-semibold text-ink">Result history</p></div><span className="rounded-full border border-line bg-white px-2.5 py-1 text-[10px] font-medium text-slate-600">4 reports</span></div>
        <div className="mt-3 rounded-xl border border-line bg-white p-3 sm:p-4">
          <div className="flex items-start justify-between gap-2"><div><p className="text-xs font-semibold">Hemoglobin</p><p className="mt-1 text-[10px] text-slate-500">Illustrative values · g/dL</p></div><span className="text-[10px] font-medium text-slate-500">Across visits</span></div>
          <svg className="mt-2 h-28 w-full" viewBox="0 0 320 112" role="img" aria-label="Fictional hemoglobin trend: 12.8 in March, 13.4 in May, 13.1 in July and 14.0 in September grams per decilitre. No clinical interpretation is shown.">
            <path d="M18 24H306M18 54H306M18 84H306" stroke="#dbe6e6" strokeWidth="1" />
            <path d="M28 78 L112 58 L196 67 L284 34" fill="none" stroke="#138f87" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            {[[28,68,'12.8'],[112,48,'13.4'],[196,57,'13.1'],[284,24,'14.0']].map(([cx,cy,value]) => <text key={`${cx}-${value}`} x={cx} y={cy} textAnchor="middle" fill="#334155" fontSize="10" fontWeight="600">{value}</text>)}
            {[[28,78],[112,58],[196,67],[284,34]].map(([cx,cy]) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4.5" fill="white" stroke="#138f87" strokeWidth="2.5" />)}
            <text x="28" y="105" textAnchor="middle" fill="#718096" fontSize="10">Mar</text><text x="112" y="105" textAnchor="middle" fill="#718096" fontSize="10">May</text><text x="196" y="105" textAnchor="middle" fill="#718096" fontSize="10">Jul</text><text x="284" y="105" textAnchor="middle" fill="#718096" fontSize="10">Sep</text>
          </svg>
          <div className="mt-1 flex items-center justify-between gap-2 border-t border-line pt-3"><span className="text-[10px] font-medium text-slate-600">Source reports</span><span className="inline-flex items-center gap-1 text-[10px] font-semibold text-teal-700">Open report <ArrowUpRight size={12} aria-hidden="true" /></span></div>
          <div className="mt-2 grid grid-cols-2 gap-2"><span className="rounded-lg bg-mist px-2.5 py-2 text-[10px] text-slate-600">CBC · 21 Sep</span><span className="rounded-lg bg-mist px-2.5 py-2 text-[10px] text-slate-600">CBC · 18 Jul</span><span className="rounded-lg bg-mist px-2.5 py-2 text-[10px] text-slate-600">CBC · 24 May</span><span className="rounded-lg bg-mist px-2.5 py-2 text-[10px] text-slate-600">CBC · 11 Mar</span></div>
        </div>
        <p className="mt-3 text-[10px] leading-4 text-slate-500">Trend for quick review; the original reports remain available for clinician verification.</p>
      </div>
    </figure>
  )
}

function FacilityRolesMock() {
  const profiles = [
    ['Administrator', 'Facility setup · users · audit'],
    ['Department lead', 'Department setup · team access'],
    ['Doctor', 'Assigned records · consultations'],
    ['Nurse', 'Team worklists · patient observations'],
    ['Triage / registration', 'Arrival · queue status'],
    ['Laboratory', 'Orders · results'],
    ['Pharmacy', 'Prescriptions · handoffs'],
    ['Patient', 'Own care plan · check-ins'],
  ]

  return (
    <figure className="overflow-hidden rounded-2xl border border-line bg-white shadow-card" aria-label="Concept hospital setup screen showing distinct role-based interfaces and access">
      <figcaption className="border-b border-line px-5 py-5">
        <p className="eyebrow">Hospital setup · concept screen</p>
        <h3 className="mt-2 text-xl font-semibold">A workspace for each role.</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">We’ll customise the interface and access to fit your hospital’s roles, workflows and requirements.</p>
      </figcaption>
      <div className="border-b border-line bg-white px-4 py-3 sm:px-5">
        <div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-xl bg-teal-50 text-teal-700"><Hospital size={18} aria-hidden="true" /></span><div><p className="text-sm font-semibold">Care Setu <span className="font-normal text-slate-500">/ Facility workspace</span></p><p className="text-[11px] text-slate-500">Illustrative configuration · facility-defined access</p></div></div>
      </div>
      <div className="bg-[#f2f7f7] p-4 sm:p-5">
        <div className="flex items-center justify-between gap-2"><div><p className="text-[10px] font-semibold uppercase tracking-wider text-teal-700">Access profiles</p><p className="mt-1 text-sm font-semibold text-ink">Responsibility-specific panels</p></div><span className="rounded-full border border-teal-200 bg-teal-50 px-2.5 py-1 text-[10px] font-medium text-teal-700">Set with your team</span></div>
        <div className="mt-3 overflow-hidden rounded-xl border border-line bg-white">
          {profiles.map(([role, scope], index) => <div key={role} className={`grid grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] items-center gap-2 px-3 py-2.5 ${index < profiles.length - 1 ? 'border-b border-line' : ''}`}><span className="text-[11px] font-semibold text-ink">{role}</span><span className="text-[10px] leading-4 text-slate-600">{scope}</span></div>)}
        </div>
        <p className="mt-3 text-[10px] leading-4 text-slate-500">Illustrative panels only. Your hospital defines the hierarchy, visibility, permissions and approval steps.</p>
      </div>
    </figure>
  )
}

function SharedReportsMock() {
  const reports = [
    { name: 'CBC report · 21 Sep', kind: 'OCR text' },
    { name: 'Radiology report · 02 Oct', kind: 'OCR text' },
    { name: 'Handwritten note · 03 Oct', kind: 'Image only' },
  ]

  return (
    <figure className="overflow-hidden rounded-2xl border border-line bg-white shadow-card" aria-label="Proposed report-sharing workflow showing OCR text from printed reports, handwritten reports retained as images, shared source files and clinician-reviewed guideline prompts">
      <figcaption className="border-b border-line px-5 py-5">
        <p className="eyebrow">Shared reports · proposed concept</p>
        <h3 className="mt-2 text-xl font-semibold">The same report in patient and doctor panels.</h3>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">Printed lab and radiology reports could be read with OCR and shown with the original in both authorized panels. Handwritten reports stay as images. Proposed findings flags remain subject to clinician review.</p>
      </figcaption>
      <div className="grid gap-4 bg-[#f2f7f7] p-4 sm:p-5 md:grid-cols-2">
        <section className="overflow-hidden rounded-xl border border-line bg-white" aria-label="Patient report upload concept">
          <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3"><div className="flex items-center gap-2"><span className="grid h-8 w-8 place-items-center rounded-lg bg-teal-50 text-teal-700"><UserRound size={16} aria-hidden="true" /></span><div><p className="text-xs font-semibold">Patient interface</p><p className="text-[10px] text-slate-500">Concept · sample record</p></div></div><span className="rounded-full bg-teal-50 px-2 py-1 text-[10px] font-medium text-teal-700">My reports</span></div>
          <div className="p-4"><p className="text-sm font-semibold">Add a report</p><p className="mt-1 text-[11px] leading-4 text-slate-500">OCR can read printed reports. Handwritten reports stay as photos; original files remain on your profile.</p><div className="mt-3 grid grid-cols-2 gap-2"><span className="rounded-lg bg-teal-700 px-3 py-2.5 text-center text-[11px] font-semibold text-white">Scan report</span><span className="rounded-lg border border-line bg-white px-3 py-2.5 text-center text-[11px] font-semibold text-ink">Upload PDF</span></div><div className="mt-4 rounded-lg border border-line bg-[#f5f9f8] p-3"><p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Shared to your care record</p>{reports.map((report) => <div key={report.name} className="mt-2 flex items-center gap-2 text-[10px] text-slate-700"><FileText size={14} className="shrink-0 text-teal-700" aria-hidden="true" /><span className="min-w-0 flex-1">{report.name}</span><span className="shrink-0 rounded-full bg-white px-2 py-1 text-[9px] text-slate-600">{report.kind}</span><CheckCircle2 size={13} className="shrink-0 text-teal-700" aria-hidden="true" /></div>)}</div></div>
        </section>
        <section className="overflow-hidden rounded-xl border border-line bg-white" aria-label="Doctor and clinician report review concept">
          <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3"><div className="flex items-center gap-2"><span className="grid h-8 w-8 place-items-center rounded-lg bg-teal-50 text-teal-700"><Stethoscope size={16} aria-hidden="true" /></span><div><p className="text-xs font-semibold">Doctor / clinician panel</p><p className="text-[10px] text-slate-500">Same patient record · concept</p></div></div><span className="rounded-full border border-line bg-white px-2 py-1 text-[10px] font-medium text-slate-600">Results</span></div>
          <div className="p-4"><div><p className="text-sm font-semibold">Reports for review</p><p className="mt-1 text-[11px] text-slate-500">OCR text links to the original; handwritten reports remain image-only.</p></div><div className="mt-3 grid grid-cols-2 gap-2"><span className="rounded-lg bg-teal-700 px-2 py-2.5 text-center text-[10px] font-semibold text-white">Scan report</span><span className="rounded-lg border border-line bg-white px-2 py-2.5 text-center text-[10px] font-semibold text-ink">Upload PDF</span></div><div className="mt-3 rounded-lg border border-line bg-[#f5f9f8] p-3">{reports.map((report) => <div key={report.name} className="flex items-center gap-2 py-1.5 text-[10px] text-slate-700"><FileText size={14} className="shrink-0 text-teal-700" aria-hidden="true" /><span className="min-w-0 flex-1">{report.name}</span><span className="shrink-0 rounded-full bg-white px-2 py-1 text-[9px] text-slate-600">{report.kind}</span><ArrowUpRight size={12} className="shrink-0 text-slate-400" aria-hidden="true" /></div>)}</div><div className="mt-3 rounded-lg border border-teal-200 bg-teal-50 p-3"><div className="flex items-center gap-2"><ShieldCheck size={14} className="text-teal-700" aria-hidden="true" /><p className="text-[10px] font-semibold text-teal-800">Guideline-triggered flag · clinician review</p></div><p className="mt-1 text-[10px] leading-4 text-slate-600">Verify OCR values against the source image before clinical use. Care decisions remain with the clinical team.</p></div></div>
        </section>
      </div>
      <p className="px-5 pb-5 text-xs leading-5 text-slate-500">Proposed flags would use only documented, version-controlled rules derived from clinical guidelines selected and approved by the hospital (WHO, ACOG, ADA, AHA, CDC and ICMR). Clinical governance would validate each rule, source version and local threshold before use. Every flag would show its source and prompt clinician review; it would not diagnose or recommend treatment.</p>
    </figure>
  )
}

function LongitudinalRecordMock() {
  const events = [
    ['Today', 'Facility visit', 'History, measurements and visit actions'],
    ['10 Oct', 'Flagged result', 'Source-linked result · clinician review'],
    ['08 Oct', 'Pending test', 'Follow-up result not yet received'],
    ['29 Sep', 'Referral', 'Cardiology handover · reply pending'],
  ]

  return (
    <figure className="overflow-hidden rounded-2xl border border-line bg-white shadow-card" aria-label="Illustrative patient timeline, QR care handover and voice history capture with fictional data">
      <figcaption className="border-b border-line px-5 py-5">
        <p className="eyebrow">Clinician panel · concept screen</p>
        <h3 className="mt-2 text-xl font-semibold">One patient story, ready to review.</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">Visits, reports, prescriptions, referrals and next steps in one chronological record.</p>
      </figcaption>
      <div className="border-b border-line bg-white px-4 py-3 sm:px-5">
        <div className="flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-xl bg-teal-50 text-teal-700"><Activity size={18} aria-hidden="true" /></span><div><p className="text-sm font-semibold">Care Setu <span className="font-normal text-slate-500">/ Patient record</span></p><p className="text-[11px] text-slate-500">Concept screen · fictional patient data</p></div></div><span className="rounded-full border border-line bg-mist px-3 py-1 text-[10px] font-medium text-slate-600">Aarav Mehta · sample</span></div>
      </div>
      <div className="grid gap-4 bg-[#f2f7f7] p-4 sm:p-5 lg:grid-cols-[1.2fr_.8fr]">
        <div className="rounded-xl border border-line bg-white p-4">
          <div className="flex items-center justify-between gap-2"><div><p className="text-xs font-semibold">Patient timeline</p><p className="mt-1 text-[10px] text-slate-500">Relevant history · actions · what’s next</p></div><span className="rounded-full bg-teal-50 px-2.5 py-1 text-[10px] font-semibold text-teal-800">4 recent items</span></div>
          <ol className="mt-4 space-y-3 border-l border-teal-200 pl-4">
            {events.map(([date, title, description]) => <li key={date + title} className="relative"><span className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-teal-600 ring-1 ring-teal-200" /><p className="text-[10px] font-medium text-slate-500">{date}</p><p className="mt-0.5 text-xs font-semibold text-ink">{title}</p><p className="mt-0.5 text-[10px] leading-4 text-slate-600">{description}</p></li>)}
          </ol>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          <div className="rounded-xl border border-teal-100 bg-[#e6f4f2] p-4"><div className="flex items-start gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white text-teal-700"><QrCode size={23} aria-hidden="true" /></span><div><p className="text-xs font-semibold">QR care handover</p><p className="mt-1 text-[10px] leading-4 text-slate-600">Patient-authorized summary for urgent care and handovers across providers and facilities.</p></div></div><p className="mt-3 border-t border-teal-100 pt-2 text-[10px] leading-4 text-slate-600">Essential details first · full record after facility verification.</p></div>
          <div className="rounded-xl border border-line bg-white p-4"><div className="flex items-center gap-2"><span className="grid h-8 w-8 place-items-center rounded-lg bg-teal-50 text-teal-700"><Mic size={16} aria-hidden="true" /></span><div><p className="text-xs font-semibold">Voice-to-text history</p><p className="text-[10px] text-slate-500">Clinician review before saving</p></div></div><div className="mt-3 rounded-lg bg-mist p-3"><p className="text-[10px] font-medium text-slate-500">Transcript preview</p><p className="mt-1 text-[11px] leading-4 text-slate-700">“Symptoms began last week…”</p></div><p className="mt-2 text-[10px] text-slate-500">Illustrative transcript · fictional data</p></div>
        </div>
      </div>
      <p className="px-5 pb-5 text-xs leading-5 text-slate-500">A QR code would reveal only the patient-authorized summary; access to the full record would follow facility identity and permission checks.</p>
    </figure>
  )
}

function ClinicianAssistantMock() {
  return (
    <figure className="overflow-hidden rounded-2xl border border-line bg-white text-ink shadow-soft" aria-label="Illustrative patient-scoped AI chart search with fictional data and source references">
      <figcaption className="sr-only">A clinician selects one patient, asks about that patient's record, and receives a source-linked answer for verification.</figcaption>
      <div className="flex items-center justify-between border-b border-line bg-white px-4 py-3 sm:px-5">
        <div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-xl bg-teal-50 text-teal-700"><Bot size={19} aria-hidden="true" /></span><div><p className="text-sm font-semibold">Care Setu <span className="font-normal text-slate-500">/ Clinician assistant</span></p><p className="text-[11px] text-slate-500">Concept screen · fictional patient data</p></div></div>
        <span className="rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-[10px] font-semibold text-teal-700">Patient selected</span>
      </div>
      <div className="grid sm:grid-cols-[132px_1fr]">
        <aside className="hidden border-r border-line bg-mist p-3 sm:block"><p className="mb-3 px-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">Patient record</p>{['Overview', 'Encounters', 'Medications', 'Results'].map((item, index) => <div key={item} className={`mb-1 rounded-lg px-2 py-2 text-[11px] ${index === 0 ? 'bg-white font-semibold text-ink shadow-sm' : 'text-slate-500'}`}>{item}</div>)}</aside>
        <div className="min-w-0 bg-[#f2f7f7] p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-[10px] font-semibold uppercase tracking-wider text-teal-700">Active patient context</p><p className="mt-1 text-sm font-semibold">Aarav Mehta <span className="font-normal text-slate-500">· fictional record</span></p></div><span className="rounded-full border border-line bg-white px-2.5 py-1 text-[10px] text-slate-600">CS-048271</span></div>
          <div className="mt-4 rounded-xl border border-line bg-white p-3 sm:p-4"><p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Ask about this patient’s record</p><div className="mt-2 flex items-start gap-2 rounded-lg bg-mist p-3 text-xs leading-5 text-slate-700"><Search size={15} className="mt-0.5 shrink-0 text-teal-700" aria-hidden="true" /><span>Summarise the recent visits and show me the source notes.</span></div></div>
          <div className="mt-3 rounded-xl border border-teal-100 bg-[#e6f4f2] p-3 sm:p-4"><div className="flex items-center gap-2"><span className="grid h-6 w-6 place-items-center rounded-lg bg-teal-700 text-white"><Bot size={14} aria-hidden="true" /></span><p className="text-xs font-semibold">Record summary · review before use</p></div><p className="mt-3 text-xs leading-5 text-slate-700">Three encounters are available in this sample record. Open a source below to verify the details in context.</p><div className="mt-3 grid gap-2 sm:grid-cols-2"><div className="flex items-center gap-2 rounded-lg border border-line bg-white p-2.5"><FileText size={15} className="shrink-0 text-teal-700" aria-hidden="true" /><span className="min-w-0"><span className="block truncate text-[10px] font-semibold">Consultation note</span><span className="block text-[10px] text-slate-500">12 Oct · source record</span></span><ArrowUpRight size={13} className="ml-auto shrink-0 text-slate-400" aria-hidden="true" /></div><div className="flex items-center gap-2 rounded-lg border border-line bg-white p-2.5"><FileText size={15} className="shrink-0 text-teal-700" aria-hidden="true" /><span className="min-w-0"><span className="block truncate text-[10px] font-semibold">Follow-up note</span><span className="block text-[10px] text-slate-500">28 Sep · source record</span></span><ArrowUpRight size={13} className="ml-auto shrink-0 text-slate-400" aria-hidden="true" /></div></div></div>
          <p className="mt-3 text-[10px] leading-4 text-slate-500">Proposed retrieval support only · answers limited to connected, permitted records · no diagnosis or treatment decision.</p>
        </div>
      </div>
    </figure>
  )
}

function PatientPortalMock() {
  const medicationWeek = [
    ['M', '12', true], ['T', '13', true], ['W', '14', true], ['T', '15', true],
    ['F', '16', false], ['S', '17', false], ['S', '18', false],
  ] as const

  return (
    <figure className="mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-line bg-white shadow-soft" aria-label="Illustrative patient panel with health summary, medication calendar, visit questions, multilingual education and scheme guidance">
      <figcaption className="sr-only">Concept patient screen with an appointment, printable health summary, medication calendar, patient-reported check-ins, saved questions and multilingual health and scheme guidance.</figcaption>
      <div className="flex items-center justify-between border-b border-line px-4 py-3"><div className="flex items-center gap-2"><span className="grid h-8 w-8 place-items-center rounded-lg bg-teal-50 text-teal-700"><HeartPulse size={17} aria-hidden="true" /></span><span className="text-sm font-semibold">Care Setu</span></div><span className="text-[10px] text-slate-500">Concept · sample data</span></div>
      <div className="bg-[#f2f7f7] p-4 sm:p-5"><div className="flex items-start justify-between gap-2"><div><p className="text-xs text-slate-500">Today, Priya</p><h3 className="mt-1 text-xl font-semibold">Your care, at a glance.</h3><p className="mt-1 text-xs text-slate-500">Your health information and next steps.</p></div><span className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-line bg-white px-2.5 py-2 text-[10px] font-semibold text-ink"><Printer size={13} className="text-teal-700" aria-hidden="true" />Print / share summary</span></div>
        <div className="mt-4 rounded-xl border border-line bg-white p-4"><div className="flex items-center justify-between"><p className="text-xs font-semibold">Next appointment</p><CalendarDays size={16} className="text-teal-700" aria-hidden="true" /></div><div className="mt-3 flex gap-3"><div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-teal-50 text-center text-teal-700"><span className="text-[9px] font-semibold uppercase">Oct</span><span className="text-lg font-semibold leading-5">19</span></div><div><p className="text-sm font-semibold">General medicine</p><p className="mt-1 text-xs text-slate-500">Dr. Ananya Rao · 10:30 am</p><p className="mt-1 text-xs text-slate-500">Care Setu Medical Centre</p></div></div><div className="mt-3 rounded-lg bg-teal-700 px-3 py-2 text-center text-xs font-semibold text-white">Appointment details</div></div>
        <div className="mt-3 rounded-xl border border-line bg-white p-4"><div className="flex items-center justify-between gap-2"><p className="text-xs font-semibold">Medication calendar</p><span className="rounded-full bg-teal-50 px-2 py-1 text-[10px] font-semibold text-teal-700">Reminder · 8:00 am</span></div><div className="mt-3 grid grid-cols-7 gap-1.5">{medicationWeek.map(([day, date, taken]) => <div key={date} className={`rounded-lg border px-1 py-2 text-center ${taken ? 'border-teal-100 bg-teal-50' : 'border-line bg-white'}`}><p className="text-[9px] text-slate-500">{day}</p><p className="mt-1 text-[10px] font-semibold text-ink">{date}</p><span className={`mx-auto mt-1 grid h-4 w-4 place-items-center rounded-full ${taken ? 'bg-teal-700 text-white' : 'border border-line text-slate-400'}`}>{taken ? <Check size={10} aria-hidden="true" /> : <span className="sr-only">Not yet marked</span>}</span></div>)}</div><div className="mt-3 flex items-center justify-between gap-2"><div><p className="text-xs font-semibold">Daily medication</p><p className="mt-1 text-[10px] text-slate-500">As listed in your care plan</p></div><span className="shrink-0 rounded-lg border border-teal-200 px-3 py-2 text-[10px] font-semibold text-teal-700">Mark dose taken</span></div><p className="mt-2 text-[10px] leading-4 text-slate-500">Patient-reported check-in · reminders don’t confirm a dose was taken.</p></div>
        <div className="mt-3 grid grid-cols-2 gap-3"><div className="rounded-xl border border-line bg-white p-3"><p className="text-[10px] font-semibold text-slate-500">Latest vitals</p><p className="mt-2 text-sm font-semibold">122 / 78</p><p className="mt-1 text-[10px] text-slate-500">BP · self-reported today</p></div><div className="rounded-xl border border-line bg-white p-3"><p className="text-[10px] font-semibold text-slate-500">Care plan</p><p className="mt-2 text-sm font-semibold">2 next steps</p><p className="mt-1 text-[10px] text-slate-500">Provider instructions</p></div></div>
        <div className="mt-3 rounded-xl border border-line bg-white p-4"><div className="flex items-center justify-between gap-2"><div><p className="text-xs font-semibold">Questions for your next visit</p><p className="mt-1 text-[10px] text-slate-500">Save a text or voice note in your language.</p></div><Mic size={17} className="shrink-0 text-teal-700" aria-hidden="true" /></div><div className="mt-3 rounded-lg bg-mist px-3 py-2 text-[10px] text-slate-500">Add a question or record a note…</div></div>
        <div className="mt-3 grid grid-cols-2 gap-3"><div className="rounded-xl border border-teal-100 bg-[#e6f4f2] p-3"><div className="flex items-center gap-1.5 text-teal-800"><Languages size={14} aria-hidden="true" /><p className="text-[10px] font-semibold">Health learning</p></div><p className="mt-2 text-[10px] leading-4 text-slate-600">Tips and education in supported languages.</p></div><div className="rounded-xl border border-line bg-white p-3"><p className="text-[10px] font-semibold">Scheme guidance</p><p className="mt-2 text-[10px] leading-4 text-slate-600">Explore benefits you may be eligible for.</p></div></div>
      </div>
    </figure>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [form, setForm] = useState<WaitlistFormData>(initialForm)
  const [status, setStatus] = useState<FormStatus>('idle')
  const [error, setError] = useState('')
  const [lastSubmittedAt, setLastSubmittedAt] = useState(0)

  const selectedServiceModels = form.serviceModels
  const selectedExcludedFeatures = form.featuresToExclude ?? []

  const update = <K extends keyof WaitlistFormData>(key: K, value: WaitlistFormData[K]) => {
    setForm((current) => ({ ...current, [key]: value }))
    if (status === 'error') setStatus('idle')
  }

  const toggleFeature = (value: string) => {
    update(
      'featuresSelected',
      form.featuresSelected.includes(value)
        ? form.featuresSelected.filter((feature) => feature !== value)
        : [...form.featuresSelected, value],
    )
  }

  const toggleExcludedFeature = (value: string) => {
    const selected = form.featuresToExclude ?? []
    update(
      'featuresToExclude',
      selected.includes(value)
        ? selected.filter((feature) => feature !== value)
        : [...selected, value],
    )
  }

  const toggleRole = (value: string) => {
    const selectedRoles = form.role ? form.role.split(' | ') : []
    update('role', selectedRoles.includes(value)
      ? selectedRoles.filter((role) => role !== value).join(' | ')
      : [...selectedRoles, value].join(' | '))
  }

  const toggleCareSetting = (value: string) => {
    update('careSettings', form.careSettings.includes(value)
      ? form.careSettings.filter((setting) => setting !== value)
      : [...form.careSettings, value])
  }

  const toggleServiceModel = (value: string) => {
    update('serviceModels', selectedServiceModels.includes(value)
      ? selectedServiceModels.filter((model) => model !== value)
      : [...selectedServiceModels, value])
  }

  const validate = () => {
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) return 'Please enter a valid email address.'
    if (!form.interestLevel) return 'Please tell us how interested you are.'
    if (form.featuresSelected.length === 0) return 'Please select at least one useful feature.'
    if (selectedServiceModels.includes('Other') && !form.serviceModelOther.trim()) return 'Please describe the service model you would want to explore.'
    return ''
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status === 'submitting') return

    const validationError = validate()
    if (validationError) {
      setError(validationError)
      setStatus('error')
      document.getElementById('form-status')?.focus()
      return
    }

    if (form.website) {
      setStatus('success')
      return
    }

    const now = Date.now()
    if (now - lastSubmittedAt < 30_000) {
      setError('Please wait a moment before submitting again.')
      setStatus('error')
      return
    }

    const endpoint = import.meta.env.VITE_WAITLIST_ENDPOINT as string | undefined
    if (!endpoint) {
      setError('The waitlist is not connected yet. Please try again after the site owner finishes setup.')
      setStatus('error')
      return
    }

    setStatus('submitting')
    setError('')

    const payload = new URLSearchParams({
      name: form.name.trim(),
      email: form.email.trim(),
      role: form.role,
      careSettings: form.careSettings.join(' | '),
      interestLevel: form.interestLevel,
      featuresSelected: form.featuresSelected.join(' | '),
      featuresToExclude: selectedExcludedFeatures.join(' | '),
      serviceModels: selectedServiceModels.join(' | '),
      serviceModelOther: form.serviceModelOther.trim(),
      willingnessToPay: form.willingnessToPay === 'Other amount' && form.willingnessToPayOther.trim()
        ? `Other amount: ${form.willingnessToPayOther.trim()}`
        : form.willingnessToPay ?? '',
      missingFeatures: form.missingFeatures.trim(),
      generalFeedback: form.generalFeedback.trim(),
      website: form.website,
    })

    try {
      const submissionRequest = fetch(endpoint, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: payload,
      })
        .then(() => true)
        .catch(() => false)

      // Apps Script can store the request but leave its opaque redirect pending.
      // Treat a still-pending request as dispatched after a short safety window.
      let timeoutId: number | undefined
      const dispatched = await Promise.race([
        submissionRequest,
        new Promise<true>((resolve) => {
          timeoutId = window.setTimeout(() => resolve(true), SUBMISSION_SETTLE_TIMEOUT_MS)
        }),
      ])
      if (timeoutId !== undefined) window.clearTimeout(timeoutId)

      if (!dispatched) throw new Error('Submission request failed')

      setLastSubmittedAt(now)
      setStatus('success')
    } catch {
      setError('We could not submit your response. Check your connection and try again.')
      setStatus('error')
    }
  }

  return (
      <div className="min-h-screen overflow-x-hidden bg-mist text-ink">
      <a href="#main" className="skip-link">Skip to main content</a>

      <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-mist/95 text-ink backdrop-blur-md">
        <div className="mx-auto flex h-[72px] max-w-content items-center justify-between px-5 sm:px-8">
          <a href="#top" className="flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-200/70" aria-label="Care Setu home">
            <BrandMark />
            <span className="text-lg font-semibold tracking-tight">Care Setu</span>
          </a>

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary navigation">
            {navigation.map((item) => (
              <a key={item.href} href={item.href} className="nav-link">{item.label}</a>
            ))}
          </nav>

          <a href="#waitlist" className="hidden min-h-11 items-center whitespace-nowrap rounded-xl bg-teal-700 px-5 py-3 font-semibold text-white transition-colors hover:bg-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-200 lg:inline-flex">
            Join the waitlist
          </a>

          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-xl border border-line text-ink transition-colors hover:bg-white lg:hidden"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        <nav id="mobile-navigation" hidden={!menuOpen} className="border-t border-line bg-mist px-5 py-4 lg:hidden" aria-label="Mobile navigation">
          <div className="mx-auto flex max-w-content flex-col gap-1">
            {navigation.map((item) => (
              <a key={item.href} href={item.href} className="rounded-lg px-3 py-3 text-base text-slate-700 hover:bg-teal-50" onClick={() => setMenuOpen(false)}>{item.label}</a>
            ))}
            <a href="#waitlist" className="mt-2 rounded-xl bg-teal-700 px-4 py-3 text-center font-semibold text-white" onClick={() => setMenuOpen(false)}>Join the waitlist</a>
          </div>
        </nav>
      </header>

      <main id="main">
        <section id="top" className="relative overflow-hidden bg-mist pb-16 pt-28 text-ink lg:pb-24 lg:pt-36">
          <div className="relative mx-auto grid max-w-content items-center gap-10 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-teal-700">
                <span className="h-2 w-2 rounded-full bg-teal-600" aria-hidden="true" />
                A care coordination concept for hospitals and clinics
              </div>
              <h1 className="max-w-3xl text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.035em] sm:text-5xl lg:text-[3.7rem]">
                Care teams see the context. Patients know what’s next.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                Care Setu brings patient-record search, visit coordination and between-visit follow-through into one proposed workflow for your care teams.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href="#waitlist" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-teal-700 px-6 py-3 font-semibold text-white transition-colors hover:bg-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-200">
                  Share your workflow
                </a>
                <a href="#how-it-works" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-line bg-white px-6 py-3 font-semibold text-ink transition-colors hover:border-teal-600 hover:bg-teal-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-200">
                  See the care flow <ArrowDown size={18} aria-hidden="true" />
                </a>
              </div>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-600">
                <span className="flex items-center gap-2"><Check size={17} className="text-teal-700" /> Clinician-led, patient-scoped AI</span>
                <span className="flex items-center gap-2"><Check size={17} className="text-teal-700" /> Designed for measurable pilot validation</span>
              </div>
            </div>

            <div className="relative">
              <ClinicianAssistantMock />
            </div>
          </div>
        </section>

        <section id="why" className="border-b border-line bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-content px-5 sm:px-8">
            <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
              <div>
                <p className="eyebrow">The hospital case</p>
                <h2 className="section-title mt-4">A workflow worth proving in your hospital.</h2>
                <p className="mt-5 max-w-md text-sm leading-7 text-slate-600">The value is practical: less time hunting for context, clearer ownership across the visit, and a better view of follow-through. Each benefit should be measured with the facility.</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { icon: Search, title: 'Chart search', description: 'Find history with source notes to verify.' },
                  { icon: Hospital, title: 'OPD coordination', description: 'See queues, owners and next steps.' },
                  { icon: HeartPulse, title: 'Patient follow-through', description: 'Review reported medication and vitals check-ins.' },
                  { icon: Activity, title: 'Operations view', description: 'Spot service activity and work waiting.' },
                ].map(({ icon: Icon, title, description }) => <article key={title} className="rounded-2xl border border-line bg-mist p-5"><span className="grid h-9 w-9 place-items-center rounded-xl bg-white text-teal-700 shadow-card"><Icon size={18} aria-hidden="true" /></span><h3 className="mt-3 text-base font-semibold">{title}</h3><p className="mt-1 text-sm leading-5 text-slate-600">{description}</p></article>)}
                <div className="rounded-2xl border border-teal-200 bg-teal-50 p-5 sm:col-span-2"><p className="text-base font-semibold">Establish value with a measured pilot.</p><div className="mt-3 flex flex-wrap gap-2 text-xs font-medium text-teal-800"><span className="rounded-full border border-teal-200 bg-white px-3 py-1.5">Time to find chart context</span><span className="rounded-full border border-teal-200 bg-white px-3 py-1.5">OPD flow and handoffs</span><span className="rounded-full border border-teal-200 bg-white px-3 py-1.5">Patient check-ins</span><span className="rounded-full border border-teal-200 bg-white px-3 py-1.5">Staff adoption and safety</span></div><p className="mt-3 text-xs leading-5 text-slate-600">Baselines, targets and success criteria would be agreed with each pilot facility. No results are claimed yet.</p></div>
              </div>
            </div>
          </div>
        </section>

        <section id="who-its-for" className="bg-mist py-20 lg:py-28">
          <div className="mx-auto max-w-content px-5 sm:px-8">
            <div className="max-w-2xl">
              <p className="eyebrow">Compatible with a range of care settings</p>
              <h2 className="section-title mt-4">One platform, shaped around your care setting.</h2>
              <p className="mt-4 text-sm leading-6 text-slate-600">We’re designing with hospital leaders, clinicians, operations, IT and patient-safety teams. Doctors and patients are the everyday users, with access shaped by each facility.</p>
            </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
              {audiences.map((audience) => {
                const Icon = audience.icon
                return <article key={audience.title} className="rounded-2xl border border-line bg-white p-5"><div className="grid h-10 w-10 place-items-center rounded-xl bg-teal-50 text-teal-700"><Icon size={21} aria-hidden="true" /></div><h3 className="mt-4 text-lg font-semibold">{audience.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{audience.description}</p></article>
              })}
            </div>
            <div className="mt-14 grid items-center gap-8 md:grid-cols-[0.8fr_1.2fr] md:gap-10 lg:gap-14">
              <div className="max-w-md"><p className="eyebrow">Patient follow-through · concept screen</p><h3 className="mt-3 text-2xl font-semibold leading-tight sm:text-3xl">Help patients carry the plan home.</h3><p className="mt-3 text-sm leading-6 text-slate-600">A patient-facing view for instructions, check-ins and progress shared with the care team.</p><ul className="mt-6 space-y-4 text-sm leading-6 text-slate-700"><li className="flex gap-3"><span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-teal-100 text-teal-700"><Check size={13} /></span><span><strong className="font-semibold text-ink">Know what’s next.</strong> See appointment details and provider instructions.</span></li><li className="flex gap-3"><span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-teal-100 text-teal-700"><Check size={13} /></span><span><strong className="font-semibold text-ink">Log what happened.</strong> Record medication check-ins and vitals, marked as patient-reported.</span></li><li className="flex gap-3"><span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-teal-100 text-teal-700"><Check size={13} /></span><span><strong className="font-semibold text-ink">Keep the team informed.</strong> Share follow-through where the provider has enabled access and review.</span></li><li className="flex gap-3"><span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-teal-100 text-teal-700"><Check size={13} /></span><span><strong className="font-semibold text-ink">Support the care plan.</strong> Medication reminders and clinician-advised tracking help between visits; reminders don’t confirm a dose was taken.</span></li></ul></div>
              <PatientPortalMock />
            </div>
          </div>
        </section>

        <section id="platform" className="bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-content px-5 sm:px-8">
            <div className="max-w-2xl">
              <p className="eyebrow">A proposed connected care network</p>
              <h2 className="section-title mt-3">Care Setu at the centre of a connected care network.</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">Care Setu coordinates the journey. Each connection depends on facility permissions, participating providers and validated integrations.</p>
            </div>
            <div className="mt-8"><CareNetworkDiagram /></div>
            <div className="mt-16 grid items-center gap-8 md:grid-cols-[0.62fr_1.38fr] md:gap-8 lg:gap-12">
              <div className="max-w-sm"><p className="eyebrow">Hospital operations · concept screen</p><h3 className="mt-3 text-2xl font-semibold leading-tight">A calm overview for busy teams.</h3><p className="mt-3 text-sm leading-6 text-slate-600">See schedules, queues and connected services in one illustrative view.</p></div>
              <HospitalDashboardMock />
            </div>
            <div className="mt-16">
              <div className="max-w-2xl"><p className="eyebrow">More of the product · illustrative screens</p><h3 className="mt-3 text-2xl font-semibold leading-tight sm:text-3xl">Less report hunting. The right panel for every role.</h3><p className="mt-3 text-sm leading-6 text-slate-600">These proposed screens show how results could be reviewed quickly and each team could see the work and information relevant to its role.</p></div>
              <div className="mt-6 grid items-start gap-5 md:grid-cols-2"><LabTrendsMock /><FacilityRolesMock /></div>
              <div className="mt-5"><SharedReportsMock /></div>
              <div className="mt-5"><LongitudinalRecordMock /></div>
            </div>
              <div className="mt-16 max-w-2xl"><p className="eyebrow">Scope for a design-partner pilot</p><h3 className="mt-3 text-2xl font-semibold leading-tight sm:text-3xl">What the first facility would help validate.</h3><p className="mt-3 text-sm leading-6 text-slate-600">The shared platform is a proposal. Pilot scope, integration effort and success measures would be agreed with the facility.</p></div>
              <div className="mt-8 rounded-3xl bg-ink p-6 text-white sm:p-8">
                <div className="grid gap-7 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
                  <div><p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-200">Buyer assurance</p><h3 className="mt-3 text-2xl font-semibold leading-tight">Bring safety and implementation questions into the pilot.</h3><p className="mt-3 text-sm leading-6 text-slate-200">These are proposed design guardrails to review with clinical, IT and privacy teams before any real-patient use.</p></div>
                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    <article className="rounded-2xl border border-white/15 bg-white/5 p-4"><p className="text-sm font-semibold">Traceable clinical context</p><p className="mt-2 text-xs leading-5 text-slate-200">Patient-scoped answers and proposed flags show their sources for review. AI does not diagnose, prescribe or make care decisions.</p></article>
                    <article className="rounded-2xl border border-white/15 bg-white/5 p-4"><p className="text-sm font-semibold">Safety and accountability</p><p className="mt-2 text-xs leading-5 text-slate-200">Define access roles, consent, attribution and audit events with your patient-safety, privacy and medico-legal teams before a pilot.</p></article>
                    <article className="rounded-2xl border border-white/15 bg-white/5 p-4"><p className="text-sm font-semibold">Patient-reported follow-through</p><p className="mt-2 text-xs leading-5 text-slate-200">Label medication check-ins and vitals as patient-reported; the provider defines visibility and follow-up.</p></article>
                    <article className="rounded-2xl border border-white/15 bg-white/5 p-4"><p className="text-sm font-semibold">Customised for your hospital</p><p className="mt-2 text-xs leading-5 text-slate-200">We will customise the interface, role-based panels and workflows to your requirements, then plan integrations, downtime steps, training and support with your team.</p></article>
                  </div>
                </div>
              </div>
            <div className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => {
                const Icon = feature.icon
                return (
                  <article key={feature.title} className="group rounded-xl border border-line bg-[#f5f9f8] p-4 transition-colors hover:border-teal-200 hover:bg-white sm:p-5">
                    <div className="flex items-center gap-3"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-teal-50 text-teal-700"><Icon size={19} aria-hidden="true" /></span><h4 className="text-base font-semibold tracking-tight">{feature.title}</h4></div>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{feature.description}</p>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section id="specialties" className="bg-mist py-20 lg:py-28">
          <div className="mx-auto max-w-content px-5 sm:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
              <div>
                <p className="eyebrow">Shared core, specialty-aware workflows</p>
                <h2 className="section-title mt-4">Start with care needs. Expand with evidence.</h2>
                <p className="mt-4 text-sm leading-6 text-slate-600">Specialty pathways are candidates for provider discovery and clinical review.</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {specialtyModules.map(([name, description]) => <article key={name} className="rounded-2xl border border-line bg-white p-5 shadow-card"><div className="flex items-center gap-2 text-teal-700"><Layers3 size={18} aria-hidden="true" /><h3 className="font-semibold text-ink">{name}</h3></div><p className="mt-2 text-sm leading-6 text-slate-600">{description}</p></article>)}
              </div>
            </div>
            <p className="mt-6 text-sm text-slate-500">Illustrative module candidates only. This list does not mean the platform is clinically validated for these specialties.</p>
          </div>
        </section>

        <section id="how-it-works" className="bg-teal-50 py-20 text-ink lg:py-28">
          <div className="mx-auto max-w-content px-5 sm:px-8">
            <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
              <div>
                <p className="eyebrow">A proposed OPD workflow</p>
                <h2 className="section-title mt-4">From first check-in to the next care step.</h2>
                <p className="mt-4 max-w-lg text-sm leading-6 text-slate-600">A facility-defined journey with the clinician in control and patients included between visits.</p>
              </div>
              <ol className="space-y-4">
                {[
                  ['01', 'Prepare', 'Request a visit and share history.'],
                  ['02', 'Check in', 'Register, join the queue, see status.'],
                  ['03', 'Ask the record', 'Search this patient; verify source notes.'],
                  ['04', 'Coordinate care', 'Document the visit and assign next steps.'],
                  ['05', 'Follow through', 'Patients log check-ins and see reminders.'],
                  ['06', 'Review the pilot', 'Teams assess flow, adoption and safety.'],
                ].map(([number, title, body]) => (
                  <li key={number} className="grid grid-cols-[42px_1fr] gap-3 rounded-2xl border border-teal-100 bg-white p-4 shadow-card sm:grid-cols-[52px_1fr] sm:p-5">
                    <span className="font-mono text-sm font-semibold text-teal-700">{number}</span>
                    <div><h3 className="text-base font-semibold">{title}</h3><p className="mt-1 text-sm leading-5 text-slate-600">{body}</p></div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section id="roadmap" className="bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-content px-5 sm:px-8">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
              <div>
                <p className="eyebrow">For hospital decision-makers</p>
                <h2 className="section-title mt-4">Start small. Prove fit. Then expand.</h2>
                <p className="mt-4 text-sm leading-6 text-slate-600">A proposed buying path that surfaces workflow, integration, safety and value questions before a broader rollout.</p>
                <div className="mt-7 rounded-2xl border border-teal-100 bg-teal-50 p-5 text-ink">
                  <p className="font-semibold">Clinical review before clinical pathways</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">Specialty templates and care pathways should be reviewed and validated with appropriate clinical teams before use.</p>
                </div>
              </div>
              <ol className="space-y-3">
                {[
                  ['01', 'Discovery and scope', 'Set priorities with clinicians, administrators and patients.'],
                  ['02', 'Platform foundation', 'Build identity, records, scheduling and permissions.'],
                  ['03', 'Focused pilot', 'Validate workflows with selected facilities.'],
                  ['04', 'Patient experience', 'Refine access, reminders and follow-up from feedback.'],
                  ['05', 'Specialty expansion', 'Add pathways after clinical review.'],
                  ['06', 'Integrations and scale', 'Prioritize requested connections and multi-site needs.'],
                ].map(([number, title, body]) => <li key={number} className="flex gap-4 rounded-2xl border border-line bg-white p-5 shadow-card"><span className="font-mono text-sm font-semibold text-teal-700">{number}</span><div><h3 className="font-semibold">{title}</h3><p className="mt-1 leading-6 text-slate-600">{body}</p></div></li>)}
              </ol>
            </div>
            <div className="mt-12 grid gap-5 rounded-3xl border border-line bg-mist p-6 text-ink sm:grid-cols-2 sm:p-8">
              <div><p className="text-sm font-semibold text-teal-700">Proposed subscription</p><h3 className="mt-2 text-lg font-semibold">For medical organizations</h3><p className="mt-2 text-sm leading-6 text-slate-600">A recurring facility or organization subscription is one model to validate. The pricing unit and packaging are undecided.</p></div>
              <div><p className="text-sm font-semibold text-teal-700">Shared core and modules</p><h3 className="mt-2 text-lg font-semibold">Expand when it fits</h3><p className="mt-2 text-sm leading-6 text-slate-600">Optional specialties, departments, facilities, users, storage or support levels could shape future tiers as organizations grow.</p></div>
              <div><p className="text-sm font-semibold text-teal-700">Implementation support</p><h3 className="mt-2 text-lg font-semibold">Set up for the facility</h3><p className="mt-2 text-sm leading-6 text-slate-600">Configuration, data migration, onboarding, training and integration work may be bundled or priced separately.</p></div>
              <div><p className="text-sm font-semibold text-teal-700">Patient access</p><h3 className="mt-2 text-lg font-semibold">Enabled through the provider</h3><p className="mt-2 text-sm leading-6 text-slate-600">Patient-facing access could be included in the provider subscription. Any separate patient charge would require an explicit decision.</p></div>
            </div>
            <p className="mt-4 text-sm text-slate-500">Roadmap and commercial model are proposals for discussion; no dates, launch commitments or prices have been decided.</p>
          </div>
        </section>

        <section id="waitlist" className="bg-mist py-20 lg:py-28">
          <div className="mx-auto max-w-content px-5 sm:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <p className="eyebrow">Hospital and care-team discovery</p>
                <h2 className="section-title mt-4">Help define a pilot around real work.</h2>
                <p className="mt-5 text-lg leading-8 text-slate-600">Tell us where your team loses time, how patient follow-up works today, and what a new system would need to prove before your facility adopts it.</p>
                <div className="mt-8 space-y-4 text-sm text-slate-600">
                  <p className="flex gap-3"><Clock3 className="mt-0.5 shrink-0 text-teal-600" size={19} /> Takes about 3 minutes</p>
                  <p className="flex gap-3"><ShieldCheck className="mt-0.5 shrink-0 text-teal-600" size={19} /> No patient or sensitive clinical information</p>
                  <p className="flex gap-3"><Mail className="mt-0.5 shrink-0 text-teal-600" size={19} /> One email for the waitlist—never sold</p>
                </div>
              </div>

              <div className="rounded-3xl border border-line bg-white p-5 shadow-soft sm:p-8 lg:p-10">
                {status === 'success' ? (
                  <div className="flex min-h-[520px] flex-col items-center justify-center text-center" role="status">
                    <div className="grid h-16 w-16 place-items-center rounded-2xl bg-teal-100 text-teal-700"><CheckCircle2 size={34} /></div>
                    <h3 className="mt-6 text-3xl font-semibold tracking-tight">Thanks for sharing.</h3>
                    <p className="mt-4 max-w-md text-lg leading-8 text-slate-600">Thank you for helping shape Care Setu. Your perspective will guide what we prioritise next.</p>
                    <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">The response sheet is the source of truth. The site owner should confirm whether your entry arrived there.</p>
                    <a href="#top" className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-xl border border-line px-5 py-3 font-semibold text-navy hover:border-teal-300">Back to the top <ArrowUpRight size={18} /></a>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="form-section">
                      <div className="form-heading"><span>1</span><div><h3>About you</h3><p>Just enough to understand whose perspective we’re hearing.</p></div></div>
                      <div className="mt-6 grid gap-5 sm:grid-cols-2">
                        <label className="field-label">Name <span className="optional">Optional</span><input className="input" type="text" autoComplete="name" maxLength={120} value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Your name" /></label>
                        <label className="field-label">Email <span className="required">Required</span><input className="input" type="email" inputMode="email" autoComplete="email" maxLength={254} required value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="you@example.com" /></label>
                      </div>
                      <fieldset className="mt-5"><legend className="field-label">Your role(s) <span className="optional">Optional · select all that apply</span></legend><div className="mt-3 flex flex-wrap gap-2">{roles.map((role) => { const selected = form.role.split(' | ').includes(role); return <label key={role} className={`chip ${selected ? 'chip-selected' : ''}`}><input className="sr-only" type="checkbox" checked={selected} onChange={() => toggleRole(role)} />{selected && <Check size={16} />}{role}</label> })}</div></fieldset>
                      <fieldset className="mt-5"><legend className="field-label">Which care settings are relevant to you? <span className="optional">Optional · select all that apply</span></legend><div className="mt-3 flex flex-wrap gap-2">{careSettingOptions.map((setting) => { const selected = form.careSettings.includes(setting); return <label key={setting} className={`chip ${selected ? 'chip-selected' : ''}`}><input className="sr-only" type="checkbox" checked={selected} onChange={() => toggleCareSetting(setting)} />{selected && <Check size={16} />}{setting}</label> })}</div><p className="mt-2 text-xs leading-5 text-slate-500">Patients and caregivers can skip this.</p></fieldset>
                    </div>

                    <div className="form-section">
                      <div className="form-heading"><span>2</span><div><h3>Product fit</h3><p>Tell us whether Care Setu feels useful for your setting.</p></div></div>
                      <fieldset className="mt-6"><legend className="field-label">How interested would you be in using something like this? <span className="required">Required</span></legend><div className="mt-3 grid gap-2 sm:grid-cols-2">{interestOptions.map((option) => <label key={option} className={`choice ${form.interestLevel === option ? 'choice-selected' : ''}`}><input className="sr-only" type="radio" name="interest" value={option} checked={form.interestLevel === option} onChange={() => update('interestLevel', option as InterestLevel)} /><span className="choice-dot" />{option}</label>)}</div></fieldset>

                      <fieldset className="mt-7"><legend className="field-label">Which features would be most useful to you? <span className="required">Select all that apply</span></legend><div className="mt-3 flex flex-wrap gap-2">{features.map((feature) => { const selected = form.featuresSelected.includes(feature.shortLabel); return <label key={feature.shortLabel} className={`chip ${selected ? 'chip-selected' : ''}`}><input className="sr-only" type="checkbox" checked={selected} onChange={() => toggleFeature(feature.shortLabel)} />{selected && <Check size={16} />}{feature.shortLabel}</label> })}</div></fieldset>
                      <fieldset className="mt-7"><legend className="field-label">Which features would you prefer to exclude or deprioritise for your setting? <span className="optional">Optional · select all that apply</span></legend><p className="mt-1 text-sm font-normal text-slate-500">Choose any that would not be useful to your team.</p><div className="mt-3 flex flex-wrap gap-2">{features.map((feature) => { const selected = selectedExcludedFeatures.includes(feature.shortLabel); return <label key={feature.shortLabel} className={`chip ${selected ? 'chip-selected' : ''}`}><input className="sr-only" type="checkbox" checked={selected} onChange={() => toggleExcludedFeature(feature.shortLabel)} />{selected && <Check size={16} />}{feature.shortLabel}</label> })}</div></fieldset>
                    </div>

                    <div className="form-section">
                      <div className="form-heading"><span>3</span><div><h3>Service model and priorities</h3><p>Help us shape a model that fits real care settings.</p></div></div>
                      <fieldset className="mt-6"><legend className="field-label">What service models should we explore? <span className="optional">Optional · select all that apply</span></legend><p className="mt-1 text-sm font-normal text-slate-500">Packaging and pricing are undecided. Patients and caregivers can skip this.</p><div className="mt-3 flex flex-wrap gap-2">{serviceModelOptions.map((option) => { const selected = selectedServiceModels.includes(option); return <label key={option} className={`chip ${selected ? 'chip-selected' : ''}`}><input className="sr-only" type="checkbox" checked={selected} onChange={() => toggleServiceModel(option)} />{selected && <Check size={16} />}{option}</label> })}</div></fieldset>
                      {selectedServiceModels.includes('Other') && <label className="field-label mt-4">Another service model <span className="required">Required</span><input className="input" type="text" maxLength={300} value={form.serviceModelOther} onChange={(e) => update('serviceModelOther', e.target.value)} placeholder="Describe what would work for your organization" /></label>}
                      <fieldset className="mt-7"><legend className="field-label">If a pilot proved value, what range might your organisation consider paying per month? <span className="optional">Optional · choose one</span></legend><p className="mt-1 text-sm font-normal text-slate-500">These are discovery ranges, not published prices. Patients and caregivers can skip this.</p><div className="mt-3 grid gap-2 sm:grid-cols-2">{willingnessToPayOptions.map((option) => <label key={option} className={`choice ${form.willingnessToPay === option ? 'choice-selected' : ''}`}><input className="sr-only" type="radio" name="willingness-to-pay" value={option} checked={form.willingnessToPay === option} onChange={() => update('willingnessToPay', option)} /><span className="choice-dot" />{option}</label>)}</div>{form.willingnessToPay === 'Other amount' && <label className="field-label mt-4" htmlFor="willingness-to-pay-other">What amount and pricing unit? <span className="optional">Optional</span><input id="willingness-to-pay-other" className="input" type="text" maxLength={160} value={form.willingnessToPayOther} onChange={(e) => update('willingnessToPayOther', e.target.value)} placeholder="For example, per location or per clinician" /></label>}</fieldset>
                      <p className="mt-7 rounded-xl bg-teal-50 px-4 py-3 text-sm leading-6 text-slate-600">Please don’t include patient names, identifiers or clinical details in your feedback.</p>
                      <label className="field-label mt-5">Is there anything you’d want this product to do that isn’t mentioned here? <span className="optional">Optional</span><textarea className="input min-h-28 resize-y" maxLength={3000} value={form.missingFeatures} onChange={(e) => update('missingFeatures', e.target.value)} placeholder="A missing feature, workflow or integration…" /></label>
                      <label className="field-label mt-5">Any other thoughts, concerns or suggestions? <span className="optional">Optional</span><textarea className="input min-h-28 resize-y" maxLength={3000} value={form.generalFeedback} onChange={(e) => update('generalFeedback', e.target.value)} placeholder="Anything else you’d like us to know…" /></label>
                    </div>

                    <div className="absolute -left-[9999px]" aria-hidden="true"><label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => update('website', e.target.value)} /></label></div>

                    <div id="form-status" tabIndex={-1} aria-live="polite">
                      {status === 'error' && <div className="mb-4 flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800" role="alert"><CircleAlert className="mt-0.5 shrink-0" size={18} /><span>{error}</span></div>}
                    </div>
                    <button type="submit" disabled={status === 'submitting'} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-teal-700 px-6 py-3 font-semibold text-white transition-colors hover:bg-ink disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-200">
                      {status === 'submitting' ? <><LoaderCircle className="animate-spin" size={19} /> Submitting…</> : 'Join the waitlist & share feedback'}
                    </button>
                    <p className="mt-4 text-center text-sm leading-6 text-slate-500">We’ll use your email for the Care Setu waitlist and your feedback to improve and validate the product. We will not sell your email.</p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-ink/10 bg-ink py-10 text-white">
        <div className="mx-auto flex max-w-content flex-col gap-5 px-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="flex items-center gap-3"><BrandMark /><div><p className="font-semibold">Care Setu</p><p className="text-sm text-slate-300">A connected care and operations platform concept.</p></div></div>
          <p className="max-w-md text-sm leading-6 text-slate-300">Care Setu is a product concept and prototype. Capabilities are proposed and may change. It does not provide clinical decision-making and must not be used with real patient data.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
