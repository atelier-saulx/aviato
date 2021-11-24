import { Dispatch, SetStateAction } from 'react'

export type Section = {
  validation: RegExp
  maxSize: number // max size of the section so it can jump to the next one
  preprocess?: (v: string) => string
  separator?: string
  default: string
}

export const getSectionAtCursor = (
  el: HTMLInputElement,
  sections: Section[]
): number => {
  const value = el.value
  const cursorIndex = el.selectionStart
  let previousSectionStart = 0
  for (let i = 0; i < sections.length; i++) {
    const separatorIndex = value.indexOf(
      sections[i].separator,
      previousSectionStart
    )
    if (cursorIndex <= separatorIndex || separatorIndex === -1) return i
    previousSectionStart = separatorIndex + 1
  }
}

export const getSectionValue = (
  el: HTMLInputElement,
  sectionIndex: number,
  sections: Section[]
) => {
  const sectionsBoundaries = getSectionsBoundaries(el, sections)
  return el.value.substring(
    sectionsBoundaries[sectionIndex].start,
    sectionsBoundaries[sectionIndex].end
  )
}

export const getSectionValueAtCursor = (
  el: HTMLInputElement,
  sections: Section[]
) => {
  const currentSectionIndex = getSectionAtCursor(el, sections)
  return getSectionValue(el, currentSectionIndex, sections)
}

type SectionBoundary = {
  start: number
  end: number
  separator?: {
    start: number
    end: number
  }
} | null

const getSectionsBoundaries = (el: HTMLInputElement, sections: Section[]) => {
  const value = el.value
  const boundaries = []
  let previousSeparatorIndex = null
  for (let sectionIndex = 0; sectionIndex < sections.length; sectionIndex++) {
    const start =
      previousSeparatorIndex === null
        ? 0
        : previousSeparatorIndex +
          (sections[sectionIndex - 1].separator?.length || 0)
    const separatorIndex = value.indexOf(
      sections[sectionIndex]?.separator,
      start
    )
    const hasNextSeparator = separatorIndex > -1
    const separator = hasNextSeparator
      ? {
          start: separatorIndex,
          end: separatorIndex + sections[sectionIndex].separator.length,
        }
      : null
    const end = hasNextSeparator ? separatorIndex : value.length
    if (sectionIndex > 0 && previousSeparatorIndex === -1) {
      boundaries.push(null)
    } else {
      boundaries.push({
        start,
        end,
        separator,
      })
    }
    previousSeparatorIndex = separatorIndex
  }
  return boundaries
}

export const replaceSectionValue = (
  el: HTMLInputElement,
  sectionIndex: number,
  sections: Section[],
  newValue: string
) => {
  const value = el.value
  const sectionsBoundaries = getSectionsBoundaries(el, sections)
  el.value =
    value.substring(0, sectionsBoundaries[sectionIndex].start) +
    newValue +
    value.substring(sectionsBoundaries[sectionIndex].end)
}

export const preprocessAllSections = (
  el: HTMLInputElement,
  sections: Section[]
) => {
  const sectionsBoundaries = getSectionsBoundaries(el, sections)
  sectionsBoundaries
    .filter((sb: SectionBoundary) => sb !== null)
    .forEach((_, index: number) => {
      if (typeof sections[index]?.preprocess === 'function') {
        const currentSectionValue = getSectionValue(el, index, sections)
        replaceSectionValue(
          el,
          index,
          sections,
          sections[index].preprocess(currentSectionValue)
        )
      }
    })
}

const fillDefaultsToTheRight = (
  el: HTMLInputElement,
  currentSectionIndex: number,
  sections: Section[]
) => {
  let value = el.value
  const sectionsBoundaries = getSectionsBoundaries(el, sections)
  for (
    let sectionIndex = currentSectionIndex;
    sectionIndex < sections.length;
    sectionIndex++
  ) {
    if (!sectionsBoundaries[sectionIndex]) {
      value += sections[sectionIndex].default
    }
    if (
      (!sectionsBoundaries[sectionIndex] ||
        !sectionsBoundaries[sectionIndex].separator) &&
      sectionIndex < sections.length && // last section
      sections[sectionIndex].separator
    ) {
      value += sections[sectionIndex].separator
    }
  }
  el.value = value
}

