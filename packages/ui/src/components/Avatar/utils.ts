export function getInitialsFromUsername(fullUserName: string) {
  const fullName = fullUserName.split(' ')
  if (fullName.length > 1) {
    const initials = fullName.shift().charAt(0) + fullName.pop().charAt(0)
    return initials.toUpperCase()
  }

  const initials = fullName.shift().charAt(0)
  return initials.toUpperCase()
}
