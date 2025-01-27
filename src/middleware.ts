import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    // Adicione logs para debug
    console.log("URL:", req.nextUrl.pathname)
    console.log("Token:", req.nextauth.token)

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  },
)

export const config = {
  matcher: ["/cms/:path*"],
}

