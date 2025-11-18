import { createClient } from '@/lib/supabase/client';
import { Hotel, Room, Restaurant, Offer, Destination, InvestorDocument } from '@/types';

// Mock data for development - replace with actual Supabase queries
export async function getHotels(): Promise<Hotel[]> {
  try {
    // Check if Supabase is configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return getMockHotels();
    }

    let supabase;
    try {
      supabase = createClient();
    } catch (clientError) {
      console.log('Failed to create Supabase client, using mock data:', clientError);
      return getMockHotels();
    }

    const { data, error } = await supabase.from('hotels').select('*');
    
    if (error) {
      // Check if error is an empty object {} - these should be silently ignored
      const errorString = JSON.stringify(error);
      const isEmptyError = errorString === '{}';
      
      // Only log if error has actual content (not empty object)
      if (!isEmptyError) {
        console.error('Error fetching hotels:', error);
      }
      // Silently fall back to mock data for empty errors (table likely doesn't exist yet)
      return getMockHotels();
    }
    
    // If no data returned, use mock data
    if (!data || data.length === 0) {
      return getMockHotels();
    }
    
    return data;
  } catch (error) {
    // Only log if error has meaningful content
    if (error instanceof Error && error.message) {
      console.error('Error in getHotels:', error.message);
    }
    return getMockHotels();
  }
}

export async function getHotel(id: string): Promise<Hotel | null> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.from('hotels').select('*').eq('id', id).single();
    
    if (error) {
      console.error('Error fetching hotel:', error);
      return getMockHotels().find(h => h.id === id) || null;
    }
    
    return data;
  } catch (error) {
    console.error('Error in getHotel:', error);
    return getMockHotels().find(h => h.id === id) || null;
  }
}

export async function getRoomsByHotel(hotelId: string): Promise<Room[]> {
  try {
    // Check if Supabase is configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return getMockRooms().filter(r => r.hotelId === hotelId);
    }

    const supabase = createClient();
    const { data, error } = await supabase.from('rooms').select('*').eq('hotel_id', hotelId);
    
    if (error) {
      console.error('Error fetching rooms:', error);
      return getMockRooms().filter(r => r.hotelId === hotelId);
    }
    
    return data || getMockRooms().filter(r => r.hotelId === hotelId);
  } catch (error) {
    console.error('Error in getRoomsByHotel:', error);
    return getMockRooms().filter(r => r.hotelId === hotelId);
  }
}

export async function getRestaurantsByHotel(hotelId: string): Promise<Restaurant[]> {
  try {
    // Check if Supabase is configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return getMockRestaurants().filter(r => r.hotelId === hotelId);
    }

    const supabase = createClient();
    const { data, error } = await supabase.from('restaurants').select('*').eq('hotel_id', hotelId);
    
    if (error) {
      console.error('Error fetching restaurants:', error);
      return getMockRestaurants().filter(r => r.hotelId === hotelId);
    }
    
    return data || getMockRestaurants().filter(r => r.hotelId === hotelId);
  } catch (error) {
    console.error('Error in getRestaurantsByHotel:', error);
    return getMockRestaurants().filter(r => r.hotelId === hotelId);
  }
}

export async function getOffers(): Promise<Offer[]> {
  try {
    // Check if Supabase is configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return getMockOffers();
    }

    const supabase = createClient();
    // Fetch offers with their related hotels through junction table
    const { data: offersData, error: offersError } = await supabase
      .from('offers')
      .select('*')
      .gte('valid_until', new Date().toISOString());
    
    if (offersError) {
      console.error('Error fetching offers:', offersError);
      return getMockOffers();
    }

    if (!offersData) {
      return getMockOffers();
    }

    // Fetch hotel relationships for each offer
    const offersWithHotels = await Promise.all(
      offersData.map(async (offer) => {
        const { data: hotelOffers } = await supabase
          .from('hotel_offers')
          .select('hotel_id')
          .eq('offer_id', offer.id);
        
        const hotels = hotelOffers?.map((ho: { hotel_id: string }) => ho.hotel_id) || [];
        
        return {
          ...offer,
          hotels,
        };
      })
    );

    return offersWithHotels;
  } catch (error) {
    console.error('Error in getOffers:', error);
    return getMockOffers();
  }
}

