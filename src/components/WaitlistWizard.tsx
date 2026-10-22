import { FormEvent, useRef, useState } from 'react'
import { ArrowLeft, Check, CheckCircle2, CircleAlert, LoaderCircle } from 'lucide-react'
import {
  careSettingOptions,
  features,
  groupLabels,
  interestOptions,
  roles,
  serviceModelOptions,
  willingnessToPayOptions,
  type FeatureGroup,
} from '../config/content'
import type { InterestLevel, WaitlistFormData } from '../types'

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
const PATIENT_ROLES = ['Patient', 'Caregiver']
const steps = ['About you', 'What matters', 'Pricing and thoughts']
const featureGroups: FeatureGroup[] = ['care', 'patient', 'hospital']

const toggle = (list: string[], value: string) =>
  list.includes(value) ? list.filter((item) => item !== value) : [...list, value]

export function WaitlistWizard() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<WaitlistFormData>(initialForm)
  const [status, setStatus] = useState<FormStatus>('idle')
  const [error, setError] = useState('')
  const [lastSubmittedAt, setLastSubmittedAt] = useState(0)
  const topRef = useRef<HTMLDivElement>(null)

  const selectedRoles = form.role ? form.role.split(' | ') : []
  // Pricing questions are for organisations; patients and caregivers skip them.
  const isPatientOnly = selectedRoles.length > 0 && selectedRoles.every((role) => PATIENT_ROLES.includes(role))

  const update = <K extends keyof WaitlistFormData>(key: K, value: WaitlistFormData[K]) => {
    setForm((current) => ({ ...current, [key]: value }))
    if (status === 'error') setStatus('idle')
  }

  const validateStep = (index: number) => {
    if (index === 0 && !/^\S+@\S+\.\S+$/.test(form.email.trim())) return 'Enter a valid email address so we can reach you.'
    if (index === 1 && !form.interestLevel) return 'Choose how interested you would be.'
    if (index === 1 && form.featuresSelected.length === 0) return 'Select at least one feature that would be useful.'
    if (index === 2 && form.serviceModels.includes('Other') && !form.serviceModelOther.trim()) return 'Describe the other service model you have in mind.'
    return ''
  }

  const showError = (message: string) => {
    setError(message)
    setStatus('error')
    requestAnimationFrame(() => document.getElementById('form-status')?.focus())
  }

  const goTo = (index: number) => {
    setStep(index)
    setStatus('idle')
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleNext = () => {
    const validationError = validateStep(step)
    if (validationError) return showError(validationError)
    goTo(step + 1)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (step < steps.length - 1) return handleNext()
    if (status === 'submitting') return

    for (const index of [0, 1, 2]) {
      const validationError = validateStep(index)
      if (validationError) {
        if (index !== step) setStep(index)
        return showError(validationError)
      }
    }

    if (form.website) {
      setStatus('success')
      return
    }

    const now = Date.now()
    if (now - lastSubmittedAt < 30_000) return showError('You just sent a response. Wait 30 seconds before sending another.')

    const endpoint = import.meta.env.VITE_WAITLIST_ENDPOINT as string | undefined
    if (!endpoint) return showError('The waitlist isn’t connected yet. Try again once the site owner finishes setup.')

    setStatus('submitting')
    setError('')

    const payload = new URLSearchParams({
      name: form.name.trim(),
      email: form.email.trim(),
      role: form.role,
      careSettings: form.careSettings.join(' | '),
      interestLevel: form.interestLevel,
      featuresSelected: form.featuresSelected.join(' | '),
      featuresToExclude: form.featuresToExclude.join(' | '),
      serviceModels: form.serviceModels.join(' | '),
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
      showError('Your response didn’t send. Check your connection and try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex min-h-[460px] flex-col items-center justify-center text-center" role="status">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-forest text-white"><CheckCircle2 size={32} aria-hidden="true" /></span>
        <h3 className="mt-6 text-3xl font-semibold">You’re on the waitlist.</h3>
        <p className="mt-3 max-w-md text-lg leading-8 text-muted">Thank you for helping shape Care Setu. We’ll write to {form.email.trim() || 'you'} when pilots open.</p>
        <a href="#top" className="btn-quiet mt-8">Back to the top</a>
      </div>
    )
  }

  const chips = (values: readonly string[], selected: string[], onToggle: (value: string) => void, extra = '') => (
    <div className="mt-3 flex flex-wrap gap-2">
      {values.map((value) => {
        const isOn = selected.includes(value)
        return (
          <label key={value} className={`chip ${extra} ${isOn ? 'chip-selected' : ''}`}>
            <input className="sr-only" type="checkbox" checked={isOn} onChange={() => onToggle(value)} />
            {isOn && <Check size={16} aria-hidden="true" />}
            {value}
          </label>
        )
      })}
    </div>
  )

  return (
    <div ref={topRef} className="scroll-mt-28">
      <ol className="grid grid-cols-3 gap-2" aria-label="Form progress">
        {steps.map((label, index) => {
          const state = index < step ? 'done' : index === step ? 'current' : 'todo'
          return (
            <li key={label} aria-current={state === 'current' ? 'step' : undefined}>
              <button
                type="button"
                disabled={index > step}
                onClick={() => goTo(index)}
                className="group block w-full text-left disabled:cursor-default"
              >
                <span className={`block h-1.5 rounded-full transition-colors duration-300 ${state === 'todo' ? 'bg-sage-200' : 'bg-forest'}`} />
                <span className={`mt-2 block text-sm ${state === 'current' ? 'font-bold text-ink' : 'text-muted'} ${state === 'done' ? 'group-hover:text-ink' : ''}`}>
                  <span className="sr-only">Step {index + 1}: </span>{label}
                </span>
              </button>
            </li>
          )
        })}
      </ol>

      <form onSubmit={handleSubmit} noValidate className="mt-8">
        {step === 0 && (
          <fieldset>
            <legend className="font-display text-2xl font-semibold">Tell us whose view we’re hearing.</legend>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <label className="field-label">Name <span className="hint">optional</span>
                <input className="input" type="text" autoComplete="name" maxLength={120} value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Your name" />
              </label>
              <label className="field-label">Email
                <input className="input" type="email" inputMode="email" autoComplete="email" maxLength={254} required aria-required="true" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="you@hospital.in" />
              </label>
            </div>
            <fieldset className="mt-7">
              <legend className="field-label">Your role <span className="hint">select any that apply</span></legend>
              {chips(roles, selectedRoles, (role) => update('role', toggle(selectedRoles, role).join(' | ')))}
            </fieldset>
            {!isPatientOnly && (
              <fieldset className="mt-7">
                <legend className="field-label">Which care settings do you work in? <span className="hint">optional</span></legend>
                {chips(careSettingOptions, form.careSettings, (value) => update('careSettings', toggle(form.careSettings, value)))}
              </fieldset>
            )}
          </fieldset>
        )}

        {step === 1 && (
          <fieldset>
            <legend className="font-display text-2xl font-semibold">What would make a difference?</legend>
            <fieldset className="mt-6">
              <legend className="field-label">How interested would you be in using something like this?</legend>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {interestOptions.map((option) => (
                  <label key={option} className={`choice ${form.interestLevel === option ? 'choice-selected' : ''}`}>
                    <input className="sr-only" type="radio" name="interest" value={option} checked={form.interestLevel === option} onChange={() => update('interestLevel', option as InterestLevel)} />
                    <span className="choice-dot" aria-hidden="true" />{option}
                  </label>
                ))}
              </div>
            </fieldset>
            <fieldset className="mt-8">
              <legend className="field-label">Which features would be useful to you? <span className="hint">select any that apply</span></legend>
              {featureGroups.map((group) => (
                <div key={group} className="mt-4">
                  <p className="text-sm text-muted">{groupLabels[group]}</p>
                  {chips(features.filter((f) => f.group === group).map((f) => f.shortLabel), form.featuresSelected, (value) => update('featuresSelected', toggle(form.featuresSelected, value)))}
                </div>
              ))}
            </fieldset>
            <details className="group mt-8 rounded-xl border border-line bg-paper/60 p-4 open:bg-white">
              <summary className="field-label list-none">
                <span className="flex items-center justify-between gap-3">
                  Anything you’d leave out for your setting?
                  <span className="hint shrink-0 group-open:hidden">optional, show</span>
                </span>
              </summary>
              {chips(features.map((f) => f.shortLabel), form.featuresToExclude, (value) => update('featuresToExclude', toggle(form.featuresToExclude, value)), 'chip-exclude')}
            </details>
          </fieldset>
        )}

        {step === 2 && (
          <fieldset>
            <legend className="font-display text-2xl font-semibold">{isPatientOnly ? 'Anything else we should know?' : 'Help us price it fairly.'}</legend>
            {!isPatientOnly && (
              <>
                <p className="mt-2 text-muted">Nothing is decided. These are discovery questions, not published prices.</p>
                <fieldset className="mt-6">
                  <legend className="field-label">Which pricing models should we explore? <span className="hint">optional</span></legend>
                  {chips(serviceModelOptions, form.serviceModels, (value) => update('serviceModels', toggle(form.serviceModels, value)))}
                </fieldset>
                {form.serviceModels.includes('Other') && (
                  <label className="field-label mt-4">Describe the other model
                    <input className="input" type="text" maxLength={300} value={form.serviceModelOther} onChange={(e) => update('serviceModelOther', e.target.value)} placeholder="What would work for your organisation?" />
                  </label>
                )}
                <fieldset className="mt-7">
                  <legend className="field-label">If a pilot proved its value, what might your organisation pay per month? <span className="hint">optional</span></legend>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {willingnessToPayOptions.map((option) => (
                      <label key={option} className={`choice ${form.willingnessToPay === option ? 'choice-selected' : ''}`}>
                        <input className="sr-only" type="radio" name="willingness-to-pay" value={option} checked={form.willingnessToPay === option} onChange={() => update('willingnessToPay', option)} />
                        <span className="choice-dot" aria-hidden="true" />{option}
                      </label>
                    ))}
                  </div>
                  {form.willingnessToPay === 'Other amount' && (
                    <label className="field-label mt-4" htmlFor="willingness-to-pay-other">Amount and pricing unit <span className="hint">optional</span>
                      <input id="willingness-to-pay-other" className="input" type="text" maxLength={160} value={form.willingnessToPayOther} onChange={(e) => update('willingnessToPayOther', e.target.value)} placeholder="For example, per location or per clinician" />
                    </label>
                  )}
                </fieldset>
              </>
            )}
            <p className="mt-7 rounded-xl bg-clay-50 px-4 py-3 text-[15px] leading-6 text-clay-700">Please leave out patient names, identifiers and clinical details.</p>
            <label className="field-label mt-5">What would you want it to do that isn’t mentioned here? <span className="hint">optional</span>
              <textarea className="input min-h-28 resize-y" maxLength={3000} value={form.missingFeatures} onChange={(e) => update('missingFeatures', e.target.value)} placeholder="A missing feature, workflow or integration" />
            </label>
            <label className="field-label mt-5">Any other thoughts or concerns? <span className="hint">optional</span>
              <textarea className="input min-h-28 resize-y" maxLength={3000} value={form.generalFeedback} onChange={(e) => update('generalFeedback', e.target.value)} placeholder="Anything else you’d like us to know" />
            </label>
          </fieldset>
        )}

        <div className="absolute -left-[9999px]" aria-hidden="true">
          <label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => update('website', e.target.value)} /></label>
        </div>

        <div id="form-status" tabIndex={-1} aria-live="polite" className="mt-8 outline-none">
          {status === 'error' && (
            <div className="mb-4 flex gap-3 rounded-xl border border-clay-100 bg-clay-50 p-4 text-[15px] text-clay-700" role="alert">
              <CircleAlert className="mt-0.5 shrink-0" size={18} aria-hidden="true" /><span>{error}</span>
            </div>
          )}
        </div>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          {step > 0 ? (
            <button type="button" className="btn-quiet" onClick={() => goTo(step - 1)}><ArrowLeft size={18} aria-hidden="true" /> Back</button>
          ) : <span className="hidden sm:block" />}
          {step < steps.length - 1 ? (
            <button type="submit" className="btn-primary sm:min-w-44">Continue</button>
          ) : (
            <button type="submit" disabled={status === 'submitting'} className="btn-primary disabled:cursor-not-allowed disabled:opacity-60 sm:min-w-56">
              {status === 'submitting' ? <><LoaderCircle className="animate-spin" size={19} aria-hidden="true" /> Joining…</> : 'Join the waitlist'}
            </button>
          )}
        </div>
        <p className="mt-5 text-sm leading-6 text-muted">We use your email for the Care Setu waitlist and your answers to shape the product. We never sell your email.</p>
      </form>
    </div>
  )
}
