import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Reloads always start at the top. The browser's own scroll
// restoration runs while React and the hero animation are still
// building the page, so it lands a little way down instead.
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}
// 'instant' overrides the smooth scroll-behavior set on <html>.
window.scrollTo({ top: 0, behavior: 'instant' })

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
