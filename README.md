# Namibian Hotels Website

A modern, responsive Next.js website for a Namibian hotel chain featuring multiple hotels, rooms, restaurants, destinations, offers, and investor relations.

## Features

- 🏨 **Multiple Hotels** - Showcase different hotel properties with detailed pages
- 🛏️ **Rooms & Restaurants** - Interactive sliders for rooms and dining options
- 🌍 **Destinations** - Travel packages linked to hotels
- 🎁 **Offers & Promotions** - Special deals with filtering capabilities
- 📊 **ESG Storytelling** - Comprehensive About Us page focused on sustainability
- 📄 **Investor Relations** - Document download functionality
- 🌓 **Dark/Light Mode** - Full theme support with smooth transitions
- 🎨 **Desert Theme** - Custom Namibian desert-inspired color palette

## Tech Stack

- **Framework**: Next.js 16+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with custom desert theme
- **Database & Storage**: Supabase (Auth, Storage, Database)
- **Deployment**: Vercel-ready
- **Theme Management**: next-themes

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account and project

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd hotel
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Add your Supabase credentials to `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Supabase Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)

2. Create the database tables. You can either:
   - Run the complete schema from `database-schema.sql` in your Supabase SQL Editor (recommended)
   - Or create tables individually using the SQL below

#### Hotels Table
```sql
create table hotels (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  images text[],
  location text,
  amenities text[],
  rating numeric,
  created_at timestamp with time zone default timezone('utc'::text, now())
);
```

#### Rooms Table
```sql
create table rooms (
  id uuid primary key default gen_random_uuid(),
  hotel_id uuid references hotels(id),
  name text not null,
  description text,
  images text[],
  amenities text[],
  pricing jsonb,
  capacity integer,
  size text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);
```

#### Restaurants Table
```sql
create table restaurants (
  id uuid primary key default gen_random_uuid(),
  hotel_id uuid references hotels(id),
  name text not null,
  description text,
  images text[],
  cuisine text,
  hours jsonb,
  rating numeric,
  created_at timestamp with time zone default timezone('utc'::text, now())
);
```

#### Offers Table
```sql
create table offers (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  images text[],
  valid_until timestamp with time zone,
  discount jsonb,
  terms text[],
  created_at timestamp with time zone default timezone('utc'::text, now())
);
```

#### Hotel Offers Junction Table (Many-to-Many)
```sql
create table hotel_offers (
  id uuid primary key default gen_random_uuid(),
  hotel_id uuid not null references hotels(id) on delete cascade,
  offer_id uuid not null references offers(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  unique(hotel_id, offer_id)
);

create index idx_hotel_offers_hotel on hotel_offers(hotel_id);
create index idx_hotel_offers_offer on hotel_offers(offer_id);
```

#### Destinations Table
```sql
create table destinations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  images text[],
  location text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);
```

#### Hotel Destinations Junction Table (Many-to-Many)
```sql
create table hotel_destinations (
  id uuid primary key default gen_random_uuid(),
  hotel_id uuid not null references hotels(id) on delete cascade,
  destination_id uuid not null references destinations(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  unique(hotel_id, destination_id)
);

create index idx_hotel_destinations_hotel on hotel_destinations(hotel_id);
create index idx_hotel_destinations_destination on hotel_destinations(destination_id);
```

#### Travel Packages Table
```sql
create table travel_packages (
  id uuid primary key default gen_random_uuid(),
  destination_id uuid not null references destinations(id) on delete cascade,
  title text not null,
  description text,
  duration text,
  price jsonb,
  includes text[],
  valid_until timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

create index idx_travel_packages_destination on travel_packages(destination_id);
```

#### Investor Documents Table
```sql
create table investor_documents (
  id uuid primary key default gen_random_uuid(),
  hotel_id uuid references hotels(id) on delete set null,
  title text not null,
  category text check (category in ('Circulars', 'Financials', 'Reports', 'Other')),
  file_url text not null,
  date date,
  size text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

create index idx_investor_documents_hotel on investor_documents(hotel_id);
```

**Note:** The `hotel_id` field is nullable, allowing documents to be either:
- Hotel-specific (when `hotel_id` is set)
- Company-wide (when `hotel_id` is NULL)

3. Set up Supabase Storage:
   - Create a storage bucket named `investor-documents` for PDF downloads
   - Set appropriate bucket policies for public/private access
   - Create a bucket for images if storing them in Supabase Storage

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── about/             # About Us page (ESG focus)
│   ├── hotels/            # Hotels list and detail pages
│   ├── offers/            # Offers & Promotions page
│   ├── investors/         # Investor Relations page
│   ├── layout.tsx         # Root layout with theme provider
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── sliders/          # Slider components (Hotel, Room, Restaurant)
│   ├── Footer.tsx        # Site footer
│   ├── Navbar.tsx        # Navigation bar
│   ├── ThemeToggle.tsx   # Dark/light mode toggle
│   ├── OfferCard.tsx     # Offer card component
│   ├── DestinationCard.tsx
│   └── DocumentDownload.tsx
├── lib/                  # Utility functions
│   ├── supabase/        # Supabase client setup
│   ├── theme.ts         # Theme provider
│   └── data.ts          # Data fetching functions
├── types/                # TypeScript type definitions
│   └── index.ts         # All type interfaces
└── public/               # Static assets
```

## Features in Detail

### Theme System
- Custom desert color palette (sand, terracotta, sunset, sky)
- Full dark/light mode support
- Smooth theme transitions
- System preference detection

### Sliders
- Hotel slider on homepage
- Room slider on hotel detail pages
- Restaurant slider on hotel detail pages
- Navigation arrows and dot indicators
- Responsive design

### Data Management
- Supabase integration for all data
- Fallback to mock data for development
- Type-safe data fetching
- Error handling

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

The site will be automatically deployed on every push to the main branch.

## Environment Variables

- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - (Optional) For server-side operations

## License

This project is private and proprietary.

## Support

For questions or support, please contact the development team.
