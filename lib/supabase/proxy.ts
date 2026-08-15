import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import { getSupabasePublicConfig, hasSupabasePublicConfig } from "./config";

function redirectToLogin(request: NextRequest, response: NextResponse) {
  const url = request.nextUrl.clone();
  url.pathname = "/login";
  url.search = "";
  url.searchParams.set("next", `${request.nextUrl.pathname}${request.nextUrl.search}`);

  const redirectResponse = NextResponse.redirect(url);
  response.cookies.getAll().forEach((cookie) => redirectResponse.cookies.set(cookie));
  return redirectResponse;
}

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });
  const isLoginRoute = request.nextUrl.pathname === "/login";
  const isAuthCallbackRoute = request.nextUrl.pathname === "/auth/callback";
  const isPublicAuthRoute = isLoginRoute || isAuthCallbackRoute;

  // Fail closed: an unconfigured deployment never serves Internal Wiki routes.
  if (!hasSupabasePublicConfig()) {
    return isPublicAuthRoute ? response : redirectToLogin(request, response);
  }

  const { url, publishableKey } = getSupabasePublicConfig();
  const supabase = createServerClient(url, publishableKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  try {
    const { data: claimsData } = await supabase.auth.getClaims();

    if (!claimsData?.claims && !isPublicAuthRoute) return redirectToLogin(request, response);
    if (claimsData?.claims && isLoginRoute) {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      url.search = "";
      const redirectResponse = NextResponse.redirect(url);
      response.cookies.getAll().forEach((cookie) => redirectResponse.cookies.set(cookie));
      return redirectResponse;
    }
  } catch {
    if (!isLoginRoute) return redirectToLogin(request, response);
  }

  return response;
}
