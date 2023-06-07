export function isURL(value: string) {
  return value.slice(0, 4) === 'http';
}
