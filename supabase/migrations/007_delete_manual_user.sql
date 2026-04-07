-- Delete the manually created admin user so we can recreate via the auth API
-- The API will populate all internal fields correctly

DELETE FROM auth.identities WHERE user_id = (SELECT id FROM auth.users WHERE email = 'admin@fbnstudio.de');
DELETE FROM public.profiles WHERE id = (SELECT id FROM auth.users WHERE email = 'admin@fbnstudio.de');
DELETE FROM auth.users WHERE email = 'admin@fbnstudio.de';
