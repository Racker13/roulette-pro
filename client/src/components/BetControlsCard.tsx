import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function BetControlsCard() {
  return (
    <Card className="bg-white rounded-lg shadow">
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Bet Controls</h2>
        
        <div className="grid grid-cols-5 gap-2">
          {[1, 5, 25, 100, 500].map(value => (
            <button
              key={`chip-${value}`}
              className={`h-12 w-12 rounded-full font-bold text-sm flex items-center justify-center mx-auto
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
            <Button variant="outline">Clear Bets</Button>
            <Button variant="outline">Double Bets</Button>
          </div>
          <Button className="bg-green-600 hover:bg-green-700 text-white">Spin</Button>
        </div>
      </CardContent>
    </Card>
  );
}