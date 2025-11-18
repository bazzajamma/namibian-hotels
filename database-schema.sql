-- Namibian Hotels Database Schema
-- Run this SQL in your Supabase SQL Editor

-- Hotels Table
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

-- Rooms Table
create table rooms (
  id uuid primary key default gen_random_uuid(),
  hotel_id uuid not null references hotels(id) on delete cascade,
  name text not null,
  description text,
  images text[],
  amenities text[],
  pricing jsonb,
  capacity integer,
  size text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

create index idx_rooms_hotel on rooms(hotel_id);

-- Restaurants Table
create table restaurants (
  id uuid primary key default gen_random_uuid(),
  hotel_id uuid not null references hotels(id) on delete cascade,
  name text not null,
  description text,
  images text[],
  cuisine text,
  hours jsonb,
  rating numeric,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

create index idx_restaurants_hotel on restaurants(hotel_id);

-- Offers Table
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

-- Hotel Offers Junction Table (Many-to-Many)
create table hotel_offers (
  id uuid primary key default gen_random_uuid(),
  hotel_id uuid not null references hotels(id) on delete cascade,
  offer_id uuid not null references offers(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  unique(hotel_id, offer_id)
);

create index idx_hotel_offers_hotel on hotel_offers(hotel_id);
create index idx_hotel_offers_offer on hotel_offers(offer_id);

-- Destinations Table
create table destinations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  images text[],
  location text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Hotel Destinations Junction Table (Many-to-Many)
create table hotel_destinations (
  id uuid primary key default gen_random_uuid(),
  hotel_id uuid not null references hotels(id) on delete cascade,
  destination_id uuid not null references destinations(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  unique(hotel_id, destination_id)
);

create index idx_hotel_destinations_hotel on hotel_destinations(hotel_id);
create index idx_hotel_destinations_destination on hotel_destinations(destination_id);

-- Travel Packages Table
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

-- Investor Documents Table
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

-- Enable Row Level Security (RLS) - Optional, adjust based on your needs
-- alter table hotels enable row level security;
-- alter table rooms enable row level security;
-- alter table restaurants enable row level security;
-- alter table offers enable row level security;
-- alter table destinations enable row level security;
-- alter table travel_packages enable row level security;
-- alter table investor_documents enable row level security;

-- Example RLS policies (uncomment and adjust as needed):
-- create policy "Hotels are viewable by everyone" on hotels for select using (true);
-- create policy "Rooms are viewable by everyone" on rooms for select using (true);
-- create policy "Restaurants are viewable by everyone" on restaurants for select using (true);
-- create policy "Offers are viewable by everyone" on offers for select using (true);
-- create policy "Destinations are viewable by everyone" on destinations for select using (true);
-- create policy "Travel packages are viewable by everyone" on travel_packages for select using (true);
-- create policy "Investor documents are viewable by everyone" on investor_documents for select using (true);

