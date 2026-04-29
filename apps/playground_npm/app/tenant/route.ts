import { type NextRequest, NextResponse } from 'next/server'
import { DEFAULT_TENANT, isTenantId } from '../tenant-config'

export function GET(request: NextRequest) {
  const nextUrl = request.nextUrl.clone()
  const requestedTenant = nextUrl.searchParams.get('tenant') ?? undefined
  const tenantId = isTenantId(requestedTenant) ? requestedTenant : DEFAULT_TENANT

  nextUrl.pathname = '/'
  nextUrl.search = ''

  const response = NextResponse.redirect(nextUrl)
  response.cookies.set('fxp-tenant', tenantId, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  })

  return response
}
