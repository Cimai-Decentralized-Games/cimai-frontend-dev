'use client';

import React from 'react';
import Image from 'next/image';
import AppWalletProvider from '@/components/solana/AppWalletProvider';
import Navbar from "@/components/Navbar";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

interface NavItem {
  label: string;
  href: string;
}

interface AppWalletProviderWithNavbarProps {
  children: React.ReactNode;
  navItems: NavItem[];
}

const AppWalletProviderWithNavbar: React.FC<AppWalletProviderWithNavbarProps> = ({ 
  children,
  navItems 
}) => {
  return (
    <AppWalletProvider>
      <div className="flex flex-col min-h-screen">
        {/* Global Navbar - Fixed positioning with z-index */}
        <div className="sticky top-0 z-50">
          <Navbar 
            logo={<Image className="h-8 w-auto" alt="Logo" src="/Cimai.png" width={32} height={32} />}
            navItems={navItems}
            rightContent={
              <div className="wallet-adapter-dropdown">
                <WalletMultiButton className="wallet-adapter-button" />
              </div>
            }
            className="bg-base-100 bg-opacity-90 backdrop-blur-md shadow-md"
          />
        </div>
        
        {/* Main content with padding for fixed navbar */}
        <main className="flex-grow pt-2">
          {children}
        </main>
      </div>
    </AppWalletProvider>
  );
};

export default AppWalletProviderWithNavbar; 