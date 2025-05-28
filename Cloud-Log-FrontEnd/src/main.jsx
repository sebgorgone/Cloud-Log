import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import LogInputWidget from './logInputWidget.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LogInputWidget />
  </StrictMode>,
)
