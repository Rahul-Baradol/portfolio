import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import posthog from 'posthog-js'

posthog.init(import.meta.env.VITE_PUBLIC_POSTHOG_KEY, {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
  defaults: '2025-05-24',
})

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
