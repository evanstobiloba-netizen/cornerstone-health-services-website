/**
 * CORNERSTONE HEALTH SERVICES INC — site content.
 *
 * Every value here was taken from the practice's live site
 * (https://www.cornerstonehealthinc.com) rather than invented.
 * Anything still unknown is marked "TODO: confirm".
 *
 * Brand tokens (colours, fonts) are documented in src/index.css.
 */

export const practice = {
  name: 'Cornerstone Health Services Inc',
  legalName: 'CORNERSTONE HEALTH SERVICES INC',
  shortName: 'Cornerstone Health Services',
  domain: 'cornerstonehealthinc.com',
  url: 'https://www.cornerstonehealthinc.com',
  founded: 'September 2024',
  serves: 'Adults 18–80',
  welcome: {
    script: 'A Warm Welcome To',
    title: 'Cornerstone Health Services Inc',
  },
  address: {
    line1: '21 Mayor Thomas J. McGrath Hwy.',
    line2: 'Ste. 306',
    city: 'Quincy',
    state: 'MA',
    stateLong: 'Massachusetts',
    zip: '02169',
  },
  phoneDisplay: '351-231-2513',
  phoneHref: 'tel:+13512312513',
  email: 'margaretoloyede@cornerstonehealthinc.com',
  zocdocUrl:
    'https://www.zocdoc.com/practice/cornerstone-health-services-inc-177609',
  privacyUrl: 'https://www.cornerstonehealthinc.com/privacy-policy',
  privacyUpdated: 'February 2025',
  social: {
    // Twitter is deliberately omitted: the live site links to twitter.com
    // itself, which is a placeholder rather than a real profile.
    facebook: 'https://www.facebook.com/profile.php?id=61573523289059',
    instagram: 'https://www.instagram.com/cornerstonehealths/',
  },
  // Geocoded from the street address via OpenStreetMap Nominatim.
  geo: { lat: 42.2498331, lon: -70.9983077 },
}

/** Full address as a single line, for maps links and schema. */
export const addressOneLine = `${practice.address.line1} ${practice.address.line2}, ${practice.address.city}, ${practice.address.state} ${practice.address.zip}`

export const crisis = {
  lifeline: '988',
  lifelineHref: 'tel:988',
  lifelineText: 'Suicide & Crisis Lifeline',
  label: 'In a crisis? Call or text 988',
  emergency: '911',
}

/** The four statistics the live site features on its homepage. */
export const stats = [
  { value: '24/7', label: 'Crisis support' },
  { value: '20+', label: 'Years of experience' },
  { value: '1000+', label: 'Counseling sessions' },
  { value: '750+', label: 'Lives changed' },
]

/** All 16 plans listed on the practice's Insurance Accepted page. */
/**
 * Accepted plans.
 *
 * `slug` is the contract for optional logo artwork: a file placed at
 * `public/insurance/<slug>.(svg|png|webp) ` is picked up automatically at build
 * time (see `vite.config.js`) and used everywhere the plan is shown. Without a
 * file, the UI falls back to a wordmark lockup built from `short`/`name`, so the
 * layout never breaks while artwork is outstanding.
 *
 * Do not rename a `slug` without also renaming the matching file — that is the
 * only link between the two.
 */
export const insurances = [
  { name: 'Medicare', group: 'Federal', slug: 'medicare' },
  { name: 'MassHealth', group: 'Federal', slug: 'masshealth' },
  {
    name: 'Blue Cross Blue Shield (BCBS)',
    short: 'BCBS',
    group: 'Commercial',
    slug: 'blue-cross-blue-shield',
  },
  { name: 'Aetna', group: 'Commercial', slug: 'aetna' },
  { name: 'Humana', group: 'Commercial', slug: 'humana' },
  { name: 'Tufts Health Plan', group: 'Commercial', slug: 'tufts-health-plan' },
  {
    name: 'Harvard Pilgrim Health Care',
    short: 'Harvard Pilgrim',
    group: 'Commercial',
    slug: 'harvard-pilgrim',
  },
  {
    name: 'United Behavioral Health',
    short: 'United Behavioral',
    group: 'Commercial',
    slug: 'united-behavioral-health',
  },
  { name: 'Cigna', group: 'Commercial', slug: 'cigna' },
  { name: 'Fallon Health', group: 'Commercial', slug: 'fallon-health' },
  { name: 'Unicare', group: 'Commercial', slug: 'unicare' },
  { name: 'Carelon', group: 'Behavioral health', slug: 'carelon' },
  { name: 'Magellan', group: 'Behavioral health', slug: 'magellan' },
  { name: 'ComPsych', group: 'Behavioral health', slug: 'compsych' },
  { name: 'Multiplan', short: 'MultiPlan', group: 'Network', slug: 'multiplan' },
  { name: 'First Health', group: 'Network', slug: 'first-health' },
]

