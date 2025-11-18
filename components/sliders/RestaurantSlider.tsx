'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Restaurant } from '@/types';

interface RestaurantSliderProps {
  restaurants: Restaurant[];
}

export function RestaurantSlider({ restaurants }: RestaurantSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % restaurants.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + restaurants.length) % restaurants.length);
  };

  if (restaurants.length === 0) {
    return (
      <div className="text-center py-12 text-sand-600 dark:text-sand-400">
        No restaurants available at the moment.
      </div>
    );
  }

  const currentRestaurant = restaurants[currentIndex];

  return (
    <div className="relative w-full">
      <div className="overflow-hidden rounded-lg bg-sand-100 dark:bg-sand-900">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {restaurants.map((restaurant) => (
            <div key={restaurant.id} className="min-w-full">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-[300px] md:h-[400px]">
                  <Image
                    src={restaurant.images[0] || '/placeholder-restaurant.jpg'}
                    alt={restaurant.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 md:p-8 flex flex-col justify-center">
                  <h3 className="text-2xl md:text-3xl font-bold text-sand-900 dark:text-sand-100 mb-2">
                    {restaurant.name}
                  </h3>
                  <p className="text-terracotta-600 dark:text-terracotta-400 font-semibold mb-2">
                    {restaurant.cuisine}
                  </p>
                  <p className="text-sand-700 dark:text-sand-300 mb-4">{restaurant.description}</p>
                  <div className="mt-auto">
                    <p className="text-sm text-sand-600 dark:text-sand-400 mb-1">
                      <span className="font-semibold">Hours:</span> {restaurant.hours.open} - {restaurant.hours.close}
                    </p>
                    <p className="text-sm text-sand-600 dark:text-sand-400">
                      {restaurant.hours.days.join(', ')}
                    </p>
                    {restaurant.rating && (
                      <div className="mt-2 flex items-center gap-1">
                        <span className="text-sunset-500">★</span>
                        <span className="text-sand-700 dark:text-sand-300">{restaurant.rating}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      {restaurants.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-sand-900/50 hover:bg-sand-900/70 text-white p-3 rounded-full transition-colors z-10"
            aria-label="Previous restaurant"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-sand-900/50 hover:bg-sand-900/70 text-white p-3 rounded-full transition-colors z-10"
            aria-label="Next restaurant"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {restaurants.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {restaurants.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'w-8 bg-terracotta-500'
                  : 'w-2 bg-sand-400 dark:bg-sand-600'
              }`}
              aria-label={`Go to restaurant ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

