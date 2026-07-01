import React from "react";
import { FaLink, FaShareAlt, FaEdit, FaChartLine } from "react-icons/fa";
const AboutPage = () => {
    return (
        <div className="lg:px-14 sm:px-8 px-5 min-h-[calc(100vh-64px)] pt-2 relative z-10">
            <div className="w-full sm:py-10 py-8 flex flex-col items-center text-center">
                <h1 className="sm:text-5xl text-white text-4xl font-bold mb-6 tracking-tight">
                    About Linklytics
                </h1>
                <p className="text-gray-400 text-lg sm:text-xl mb-16 max-w-3xl leading-relaxed">
                    Linklytics simplifies URL shortening for efficient sharing. Easily
                    generate, manage, and track your shortened links. Our powerful
                    infrastructure provides you with the tools you need to optimize
                    your link sharing strategy and monitor engagement in real-time.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
                    <div className="flex flex-col items-center bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl transition-all duration-300 hover:bg-white/10">
                        <FaLink className="text-violet-500 text-4xl mb-6 shrink-0" />
                        <div>
                            <h2 className="sm:text-2xl font-bold text-white mb-3 tracking-tight">
                                Simple URL Shortening
                            </h2>
                            <p className="text-gray-400 leading-relaxed">
                                Experience the ease of creating short, memorable URLs in just a
                                few clicks. Our intuitive interface and quick setup process
                                ensure you can start shortening URLs without any hassle.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl transition-all duration-300 hover:bg-white/10">
                        <FaShareAlt className="text-cyan-400 text-4xl mb-6 shrink-0" />
                        <div>
                            <h2 className="sm:text-2xl font-bold text-white mb-3 tracking-tight">
                                Powerful Analytics
                            </h2>
                            <p className="text-gray-400 leading-relaxed">
                                Gain insights into your link performance with our comprehensive
                                analytics dashboard. Track clicks, geographical data, and
                                referral sources to optimize your marketing strategies.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl transition-all duration-300 hover:bg-white/10">
                        <FaEdit className="text-fuchsia-500 text-4xl mb-6 shrink-0" />
                        <div>
                            <h2 className="sm:text-2xl font-bold text-white mb-3 tracking-tight">
                                Enhanced Security
                            </h2>
                            <p className="text-gray-400 leading-relaxed">
                                Rest assured with our robust security measures. All shortened
                                URLs are protected with advanced encryption, ensuring your data
                                remains safe and secure.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl transition-all duration-300 hover:bg-white/10">
                        <FaChartLine className="text-emerald-400 text-4xl mb-6 shrink-0" />
                        <div>
                            <h2 className="sm:text-2xl font-bold text-white mb-3 tracking-tight">
                                Fast and Reliable
                            </h2>
                            <p className="text-gray-400 leading-relaxed">
                                Enjoy lightning-fast redirects and high uptime with our reliable
                                infrastructure. Your shortened URLs will always be available and
                                responsive, ensuring a seamless experience for your users.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;