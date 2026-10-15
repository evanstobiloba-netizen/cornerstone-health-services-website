import { Link } from 'react-router-dom'
import { practice } from '../data/site.js'
import Button from '../components/Button.jsx'
import Icon from '../components/Icon.jsx'
import {
  Card,
  Container,
  IconBadge,
  Section,
  SectionHeading,
} from '../components/Ui.jsx'

/**
 * Privacy Policy.
 *
 * IMPORTANT: the authoritative legal policy belongs to the practice and is
 * published on their live site. We deliberately do NOT reproduce or invent
 * legal text here — doing so would risk stating terms the practice has not
 * agreed to. This page summarises the plain facts about THIS website and
 * links to the canonical policy.
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
      <Section tone="calm" className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-56 h-[38rem] w-[38rem] rounded-full bg-brand-bloom blur-3xl"
        />
        <Container className="relative">
          <SectionHeading
            as="h1"
            size="lg"
            eyebrow="Your information"
            title="Privacy Policy"
            body="How this website handles your information, and where to read the practice's full policy."
          />
        </Container>
      </Section>

      <Section tone="white">
        <Container size="narrow">
          <Card className="flex flex-col gap-5 p-7 sm:flex-row sm:p-8">
            <IconBadge name="external-link" tone="cyan" />
            <div className="min-w-0">
              <h2 className="font-sans text-base font-semibold text-navy">
                The authoritative policy
              </h2>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-body">
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
          </Card>

          <div className="mt-12 space-y-9">
            {SECTIONS.map((s) => (
              <section key={s.title}>
                <h2 className="text-lg font-medium text-navy">{s.title}</h2>
                <p className="mt-2.5 text-[0.98rem] leading-relaxed text-body">
                  {s.body}
                </p>
              </section>
            ))}

            <section>
              <h2 className="text-lg font-medium text-navy">
                Third-party links
              </h2>
              <p className="mt-2.5 text-[0.98rem] leading-relaxed text-body">
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
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-navy">Questions</h2>
              <p className="mt-2.5 text-[0.98rem] leading-relaxed text-body">
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
              </p>
            </section>
          </div>
        </Container>
      </Section>
    </>
  )
}
