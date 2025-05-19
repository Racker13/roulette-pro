
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Separator } from "./ui/separator"

export const SessionSetupCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Session Setup</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="strategy">Strategy</Label>
          <Select disabled>
            <SelectTrigger>
              <SelectValue placeholder="Choose a strategy" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rb135s">RB135S Strategy</SelectItem>
              <SelectItem value="crazySplits">Crazy Splits</SelectItem>
              <SelectItem value="custom">Custom Strategy</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="account">Account Type</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select account type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="free">Free</SelectItem>
              <SelectItem value="real">Real</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bankroll">Starting Bankroll ($)</Label>
          <Input
            type="number"
            id="bankroll"
            placeholder="Enter starting bankroll"
            min={0}
            step={1}
          />
        </div>

        <Separator className="my 4" />
        
        <div className="space-y-2 opacity-60">
          <div className="text-sm font-medium mb-2">Auto-Spin (Coming Soon)</div>
          <div className="flex gap-4">
            <div className="flex-1">
              <Input disabled type="number" placeholder="Number of spins" />
            </div>
            <div className="flex-1">
              <Input disabled type="number" placeholder="Minutes to run" />
            </div>
          </div>
          <Button className="w-full" disabled>Start Auto-Spin</Button>
        </div>
      </CardContent>
    </Card>
  );
};
