'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import AppWalletProvider from '@/components/solana/AppWalletProvider';
import Navbar from "@/components/Navbar";
import { Suspense } from 'react';

// Define global navigation items
const navItems = [
  { label: "Cimai Labs", href: "/cimai-portal" },
  { label: "Casino of Life", href: "https://col.games" },
  { label: "Real Story", href: "/real-story" },
  { label: "Read our Docs", href: "https://cimai.gitbook.io/cimai-docs/" },
];

// Create a wallet button component that only loads on client side
const LazyWalletButton = () => {
  const [Component, setComponent] = useState<React.ComponentType | null>(null);
  
  useEffect(() => {
    // Only import on client side
    import('@/components/solana/CustomWalletButton')
      .then(module => {
        setComponent(() => module.default);
      })
      .catch(err => console.error('Failed to load wallet button:', err));
  }, []);
  
  if (!Component) {
    return <div className="h-10 w-36 bg-primary rounded-lg animate-pulse"></div>;
  }
  
  return <Component />;
};

interface ClientWrapperProps {
  children: React.ReactNode;
}

const ClientWrapper: React.FC<ClientWrapperProps> = ({ children }) => {
  return (
    <AppWalletProvider>
      <div className="flex flex-col min-h-screen">
        {/* Global Navbar with proper z-index */}
        <div className="sticky top-0 z-50">
          <Navbar 
            logo={<Image className="h-8 w-auto" alt="Logo" src="/Cimai.png" width={32} height={32} />}
            navItems={navItems}
            rightContent={
              <Suspense fallback={<div className="h-10 w-36 bg-primary rounded-lg animate-pulse"></div>}>
                <LazyWalletButton />
              </Suspense>
            }
            className="bg-base-100 bg-opacity-90 backdrop-blur-md shadow-md"
          />
        </div>
        
        {/* Main content with proper spacing */}
        <main className="flex-grow pt-4">
          {children}
        </main>
      </div>
    </AppWalletProvider>
  );
};

export default ClientWrapper;