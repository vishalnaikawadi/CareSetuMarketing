import {
  Activity,
  CalendarCheck2,
  ClipboardCheck,
  ClipboardList,
  FileHeart,
  LayoutDashboard,
  MessageCircle,
  Network,
  ShieldCheck,
  Stethoscope,
} from 'lucide-react'

export const navigation = [
  { label: 'Care teams', href: '#care-teams' },
  { label: 'Patients', href: '#patients' },
  { label: 'Hospitals', href: '#hospitals' },
  { label: 'Pilot', href: '#pilot' },
  { label: 'FAQ', href: '#faq' },
]

export const groupLabels: Record<'care' | 'patient' | 'hospital', string> = {
  care: 'For care teams',
  patient: 'For patients and caregivers',
  hospital: 'For hospitals',
}

export type FeatureGroup = 'care' | 'patient' | 'hospital'

export const features: {
  title: string
  shortLabel: string
  group: FeatureGroup
  description: string
  benefit: string
  icon: typeof Activity
}[] = [
  {
    title: 'Longitudinal patient record',
    shortLabel: 'Patient record & encounters',
    group: 'care',
    description: 'Support patient identity, demographics and consent records alongside reports, scans, prescriptions, findings, referrals and facility visits in one profile, with a timeline of what happened, what was done and what comes next.',
    benefit: 'Give authorized care teams relevant context across visits.',
    icon: LayoutDashboard,
  },
  {
    title: 'Report capture and shared results',
    shortLabel: 'Lab / radiology report upload',
    group: 'care',
    description: 'Let patients and clinicians scan or upload lab and radiology reports. Proposed OCR extracts text from printed reports; handwritten reports remain images. Keep original files available in both authorized panels for clinician verification.',
    benefit: 'Make printed results easier to review while preserving the source image.',
    icon: FileHeart,
  },
  {
    title: 'Appointments, queues and visit access',
    shortLabel: 'Appointments & queues',
    group: 'patient',
    description: 'Support provider discovery and facility-enabled appointment requests, then coordinate registration, queues, reminders and visit status.',
    benefit: 'Support the journey from finding or accessing a provider through check-in.',
    icon: Activity,
  },
  {
    title: 'Consultation workspace',
    shortLabel: 'Consultation documentation',
    group: 'care',
    description: 'Document visits, diagnoses, prescriptions and care plans; coordinate lab orders, referrals and pharmacy handoffs where connected.',
    benefit: 'Keep the clinical story and open work together during a visit.',
    icon: FileHeart,
  },
  {
    title: 'Patient-scoped AI chart assistant',
    shortLabel: 'AI chart search',
    group: 'care',
    description: 'Let an authorized clinician ask about the selected patient’s available history and trace answers back to source records. Retrieval support only; clinical decisions remain with the care team.',
    benefit: 'Reduce time spent searching while keeping the source record visible for verification.',
    icon: MessageCircle,
  },
  {
    title: 'Patient timeline and pending work',
    shortLabel: 'Timeline & follow-up work',
    group: 'care',
    description: 'Surface relevant history, measurements, flagged results, pending tests, referrals and follow-up actions in chronological context.',
    benefit: 'See the patient story and open work at a glance.',
    icon: Activity,
  },
  {
    title: 'QR-based care handover',
    shortLabel: 'QR care sharing',
    group: 'care',
    description: 'A patient-authorized QR summary can support urgent care, referrals and handovers between providers and facilities. Full-record access remains subject to facility identity checks and permissions.',
    benefit: 'Share key context quickly while keeping access governed.',
    icon: ShieldCheck,
  },
  {
    title: 'Voice-to-text history capture',
    shortLabel: 'Voice history capture',
    group: 'care',
    description: 'Help clinicians capture a patient history by voice, then review and correct the transcription before it is saved to the record.',
    benefit: 'Spend less time typing while keeping the clinician in control.',
    icon: MessageCircle,
  },
  {
    title: 'Lab results at a glance',
    shortLabel: 'Results & trends',
    group: 'care',
    description: 'A proposed view can line up findings across connected reports and link each result back to its source for verification.',
    benefit: 'Spot changes without paging through report after report.',
    icon: Activity,
  },
  {
    title: 'Care plans and follow-through',
    shortLabel: 'Care plans & follow-up',
    group: 'care',
    description: 'Connect referrals, follow-up tasks, patient instructions and next appointments to each encounter.',
    benefit: 'Make next steps easier for both teams and patients to track.',
    icon: ClipboardCheck,
  },
  {
    title: 'Patient access and communication',
    shortLabel: 'Patient access & reminders',
    group: 'patient',
    description: 'Let patients view key health information and instructions, print or share a health summary, and save questions by text or voice in their language for a future visit.',
    benefit: 'Help patients prepare for visits and keep their questions with the care plan.',
    icon: MessageCircle,
  },
  {
    title: 'Medication and vitals follow-through',
    shortLabel: 'Medication & vitals check-ins',
    group: 'patient',
    description: 'Show care instructions and a medication calendar with reminders; patients can mark doses as taken and record vitals for review between visits.',
    benefit: 'Give care teams a clearer view of patient-reported follow-through between visits.',
    icon: Activity,
  },
  {
    title: 'Multilingual health education and scheme guidance',
    shortLabel: 'Health learning & scheme help',
    group: 'patient',
    description: 'Offer health tips and educational material in supported languages to help patients understand care and support wellbeing, with guidance to explore schemes and ask about benefits they may be eligible for.',
    benefit: 'Make practical health information and benefit pathways easier to understand.',
    icon: MessageCircle,
  },
  {
    title: 'Workflows for each specialty',
    shortLabel: 'Specialty workflows',
    group: 'hospital',
    description: 'Configure intake, templates, assessments and pathways around specialty needs.',
    benefit: 'Keep a familiar core while making room for department-specific care.',
    icon: Network,
  },
  {
    title: 'Facility setup and administration',
    shortLabel: 'Facility administration',
    group: 'hospital',
    description: 'Configure facilities, departments, specialties, providers, locations and operating hours, alongside staff access, workflow rules and onboarding.',
    benefit: 'Adapt the platform to how each medical setup is organized.',
    icon: CalendarCheck2,
  },
  {
    title: 'Operational views and reporting',
    shortLabel: 'Dashboards & reporting',
    group: 'hospital',
    description: 'Review role-appropriate schedules, workloads, service lines and performance indicators.',
    benefit: 'Help teams and administrators understand operational flow.',
    icon: ClipboardList,
  },
  {
    title: 'Privacy, accountability and connection',
    shortLabel: 'Permissions & integrations',
    group: 'hospital',
    description: 'Set layered, facility-defined permissions for administrators, clinicians, nurses, labs, pharmacies and patients; retain consent and audit history.',
    benefit: 'Shape accountable workflows around each facility’s requirements.',
    icon: ShieldCheck,
  },
]

