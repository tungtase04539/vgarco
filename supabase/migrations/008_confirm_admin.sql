-- Confirm the admin user's email
UPDATE auth.users 
SET email_confirmed_at = now(), 
    confirmation_sent_at = now(),
    updated_at = now()
WHERE email = 'admin@fbnstudio.de';
