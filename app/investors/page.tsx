'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { DocumentDownload } from '@/components/DocumentDownload';
import { InvestorDocument } from '@/types';
import { getInvestorDocumentsClient } from '@/lib/data-client';

export default function InvestorsPage() {
  const [documents, setDocuments] = useState<InvestorDocument[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState<InvestorDocument[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDocuments() {
      try {
        const data = await getInvestorDocumentsClient();
        setDocuments(data);
        setFilteredDocuments(data);
      } catch (error) {
        console.error('Error fetching documents:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchDocuments();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredDocuments(documents);
    } else {
      setFilteredDocuments(documents.filter(doc => doc.category === selectedCategory));
    }
  }, [selectedCategory, documents]);

  const categories: InvestorDocument['category'][] = ['Circulars', 'Financials', 'Reports', 'Other'];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 bg-sand-50 dark:bg-sand-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-sand-900 dark:text-sand-100 mb-4">
              Investor Relations
            </h1>
            <p className="text-lg text-sand-700 dark:text-sand-300 max-w-2xl mx-auto">
              Access our latest financial reports, circulars, and investor documents.
            </p>
          </div>

          {/* Filter Section */}
          <div className="mb-8 flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-terracotta-600 text-white'
                  : 'bg-sand-200 dark:bg-sand-800 text-sand-800 dark:text-sand-200 hover:bg-sand-300 dark:hover:bg-sand-700'
              }`}
            >
              All Documents
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                  selectedCategory === category
                    ? 'bg-terracotta-600 text-white'
                    : 'bg-sand-200 dark:bg-sand-800 text-sand-800 dark:text-sand-200 hover:bg-sand-300 dark:hover:bg-sand-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Documents List */}
          {loading ? (
            <div className="text-center py-12 text-sand-600 dark:text-sand-400">
              Loading documents...
            </div>
          ) : filteredDocuments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredDocuments.map((document) => (
                <DocumentDownload key={document.id} document={document} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-sand-600 dark:text-sand-400">
              No documents available for the selected category.
            </div>
          )}

          {/* Additional Information */}
          <div className="mt-16 bg-white dark:bg-sand-800 rounded-lg p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-sand-900 dark:text-sand-100 mb-4">
              Investor Information
            </h2>
            <p className="text-sand-700 dark:text-sand-300 mb-4">
              For additional investor relations inquiries, please contact:
            </p>
            <div className="space-y-2 text-sand-700 dark:text-sand-300">
              <p>
                <span className="font-semibold">Email:</span> investors@namibianhotels.com
              </p>
              <p>
                <span className="font-semibold">Phone:</span> +264 XX XXX XXXX
              </p>
              <p>
                <span className="font-semibold">Address:</span> Investor Relations Department, Namibian Hotels, Namibia
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

