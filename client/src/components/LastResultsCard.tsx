
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useRouletteStore } from '@/store/useRouletteStore';
import type { RouletteColor } from '@/lib/types';

export const LastResultsCard = () => {
  const [number, setNumber] = useState('');
  const [color, setColor] = useState<RouletteColor>('red');
  const { addSpinResult, spinResults } = useRouletteStore();

  const handleSubmit = () => {
    const parsedNumber = parseInt(number, 10);
    if ((parsedNumber >= 0 && parsedNumber <= 36) || number === '00') {
      addSpinResult({
        number: number === '00' ? '00' : parsedNumber,
        color,
        isEven: parsedNumber % 2 === 0,
        isLow: parsedNumber <= 18
      });
      setNumber('');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Last Results</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Number (0-36, 00)"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className="w-32"
            />
            <Select value={color} onValueChange={(val) => setColor(val as RouletteColor)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="red">Red</SelectItem>
                <SelectItem value="black">Black</SelectItem>
                <SelectItem value="green">Green</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleSubmit}>Add Result</Button>
          </div>
          
          <div className="flex gap-2">
            {spinResults.slice(0, 5).map((result, idx) => (
              <div
                key={idx}
                className={`
                  w-12 h-12 rounded-full flex items-center justify-center text-white font-bold
                  ${result.color === 'red' ? 'bg-red-600' : 
                    result.color === 'black' ? 'bg-black' : 'bg-green-600'}
                `}
              >
                {result.number}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
