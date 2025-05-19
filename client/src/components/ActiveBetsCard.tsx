
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useRouletteStore } from "@/store/useRouletteStore";

export function ActiveBetsCard() {
  const placedBets = useRouletteStore(state => state.placedBets);
  const clearBets = useRouletteStore(state => state.clearBets);

  const getChipBgColor = (amount: number) => {
    if (amount === 1) return "bg-red-100 text-red-800";
    if (amount === 5) return "bg-green-100 text-green-800";
    if (amount === 25) return "bg-blue-100 text-blue-800";
    if (amount === 100) return "bg-purple-100 text-purple-800";
    return "bg-yellow-100 text-yellow-600";
  };

  return (
    <Card className="bg-white rounded-lg shadow">
      <TooltipProvider>
        <CardHeader className="relative">
          <CardTitle>Active Bets</CardTitle>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute top-0 left-0 mt-1 ml-1">
                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-muted text-muted-foreground text-xs cursor-help">
                  i
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Active bets for the current spin</p>
            </TooltipContent>
          </Tooltip>
        </CardHeader>
      </TooltipProvider>
      <CardContent className="p-4">
        {placedBets.length > 0 ? (
          <div className="space-y-2">
            {placedBets.map((bet) => (
              <div 
                key={bet.id} 
                className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded border border-gray-200"
              >
                <span className="font-medium">{bet.type}</span>
                <span className={`px-2 py-1 rounded-md ${getChipBgColor(bet.amount)}`}>
                  ${bet.amount}
                </span>
              </div>
            ))}
            <div className="mt-3 flex justify-between items-center">
              <span className="text-sm font-medium">Total Bet Amount:</span>
              <span className="text-sm font-bold">
                ${placedBets.reduce((sum, bet) => sum + bet.amount, 0)}
              </span>
            </div>
            <Button 
              variant="outline" 
              className="w-full mt-2"
              onClick={clearBets}
            >
              Clear Bets
            </Button>
          </div>
        ) : (
          <div className="text-gray-400 text-sm p-4 text-center">No active bets</div>
        )}
      </CardContent>
    </Card>
  );
}
