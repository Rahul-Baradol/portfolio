import { renderToString } from 'react-dom/server'
import { StaticRouter, Route, Routes } from 'react-router'
import { ThemeProvider } from './lib/theme'
import { Layout } from './layout'
import { Home } from './pages/home'
import { PRsPage } from './pages/prs'
import NotFound from './components/not-found'

export function render(url: string) {
  return renderToString(
    <ThemeProvider>
      <StaticRouter location={url}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/prs" element={<PRsPage />} />
            <Route path="/*" element={<NotFound />} />
          </Route>
        </Routes>
      </StaticRouter>
    </ThemeProvider>
  )
}
