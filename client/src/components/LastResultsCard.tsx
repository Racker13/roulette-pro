
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';

export const LastResultsCard = () => (
  <Card>
    <CardHeader>
      <CardTitle>Last Results</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-muted-foreground">Previous spin results will be shown here</p>
    </CardContent>
  </Card>
);
