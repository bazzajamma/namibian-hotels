# Database Relationships

This document explains the database schema and relationships for the Namibian Hotels website.

## Entity Relationship Diagram

```
Hotels (1) ────< (Many) Rooms
Hotels (1) ────< (Many) Restaurants
Hotels (Many) ────< hotel_offers >─── (Many) Offers
Hotels (Many) ────< hotel_destinations >─── (Many) Destinations
Destinations (1) ────< (Many) Travel Packages
Hotels (1) ────< (Many) Investor Documents
```

## Table Relationships

### Direct Foreign Keys (One-to-Many)

1. **Hotels → Rooms**
   - `rooms.hotel_id` → `hotels.id`
   - One hotel can have many rooms
   - Cascade delete: Deleting a hotel deletes all its rooms

2. **Hotels → Restaurants**
   - `restaurants.hotel_id` → `hotels.id`
   - One hotel can have many restaurants
   - Cascade delete: Deleting a hotel deletes all its restaurants

3. **Destinations → Travel Packages**
   - `travel_packages.destination_id` → `destinations.id`
   - One destination can have many travel packages
   - Cascade delete: Deleting a destination deletes all its packages

### Junction Tables (Many-to-Many)

4. **Hotels ↔ Offers** (via `hotel_offers`)
   - `hotel_offers.hotel_id` → `hotels.id`
   - `hotel_offers.offer_id` → `offers.id`
   - Many hotels can have many offers
   - Unique constraint on (hotel_id, offer_id) prevents duplicates
   - Cascade delete: Deleting a hotel or offer removes the relationship

5. **Hotels ↔ Destinations** (via `hotel_destinations`)
   - `hotel_destinations.hotel_id` → `hotels.id`
   - `hotel_destinations.destination_id` → `destinations.id`
   - Many hotels can be linked to many destinations
   - Unique constraint on (hotel_id, destination_id) prevents duplicates
   - Cascade delete: Deleting a hotel or destination removes the relationship

### Optional Foreign Keys (One-to-Many)

6. **Hotels → Investor Documents**
   - `investor_documents.hotel_id` → `hotels.id` (nullable)
   - One hotel can have many investor documents
   - `hotel_id` is nullable, allowing documents to be:
     - Hotel-specific (when `hotel_id` is set)
     - Company-wide (when `hotel_id` is NULL)
   - On delete set null: Deleting a hotel sets `hotel_id` to NULL (preserves company-wide documents)

## Indexes

All foreign keys and junction table columns are indexed for optimal query performance:

- `idx_rooms_hotel` on `rooms(hotel_id)`
- `idx_restaurants_hotel` on `restaurants(hotel_id)`
- `idx_hotel_offers_hotel` on `hotel_offers(hotel_id)`
- `idx_hotel_offers_offer` on `hotel_offers(offer_id)`
- `idx_hotel_destinations_hotel` on `hotel_destinations(hotel_id)`
- `idx_hotel_destinations_destination` on `hotel_destinations(destination_id)`
- `idx_travel_packages_destination` on `travel_packages(destination_id)`
- `idx_investor_documents_hotel` on `investor_documents(hotel_id)`

## Query Examples

### Get all offers for a specific hotel
```sql
SELECT o.* 
FROM offers o
JOIN hotel_offers ho ON o.id = ho.offer_id
WHERE ho.hotel_id = 'hotel-uuid-here';
```

### Get all destinations linked to a hotel
```sql
SELECT d.* 
FROM destinations d
JOIN hotel_destinations hd ON d.id = hd.destination_id
WHERE hd.hotel_id = 'hotel-uuid-here';
```

### Get all travel packages for destinations linked to a hotel
```sql
SELECT tp.* 
FROM travel_packages tp
JOIN destinations d ON tp.destination_id = d.id
JOIN hotel_destinations hd ON d.id = hd.destination_id
WHERE hd.hotel_id = 'hotel-uuid-here';
```

### Get all investor documents for a specific hotel (including company-wide)
```sql
SELECT * 
FROM investor_documents
WHERE hotel_id = 'hotel-uuid-here' OR hotel_id IS NULL;
```

### Get only hotel-specific investor documents
```sql
SELECT * 
FROM investor_documents
WHERE hotel_id = 'hotel-uuid-here';
```

## Data Insertion Order

When inserting data, follow this order to respect foreign key constraints:

1. **Hotels** (no dependencies)
2. **Destinations** (no dependencies)
3. **Offers** (no dependencies)
4. **Rooms** (requires hotel)
5. **Restaurants** (requires hotel)
6. **Travel Packages** (requires destination)
7. **Hotel Offers** (requires hotel and offer)
8. **Hotel Destinations** (requires hotel and destination)
9. **Investor Documents** (can reference hotel, but hotel_id is optional)

## Benefits of This Schema

1. **Normalized Design**: Eliminates data redundancy
2. **Referential Integrity**: Foreign keys ensure data consistency
3. **Flexible Relationships**: Many-to-many relationships allow complex associations
4. **Cascade Deletes**: Automatically clean up related data
5. **Performance**: Indexes on foreign keys optimize queries
6. **Scalability**: Easy to add new relationships without schema changes

