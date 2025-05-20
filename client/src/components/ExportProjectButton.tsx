
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

        // Components
        '/src/components/ActiveBetsCard.tsx',
        '/src/components/BankrollCard.tsx',
        '/src/components/BetControlsCard.tsx',
        '/src/components/BettingBoardCard.tsx',
        '/src/components/LastResultsCard.tsx',
        '/src/components/Layout.tsx',
        '/src/components/NewSessionControlsCard.tsx',
        '/src/components/NewSessionSetupCard.tsx',
        '/src/components/RouletteTable.tsx',
        '/src/components/SessionControlsCard.tsx',
        '/src/components/SessionSetupCard.tsx',
        '/src/components/SessionSpinHistoryCard.tsx',
        '/src/components/SessionStats.tsx',
        '/src/components/SpinHistory.tsx',
        '/src/components/StrategyInjectionCard.tsx',

        // Core Logic
        '/src/core/betMap.ts',
        '/src/core/payoutRules.ts',
        '/src/core/spinLogic.ts',

        // Hooks
        '/src/hooks/use-mobile.tsx',
        '/src/hooks/use-toast.ts',
        '/src/hooks/useRoulette.tsx',
        '/src/hooks/useSessionStore.ts',
        '/src/hooks/useSimulator.ts',

        // Lib & Utils
        '/src/lib/queryClient.ts',
        '/src/lib/roulette.ts',
        '/src/lib/types.ts',
        '/src/lib/utils.ts',
        '/src/utils/getAttributesForNumber.ts',

        // Store
        '/src/store/useRouletteStore.ts',

        // Server
        '/server/index.ts',
        '/server/routes.ts',
        '/server/storage.ts',
        '/server/vite.ts',

        // Config Files
        '/tsconfig.json',
        '/tailwind.config.ts',
        '/postcss.config.js'
      ];

      // Create src directory structure
      const srcFolder = zip.folder('src');
      const componentsFolder = srcFolder?.folder('components');
      const coreFolder = srcFolder?.folder('core');
      const hooksFolder = srcFolder?.folder('hooks');
      const libFolder = srcFolder?.folder('lib');
      const utilsFolder = srcFolder?.folder('utils');
      const storeFolder = srcFolder?.folder('store');
      const serverFolder = zip.folder('server');

      // Fetch and add all files
      for (const filePath of allFiles) {
        try {
          const content = await fetchFile(filePath);
          const fileName = filePath.split('/').pop();

          if (filePath.includes('/components/')) {
            componentsFolder?.file(fileName || '', content);
          } else if (filePath.includes('/core/')) {
            coreFolder?.file(fileName || '', content);
          } else if (filePath.includes('/hooks/')) {
            hooksFolder?.file(fileName || '', content);
          } else if (filePath.includes('/lib/')) {
            libFolder?.file(fileName || '', content);
          } else if (filePath.includes('/utils/')) {
            utilsFolder?.file(fileName || '', content);
          } else if (filePath.includes('/store/')) {
            storeFolder?.file(fileName || '', content);
          } else if (filePath.includes('/server/')) {
            serverFolder?.file(fileName || '', content);
          } else if (filePath.startsWith('/src/')) {
            srcFolder?.file(fileName || '', content);
          } else {
            zip.file(fileName || '', content);
          }
        } catch (error) {
          console.warn(`Skipping ${filePath}:`, error);
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
