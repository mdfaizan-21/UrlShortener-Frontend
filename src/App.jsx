import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ShortenUrlPage from "./components/ShortenUrlPage";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import AboutPage from "./components/AboutPage";
import RegisterPage from "./components/RegisterPage";
import Login from "./components/Login";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "./components/ErrorPage";
function App() {
  return (
    <div className="relative min-h-screen bg-[#0A0A0A] text-white overflow-hidden">
      {/* Subtle animated grid background */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-grid-pattern opacity-40"></div>
      
      {/* Floating accent glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-violet-600/20 blur-[120px] rounded-full z-0 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <BrowserRouter>
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/register" element={<PrivateRoute publicPage={true}><RegisterPage /></PrivateRoute>} />
              <Route path="/login" element={<PrivateRoute publicPage={true}><Login /></PrivateRoute>} />
              <Route path="/dashboard" element={<PrivateRoute publicPage={false}><DashboardLayout /></PrivateRoute>} />
              <Route path="*" element={<ErrorPage />} />
              <Route path="/error" element={<ErrorPage />} />
              <Route path="/:url" element={<ShortenUrlPage />} />
            </Routes>
          </main>
          <Footer />
          <Toaster 
            toastOptions={{
              className: 'bg-[#111] text-white border border-white/10',
              style: {
                background: '#111',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.1)',
              },
            }} 
          />
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App
