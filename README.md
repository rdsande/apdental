# AP Dental Website

Professional dental clinic website built with **Next.js 14**, **Tailwind CSS**, and **Supabase**.

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + DM Sans font
- **Animation**: CSS transitions + Intersection Observer
- **Backend**: Supabase (appointments & contacts)
- **Icons**: Lucide React

## Colors
| Token | Hex |
|---|---|
| Primary | `#0B7C0D` |
| Primary Light | `#D3F2D3` |
| Grey | Tailwind `gray-*` scale |

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Set up Supabase
1. Go to your [Supabase Dashboard](https://supabase.com/dashboard/project/ctsblcpatvngtabrxdgo)
2. Open the **SQL Editor**
3. Run the contents of `supabase-setup.sql`
4. Copy your **anon/public key** from Project Settings → API

### 3. Configure environment
Edit `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://ctsblcpatvngtabrxdgo.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<paste your anon key here>
```

### 4. Run dev server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

## Project Structure
```
src/
├── app/
│   ├── globals.css       # Tailwind + DM Sans + custom styles
│   ├── layout.tsx        # Root layout + metadata
│   └── page.tsx          # Home page (assembles all sections)
├── components/
│   ├── Navbar.tsx        # Sticky nav + dropdown + mobile menu
│   ├── Hero.tsx          # Hero section with animated stats
│   ├── Services.tsx      # 6-service grid with images
│   ├── WhyUs.tsx         # Why choose us — 6 feature cards
│   ├── About.tsx         # About section on green background
│   ├── Testimonials.tsx  # Paginated testimonials carousel
│   ├── BookingForm.tsx   # Appointment booking → Supabase
│   ├── Footer.tsx        # Links, contact, CTA banner
│   └── SwashDivider.tsx  # Reusable swash SVG separator
└── lib/
    └── supabase.ts       # Supabase client + TypeScript types
```

## Deployment
```bash
npm run build
npm start
```