/** The four services, with the practice's own copy verbatim. */
export const services = [
  {
    slug: 'diagnosis-of-mental-illness',
    title: 'Diagnosis of Mental Illness',
    card: 'Understanding your struggles is the first step to healing.',
    tagline: 'Understanding your mental health for a path to healing',
    icon: 'clipboard',
    body: "Understanding your mental health is the first step toward healing. Our compassionate specialists provide thorough assessments to identify underlying conditions and create a personalized care plan tailored to your needs. We take the time to listen, understand, and support you in finding clarity and the right path forward. With accurate diagnosis, you can gain insight into your challenges and access the right resources to help you thrive. Whether you're experiencing anxiety, depression, or other mental health concerns, we're here to guide you with care and expertise.",
    includes: [
      'A full psychiatric history and structured diagnostic assessment',
      'Screening for co-occurring and substance use conditions',
      'A clear explanation of what the diagnosis does and does not mean',
      'A personalised care plan you leave with in writing',
      'Referrals for therapy, labs or specialist care where indicated',
    ],
  },
  {
    slug: 'medications-management',
    title: 'Medications Management',
    card: 'The right medication can support your journey to wellness.',
    tagline: 'Safe, effective medication management for balanced mental wellness',
    icon: 'pill',
    body: 'Finding the right balance in mental health treatment is essential, and medication can play a crucial role in your wellness journey. Our experienced providers carefully evaluate your needs, monitor your progress, and make necessary adjustments to ensure optimal results. We believe in a collaborative approach, working closely with you to address any concerns and provide education on your treatment options. Safety and effectiveness are our top priorities, and we are committed to guiding you through this process with compassion. With proper medication management, you can regain stability and improve your daily well-being. Let us help you find the right support for a healthier, more balanced life.',
    includes: [
      'Careful evaluation before anything is prescribed',
      'Education on every option, including the option to wait',
      'Slow titration with active monitoring for side effects',
      'Ongoing review of benefit, dose and interactions',
      'Refill coordination and pharmacy support between visits',
    ],
  },
  {
    slug: 'treatment-management',
    title: 'Treatment Management',
    card: 'Personalized care ensures you stay on track toward recovery.',
    tagline: 'Guiding your healing with tailored treatment management',
    icon: 'route',
    body: 'Mental health care is not one-size-fits-all, which is why we develop individualized treatment plans tailored to your unique needs. Our team works closely with you to monitor progress, adjust interventions, and ensure you receive the best possible care. We integrate various therapeutic approaches to provide comprehensive and effective treatment that promotes long-term wellness. Whether you need therapy, medication, or a combination of both, we are dedicated to supporting you every step of the way. Our goal is to empower you with the tools and strategies to overcome challenges and lead a fulfilling life. Together, we can build a plan that helps you move forward with confidence.',
    includes: [
      'An individualised plan built around your goals, not a template',
      'Regular review of what is working and what is not',
      'Integrated medication and therapeutic approaches',
      'Coordination with your primary care and other providers',
      'Continuity with the same clinician over time',
    ],
  },
  {
    slug: 'psychotherapy',
    title: 'Psychotherapy',
    card: 'Talking through challenges helps build strength and emotional resilience.',
    tagline: 'Healing conversations to support your mental health journey',
    icon: 'chat',
    body: "Healing begins with a conversation. Through psychotherapy, also known as talk therapy, we create a safe and supportive space where you can openly express your thoughts and emotions. Our licensed therapists use evidence-based approaches to help you develop coping strategies, improve relationships, and build resilience. Whether you're dealing with past trauma, stress, or everyday challenges, we are here to guide you with compassion and understanding. Therapy is a journey toward self-discovery, growth, and emotional well-being. Let's work together to create meaningful change and help you live a more fulfilling life.",
    includes: [
      'A safe, confidential and unhurried space to talk',
      'Evidence-based, goal-oriented approaches',
      'Practical coping strategies you can use between sessions',
      'Work on relationships, stress, trauma and resilience',
      'Referral to a dedicated therapist for longer-term work',
    ],
  },
]

