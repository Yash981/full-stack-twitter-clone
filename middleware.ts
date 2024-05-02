import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { NextRequest, NextResponse } from "next/server";

// export { auth as middleware } from "auth"
const { auth } = NextAuth(authConfig);
 
export default auth((req)=>{
  const { nextUrl } = req;
   const isLoggedIn = !!req.auth
  // console.log(isLoggedIn,'isLoggedIn');

  // const isAppRoute = nextUrl.pathname === "/";
  // const authRoutes = ["/signin"];
  // const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // if (isAuthRoute) {
  //   if (isLoggedIn) {
  //     return Response.redirect(new URL('/', nextUrl))
  //   // }
  // }
  // if (!isLoggedIn && isAppRoute) {
  //   return Response.redirect(new URL('/test', nextUrl))
  // }
  return NextResponse.next()


});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};



export function middleware(req: NextRequest) {
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-pathname", req.nextUrl.pathname);
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
