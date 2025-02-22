export function formatedFileName(name: string) {
  return name.toLowerCase().split(' ').join('_')
}