-- Add gallery column to projects (array of Cloudinary public IDs)
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS gallery JSONB DEFAULT '[]'::jsonb;
