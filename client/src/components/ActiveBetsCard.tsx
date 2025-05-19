
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { useRouletteStore } from '@/store/useRouletteStore';
import { CopyIcon, Trash2Icon } from 'lucide-react';

export const ActiveBetsCard = () => {
  const { placedBets, clearBets, exportBets } = useRouletteStore();
  
  const handleExport = () => {
    navigator.clipboard.writeText(exportBets());
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Active Bets</CardTitle>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handleExport}
            title="Export bets"
          >
            <CopyIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={clearBets}
            title="Clear bets"
          >
            <Trash2Icon className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {placedBets.length === 0 ? (
          <p className="text-sm text-muted-foreground">No active bets</p>
        ) : (
          <div className="space-y-2">
            {placedBets.map((bet) => (
              <div key={bet.id} className="flex justify-between items-center">
                <span>{bet.displayName}</span>
                <span className="font-mono">${bet.amount}</span>
              </div>
            ))}
            <Separator />
            <div className="flex justify-between items-center font-bold">
              <span>Total</span>
              <span className="font-mono">
                ${placedBets.reduce((sum, bet) => sum + bet.amount, 0)}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
