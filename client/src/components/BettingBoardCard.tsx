import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export function BettingBoardCard() {
  return (
    <Card className="bg-white rounded-lg shadow">
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Betting Board</h2>
        <div className="w-full bg-green-600 p-4 rounded-lg">
          {/* This is a placeholder for the betting board */}
          <div className="text-center text-white p-12">
            Roulette Betting Board
          </div>
        </div>
      </CardContent>
    </Card>
  );
}