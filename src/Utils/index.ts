export const limit_string = (value: string, limit: number): string => {
  if (typeof value !== 'string') {
    return '';
  }

  if (value.split('').length > limit) {
    return `${value.substring(0, limit)}...`;
  }

  return value;
}