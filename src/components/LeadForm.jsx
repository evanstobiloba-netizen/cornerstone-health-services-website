import { useId, useRef, useState } from 'react'
import { insurances, practice, services } from '../data/site.js'
import Button from './Button.jsx'
import Icon from './Icon.jsx'

/**
 * Config-driven lead form. Powers Book Now, Contact, Refer a Loved One,
 * Talk to a Specialist, Volunteer and Share Your Experience, so those pages
 * share one validated implementation instead of six near-copies.
 *
 * SECURITY: this is the front end only. "Encrypted" is true end-to-end once
 * this POSTs over HTTPS to a HIPAA-covered intake service. Set
 * VITE_INTAKE_ENDPOINT to enable real submission; without it the form runs in
 * an explicit demo mode and transmits nothing.
 *
 * Design decision: free-text fields are framed for logistics, not clinical
 * detail. Inviting symptoms into a web form creates needless PHI exposure, so
 * the copy says so plainly.
 */

const endpoint = import.meta.env.VITE_INTAKE_ENDPOINT
const demoMode = !endpoint

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const visitTypes = [
  'Either is fine',
  'Telehealth video visit',
  'In person in Quincy',
]

const preferredTimes = [
  'Morning (8am – 12pm)',
  'Afternoon (12pm – 4pm)',
  'Late afternoon (4pm – 6pm)',
  'Any time',
]

const availabilities = [
  'Weekday mornings',
  'Weekday afternoons',
  'Weekday evenings',
  'Weekends',
  'Flexible',
]

const reasons = [
  ...services.map((s) => s.title),
  'Anxiety or low mood',
  'ADHD assessment',
  'Medication review',
  'Something else',
  "I'm not sure yet",
]

/**
 * US states + territories, taken from the practice's own live booking form
 * template so the "State" select offers exactly the same list.
 */
const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'District Of Columbia', 'Florida', 'Georgia',
  'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
  'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virgin Islands', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin',
  'Wyoming',
]

/**
 * Field definitions. This is a registry of every field a form may choose from;
 * each form renders the subset (and order) listed in its `fields` array in
 * `src/data/site.js`, so not every entry below is used by every form.
 *
 * The booking fields (address … privacyConsent) mirror the structure of the
 * practice's own live appointment form, so a booking started here looks the
 * same as one started on the site the practice already uses. `span` is the
 * column width out of the form's 6-column grid (6 = full width, 3 = half,
 * 2 = a third); fields without a span default to half width.
 */
