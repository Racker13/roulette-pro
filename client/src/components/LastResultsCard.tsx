import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export function LastResultsCard() {
  // Placeholder for last results
  const lastResults = [
    { number: 17, color: 'black' },
    { number: 36, color: 'red' },
    { number: 0, color: 'green' },
    { number: 22, color: 'black' },
    { number: 9, color: 'red' },
  ];

  return (
    <Card className="bg-white rounded-lg shadow">
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Last Results</h2>
        
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