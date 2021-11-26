/* eslint-disable no-console */
import ora from 'ora'
import chalk from 'chalk'
import StyleDictionary from 'style-dictionary'
import _ from 'lodash'

const baseConfig = {
  source: ['json/*.json'],
  platforms: {
    'json-flat': {
      transformGroup: 'js',
      buildPath: 'output/json/',
      files: [
        {
          destination: 'styles.json',
          format: 'json/flat',
          options: {
            showFileHeader: false,
          },
        },
      ],
    },

    javascript: {
      transformGroup: 'js',
      buildPath: 'output/json/',
      files: [
        {
          format: 'javascript/module-flat',
          destination: 'colors.js',
        },
      ],
    },

    scss: {
      transformGroup: 'scss',
      buildPath: 'output/json/',
      files: [
        {
          mapName: 'tokens',
          format: 'scss/map-deep',
          destination: 'map.scss',
        },
      ],
    },

    css: {
      transformGroup: 'css',
      buildPath: 'output/json/',
      files: [
        {
          destination: 'variables.css',
          format: 'css/variables',
        },
      ],
    },
  },
}

const spinner = ora('Parsing Theme').start()

const green = chalk.bold.green
const log = (message) => console.log(green(message))

StyleDictionary.registerTransform({
  name: 'size/px',
  type: 'value',
  matcher: (token) => {
    return token.unit === 'pixel' && token.value !== 0
  },
  transformer: (token) => {
    return `${token.value}px`
  },
})

StyleDictionary.registerTransform({
  name: 'size/percent',
  type: 'value',
  matcher: (token) => {
    return token.unit === 'percent' && token.value !== 0
  },
  transformer: (token) => {
    return `${token.value}%`
  },
})

StyleDictionary.registerTransformGroup({
  name: 'custom/css',
  transforms: StyleDictionary.transformGroup.css.concat([
    'size/px',
    'size/percent',
  ]),
})

StyleDictionary.registerTransformGroup({
  name: 'custom/scss',
  transforms: StyleDictionary.transformGroup.less.concat([
    'size/px',
    'size/percent',
  ]),
})

StyleDictionary.registerFilter({
  name: 'group',
  matcher: (prop) => {
    const path = prop.path.join('-')

    _.forEach(['font-style', 'color-theme'], function (name) {
      if (path.startsWith(name)) {
        prop.attributes.category = 'group'
      }
    })

    return prop.attributes.category === 'group'
  },
})

const StyleDictionaryExtended = StyleDictionary.extend(baseConfig)

StyleDictionaryExtended.buildAllPlatforms()

spinner.stop()

log('Done parsing')

process.exit()
