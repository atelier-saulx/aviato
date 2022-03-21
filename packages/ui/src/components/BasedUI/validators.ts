export type Validator = (str: unknown) => boolean

const emailValidator: Validator = (emailValue: unknown) => {
  if (typeof emailValue !== 'string') {
    return false
  }

  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  return re.test(emailValue.toLowerCase())
}

export { emailValidator }
