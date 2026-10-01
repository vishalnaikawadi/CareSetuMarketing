import {
  Activity,
  CalendarCheck2,
  ClipboardList,
  LayoutDashboard,
  Network,
  ShieldCheck,
} from 'lucide-react'

export const navigation = [
  { label: 'Why CareSetu', href: '#why' },
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#how-it-works' },
]

export const features = [
  {
    title: 'One patient. One clinical view.',
    shortLabel: 'Unified patient view',
    description:
      'Bring history, diagnoses, prescriptions, orders, reports and follow-up together—without hunting across separate systems.',
    benefit: 'Spend the consultation understanding the patient, not assembling the record.',
    icon: LayoutDashboard,
  },
  {
    title: 'Risk that is hard to miss',
    shortLabel: 'Visible clinical risk',
    description:
      'Surface flagged results, abnormal monitoring values and pending urgent work in the flow of the consultation.',
    benefit: 'See what needs attention before it becomes another follow-up gap.',
    icon: Activity,
  },
  {
    title: 'A familiar layout in every department',
    shortLabel: 'Cross-department consistency',
    description:
      'Move between specialties without relearning where information lives or how the record is organised.',
    benefit: 'Less cognitive load for clinicians covering more than one service.',
    icon: ClipboardList,
  },
  {
    title: 'Referrals with visible follow-through',
    shortLabel: 'Referral continuity',
    description:
      'Keep the clinical question, receiving department, status and reply connected to the patient record.',
    benefit: 'Make the handoff—and the answer—easy to trace.',
    icon: Network,
  },
  {
    title: 'Follow-up that stays connected',
    shortLabel: 'Follow-up scheduling',
    description:
      'Review the care plan, choose an available clinic slot and keep the next visit visible in context.',
    benefit: 'Close the consultation with a clearer next step.',
    icon: CalendarCheck2,
  },
  {
    title: 'Built as a consultation layer',
    shortLabel: 'Clinical workflow fit',
    description:
      'CareSetu is designed to organise the consultation experience—not replace the hospital’s system of record.',
    benefit: 'Improve the front-line workflow while respecting existing clinical systems.',
    icon: ShieldCheck,
  },
]

export const roles = [
  'Consultant / doctor',
  'Resident / medical officer',
  'Nurse',
  'Triage / registration staff',
  'Department head / administrator',
  'Other healthcare professional',
]

export const interestOptions = [
  'Definitely interested',
  'Probably interested',
  'Maybe',
  'Probably not',
  'Not interested',
] as const

// Edit these ranges as the commercial model becomes clearer.
export const pricingOptions = [
  'I would only use it if it were free',
  '₹1,000–₹2,499 per month',
  '₹2,500–₹4,999 per month',
  '₹5,000–₹9,999 per month',
  '₹10,000+ per month',
  'Other',
]