const FIELD_DEFS = {
  name: { label: 'Full name', type: 'text', autoComplete: 'name', required: true, placeholder: 'Jordan Ellis', span: 6 },
  email: { label: 'Email', type: 'email', autoComplete: 'email', required: true, placeholder: 'you@example.com' },
  phone: { label: 'Phone', type: 'tel', autoComplete: 'tel', required: true, placeholder: '(617) 555-0142' },

  /* --- Booking form (mirrors the live appointment form) --- */
  address: {
    label: 'Address',
    type: 'text',
    autoComplete: 'street-address',
    required: true,
    placeholder: 'Enter address here',
    span: 6,
  },
  city: {
    label: 'City',
    type: 'text',
    autoComplete: 'address-level2',
    required: true,
    placeholder: 'Enter city here',
    span: 2,
  },
  state: {
    label: 'State',
    type: 'select',
    autoComplete: 'address-level1',
    options: ['Please select…', ...US_STATES],
    span: 2,
  },
  zip: {
    label: 'Zip Code',
    type: 'text',
    autoComplete: 'postal-code',
    required: true,
    placeholder: 'Enter zip code here',
    inputMode: 'numeric',
    span: 2,
  },
  contactPref: {
    label: 'How do you prefer to be contacted?',
    type: 'radio',
    required: true,
    options: ['Phone', 'Email'],
    span: 6,
  },
  bestTimeToCall: {
    label: 'Best time to call',
    type: 'select',
    required: true,
    options: [
      'Please select…',
      'Anytime',
      'Morning at Home',
      'Morning at Work',
      'Afternoon at Home',
      'Afternoon at Work',
      'Evening at Home',
      'Evening at Work',
    ],
  },
  apptDate: { label: 'Preferred Date', type: 'date' },
  apptTime: { label: 'Preferred Time', type: 'time' },
  comment: {
    label: 'Comment',
    type: 'textarea',
    rows: 4,
    placeholder: 'Enter comment here',
    hint: 'Scheduling constraints belong here. Please leave detailed clinical history for your first visit — this form is not a secure place for medical records.',
  },
  privacyConsent: {
    label: 'By submitting this form you agree to the terms of the Privacy Policy.',
    type: 'checkbox',
    required: true,
  },

  visitType: { label: 'Visit preference', type: 'select', options: visitTypes },
  insurance: {
    label: 'Insurance',
    type: 'select',
    required: true,
    options: ['Please select a plan…', ...insurances.map((i) => i.name), 'Self-pay / out of network', 'Not sure — please help me check'],
  },
  reason: { label: 'Main reason for the visit', type: 'select', required: true, options: ['Please select a reason…', ...reasons] },
  preferredTime: { label: 'Best time to reach you', type: 'select', options: preferredTimes },
  availability: { label: 'When could you help?', type: 'select', options: availabilities },
  lovedOneName: { label: "Your loved one's name", type: 'text', required: true, placeholder: 'First name is fine' },
  relationship: { label: 'Your relationship to them', type: 'text', required: true, placeholder: 'Parent, partner, friend…' },
  lovedOneContact: { label: "Their contact details (if you have consent to share)", type: 'text', placeholder: 'Phone or email' },
  message: {
    label: 'Message',
    type: 'textarea',
    hint: 'Scheduling constraints are useful here. Please leave detailed clinical history for your first visit — this form is not a secure place for medical records.',
  },
  story: {
    label: 'Your experience',
    type: 'textarea',
    required: true,
    rows: 6,
    hint: 'Write as much or as little as you like. Please avoid naming other people.',
  },
  consentPublish: {
    label: 'I give permission for Cornerstone Health Services Inc to share my experience on this website and in their materials.',
    type: 'checkbox',
    required: true,
  },
}

