
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useRouletteStore } from "@/store/useRouletteStore";

export function BetControlsCard() {
  const selectedChip = useRouletteStore(state => state.selectedChipValue);
  const setSelectedChip = useRouletteStore(state => state.setSelectedChipValue);

  return (
    <Card className="bg-white rounded-lg shadow">
      <TooltipProvider>
        <CardHeader className="relative">
          <CardTitle>Bet Controls</CardTitle>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute top-0 left-0 mt-1 ml-1">
                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-muted text-muted-foreground text-xs cursor-help">
                  i
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Control your bet amounts and actions</p>
            </TooltipContent>
          </Tooltip>
        </CardHeader>
      </TooltipProvider>
      <CardContent className="p-4">
        
        <div className="grid grid-cols-5 gap-2">
          {[1, 5, 25, 100, 500].map(value => (
            <button
              key={`chip-${value}`}
              onClick={() => setSelectedChip(value)}
              aria-pressed={selectedChip === value}
              className={`h-12 w-12 rounded-full font-bold text-sm flex items-center justify-center mx-auto transition-transform active:scale-95
                ${value === 1 ? 'bg-red-100 border-2 border-red-300 text-red-700' : 
                value === 5 ? 'bg-green-100 border-2 border-green-300 text-green-700' :
                value === 25 ? 'bg-blue-100 border-2 border-blue-300 text-blue-700' :
                value === 100 ? 'bg-purple-100 border-2 border-purple-300 text-purple-700' :
                'bg-yellow-100 border-2 border-yellow-600 text-yellow-600'}`
              }
            >
              ${value}
            </button>
          ))}
        </div>
        
        <div className="flex justify-between mt-4">
          <div className="space-x-2">
            <Button variant="outline" onClick={() => useRouletteStore.getState().clearBets()}>
              Clear Bets
            </Button>
            <Button variant="outline" disabled>
              {/* TODO: Implement Double Bets */}
              Double Bets
            </Button>
          </div>
          <Button 
            className="bg-green-600 hover:bg-green-700 text-white"
            onClick={() => useRouletteStore.getState().addSpinResult(Math.floor(Math.random() * 37))}
          >
            Spin
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
