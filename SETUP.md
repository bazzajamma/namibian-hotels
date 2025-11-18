# Setup Guide

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   - Copy `.env.example` to `.env.local`
   - Add your Supabase credentials

3. **Set Up Supabase Database**
   - Follow the SQL schema in README.md
   - Create the required tables
   - Set up storage buckets

4. **Run Development Server**
   ```bash
   npm run dev
   ```

## Supabase Storage Setup

### Create Storage Buckets

1. Go to Storage in your Supabase dashboard
2. Create a bucket named `investor-documents`
3. Set bucket to public or configure RLS policies
4. (Optional) Create an `images` bucket for hotel/room/restaurant images

### Storage Policies

For `investor-documents` bucket:
- Allow public read access for downloads
- Or use signed URLs (already implemented in DocumentDownload component)

## Database Seeding

You can seed your database with sample data using the Supabase SQL editor or by creating a seed script. The application includes mock data fallbacks that will work until you add real data.

## Image Handling

- Images can be stored in Supabase Storage or external URLs
- Update image URLs in your database records
- Placeholder images in `/public` are used as fallbacks
- Next.js Image component is configured for Supabase CDN

## Deployment Checklist

- [ ] Set environment variables in Vercel
- [ ] Verify Supabase connection
- [ ] Test all pages and functionality
- [ ] Upload actual images to Supabase Storage
- [ ] Configure CORS if using external image sources
- [ ] Test document downloads
- [ ] Verify dark/light mode works
- [ ] Test responsive design on mobile devices

