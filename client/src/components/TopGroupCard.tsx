
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';

export const TopGroupCard = () => (
  <Card>
    <CardHeader>
      <CardTitle>Game Statistics</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-muted-foreground">Game statistics and metrics will appear here</p>
    </CardContent>
  </Card>
);
