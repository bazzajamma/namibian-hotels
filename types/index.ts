export interface Hotel {
  id: string;
  name: string;
  slug: string;
  excerpt: string;
  description: string;
  images: string[];
  location: string;
  destinations: string[];
  amenities?: string[];
  rating?: number;
}

export interface Room {
  id: string;
  hotelId: string;
  name: string;
  description: string;
  images: string[];
  amenities: string[];
  pricing: {
    base: number;
    currency: string;
    perNight: boolean;
  };
  capacity: number;
  size?: string;
}

export interface Restaurant {
  id: string;
  hotelId: string;
  name: string;
  description: string;
  images: string[];
  cuisine: string;
  hours: {
    open: string;
    close: string;
    days: string[];
  };
  rating?: number;
}

export interface Destination {
  id: string;
  name: string;
  description: string;
  images: string[];
  packages: TravelPackage[];
  location: string;
}

export interface TravelPackage {
  id: string;
  destinationId: string;
  title: string;
  description: string;
  duration: string;
  price: {
    amount: number;
    currency: string;
  };
  includes: string[];
  validUntil?: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  images: string[];
  validUntil: string;
  hotels: string[];
  discount?: {
    type: 'percentage' | 'fixed';
    value: number;
  };
  terms?: string[];
}

export interface InvestorDocument {
  id: string;
  title: string;
  category: 'Circulars' | 'Financials' | 'Reports' | 'Other';
  fileUrl: string;
  date: string;
  size?: string;
}

