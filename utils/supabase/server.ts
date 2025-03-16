"use server";

import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { Database } from "types_db";

//createServerSupabaseClient라는 함수는 서버 컴포넌트에서만 사용해줘야 한다.
//admin이라는 값은 기본적으로 false다.
//따라서 server-supabase-client로 클라이언트를 생성을 해주면 admin api들을 사용할 수 없다.
//예를 들어 전체 유저의 리스트를 갖고 온다거나 이런 것들은 프로젝트 전체에 대한 권한이 필요하기에 그런 admin api는 사용할 수 없다.
//대신 createServerSupabaseAdminClient라는 함수를 한번씩 사용하게 될 건데, 이 함수를 호출하면 이 서버 supabase 클라이언트에 admin을 true로 줬다.
//때문에 함수 사용시 전체 유저에 접근하거나 하는 등의 admin api를 사용할 수가 있따.
export const createServerSupabaseClient = async (
  cookieStore: ReturnType<typeof cookies> = cookies(),
  admin: boolean = false
) => {
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    admin //admin일 경우 publicServiceRole이 들어갈거고, 아니라면 Anonymous키가 동일하게 들어간다.
      ? process.env.NEXT_SUPABASE_SERVICE_ROLE!
      : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch (error) {
            // The `delete` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
};

export const createServerSupabaseAdminClient = async (
  cookieStore: ReturnType<typeof cookies> = cookies()
) => {
  return createServerSupabaseClient(cookieStore, true);
};
