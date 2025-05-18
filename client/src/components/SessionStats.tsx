import React from "react";
import { Card } from "@/components/ui/card";
import { SessionStats as SessionStatsType } from "@/lib/types";
import { getNumberColor } from "@/lib/roulette";

interface SessionStatsProps {
  stats: SessionStatsType;
}

export default function SessionStats({ stats }: SessionStatsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return (value * 100).toFixed(1) + '%';
  };

  return (
    <Card className="rounded-lg shadow overflow-hidden mt-6">
      <div className="p-4 bg-gray-50 border-b">
        <h2 className="text-lg font-semibold text-gray-900">Session Statistics</h2>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Spins</p>
            <p className="text-xl font-semibold">{stats.totalSpins}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Win Rate</p>
            <p className="text-xl font-semibold">{formatPercentage(stats.winRate)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Biggest Win</p>
            <p className="text-xl font-semibold text-green-600">
              {stats.biggestWin > 0 ? `+${formatCurrency(stats.biggestWin)}` : '$0'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Biggest Loss</p>
            <p className="text-xl font-semibold text-red-600">
              {stats.biggestLoss < 0 ? formatCurrency(stats.biggestLoss) : '$0'}
            </p>
          </div>
        </div>
        
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Most Common Numbers</h3>
          <div className="flex flex-wrap gap-2">
            {stats.mostCommonNumbers.map(({ number, count }) => {
              const color = number === 0 || number === "00" ? "green" : getNumberColor(number);
              return (
                <span 
                  key={`common-${number}`}
                  className={`inline-flex items-center justify-center h-8 w-8 rounded-full ${
                    color === 'red' 
                      ? 'bg-red-700' 
                      : color === 'black' 
                        ? 'bg-black' 
                        : 'bg-green-700'
                  } text-white font-bold text-xs`}
                  title={`${number} (${count} times)`}
                >
                  {number}
                </span>
              );
            })}
            {stats.mostCommonNumbers.length === 0 && (
              <span className="text-sm text-gray-400">No data yet</span>
            )}
          </div>
        </div>
        
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Color Distribution</h3>
          <div className="w-full bg-gray-200 rounded-full h-4 mb-1 overflow-hidden">
            {stats.totalSpins > 0 && (
              <>
                <div 
                  className="bg-red-700 h-4 float-left" 
                  style={{ width: `${stats.colorDistribution.red * 100}%` }}
                />
                <div 
                  className="bg-black h-4 float-left" 
                  style={{ width: `${stats.colorDistribution.black * 100}%` }}
                />
                <div 
                  className="bg-green-700 h-4 float-left" 
                  style={{ width: `${stats.colorDistribution.green * 100}%` }}
                />
              </>
            )}
          </div>
          <div className="flex justify-between text-xs">
            <span>Red: {formatPercentage(stats.colorDistribution.red)}</span>
            <span>Black: {formatPercentage(stats.colorDistribution.black)}</span>
            <span>Green: {formatPercentage(stats.colorDistribution.green)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
