import { Link } from 'react-router-dom'
import FormPage, { InfoCard } from './FormPage.jsx'
import { forms } from '../data/site.js'

export default function Refer() {
  return (
    <FormPage
      form={forms.refer}
      aside={
        <InfoCard script="A note on consent" title="Getting their permission">
          The first step is simply letting the person know you are reaching out on
          their behalf, and that it is their choice whether to follow up. We will
          contact them only with their consent. If you are a clinician making a
          referral, you can also{' '}
          <Link
            to="/contact"
            className="font-semibold text-blue-deep underline underline-offset-2"
          >
            contact us directly
          </Link>
          .
        </InfoCard>
      }
    />
  )
}
