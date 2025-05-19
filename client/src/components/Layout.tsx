import React from "react";
import { Link } from "wouter";
import { Dice5 } from "lucide-react";
import ExportProjectButton from "@/components/ExportProjectButton";
import CR6ZipExporter from "@/components/cr6-zip-exporter";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Dice5 className="h-6 w-6 text-green-600" />
            <h1 className="text-xl font-bold text-gray-900">Roulette Simulator</h1>
          </div>
          <nav className="flex space-x-4">
            <Link href="/">
              <a className="px-3 py-2 rounded-md text-sm font-medium text-white bg-green-600">Free Play</a>
            </Link>
            <span className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700 cursor-pointer">
              Strategy Tester
            </span>
            <span className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700 cursor-pointer">
              Settings
            </span>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">Roulette Simulator © {new Date().getFullYear()} - Free Play Mode</p>
            <div className="flex items-center space-x-4">
              <ExportProjectButton />
              <CR6ZipExporter />
              <span className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer">Help</span>
              <span className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer">About</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
