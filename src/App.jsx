import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Accueil from './components/Accueil'
import LanguagePrograms from './components/LanguagePrograms'
import TechPrograms from './components/TechPrograms'
import Opportunities from './components/Opportunities'
import Team from './components/Team'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main>
        <Hero />
        <Accueil />
        <LanguagePrograms />
        <TechPrograms />
        <Team />
        <Opportunities />
      </main>
      <Footer />
    </div>
  )
}

export default App
