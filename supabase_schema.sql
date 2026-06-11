-- ====================================================================
-- SUPABASE SCHEMA FOR AI INTERVIEW COMPANION (ASK MATE AI)
-- ====================================================================
-- INSTRUCTIONS:
-- 1. Go to your Supabase Dashboard (https://supabase.com/dashboard)
-- 2. Open your project.
-- 3. Click on the "SQL Editor" in the left sidebar.
-- 4. Click "New Query".
-- 5. Copy the entire contents of this file and paste them into the SQL Editor.
-- 6. Click "Run" (or press Cmd+Enter / Ctrl+Enter).
-- ====================================================================

-- Drop existing tables first to ensure any missing columns or incorrect foreign keys are fixed.
-- (Use CASCADE to safely drop foreign keys and constraints)
DROP TABLE IF EXISTS public.bookmarks CASCADE;
DROP TABLE IF EXISTS public.session_history CASCADE;
DROP TABLE IF EXISTS public.companions CASCADE;

-- 1. Create the 'companions' table
CREATE TABLE public.companions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    subject TEXT NOT NULL,
    topic TEXT NOT NULL,
    voice TEXT,
    style TEXT,
    duration INTEGER NOT NULL,
    author TEXT NOT NULL, -- Clerk user ID (string format)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create the 'session_history' table
CREATE TABLE public.session_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    companion_id UUID REFERENCES public.companions(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL, -- Clerk user ID (string format)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create the 'bookmarks' table
CREATE TABLE public.bookmarks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    companion_id UUID REFERENCES public.companions(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL, -- Clerk user ID (string format)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT unique_user_companion_bookmark UNIQUE (user_id, companion_id)
);

-- 4. Disable Row Level Security (RLS) on all tables
-- This ensures the client SDK can read/write data directly using the anon key.
-- (Recommended for prototyping. For production, replace these with proper RLS policies).
ALTER TABLE public.companions DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.session_history DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks DISABLE ROW LEVEL SECURITY;

-- 5. Create indexes to optimize query speeds
CREATE INDEX idx_companions_author ON public.companions(author);
CREATE INDEX idx_session_history_user_id ON public.session_history(user_id);
CREATE INDEX idx_bookmarks_user_id ON public.bookmarks(user_id);