export async function getDestinationsByHotel(hotelId: string): Promise<Destination[]> {
  try {
    // Check if Supabase is configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return getMockDestinations();
    }

    const supabase = createClient();
    // Fetch destinations linked to this hotel through junction table
    const { data: hotelDestinations, error: junctionError } = await supabase
      .from('hotel_destinations')
      .select('destination_id')
      .eq('hotel_id', hotelId);
    
    if (junctionError) {
      console.error('Error fetching hotel destinations junction:', junctionError);
      return getMockDestinations();
    }

    if (!hotelDestinations || hotelDestinations.length === 0) {
      return getMockDestinations();
    }

    const destinationIds = hotelDestinations.map((hd: { destination_id: string }) => hd.destination_id);
    
    // Fetch destination details
    const { data: destinations, error: destinationsError } = await supabase
      .from('destinations')
      .select('*')
      .in('id', destinationIds);
    
    if (destinationsError) {
      console.error('Error fetching destinations:', destinationsError);
      return getMockDestinations();
    }

    if (!destinations) {
      return getMockDestinations();
    }

    // Fetch travel packages for each destination
    const destinationsWithPackages = await Promise.all(
      destinations.map(async (destination) => {
        const { data: packages } = await supabase
          .from('travel_packages')
          .select('*')
          .eq('destination_id', destination.id);
        
        return {
          ...destination,
          packages: packages || [],
        };
      })
    );

    return destinationsWithPackages;
  } catch (error) {
    console.error('Error in getDestinationsByHotel:', error);
    return getMockDestinations();
  }
}

export async function getInvestorDocuments(): Promise<InvestorDocument[]> {
  try {
    // Check if Supabase is configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return getMockInvestorDocuments();
    }

    const supabase = createClient();
    const { data, error } = await supabase.from('investor_documents').select('*').order('date', { ascending: false });
    
    if (error) {
      console.error('Error fetching documents:', error);
      return getMockInvestorDocuments();
    }
    
    return data || getMockInvestorDocuments();
  } catch (error) {
    console.error('Error in getInvestorDocuments:', error);
    return getMockInvestorDocuments();
  }
}

// Mock data functions
function getMockHotels(): Hotel[] {
  return [
    {
      id: '1',
      name: 'Sossusvlei Desert Lodge',
      description: 'Luxury accommodation in the heart of the Namib Desert, offering breathtaking views of the world\'s oldest desert.',
      images: ['/hotels/sossusvlei-desert-lodge/exterior.jpg'],
      location: 'Sossusvlei, Namibia',
      destinations: ['1', '2'],
      amenities: ['Spa', 'Pool', 'Restaurant', 'Bar'],
      rating: 4.8,
    },
    {
      id: '2',
      name: 'Etosha Safari Resort',
      description: 'Experience the wild beauty of Etosha National Park from our premium safari resort.',
      images: ['/hotels/etosha-safari-resort/exterior.jpg'],
      location: 'Etosha, Namibia',
      destinations: ['2', '3'],
      amenities: ['Safari Tours', 'Restaurant', 'Bar', 'Game Viewing'],
      rating: 4.9,
    },
    {
      id: '3',
      name: 'Swakopmund Coastal Hotel',
      description: 'Modern beachfront hotel combining desert and ocean experiences in Namibia\'s adventure capital.',
      images: ['/hotels/swakopmund-coastal-hotel.jpg'],
      location: 'Swakopmund, Namibia',
      destinations: ['1', '3'],
      amenities: ['Beach Access', 'Restaurant', 'Spa', 'Adventure Activities'],
      rating: 4.7,
    },
  ];
}

function getMockRooms(): Room[] {
  return [
    {
      id: '1',
      hotelId: '1',
      name: 'Desert View Suite',
      description: 'Spacious suite with panoramic desert views and private balcony.',
      images: ['/hotels/sossusvlei-desert-lodge/rooms/desert-view-suite.jpg'],
      amenities: ['Wi-Fi', 'Mini Bar', 'Air Conditioning', 'Private Balcony'],
      pricing: { base: 2500, currency: 'NAD', perNight: true },
      capacity: 2,
      size: '45 m²',
    },
    {
      id: '2',
      hotelId: '1',
      name: 'Luxury Desert Villa',
      description: 'Premium villa with private pool and direct desert access.',
      images: ['/hotels/sossusvlei-desert-lodge/rooms/luxury-desert-villa.jpg'],
      amenities: ['Private Pool', 'Wi-Fi', 'Kitchen', 'Private Terrace'],
      pricing: { base: 4500, currency: 'NAD', perNight: true },
      capacity: 4,
      size: '120 m²',
    },
    {
      id: '3',
      hotelId: '2',
      name: 'Safari Tent',
      description: 'Luxury tented accommodation with game viewing deck.',
      images: ['/placeholder-room.jpg'],
      amenities: ['Game Viewing Deck', 'En-suite Bathroom', 'Outdoor Shower'],
      pricing: { base: 3200, currency: 'NAD', perNight: true },
      capacity: 2,
      size: '35 m²',
    },
  ];
}

