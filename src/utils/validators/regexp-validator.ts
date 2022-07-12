export function regExpValidator(regex: RegExp, value: string): boolean {
  return regex.test(value.trim());
}
