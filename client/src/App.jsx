import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// Pages
import Landing from './routes/Landing'
import LoginPage from './routes/auth/Login'
import RegisterPage from './routes/auth/Register'
import Error from './routes/error'

function App() {
  const [count, setCount] = useState()

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/auth/login" element={<LoginPage/>}/>
          <Route path="/auth/register" element={<RegisterPage/>}/>
          <Route path="/*" element={<Error/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
