import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LandingPage from './LandingPage'
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'
function App() {
  

  return (
    <>
    <LandingPage/>
    <SignupForm/>
    <LoginForm/>
    </>
  )
}

export default App
