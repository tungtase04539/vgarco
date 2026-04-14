const { Client } = require('pg');

async function run() {
  // Try direct connection to Supabase DB
  const c = new Client({
    host: 'db.chqzzfumbjgznmkdbxat.supabase.co',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: 'Anhtung19988',
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 10000,
  });

  try {
    await c.connect();
    console.log('✅ Connected to database!');
    
    const r = await c.query('ALTER TABLE projects ADD COLUMN IF NOT EXISTS cover_image TEXT');
    console.log('✅ Migration success:', r.command);
    
    // Verify
    const check = await c.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'projects' AND column_name = 'cover_image'");
    console.log('✅ Verified column exists:', check.rows.length > 0);
    
    await c.end();
  } catch (e) {
    console.error('❌ Error:', e.message);
    
    // Try Session mode pooler (port 5432)
    console.log('Trying session pooler (port 5432)...');
    const c2 = new Client({
      host: 'aws-0-ap-southeast-1.pooler.supabase.com',
      port: 5432,
      database: 'postgres',
      user: 'postgres.chqzzfumbjgznmkdbxat',
      password: 'Anhtung19988',
      ssl: { rejectUnauthorized: false },
      connectionTimeoutMillis: 10000,
    });
    
    try {
      await c2.connect();
      console.log('✅ Connected via session pooler!');
      const r2 = await c2.query('ALTER TABLE projects ADD COLUMN IF NOT EXISTS cover_image TEXT');
      console.log('✅ Migration success:', r2.command);
      await c2.end();
    } catch (e2) {
      console.error('❌ Session pooler also failed:', e2.message);
    }
  }
}

run();
