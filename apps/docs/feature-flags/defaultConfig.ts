import { FeatureFlagConfig } from './types'

export type FeatureFlag = 'DemoFlag' | 'ShowUnfinishedPages' // 'DemoFlag' | 'Flag2' | 'Etc'.

const config = {
  DemoFlag: {
    description: 'Showcase feature-flag being enabled/disabled',
    isEnabled: false,
  },

  ShowUnfinishedPages: {
    description: 'Display unfinished pages',
    isEnabled: process.env.GIT_BRANCH !== 'main',
  },
}

export function defaultFlagConfig(): FeatureFlagConfig {
  return config
}
