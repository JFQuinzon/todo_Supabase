import { NextResponse } from "next/server";

export function middleware(request) {
    const user = true; 
    const role = "admin"; 

    const url = request.nextUrl.clone(); 

    if (!user) {
        if (url.pathname === '/' || url.pathname === '/signup') {
            return NextResponse.next();
        }
        return NextResponse.redirect(new URL('/', request.url));
    }

    if (user) {
        if (role === 'admin') {
            if (url.pathname === '/admin') {
                return NextResponse.next();
            }
            if (url.pathname === '/' || url.pathname === '/home') {
                return NextResponse.redirect(new URL('/admin', request.url));
            }
        }
        else if (role === 'user') {
            if (url.pathname === '/home') {
                return NextResponse.next();
            }
            if (url.pathname === '/' || url.pathname === '/admin') {
                return NextResponse.redirect(new URL('/home', request.url));
            }
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/signup', '/home', '/admin']
};
