
export function names(...names: string[]) {
  let ret = ''
  names.forEach(v => {
    if (v) {
      ret += v + ' '
    }
  })
  return ret
}

export function check(result: boolean, className: string): string {
  return result ? className : ''
}