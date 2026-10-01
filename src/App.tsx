import { FormEvent, useMemo, useState } from 'react'
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleAlert,
  Clock3,
  LoaderCircle,
  Mail,
  Menu,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react'
import {
  features,
  interestOptions,
  navigation,
  pricingOptions,
  roles,
} from './config/content'
import type { InterestLevel, WaitlistFormData } from './types'

const initialForm: WaitlistFormData = {
  name: '',
  email: '',
  role: '',
  interestLevel: '',
  featuresSelected: [],
  mostValuableFeature: '',
  willingnessToPay: '',
  pricingOther: '',
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

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [form, setForm] = useState<WaitlistFormData>(initialForm)
  const [status, setStatus] = useState<FormStatus>('idle')
  const [error, setError] = useState('')
  const [lastSubmittedAt, setLastSubmittedAt] = useState(0)

  const selectedFeatureLabels = useMemo(
    () => features.filter((feature) => form.featuresSelected.includes(feature.shortLabel)),
    [form.featuresSelected],
  )

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

  const validate = () => {
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return 'Please enter a valid email address.'
    if (!form.interestLevel) return 'Please tell us how interested you are.'
    if (form.featuresSelected.length === 0) return 'Please select at least one useful feature.'
    if (!form.mostValuableFeature) return 'Please choose the one feature you value most.'
    if (!form.willingnessToPay) return 'Please select a pricing range.'
    if (form.willingnessToPay === 'Other' && !form.pricingOther.trim()) return 'Please add the amount you had in mind.'
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
      ...form,
      featuresSelected: form.featuresSelected.join(' | '),
      willingnessToPay:
        form.willingnessToPay === 'Other' ? `Other: ${form.pricingOther}` : form.willingnessToPay,
      source: window.location.href,
      userAgent: navigator.userAgent,
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
      const dispatched = await Promise.race([
        submissionRequest,
        new Promise<true>((resolve) => {
          window.setTimeout(() => resolve(true), SUBMISSION_SETTLE_TIMEOUT_MS)
        }),
      ])

      if (!dispatched) throw new Error('Submission request failed')

      setLastSubmittedAt(now)
      setStatus('success')
    } catch {
      setError('We could not submit your response. Check your connection and try again.')
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-ink">
      <a href="#main" className="skip-link">Skip to main content</a>

      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/95 text-white backdrop-blur-md">
        <div className="mx-auto flex h-[72px] max-w-content items-center justify-between px-5 sm:px-8">
          <a href="#top" className="flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-200/70" aria-label="CareSetu home">
            <BrandMark />
            <span className="text-lg font-semibold tracking-tight">CareSetu</span>
          </a>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
            {navigation.map((item) => (
              <a key={item.href} href={item.href} className="nav-link">{item.label}</a>
            ))}
          </nav>

          <a href="#waitlist" className="hidden min-h-11 items-center rounded-xl bg-teal-500 px-5 py-3 font-semibold text-white transition-colors hover:bg-teal-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-200 md:inline-flex">
            Join the waitlist
          </a>

          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-xl border border-white/20 md:hidden"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {menuOpen && (
          <nav className="border-t border-white/10 bg-ink px-5 py-4 md:hidden" aria-label="Mobile navigation">
            <div className="mx-auto flex max-w-content flex-col gap-1">
              {navigation.map((item) => (
                <a key={item.href} href={item.href} className="rounded-lg px-3 py-3 text-base text-slate-200 hover:bg-white/10" onClick={() => setMenuOpen(false)}>{item.label}</a>
              ))}
              <a href="#waitlist" className="mt-2 rounded-xl bg-teal-500 px-4 py-3 text-center font-semibold text-white" onClick={() => setMenuOpen(false)}>Join the waitlist</a>
            </div>
          </nav>
        )}
      </header>

      <main id="main">
        <section id="top" className="relative bg-ink pb-20 pt-32 text-white lg:pb-28 lg:pt-40">
          <div className="hero-grid absolute inset-0 opacity-20" aria-hidden="true" />
          <div className="relative mx-auto grid max-w-content items-center gap-14 px-5 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-200/30 bg-teal-200/10 px-3 py-2 text-sm font-medium text-teal-100">
                <Sparkles size={16} aria-hidden="true" />
                Shaped for real hospital OPD workflows
              </div>
              <h1 className="max-w-3xl text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.035em] sm:text-5xl lg:text-6xl">
                The complete patient picture, without the clinical clutter.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300 sm:text-xl">
                CareSetu is a focused consultation workspace that brings history, risk, orders, referrals and follow-up into one consistent view for busy OPD teams.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href="#waitlist" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-teal-500 px-6 py-3 font-semibold text-white shadow-lg shadow-teal-900/20 transition-colors hover:bg-teal-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-200">
                  Join the waitlist
                </a>
                <a href="#how-it-works" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/25 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30">
                  See how it works <ArrowDown size={18} aria-hidden="true" />
                </a>
              </div>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-300">
                <span className="flex items-center gap-2"><Check size={17} className="text-teal-200" /> Built around the consultation</span>
                <span className="flex items-center gap-2"><Check size={17} className="text-teal-200" /> Consistent across departments</span>
              </div>
            </div>

            <div className="relative">
              <div className="mb-3 flex items-center justify-between text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
                <span>Illustrative product preview</span>
                <span className="normal-case tracking-normal">Fictional data</span>
              </div>
              <div className="overflow-hidden rounded-2xl border border-white/15 bg-mist text-ink shadow-2xl shadow-black/25">
                <div className="flex items-center justify-between border-b border-line bg-white px-4 py-3 sm:px-5">
                  <div className="flex items-center gap-3">
                    <span className="h-8 w-8 rounded-lg bg-ink" />
                    <div>
                      <p className="text-sm font-semibold">General Medicine</p>
                      <p className="text-xs text-slate-500">Today’s consultation queue</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-700">Room 11</span>
                </div>
                <div className="grid min-h-[420px] grid-cols-[90px_1fr] sm:grid-cols-[132px_1fr]">
                  <div className="border-r border-line bg-white p-3">
                    {['Overview', 'History', 'Orders', 'Reports', 'Follow-up'].map((item, index) => (
                      <div key={item} className={`mb-2 rounded-lg px-2 py-2 text-[11px] font-medium sm:text-xs ${index === 0 ? 'bg-teal-50 text-teal-700' : 'text-slate-500'}`}>{item}</div>
                    ))}
                  </div>
                  <div className="p-4 sm:p-5">
                    <div className="flex flex-col justify-between gap-3 border-b border-line pb-4 sm:flex-row sm:items-start">
                      <div>
                        <p className="text-base font-semibold">Aarav Mehta <span className="font-normal text-slate-500">· 62 M</span></p>
                        <p className="mt-1 text-xs text-slate-500">UHID 048271 · Follow-up consultation</p>
                      </div>
                      <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700"><CircleAlert size={13} /> Needs review</span>
                    </div>
                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      {[['BP', '136/84'], ['Pulse', '78 bpm'], ['SpO₂', '97%']].map(([label, value]) => (
                        <div key={label} className="rounded-xl border border-line bg-white p-3">
                          <p className="text-xs text-slate-500">{label}</p><p className="mt-1 text-sm font-semibold">{value}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 rounded-xl border border-line bg-white p-4">
                      <div className="flex items-center justify-between"><p className="text-sm font-semibold">Clinical summary</p><span className="text-xs text-slate-400">Updated today</span></div>
                      <div className="mt-3 space-y-2">
                        <div className="h-2.5 w-full rounded-full bg-slate-100" />
                        <div className="h-2.5 w-5/6 rounded-full bg-slate-100" />
                        <div className="h-2.5 w-2/3 rounded-full bg-slate-100" />
                      </div>
                    </div>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-xl border border-red-100 bg-red-50 p-3"><p className="text-xs font-semibold text-red-700">Monitoring alert</p><p className="mt-1 text-xs text-red-900">Digoxin result outside target range</p></div>
                      <div className="rounded-xl border border-teal-100 bg-teal-50 p-3"><p className="text-xs font-semibold text-teal-700">Next step</p><p className="mt-1 text-xs text-teal-900">Review labs before prescription</p></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="why" className="border-b border-line bg-mist py-20 lg:py-28">
          <div className="mx-auto max-w-content px-5 sm:px-8">
            <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
              <div>
                <p className="eyebrow">The OPD reality</p>
                <h2 className="section-title mt-4">Clinical context should not be a scavenger hunt.</h2>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="rounded-2xl border border-line bg-white p-6 shadow-card">
                  <p className="text-sm font-semibold text-coral">Today</p>
                  <p className="mt-3 text-lg font-semibold">Information lives in too many places.</p>
                  <p className="mt-3 leading-7 text-slate-600">Previous visits, reports, prescriptions and referral replies get split across paper, PDFs and separate systems.</p>
                </div>
                <div className="rounded-2xl bg-ink p-6 text-white shadow-card">
                  <p className="text-sm font-semibold text-teal-200">With CareSetu</p>
                  <p className="mt-3 text-lg font-semibold">The consultation has one clear centre.</p>
                  <p className="mt-3 leading-7 text-slate-300">The relevant story, open work and next steps stay visible in a structure clinicians can quickly learn.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 lg:py-28">
          <div className="mx-auto max-w-content px-5 sm:px-8">
            <div className="max-w-2xl">
              <p className="eyebrow">Designed around clinical attention</p>
              <h2 className="section-title mt-4">More clarity at the point of care.</h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">CareSetu is being shaped to reduce the searching, switching and ambiguity that slow down an OPD consultation.</p>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => {
                const Icon = feature.icon
                return (
                  <article key={feature.title} className="group rounded-2xl border border-line bg-white p-6 shadow-card transition-[border-color,box-shadow] duration-200 hover:border-teal-200 hover:shadow-soft">
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-teal-50 text-teal-700"><Icon size={22} aria-hidden="true" /></div>
                    <h3 className="mt-6 text-xl font-semibold tracking-tight">{feature.title}</h3>
                    <p className="mt-3 leading-7 text-slate-600">{feature.description}</p>
                    <p className="mt-5 border-t border-line pt-4 text-sm font-semibold leading-6 text-navy">{feature.benefit}</p>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="bg-ink py-20 text-white lg:py-28">
          <div className="mx-auto max-w-content px-5 sm:px-8">
            <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
              <div>
                <p className="eyebrow text-teal-200">A consultation, connected</p>
                <h2 className="section-title mt-4 text-white">From queue to follow-up in one continuous flow.</h2>
                <p className="mt-5 max-w-lg text-lg leading-8 text-slate-300">The same structure follows the clinician across specialties, while keeping department-specific context where it belongs.</p>
              </div>
              <ol className="space-y-4">
                {[
                  ['01', 'Choose the department', 'Start with today’s queue, incoming referrals and the patients who need review.'],
                  ['02', 'Open the patient cockpit', 'See the current complaint, clinical history, diagnoses, vitals and active problems together.'],
                  ['03', 'Act with context', 'Review monitoring, reports, prescriptions and referrals without losing the patient story.'],
                  ['04', 'Close the loop', 'Set the care plan and follow-up while the next appointment remains visible to the team.'],
                ].map(([number, title, body]) => (
                  <li key={number} className="grid grid-cols-[52px_1fr] gap-4 rounded-2xl border border-white/12 bg-white/[0.04] p-5 sm:grid-cols-[64px_1fr] sm:p-6">
                    <span className="font-mono text-sm font-semibold text-teal-200">{number}</span>
                    <div><h3 className="text-lg font-semibold">{title}</h3><p className="mt-2 leading-7 text-slate-300">{body}</p></div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section id="waitlist" className="bg-mist py-20 lg:py-28">
          <div className="mx-auto max-w-content px-5 sm:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <p className="eyebrow">Help shape CareSetu</p>
                <h2 className="section-title mt-4">Would this make your OPD day easier?</h2>
                <p className="mt-5 text-lg leading-8 text-slate-600">Share what matters to you. Your feedback will help us validate the workflow, prioritise features and understand a practical price point.</p>
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
                    <h3 className="mt-6 text-3xl font-semibold tracking-tight">You’re on the list.</h3>
                    <p className="mt-4 max-w-md text-lg leading-8 text-slate-600">Thank you for helping shape CareSetu. Your perspective will guide what we prioritise next.</p>
                    <a href="#top" className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-xl border border-line px-5 py-3 font-semibold text-navy hover:border-teal-300">Back to the top <ArrowUpRight size={18} /></a>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="form-section">
                      <div className="form-heading"><span>1</span><div><h3>About you</h3><p>Just enough to understand whose perspective we’re hearing.</p></div></div>
                      <div className="mt-6 grid gap-5 sm:grid-cols-2">
                        <label className="field-label">Name <span className="optional">Optional</span><input className="input" type="text" autoComplete="name" value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Your name" /></label>
                        <label className="field-label">Email <span className="required">Required</span><input className="input" type="email" inputMode="email" autoComplete="email" required value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="you@example.com" /></label>
                      </div>
                      <label className="field-label mt-5">Your role <span className="optional">Optional</span><span className="select-wrap"><select className="input appearance-none" value={form.role} onChange={(e) => update('role', e.target.value)}><option value="">Select your role</option>{roles.map((role) => <option key={role}>{role}</option>)}</select><ChevronDown size={18} aria-hidden="true" /></span></label>
                    </div>

                    <div className="form-section">
                      <div className="form-heading"><span>2</span><div><h3>Product fit</h3><p>Tell us whether CareSetu feels useful for your setting.</p></div></div>
                      <fieldset className="mt-6"><legend className="field-label">How interested would you be in using something like this? <span className="required">Required</span></legend><div className="mt-3 grid gap-2 sm:grid-cols-2">{interestOptions.map((option) => <label key={option} className={`choice ${form.interestLevel === option ? 'choice-selected' : ''}`}><input className="sr-only" type="radio" name="interest" value={option} checked={form.interestLevel === option} onChange={() => update('interestLevel', option as InterestLevel)} /><span className="choice-dot" />{option}</label>)}</div></fieldset>

                      <fieldset className="mt-7"><legend className="field-label">Which features are most useful to you? <span className="required">Select all that apply</span></legend><div className="mt-3 flex flex-wrap gap-2">{features.map((feature) => { const selected = form.featuresSelected.includes(feature.shortLabel); return <label key={feature.shortLabel} className={`chip ${selected ? 'chip-selected' : ''}`}><input className="sr-only" type="checkbox" checked={selected} onChange={() => toggleFeature(feature.shortLabel)} />{selected && <Check size={16} />}{feature.shortLabel}</label> })}</div></fieldset>

                      <fieldset className="mt-7"><legend className="field-label">Which ONE feature would be most valuable to you? <span className="required">Required</span></legend><div className="mt-3 grid gap-2">{(selectedFeatureLabels.length ? selectedFeatureLabels : features).map((feature) => <label key={feature.shortLabel} className={`choice ${form.mostValuableFeature === feature.shortLabel ? 'choice-selected' : ''}`}><input className="sr-only" type="radio" name="mostValuable" value={feature.shortLabel} checked={form.mostValuableFeature === feature.shortLabel} onChange={() => update('mostValuableFeature', feature.shortLabel)} /><span className="choice-dot" />{feature.shortLabel}</label>)}</div></fieldset>
                    </div>

                    <div className="form-section">
                      <div className="form-heading"><span>3</span><div><h3>Pricing and priorities</h3><p>There is no wrong answer—we’re looking for an honest signal.</p></div></div>
                      <fieldset className="mt-6"><legend className="field-label">If this solved the problem well, what would your clinic or department be comfortable paying? <span className="required">Required</span></legend><div className="mt-3 grid gap-2">{pricingOptions.map((option) => <label key={option} className={`choice ${form.willingnessToPay === option ? 'choice-selected' : ''}`}><input className="sr-only" type="radio" name="pricing" value={option} checked={form.willingnessToPay === option} onChange={() => update('willingnessToPay', option)} /><span className="choice-dot" />{option}</label>)}</div></fieldset>
                      {form.willingnessToPay === 'Other' && <label className="field-label mt-4">Amount or pricing model <span className="required">Required</span><input className="input" type="text" value={form.pricingOther} onChange={(e) => update('pricingOther', e.target.value)} placeholder="Tell us what feels practical" /></label>}
                      <label className="field-label mt-7">Is there anything you’d want this product to do that isn’t mentioned here? <span className="optional">Optional</span><textarea className="input min-h-28 resize-y" value={form.missingFeatures} onChange={(e) => update('missingFeatures', e.target.value)} placeholder="A missing feature, workflow or integration…" /></label>
                      <label className="field-label mt-5">Any other thoughts, concerns or suggestions? <span className="optional">Optional</span><textarea className="input min-h-28 resize-y" value={form.generalFeedback} onChange={(e) => update('generalFeedback', e.target.value)} placeholder="Anything else you’d like us to know…" /></label>
                    </div>

                    <div className="absolute -left-[9999px]" aria-hidden="true"><label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => update('website', e.target.value)} /></label></div>

                    <div id="form-status" tabIndex={-1} aria-live="polite">
                      {status === 'error' && <div className="mb-4 flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800" role="alert"><CircleAlert className="mt-0.5 shrink-0" size={18} /><span>{error}</span></div>}
                    </div>
                    <button type="submit" disabled={status === 'submitting'} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-200">
                      {status === 'submitting' ? <><LoaderCircle className="animate-spin" size={19} /> Submitting…</> : 'Join the waitlist & share feedback'}
                    </button>
                    <p className="mt-4 text-center text-sm leading-6 text-slate-500">We’ll use your email for the CareSetu waitlist and your feedback to improve and validate the product. We will not sell your email.</p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line bg-white py-10">
        <div className="mx-auto flex max-w-content flex-col gap-5 px-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="flex items-center gap-3"><BrandMark /><div><p className="font-semibold">CareSetu</p><p className="text-sm text-slate-500">A clearer consultation workspace.</p></div></div>
          <p className="max-w-md text-sm leading-6 text-slate-500">CareSetu is currently a product concept and prototype. It does not provide clinical decision-making and should not be used with real patient data.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
