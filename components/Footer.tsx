import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-sand-800 dark:bg-sand-900 text-sand-200 dark:text-sand-300 border-t border-sand-700 dark:border-sand-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-terracotta-400 mb-4">Namibian Hotels</h3>
            <p className="text-sm">
              Experience luxury hospitality in the heart of Namibia&apos;s stunning desert landscapes.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/hotels" className="hover:text-terracotta-400 transition-colors">
                  Our Hotels
                </Link>
              </li>
              <li>
                <Link href="/offers" className="hover:text-terracotta-400 transition-colors">
                  Offers & Promotions
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-terracotta-400 transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/investors" className="hover:text-terracotta-400 transition-colors">
                  Investor Relations
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-terracotta-400 transition-colors">
                  ESG Initiatives
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <p className="text-sm">
              Namibia<br />
              Email: info@namibianhotels.com<br />
              Phone: +264 XX XXX XXXX
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-sand-700 dark:border-sand-800 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Namibian Hotels. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

