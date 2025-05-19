import React from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function CR6Downloader() {
  const handleDownload = async () => {
    try {
      // Create a new zip file
      const zip = new JSZip();
      
      // Add the required files to the zip
      const sessionSetupCardContent = `import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export function SessionSetupCard() {
  return (
    <Card className="bg-white rounded-lg shadow">
      <CardContent className="p-4">
        <div className="flex flex-wrap items-center gap-4">
          {/* Strategy Select */}
          <div className="flex-grow">
            <Label htmlFor="strategy" className="text-sm font-medium text-gray-700 mb-1 block">
              Strategy
            </Label>
            <Select>
              <SelectTrigger className="w-full" id="strategy">
                <SelectValue placeholder="Select Strategy" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="none">No Strategy</SelectItem>
                  <SelectItem value="martingale">Martingale</SelectItem>
                  <SelectItem value="fibonacci">Fibonacci</SelectItem>
                  <SelectItem value="dalembert">D'Alembert</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Account Type Select */}
          <div>
            <Label htmlFor="accountType" className="text-sm font-medium text-gray-700 mb-1 block">
              Account Type
            </Label>
            <Select defaultValue="free">
              <SelectTrigger className="w-28" id="accountType">
                <SelectValue placeholder="Account" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="real">Real</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Bankroll Input */}
          <div>
            <Label htmlFor="bankroll" className="text-sm font-medium text-gray-700 mb-1 block">
              Bankroll
            </Label>
            <Input
              id="bankroll"
              type="number"
              placeholder="1000"
              className="w-24"
              min={1}
              max={9999}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}`;

      const sessionControlsCardContent = `import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
}`;

      const useSessionStoreContent = `import { create } from 'zustand';

interface SessionState {
  autoSpinCount: number;
  autoSpinMinutes: number;
  setAutoSpinCount: (count: number) => void;
  setAutoSpinMinutes: (minutes: number) => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  autoSpinCount: 0,
  autoSpinMinutes: 0,
  setAutoSpinCount: (count) => set({ autoSpinCount: count }),
  setAutoSpinMinutes: (minutes) => set({ autoSpinMinutes: minutes })
}));`;

      const appTsxContent = `
import { SessionSetupCard } from './components/SessionSetupCard';
import { SessionControlsCard } from './components/SessionControlsCard';
import { BettingBoardCard } from './components/BettingBoardCard';
import { BetControlsCard } from './components/BetControlsCard';
import { ActiveBetsCard } from './components/ActiveBetsCard';
import { LastResultsCard } from './components/LastResultsCard';
import { StrategyInjectionCard } from './components/StrategyInjectionCard';
import { SessionSpinHistoryCard } from './components/SessionSpinHistoryCard';

function App() {
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6 bg-gray-50 min-h-screen">
      <SessionSetupCard />
      <SessionControlsCard />
      <BetControlsCard />
      <BettingBoardCard />
      <ActiveBetsCard />
      <LastResultsCard />
      <SessionSpinHistoryCard />
      <StrategyInjectionCard />
    </div>
  );
}

export default App;
`;

      // Add files to the zip
      zip.file("SessionSetupCard.tsx", sessionSetupCardContent);
      zip.file("SessionControlsCard.tsx", sessionControlsCardContent);
      zip.file("useSessionStore.ts", useSessionStoreContent);
      zip.file("App.tsx", appTsxContent);
      
      // Generate the zip
      const content = await zip.generateAsync({ type: "blob" });
      
      // Save the zip file
      saveAs(content, "cr6-files.zip");
    } catch (error) {
      console.error("Error downloading files:", error);
      alert("Failed to download files. See console for details.");
    }
  };

  return (
    <Button 
      onClick={handleDownload} 
      variant="outline" 
      size="sm" 
      className="flex items-center"
    >
      <Download className="mr-2 h-4 w-4" /> CR6 Files
    </Button>
  );
}