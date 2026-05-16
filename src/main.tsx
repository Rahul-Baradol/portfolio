import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const rootEl = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

if (rootEl.children.length > 0) {
  hydrateRoot(rootEl, app)
} else {
  createRoot(rootEl).render(app)
}

// Defer analytics until after the page is interactive
window.addEventListener('load', () => {
  import('posthog-js').then(({ default: posthog }) => {
    const excludeDistinctIds = (import.meta.env.VITE_PUBLIC_POSTHOG_EXCLUDE_DISTINCT_IDS ?? '')
      .split(',')
      .map((id: string) => id.trim())
      .filter(Boolean)

    posthog.init(import.meta.env.VITE_PUBLIC_POSTHOG_KEY, {
      api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
      defaults: '2025-05-24',
      loaded: (ph) => {
        if (excludeDistinctIds.includes(ph.get_distinct_id())) {
          ph.opt_out_capturing()
          return
        }
        ph.register({ app: 'portfolio' })
      },
    })
  })
})
