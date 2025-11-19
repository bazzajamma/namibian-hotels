import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { RoomSlider } from '@/components/sliders/RoomSlider';
import { RestaurantSlider } from '@/components/sliders/RestaurantSlider';
import { DestinationCard } from '@/components/DestinationCard';
import { getHotel, getRoomsByHotel, getRestaurantsByHotel, getDestinationsByHotel } from '@/lib/data';

interface HotelDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function HotelDetailPage({ params }: HotelDetailPageProps) {
  const { id } = await params;
  const hotel = await getHotel(id);
  const rooms = await getRoomsByHotel(id);
  const restaurants = await getRestaurantsByHotel(id);
  const destinations = await getDestinationsByHotel(id);

  if (!hotel) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hotel Header */}
        <section className="relative flex h-screen items-center">
          <Image
            src={hotel.images[0] || '/placeholder-hotel.jpg'}
            alt={hotel.name}
            fill
            className="object-cover"
            priority
          />
          <div className="relative z-10 text-white text-center px-4 max-w-4xl mx-auto bg-sand-50/10 backdrop-blur-xs p-8 rounded-lg">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{hotel.name}</h1>
            <p className="text-xl md:text-2xl mb-4">{hotel.location}</p>
            {hotel.rating && (
              <div className="flex items-center gap-2">
                <span className="text-2xl">★</span>
                <span className="text-xl font-semibold">{hotel.rating}</span>
              </div>
            )}
          </div>
        </section>

        {/* Hotel Description */}
        <section className="py-12 bg-white dark:bg-sand-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold text-sand-900 dark:text-sand-100 mb-6">About This Hotel</h2>
              <p className="text-lg text-sand-700 dark:text-sand-300 mb-6">{hotel.description}</p>
              {hotel.amenities && hotel.amenities.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-sand-900 dark:text-sand-100 mb-4">Amenities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {hotel.amenities.map((amenity, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-sand-700 dark:text-sand-300"
                      >
                        <svg className="w-5 h-5 text-terracotta-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {amenity}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Rooms Slider */}
        <section className="py-16 bg-sand-50 dark:bg-sand-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-sand-900 dark:text-sand-100 mb-4">
                Our Rooms
              </h2>
              <p className="text-lg text-sand-700 dark:text-sand-300 max-w-2xl mx-auto">
                Choose from our selection of luxurious accommodations designed for your comfort.
              </p>
            </div>
            <RoomSlider rooms={rooms} />
          </div>
        </section>

        {/* Restaurants Slider */}
        <section className="py-16 bg-white dark:bg-sand-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-sand-900 dark:text-sand-100 mb-4">
                Dining Options
              </h2>
              <p className="text-lg text-sand-700 dark:text-sand-300 max-w-2xl mx-auto">
                Savor exceptional cuisine at our restaurants and bars.
              </p>
            </div>
            <RestaurantSlider restaurants={restaurants} />
          </div>
        </section>

        {/* Destinations */}
        {destinations.length > 0 && (
          <section className="py-16 bg-sand-50 dark:bg-sand-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-sand-900 dark:text-sand-100 mb-4">
                  Nearby Destinations
                </h2>
                <p className="text-lg text-sand-700 dark:text-sand-300 max-w-2xl mx-auto">
                  Explore travel packages to nearby destinations and attractions.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {destinations.map((destination) => (
                  <DestinationCard key={destination.id} destination={destination} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-terracotta-600 to-sunset-500">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Book Your Stay?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Contact us to reserve your room at {hotel.name}.
            </p>
            <Link
              href="/hotels"
              className="inline-block px-8 py-4 bg-white text-terracotta-600 rounded-lg font-semibold text-lg hover:bg-sand-100 transition-colors shadow-lg"
            >
              Back to Hotels
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

