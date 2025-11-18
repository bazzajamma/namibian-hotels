import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-12 bg-sand-50 dark:bg-sand-900">
        <div className="text-center px-4">
          <h1 className="text-6xl md:text-8xl font-bold text-terracotta-600 dark:text-terracotta-400 mb-4">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-sand-900 dark:text-sand-100 mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-sand-700 dark:text-sand-300 mb-8 max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-4 bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-lg font-semibold text-lg transition-colors"
          >
            Return Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

