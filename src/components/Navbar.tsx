'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

interface NavbarProps {
  logo?: React.ReactNode;
  navItems?: NavItem[];
  rightContent?: React.ReactNode;
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({
  logo = <span className="text-xl font-bold text-primary">Cimai</span>,
  navItems = [],
  rightContent,
  className,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className={twMerge(
      "bg-base-300 border-b border-primary/30 py-3 px-4 md:px-6 sticky top-0 z-50",
      className
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/">
            {logo}
          </Link>
        </div>

        {/* Desktop navigation */}
        <div className="hidden md:flex md:items-center md:space-x-6">
          {navItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              className={twMerge(
                "flex items-center px-3 py-2 text-sm font-medium transition-colors",
                pathname === item.href 
                  ? "text-secondary border-b-2 border-secondary" 
                  : "text-base-content hover:text-primary"
              )}
            >
              {item.icon && <span className="mr-2">{item.icon}</span>}
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right content (e.g., user menu, wallet connection) */}
        {rightContent && (
          <div className="hidden md:block">
            {rightContent}
          </div>
        )}

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            type="button"
            className="text-primary hover:text-secondary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-2 py-2 border-t border-primary/20">
          {navItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              className={twMerge(
                "flex items-center px-4 py-2 text-sm font-medium transition-colors",
                pathname === item.href 
                  ? "text-secondary bg-base-200" 
                  : "text-base-content hover:text-primary hover:bg-base-200"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.icon && <span className="mr-2">{item.icon}</span>}
              {item.label}
            </Link>
          ))}
          {rightContent && (
            <div className="mt-2 px-4 py-2 border-t border-primary/20">
              {rightContent}
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;