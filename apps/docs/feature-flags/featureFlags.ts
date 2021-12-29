import { log } from '@aviato/utils'
import { getSettledFlagsState } from './consolidateFlagState'
import { FeatureFlagConfig, MappedFlagConfig } from './types'

export type FeatureFlag = 'DemoFlag' // 'DemoFlag' | 'Flag2' | 'Etc'.

export function defaultFlagConfig(): FeatureFlagConfig {
  return {
    DemoFlag: {
      description: 'Showcase feature-flag being enabled/disabled',
      isEnabled: false,
    },
  }
}

type FeatureFlagOptions = {
  initialise(): void
  isEnabled(featureFlag: FeatureFlag): boolean
  enable(featureFlag: FeatureFlag): void
  disable(featureFlag: FeatureFlag): void
  getAllFlags(): FeatureFlag[]
  getEnabledFlags(): FeatureFlag[]
}

function featureFlagFactory(): FeatureFlagOptions {
  let featureFlags = defaultFlagConfig()

  function initialise(): void {
    featureFlags = getSettledFlagsState()

    log.debug(`Feature-flag state: `, featureFlags)
  }

  function isEnabled(featureFlag: FeatureFlag): boolean {
    return featureFlags[featureFlag]?.isEnabled ?? false
  }

  function enable(featureFlag: FeatureFlag): void {
    updateFlagState(featureFlag, true)
  }

  function disable(featureFlag: FeatureFlag): void {
    updateFlagState(featureFlag, false)
  }

  function updateFlagState(featureFlag: FeatureFlag, isEnabled: boolean): void {
    const targetFlag = featureFlags[featureFlag]
    if (targetFlag) {
      targetFlag.isEnabled = isEnabled
    }
  }

  function getAllFlags(): FeatureFlag[] {
    const immutableConfig = Object.assign({}, featureFlags)
    const configEntries = Object.entries(immutableConfig) as MappedFlagConfig[]
    return configEntries.map(([flag]) => flag)
  }

  function getEnabledFlags(): FeatureFlag[] {
    const immutableConfig = Object.assign({}, featureFlags)
    const configEntries = Object.entries(immutableConfig) as MappedFlagConfig[]
    const filtered = configEntries.filter(([, config]) => config.isEnabled)
    return filtered.map(([flag]) => flag)
  }

  return {
    initialise,
    isEnabled,
    enable,
    disable,
    getAllFlags,
    getEnabledFlags,
  }
}

export const featureFlags = featureFlagFactory()
