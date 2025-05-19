import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { useRouletteStore } from "@/store/useRouletteStore";

export function LastResultsCard() {
  const lastResults = useRouletteStore(state => state.spinResults).slice(0, 5);

  return (
    <Card className="bg-white rounded-lg shadow">
      <TooltipProvider>
        <CardHeader className="relative">
          <CardTitle>Last Results</CardTitle>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute top-0 left-0 mt-1 ml-1">
                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-muted text-muted-foreground text-xs cursor-help">
                  i
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>LastResultsCard</p>
            </TooltipContent>
          </Tooltip>
        </CardHeader>
      </TooltipProvider>
      <CardContent className="p-4">
        
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {lastResults.map((result, index) => (
            <div 
              key={index} 
              className={`flex-shrink-0 inline-flex items-center justify-center h-10 w-10 rounded-full 
              ${result.color === 'red' ? 'bg-red-700' : 
                result.color === 'black' ? 'bg-black' : 
                'bg-green-700'} 
              text-white font-bold`}
            >
              {result.number}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}