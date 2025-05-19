import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function StrategyInjectionCard() {
  return (
    <Card className="bg-white rounded-lg shadow">
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Strategy Parameters</h2>
        
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