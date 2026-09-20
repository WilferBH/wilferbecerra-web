import { NextResponse, type NextRequest } from "next/server";

const locales = ["es", "en"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasLocale) return;

  const accept = request.headers.get("accept-language") ?? "";
  const locale = accept.toLowerCase().startsWith("en") ? "en" : "es";
  request.nextUrl.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|api|capturas|icon|favicon|robots.txt|sitemap.xml|opengraph-image|.*\\..*).*)"],
};
