import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Vista2 from './screens/Vista2'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Vista2 />
  </StrictMode>,
)
