import FormPage, { InfoCard } from './FormPage.jsx'
import { forms } from '../data/site.js'

export default function Specialist() {
  return (
    <FormPage
      form={forms.specialist}
      aside={
        <InfoCard script="What to expect" title="A short, no-pressure call">
          Tell us roughly what you would like help with and the best time to
          reach you. One of our clinicians will call to answer your questions
          and, if it seems like a good fit, help you arrange a first appointment.
          There is no obligation to book.
        </InfoCard>
      }
    />
  )
}
