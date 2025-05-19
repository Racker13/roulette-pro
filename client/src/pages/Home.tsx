import Layout from "@/components/Layout";
import RouletteTable from "@/components/RouletteTable";
import BankrollCard from "@/components/BankrollCard";
import SpinHistory from "@/components/SpinHistory";
import SessionStats from "@/components/SessionStats";
import NewSessionSetupCard from "@/components/NewSessionSetupCard";
import NewSessionControlsCard from "@/components/NewSessionControlsCard";
import { useRoulette } from "@/hooks/useRoulette";

export default function Home() {
  const {
    bankroll,
    sessionPL,
    lastSpin,
    activeBets,
    spinHistory,
    stats,
    selectedChip,
    setSelectedChip,
    placeBet,
    clearBets,
    doubleBets,
    spin,
    undo,
    redo,
    rebet,
    exportSession,
    spinResult,
    setSpinResult,
  } = useRoulette();

  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Session Setup & Controls */}
        <div className="lg:col-span-3 space-y-4">
          <NewSessionSetupCard />
          <NewSessionControlsCard />
          <BankrollCard
            bankroll={bankroll}
            sessionPL={sessionPL}
            lastSpin={lastSpin}
            onUndo={undo}
            onRedo={redo}
            onRebet={rebet}
          />
        </div>

        {/* Roulette Table Section */}
        <div className="lg:col-span-2">
          <RouletteTable
            selectedChip={selectedChip}
            setSelectedChip={setSelectedChip}
            activeBets={activeBets}
            onPlaceBet={placeBet}
            onClearBets={clearBets}
            onDoubleBets={doubleBets}
            onSpin={spin}
            spinResult={spinResult}
            setSpinResult={setSpinResult}
          />
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <SpinHistory history={spinHistory} onExport={exportSession} />
          <SessionStats stats={stats} />
        </div>
      </div>
    </Layout>
  );
}
