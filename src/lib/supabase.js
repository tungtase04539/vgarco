import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create a mock client that returns empty data when Supabase is not configured
function createMockClient() {
  const mockResponse = { data: null, error: null };
  const mockQuery = () => ({
    select: () => mockQuery(),
    insert: () => mockQuery(),
    update: () => mockQuery(),
    delete: () => mockQuery(),
    upsert: () => mockQuery(),
    eq: () => mockQuery(),
    order: () => mockQuery(),
    limit: () => mockQuery(),
    single: () => Promise.resolve(mockResponse),
    then: (resolve) => resolve(mockResponse),
  });

  return {
    from: () => mockQuery(),
    auth: {
      signInWithPassword: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
      signOut: () => Promise.resolve({ error: null }),
      getSession: () => Promise.resolve({ data: { session: null } }),
      getUser: () => Promise.resolve({ data: { user: null } }),
    },
  };
}

const isConfigured = supabaseUrl && supabaseAnonKey && supabaseUrl !== '';

export const supabase = isConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createMockClient();

export function getSupabaseServer() {
  if (!isConfigured) return createMockClient();
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
