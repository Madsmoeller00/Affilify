import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Only protect /api/fetch routes
  if (request.nextUrl.pathname.startsWith('/api/fetch')) {
    const authHeader = request.headers.get('authorization')
    console.log('Auth header:', authHeader)
    
    if (!authHeader || !isValidAuthHeader(authHeader)) {
      console.log('Invalid auth header. Expected:', process.env.API_ROUTE_USERNAME)
      return new NextResponse('Unauthorized', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Protected"',
        },
      })
    }
  }

  return NextResponse.next()
}

// Match only fetch API routes
export const config = {
  matcher: '/api/fetch/:path*',
}

function isValidAuthHeader(authHeader: string): boolean {
  const validUsername = process.env.API_ROUTE_USERNAME
  const validPassword = process.env.API_ROUTE_PASSWORD

  if (!validUsername || !validPassword) {
    console.error('API route credentials not set in environment variables')
    return false
  }

  try {
    const base64Credentials = authHeader.split(' ')[1]
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii')
    const [username, password] = credentials.split(':')
    
    console.log('Received credentials:', { username, password: '***' })
    console.log('Expected username:', validUsername)

    return username === validUsername && (validPassword === '' || password === validPassword)
  } catch {
    return false
  }
} 