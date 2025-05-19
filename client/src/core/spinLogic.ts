
export type SpinAttributes = {
  number: number;
  color: 'red' | 'black' | 'green';
  parity: 'even' | 'odd' | null;
  dozen: 1 | 2 | 3 | null;
  column: 1 | 2 | 3 | null;
  isZero: boolean;
  highLow: 'low' | 'high' | null;
};

const RED_NUMBERS = new Set([1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36]);
const BLACK_NUMBERS = new Set([2,4,6,8,10,11,13,15,17,20,22,24,26,28,29,31,33,35]);

export function getSpinAttributes(n: number): SpinAttributes {
  const isZero = n === 0;
  return {
    number: n,
    color: isZero ? 'green' : RED_NUMBERS.has(n) ? 'red' : 'black',
    parity: isZero ? null : (n % 2 === 0 ? 'even' : 'odd'),
    dozen: isZero ? null : Math.ceil(n / 12) as 1 | 2 | 3,
    column: isZero ? null : ((n - 1) % 3) + 1 as 1 | 2 | 3,
    isZero,
    highLow: isZero ? null : (n <= 18 ? 'low' : 'high'),
  };
}
