import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthContext from './hooks/useAuth'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContext className="antialiased">
      <App />
    </AuthContext>
  </StrictMode>,
)
