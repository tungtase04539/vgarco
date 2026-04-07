-- Fix RLS policies - the auth system service role needs unrestricted access
-- Also grant necessary permissions

-- Grant the authenticator role access to profiles
GRANT ALL ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO anon;
GRANT ALL ON public.profiles TO service_role;

-- Make sure the handle_new_user function uses SECURITY DEFINER (bypasses RLS)
-- Already set in previous migration, but let's ensure it

-- Also ensure all our tables have proper grants
GRANT ALL ON public.projects TO authenticated;
GRANT ALL ON public.services TO authenticated;
GRANT ALL ON public.journal_posts TO authenticated;
GRANT ALL ON public.team_members TO authenticated;
GRANT ALL ON public.site_settings TO authenticated;

GRANT SELECT ON public.projects TO anon;
GRANT SELECT ON public.services TO anon;
GRANT SELECT ON public.journal_posts TO anon;
GRANT SELECT ON public.team_members TO anon;
GRANT SELECT ON public.site_settings TO anon;
