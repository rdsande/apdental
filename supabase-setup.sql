-- Run this in your Supabase SQL Editor: https://supabase.com/dashboard/project/ctsblcpatvngtabrxdgo/sql

-- Appointments table
CREATE TABLE IF NOT EXISTS public.appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  service TEXT NOT NULL,
  preferred_date DATE NOT NULL,
  preferred_time TEXT NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled'))
);

-- Contacts table
CREATE TABLE IF NOT EXISTS public.contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Allow public INSERT (for booking form submissions)
CREATE POLICY "Allow public insert appointments"
  ON public.appointments FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public insert contacts"
  ON public.contacts FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated read (for admin dashboard later)
CREATE POLICY "Allow authenticated read appointments"
  ON public.appointments FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated read contacts"
  ON public.contacts FOR SELECT
  TO authenticated
  USING (true);
