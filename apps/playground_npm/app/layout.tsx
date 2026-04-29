import { cookies } from 'next/headers'
import type { ReactNode } from 'react'
import '@qhuy/react/styles.css'
import '@qhuy/tokens/css/fxp.css'
import '@qhuy/tokens/css/fxp.dark.css'
import './globals.css'
import { DEFAULT_TENANT, isTenantId } from './tenant-config'

export const metadata = {
  title: 'FXP Playground NPM',
  description: 'Terrain de jeu pour tester @qhuy/react publie sur npm en consumer Next.js reel',
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies()
  const cookieTenant = cookieStore.get('fxp-tenant')?.value
  const tenantId = isTenantId(cookieTenant) ? cookieTenant : DEFAULT_TENANT

  return (
    <html lang="fr" data-theme="light" data-tenant={tenantId}>
      <head>
        <link rel="stylesheet" href={`/_fxp/tenants/${tenantId}.css`} />
      </head>
      <body>{children}</body>
    </html>
  )
}
