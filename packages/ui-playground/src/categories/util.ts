import { loremIpsum } from 'lorem-ipsum'
import { icons } from '@based/ui'

export const randomIcon = (): string => {
  const k = Object.keys(icons.icons)
  return k[Math.floor(Math.random() * k.length)]
}

export const randomText = (): string =>
  loremIpsum({
    sentenceLowerBound: 10,
    sentenceUpperBound: 200,
  })

export const randomLongText = (): string =>
  loremIpsum({
    sentenceLowerBound: 10,
    sentenceUpperBound: 2000,
  })

export const randomTitle = (): string =>
  loremIpsum({
    sentenceLowerBound: 1,
    sentenceUpperBound: 5,
  })