export default function LeadForm({ form, id }) {
  const uid = useId()
  const fid = (n) => `${id}-${n}-${uid}`
  const formRef = useRef(null)
  const summaryRef = useRef(null)

  const [values, setValues] = useState(() =>
    Object.fromEntries(
      form.fields.map((f) => [f, FIELD_DEFS[f].type === 'checkbox' ? false : '']),
    ),
  )
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const set = (key) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setValues((v) => ({ ...v, [key]: value }))
    setErrors((prev) => {
      if (!prev[key]) return prev
      const next = { ...prev }
      delete next[key]
      return next
    })
  }

  function validate(v) {
    const e = {}
    for (const key of form.fields) {
      const def = FIELD_DEFS[key]
      const val = v[key]
      if (def.type === 'checkbox') {
        if (def.required && !val) {
          e[key] =
            key === 'consentPublish'
              ? 'We need your permission before we can publish your story.'
              : 'This box is required.'
        }
        continue
      }
      if (def.type === 'radio') {
        if (def.required && !val) {
          e[key] = `Please choose an option for ${def.label.toLowerCase()}.`
        }
        continue
      }
      if (!def.required) continue
      if (!val || !String(val).trim()) {
        e[key] = `Please fill in ${def.label.toLowerCase()}.`
        continue
      }
      if (def.type === 'select' && String(val).startsWith('Please select')) {
        e[key] = `Please choose an option for ${def.label.toLowerCase()}.`
        continue
      }
      if (def.type === 'email' && !EMAIL_RE.test(val.trim())) {
        e[key] = 'That email address does not look right.'
      }
      if (def.type === 'tel' && val.replace(/\D/g, '').length < 10) {
        e[key] = 'Please include the area code and 10 digits.'
      }
    }
    return e
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const found = validate(values)
    setErrors(found)

    if (Object.keys(found).length > 0) {
      requestAnimationFrame(() => summaryRef.current?.focus())
      return
    }

    if (demoMode) {
      setStatus('sent')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ form: form.path, ...values }),
      })
      if (!res.ok) throw new Error(`Request failed (${res.status})`)
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div
        className="rounded-clinical-lg border border-cyan-200 bg-white p-8 text-center shadow-clinical"
        role="status"
        aria-live="polite"
      >
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-cyan-50 text-cyan-deep">
          <Icon name="check" size={28} strokeWidth={2.4} />
        </span>
        <h3 className="mt-5 text-xl font-medium text-navy">
          Thank you — your message is with us.
        </h3>
        <p className="mx-auto mt-3 max-w-md text-[0.95rem] leading-relaxed text-body">
          A member of our team will be in touch shortly. If you would rather
          speak to someone now, call{' '}
          <a
            href={practice.phoneHref}
            className="font-bold text-cyan-deep underline underline-offset-2"
          >
            {practice.phoneDisplay}
          </a>
          .
        </p>

        {demoMode && (
          <p className="mx-auto mt-5 max-w-md rounded-clinical border border-coral/40 bg-coral-50 px-4 py-3 text-xs leading-relaxed text-coral-deep">
            <strong>Demo mode:</strong> this build has no intake endpoint
            configured, so your details were validated but{' '}
            <strong>not transmitted or stored</strong>. See README.md to connect
            a secure endpoint.
          </p>
        )}
      </div>
    )
  }

  const errorList = Object.entries(errors)

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      aria-labelledby={`${id}-heading-${uid}`}
      aria-busy={status === 'sending' ? 'true' : undefined}
      className="rounded-clinical-lg border border-navy-100 bg-white p-6 shadow-clinical sm:p-8"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-script text-2xl leading-none text-blue-deep">
            {form.script}
          </p>
          <h2
            id={`${id}-heading-${uid}`}
            className="mt-1 text-xl font-medium text-navy sm:text-2xl"
          >
            {form.eyebrow}
          </h2>
        </div>
        <span className="hidden shrink-0 items-center gap-1.5 rounded-full bg-cyan-50 px-3 py-1 text-[0.7rem] font-bold text-cyan-deep ring-1 ring-inset ring-cyan-200 sm:inline-flex">
          <Icon name="lock" size={13} strokeWidth={2.2} />
          Encrypted
        </span>
      </div>

      {demoMode && (
        <p className="mt-5 rounded-clinical border border-navy-100 bg-navy-50 px-4 py-3 text-xs leading-relaxed text-navy-600">
          <strong className="text-navy">Developer notice:</strong> running
          without <code className="font-mono">VITE_INTAKE_ENDPOINT</code>.
          Submissions are validated in the browser and discarded.
        </p>
      )}

      {errorList.length > 0 && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="mt-5 rounded-clinical border border-coral/40 bg-coral-50 px-4 py-3"
        >
          <p className="flex items-center gap-2 text-sm font-bold text-coral-deep">
            <Icon name="alert-triangle" size={16} />
            Please check {errorList.length}{' '}
            {errorList.length === 1 ? 'field' : 'fields'} below.
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-coral-deep">
            {errorList.map(([key, msg]) => (
              <li key={key}>
                <a href={`#${fid(key)}`} className="underline underline-offset-2">
                  {msg}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="mt-6 text-xs text-navy-400">
        Fields marked <span className="text-coral" aria-hidden="true">*</span>
        <span className="sr-only"> with an asterisk</span> are required.
      </p>

      <div className="mt-3 grid gap-5 sm:grid-cols-6">
        {form.fields.map((key) => {
          const def = FIELD_DEFS[key]
          const wide =
            def.type === 'textarea' ||
            def.type === 'checkbox' ||
            key === 'lovedOneContact'
          const span = def.span ?? (wide ? 6 : 3)
          const spanClass =
            { 2: 'sm:col-span-2', 3: 'sm:col-span-3', 6: 'sm:col-span-6' }[span] || ''
          const errorId = errors[key] ? `${fid(key)}-error` : null
          const hintId = def.hint ? `${fid(key)}-hint` : null
          const describedBy =
            [hintId, errorId].filter(Boolean).join(' ') || undefined
          const ariaInvalid = errors[key] ? 'true' : undefined
          const ariaRequired = def.required ? 'true' : undefined
          return (
            <Field
              key={key}
              id={fid(key)}
              def={def}
              errorId={errorId}
              error={errors[key]}
              className={spanClass}
            >
              {def.type === 'textarea' ? (
                <textarea
                  id={fid(key)}
                  name={key}
                  rows={def.rows || 4}
                  maxLength={2000}
                  value={values[key]}
                  onChange={set(key)}
                  aria-invalid={ariaInvalid}
                  aria-required={ariaRequired}
                  aria-describedby={describedBy}
                  className={inputCls(errors[key])}
                />
              ) : def.type === 'select' ? (
                <select
                  id={fid(key)}
                  name={key}
                  autoComplete={def.autoComplete}
                  value={values[key]}
                  onChange={set(key)}
                  aria-invalid={ariaInvalid}
                  aria-required={ariaRequired}
                  aria-describedby={describedBy}
                  className={inputCls(errors[key])}
                >
                  {def.options.map((o, i) => (
                    <option key={o} value={i === 0 && o.startsWith('Please select') ? '' : o}>
                      {o}
                    </option>
                  ))}
                </select>
              ) : def.type === 'radio' ? (
                <div
                  id={fid(key)}
                  className="flex flex-wrap gap-x-6 gap-y-2.5"
                >
                  {def.options.map((o, i) => (
                    <label
                      key={o}
                      htmlFor={`${fid(key)}-${i}`}
                      className="inline-flex cursor-pointer items-center gap-2 text-[0.95rem] text-body"
                    >
                      <input
                        id={`${fid(key)}-${i}`}
                        type="radio"
                        name={key}
                        value={o}
                        checked={values[key] === o}
                        onChange={set(key)}
                        aria-invalid={ariaInvalid}
                        aria-required={ariaRequired}
                        aria-describedby={describedBy}
                        className="h-4 w-4 shrink-0 accent-navy"
                      />
                      {o}
                    </label>
                  ))}
                </div>
              ) : def.type === 'checkbox' ? (
                <label
                  htmlFor={fid(key)}
                  className={`flex cursor-pointer gap-3 rounded-clinical border p-4 ${
                    errors[key] ? 'border-coral bg-coral-50' : 'border-navy-100 bg-calm'
                  }`}
                >
                  <input
                    id={fid(key)}
                    name={key}
                    type="checkbox"
                    checked={values[key]}
                    onChange={set(key)}
                    aria-invalid={ariaInvalid}
                    aria-required={ariaRequired}
                    aria-describedby={describedBy}
                    className="mt-0.5 h-5 w-5 shrink-0 accent-navy"
                  />
                  <span className="text-sm leading-relaxed text-body">
                    {key === 'privacyConsent' ? (
                      <>
                        By submitting this form you agree to the terms of the{' '}
                        <a
                          href={practice.privacyUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                          onClick={(e) => e.stopPropagation()}
                          className="underline underline-offset-2"
                        >
                          Privacy Policy
                        </a>
                        .
                      </>
                    ) : (
                      def.label
                    )}
                  </span>
                </label>
              ) : (
                <input
                  id={fid(key)}
                  name={key}
                  type={def.type}
                  autoComplete={def.autoComplete}
                  inputMode={def.inputMode ?? (def.type === 'tel' ? 'tel' : undefined)}
                  value={values[key]}
                  onChange={set(key)}
                  placeholder={def.placeholder}
                  aria-invalid={ariaInvalid}
                  aria-required={ariaRequired}
                  aria-describedby={describedBy}
                  className={inputCls(errors[key])}
                />
              )}
            </Field>
          )
        })}
      </div>

      {status === 'error' && (
        <p
          role="alert"
          className="mt-5 rounded-clinical border border-coral/40 bg-coral-50 px-4 py-3 text-sm font-semibold text-coral-deep"
        >
          We could not send that just now. Please call us instead — we would
          rather hear from you.
        </p>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button
          type="submit"
          size="lg"
          icon={status === 'sending' ? undefined : 'lock'}
          disabled={status === 'sending'}
          className="w-full disabled:opacity-60 sm:w-auto"
        >
          {status === 'sending' ? 'Sending…' : form.submitLabel || 'Submit'}
        </Button>
        <Button
          href={practice.phoneHref}
          variant="outline"
          size="lg"
          icon="phone"
          className="w-full sm:w-auto"
        >
          Or call {practice.phoneDisplay}
        </Button>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-navy-400">
        {form.disclaimer}{' '}
        {!form.fields.includes('privacyConsent') && (
          <>
            By submitting this form you agree to the terms of our{' '}
            <a
              href={practice.privacyUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="underline underline-offset-2"
            >
              Privacy Policy
            </a>
            .{' '}
          </>
        )}
        In a crisis, call or text 988.
      </p>
    </form>
  )
}

function inputCls(error) {
  return [
    'w-full rounded-clinical border-2 bg-white px-3.5 py-2.5 text-[0.95rem] text-navy',
    'placeholder:text-navy-400 transition-colors',
    error ? 'border-coral focus:border-coral' : 'border-navy-100 focus:border-blue',
  ].join(' ')
}

function Field({ id, def, error, errorId, children, className = '' }) {
  if (def.type === 'checkbox') {
    return (
      <div className={className}>
        {children}
        {error && (
          <p
            id={errorId}
            className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-coral-deep"
          >
            <Icon name="alert-triangle" size={14} />
            {error}
          </p>
        )}
      </div>
    )
  }

  if (def.type === 'radio') {
    return (
      <div className={className}>
        <fieldset>
          <legend className="mb-1.5 block text-sm font-bold text-navy">
            {def.label}
            {def.required ? (
              <>
                <span className="ml-1 text-coral" aria-hidden="true">
                  *
                </span>
                <span className="sr-only"> (required)</span>
              </>
            ) : (
              <span className="ml-1.5 text-xs font-medium text-navy-400">optional</span>
            )}
          </legend>
          {children}
        </fieldset>
        {def.hint && (
          <p id={`${id}-hint`} className="mt-1.5 text-xs leading-relaxed text-navy-400">
            {def.hint}
          </p>
        )}
        {error && (
          <p
            id={errorId}
            className="mt-1.5 flex items-center gap-1.5 text-sm font-semibold text-coral-deep"
          >
            <Icon name="alert-triangle" size={14} />
            {error}
          </p>
        )}
      </div>
    )
  }

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-bold text-navy">
        {def.label}
        {def.required ? (
          <>
            <span className="ml-1 text-coral" aria-hidden="true">
              *
            </span>
            <span className="sr-only"> (required)</span>
          </>
        ) : (
          <span className="ml-1.5 text-xs font-medium text-navy-400">optional</span>
        )}
      </label>
      {children}
      {def.hint && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs leading-relaxed text-navy-400">
          {def.hint}
        </p>
      )}
      {error && (
        <p
          id={errorId}
          className="mt-1.5 flex items-center gap-1.5 text-sm font-semibold text-coral-deep"
        >
          <Icon name="alert-triangle" size={14} />
          {error}
        </p>
      )}
    </div>
  )
}
