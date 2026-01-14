import { createBrowserClient } from "@supabase/ssr";

export const createClient = () => {
  // Ambil variabel lingkungan di sini.
  // Ini adalah cara yang direkomendasikan untuk Next.js App Router.
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
};