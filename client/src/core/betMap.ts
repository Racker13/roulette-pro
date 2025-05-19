
export const BET_TARGET_MAP: Record<string | number, string> = {
  red: 'color',
  black: 'color',
  even: 'evenOdd',
  odd: 'evenOdd',
  '1 to 18': 'highLow',
  '19 to 36': 'highLow',
  '1st 12': 'dozen',
  '2nd 12': 'dozen',
  '3rd 12': 'dozen',
  'Column 1': 'column',
  'Column 2': 'column',
  'Column 3': 'column',
  // All individual numbers
  ...Object.fromEntries(Array.from({ length: 37 }, (_, i) => [i, 'straight'])),
  37: 'basket', // for 00 in American (optional for future)
};
