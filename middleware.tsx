import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the user cookie
  const userCookie = request.cookies.get('user');
  const user = userCookie ? JSON.parse(userCookie.value) : null;

  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (request.nextUrl.pathname === '/login') {
    if (user) {
      return NextResponse.redirect(new URL('/auth/resources', request.url));
    }
  }

  // Check if the request is to a protected route
  if (request.nextUrl.pathname.startsWith('/auth')) {
    // If the user cookie does not exist, redirect to /login
    if (!user) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith('/auth/admin')) {
    // If the user cookie does not exist, redirect to /login
    if (user && user.role !== "admin") {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Allow the request to continue
  return NextResponse.next();
}

export const config = {
  matcher: ['/auth/:path*', '/login', '/auth/admin/:path*', '/'],
};
