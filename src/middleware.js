import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export default async function middleware(request) {    
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const url = `${request.nextUrl.origin}/api/auth`;

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token }),
    };

    if (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === "/register") {
        const response = await fetch(url, options);

        if (response.ok) {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }
    
    if (request.nextUrl.pathname === '/profile') {
        const response = await fetch(url, options);
        
        if (!response.ok) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}
