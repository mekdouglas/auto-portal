-- AutoPortal Supabase Database Schema

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  username TEXT,
  role TEXT DEFAULT 'comprador',
  avatar TEXT,
  cover_image TEXT,
  city TEXT,
  bio TEXT,
  verified BOOLEAN DEFAULT FALSE,
  plan TEXT DEFAULT 'Grátis',
  phone TEXT,
  rating NUMERIC DEFAULT 5.0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Vehicles Table
CREATE TABLE IF NOT EXISTS public.vehicles (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  make TEXT,
  model TEXT,
  year TEXT,
  mileage NUMERIC DEFAULT 0,
  fuel TEXT,
  transmission TEXT,
  color TEXT,
  price NUMERIC NOT NULL,
  hide_price BOOLEAN DEFAULT FALSE,
  featured BOOLEAN DEFAULT FALSE,
  featured_tag TEXT,
  photos TEXT[] DEFAULT '{}',
  description TEXT,
  audio_transcript TEXT,
  audio_duration TEXT,
  location TEXT,
  seller_id TEXT REFERENCES public.profiles(id) ON DELETE CASCADE,
  seller_data JSONB,
  likes_count NUMERIC DEFAULT 0,
  views_count NUMERIC DEFAULT 0,
  specs TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Chats Table
CREATE TABLE IF NOT EXISTS public.chats (
  id TEXT PRIMARY KEY,
  vehicle_id TEXT,
  vehicle_title TEXT,
  vehicle_photo TEXT,
  vehicle_price NUMERIC,
  participant JSONB,
  last_message TEXT,
  last_message_time TEXT,
  unread_count NUMERIC DEFAULT 0,
  messages JSONB DEFAULT '[]'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS) with Public Read / Write Policies for MVP
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Public insert profiles" ON public.profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update profiles" ON public.profiles FOR UPDATE USING (true);

CREATE POLICY "Public read vehicles" ON public.vehicles FOR SELECT USING (true);
CREATE POLICY "Public insert vehicles" ON public.vehicles FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update vehicles" ON public.vehicles FOR UPDATE USING (true);

CREATE POLICY "Public read chats" ON public.chats FOR SELECT USING (true);
CREATE POLICY "Public insert chats" ON public.chats FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update chats" ON public.chats FOR UPDATE USING (true);
