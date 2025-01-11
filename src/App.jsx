import React from 'react'
import LandingPage from './components/LandingPage'
import { UserProvider } from './context/UserContext'
import "../src/App.css"
function App() {
  return (
    <UserProvider>
    <LandingPage/>
    </UserProvider>
  )
}

export default App