export const audiences = [
  {
    title: 'Hospitals and health systems',
    description: 'Evaluate coordination, visibility and accountable workflows across departments and care teams.',
    icon: LayoutDashboard,
  },
  {
    title: 'Multispecialty centres',
    description: 'Coordinate patient journeys as they move between specialties, diagnostics and follow-up.',
    icon: Network,
  },
  {
    title: 'Specialty clinics',
    description: 'Adapt focused clinical workflows, patient follow-up and team coordination to one specialty.',
    icon: Stethoscope,
  },
  {
    title: 'Clinic networks and group practices',
    description: 'Shape consistent workflows across locations while fitting the needs of each clinical team.',
    icon: Activity,
  },
  {
    title: 'Independent clinics and practices',
    description: 'Explore patient-scoped record search and between-visit follow-through for a small care team.',
    icon: FileHeart,
  },
]

export const careSettingOptions = [
  'Hospital / health system',
  'Multispecialty centre',
  'Specialty clinic',
  'Clinic network / group practice',
  'Independent clinic / practice',
  'Diagnostic / laboratory service',
  'Pharmacy / other care service',
  'Other medical setup',
]

export const specialtyModules = [
  ['Maternal health', 'Antenatal care, pregnancy milestones and postpartum follow-up.'],
  ['General medicine', 'Routine visits and chronic-care reviews.'],
  ['Pediatrics', 'Immunization, growth and age-aware visits.'],
  ['Cardiology', 'Cardiac assessment and ongoing follow-up.'],
  ['Orthopedics', 'Injury, rehabilitation and recovery workflows.'],
  ['Dermatology', 'Image-supported assessment and follow-up.'],
  ['Mental health', 'Private assessment, care planning and follow-up.'],
  ['Diagnostics and allied care', 'Orders, results and referral workflows.'],
] as const

export const roles = [
  'Consultant / doctor',
  'Resident / medical officer',
  'Nurse',
  'Triage / registration staff',
  'Department head / administrator',
  'Lab / diagnostics team',
  'Pharmacy team',
  'Patient',
  'Caregiver',
  'IT / integration team',
  'Other healthcare professional',
]

export const interestOptions = [
  'Definitely interested',
  'Probably interested',
  'Maybe',
  'Probably not',
  'Not interested',
] as const

// These are discovery prompts, not an announced price list.
export const serviceModelOptions = [
  'Per facility or location',
  'Per department or module',
  'Per clinician or care-team member',
  'Implementation and support bundled',
  'Need to define scope first',
  'Other',
]

// Discovery choices only; these are not published prices or a commitment to charge.
export const willingnessToPayOptions = [
  'I would only use it if it were free',
  '₹1,000–₹2,499 per month',
  '₹2,500–₹4,999 per month',
  '₹5,000–₹9,999 per month',
  '₹10,000+ per month',
  'Not sure yet',
  'Other amount',
] as const


// What a hospital would measure in a pilot. Shown under the bridge illustration.
export const hospitalValues = [
  { title: 'Chart search', body: 'Find a patient’s history with the source notes beside it.' },
  { title: 'OPD coordination', body: 'See queues, who owns each step and what comes next.' },
  { title: 'Patient follow-through', body: 'Review medication and vitals check-ins between visits.' },
  { title: 'Operations view', body: 'Spot service activity and work that is waiting.' },
]

