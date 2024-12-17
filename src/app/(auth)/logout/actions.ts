'use server';

import { supabaseServer } from "@/utilities/supabase-server";
import { redirect } from "next/navigation";

export async function Logout() {
  const supabase = await supabaseServer();
  const { error } = await supabase.auth.signOut();

  if (!error) redirect(process.env.NEXT_PUBLIC_HOST);
  else redirect(`${process.env.NEXT_PUBLIC_HOST}?error=Failed`);
}