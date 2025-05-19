import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SessionControlsCard() {
  const [autoSpinCount, setAutoSpinCount] = useState<number>(0);
  const [autoSpinMinutes, setAutoSpinMinutes] = useState<number>(0);

  const handleAutoSpinCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value) || 0;
    setAutoSpinCount(value);
  };

  const handleAutoSpinMinutesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value) || 0;
    setAutoSpinMinutes(value);
  };

  return (
    <Card className="bg-white rounded-lg shadow">
      <TooltipProvider>
        <CardHeader className="relative">
          <CardTitle>Session Controls</CardTitle>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute top-0 left-0 mt-1 ml-1">
                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-muted text-muted-foreground text-xs cursor-help">
                  i
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>SessionControlsCard</p>
            </TooltipContent>
          </Tooltip>
        </CardHeader>
      </TooltipProvider>
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Button Row */}
          <div className="flex space-x-2">
            <Button 
              variant="default" 
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Start Session
            </Button>
            <Button variant="destructive">End Session</Button>
          </div>

          {/* Auto Spin Config */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="autoSpins" className="text-sm font-medium text-gray-700 mb-1 block">
                Auto Spins
              </Label>
              <Input
                id="autoSpins"
                type="number"
                placeholder="100"
                value={autoSpinCount || ''}
                onChange={handleAutoSpinCountChange}
                min={0}
              />
            </div>
            <div>
              <Label htmlFor="duration" className="text-sm font-medium text-gray-700 mb-1 block">
                Duration (mins)
              </Label>
              <Input
                id="duration"
                type="number"
                placeholder="5"
                value={autoSpinMinutes || ''}
                onChange={handleAutoSpinMinutesChange}
                min={0}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}