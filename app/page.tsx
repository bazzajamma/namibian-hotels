import Link from 'next/link';
import { HotelSlider } from '@/components/sliders/HotelSlider';
import { OfferCard } from '@/components/OfferCard';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { getHotels, getOffers } from '@/lib/data';

export default async function Home() {
  const hotels = await getHotels();
  const offers = await getOffers();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main id="main-content" className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-terracotta-600 via-sunset-500 to-terracotta-800 opacity-90" />
          <div className="absolute inset-0 bg-[url('/placeholder-hotel.jpg')] bg-cover bg-center opacity-20" />
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
              Welcome to Namibian Hotels
            </h1>
            <p className="text-xl md:text-2xl text-sand-100 mb-8 drop-shadow-md">
              Experience luxury hospitality in the heart of Namibia&apos;s stunning desert landscapes
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/hotels"
                className="px-8 py-4 bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-lg font-semibold text-lg transition-colors shadow-lg"
              >
                Explore Our Hotels
              </Link>
              <Link
                href="/offers"
                className="px-8 py-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-lg font-semibold text-lg transition-colors border-2 border-white/50"
              >
                View Offers
              </Link>
            </div>
          </div>
        </section>

        {/* Hotels Slider Section */}
        <section className="py-16 bg-sand-50 dark:bg-sand-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-sand-900 dark:text-sand-100 mb-4">
                Our Hotels
              </h2>
              <p className="text-lg text-sand-700 dark:text-sand-300 max-w-2xl mx-auto">
                Discover our collection of luxury hotels across Namibia, each offering unique experiences
                in breathtaking desert locations.
              </p>
            </div>
            <HotelSlider hotels={hotels} />
            <div className="text-center mt-8">
              <Link
                href="/hotels"
                className="inline-block px-8 py-3 bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-lg font-semibold transition-colors"
              >
                View All Hotels
              </Link>
            </div>
          </div>
        </section>

        {/* Offers & Promotions Section */}
        <section className="py-16 bg-white dark:bg-sand-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-sand-900 dark:text-sand-100 mb-4">
                Offers & Promotions
              </h2>
              <p className="text-lg text-sand-700 dark:text-sand-300 max-w-2xl mx-auto">
                Take advantage of our special offers and create unforgettable memories in Namibia.
              </p>
            </div>
            {offers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {offers.map((offer) => (
                  <OfferCard key={offer.id} offer={offer} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-sand-600 dark:text-sand-400">
                No offers available at the moment.
              </div>
            )}
            <div className="text-center mt-8">
              <Link
                href="/offers"
                className="inline-block px-8 py-3 bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-lg font-semibold transition-colors"
              >
                View All Offers
              </Link>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 bg-gradient-to-r from-terracotta-600 to-sunset-500">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Experience Namibia?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Book your stay today and immerse yourself in the beauty of the Namibian desert.
            </p>
            <Link
              href="/hotels"
              className="inline-block px-8 py-4 bg-white text-terracotta-600 rounded-lg font-semibold text-lg hover:bg-sand-100 transition-colors shadow-lg"
            >
              Book Now
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
