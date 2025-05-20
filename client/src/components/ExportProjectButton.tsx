import { useState } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { useToast } from "@/hooks/use-toast";

export default function ExportProjectButton() {
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);

    try {
      const zip = new JSZip();

      const fetchFile = async (path: string) => {
        const response = await fetch(path);
        if (!response.ok) throw new Error(`Failed to fetch ${path}`);
        return response.text();
      };

      const allFiles = [
        // Core App Files
        '/src/App.tsx',
        '/src/main.tsx',
        '/src/index.css',
        '/index.html',

        // Components
        '/src/components/ActiveBetsCard.tsx',
        '/src/components/BankrollCard.tsx',
        '/src/components/BetControlsCard.tsx',
        '/src/components/BettingBoardCard.tsx',
        '/src/components/LastResultsCard.tsx',
        '/src/components/Layout.tsx',
        '/src/components/NewSessionControlsCard.tsx',
        '/src/components/NewSessionSetupCard.tsx',
        '/src/components/SessionControlsCard.tsx',
        '/src/components/SessionSetupCard.tsx',
        '/src/components/SessionSpinHistoryCard.tsx',
        '/src/components/SessionStats.tsx',
        '/src/components/StrategyInjectionCard.tsx',

        // Store & Hooks
        '/src/store/useRouletteStore.ts',
        '/src/hooks/use-toast.ts',
        '/src/hooks/useSessionStore.ts',
        '/src/hooks/useSimulator.ts',

        // Core Logic
        '/src/core/betMap.ts',
        '/src/core/payoutRules.ts',
        '/src/core/spinLogic.ts',

        // Types & Utils
        '/src/lib/types.ts',
        '/src/lib/utils.ts',
        '/src/utils/getAttributesForNumber.ts'
      ];

      for (const file of allFiles) {
        try {
          const content = await fetchFile(file);
          zip.file(file.replace('/src/', ''), content);
        } catch (error) {
          console.warn(`Skipping ${file}:`, error);
        }
      }

      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, `roulette-project-${timestamp}.zip`);

      toast({
        title: "Export successful",
        description: "Project files have been downloaded as a zip file.",
      });
    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: "Export failed",
        description: "Failed to export files. See console for details.",
        variant: "destructive"
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <span 
      onClick={handleExport}
      className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer"
    >
      {isExporting ? 'Exporting...' : 'Export Project'}
    </span>
  );
}