-- Add photo_url column to team_members table
ALTER TABLE public.team_members ADD COLUMN IF NOT EXISTS photo_url TEXT;