/** External organisations linked from the Resources page. */
export const resources = [
  {
    name: 'American Academy of Child & Adolescent Psychiatry',
    url: 'https://www.aacap.org/',
    display: 'www.aacap.org',
  },
  {
    name: 'American Psychiatric Association',
    url: 'https://www.psychiatry.org/',
    display: 'www.psychiatry.org',
  },
  {
    name: 'American Psychological Association',
    url: 'https://www.apa.org/',
    display: 'www.apa.org',
  },
  {
    name: 'Anxiety & Depression Association of America',
    url: 'https://adaa.org/',
    display: 'www.adaa.org',
  },
  {
    name: 'Kaiser Family Foundation (KFF) — Mental Health',
    url: 'https://www.kff.org/mental-health',
    display: 'www.kff.org',
  },
  {
    name: 'National Alliance on Mental Illness',
    url: 'https://www.nami.org/',
    display: 'www.nami.org',
  },
]

/** The five questions on the practice's FAQ page, verbatim. */
export const faqs = [
  {
    q: 'How do I book an appointment?',
    a: 'Scheduling an appointment is quick and easy. Visit our "Book Now" page, complete the form, and our team will contact you to confirm your appointment.',
  },
  {
    q: 'Can I refer a loved one for mental health support?',
    a: 'Yes. If you know someone who could benefit from our care, visit the "Refer a Loved One" page and submit the referral form. We will reach out with the next steps.',
  },
  {
    q: 'How can I talk to a specialist?',
    a: 'If you need guidance, visit our "Talk to a Specialist" page and fill out the form. A compassionate professional will connect with you to provide support.',
  },
  {
    q: 'Are there opportunities to volunteer?',
    a: 'Yes. We welcome those who want to make a difference. Visit our "Volunteer with Us" page and submit the form to learn how you can get involved.',
  },
  {
    q: 'How can I share my experience?',
    a: 'Your story matters. You can share your experience by filling out the form on our "Share Your Experience" page. Your feedback helps us improve and inspire others on their mental health journey.',
  },
]

export const about = {
  intro:
    "Founded in September 2024, CORNERSTONE HEALTH SERVICES INC was established to provide compassionate, evidence-based psychiatric care in an outpatient setting. With a strong focus on accessibility and personalized support, we create a safe, welcoming environment where individuals receive professional mental health care tailored to their needs. Our team brings experience, empathy, and dedication to ensure every client feels supported. We serve adults aged 18 to 80, offering care for a wide range of mental health concerns. Whether facing everyday stress or ongoing challenges, we're here to help.",
  mission:
    'Our mission is to provide compassionate, evidence-based, and patient-centered mental health care that empowers individuals to achieve emotional well-being and a higher quality of life. We are committed to reducing barriers to mental health services, fostering a stigma-free environment, and delivering accessible, personalized treatment to support the diverse needs of our community.',
  vision:
    'Our vision is to be a leading outpatient psychiatry clinic recognized for excellence in mental health care, innovation in treatment approaches, and a commitment to holistic patient well-being. We aspire to create a supportive, inclusive, and healing environment where every patient receives timely and comprehensive care, helping them thrive in their personal and professional lives.',
  homepageWelcome:
    'At Cornerstone Health Services Inc, we are dedicated to providing compassionate and evidence-based mental health care services. Our team of experienced professionals is committed to supporting individuals through every step of their mental health journey. Whether you are seeking psychiatric evaluations, individual counseling, or rehabilitation services, we tailor our care to meet your unique needs in a nurturing and supportive environment.',
}

export const getHelp = {
  script: 'You are not alone',
  title: 'Get help?',
  lede: 'You are not alone, and support is available when you need it most.',
  body: 'At CORNERSTONE HEALTH SERVICES INC, we understand that taking the first step toward mental wellness can feel overwhelming, but we are here to guide you every step of the way. Whether you are seeking emotional support, professional guidance, or a safe space to talk, our compassionate team is ready to help. Your well-being is our priority, and we are committed to providing care that meets your unique needs. Do not wait to get the support you deserve.',
}

/* ---------------------------------------------------------------------------
   The practice runs several separate form pages. Rather than six near-identical
   components, each page is described here and rendered by one <LeadForm>.
   --------------------------------------------------------------------------- */

