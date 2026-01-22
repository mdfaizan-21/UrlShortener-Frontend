import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import LandingPage from './components/LandingPage'
import AboutPage from './components/AboutPage'
import Footer from './components/Footer'
import Navbar from './components/Navbar'

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
