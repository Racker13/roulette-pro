import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Undo2, Redo2, RefreshCw } from "lucide-react";
import { SpinResult } from "@/lib/types";
import { getNumberColor } from "@/lib/roulette";

interface BankrollCardProps {
  bankroll: number;
  sessionPL: number;
  lastSpin: SpinResult | null;
  onUndo: () => void;
  onRedo: () => void;
  onRebet: () => void;
}

export default function BankrollCard({ 
  bankroll, 
  sessionPL, 
  lastSpin,
  onUndo,
  onRedo,
  onRebet
}: BankrollCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <Card className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-gray-500">Bankroll</p>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(bankroll)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Session P/L</p>
          <p className={`text-2xl font-bold ${sessionPL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {sessionPL >= 0 ? '+' : ''}{formatCurrency(sessionPL)}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Last Spin</p>
          {lastSpin ? (
            <div className="flex items-center">
              <span 
                className={`inline-flex items-center justify-center h-8 w-8 rounded-full ${
                  lastSpin.color === 'red' 
                    ? 'bg-red-700' 
                    : lastSpin.color === 'black' 
                      ? 'bg-black' 
                      : 'bg-green-700'
                } text-white font-bold mr-2`}
              >
                {lastSpin.number}
              </span>
              <span className="text-lg font-semibold text-gray-900 capitalize">{lastSpin.color}</span>
            </div>
          ) : (
            <span className="text-lg font-semibold text-gray-400">None</span>
          )}
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={onUndo}
            className="flex items-center"
          >
            <Undo2 className="mr-2 h-4 w-4" /> Undo
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={onRedo}
            className="flex items-center"
          >
            <Redo2 className="mr-2 h-4 w-4" /> Redo
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={onRebet}
            className="bg-green-100 hover:bg-green-200 text-green-800 border-green-300 flex items-center"
          >
            <RefreshCw className="mr-2 h-4 w-4" /> Rebet
          </Button>
        </div>
      </div>
    </Card>
  );
}
