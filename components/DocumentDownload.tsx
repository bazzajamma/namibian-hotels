'use client';

import { InvestorDocument } from '@/types';
import { createClient } from '@/lib/supabase/client';
import { useState } from 'react';
import { formatDate } from '@/lib/utils/date';

interface DocumentDownloadProps {
  document: InvestorDocument;
}

export function DocumentDownload({ document }: DocumentDownloadProps) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    try {
      setDownloading(true);
      const supabase = createClient();

      // If the fileUrl is already a public URL, use it directly
      if (document.fileUrl.startsWith('http')) {
        window.open(document.fileUrl, '_blank');
        setDownloading(false);
        return;
      }

      // Otherwise, get a signed URL from Supabase Storage
      const { data, error } = await supabase.storage
        .from('investor-documents')
        .createSignedUrl(document.fileUrl, 3600);

      if (error) {
        console.error('Error creating signed URL:', error);
        // TODO: Replace with toast notification
        alert('Failed to download document. Please try again later.');
        setDownloading(false);
        return;
      }

      if (data?.signedUrl) {
        window.open(data.signedUrl, '_blank');
      }
    } catch (error) {
      console.error('Download error:', error);
      // TODO: Replace with toast notification
      alert('Failed to download document. Please try again later.');
    } finally {
      setDownloading(false);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Circulars':
        return 'bg-terracotta-100 dark:bg-terracotta-900 text-terracotta-800 dark:text-terracotta-200';
      case 'Financials':
        return 'bg-sunset-100 dark:bg-sunset-900 text-sunset-800 dark:text-sunset-200';
      case 'Reports':
        return 'bg-sky-100 dark:bg-sky-900 text-sky-800 dark:text-sky-200';
      default:
        return 'bg-sand-200 dark:bg-sand-800 text-sand-800 dark:text-sand-200';
    }
  };

  return (
    <div className="border border-sand-300 dark:border-sand-700 rounded-lg p-6 bg-sand-50 dark:bg-sand-900 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-sand-900 dark:text-sand-100 mb-2">
            {document.title}
          </h3>
          <div className="flex items-center gap-3 mb-2">
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getCategoryColor(document.category)}`}>
              {document.category}
            </span>
            <span className="text-sm text-sand-600 dark:text-sand-400">
              {formatDate(document.date)}
            </span>
            {document.size && (
              <span className="text-sm text-sand-600 dark:text-sand-400">
                {document.size}
              </span>
            )}
          </div>
        </div>
      </div>
      <button
        onClick={handleDownload}
        disabled={downloading}
        className="w-full md:w-auto px-6 py-2 bg-terracotta-600 hover:bg-terracotta-700 dark:bg-terracotta-500 dark:hover:bg-terracotta-600 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {downloading ? (
          <>
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Downloading...
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Document
          </>
        )}
      </button>
    </div>
  );
}

