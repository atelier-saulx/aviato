export function getPreviousTab(active: number, tabs: React.ReactElement[]) {
  for (let index = active - 1; index >= 0; index -= 1) {
    if (!tabs[index].props.disabled) {
      return index
    }
  }

  return active
}

export function getNextTab(active: number, tabs: React.ReactElement[]) {
  for (let index = active + 1; index < tabs.length; index += 1) {
    if (!tabs[index].props.disabled) {
      return index
    }
  }

  return active
}

export function findInitialTab(tabs: React.ReactElement[]) {
  for (let index = 0; index < tabs.length; index += 1) {
    if (!tabs[index].props.disabled) {
      return index
    }
  }

  return -1
}
