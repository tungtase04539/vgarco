-- Add cover_image column to projects table
-- Stores the Cloudinary public ID of the chosen cover/thumbnail image
ALTER TABLE projects ADD COLUMN IF NOT EXISTS cover_image TEXT;
