import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const protectedRoutes = createRouteMatcher([
  '/order',
  '/assets',
  '/team',
  '/settings',
])
export default clerkMiddleware((auth, req) => {
  if (protectedRoutes(req)) auth().protect()

  const url = req.nextUrl
  const searchParams = url.searchParams.toString()
  const hostname = req.headers

  const pathWithSearchParams = `${url.pathname}${
    !!searchParams ? `?${searchParams}` : ''
  }`

  // if subdomain exists
  const customSubdomain = hostname
    .get('host')
    ?.split(`${process.env.NEXT_PUBLIC_DOMAIN}`)
    .filter(Boolean)[0]

  // console.log({ hostname, pathWithSearchParams, customSubdomain })

  if (customSubdomain) {
    return NextResponse.rewrite(
      new URL(`${customSubdomain}${pathWithSearchParams}`, req.url)
    )
  }

  if (
    url.pathname === '/' ||
    (url.pathname === '/site' && url.host === `${process.env.NEXT_PUBLIC_HOST}`)
  ) {
    return NextResponse.rewrite(new URL('/site', req.url))
  }
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
