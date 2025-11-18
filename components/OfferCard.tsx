import Image from 'next/image';
import Link from 'next/link';
import { Offer } from '@/types';
import { formatDate } from '@/lib/utils/date';

interface OfferCardProps {
  offer: Offer;
}

export function OfferCard({ offer }: OfferCardProps) {

  return (
    <Link href={`/offers#${offer.id}`}>
      <div className="group relative overflow-hidden rounded-lg bg-sand-100 dark:bg-sand-900 hover:shadow-xl transition-all duration-300 cursor-pointer">
        <div className="relative h-48">
          <Image
            src={offer.images[0] || '/placeholder-offer.jpg'}
            alt={offer.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {offer.discount && (
            <div className="absolute top-4 right-4 bg-terracotta-500 text-white px-4 py-2 rounded-full font-bold">
              {offer.discount.type === 'percentage' ? `${offer.discount.value}% OFF` : `${offer.discount.value} OFF`}
            </div>
          )}
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-sand-900 dark:text-sand-100 mb-2 group-hover:text-terracotta-600 dark:group-hover:text-terracotta-400 transition-colors">
            {offer.title}
          </h3>
          <p className="text-sand-700 dark:text-sand-300 mb-4 line-clamp-2">{offer.description}</p>
          <div className="flex items-center justify-between">
            <p className="text-sm text-sand-600 dark:text-sand-400">
              Valid until: {formatDate(offer.validUntil)}
            </p>
            <span className="text-terracotta-600 dark:text-terracotta-400 font-semibold group-hover:translate-x-1 transition-transform">
              Learn more →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

