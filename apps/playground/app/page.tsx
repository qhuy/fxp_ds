'use client'
import { Button, Spinner } from '@fxp/react'
import { useEffect, useState } from 'react'
import { DEFAULT_TENANT, isTenantId, TENANTS, type TenantId } from './tenant-config'

const ChevronRight = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <title>Chevron droit</title>
    <path d="m9 18 6-6-6-6" />
  </svg>
)

const Plus = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <title>Plus</title>
    <path d="M12 5v14M5 12h14" />
  </svg>
)

export default function PlaygroundPage() {
  const [loading, setLoading] = useState(false)
  const [count, setCount] = useState(0)
  const [tenantId, setTenantId] = useState<TenantId>(DEFAULT_TENANT)

  useEffect(() => {
    const htmlTenant = document.documentElement.dataset.tenant
    setTenantId(isTenantId(htmlTenant) ? htmlTenant : DEFAULT_TENANT)
  }, [])

  function updateTenant(nextTenantId: TenantId) {
    window.location.assign(`/tenant?tenant=${nextTenantId}`)
  }

  return (
    <main>
      <header className="page-header">
        <div>
          <h1>FXP Playground</h1>
          <p>
            Terrain de jeu local pour <code>@fxp/react</code> via <code>workspace:*</code> (pas
            encore publié sur registry).
          </p>
        </div>

        <label className="tenant-switcher">
          <span>Tenant</span>
          <select
            value={tenantId}
            onChange={(event) => updateTenant(event.target.value as TenantId)}
          >
            {TENANTS.map((tenant) => (
              <option key={tenant.id} value={tenant.id}>
                {tenant.name}
              </option>
            ))}
          </select>
        </label>
      </header>

      <section className="tenant-panel" aria-label="Tenant actif">
        {TENANTS.map((tenant) => (
          <article key={tenant.id} data-active={tenant.id === tenantId}>
            <strong>{tenant.name}</strong>
            <span>{tenant.description}</span>
          </article>
        ))}
      </section>

      <section>
        <h2>Button — variants</h2>
        <div className="row">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </section>

      <section>
        <h2>Button — tailles</h2>
        <div className="row">
          <Button size="xs">Extra small</Button>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button size="icon" aria-label="Ajouter">
            <Plus />
          </Button>
        </div>
      </section>

      <section>
        <h2>Button — états</h2>
        <div className="row">
          <Button disabled>Disabled</Button>
          <Button loading>Loading…</Button>
          <Button loading variant="destructive">
            Suppression…
          </Button>
        </div>
      </section>

      <section>
        <h2>Button — slots icônes</h2>
        <div className="row">
          <Button iconLeft={<Plus />}>Ajouter</Button>
          <Button iconRight={<ChevronRight />} variant="secondary">
            Suivant
          </Button>
        </div>
      </section>

      <section>
        <h2>Button — interactivité (RSC + use client OK)</h2>
        <div className="row">
          <Button onClick={() => setCount((n) => n + 1)}>Cliqué {count}×</Button>
          <Button
            loading={loading}
            onClick={() => {
              setLoading(true)
              setTimeout(() => setLoading(false), 1500)
            }}
          >
            Lancer (1.5s)
          </Button>
        </div>
      </section>

      <section>
        <h2>Button — composition asChild</h2>
        <div className="row">
          <Button asChild>
            <a href="https://example.com" target="_blank" rel="noreferrer">
              Lien stylé en bouton
            </a>
          </Button>
        </div>
      </section>

      <section>
        <h2>Spinner — primitive autonome</h2>
        <div className="row">
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
          <Spinner label="Chargement en cours…" />
        </div>
      </section>
    </main>
  )
}
