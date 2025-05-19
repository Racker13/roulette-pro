import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function StrategyInjectionCard() {
  return (
    <Card className="bg-white rounded-lg shadow">
      <TooltipProvider>
        <CardHeader className="relative">
          <CardTitle>Strategy Parameters</CardTitle>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute top-0 left-0 mt-1 ml-1">
                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-muted text-muted-foreground text-xs cursor-help">
                  i
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Configure strategy parameters here</p>
            </TooltipContent>
          </Tooltip>
        </CardHeader>
      </TooltipProvider>
      <CardContent className="p-4">
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="baseAmount" className="text-sm font-medium text-gray-700 mb-1 block">
                Base Amount
              </Label>
              <Input
                id="baseAmount"
                type="number"
                placeholder="5"
              />
            </div>
            <div>
              <Label htmlFor="betMultiplier" className="text-sm font-medium text-gray-700 mb-1 block">
                Bet Multiplier
              </Label>
              <Input
                id="betMultiplier"
                type="number"
                placeholder="2"
              />
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Apply Strategy
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}