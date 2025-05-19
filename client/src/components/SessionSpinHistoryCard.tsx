import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { ClipboardCopy } from "lucide-react";

export function SessionSpinHistoryCard() {
  const { spinResults, placedBets } = useRouletteStore(state => ({
    spinResults: state.spinResults,
    placedBets: state.placedBets
  }));

  const spinHistory = spinResults.map((result, index) => ({
    id: index.toString(),
    number: result.number,
    color: result.color,
    bet: placedBets.length > 0 ? placedBets[0].displayName : 'No bet',
    amount: placedBets.length > 0 ? placedBets[0].amount : 0,
    winAmount: 0, // Simplified for now
    timestamp: new Date()
  }));

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
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
          <Button variant="outline" size="sm" className="flex items-center">
            <ClipboardCopy className="h-4 w-4 mr-1" /> Export
          </Button>
        </div>
        
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {spinHistory.length > 0 ? (
            spinHistory.map((spin) => (
              <div key={spin.id} className="p-3 border border-gray-200 rounded-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span 
                      className={`inline-flex items-center justify-center h-8 w-8 rounded-full ${
                        spin.color === 'red' 
                          ? 'bg-red-700' 
                          : spin.color === 'black' 
                            ? 'bg-black' 
                            : 'bg-green-700'
                      } text-white font-bold mr-2`}
                    >
                      {spin.number}
                    </span>
                    <span className="text-sm font-medium capitalize">{spin.color}</span>
                  </div>
                  <span 
                    className={`px-2 py-1 ${
                      spin.winAmount >= 0 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    } rounded text-xs font-medium`}
                  >
                    {spin.winAmount >= 0 ? '+' : ''}{formatCurrency(spin.winAmount)}
                  </span>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  Bet: {spin.bet} ({formatCurrency(spin.amount)})
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-400 text-sm p-4 text-center">No spins recorded yet</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}