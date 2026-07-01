import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="border-t border-white/10 bg-[#0A0A0A] text-gray-400 py-12 z-40 relative">
            <div className="container mx-auto px-6 lg:px-14 flex flex-col lg:flex-row lg:justify-between items-center gap-6">
                <div className="text-center lg:text-left">
                    <h2 className="text-xl font-bold mb-1 text-white flex items-center gap-2 justify-center lg:justify-start">
                        <div className="w-5 h-5 rounded-md bg-gradient-to-tr from-violet-600 to-cyan-400"></div>
                        Linklytics
                    </h2>
                    <p className="text-sm">Simplifying URL shortening for efficient sharing</p>
                </div>

                <p className="text-sm">
                    &copy; {new Date().getFullYear()} Linklytics. All rights reserved.
                </p>

                <div className="flex space-x-6">
                    <a href="#" className="hover:text-white transition-colors">
                        <FaLinkedin size={20} />
                    </a>
                    <a href="https://github.com/mdfaizan-21/UrlShortner" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                        <FaGithub size={20} />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;