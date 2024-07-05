import { NextResponse } from "next/server";

export function middleware(request) {
    const user = false; 
    const role = "user"; 

    const url = request.nextUrl.clone(); 

    // If the user is not authenticated
    if (!user) {
        // If the request is already on the login or signup page, let it pass
        if (url.pathname === '/' || url.pathname === '/signup') {
            return NextResponse.next();
        }
        // Otherwise, redirect to the login page
        return NextResponse.redirect(new URL('/', request.url));
    }

    // If the user is authenticated
    if (user) {
        // If the user is an admin
        if (role === 'admin') {
            // If the request is already on the admin page, let it pass
            if (url.pathname === '/admin') {
                return NextResponse.next();
            }
            // If the request is on the login or home page, redirect to the admin page
            if (url.pathname === '/' || url.pathname === '/home') {
                return NextResponse.redirect(new URL('/admin', request.url));
            }
        }
        // If the user is a regular user
        else if (role === 'user') {
            // If the request is already on the home page, let it pass
            if (url.pathname === '/home') {
                return NextResponse.next();
            }
            // If the request is on the login or admin page, redirect to the home page
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
