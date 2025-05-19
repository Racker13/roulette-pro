import React, { useState } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { useToast } from "@/hooks/use-toast";

export default function CR6ZipExporter() {
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
      
      // Files to include in the zip
      const files = [
        '/src/components/SessionSetupCard.tsx',
        '/src/components/SessionControlsCard.tsx',
        '/src/hooks/useSessionStore.ts',
        '/src/App.tsx',
      ];
      
      // Fetch and add files to the zip
      for (const filePath of files) {
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
      saveAs(zipBlob, 'cr6-components.zip');
      
      toast({
        title: "CR6 files exported successfully",
        description: "Your requested files have been downloaded as a zip file.",
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
      className="cursor-pointer text-blue-600 hover:text-blue-800 hover:underline"
    >
      {isExporting ? 'Preparing CR6 files...' : 'Download CR6 Files'}
    </span>
  );
}