import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export async function supabaseServer() {
  const cookie = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_HOST,
    process.env.NEXT_PUBLIC_SUPABASE_API_KEY,
    {
      cookies: {
        getAll() {
          return cookie.getAll();
        },
        setAll(newCookie) {
          newCookie.forEach(({ name, value, options }) => cookie.set(name, value, options));
        }
      }
    }
  );
}

export async function updateSession(req: NextRequest) {
  let supabaseResponse = NextResponse.next({ ...req });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_HOST,
    process.env.NEXT_PUBLIC_SUPABASE_API_KEY,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => req.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ ...req });
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options));
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  if (req.nextUrl.pathname.startsWith('/callback')) return supabaseResponse;

  if (!user && !req.nextUrl.pathname.startsWith('/login')) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.rewrite(url);
  };

  return supabaseResponse;
}