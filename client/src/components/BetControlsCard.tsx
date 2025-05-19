
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import type { ChipValue } from '@/lib/types';
import { useRouletteStore } from '@/store/useRouletteStore';

const CHIP_VALUES: ChipValue[] = [1, 5, 25, 100];

export const BetControlsCard = () => {
  const { selectedChipValue, setSelectedChipValue, autoSpinCount, autoSpinMinutes } = useRouletteStore();

  const showAutoSpinButton = autoSpinCount > 0 || autoSpinMinutes > 0;

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

          {showAutoSpinButton && (
            <>
              <Separator />
              <Button 
                className="w-full"
                variant="default"
                onClick={() => {
                  // Auto-spin logic will be implemented later
                  console.log('Auto-spin started');
                }}
              >
                Start Auto-Spin
                {autoSpinCount > 0 && ` (${autoSpinCount} spins)`}
                {autoSpinMinutes > 0 && ` (${autoSpinMinutes} minutes)`}
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
