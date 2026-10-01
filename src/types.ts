export type InterestLevel =
  | 'Definitely interested'
  | 'Probably interested'
  | 'Maybe'
  | 'Probably not'
  | 'Not interested'

export interface WaitlistFormData {
  name: string
  email: string
  role: string
  interestLevel: InterestLevel | ''
  featuresSelected: string[]
  mostValuableFeature: string
  willingnessToPay: string
  pricingOther: string
  missingFeatures: string
  generalFeedback: string
  website: string
}
