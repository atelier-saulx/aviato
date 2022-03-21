import { loremIpsum } from 'lorem-ipsum'
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
