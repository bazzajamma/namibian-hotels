'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Hotel } from '@/types';

interface HotelSliderProps {
  hotels: Hotel[];
}

export function HotelSlider({ hotels }: HotelSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % hotels.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + hotels.length) % hotels.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (hotels.length === 0) {
    return (
      <div className="text-center py-12 text-sand-600 dark:text-sand-400">
        No hotels available at the moment.
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <div className="overflow-hidden rounded-lg">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {hotels.map((hotel) => (
            <div key={hotel.id} className="min-w-full">
              <Link href={`/hotels/${hotel.slug}`}>
                <div className="relative h-[500px] md:h-[600px] group cursor-pointer">
                  <Image
                    src={hotel.images[0] || '/placeholder-hotel.jpg'}
                    alt={hotel.name}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-sand-900/80 via-sand-900/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <h3 className="text-3xl text-terracotta-400 md:text-4xl font-bold mb-2">{hotel.name}</h3>
                    <p className="text-lg mb-4 text-sand-50 line-clamp-2">{hotel.excerpt}</p>
                    <p className="text-terracotta-300 font-semibold">{hotel.location}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      {hotels.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-sand-50/50 hover:bg-sand-50/70 text-white p-3 rounded-full transition-colors z-10"
            aria-label="Previous hotel"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-sand-50/50 hover:bg-sand-50/70 text-white p-3 rounded-full transition-colors z-10"
            aria-label="Next hotel"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {hotels.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {hotels.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'w-8 bg-terracotta-500'
                  : 'w-2 bg-sand-400 dark:bg-sand-600'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

