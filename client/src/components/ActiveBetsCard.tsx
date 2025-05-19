import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export function ActiveBetsCard() {
  // Placeholder for active bets
  const activeBets = [
    { id: '1', type: 'Red', amount: 5 },
    { id: '2', type: 'Number 17', amount: 1 }
  ];

  const getChipBgColor = (amount: number) => {
    if (amount === 1) return "bg-red-100 text-red-800";
    if (amount === 5) return "bg-green-100 text-green-800";
    if (amount === 25) return "bg-blue-100 text-blue-800";
    if (amount === 100) return "bg-purple-100 text-purple-800";
    return "bg-yellow-100 text-yellow-600";
  };

  return (
    <Card className="bg-white rounded-lg shadow">
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Active Bets</h2>
        
        {activeBets.length > 0 ? (
          <div className="space-y-2">
            {activeBets.map((bet) => (
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
            <div className="mt-3 flex justify-between">
              <span className="text-sm font-medium">Total Bet Amount:</span>
              <span className="text-sm font-bold">$6</span>
            </div>
          </div>
        ) : (
          <div className="text-gray-400 text-sm p-4 text-center">No active bets</div>
        )}
      </CardContent>
    </Card>
  );
}