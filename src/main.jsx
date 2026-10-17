import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import AppWithRoutes from './AppWithRoutes.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWithRoutes />
  </StrictMode>,
)
