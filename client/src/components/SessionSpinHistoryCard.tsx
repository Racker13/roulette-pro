
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';

export const SessionSpinHistoryCard = () => (
  <Card>
    <CardHeader>
      <CardTitle>Session History</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-muted-foreground">Detailed session spin history will be displayed here</p>
    </CardContent>
  </Card>
);
