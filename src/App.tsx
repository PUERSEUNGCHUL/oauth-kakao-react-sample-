import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Login } from './components/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import KakaoLoginRedirect from './components/KakaoLoginRedirect'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/oauth" element={<KakaoLoginRedirect />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
