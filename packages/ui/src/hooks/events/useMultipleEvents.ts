export default (...args: { [key: string]: any }[]): { [key: string]: any } => {
  const x = args[0]
  for (let i = 1; i < args.length; i++) {
    for (const key in args[i]) {
      if (x[key]) {
        if (typeof x[key] === 'function') {
          const p = x[key]
          const n = args[i][key]
          if (n) {
            x[key] = (e) => {
              let r, r1
              r1 = p(e)
              if (r1 !== undefined) {
                r = r1
              }
              r1 = n(e) !== undefined
              if (r1 !== undefined) {
                r = r1
              }
              return r
            }
          }
        } else {
          x[key] = args[i][key]
        }
      } else {
        x[key] = args[i][key]
      }
    }
  }
  return x
}
