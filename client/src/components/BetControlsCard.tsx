
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import type { ChipValue } from '@/lib/types';
import { useRouletteStore } from '@/store/useRouletteStore';

const CHIP_VALUES: ChipValue[] = [1, 5, 25, 100];

export const BetControlsCard = () => {
  const { selectedChipValue, setSelectedChipValue } = useRouletteStore();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bet Controls</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {CHIP_VALUES.map((amount) => (
              <Button
                key={amount}
                onClick={() => setSelectedChipValue(amount)}
                variant={selectedChipValue === amount ? "default" : "outline"}
                className={`
                  w-16 h-16 rounded-full font-bold
                  ${selectedChipValue === amount ? 'ring-2 ring-offset-2 ring-primary' : ''}
                `}
              >
                ${amount}
              </Button>
            ))}
          </div>
          <div className="text-sm text-muted-foreground">
            Selected bet amount: ${selectedChipValue}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
