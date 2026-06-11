import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken, getJwtSecret } from '@/utils/auth';

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // We only target paths matching /admin
  if (pathname.startsWith('/admin')) {
    const sessionCookie = request.cookies.get('gigpad_admin_session');
    let isAuthenticated = false;

    if (sessionCookie && sessionCookie.value) {
      const secret = getJwtSecret();
      const payload = await verifyToken(sessionCookie.value, secret);
      if (payload) {
        isAuthenticated = true;
      }
    }

    // Redirect authenticated admins away from the login page
    if (pathname === '/admin/login') {
      if (isAuthenticated) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      }
      return NextResponse.next();
    }

    // Require authentication for all other /admin routes
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // Redirect bare /admin path to dashboard
    if (pathname === '/admin') {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
