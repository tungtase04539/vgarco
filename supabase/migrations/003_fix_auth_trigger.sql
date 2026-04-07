-- Fix the auth trigger - drop old and recreate
-- First, list and drop existing triggers on auth.users that reference profiles
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Drop the old function if it exists
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Recreate the function properly matching our profiles table
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name)
  VALUES (
    NEW.id, 
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Manually insert the profile for the existing admin user (who was created before the trigger was fixed)
INSERT INTO public.profiles (id, email, display_name)
SELECT id, email, 'Admin'
FROM auth.users
WHERE email = 'admin@fbnstudio.de'
ON CONFLICT (id) DO NOTHING;
