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

const AppRouter = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<DashboardLayout />} />
                <Route path="/:url" element={<SubDomainRouter />} />
            </Routes>
            <Footer />
            <Toaster />
        </div>
    );
};

export default AppRouter;
export const SubDomainRouter = () => {
    return (
        <Routes>
            <Route path="/:url" element={<ShortenUrlPage />} />
        </Routes>
    )
}