
import { SessionSetupCard } from './components/SessionSetupCard';
import { SessionControlsCard } from './components/SessionControlsCard';
import { BettingBoardCard } from './components/BettingBoardCard';
import { BetControlsCard } from './components/BetControlsCard';
import { ActiveBetsCard } from './components/ActiveBetsCard';
import { LastResultsCard } from './components/LastResultsCard';
import { StrategyInjectionCard } from './components/StrategyInjectionCard';
import { SessionSpinHistoryCard } from './components/SessionSpinHistoryCard';
import CR6Downloader from './components/CR6Downloader';

function App() {
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex justify-end mb-4">
        <CR6Downloader />
      </div>
      <SessionSetupCard />
      <SessionControlsCard />
      <BettingBoardCard />
      <BetControlsCard />
      <ActiveBetsCard />
      <LastResultsCard />
      <SessionSpinHistoryCard />
      <StrategyInjectionCard />
    </div>
  );
}

export default App;
