import React, { useState } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function CR6Downloader() {
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);

    try {
      const zip = new JSZip();

      // Function to fetch file content
      const fetchFile = async (path: string) => {
        const response = await fetch(path);
        if (!response.ok) throw new Error(`Failed to fetch ${path}`);
        return response.text();
      };

      // Add all project files
      const allFiles = [
        '/src/App.tsx',
        '/src/main.tsx',
        '/src/index.css',
        '/index.html',
        '/src/components/BettingBoardCard.tsx',
        '/src/components/RouletteTable.tsx',
        '/src/components/ChipSelector.tsx',
        '/src/components/Layout.tsx',
        '/src/components/SessionStats.tsx',
        '/src/components/SpinHistory.tsx',
        '/src/lib/types.ts',
        '/src/lib/roulette.ts',
        '/src/lib/utils.ts',
        '/src/hooks/useRoulette.tsx',
        '/src/store/useRouletteStore.ts',
        '/src/utils/getAttributesForNumber.ts',
        '/package.json',
        '/tsconfig.json',
        '/tailwind.config.ts'
      ];

      // Create src directory structure
      const srcFolder = zip.folder('src');
      const componentsFolder = srcFolder?.folder('components');
      const libFolder = srcFolder?.folder('lib');
      const hooksFolder = srcFolder?.folder('hooks');
      const storeFolder = srcFolder?.folder('store');
      const utilsFolder = srcFolder?.folder('utils');

      // Fetch and add all files
      for (const filePath of allFiles) {
        try {
          const content = await fetchFile(filePath);
          const fileName = filePath.split('/').pop();

          if (filePath.includes('/components/')) {
            componentsFolder?.file(fileName || '', content);
          } else if (filePath.includes('/lib/')) {
            libFolder?.file(fileName || '', content);
          } else if (filePath.includes('/hooks/')) {
            hooksFolder?.file(fileName || '', content);
          } else if (filePath.includes('/store/')) {
            storeFolder?.file(fileName || '', content);
          } else if (filePath.includes('/utils/')) {
            utilsFolder?.file(fileName || '', content);
          } else if (filePath.startsWith('/src/')) {
            srcFolder?.file(fileName || '', content);
          } else {
            zip.file(fileName || '', content);
          }
        } catch (error) {
          console.error(`Error fetching ${filePath}:`, error);
        }
      }

      // Generate timestamp for filename
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

      // Generate the zip file
      const content = await zip.generateAsync({ type: "blob" });

      // Save with timestamp
      saveAs(content, `roulette-project-${timestamp}.zip`);

      toast({
        title: "Export successful",
        description: "Project files have been downloaded as a zip file.",
      });
    } catch (error) {
      console.error("Error downloading files:", error);
      toast({
        title: "Export failed",
        description: "Failed to download files. See console for details.",
        variant: "destructive"
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button 
      onClick={handleExport} 
      variant="outline" 
      size="sm" 
      className="flex items-center"
      disabled={isExporting}
    >
      <Download className="mr-2 h-4 w-4" />
      {isExporting ? 'Exporting...' : 'Download Project'}
    </Button>
  );
}