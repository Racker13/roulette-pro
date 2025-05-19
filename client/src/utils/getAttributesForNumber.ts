
const RED_NUMBERS = new Set([1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36]);

export function getAttributesForNumber(n: number) {
  if (n === 0) {
    return {
      color: 'green' as const,
      isEven: false,
      isOdd: false,
      dozen: null,
      column: null,
      isLow: false,
      isHigh: false
    };
  }

  return {
    color: RED_NUMBERS.has(n) ? 'red' as const : 'black' as const,
    isEven: n % 2 === 0,
    isOdd: n % 2 === 1,
    dozen: Math.ceil(n / 12) as 1 | 2 | 3,
    column: ((n - 1) % 3 + 1) as 1 | 2 | 3,
    isLow: n <= 18,
    isHigh: n > 18
  };
}
