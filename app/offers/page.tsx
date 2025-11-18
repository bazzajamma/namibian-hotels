'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { OfferCard } from '@/components/OfferCard';
import { Offer } from '@/types';
import { getOffers } from '@/lib/data';

export default function OffersPage() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [filteredOffers, setFilteredOffers] = useState<Offer[]>([]);
  const [selectedHotel, setSelectedHotel] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOffers() {
      try {
        const data = await getOffers();
        setOffers(data);
        setFilteredOffers(data);
      } catch (error) {
        console.error('Error fetching offers:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchOffers();
  }, []);

  useEffect(() => {
    if (selectedHotel === 'all') {
      setFilteredOffers(offers);
    } else {
      setFilteredOffers(offers.filter(offer => offer.hotels.includes(selectedHotel)));
    }
  }, [selectedHotel, offers]);

  // Get unique hotel IDs from all offers
  const hotelIds = Array.from(new Set(offers.flatMap(offer => offer.hotels)));

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 bg-sand-50 dark:bg-sand-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-sand-900 dark:text-sand-100 mb-4">
              Offers & Promotions
            </h1>
            <p className="text-lg text-sand-700 dark:text-sand-300 max-w-2xl mx-auto">
              Take advantage of our special offers and create unforgettable memories in Namibia.
            </p>
          </div>

          {/* Filter Section */}
          {hotelIds.length > 0 && (
            <div className="mb-8 flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => setSelectedHotel('all')}
                className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                  selectedHotel === 'all'
                    ? 'bg-terracotta-600 text-white'
                    : 'bg-sand-200 dark:bg-sand-800 text-sand-800 dark:text-sand-200 hover:bg-sand-300 dark:hover:bg-sand-700'
                }`}
              >
                All Offers
              </button>
              {hotelIds.map((hotelId) => (
                <button
                  key={hotelId}
                  onClick={() => setSelectedHotel(hotelId)}
                  className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                    selectedHotel === hotelId
                      ? 'bg-terracotta-600 text-white'
                      : 'bg-sand-200 dark:bg-sand-800 text-sand-800 dark:text-sand-200 hover:bg-sand-300 dark:hover:bg-sand-700'
                  }`}
                >
                  Hotel {hotelId}
                </button>
              ))}
            </div>
          )}

          {/* Offers Grid */}
          {loading ? (
            <div className="text-center py-12 text-sand-600 dark:text-sand-400">
              Loading offers...
            </div>
          ) : filteredOffers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOffers.map((offer) => (
                <OfferCard key={offer.id} offer={offer} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-sand-600 dark:text-sand-400">
              No offers available for the selected filter.
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

