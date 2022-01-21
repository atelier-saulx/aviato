import { FeatureFlagConfig } from './types'

export type FeatureFlag = 'DemoFlag' // 'DemoFlag' | 'Flag2' | 'Etc'.

const config = {
  DemoFlag: {
    description: 'Showcase feature-flag being enabled/disabled',
    isEnabled: false,
  },
}

export function defaultFlagConfig(): FeatureFlagConfig {
  return config
}
