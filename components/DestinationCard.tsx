import Image from 'next/image';
import Link from 'next/link';
import { Destination } from '@/types';

interface DestinationCardProps {
  destination: Destination;
}

export function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <Link href={`/destinations/${destination.id}`}>
      <div className="group relative overflow-hidden rounded-lg bg-sand-100 dark:bg-sand-900 hover:shadow-xl transition-all duration-300 cursor-pointer">
        <div className="relative h-64">
          <Image
            src={destination.images[0] || '/placeholder-destination.jpg'}
            alt={destination.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-sand-900/80 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h3 className="text-2xl font-bold mb-2">{destination.name}</h3>
            <p className="text-sm text-sand-200 mb-2">{destination.location}</p>
            <p className="text-sm line-clamp-2">{destination.description}</p>
            {destination.packages.length > 0 && (
              <p className="text-terracotta-300 mt-2 font-semibold">
                {destination.packages.length} {destination.packages.length === 1 ? 'package' : 'packages'} available
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

