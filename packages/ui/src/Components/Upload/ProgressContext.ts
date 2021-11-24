import { createContext } from 'react'

const cache = {}

export const ProgressContext = createContext<CreateProgressContextProps>(null)

export type CreateProgressContextProps = {
  service: string
  url: string
  listeners?: Set<any> // Needs type
  items?: ProgressContextItem[]
  inProgress?: boolean
}

export type ProgressContextItem = {
  xhr: XMLHttpRequest
  size: number
  id: string
  name: string
  mime: string
  progress: number
  type: string
  removed?: boolean
  isComplete?: boolean
  url?: string
}

export const createProgressContext = ({
  url,
  service,
}: CreateProgressContextProps): CreateProgressContextProps => {
  if (!url && !service) {
    throw new Error('Upload context needs an url or service ')
  }
  const key = `${url}-${service}`
  if (!(key in cache)) {
    cache[key] = {
      service,
      url,
      listeners: new Set(),
      items: {},
      inProgress: false,
    }
  }
  return cache[key]
}
