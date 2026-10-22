import { useState, type ReactNode } from 'react'
import { ArrowDown, Mail, Menu, Plus, ShieldCheck, X } from 'lucide-react'
import {
  audiences,
  commercialModel,
  faqs,
  features,
  groupLabels,
  guardrails,
  hospitalValues,
  navigation,
  pilotMeasures,
  roadmapPhases,
  specialtyModules,
  workflowSteps,
  type FeatureGroup,
} from './config/content'
import { Avatar, BridgeMark, BridgeNetwork, ChaiGlass } from './components/illustrations'
import { ChartAssistantMock, FacilityRolesMock, HospitalOverviewMock, LabTrendsMock, PatientPortalMock, RecordTimelineMock, SharedReportsMock } from './components/mocks'
import { WaitlistWizard } from './components/WaitlistWizard'

function FeatureList({ group }: { group: FeatureGroup }) {
  return (
    <ul className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2">
      {features.filter((feature) => feature.group === group).map((feature) => (
        <li key={feature.shortLabel} className="border-t border-line pt-4">
          <p className="font-bold leading-snug">{feature.title}</p>
          <p className="mt-1 text-[15px] leading-6 text-muted">{feature.benefit}</p>
        </li>
      ))}
    </ul>
  )
}

function AudiencePath({ id, group, title, body, mock, reverse = false, children }: {
  id: string
  group: FeatureGroup
  title: string
  body: string
  mock: ReactNode
  reverse?: boolean
  children?: ReactNode
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="py-16 lg:py-24">
      <div className="shell grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <div className={reverse ? 'lg:order-2' : ''}>
          <span className="path-pill"><Avatar kind={group} className="h-9 w-9" />{groupLabels[group]}</span>
          <h2 id={`${id}-title`} className="display-lg mt-6 max-w-xl">{title}</h2>
          <p className="lede mt-4">{body}</p>
          <FeatureList group={group} />
          {children}
        </div>
        <div className={`grid gap-6 ${Array.isArray(mock) ? '' : 'lg:sticky lg:top-28'} ${reverse ? 'lg:order-1' : ''}`}>{mock}</div>
      </div>
    </section>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen overflow-x-clip">
      <a href="#main" className="skip-link">Skip to main content</a>

      <header className="fixed inset-x-0 top-0 z-50 border-b border-line/70 bg-paper/90 backdrop-blur-md">
        <div className="shell flex h-[72px] items-center justify-between gap-4">
          <a href="#top" className="flex items-center gap-3 rounded-full" aria-label="Care Setu home">
            <BridgeMark />
            <span className="font-display text-xl font-semibold tracking-tight">Care Setu</span>
          </a>
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
            {navigation.map((item) => <a key={item.href} href={item.href} className="nav-link">{item.label}</a>)}
          </nav>
          <a href="#waitlist" className="btn-primary hidden min-h-11 lg:inline-flex">Join the waitlist</a>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white lg:hidden"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        <nav id="mobile-navigation" hidden={!menuOpen} className="border-t border-line bg-paper px-5 pb-5 pt-3 lg:hidden" aria-label="Mobile navigation">
          <div className="flex flex-col gap-1">
            {navigation.map((item) => (
              <a key={item.href} href={item.href} className="rounded-xl px-3 py-3 text-lg hover:bg-sage-100" onClick={() => setMenuOpen(false)}>{item.label}</a>
            ))}
            <a href="#waitlist" className="btn-primary mt-3" onClick={() => setMenuOpen(false)}>Join the waitlist</a>
          </div>
        </nav>
      </header>

      <main id="main">
        <section id="top" className="relative overflow-hidden pb-20 pt-32 lg:pb-28 lg:pt-40">
          <svg className="pointer-events-none absolute bottom-0 left-1/2 hidden w-[1500px] -translate-x-1/2 lg:block" viewBox="0 0 1500 420" aria-hidden="true">
            <path className="arch-draw" pathLength={1} d="M120 420C380 120 1120 120 1380 420" fill="none" stroke="#D9E2D4" strokeWidth="56" strokeLinecap="round" />
          </svg>
          <div className="shell relative grid items-center gap-12 lg:grid-cols-[1fr_1.02fr] lg:gap-14">
            <div>
              <p className="text-[15px] font-bold text-sage-600">A care coordination concept for hospitals, clinics and their patients</p>
              <h1 className="display-xl mt-5">Care teams see the context. Patients know what’s next.</h1>
              <p className="lede mt-6">Care Setu brings patient-record search, visit coordination and between-visit follow-through into one workflow for your care teams.</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href="#waitlist" className="btn-primary">Join the waitlist</a>
                <a href="#workflow" className="btn-quiet">See the care flow <ArrowDown size={18} aria-hidden="true" /></a>
              </div>
            </div>
            <ChartAssistantMock />
          </div>
        </section>

        <section id="bridge" aria-labelledby="bridge-title" className="border-y border-line bg-white py-16 lg:py-24">
          <div className="shell">
            <div className="mx-auto max-w-2xl text-center">
              <h2 id="bridge-title" className="display-lg">One bridge between everyone in a patient’s care.</h2>
              <p className="lede mx-auto mt-4">Care Setu coordinates the journey around each visit. Every connection depends on your facility’s permissions, participating providers and validated integrations.</p>
            </div>
            <div className="mx-auto mt-10 max-w-5xl lg:mt-4"><BridgeNetwork /></div>
            <div className="mt-12 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
              {hospitalValues.map((value) => (
                <div key={value.title} className="border-t-2 border-forest pt-4">
                  <h3 className="text-lg font-semibold">{value.title}</h3>
                  <p className="mt-1 text-[15px] leading-6 text-muted">{value.body}</p>
                </div>
              ))}
            </div>
            <p className="mt-10 text-[15px] text-muted">
              <span className="font-bold text-ink">A pilot would measure</span>{' '}
              {pilotMeasures.join(', ').replace(/, ([^,]*)$/, ' and $1').toLowerCase()}, agreed with your facility.
            </p>
          </div>
        </section>

        <AudiencePath
          id="care-teams"
          group="care"
          title="Walk into each consultation with the story already assembled."
          body="Patient-scoped search, one timeline and connected reports, so clinicians spend the visit on judgement instead of hunting through paper and PDFs."
          mock={[<RecordTimelineMock key="timeline" />, <LabTrendsMock key="labs" />]}
        />

        <section aria-label="Shared reports" className="-mt-4 pb-16 lg:-mt-8 lg:pb-24">
          <div className="shell">
            <div className="mb-6 max-w-2xl">
              <h3 className="text-2xl font-semibold sm:text-3xl">The same report, in the patient’s app and the doctor’s panel.</h3>
              <p className="mt-2 text-[15px] leading-6 text-muted">Printed lab and radiology reports are read with OCR and kept beside the original. Handwritten reports stay as images.</p>
            </div>
            <SharedReportsMock />
          </div>
        </section>

        <div className="bg-clay-50/60">
          <AudiencePath
            id="patients"
            group="patient"
            title="Help patients carry the plan home."
            body="A simple app for appointments, medicine reminders and questions for the next visit, in the patient’s own language, with check-ins the care team can review."
            mock={<PatientPortalMock />}
            reverse
          />
        </div>

        <AudiencePath
          id="hospitals"
          group="hospital"
          title="Shaped around how your facility already works."
          body="Configure departments, roles and specialty workflows, and give administrators a calm view of queues, workload and open referrals."
          mock={[<HospitalOverviewMock key="overview" />, <FacilityRolesMock key="roles" />]}
        >
          <h3 className="mt-10 text-lg font-semibold">Where it fits</h3>
          <ul className="mt-3 space-y-3">
            {audiences.map((audience) => (
              <li key={audience.title} className="text-[15px] leading-6"><span className="font-bold">{audience.title}.</span> <span className="text-muted">{audience.description}</span></li>
            ))}
          </ul>
        </AudiencePath>

        <section aria-labelledby="specialties-title" className="pb-16 lg:pb-24">
          <div className="shell">
            <div className="rounded-[28px] bg-sage-100 p-6 sm:p-10">
              <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
                <div>
                  <h2 id="specialties-title" className="text-2xl font-semibold sm:text-3xl">A shared core, with room for each specialty.</h2>
                  <p className="mt-3 text-[15px] leading-6 text-muted">These are candidate pathways for clinical review. Listing them doesn’t mean Care Setu is clinically validated for them.</p>
                </div>
                <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
                  {specialtyModules.map(([name, description]) => (
                    <li key={name}><p className="font-bold">{name}</p><p className="text-[15px] leading-6 text-muted">{description}</p></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="workflow" aria-labelledby="workflow-title" className="border-y border-line bg-white py-16 lg:py-24">
          <div className="shell">
            <h2 id="workflow-title" className="display-lg max-w-2xl">From first check-in to the next care step.</h2>
            <p className="lede mt-4">A journey your facility defines, with the clinician in control and the patient included between visits.</p>
            <ol className="relative mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-6 lg:gap-6">
              <span className="absolute left-0 right-0 top-[19px] hidden h-0.5 bg-sage-200 lg:block" aria-hidden="true" />
              {workflowSteps.map((step, index) => (
                <li key={step.title} className="relative">
                  <span className="relative grid h-10 w-10 place-items-center rounded-full border-2 border-forest bg-white font-display font-semibold text-forest">{index + 1}</span>
                  <p className="mt-4 text-sm font-bold text-clay-600">{step.who}</p>
                  <h3 className="mt-1 text-xl font-semibold">{step.title}</h3>
                  <p className="mt-1 text-[15px] leading-6 text-muted">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="pilot" aria-labelledby="pilot-title" className="bg-forest py-16 text-white lg:py-24">
          <div className="shell">
            <h2 id="pilot-title" className="display-lg max-w-2xl">Start small. Prove fit. Then expand.</h2>
            <p className="mt-4 max-w-[36rem] text-lg leading-8 text-sage-100">A buying path that answers workflow, integration, safety and value questions before any wider rollout.</p>
            <div className="mt-12 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
              <div>
                <h3 className="text-xl font-semibold">How a rollout would progress</h3>
                <ol className="mt-5">
                  {roadmapPhases.map((phase, index) => (
                    <li key={phase.title} className="grid grid-cols-[2.5rem_1fr] gap-3 border-t border-white/15 py-4">
                      <span className="font-display text-lg font-semibold text-sage-300">{index + 1}</span>
                      <div><p className="font-bold">{phase.title}</p><p className="text-[15px] leading-6 text-sage-100">{phase.body}</p></div>
                    </li>
                  ))}
                </ol>
              </div>
              <div>
                <h3 className="flex items-center gap-2 text-xl font-semibold"><ShieldCheck size={22} aria-hidden="true" /> Guardrails to review with your teams</h3>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {guardrails.map((item) => (
                    <div key={item.title} className="rounded-2xl bg-white/[0.07] p-5">
                      <p className="font-bold">{item.title}</p>
                      <p className="mt-2 text-[15px] leading-6 text-sage-100">{item.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-14 border-t border-white/15 pt-10">
              <h3 className="text-xl font-semibold">How pricing might work</h3>
              <div className="mt-5 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
                {commercialModel.map((item) => (
                  <div key={item.title}><p className="font-bold">{item.title}</p><p className="mt-1 text-[15px] leading-6 text-sage-100">{item.body}</p></div>
                ))}
              </div>
              <p className="mt-8 text-sm text-sage-200">The roadmap and commercial model are proposals for discussion. No dates, launch commitments or prices have been set.</p>
            </div>
          </div>
        </section>

        <section id="waitlist" aria-labelledby="waitlist-title" className="py-16 lg:py-24">
          <div className="shell grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <h2 id="waitlist-title" className="display-lg">Help define a pilot around real work.</h2>
              <p className="lede mt-4">Tell us where your team loses time, how follow-up works today, and what a new system would need to prove before your facility adopts it.</p>
              <div className="mt-8 flex items-center gap-4 rounded-2xl bg-white p-4 shadow-tag">
                <ChaiGlass className="h-16 w-12 shrink-0" />
                <p className="text-[15px] leading-6"><span className="font-bold">About three minutes,</span> roughly one cutting chai. Patients and caregivers can skip the pricing questions.</p>
              </div>
              <ul className="mt-6 space-y-3 text-[15px] text-muted">
                <li className="flex gap-3"><ShieldCheck className="mt-0.5 shrink-0 text-forest" size={19} aria-hidden="true" /> We don’t ask for any patient or clinical information.</li>
                <li className="flex gap-3"><Mail className="mt-0.5 shrink-0 text-forest" size={19} aria-hidden="true" /> Your email is used for the waitlist only, and never sold.</li>
              </ul>
            </div>
            <div className="rounded-[28px] border border-line bg-white p-5 sm:p-8 lg:p-10">
              <WaitlistWizard />
            </div>
          </div>
        </section>

        <section id="faq" aria-labelledby="faq-title" className="border-t border-line bg-white py-16 lg:py-24">
          <div className="shell grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
            <div>
              <h2 id="faq-title" className="display-lg">Questions hospitals ask us.</h2>
              <p className="lede mt-4">Something else on your mind? Add it to the last step of the waitlist form.</p>
            </div>
            <div className="divide-y divide-line border-y border-line">
              {faqs.map((item) => (
                <details key={item.q} className="group">
                  <summary className="flex list-none items-center justify-between gap-6 py-5 text-lg font-bold [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <Plus size={22} className="shrink-0 text-forest transition-transform duration-200 group-open:rotate-45" aria-hidden="true" />
                  </summary>
                  <p className="-mt-1 max-w-[42rem] pb-6 leading-7 text-muted">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-ink py-12 text-white">
        <div className="shell flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <BridgeMark />
            <div><p className="font-display text-lg font-semibold">Care Setu</p><p className="text-sm text-sage-200">Connected care, clearer next steps.</p></div>
          </div>
          <p className="max-w-md text-sm leading-6 text-sage-200">Care Setu is a product concept and prototype. Capabilities are proposed and may change. It does not make clinical decisions and must not be used with real patient data.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
