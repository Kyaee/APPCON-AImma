import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// Pages
import LoginPage from './routes/auth/Login'
import RegisterPage from './routes/auth/Register'
import Error from './routes/error'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1>Hello World</h1>}/>
          <Route path="/auth/login" element={<LoginPage/>}/>
          <Route path="/auth/register" element={<RegisterPage/>}/>
          <Route path="/*" element={<RegisterPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
