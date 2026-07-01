import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useStoreContext } from "../contextApi/ContextApi";


const Navbar = () => {
    const navigate = useNavigate();
    const { token, setToken } = useStoreContext();
    const path = useLocation().pathname;
    const [navbarOpen, setNavbarOpen] = useState(false);

    const onLogOutHandler = () => {
        setToken(null);
        localStorage.removeItem("JWT_TOKEN");
        navigate("/login");
    };

    return (
        <div className="z-50 flex justify-center sticky top-4 px-4">
            <div className="nav-pill w-full max-w-5xl flex justify-between items-center px-6 py-3">
                <Link to="/">
                    <h1 className="font-bold text-xl tracking-tight text-white flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-violet-600 to-cyan-400"></div>
                        Linklytics
                    </h1>
                </Link>
                <ul
                    className={`flex sm:gap-8 gap-4 sm:items-center sm:static absolute left-4 right-4 top-[60px] sm:shadow-none shadow-xl ${navbarOpen ? "h-fit py-5 opacity-100" : "h-0 opacity-0 overflow-hidden"
                        } transition-all duration-300 sm:h-auto sm:opacity-100 sm:bg-transparent bg-[#111]/95 sm:backdrop-blur-none backdrop-blur-xl rounded-2xl border sm:border-none border-white/10 sm:w-auto w-[calc(100%-2rem)] sm:flex-row flex-col px-6 sm:px-0 text-sm font-medium`}
                >
                    <li>
                        <Link
                            className={`transition-colors duration-200 ${path === "/" ? "text-white" : "text-gray-400 hover:text-white"
                                }`}
                            to="/"
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            className={`transition-colors duration-200 ${path === "/about" ? "text-white" : "text-gray-400 hover:text-white"
                                }`}
                            to="/about"
                        >
                            About
                        </Link>
                    </li>
                    {token &&
                        <li>
                            <Link
                                className={`transition-colors duration-200 ${path === "/dashboard" ? "text-white" : "text-gray-400 hover:text-white"
                                    }`}
                                to="/dashboard"
                            >
                                Dashboard
                            </Link>
                        </li>
                    }
                    
                    <div className="flex sm:items-center sm:flex-row flex-col gap-4 sm:ml-4">
                        {!token &&
                            <Link to="/register" className="block w-full sm:w-auto">
                                <button className="w-full sm:w-auto bg-white text-black px-4 py-2 rounded-full font-medium hover:bg-gray-200 transition-colors">
                                    Sign Up
                                </button>
                            </Link>
                        }

                        {token &&
                            <button
                                onClick={onLogOutHandler}
                                className="w-full sm:w-auto border border-white/10 text-white px-4 py-2 rounded-full font-medium hover:bg-white/5 transition-colors">
                                Log Out
                            </button>
                        }
                    </div>
                </ul>
                <button
                    onClick={() => setNavbarOpen(!navbarOpen)}
                    className="sm:hidden flex items-center text-gray-400 hover:text-white transition-colors"
                >
                    {navbarOpen ? (
                        <FaTimes className="text-xl" />
                    ) : (
                        <FaBars className="text-xl" />
                    )}
                </button>
            </div>
        </div>
    );
};

export default Navbar;