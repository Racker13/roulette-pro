import React from "react";
import { Bet } from "@/lib/types";

interface ActiveBetsProps {
  bets: Bet[];
  totalBetAmount: number;
}

export default function ActiveBets({ bets, totalBetAmount }: ActiveBetsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Function to get chip background color based on amount
  const getChipBgColor = (amount: number) => {
    if (amount === 1) return "bg-red-100 text-red-800";
    if (amount === 5) return "bg-green-100 text-green-800";
    if (amount === 25) return "bg-blue-100 text-blue-800";
    if (amount === 100) return "bg-purple-100 text-purple-800";
    return "bg-yellow-100 text-yellow-600";
  };

  return (
    <div className="mt-4 p-4 border border-gray-200 rounded-md bg-gray-50">
      <h3 className="text-sm font-medium text-gray-700 mb-2">Active Bets</h3>
      {bets.length > 0 ? (
        <div className="space-y-2">
          {bets.map((bet) => (
            <div 
              key={bet.id} 
              className="flex justify-between items-center text-sm p-2 bg-white rounded border border-gray-200"
            >
              <span className="font-medium">{bet.displayName}</span>
              <span className={`px-2 py-1 rounded-md ${getChipBgColor(bet.amount)}`}>
                {formatCurrency(bet.amount)}
              </span>
            </div>
          ))}
          <div className="mt-3 flex justify-between">
            <span className="text-sm font-medium">Total Bet Amount:</span>
            <span className="text-sm font-bold">{formatCurrency(totalBetAmount)}</span>
          </div>
        </div>
      ) : (
        <div className="text-gray-400 text-sm">No active bets</div>
      )}
    </div>
  );
}
