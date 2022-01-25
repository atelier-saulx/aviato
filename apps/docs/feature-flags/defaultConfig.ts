import { FeatureFlagConfig } from './types'

const isProduction: boolean = process.env.NODE_ENV === 'production'

export type FeatureFlag = 'DemoFlag' | 'ShowUnfinishedPages' // 'DemoFlag' | 'Flag2' | 'Etc'.

const config = {
  DemoFlag: {
    description: 'Showcase feature-flag being enabled/disabled',
    isEnabled: false,
  },

  ShowUnfinishedPages: {
    description: 'Display unfinished pages',
    isEnabled: !isProduction,
  },
}

export function defaultFlagConfig(): FeatureFlagConfig {
  return config
}
