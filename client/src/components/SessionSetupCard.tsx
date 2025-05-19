import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
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
      <TooltipProvider>
        <CardHeader className="relative">
          <CardTitle>Session Setup</CardTitle>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute top-0 left-0 mt-1 ml-1">
                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-muted text-muted-foreground text-xs cursor-help">
                  i
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Configure your session settings here</p>
            </TooltipContent>
          </Tooltip>
        </CardHeader>
      </TooltipProvider>
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
}