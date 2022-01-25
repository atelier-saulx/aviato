export function getLettersFromAlt(input: string) {
  const separatedBySpace = input.split(' ')
  if (separatedBySpace.length > 1) {
    const initials =
      separatedBySpace.shift().charAt(0) + separatedBySpace.pop().charAt(0)
    return initials.toUpperCase()
  } else {
    const initials = separatedBySpace.shift().charAt(0)
    return initials.toUpperCase()
  }
}
