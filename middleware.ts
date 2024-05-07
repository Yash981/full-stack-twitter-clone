import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { NextRequest, NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);
 
export default auth((req)=>{
  // console.log('Middleware executed');
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth
  // console.log(isLoggedIn,'isLoggedIn',nextUrl.pathname);

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
  // if(!isLoggedIn && nextUrl.pathname === '/undefined'){
  //   toast.error("You must be logged in to access this page")
  // }

  if (!isLoggedIn && nextUrl.pathname.startsWith('/userprofile/undefined') || nextUrl.pathname.startsWith('/bookmarks/undefined')) {
    return NextResponse.redirect(new URL('/', nextUrl).toString())
  }
  // console.log("redirected to home");
  const requestHeaders = new Headers(req.headers);
  // console.log(req.nextUrl.pathname,'ok');
  requestHeaders.set("x-pathname", req.nextUrl.pathname);
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  
  


});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};



// export function middleware(req: NextRequest) {
  
// }
