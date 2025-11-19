import { createClient } from '@/lib/supabase/client';
import { Offer, InvestorDocument } from '@/types';

// Mock data functions
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

// Client-safe version for use in client components
export async function getOffersClient(): Promise<Offer[]> {
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
    console.error('Error in getOffersClient:', error);
    return getMockOffers();
  }
}

// Client-safe version for use in client components
export async function getInvestorDocumentsClient(): Promise<InvestorDocument[]> {
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
    console.error('Error in getInvestorDocumentsClient:', error);
    return getMockInvestorDocuments();
  }
}
