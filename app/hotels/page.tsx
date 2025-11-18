import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { getHotels } from '@/lib/data';

export default async function HotelsPage() {
  const hotels = await getHotels();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 bg-sand-50 dark:bg-sand-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-sand-900 dark:text-sand-100 mb-4">
              Our Hotels
            </h1>
            <p className="text-lg text-sand-700 dark:text-sand-300 max-w-2xl mx-auto">
              Discover our collection of luxury hotels across Namibia, each offering unique experiences
              in breathtaking desert locations.
            </p>
          </div>

          {hotels.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {hotels.map((hotel) => (
                <Link key={hotel.id} href={`/hotels/${hotel.id}`}>
                  <div className="group relative overflow-hidden rounded-lg bg-sand-100 dark:bg-sand-800 hover:shadow-xl transition-all duration-300 cursor-pointer">
                    <div className="relative h-64">
                      <Image
                        src={hotel.images[0] || '/placeholder-hotel.jpg'}
                        alt={hotel.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-sand-900/80 to-transparent" />
                      {hotel.rating && (
                        <div className="absolute top-4 right-4 bg-terracotta-500 text-white px-3 py-1 rounded-full font-semibold">
                          ★ {hotel.rating}
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-sand-900 dark:text-sand-100 mb-2 group-hover:text-terracotta-600 dark:group-hover:text-terracotta-400 transition-colors">
                        {hotel.name}
                      </h3>
                      <p className="text-terracotta-600 dark:text-terracotta-400 font-semibold mb-3">
                        {hotel.location}
                      </p>
                      <p className="text-sand-700 dark:text-sand-300 mb-4 line-clamp-2">
                        {hotel.description}
                      </p>
                      {hotel.amenities && hotel.amenities.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {hotel.amenities.slice(0, 3).map((amenity, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-terracotta-100 dark:bg-terracotta-900 text-terracotta-800 dark:text-terracotta-200 rounded-full text-sm"
                            >
                              {amenity}
                            </span>
                          ))}
                        </div>
                      )}
                      <span className="text-terracotta-600 dark:text-terracotta-400 font-semibold group-hover:translate-x-1 transition-transform inline-block">
                        Learn more →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-sand-600 dark:text-sand-400">
              No hotels available at the moment.
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

