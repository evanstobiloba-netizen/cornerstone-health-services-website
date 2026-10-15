import { crisis, faqs, practice } from '../data/site.js'
import Accordion from '../components/Accordion.jsx'
import Button from '../components/Button.jsx'
import Icon from '../components/Icon.jsx'
import {
  Card,
  Container,
  Eyebrow,
  Section,
  SectionHeading,
} from '../components/Ui.jsx'

export default function Faqs() {
  return (
    <>
      <Section tone="calm" className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-56 h-[42rem] w-[42rem] rounded-full bg-brand-bloom blur-3xl"
        />
        <Container className="relative">
          <SectionHeading
            as="h1"
            size="xl"
            eyebrow="Questions"
            title="Frequently Asked Questions"
            body="Answers to the things people ask us most. If your question is not here, please just ask."
          />
        </Container>
      </Section>

      <Section tone="white">
        <Container size="narrow">
          <Accordion items={faqs} />

          <Card className="mt-10">
            <Eyebrow>Still have a question?</Eyebrow>
            <h2 className="mt-3 text-xl font-medium text-navy">
              We are happy to answer it
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-body">
              Call us on{' '}
              <a
                href={practice.phoneHref}
                className="font-semibold text-blue-deep underline underline-offset-2"
              >
                {practice.phoneDisplay}
              </a>
              , email{' '}
              <a
                href={`mailto:${practice.email}`}
                className="break-all font-semibold text-blue-deep underline underline-offset-2"
              >
                {practice.email}
              </a>
              , or send a message and we will get back to you.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/contact" size="md" icon="chat">
                Contact us
              </Button>
              <Button to="/book" variant="outline" size="md" icon="calendar">
                Book Now
              </Button>
            </div>
          </Card>

          <div className="mt-8 rounded-clinical-lg border border-coral/40 bg-coral-50 p-6">
            <p className="flex items-center gap-2 font-sans text-base font-semibold text-coral-deep">
              <Icon name="alert-triangle" size={17} />
              If you need help right now
            </p>
            <p className="mt-2 text-sm leading-relaxed text-coral-deep">
              Call or text{' '}
              <a
                href={crisis.lifelineHref}
                className="font-bold underline underline-offset-2"
              >
                {crisis.lifeline}
              </a>{' '}
              for the Suicide &amp; Crisis Lifeline, free and confidential, 24/7.
              For a life-threatening emergency, call{' '}
              <a
                href="tel:911"
                className="font-bold underline underline-offset-2"
              >
                911
              </a>
              .
            </p>
          </div>
        </Container>
      </Section>
    </>
  )
}
