import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import LandingPage from './components/LandingPage'
import AboutPage from './components/AboutPage'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import { Toaster } from 'react-hot-toast'
import RegisterPage from './components/RegisterPage'
function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Toaster position="bottom-center" richColors />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
