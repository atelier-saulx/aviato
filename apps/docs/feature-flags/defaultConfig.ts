import { FeatureFlagConfig } from './types'

export type FeatureFlag = 'DemoFlag' | 'Select' | 'ContextMenu' // 'DemoFlag' | 'Flag2' | 'Etc'.

const config = {
  DemoFlag: {
    description: 'Showcase feature-flag being enabled/disabled',
    isEnabled: false,
  },

  Select: {
    description: 'Showcase Select component',
    isEnabled: false,
  },

  ContextMenu: {
    description: 'Showcase ContextMenu component',
    isEnabled: false,
  },
}

export function defaultFlagConfig(): FeatureFlagConfig {
  return config
}
