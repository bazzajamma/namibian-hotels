'use client';

import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { useState } from 'react';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-sand-100/80 dark:bg-sand-900/80 backdrop-blur-md border-b border-sand-300 dark:border-sand-700">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-terracotta-600 focus:text-white focus:rounded-lg">
        Skip to main content
      </a>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-terracotta-600 dark:text-terracotta-400">
            Namibian Hotels
          </Link>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/hotels"
              className="text-sand-800 dark:text-sand-200 hover:text-terracotta-600 dark:hover:text-terracotta-400 transition-colors"
            >
              Hotels
            </Link>
            <Link
              href="/offers"
              className="text-sand-800 dark:text-sand-200 hover:text-terracotta-600 dark:hover:text-terracotta-400 transition-colors"
            >
              Offers
            </Link>
            <Link
              href="/about"
              className="text-sand-800 dark:text-sand-200 hover:text-terracotta-600 dark:hover:text-terracotta-400 transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/investors"
              className="text-sand-800 dark:text-sand-200 hover:text-terracotta-600 dark:hover:text-terracotta-400 transition-colors"
            >
              Investors
            </Link>
            <ThemeToggle />
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-sand-800 dark:text-sand-200 hover:bg-sand-200 dark:hover:bg-sand-800"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-sand-300 dark:border-sand-700">
            <div className="flex flex-col gap-4">
              <Link
                href="/hotels"
                className="text-sand-800 dark:text-sand-200 hover:text-terracotta-600 dark:hover:text-terracotta-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Hotels
              </Link>
              <Link
                href="/offers"
                className="text-sand-800 dark:text-sand-200 hover:text-terracotta-600 dark:hover:text-terracotta-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Offers
              </Link>
              <Link
                href="/about"
                className="text-sand-800 dark:text-sand-200 hover:text-terracotta-600 dark:hover:text-terracotta-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                href="/investors"
                className="text-sand-800 dark:text-sand-200 hover:text-terracotta-600 dark:hover:text-terracotta-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Investors
              </Link>
              <div className="pt-2">
                <ThemeToggle />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