export const pilotMeasures = [
  'Time to find chart context',
  'Referral and follow-up completion',
  'Clinician adoption',
  'Patient check-in rates',
]

export const workflowSteps = [
  { title: 'Prepare', who: 'Patient', body: 'Request a visit and share history and reports ahead of time.' },
  { title: 'Check in', who: 'Front desk', body: 'Register, join the queue and see visit status.' },
  { title: 'Ask the record', who: 'Doctor', body: 'Search this patient’s history and verify the source notes.' },
  { title: 'Coordinate care', who: 'Care team', body: 'Document the visit and assign orders, referrals and next steps.' },
  { title: 'Follow through', who: 'Patient', body: 'Log medication and vitals check-ins and get reminders.' },
  { title: 'Review the pilot', who: 'Hospital', body: 'Assess flow, adoption and safety together.' },
]

export const roadmapPhases = [
  { title: 'Discovery and scope', body: 'Set priorities with clinicians, administrators and patients.' },
  { title: 'Platform foundation', body: 'Identity, records, scheduling and permissions.' },
  { title: 'Focused pilot', body: 'Validate workflows with selected facilities.' },
  { title: 'Patient experience', body: 'Refine access, reminders and follow-up from feedback.' },
  { title: 'Specialty expansion', body: 'Add pathways after clinical review.' },
  { title: 'Integrations and scale', body: 'Prioritise requested connections and multi-site needs.' },
]

export const guardrails = [
  { title: 'Traceable context', body: 'Answers and flags show their sources. AI does not diagnose, prescribe or make care decisions.' },
  { title: 'Accountability', body: 'Access roles, consent, attribution and audit events are defined with your safety, privacy and medico-legal teams.' },
  { title: 'Patient-reported, labelled', body: 'Medication and vitals check-ins are marked as patient-reported. Your team decides visibility and follow-up.' },
  { title: 'Fitted to your hospital', body: 'Panels and workflows are customised to your roles, with integrations, downtime steps, training and support planned together.' },
]

export const commercialModel = [
  { title: 'Facility subscription', body: 'A recurring subscription for the organisation is one model to validate. The pricing unit is undecided.' },
  { title: 'Shared core, optional modules', body: 'Specialties, departments, sites, users, storage or support levels could shape future tiers.' },
  { title: 'Implementation support', body: 'Configuration, data migration, onboarding, training and integrations may be bundled or priced separately.' },
  { title: 'Patient access through the provider', body: 'Patient access could be included in the provider subscription. Any separate patient charge would be an explicit decision.' },
]

// Suggested questions in the hero's chart-assistant mock. All data is fictional.
export const assistantPrompts = [
  {
    question: 'Summarise the last three visits',
    answer: 'Three OPD visits since August. Breathlessness on exertion was first noted on 28 Sep. Furosemide was started on 12 Oct and a renal panel was ordered.',
    sources: [['Consultation note', '12 Oct'], ['Follow-up note', '28 Sep']],
  },
  {
    question: 'Any results still pending?',
    answer: 'The renal panel ordered on 12 Oct has no result yet. The echocardiogram report from cardiology was received on 15 Oct.',
    sources: [['Lab order', '12 Oct'], ['Echo report', '15 Oct']],
  },
  {
    question: 'What did cardiology reply?',
    answer: 'Cardiology replied on 15 Oct. They suggest continuing the current plan and reviewing again after the repeat renal panel.',
    sources: [['Referral reply', '15 Oct']],
  },
] as const

export const faqs = [
  {
    q: 'Does Care Setu replace our HIS or EMR?',
    a: 'No. Care Setu is designed to coordinate the journey around a visit and work alongside the systems your hospital already uses. Each connection depends on your permissions and validated integrations.',
  },
  {
    q: 'What does the AI chart assistant actually do?',
    a: 'It lets an authorised clinician ask about the selected patient’s available records and see the source notes behind each answer. It is retrieval support only. It does not diagnose, prescribe or recommend treatment.',
  },
  {
    q: 'How are scanned reports handled?',
    a: 'Printed lab and radiology reports could be read with OCR and shown next to the original file. Handwritten reports stay as images. Values should be checked against the source image before clinical use.',
  },
  {
    q: 'Where do result flags come from?',
    a: 'Proposed flags would use documented, version-controlled rules from clinical guidelines your hospital selects and approves, such as WHO, ICMR, ADA or AHA. Your clinical governance team validates each rule and threshold, and every flag shows its source.',
  },
  {
    q: 'What does a patient’s QR code share?',
    a: 'Only a summary the patient has authorised, for urgent care or handovers. Access to the full record would follow the receiving facility’s identity and permission checks.',
  },
  {
    q: 'Can we try it with real patient data?',
    a: 'Not yet. Care Setu is a concept and prototype, and every screen on this page uses fictional data. Pilot scope, data handling and success measures would be agreed with the facility first.',
  },
  {
    q: 'What will it cost?',
    a: 'Nothing is decided. The waitlist form asks which pricing models and ranges would work for you, so your answer shapes it.',
  },
]
