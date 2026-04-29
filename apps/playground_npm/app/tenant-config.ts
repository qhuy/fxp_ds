export const DEFAULT_TENANT = 'acme'

export const TENANTS = [
  {
    id: 'acme',
    name: 'Acme Sport',
    description: 'Bleu corporate, radius standard',
  },
  {
    id: 'stadium',
    name: 'Stadium Club',
    description: 'Vert billetterie, boutons pill',
  },
  {
    id: 'nova',
    name: 'Nova Arena',
    description: 'Rose événementiel, contrastes soft',
  },
] as const

export type TenantId = (typeof TENANTS)[number]['id']

const tenantIds = new Set<string>(TENANTS.map((tenant) => tenant.id))

export function isTenantId(value: string | undefined): value is TenantId {
  return value != null && tenantIds.has(value)
}
