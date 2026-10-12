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
  careSettings: string[]
  interestLevel: InterestLevel | ''
  featuresSelected: string[]
  featuresToExclude: string[]
  serviceModels: string[]
  serviceModelOther: string
  willingnessToPay: string
  missingFeatures: string
  generalFeedback: string
  website: string
}
