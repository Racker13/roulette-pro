
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
