import { isBrowser } from '@aviato/utils'
import { defaultFlagConfig, FeatureFlag } from '.'
import { FeatureFlagConfig } from './types'

function setupFlagsFromEnv(currentState: FeatureFlagConfig): FeatureFlagConfig {
  const flagsFromEnv = process.env.FLAGS

  if (flagsFromEnv) {
    const flags = flagsFromEnv.split(',') as FeatureFlag[]

    for (const flag of flags) {
      const targetFlagConfiguration = currentState[flag]
      if (targetFlagConfiguration) {
        targetFlagConfiguration.isEnabled = true
      }
    }
  }

  return currentState
}

function setupFlagsFromUrl(currentState: FeatureFlagConfig): FeatureFlagConfig {
  if (!isBrowser) {
    return currentState
  }

  const urlParams = new URLSearchParams(window.location.search)
  const flagsFromQuery = urlParams.get('flags')

  if (flagsFromQuery) {
    const flags = flagsFromQuery.split(',') as FeatureFlag[]

    for (const flag of flags) {
      const targetFlagConfiguration = currentState[flag]
      if (targetFlagConfiguration) {
        targetFlagConfiguration.isEnabled = true
      }
    }
  }

  return currentState
}

function pruneUnknownFlags(currentState: FeatureFlagConfig): FeatureFlagConfig {
  const validState = Object.assign({}, currentState)
  const featureFlagKeys = Object.keys(validState) as FeatureFlag[]

  featureFlagKeys.forEach((featureFlag: FeatureFlag) => {
    const hasMatchingFeatureFlag = defaultFlagConfig()[featureFlag]
    if (!hasMatchingFeatureFlag) {
      delete validState[featureFlag]
    }
  })

  return validState
}

export function getSettledFlagsState(): FeatureFlagConfig {
  let state: FeatureFlagConfig = defaultFlagConfig()

  state = setupFlagsFromEnv(state)
  state = setupFlagsFromUrl(state)
  state = pruneUnknownFlags(state)

  return state
}
