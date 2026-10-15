import { Link } from 'react-router-dom'
import { practice } from '../data/site.js'
import Button from '../components/Button.jsx'
import { Container, IconBadge, Kicker, Section } from '../components/Ui.jsx'

/**
 * Privacy Policy.
 *
 * IMPORTANT: the authoritative legal policy belongs to the practice and is
 * published on their live site. We deliberately do NOT reproduce or invent
 * legal text here — doing so would risk stating terms the practice has not
 * agreed to. This page summarises the plain facts about THIS website and
 * links to the canonical policy.
 *
 * Set as a short article: a standfirst, the authoritative-policy callout, then
 * numbered sections under hairlines.
 */
const SECTIONS = [
  {
    title: 'What this website collects',
    body: 'This site collects information only when you choose to type it into one of the contact or appointment forms — such as your name, email address, phone number, insurance plan and a short message. Nothing is collected in the background while you browse.',
  },
  {
    title: 'How form submissions are handled',
    body: 'Form submissions are sent over an encrypted (HTTPS) connection and are used only to respond to your enquiry and arrange care. Please do not use the forms to send detailed clinical information — we have deliberately worded them for scheduling and logistics so that you do not need to disclose medical detail in a web form.',
  },
  {
    title: 'Medical confidentiality',
    body: 'Once you become a patient, the information you share in your care is protected by HIPAA and by professional confidentiality rules. That protection is separate from, and stronger than, anything a website can offer.',
  },
]

export default function Privacy() {
  return (
    <>
      <Section tone="white" rule>
        <Container>
          <Kicker>Your information</Kicker>
          <h1 className="t-display mt-6 max-w-4xl text-navy">Privacy Policy</h1>
          <p className="t-lead mt-7 max-w-2xl">
            How this website handles your information, and where to read the
            practice&rsquo;s full policy.
          </p>
        </Container>
      </Section>

      <Section tone="calm" rule>
        <Container size="narrow">
          <div className="flex items-start gap-5 border-t-2 border-navy pt-6">
            <IconBadge name="external-link" tone="cyan" />
            <div className="min-w-0">
              <h2 className="t-subtitle text-navy">The authoritative policy</h2>
              <p className="mt-3 text-[0.97rem] leading-relaxed text-body">
                The full privacy policy for {practice.legalName} is published on
                the practice&rsquo;s main website at {practice.domain}. That
                document is the one that governs how your information is
                collected, used and protected — please read it there rather than
                relying on this summary.
              </p>
              <Button
                href={practice.privacyUrl}
                target="_blank"
                rel="noreferrer noopener"
                size="md"
                icon="external-link"
                className="mt-6"
              >
                Read the full policy
              </Button>
            </div>
          </div>

          <div className="mt-14 border-b border-[rgba(14,15,59,0.12)]">
            {[
              ...SECTIONS,
              {
                title: 'Third-party links',
                body: (
                  <>
                    Pages here link to outside organisations — for example the{' '}
                    <Link
                      to="/resources"
                      className="font-semibold text-blue-deep underline underline-offset-2"
                    >
                      Resources page
                    </Link>{' '}
                    and{' '}
                    <a
                      href={practice.zocdocUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="font-semibold text-blue-deep underline underline-offset-2"
                    >
                      Zocdoc
                    </a>
                    . Those sites have their own privacy policies, which we do not
                    control.
                  </>
                ),
              },
              {
                title: 'Questions',
                body: (
                  <>
                    If you have a question about your information, contact us on{' '}
                    <a
                      href={practice.phoneHref}
                      className="font-semibold text-blue-deep underline underline-offset-2"
                    >
                      {practice.phoneDisplay}
                    </a>{' '}
                    or at{' '}
                    <a
                      href={`mailto:${practice.email}`}
                      className="break-all font-semibold text-blue-deep underline underline-offset-2"
                    >
                      {practice.email}
                    </a>
                    .
                  </>
                ),
              },
            ].map((s, i) => (
              <section
                key={s.title}
                className="grid gap-4 border-t border-[rgba(14,15,59,0.12)] py-8 sm:grid-cols-[auto_1fr] sm:gap-8"
              >
                <span aria-hidden="true" className="tnum t-kicker pt-1 text-navy-300">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0">
                  <h2 className="t-subtitle text-navy">{s.title}</h2>
                  <p className="mt-3 text-[0.97rem] leading-relaxed text-body">
                    {s.body}
                  </p>
                </div>
              </section>
            ))}
          </div>
        </Container>
      </Section>
    </>
  )
}
