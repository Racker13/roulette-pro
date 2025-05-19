
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';

export const ActiveBetsCard = () => (
  <Card>
    <CardHeader>
      <CardTitle>Active Bets</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-muted-foreground">Current active bets will be displayed here</p>
    </CardContent>
  </Card>
);
