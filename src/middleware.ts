import { type NextRequest, NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "@/features/core/i18n/routing";
import { updateSession } from "@/features/core/lib/supabase/middleware";

const handleI18nRouting = createIntlMiddleware(routing);

export default async function middleware(
  request: NextRequest
): Promise<NextResponse> {
  console.log(
    "[Middleware] Processing request:",
    request.method,
    request.nextUrl.pathname
  );

  // Step 1: Handle internationalization routing
  console.log("[Middleware] Handling i18n routing...");
  const i18nResponse = handleI18nRouting(request);
  // Check if i18n middleware returned a response (e.g., redirect for locale)
  if (
    i18nResponse.status === 307 ||
    i18nResponse.status === 308 ||
    (i18nResponse.headers.has("x-middleware-rewrite") &&
      i18nResponse.headers.get("x-middleware-rewrite") !== request.url) ||
    i18nResponse.headers.has("location")
  ) {
    console.log(
      "[Middleware] i18n middleware returned response/redirect. Status:",
      i18nResponse.status
    );
    return i18nResponse;
  }
  console.log("[Middleware] i18n routing handled, proceeding.");

  // Step 2: Handle Supabase session update
  console.log("[Middleware] Handling Supabase session update...");
  const supabaseResponse = await updateSession(request);
  console.log(
    "[Middleware] Supabase response status:",
    supabaseResponse.status
  );

  // Simplest approach: If Supabase redirects, return its response.
  if (supabaseResponse.headers.has("location")) {
    console.log(
      "[Middleware] Supabase middleware returned redirect:",
      supabaseResponse.headers.get("location")
    );
    return supabaseResponse;
  }

  console.log(
    "[Middleware] No redirects. Returning i18n response (potentially rewritten)."
  );
  // If no redirects from Supabase, return the response from i18n middleware
  // (which might have been rewritten for locale handling)
  return i18nResponse;
}

export const config = {
  // Match all pathnames except for
  // - ... if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - ... the ones containing a dot (e.g. `favicon.ico`)
  // Use the matcher from the documentation
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
