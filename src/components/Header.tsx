// components/Header.tsx
import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-sm bg-opacity-80 bg-black border-b border-opacity-30 border-cyan-500">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gradient-to-br from-pink-600 to-blue-600 rounded-full flex items-center justify-center mr-3">
            <span className="orbitron text-2xl font-bold">C</span>
          </div>
          <h1 className="orbitron text-3xl font-bold glitch-effect neon-text-blue">CIMAI</h1>
        </div>
        
        <nav className="hidden md:flex space-x-6">
          <Link href="#" className="hover:neon-text-pink transition-all duration-300">HOME</Link>
          <Link href="#" className="hover:neon-text-pink transition-all duration-300">PROJECTS</Link>
          <Link href="#" className="hover:neon-text-pink transition-all duration-300">STORIES</Link>
          <Link href="#" className="hover:neon-text-pink transition-all duration-300">DAC</Link>
        </nav>
        
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-700 rounded neon-border orbitron">
            LOGIN
          </button>
          <button className="block md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;