import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const isLoginPage = request.nextUrl.pathname === '/login';
  const isAuthCallback = request.nextUrl.pathname.startsWith('/auth/callback');

  // Check for Supabase auth cookie (lightweight check without @supabase/ssr)
  const hasAuthCookie = request.cookies.getAll().some(c =>
    c.name.startsWith('sb-') && c.name.includes('-auth-token')
  );

  if (!hasAuthCookie && !isLoginPage && !isAuthCallback) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  if (hasAuthCookie && isLoginPage) {
    const url = request.nextUrl.clone();
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
