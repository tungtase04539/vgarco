-- Diagnostic: check auth.users schema and verify our admin user exists
-- This migration just queries and returns info via RAISE NOTICE

DO $$
DECLARE
  r RECORD;
  col_rec RECORD;
BEGIN
  -- Check admin user exists
  SELECT id, email, role, aud, email_confirmed_at 
  INTO r 
  FROM auth.users 
  WHERE email = 'admin@fbnstudio.de';
  
  IF FOUND THEN
    RAISE NOTICE 'Admin user found: id=%, email=%, role=%, aud=%, confirmed=%', 
      r.id, r.email, r.role, r.aud, r.email_confirmed_at;
  ELSE
    RAISE NOTICE 'Admin user NOT found!';
  END IF;

  -- Check profiles table columns
  FOR col_rec IN 
    SELECT column_name, data_type 
    FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'profiles'
    ORDER BY ordinal_position
  LOOP
    RAISE NOTICE 'profiles column: % (%)', col_rec.column_name, col_rec.data_type;
  END LOOP;

  -- Check triggers on auth.users
  FOR col_rec IN
    SELECT trigger_name, event_manipulation, action_statement
    FROM information_schema.triggers
    WHERE event_object_schema = 'auth' AND event_object_table = 'users'
  LOOP
    RAISE NOTICE 'Trigger: % on % -> %', col_rec.trigger_name, col_rec.event_manipulation, col_rec.action_statement;
  END LOOP;

  -- Check if there are any custom schemas or functions referencing auth
  FOR col_rec IN
    SELECT routine_schema, routine_name
    FROM information_schema.routines
    WHERE routine_definition LIKE '%profiles%' OR routine_name LIKE '%user%'
    ORDER BY routine_schema, routine_name
    LIMIT 20
  LOOP
    RAISE NOTICE 'Function: %.%', col_rec.routine_schema, col_rec.routine_name;
  END LOOP;
END $$;