function getMockRestaurants(): Restaurant[] {
  return [
    {
      id: '1',
      hotelId: '1',
      name: 'Dune Restaurant',
      description: 'Fine dining with local Namibian flavors and international cuisine.',
      images: ['/hotels/sossusvlei-desert-lodge/restaurants/dune-restaurant.jpg'],
      cuisine: 'Namibian & International',
      hours: { open: '07:00', close: '22:00', days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] },
      rating: 4.6,
    },
    {
      id: '2',
      hotelId: '1',
      name: 'Sunset Bar',
      description: 'Casual bar with craft cocktails and light meals, perfect for watching the desert sunset.',
      images: ['/hotels/sossusvlei-desert-lodge/restaurants/sunset-bar.jpg'],
      cuisine: 'Bar & Light Meals',
      hours: { open: '16:00', close: '23:00', days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] },
    },
    {
      id: '3',
      hotelId: '2',
      name: 'Bush Bistro',
      description: 'Rustic bistro serving fresh game and local specialties.',
      images: ['/hotels/etosha-safari-resort/restaurants/bush-bistro.jpg'],
      cuisine: 'Game & Local',
      hours: { open: '06:00', close: '21:00', days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] },
      rating: 4.5,
    },
  ];
}

function getMockOffers(): Offer[] {
  return [
    {
      id: '1',
      title: 'Early Bird Special - 20% Off',
      description: 'Book your stay 30 days in advance and save 20% on all room types.',
      images: ['/offers/early-bird-special.jpg'],
      validUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
      hotels: ['1', '2', '3'],
      discount: { type: 'percentage', value: 20 },
      terms: ['Valid for bookings made 30+ days in advance', 'Subject to availability'],
    },
    {
      id: '2',
      title: 'Desert Adventure Package',
      description: 'Complete desert experience including accommodation, meals, and guided tours.',
      images: ['/offers/desert-adventure-package.jpg'],
      validUntil: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
      hotels: ['1', '3'],
      discount: { type: 'percentage', value: 15 },
    },
  ];
}

function getMockDestinations(): Destination[] {
  return [
    {
      id: '1',
      name: 'Sossusvlei Dunes',
      description: 'Explore the iconic red sand dunes of Sossusvlei, some of the highest in the world.',
      images: ['/hotels/sossusvlei-desert-lodge/destinations/sossusvlei-dunes.jpg'],
      location: 'Sossusvlei, Namibia',
      packages: [
        {
          id: '1',
          destinationId: '1',
          title: 'Full Day Dune Tour',
          description: 'Guided tour of Sossusvlei with sunrise viewing and Deadvlei visit.',
          duration: '1 Day',
          price: { amount: 1200, currency: 'NAD' },
          includes: ['Transportation', 'Guide', 'Park Fees', 'Lunch'],
        },
      ],
    },
    {
      id: '2',
      name: 'Etosha National Park',
      description: 'Wildlife safari in one of Africa\'s premier game reserves.',
      images: ['/hotels/etosha-safari-resort/destinations/etosha-national-park.jpg'],
      location: 'Etosha, Namibia',
      packages: [
        {
          id: '2',
          destinationId: '2',
          title: '3-Day Safari Experience',
          description: 'Comprehensive safari with multiple game drives and expert guides.',
          duration: '3 Days',
          price: { amount: 8500, currency: 'NAD' },
          includes: ['Accommodation', 'All Meals', 'Game Drives', 'Guide'],
        },
      ],
    },
  ];
}

function getMockInvestorDocuments(): InvestorDocument[] {
  return [
    {
      id: '1',
      title: 'Annual Report 2023',
      category: 'Financials',
      fileUrl: '/documents/annual-report-2023.pdf',
      date: '2024-01-15',
      size: '2.5 MB',
    },
    {
      id: '2',
      title: 'ESG Sustainability Report 2023',
      category: 'Reports',
      fileUrl: '/documents/esg-report-2023.pdf',
      date: '2024-02-01',
      size: '3.1 MB',
    },
    {
      id: '3',
      title: 'Circular - Board Meeting Notice',
      category: 'Circulars',
      fileUrl: '/documents/circular-board-meeting.pdf',
      date: '2024-03-10',
      size: '450 KB',
    },
  ];
}

