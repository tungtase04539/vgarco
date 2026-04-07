-- Fix: Create the missing profiles table that the auth trigger references
-- Including all columns the trigger may expect

CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  website TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Auth manage profiles" ON profiles FOR ALL USING (auth.uid() = id);

-- Now create the admin user
DO $$
DECLARE
  user_id UUID;
BEGIN
  user_id := gen_random_uuid();
  
  INSERT INTO auth.users (
    id,
    instance_id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    confirmation_sent_at,
    created_at,
    updated_at,
    raw_app_meta_data,
    raw_user_meta_data,
    is_super_admin
  ) VALUES (
    user_id,
    '00000000-0000-0000-0000-000000000000',
    'authenticated',
    'authenticated',
    'admin@fbnstudio.de',
    extensions.crypt('FbnStudio2026!', extensions.gen_salt('bf')),
    now(),
    now(),
    now(),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{}',
    false
  );

  INSERT INTO auth.identities (
    id,
    user_id,
    provider_id,
    identity_data,
    provider,
    last_sign_in_at,
    created_at,
    updated_at
  ) VALUES (
    user_id,
    user_id,
    'admin@fbnstudio.de',
    jsonb_build_object('sub', user_id::text, 'email', 'admin@fbnstudio.de'),
    'email',
    now(),
    now(),
    now()
  );

  RAISE NOTICE 'Admin user created with id: %', user_id;
END $$;
