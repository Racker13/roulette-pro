import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
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
      
      // Function to fetch file content
      const fetchFile = async (path: string) => {
        const response = await fetch(path);
        if (!response.ok) throw new Error(`Failed to fetch ${path}`);
        return response.text();
      };
      
      // Add key project files
      // React files
      const reactFiles = [
        '/src/App.tsx',
        '/src/main.tsx',
        '/src/index.css',
        '/index.html',
      ];
      
      // Component files
      const componentFiles = [
        '/src/components/ActiveBets.tsx',
        '/src/components/BankrollCard.tsx',
        '/src/components/ChipSelector.tsx',
        '/src/components/Layout.tsx',
        '/src/components/RouletteTable.tsx',
        '/src/components/SessionStats.tsx',
        '/src/components/SpinHistory.tsx',
      ];
      
      // Lib files
      const libFiles = [
        '/src/lib/types.ts',
        '/src/lib/roulette.ts',
        '/src/lib/utils.ts',
        '/src/lib/queryClient.ts',
      ];
      
      // Hook files
      const hookFiles = [
        '/src/hooks/useRoulette.tsx',
        '/src/hooks/use-toast.ts',
        '/src/hooks/use-mobile.tsx',
      ];
      
      // Page files
      const pageFiles = [
        '/src/pages/Home.tsx',
        '/src/pages/not-found.tsx',
      ];
      
      // Configuration files
      const configFiles = [
        '/package.json',
        '/tsconfig.json',
        '/postcss.config.js',
        '/tailwind.config.ts',
        '/vite.config.ts',
      ];

      // Create directories in the zip
      const srcFolder = zip.folder('src');
      const componentsFolder = srcFolder?.folder('components');
      const libFolder = srcFolder?.folder('lib');
      const hooksFolder = srcFolder?.folder('hooks');
      const pagesFolder = srcFolder?.folder('pages');
      
      // Fetch and add React files
      for (const filePath of reactFiles) {
        try {
          const content = await fetchFile(filePath);
          if (filePath === '/index.html') {
            zip.file('index.html', content);
          } else {
            const fileName = filePath.split('/').pop();
            srcFolder?.file(fileName || '', content);
          }
        } catch (error) {
          console.error(`Error fetching ${filePath}:`, error);
        }
      }
      
      // Fetch and add component files
      for (const filePath of componentFiles) {
        try {
          const content = await fetchFile(filePath);
          const fileName = filePath.split('/').pop();
          componentsFolder?.file(fileName || '', content);
        } catch (error) {
          console.error(`Error fetching ${filePath}:`, error);
        }
      }
      
      // Fetch and add lib files
      for (const filePath of libFiles) {
        try {
          const content = await fetchFile(filePath);
          const fileName = filePath.split('/').pop();
          libFolder?.file(fileName || '', content);
        } catch (error) {
          console.error(`Error fetching ${filePath}:`, error);
        }
      }
      
      // Fetch and add hook files
      for (const filePath of hookFiles) {
        try {
          const content = await fetchFile(filePath);
          const fileName = filePath.split('/').pop();
          hooksFolder?.file(fileName || '', content);
        } catch (error) {
          console.error(`Error fetching ${filePath}:`, error);
        }
      }
      
      // Fetch and add page files
      for (const filePath of pageFiles) {
        try {
          const content = await fetchFile(filePath);
          const fileName = filePath.split('/').pop();
          pagesFolder?.file(fileName || '', content);
        } catch (error) {
          console.error(`Error fetching ${filePath}:`, error);
        }
      }
      
      // Fetch and add config files
      for (const filePath of configFiles) {
        try {
          const content = await fetchFile(filePath);
          const fileName = filePath.split('/').pop();
          zip.file(fileName || '', content);
        } catch (error) {
          console.error(`Error fetching ${filePath}:`, error);
        }
      }
      
      // Generate the zip file
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      
      // Save the zip file
      saveAs(zipBlob, 'roulette-simulator-project.zip');
      
      toast({
        title: "Export successful",
        description: "Project files have been downloaded as a zip file.",
      });
    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: "Export failed",
        description: "Failed to export project files. See console for details.",
        variant: "destructive"
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
      onClick={handleExport}
      disabled={isExporting}
      className="bg-purple-600 hover:bg-purple-700 text-white flex items-center space-x-2"
    >
      <Download className="h-4 w-4" />
      <span>{isExporting ? 'Exporting...' : 'Export Project'}</span>
    </Button>
  );
}