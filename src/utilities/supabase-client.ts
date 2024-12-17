import { createBrowserClient } from "@supabase/ssr";

export function supabaseClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_HOST,
    process.env.NEXT_PUBLIC_SUPABASE_API_KEY
  );
}