export const forms = {
  book: {
    path: '/book',
    navLabel: 'Book Now',
    submitLabel: 'Request my appointment',
    script: 'Start your healing journey',
    title: 'Book Now',
    lede: 'Take the first step toward better mental health by scheduling an appointment with our care team.',
    eyebrow: 'Appointment request',
    fields: [
      'name',
      'address',
      'city',
      'state',
      'zip',
      'contactPref',
      'email',
      'phone',
      'bestTimeToCall',
      'insurance',
      'apptDate',
      'apptTime',
      'comment',
      'privacyConsent',
    ],
    disclaimer:
      'Submitting this form does not create a clinician–patient relationship. We use your details only to arrange your appointment.',
  },
  contact: {
    path: '/contact',
    navLabel: 'Contact Us',
    submitLabel: 'Send message',
    script: 'Keep in touch',
    title: 'Contact Us',
    lede: 'Your path to better mental well-being begins with just one conversation. Connect with us today, and let us take the next step together.',
    eyebrow: 'Send a message',
    fields: ['name', 'email', 'phone', 'message'],
    disclaimer:
      'Please do not include detailed clinical information in this form.',
  },
  refer: {
    path: '/refer-a-loved-one',
    navLabel: 'Refer a Loved One',
    submitLabel: 'Send referral',
    script: 'Help someone you care about',
    title: 'Refer a Loved One',
    lede: 'Someone you care about deserves the support they need to thrive. Help them take the first step by connecting them with compassionate care. Fill out the form below to refer a loved one today.',
    eyebrow: 'Referral',
    fields: [
      'name',
      'email',
      'phone',
      'lovedOneName',
      'relationship',
      'lovedOneContact',
      'message',
    ],
    disclaimer:
      'Please make sure the person knows you are reaching out on their behalf. We will contact them only with their consent.',
  },
  specialist: {
    path: '/talk-to-a-specialist',
    navLabel: 'Talk to a Specialist',
    submitLabel: 'Request a call',
    script: 'We are here to listen',
    title: 'Talk to a Specialist',
    lede: 'Connect with our experienced mental health professionals.',
    eyebrow: 'Request a call',
    fields: ['name', 'email', 'phone', 'preferredTime', 'message'],
    disclaimer:
      'Please do not include detailed clinical information in this form.',
  },
  volunteer: {
    path: '/volunteer-with-us',
    navLabel: 'Volunteer with Us',
    submitLabel: 'Send enquiry',
    script: 'Make a difference',
    title: 'Volunteer with Us',
    lede: 'Make a difference in the lives of others by becoming a part of our compassionate care community.',
    eyebrow: 'Volunteer enquiry',
    fields: ['name', 'email', 'phone', 'availability', 'message'],
    disclaimer:
      'Volunteering enquiries are not clinical enquiries. Please do not send clinical information.',
  },
  share: {
    path: '/share-your-experience',
    navLabel: 'Share Your Experience',
    submitLabel: 'Share my story',
    script: 'Your story matters',
    title: 'Share Your Experience',
    lede: 'Your story can inspire and uplift others on their mental health journeys. By sharing your experience, you help foster a supportive community and promote healing.',
    eyebrow: 'Share your story',
    fields: ['name', 'email', 'story', 'consentPublish'],
    disclaimer:
      'Your experience is shared only with your permission. You can withdraw it at any time.',
  },
}

/* --------------------------------------------------------------- navigation */

export const nav = [
  { label: 'Home', to: '/', icon: 'building' },
  { label: 'About Us', to: '/about', icon: 'users' },
  { label: 'Services', to: '/services', icon: 'stethoscope' },
  { label: 'Resources', to: '/resources', icon: 'book' },
  { label: "FAQ's", to: '/faqs', icon: 'chat' },
  { label: 'Insurance', to: '/insurance', icon: 'shield' },
  { label: 'Contact Us', to: '/contact', icon: 'map-pin' },
]

export const footerNav = [
  {
    heading: 'Practice',
    links: [
      { label: 'Home', to: '/' },
      { label: 'About Us', to: '/about' },
      { label: 'Services', to: '/services' },
      { label: 'Insurance Accepted', to: '/insurance' },
      { label: "FAQ's", to: '/faqs' },
    ],
  },
  {
    heading: 'Get support',
    links: [
      { label: 'Get help?', to: '/get-help' },
      { label: 'Book Now', to: '/book' },
      { label: 'Talk to a Specialist', to: '/talk-to-a-specialist' },
      { label: 'Refer a Loved One', to: '/refer-a-loved-one' },
      { label: 'Contact Us', to: '/contact' },
    ],
  },
  {
    heading: 'Community',
    links: [
      { label: 'Resources', to: '/resources' },
      { label: 'Volunteer with Us', to: '/volunteer-with-us' },
      { label: 'Share Your Experience', to: '/share-your-experience' },
      { label: 'Privacy Policy', to: '/privacy-policy' },
      { label: 'Mobile view', to: '/mobile' },
    ],
  },
]
