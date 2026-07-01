import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import Card from "./Card";
import { useStoreContext } from "../contextApi/ContextApi";
import api from "../api/api";

const LandingPage = () => {
  const navigate = useNavigate();
  const { token } = useStoreContext();
  const [longUrl, setLongUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // wake up the server (free tier sleep)
    const wakeUp = async () => {
      try {
        await api.get("/api/home");
      } catch (error) {
        // ignore errors
      }
    };
    wakeUp();
  }, []);

  const handleShorten = async (e) => {
    e.preventDefault();
    if (!longUrl) return;

    if (!token) {
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      const { data: res } = await api.post("/api/urls/shorten", { originalUrl: longUrl }, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });
      const shortenUrl = `${import.meta.env.VITE_REACT_FRONT_END_URL}/s/${res.shortUrl}`;
      navigator.clipboard.writeText(shortenUrl).then(() => {
        toast.success("Short URL Copied to Clipboard", {
          position: "bottom-center",
          className: "mb-5 text-sm",
          duration: 3000,
        });
      });
      setLongUrl("");
    } catch (error) {
      toast.error("Create ShortURL Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center pt-16 pb-20 px-4 sm:px-6 lg:px-8 relative z-10">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl mx-auto text-center mt-12 sm:mt-20"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
          <span className="flex h-2 w-2 rounded-full bg-violet-500 animate-pulse"></span>
          <span className="text-xs font-medium text-gray-300 tracking-wide uppercase">Linklytics 2.0 is live</span>
        </div>

        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1] sm:leading-[1.1]">
          Shorten links. <br className="hidden sm:block" />
          <span className="gradient-text">Expand your reach.</span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          The developer-friendly URL shortener. Build, scale, and track your links with powerful analytics and lightning-fast edge redirects.
        </p>

        {/* Inline URL Shortener */}
        <section className="flex items-center w-4xl">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            onSubmit={handleShorten}
            className="relative w-full max-w-xl mx-auto flex items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.8)] focus-within:border-violet-500/50 transition-colors mr-0 ml-9"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-cyan-400/10 rounded-2xl pointer-events-none"></div>
            <input
              type="url"
              required
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              placeholder="https://your-very-long-url.com/to-shorten"
              className="w-full bg-transparent text-white placeholder-gray-500 px-4 sm:px-6 py-3 sm:py-4 outline-none text-base sm:text-lg relative z-10"

            />
            <button
              type="submit"
              disabled={loading}
              className="relative z-10 bg-white text-black font-semibold px-6 sm:px-8 py-3 rounded-xl hover:bg-gray-200 transition-colors shrink-0 disabled:opacity-50 cursor-pointer"
            >
              {loading ? "Creating..." : "Shorten"}
            </button>
          </motion.form>
          <motion.button onClick={() => { if (!token) navigate("/login"); else navigate("/dashboard") }} className="relative z-10 bg-white text-black font-semibold px-10 ml-2 mb-2 sm:px-5 py-4 rounded-xl hover:bg-gray-200 transition-colors shrink-0 disabled:opacity-50 cursor-pointer">
            Manage Your Links
          </motion.button>
        </section>
      </motion.div>

      {/* Bento Grid Features */}
      <div className="w-full max-w-6xl mx-auto mt-32 sm:mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            Everything you need. <span className="text-gray-500">Nothing you don't.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card
            title="Lightning Fast"
            desc="Global edge network ensures your links redirect instantly anywhere in the world."
          />
          <Card
            title="Real-time Analytics"
            desc="Track clicks, locations, and referrers with our beautiful interactive dashboard."
          />
          <Card
            title="Secure by Default"
            desc="End-to-end encryption and advanced threat protection for all your shortened URLs."
          />
          <Card
            title="Developer API"
            desc="Integrate our powerful REST API directly into your applications and workflows."
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;