import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;
  const authPages =
    pathname == "/forget-password" ||
    pathname == "/reset-password" ||
    pathname == "/verify-password" ||
    pathname == "/signin" ||
    pathname == "/signup";

  if (token && authPages) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!token && !authPages) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile",
    "/cart",
    "/wishlist",
    "/allorders",
    "/forget-password",
    "/reset-password",
    "/verify-code",
    "/signin",
    "/signup",
    "/checkout/:path",
  ],
};
