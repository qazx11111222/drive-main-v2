import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

console.log('Supabase Client - URL:', supabaseUrl);
console.log('Supabase Client - Anon Key exists:', !!supabaseAnonKey);
console.log('Supabase Client - Anon Key length:', supabaseAnonKey?.length);

// 環境変数の検証
if (!supabaseUrl) {
  console.error('Supabase Client - Missing NEXT_PUBLIC_SUPABASE_URL');
}
if (!supabaseAnonKey) {
  console.error('Supabase Client - Missing NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});