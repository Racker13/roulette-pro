import React from "react";
import { Card } from "@/components/ui/card";
import { ClipboardCopy } from "lucide-react";
import { SpinHistory as SpinHistoryType } from "@/lib/types";

interface SpinHistoryProps {
  history: SpinHistoryType[];
  onExport: () => void;
}

export default function SpinHistory({ history, onExport }: SpinHistoryProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card className="rounded-lg shadow overflow-hidden">
      <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Spin History</h2>
        <button 
          className="text-sm text-gray-500 hover:text-gray-700 flex items-center"
          onClick={onExport}
        >
          <ClipboardCopy className="h-4 w-4 mr-1" /> Export
        </button>
      </div>
      <div className="p-4">
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {history.length > 0 ? (
            history.map((spin) => (
              <div key={spin.id} className="p-3 border border-gray-200 rounded-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span 
                      className={`inline-flex items-center justify-center h-8 w-8 rounded-full ${
                        spin.result.color === 'red' 
                          ? 'bg-red-700' 
                          : spin.result.color === 'black' 
                            ? 'bg-black' 
                            : 'bg-green-700'
                      } text-white font-bold mr-2`}
                    >
                      {spin.result.number}
                    </span>
                    <span className="text-sm font-medium capitalize">{spin.result.color}</span>
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
                  Bets: {spin.bets.map(b => `${b.displayName} (${formatCurrency(b.amount)})`).join(', ')}
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-400 text-sm">No spins yet</div>
          )}
        </div>
      </div>
    </Card>
  );
}
