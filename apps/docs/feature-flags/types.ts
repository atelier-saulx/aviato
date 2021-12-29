import { FeatureFlag } from './featureFlags'

export interface IFlagConfig {
  description: string
  isEnabled: boolean
}

export type FeatureFlagConfig = {
  [key in FeatureFlag]: IFlagConfig
}

export type MappedFlagConfig = [FeatureFlag, IFlagConfig]
