import { readFileSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

async function prerender() {
  const { build } = await import('vite')

  process.env.VITE_SSR_BUILD = 'true'

  await build({
    root,
    logLevel: 'warn',
    build: {
      ssr: resolve(root, 'src/entry-server.tsx'),
      outDir: resolve(root, 'dist/server'),
      emptyOutDir: true,
      rollupOptions: {
        output: {
          format: 'esm',
          entryFileNames: '[name].js',
        },
      },
    },
  })

  delete process.env.VITE_SSR_BUILD

  const { render } = await import(
    new URL(`file://${resolve(root, 'dist/server/entry-server.js')}`)
  )

  const template = readFileSync(resolve(root, 'dist/index.html'), 'utf-8')
  const appHtml = render('/')
  const html = template.replace('<!--app-html-->', appHtml)
  writeFileSync(resolve(root, 'dist/index.html'), html)

  console.log('✓ Pre-rendered /')
}

prerender().catch((err) => {
  console.error('Pre-render failed:', err)
  process.exit(1)
})
