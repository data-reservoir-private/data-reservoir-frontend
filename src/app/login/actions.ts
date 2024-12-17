'use server';

import { supabaseServer } from "@/utilities/supabase-server";
import { redirect } from "next/navigation";

export async function login(_: FormData) {
  const supabase = await supabaseServer();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_HOST}/callback`
    }
  });

  if (error || !data.url) redirect('/login');

  else redirect(data.url);
}