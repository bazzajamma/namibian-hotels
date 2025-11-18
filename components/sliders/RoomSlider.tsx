'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Room } from '@/types';

interface RoomSliderProps {
  rooms: Room[];
}

export function RoomSlider({ rooms }: RoomSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % rooms.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + rooms.length) % rooms.length);
  };

  if (rooms.length === 0) {
    return (
      <div className="text-center py-12 text-sand-600 dark:text-sand-400">
        No rooms available at the moment.
      </div>
    );
  }

  const currentRoom = rooms[currentIndex];

  return (
    <div className="relative w-full">
      <div className="overflow-hidden rounded-lg bg-sand-100 dark:bg-sand-900">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {rooms.map((room) => (
            <div key={room.id} className="min-w-full">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-[300px] md:h-[400px]">
                  <Image
                    src={room.images[0] || '/placeholder-room.jpg'}
                    alt={room.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 md:p-8 flex flex-col justify-center">
                  <h3 className="text-2xl md:text-3xl font-bold text-sand-900 dark:text-sand-100 mb-2">
                    {room.name}
                  </h3>
                  <p className="text-sand-700 dark:text-sand-300 mb-4">{room.description}</p>
                  <div className="mb-4">
                    <p className="text-sm text-sand-600 dark:text-sand-400 mb-2">Amenities:</p>
                    <div className="flex flex-wrap gap-2">
                      {room.amenities.slice(0, 4).map((amenity, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-terracotta-100 dark:bg-terracotta-900 text-terracotta-800 dark:text-terracotta-200 rounded-full text-sm"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-auto">
                    <p className="text-2xl font-bold text-terracotta-600 dark:text-terracotta-400">
                      {room.pricing.currency} {room.pricing.base}
                      {room.pricing.perNight && <span className="text-lg">/night</span>}
                    </p>
                    <p className="text-sm text-sand-600 dark:text-sand-400">
                      Capacity: {room.capacity} {room.capacity === 1 ? 'guest' : 'guests'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      {rooms.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-sand-900/50 hover:bg-sand-900/70 text-white p-3 rounded-full transition-colors z-10"
            aria-label="Previous room"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-sand-900/50 hover:bg-sand-900/70 text-white p-3 rounded-full transition-colors z-10"
            aria-label="Next room"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {rooms.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {rooms.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'w-8 bg-terracotta-500'
                  : 'w-2 bg-sand-400 dark:bg-sand-600'
              }`}
              aria-label={`Go to room ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

