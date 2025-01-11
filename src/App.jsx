import React from 'react'
import LandingPage from './components/LandingPage'
import { UserProvider } from './context/UserContext'

function App() {
  return (
    <UserProvider>
    <LandingPage/>
    </UserProvider>
  )
}

export default App