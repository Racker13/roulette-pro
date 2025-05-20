import React from "react";
import { toast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { ClipboardCopy } from "lucide-react";
import { useRouletteStore } from "@/store/useRouletteStore";

const isBetWinning = (bet: any, result: any): boolean => {
  const { type, numbers } = bet;
  const { number, color, isEven } = result;

  switch (type) {
    case "red":
    case "black":
      return type === color;
    case "even":
      return isEven === true;
    case "odd":
      return isEven === false;
    case "high":
      return number >= 19 && number <= 36;
    case "low":
      return number >= 1 && number <= 18;
    default:
      return numbers.includes(number);
  }
};

const getPayoutMultiplier = (type: string) => {
  switch (type) {
    case "single": return 35;
    case "split": return 17;
    case "street": return 11;
    case "corner": return 8;
    case "line": return 5;
    case "dozen":
    case "column": return 2;
    case "red":
    case "black":
    case "even":
    case "odd":
    case "high":
    case "low": return 1;
    default: return 0;
  }
};

const calculateBetOutcome = (bet: any, result: any): number => {
  const isWinning = isBetWinning(bet, result);
  const multiplier = getPayoutMultiplier(bet.type);
  return isWinning ? bet.amount * multiplier : -bet.amount;
};

// helper to group identical bets
const mergeBets = (bets: any[]) => {
  const merged: any[] = [];

  for (const bet of bets) {
    const match = merged.find(b =>
      b.type === bet.type &&
      JSON.stringify(b.numbers) === JSON.stringify(bet.numbers)
    );
    if (match) {
      match.amount += bet.amount;
    } else {
      merged.push({ ...bet });
    }
  }

  return merged;
};

export function SessionSpinHistoryCard() {
  const spinResults = useRouletteStore(state => state.spinResults);

  let runningTotal = 0;
  let totalWagered = 0;

  const spinHistory = spinResults.map((result, index) => {
    const spinTotalBet = result.bets?.reduce((sum, bet) => sum + bet.amount, 0) ?? 0;
    totalWagered += spinTotalBet;

    const winAmount = result.bets?.reduce((total, bet) => {
      return total + calculateBetOutcome(bet, result);
    }, 0) ?? 0;

    runningTotal += winAmount;

    return {
      id: index.toString(),
      number: result.number,
      color: result.color,
      winAmount,
      runningTotal,
      totalBet: spinTotalBet,
      rawBets: result.bets ?? [],
      mergedBets: mergeBets(result.bets ?? []),
    };
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card className="bg-white rounded-lg shadow">
      <TooltipProvider>
        <CardHeader className="relative">
          <CardTitle>Session History</CardTitle>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute top-0 left-0 mt-1 ml-1">
                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-muted text-muted-foreground text-xs cursor-help">
                  i
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>View your session's spin and bet history</p>
            </TooltipContent>
          </Tooltip>
        </CardHeader>
      </TooltipProvider>

      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center"
            onClick={async () => {
              const exportData = JSON.stringify({
                spinResults,
                timestamp: new Date().toISOString()
              }, null, 2);

              await navigator.clipboard.writeText(exportData);
              toast({
                title: "Export Successful",
                description: "Session data copied to clipboard",
                duration: 2000
              });
            }}
          >
            <ClipboardCopy className="h-4 w-4 mr-1" /> Export
          </Button>
        </div>

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {spinHistory.length > 0 ? (
            spinHistory.map(spin => (
              <div key={spin.id} className="p-3 border border-gray-200 rounded-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span
                      className={`inline-flex items-center justify-center h-8 w-8 rounded-full ${
                        spin.color === "red"
                          ? "bg-red-700"
                          : spin.color === "black"
                          ? "bg-black"
                          : "bg-green-700"
                      } text-white font-bold mr-2`}
                    >
                      {spin.number}
                    </span>
                    <span className="text-sm font-medium capitalize">{spin.color}</span>
                  </div>
                  <span
                    className={`px-2 py-1 ${
                      spin.winAmount >= 0
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    } rounded text-xs font-medium`}
                  >
                    {spin.winAmount >= 0 ? "+" : ""}
                    {formatCurrency(spin.winAmount)}
                  </span>
                </div>
                <div className="mt-1 text-xs text-gray-500">
                  Bankroll: {formatCurrency(spin.runningTotal)}
                </div>
                <div className="text-xs text-gray-500">
                  Total Bet: {formatCurrency(spin.totalBet)}
                </div>
                {spin.mergedBets.map((bet, i) => (
                  <div key={i} className="text-xs text-gray-500 mt-1">
                    Bet: {bet.displayName ?? bet.type} ({formatCurrency(bet.amount)})
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div className="text-gray-400 text-sm p-4 text-center">No spins recorded yet</div>
          )}
        </div>

        {spinHistory.length > 0 && (
          <div className="mt-4 p-3 border-t border-gray-300 text-sm">
            <div className="flex justify-between mb-1">
              <span className="font-medium">Total Spins:</span>
              <span>{spinHistory.length}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span className="font-medium">Total Wagered:</span>
              <span>{formatCurrency(totalWagered)}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span className="font-medium">Final Bankroll:</span>
              <span>{formatCurrency(spinHistory[spinHistory.length - 1].runningTotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Net Profit/Loss:</span>
              <span
                className={`font-semibold ${
                  spinHistory[spinHistory.length - 1].runningTotal >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {formatCurrency(spinHistory[spinHistory.length - 1].runningTotal)}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
