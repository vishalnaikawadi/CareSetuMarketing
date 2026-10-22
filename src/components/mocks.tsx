import { useState } from 'react'
import {
  ArrowUpRight,
  CalendarDays,
  Check,
  CircleAlert,
  FileText,
  FlaskConical,
  Languages,
  Mic,
  Printer,
  QrCode,
  Search,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  UserRound,
} from 'lucide-react'
import { assistantPrompts } from '../config/content'

function MockBar({ title, note }: { title: string; note?: string }) {
  return (
    <div className="mock-bar">
      <p className="text-sm font-bold"><span className="hidden sm:inline">Care Setu <span className="font-normal text-muted">/ </span></span>{title}</p>
      <span className="whitespace-nowrap text-xs text-muted">{note ?? 'Fictional data'}</span>
    </div>
  )
}

export function ChartAssistantMock() {
  const [active, setActive] = useState(0)
  const prompt = assistantPrompts[active]

  return (
    <figure className="mock shadow-lift" aria-label="Interactive concept of a patient-scoped chart assistant, using fictional data">
      <figcaption className="sr-only">A clinician asks about one selected patient’s record and gets an answer that links back to the source notes.</figcaption>
      <MockBar title="Chart assistant" />
      <div className="bg-sage-50 p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-clay-100 font-display text-base font-semibold text-clay-700" aria-hidden="true">AM</span>
          <div className="min-w-0">
            <p className="font-bold leading-tight">Aarav Mehta, 62</p>
            <p className="text-sm text-muted">General medicine, token 14</p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-turmeric-100 sm:ml-auto px-3 py-1 text-xs font-bold text-turmeric-700">
            <CircleAlert size={13} aria-hidden="true" /> 1 result pending
          </span>
        </div>

        <div className="mt-4 rounded-[12px] border border-line bg-white p-3">
          <div className="flex items-center gap-2 rounded-[8px] bg-paper px-3 py-2.5 text-sm text-muted">
            <Search size={16} className="shrink-0 text-forest" aria-hidden="true" />
            <span className="truncate">Ask about this patient’s record</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Try a question">
            {assistantPrompts.map((p, index) => (
              <button
                key={p.question}
                type="button"
                onClick={() => setActive(index)}
                aria-pressed={active === index}
                className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors duration-200 ${active === index ? 'border-forest bg-forest text-white' : 'border-sage-300 bg-white text-ink hover:border-forest'}`}
              >
                {p.question}
              </button>
            ))}
          </div>
        </div>

        <div key={active} className="answer-in mt-3 rounded-[12px] border border-sage-200 bg-white p-4" aria-live="polite">
          <div className="flex items-center gap-2 text-sm font-bold text-forest">
            <Sparkles size={15} aria-hidden="true" /> From this patient’s record
          </div>
          <p className="mt-2 leading-7">{prompt.answer}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {prompt.sources.map(([name, date]) => (
              <span key={name} className="inline-flex items-center gap-2 rounded-[8px] border border-line bg-paper px-2.5 py-1.5 text-sm">
                <FileText size={14} className="text-forest" aria-hidden="true" />
                <span className="font-medium">{name}</span>
                <span className="text-muted">{date}</span>
                <ArrowUpRight size={13} className="text-muted" aria-hidden="true" />
              </span>
            ))}
          </div>
        </div>
        <p className="mt-3 text-xs leading-5 text-muted">Retrieval support only. Every answer links to its source; care decisions stay with the clinician.</p>
      </div>
    </figure>
  )
}

export function RecordTimelineMock() {
  const events = [
    { date: 'Today', title: 'OPD visit', body: 'History, vitals and visit actions', tone: 'forest' },
    { date: '15 Oct', title: 'Referral reply', body: 'Cardiology replied to the handover', tone: 'forest' },
    { date: '12 Oct', title: 'Pending test', body: 'Renal panel ordered, no result yet', tone: 'turmeric' },
    { date: '28 Sep', title: 'Flagged result', body: 'Linked to its source for review', tone: 'clay' },
  ]
  const dot = { forest: 'bg-forest', turmeric: 'bg-turmeric-500', clay: 'bg-clay-500' } as const

  return (
    <figure className="mock" aria-label="Concept patient timeline with QR handover and voice history capture, using fictional data">
      <MockBar title="Patient record" />
      <div className="grid gap-4 bg-sage-50 p-4 sm:grid-cols-[1.25fr_1fr] sm:p-5">
        <div className="mock-tile p-4">
          <p className="font-bold">Timeline</p>
          <ol className="mt-4 space-y-4 border-l-2 border-sage-200 pl-5">
            {events.map((event) => (
              <li key={event.title} className="relative">
                <span className={`absolute -left-[27px] top-1.5 h-3 w-3 rounded-full ring-4 ring-white ${dot[event.tone as keyof typeof dot]}`} aria-hidden="true" />
                <p className="text-xs text-muted">{event.date}</p>
                <p className="font-bold leading-tight">{event.title}</p>
                <p className="text-sm text-muted">{event.body}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="grid content-start gap-4">
          <div className="mock-tile p-4">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-[8px] bg-paper text-forest"><QrCode size={24} aria-hidden="true" /></span>
              <p className="font-bold leading-tight">QR care handover</p>
            </div>
            <p className="mt-2 text-sm text-muted">A summary the patient has authorised, for urgent care and referrals.</p>
          </div>
          <div className="mock-tile p-4">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-clay-50 text-clay-600"><Mic size={20} aria-hidden="true" /></span>
              <p className="font-bold leading-tight">Voice history</p>
            </div>
            <p className="mt-3 rounded-[8px] bg-paper px-3 py-2 text-sm italic">“Breathless climbing stairs since last week…”</p>
            <p className="mt-2 text-xs text-muted">Reviewed by the clinician before saving</p>
          </div>
        </div>
      </div>
    </figure>
  )
}

export function PatientPortalMock() {
  const week = [['M', true], ['T', true], ['W', true], ['T', true], ['F', false], ['S', false], ['S', false]] as const
  return (
    <figure className="mock mx-auto w-full max-w-[460px] rounded-[36px] border-[7px] border-ink/90 shadow-lift" aria-label="Concept patient app with appointment, medication calendar, vitals, care plan, saved questions, health learning and scheme guidance, using fictional data">
      <div className="bg-sage-50 px-4 pb-5 pt-3 sm:px-5">
        <div className="flex items-center justify-between px-1 text-xs font-bold text-ink" aria-hidden="true">
          <span>9:41</span>
          <span className="h-5 w-24 rounded-full bg-ink/90" />
          <span>4G</span>
        </div>

        <div className="mt-4 flex items-start justify-between gap-3">
          <div>
            <p className="text-sm text-muted">Good morning, Priya</p>
            <p className="font-display text-[1.7rem] font-semibold leading-tight">Your care this week</p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white px-3 py-2 text-xs font-bold text-forest shadow-tag"><Printer size={14} aria-hidden="true" /> Share summary</span>
        </div>

        <div className="mock-tile mt-4 p-4">
          <div className="flex items-center gap-3">
            <div className="grid h-14 w-14 shrink-0 place-content-center rounded-[10px] bg-forest text-center text-white">
              <span className="text-xs">Oct</span><span className="font-display text-xl font-semibold leading-none">19</span>
            </div>
            <div className="min-w-0">
              <p className="font-bold leading-tight">General medicine</p>
              <p className="text-sm text-muted">Dr. Ananya Rao, 10:30 am</p>
              <p className="text-sm text-muted">Care Setu Medical Centre</p>
            </div>
            <CalendarDays size={18} className="ml-auto shrink-0 text-forest" aria-hidden="true" />
          </div>
        </div>

        <div className="mock-tile mt-3 p-4">
          <div className="flex items-center justify-between">
            <p className="font-bold">Metformin, 8:00 am</p>
            <span className="text-xs text-muted">4 of 7 marked</span>
          </div>
          <div className="mt-3 grid grid-cols-7 gap-1.5">
            {week.map(([day, taken], index) => (
              <div key={index} className="text-center">
                <p className="text-xs text-muted">{day}</p>
                <span className={`mx-auto mt-1 grid h-9 w-9 place-items-center rounded-full ${taken ? 'bg-forest text-white' : 'border-2 border-dashed border-sage-300'}`}>
                  {taken ? <Check size={16} aria-label="Marked taken" /> : <span className="sr-only">Not marked</span>}
                </span>
              </div>
            ))}
          </div>
          <span className="mt-4 block w-full rounded-full bg-clay-500 py-3 text-center text-sm font-bold text-white">Mark today’s dose taken</span>
          <p className="mt-2 text-xs text-muted">Patient-reported. A reminder doesn’t confirm a dose.</p>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <div className="mock-tile p-4">
            <p className="text-xs text-muted">Blood pressure</p>
            <p className="mt-1 font-display text-2xl font-semibold leading-none">122/78</p>
            <p className="mt-1 text-xs text-muted">Logged today</p>
          </div>
          <div className="mock-tile p-4">
            <p className="text-xs text-muted">Care plan</p>
            <p className="mt-1 font-display text-2xl font-semibold leading-none">2 steps</p>
            <p className="mt-1 text-xs text-muted">From your doctor</p>
          </div>
        </div>

        <div className="mock-tile mt-3 flex items-center gap-3 p-4">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-clay-50 text-clay-600"><Mic size={18} aria-hidden="true" /></span>
          <div className="min-w-0">
            <p className="text-sm font-bold leading-tight">Questions for my next visit</p>
            <p className="mt-0.5 text-xs text-muted">Type or record a note, in Hindi or English</p>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <div className="mock-tile p-4">
            <Languages size={18} className="text-forest" aria-hidden="true" />
            <p className="mt-2 text-sm font-bold leading-tight">Health learning</p>
            <p className="mt-1 text-xs text-muted">Tips in your language</p>
          </div>
          <div className="mock-tile p-4">
            <ShieldCheck size={18} className="text-forest" aria-hidden="true" />
            <p className="mt-2 text-sm font-bold leading-tight">Scheme guidance</p>
            <p className="mt-1 text-xs text-muted">Benefits you may qualify for</p>
          </div>
        </div>
      </div>
    </figure>
  )
}

export function HospitalOverviewMock() {
  const queues = [['General medicine', 12, 18], ['Cardiology', 8, 10], ['Pediatrics', 6, 14], ['Orthopedics', 3, 9]] as const
  return (
    <figure className="mock" aria-label="Concept hospital operations overview with fictional data">
      <MockBar title="Hospital overview" note="Monday, fictional data" />
      <div className="bg-sage-50 p-4 sm:p-5">
        <dl className="grid grid-cols-3 gap-3">
          {[['Appointments', '128'], ['Arrived', '34'], ['Referrals open', '9']].map(([label, value]) => (
            <div key={label} className="mock-tile p-3">
              <dt className="text-xs text-muted sm:text-sm">{label}</dt>
              <dd className="mt-1 font-display text-2xl font-semibold">{value}</dd>
            </div>
          ))}
        </dl>
        <div className="mock-tile mt-3 p-4">
          <div className="flex items-center justify-between">
            <p className="font-bold">Waiting now</p>
            <p className="text-sm text-muted">of today’s tokens</p>
          </div>
          <ul className="mt-3 space-y-3">
            {queues.map(([dept, waiting, total]) => (
              <li key={dept}>
                <div className="flex justify-between text-sm"><span>{dept}</span><span className="font-bold">{waiting} <span className="font-normal text-muted">/ {total}</span></span></div>
                <div className="mt-1 h-2 rounded-full bg-sage-100"><div className="h-2 rounded-full bg-forest" style={{ width: `${(waiting / total) * 100}%` }} /></div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </figure>
  )
}

export function LabTrendsMock() {
  const points = [[28, 78, '12.8', 'Mar'], [112, 58, '13.4', 'May'], [196, 67, '13.1', 'Jul'], [284, 34, '14.0', 'Sep']] as const
  return (
    <figure className="mock" aria-label="Concept results screen showing a lab value across visits, linked to source reports, using fictional data">
      <MockBar title="Patient results" />
      <div className="bg-sage-50 p-4 sm:p-5">
        <div className="mock-tile p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-bold">Hemoglobin</p>
              <p className="text-sm text-muted">g/dL, across 4 reports</p>
            </div>
            <span className="grid h-10 w-10 place-items-center rounded-full bg-paper text-forest"><FlaskConical size={18} aria-hidden="true" /></span>
          </div>
          <svg className="mt-3 h-32 w-full" viewBox="0 0 320 112" role="img" aria-label="Fictional hemoglobin values: 12.8 in March, 13.4 in May, 13.1 in July and 14.0 in September. No clinical interpretation is shown.">
            <path d="M18 24H306M18 54H306M18 84H306" stroke="#E3EADF" strokeWidth="1" />
            <path d={`M${points.map(([x, y]) => `${x} ${y}`).join(' L')}`} fill="none" stroke="#2F4A3E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            {points.map(([x, y, value, month]) => (
              <g key={month}>
                <circle cx={x} cy={y} r="5" fill="#fff" stroke="#2F4A3E" strokeWidth="2.5" />
                <text x={x} y={y - 11} textAnchor="middle" fill="#1E2B25" fontSize="11" fontWeight="700">{value}</text>
                <text x={x} y="106" textAnchor="middle" fill="#5B6B62" fontSize="10">{month}</text>
              </g>
            ))}
          </svg>
          <div className="mt-3 grid grid-cols-2 gap-2 border-t border-line pt-3">
            {['CBC, 21 Sep', 'CBC, 18 Jul', 'CBC, 24 May', 'CBC, 11 Mar'].map((report) => (
              <span key={report} className="flex items-center justify-between gap-2 rounded-[8px] bg-paper px-2.5 py-2 text-sm">
                {report}<ArrowUpRight size={13} className="shrink-0 text-muted" aria-hidden="true" />
              </span>
            ))}
          </div>
        </div>
        <p className="mt-3 text-xs leading-5 text-muted">A quick view across visits. The original reports stay one click away for verification.</p>
      </div>
    </figure>
  )
}

export function SharedReportsMock() {
  const reports = [
    { name: 'CBC report', date: '21 Sep', kind: 'OCR text' },
    { name: 'Chest X-ray report', date: '02 Oct', kind: 'OCR text' },
    { name: 'Handwritten note', date: '03 Oct', kind: 'Image only' },
  ]
  const ReportRow = ({ name, date, kind }: (typeof reports)[number]) => (
    <li className="flex items-center gap-2 py-2 text-sm">
      <FileText size={15} className="shrink-0 text-forest" aria-hidden="true" />
      <span className="min-w-0 flex-1"><span className="font-medium">{name}</span> <span className="text-muted">{date}</span></span>
      <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs ${kind === 'Image only' ? 'bg-turmeric-100 text-turmeric-700' : 'bg-sage-100 text-sage-700'}`}>{kind}</span>
    </li>
  )
  return (
    <figure className="mock" aria-label="Concept of one report shared between the patient app and the clinician panel, with OCR for printed reports, using fictional data">
      <MockBar title="Shared reports" />
      <div className="grid gap-4 bg-sage-50 p-4 sm:p-5 md:grid-cols-2">
        <section className="mock-tile overflow-hidden" aria-label="Patient app">
          <div className="flex items-center gap-3 border-b border-line px-4 py-3">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-clay-50 text-clay-600"><UserRound size={17} aria-hidden="true" /></span>
            <p className="font-bold">Patient app</p>
          </div>
          <div className="p-4">
            <p className="text-sm text-muted">Add a report from the lab or scan centre.</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <span className="rounded-full bg-clay-500 py-2.5 text-center text-sm font-bold text-white">Scan report</span>
              <span className="rounded-full border border-sage-300 py-2.5 text-center text-sm font-bold">Upload PDF</span>
            </div>
            <ul className="mt-3 divide-y divide-line">{reports.map((r) => <ReportRow key={r.name} {...r} />)}</ul>
          </div>
        </section>
        <section className="mock-tile overflow-hidden" aria-label="Clinician panel">
          <div className="flex items-center gap-3 border-b border-line px-4 py-3">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-sage-100 text-forest"><Stethoscope size={17} aria-hidden="true" /></span>
            <p className="font-bold">Clinician panel</p>
            <span className="ml-auto text-xs text-muted">Same record</span>
          </div>
          <div className="p-4">
            <p className="text-sm text-muted">OCR text sits beside the original file.</p>
            <ul className="mt-1 divide-y divide-line">{reports.map((r) => <ReportRow key={r.name} {...r} />)}</ul>
            <div className="mt-3 rounded-[8px] border border-clay-100 bg-clay-50 p-3">
              <p className="flex items-center gap-2 text-sm font-bold text-clay-700"><ShieldCheck size={15} aria-hidden="true" /> Guideline flag for review</p>
              <p className="mt-1 text-xs leading-5 text-clay-700">Check OCR values against the source image. Care decisions stay with the clinical team.</p>
            </div>
          </div>
        </section>
      </div>
    </figure>
  )
}

export function FacilityRolesMock() {
  const profiles = [
    ['Administrator', 'Facility setup, users, audit'],
    ['Department lead', 'Department setup, team access'],
    ['Doctor', 'Assigned records, consultations'],
    ['Nurse', 'Team worklists, observations'],
    ['Triage / registration', 'Arrival, queue status'],
    ['Laboratory', 'Orders, results'],
    ['Pharmacy', 'Prescriptions, handoffs'],
    ['Patient', 'Own care plan, check-ins'],
  ]
  return (
    <figure className="mock" aria-label="Concept facility setup screen showing role-based panels and access">
      <MockBar title="Facility workspace" note="Set with your team" />
      <div className="bg-sage-50 p-4 sm:p-5">
        <div className="mock-tile overflow-hidden">
          <div className="grid grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-3 border-b border-line bg-paper px-4 py-2 text-xs font-bold text-muted">
            <span>Role</span><span>Sees and does</span>
          </div>
          <ul className="divide-y divide-line">
            {profiles.map(([role, scope]) => (
              <li key={role} className="grid grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] items-center gap-3 px-4 py-2.5 text-sm">
                <span className="font-bold">{role}</span><span className="text-muted">{scope}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-3 text-xs leading-5 text-muted">Illustrative panels. Your hospital defines the hierarchy, visibility, permissions and approval steps.</p>
      </div>
    </figure>
  )
}
