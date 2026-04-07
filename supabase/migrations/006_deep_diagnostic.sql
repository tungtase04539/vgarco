-- Deep diagnostic: check GoTrue internal tables and auth schema migrations
DO $$
DECLARE
  r RECORD;
  tbl_rec RECORD;
BEGIN
  -- Check auth schema tables
  FOR tbl_rec IN
    SELECT tablename FROM pg_tables WHERE schemaname = 'auth' ORDER BY tablename
  LOOP
    RAISE NOTICE 'auth table: %', tbl_rec.tablename;
  END LOOP;

  -- Check auth.schema_migrations
  BEGIN
    FOR r IN SELECT version FROM auth.schema_migrations ORDER BY version DESC LIMIT 5
    LOOP
      RAISE NOTICE 'auth migration: %', r.version;
    END LOOP;
  EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'auth.schema_migrations not accessible: %', SQLERRM;
  END;

  -- Check if auth.users has all required columns for GoTrue v2
  FOR r IN
    SELECT column_name, data_type, is_nullable
    FROM information_schema.columns
    WHERE table_schema = 'auth' AND table_name = 'users'
    ORDER BY ordinal_position
  LOOP
    RAISE NOTICE 'auth.users column: % (% nullable=%)', r.column_name, r.data_type, r.is_nullable;
  END LOOP;

  -- Check the actual admin user details
  FOR r IN
    SELECT id, email, role, aud, email_confirmed_at, 
           raw_app_meta_data::text as app_meta,
           raw_user_meta_data::text as user_meta,
           encrypted_password IS NOT NULL as has_password
    FROM auth.users WHERE email = 'admin@fbnstudio.de'
  LOOP
    RAISE NOTICE 'Admin: id=%, email=%, role=%, aud=%, has_pw=%', r.id, r.email, r.role, r.aud, r.has_password;
    RAISE NOTICE 'Admin app_meta=%', r.app_meta;
    RAISE NOTICE 'Admin user_meta=%', r.user_meta;
  END LOOP;
END $$;
