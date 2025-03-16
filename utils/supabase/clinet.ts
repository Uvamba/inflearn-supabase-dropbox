"use client";

import { createBrowserClient } from "@supabase/ssr";
//supabase에선 createBrowserClient라는 함수를 지원한다.
export const createBrowserSupabaseClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
