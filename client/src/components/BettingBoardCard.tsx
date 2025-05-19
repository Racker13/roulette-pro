
import { getSpinAttributes } from '../core/spinLogic';
import { BET_TARGET_MAP } from '../core/betMap';
import { useSimulator } from '../hooks/useSimulator';
import { Card } from './ui/card';
import { useRouletteStore } from '@/store/useRouletteStore';

const numberGrid = [
  [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36],
  [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35],
  [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34],
];

const outsideBets = [
  'red', 'black', 'even', 'odd',
  '1 to 18', '19 to 36',
  '1st 12', '2nd 12', '3rd 12',
  'Column 1', 'Column 2', 'Column 3',
];

export const BettingBoardCard = () => {
  const { selectedChipValue, addBet } = useRouletteStore();

  const handleBetClick = (target: number | string) => {
    const betType = BET_TARGET_MAP[target];
    if (!betType) {
      alert('Invalid bet target');
      return;
    }
    
    addBet({
      betType: { type: betType, target },
      amount: selectedChipValue,
      displayName: `${betType} - ${target}`
    });
  };

  return (
    <Card className="p-4">
      <h2 className="text-lg font-bold mb-2">Betting Board</h2>

      {/* 0 Button */}
      <button
        onClick={() => handleBetClick(0)}
        className="bg-green-500 text-white w-full py-2 mb-2 rounded"
      >
        0
      </button>

      {/* Number Grid */}
      <div className="grid grid-cols-12 gap-1 mb-4">
        {numberGrid.map((row, i) => (
          <div key={i} className="contents">
            {row.map((n) => (
              <button
                key={n}
                onClick={() => handleBetClick(n)}
                className={`rounded text-white py-2 ${
                  getSpinAttributes(n).color === 'red' ? 'bg-red-600' : 'bg-black'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Outside Bets */}
      <div className="grid grid-cols-3 gap-2 mt-2">
        {outsideBets.map((label) => (
          <button
            key={label}
            onClick={() => handleBetClick(label)}
            className="bg-gray-100 border text-black rounded py-2 hover:bg-gray-200"
          >
            {label}
          </button>
        ))}
      </div>
    </Card>
  );
};
