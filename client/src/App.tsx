
import { TopGroupCard } from './components/TopGroupCard';
import { BettingBoardCard } from './components/BettingBoardCard';
import { BetControlsCard } from './components/BetControlsCard';
import { ActiveBetsCard } from './components/ActiveBetsCard';
import { LastResultsCard } from './components/LastResultsCard';
import { StrategyInjectionCard } from './components/StrategyInjectionCard';
import { SessionSpinHistoryCard } from './components/SessionSpinHistoryCard';

function App() {
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4 bg-gray-50 min-h-screen">
      <TopGroupCard />
      <BettingBoardCard />
      <BetControlsCard />
      <ActiveBetsCard />
      <LastResultsCard />
      <StrategyInjectionCard />
      <SessionSpinHistoryCard />
    </div>
  );
}

export default App;
