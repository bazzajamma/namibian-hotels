'use client';

import React from 'react';
import Link from 'next/link';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    // Here you could log to an error reporting service
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-sand-50 dark:bg-sand-900 px-4">
          <div className="text-center max-w-md">
            <h1 className="text-4xl font-bold text-sand-900 dark:text-sand-100 mb-4">
              Something went wrong
            </h1>
            <p className="text-sand-700 dark:text-sand-300 mb-6">
              We apologize for the inconvenience. Please try refreshing the page or return to the homepage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-lg font-semibold transition-colors"
              >
                Refresh Page
              </button>
              <Link
                href="/"
                className="px-6 py-3 bg-sand-200 dark:bg-sand-800 text-sand-800 dark:text-sand-200 rounded-lg font-semibold transition-colors"
              >
                Go Home
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

