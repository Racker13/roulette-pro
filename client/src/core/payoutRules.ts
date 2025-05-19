
export type BetPlacement = 'inside' | 'outside';

export interface PayoutRule {
  payout: number;
  oddsEU: number | null;
  oddsUS: number | null;
  placement: BetPlacement;
}

export const PAYOUTS: Record<string, PayoutRule> = {
  straight:  { payout: 35, oddsEU: 2.7, oddsUS: 2.6, placement: 'inside' },
  split:     { payout: 17, oddsEU: 5.4, oddsUS: 5.3, placement: 'inside' },
  street:    { payout: 11, oddsEU: 8.1, oddsUS: 7.9, placement: 'inside' },
  corner:    { payout: 8,  oddsEU: 10.8, oddsUS: 10.5, placement: 'inside' },
  basket:    { payout: 6,  oddsEU: null, oddsUS: 13.2, placement: 'inside' },
  sixLine:   { payout: 5,  oddsEU: 16.2, oddsUS: 15.8, placement: 'inside' },
  column:    { payout: 2,  oddsEU: 32.4, oddsUS: 31.6, placement: 'outside' },
  dozen:     { payout: 2,  oddsEU: 32.4, oddsUS: 31.6, placement: 'outside' },
  color:     { payout: 1,  oddsEU: 48.65, oddsUS: 47.37, placement: 'outside' },
  evenOdd:   { payout: 1,  oddsEU: 48.65, oddsUS: 47.37, placement: 'outside' },
  highLow:   { payout: 1,  oddsEU: 48.65, oddsUS: 47.37, placement: 'outside' },
};
