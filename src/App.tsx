import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Login } from './components/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SocialLoginRedirect from './components/SocialLoginRedirect'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/oauth/:provider" element={<SocialLoginRedirect />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
