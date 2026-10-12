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
  { label: 'Hospital value', href: '#why' },
  { label: 'Platform', href: '#platform' },
  { label: 'Specialties', href: '#specialties' },
  { label: 'Care workflow', href: '#how-it-works' },
  { label: 'Pilot & rollout', href: '#roadmap' },
]

export const features = [
  {
    title: 'Longitudinal patient record',
    shortLabel: 'Patient record & encounters',
    description: 'Support patient identity, demographics and consent records alongside reports, scans, prescriptions, findings, referrals and facility visits in one profile, with a timeline of what happened, what was done and what comes next.',
    benefit: 'Give authorized care teams relevant context across visits.',
    icon: LayoutDashboard,
  },
  {
    title: 'Report capture and shared results',
    shortLabel: 'Lab / radiology report upload',
    description: 'Let patients and clinicians scan or upload lab and radiology reports. Proposed OCR extracts text from printed reports; handwritten reports remain images. Keep original files available in both authorized panels for clinician verification.',
    benefit: 'Make printed results easier to review while preserving the source image.',
    icon: FileHeart,
  },
  {
    title: 'Appointments, queues and visit access',
    shortLabel: 'Appointments & queues',
    description: 'Support provider discovery and facility-enabled appointment requests, then coordinate registration, queues, reminders and visit status.',
    benefit: 'Support the journey from finding or accessing a provider through check-in.',
    icon: Activity,
  },
  {
    title: 'Consultation workspace',
    shortLabel: 'Consultation documentation',
    description: 'Document visits, diagnoses, prescriptions and care plans; coordinate lab orders, referrals and pharmacy handoffs where connected.',
    benefit: 'Keep the clinical story and open work together during a visit.',
    icon: FileHeart,
  },
  {
    title: 'Patient-scoped AI chart assistant',
    shortLabel: 'AI chart search',
    description: 'Let an authorized clinician ask about the selected patient’s available history and trace answers back to source records. Retrieval support only; clinical decisions remain with the care team.',
    benefit: 'Reduce time spent searching while keeping the source record visible for verification.',
    icon: MessageCircle,
  },
  {
    title: 'Patient timeline and pending work',
    shortLabel: 'Timeline & follow-up work',
    description: 'Surface relevant history, measurements, flagged results, pending tests, referrals and follow-up actions in chronological context.',
    benefit: 'See the patient story and open work at a glance.',
    icon: Activity,
  },
  {
    title: 'QR-based care handover',
    shortLabel: 'QR care sharing',
    description: 'A patient-authorized QR summary can support urgent care, referrals and handovers between providers and facilities. Full-record access remains subject to facility identity checks and permissions.',
    benefit: 'Share key context quickly while keeping access governed.',
    icon: ShieldCheck,
  },
  {
    title: 'Voice-to-text history capture',
    shortLabel: 'Voice history capture',
    description: 'Help clinicians capture a patient history by voice, then review and correct the transcription before it is saved to the record.',
    benefit: 'Spend less time typing while keeping the clinician in control.',
    icon: MessageCircle,
  },
  {
    title: 'Lab results at a glance',
    shortLabel: 'Results & trends',
    description: 'A proposed view can line up findings across connected reports and link each result back to its source for verification.',
    benefit: 'Spot changes without paging through report after report.',
    icon: Activity,
  },
  {
    title: 'Care plans and follow-through',
    shortLabel: 'Care plans & follow-up',
    description: 'Connect referrals, follow-up tasks, patient instructions and next appointments to each encounter.',
    benefit: 'Make next steps easier for both teams and patients to track.',
    icon: ClipboardCheck,
  },
  {
    title: 'Patient access and communication',
    shortLabel: 'Patient access & reminders',
    description: 'Let patients view key health information and instructions, print or share a health summary, and save questions by text or voice in their language for a future visit.',
    benefit: 'Help patients prepare for visits and keep their questions with the care plan.',
    icon: MessageCircle,
  },
  {
    title: 'Medication and vitals follow-through',
    shortLabel: 'Medication & vitals check-ins',
    description: 'Show care instructions and a medication calendar with reminders; patients can mark doses as taken and record vitals for review between visits.',
    benefit: 'Give care teams a clearer view of patient-reported follow-through between visits.',
    icon: Activity,
  },
  {
    title: 'Multilingual health education and scheme guidance',
    shortLabel: 'Health learning & scheme help',
    description: 'Offer health tips and educational material in supported languages to help patients understand care and support wellbeing, with guidance to explore schemes and ask about benefits they may be eligible for.',
    benefit: 'Make practical health information and benefit pathways easier to understand.',
    icon: MessageCircle,
  },
  {
    title: 'Workflows for each specialty',
    shortLabel: 'Specialty workflows',
    description: 'Configure intake, templates, assessments and pathways around specialty needs.',
    benefit: 'Keep a familiar core while making room for department-specific care.',
    icon: Network,
  },
  {
    title: 'Facility setup and administration',
    shortLabel: 'Facility administration',
    description: 'Configure facilities, departments, specialties, providers, locations and operating hours, alongside staff access, workflow rules and onboarding.',
    benefit: 'Adapt the platform to how each medical setup is organized.',
    icon: CalendarCheck2,
  },
  {
    title: 'Operational views and reporting',
    shortLabel: 'Dashboards & reporting',
    description: 'Review role-appropriate schedules, workloads, service lines and performance indicators.',
    benefit: 'Help teams and administrators understand operational flow.',
    icon: ClipboardList,
  },
  {
    title: 'Privacy, accountability and connection',
    shortLabel: 'Permissions & integrations',
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
  'Patient / caregiver',
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

