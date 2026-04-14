/**
 * Create admin user via Supabase Auth Admin API
 * Requires SUPABASE_SERVICE_ROLE_KEY
 */

const SUPABASE_URL = 'https://chqzzfumbjgznmkdbxat.supabase.co';

// You need the service_role key (NOT anon key) from Supabase Dashboard > Settings > API
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const ADMIN_EMAIL = 'admin@vgarco.vn';
const ADMIN_PASSWORD = 'VgarCo@2026!';

async function createAdmin() {
  if (!SERVICE_ROLE_KEY) {
    console.error('❌ Missing SUPABASE_SERVICE_ROLE_KEY environment variable');
    console.log('');
    console.log('Get it from: Supabase Dashboard > Settings > API > service_role key');
    console.log('Then run:');
    console.log('  $env:SUPABASE_SERVICE_ROLE_KEY="your_key_here"');
    console.log('  node create_admin.cjs');
    process.exit(1);
  }

  console.log(`Creating admin user: ${ADMIN_EMAIL}`);

  const res = await fetch(`${SUPABASE_URL}/auth/v1/admin/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
      'apikey': SERVICE_ROLE_KEY,
    },
    body: JSON.stringify({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      email_confirm: true,
      user_metadata: {
        full_name: 'VGARCO Admin',
      },
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error('❌ Failed to create user:', data);
    process.exit(1);
  }

  console.log('✅ Admin user created successfully!');
  console.log('');
  console.log('📧 Email:    ', ADMIN_EMAIL);
  console.log('🔑 Password: ', ADMIN_PASSWORD);
  console.log('🆔 User ID:  ', data.id);
}

createAdmin();