export const handleSectionChange = (
  el: HTMLInputElement,
  currentSectionIndex: number,
  sections: Section[],
  setValid: Dispatch<SetStateAction<boolean>>
) => {
  const sectionsBoundaries = getSectionsBoundaries(el, sections)
  let value = el.value
  const currentPosition = el.selectionEnd
  const currentSectionValue = value.substring(
    sectionsBoundaries[currentSectionIndex].start,
    sectionsBoundaries[currentSectionIndex].end
  )
  // section length is section maxLenght
  if (currentSectionValue.length >= sections[currentSectionIndex].maxSize) {
    // cursor at the end of value
    if (currentPosition === value.length) {
      fillDefaultsToTheRight(el, currentSectionIndex, sections)
    }
    if (validSection(el, currentSectionIndex, sections)) {
      selectNextSection(el, currentSectionIndex, sections)
    } else {
      el.setSelectionRange(currentPosition, currentPosition)
    }
    setValid(validAllSections(el, sections))
    return
  }
  setValid(validAllSections(el, sections))
  el.value = value
  return
}

export const selectSection = (
  el: HTMLInputElement,
  sectionIndex: number,
  sections: Section[]
) => {
  const sectionsBoundaries = getSectionsBoundaries(el, sections)
  el.setSelectionRange(
    sectionsBoundaries[sectionIndex].start,
    sectionsBoundaries[sectionIndex].end
  )
}
export const selectNextSection = (
  el: HTMLInputElement,
  currentSectionIndex: number,
  sections: Section[]
) => {
  if (currentSectionIndex < sections.length - 1) {
    selectSection(el, currentSectionIndex + 1, sections)
  }
}

export const selectPreviousSection = (
  el: HTMLInputElement,
  currentSectionIndex: number,
  sections: Section[]
) => {
  if (currentSectionIndex > 0) {
    selectSection(el, currentSectionIndex - 1, sections)
  }
}

export const validSection = (
  el: HTMLInputElement,
  sectionIndex: number,
  sections: Section[]
) => {
  const sectionValue = getSectionValue(el, sectionIndex, sections)
  return sections[sectionIndex].validation.test(sectionValue)
}

export const validAllSections = (el: HTMLInputElement, sections: Section[]) => {
  const sectionsBoundaries = getSectionsBoundaries(el, sections)
  return sectionsBoundaries
    .filter((sb: SectionBoundary) => sb !== null)
    .every((_, index) => validSection(el, index, sections))
}

const transformCurrentSectionValue = (
  el: HTMLInputElement,
  sections: Section[],
  fn: (v: string) => string,
  silent = true
) => {
  const sectionValueAtCursor = getSectionValueAtCursor(el, sections)
  const currentSectionIndex = getSectionAtCursor(el, sections)
  try {
    let newSectionValue = fn(sectionValueAtCursor)
    if (sections[currentSectionIndex].validation.test(newSectionValue)) {
      if (typeof sections[currentSectionIndex].preprocess === 'function') {
        newSectionValue =
          sections[currentSectionIndex].preprocess(newSectionValue)
      }
      replaceSectionValue(el, currentSectionIndex, sections, newSectionValue)
    }
  } catch (error) {
    if (!silent) throw error
  }
}

export const increaseCurrentSectionValue = (
  el: HTMLInputElement,
  sections: Section[]
) =>
  transformCurrentSectionValue(el, sections, (value) =>
    !isNaN(Number(value)) ? String(Number(value) + 1) : value
  )

export const decreaseCurrentSectionValue = (
  el: HTMLInputElement,
  sections: Section[]
) =>
  transformCurrentSectionValue(el, sections, (value) =>
    !isNaN(Number(value)) ? String(Number(value) - 1) : value
  )
