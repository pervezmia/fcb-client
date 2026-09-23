import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

// Next.js এর নতুন নিয়ম অনুযায়ী এখানে 'proxy' নামে এক্সপোর্ট করতে হবে 
export async function proxy(request) {
  const { pathname } = request.nextUrl;

  // বেটার অথ থেকে সেশন ফেচ করা
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  // ১. লগইন না থাকলে ড্যাশবোর্ড থেকে লগইন পেজে রিডাইরেক্ট করা
  if (pathname.startsWith("/dashboard") && !session?.user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // ২. লগইন করা থাকলে ইউজার যাতে আর লগইন পেজে ঢুকতে না পারে
  if (pathname.startsWith("/login") && session?.user) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};