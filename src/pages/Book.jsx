import { insurances, practice } from '../data/site.js'
import Icon from '../components/Icon.jsx'
import FormPage, { InfoCard } from './FormPage.jsx'
import { forms } from '../data/site.js'

export default function Book() {
  return (
    <FormPage
      form={forms.book}
      aside={
        <>
          <InfoCard script="Before your first visit" title="What to bring">
            <ul className="space-y-2">
              {[
                'Your insurance card, or the name of your plan',
                'A photo ID',
                'A list of any medications you currently take',
                'Any prior records or test results you would like us to see',
              ].map((t) => (
                <li key={t} className="flex gap-2.5">
                  <Icon
                    name="check"
                    size={15}
                    strokeWidth={2.6}
                    className="mt-0.5 shrink-0 text-cyan-deep"
                  />
                  {t}
                </li>
              ))}
            </ul>
          </InfoCard>

          <InfoCard tone="blue" script="Coverage" title="Insurance and cost">
            We accept {insurances.length} major plans, including Medicare and
            MassHealth. We verify your coverage before your first appointment so
            you know what to expect. Not sure whether your plan is included?{' '}
            <a
              href={practice.phoneHref}
              className="font-semibold text-blue-deep underline underline-offset-2"
            >
              Call us
            </a>{' '}
            and we will check for you.
          </InfoCard>
        </>
      }
    />
  )
}
