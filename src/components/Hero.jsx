"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function Hero() {
  const fullText = "Hi, I'm Kiprop Donald";
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const { ref, inView } = useInView({ threshold: 0.6 });

  const colors = ["text-white", "text-white", "text-indigo-300", "text-purple-400"];
  const words = ["Hi,", "I'm", "Kiprop", "Donald"];

  useEffect(() => {
    if (!inView) return;
    setDisplayText("");
    setIndex(0);
    let total = 0;
    for (let i = 0; i < words.length; i++) {
      for (let j = 0; j < words[i].length; j++) {
        setTimeout(() => {
          setDisplayText((prev) => prev + words[i][j]);
        }, total * 100);
        total++;
      }
      if (i < words.length - 1) {
        setTimeout(() => {
          setDisplayText((prev) => prev + " ");
        }, total * 100);
        total++;
      }
    }
  }, [inView]);

  const splitColoredWords = () => {
    const pieces = displayText.split(" ");
    return pieces.map((word, i) => (
    <span key={i} className={`text-5xl md:text-6xl ${colors[i % colors.length]} mr-4`}>
      {word}
    </span>
  ));
  };

  const [activePanel, setActivePanel] = useState(null);
  const togglePanel = (panel) => {
    setActivePanel((prev) => (prev === panel ? null : panel));
  };

  return (
    <>
      <section
        ref={ref}
        className="relative py-28 md:py-36 flex items-center justify-center bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#1a1a1a] text-white overflow-hidden"
      >
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[20%] left-[25%] w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-[15%] right-[20%] w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <motion.div
          className="relative z-10 text-center max-w-2xl px-8 bg-white/5 backdrop-blur-md rounded-3xl p-10 border border-white/10 shadow-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-5 min-h-[60px]">
            {splitColoredWords()}
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-8">
            My code compiles. My designs don’t lie. <br />
            I build fast, clean, and unreasonably good software.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => togglePanel("services")}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 px-6 py-3 rounded-full text-sm font-medium tracking-wide shadow-lg transition"
            >
              Services I Offer
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => togglePanel("hire")}
              className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 px-6 py-3 rounded-full text-sm font-medium tracking-wide shadow-lg transition"
            >
              Hire Me
            </motion.button>
          </div>
        </motion.div>
      </section>

      <div className="relative z-10 px-6">
        <AnimatePresence mode="wait">
          {activePanel === "services" && (
            <motion.div
              key="services"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto mt-6 bg-[#111] border border-purple-600 text-white p-8 rounded-xl shadow-lg"
            >
              <h2 className="text-2xl font-bold text-purple-400 mb-4">Services I Offer</h2>
              <ul className="grid sm:grid-cols-2 gap-4 text-sm text-gray-300">
                <li>🌐 Full-Stack Web Development</li>
                <li>⚙️ Backend Engineering & RESTful APIs</li>
                <li>🎨 UI/UX Design & Frontend</li>
                <li>📱 Mobile Integration (React Native)</li>
                <li>🔐 Auth & Security (JWT, OAuth)</li>
              </ul>
            </motion.div>
          )}

          {activePanel === "hire" && (
            <motion.div
              key="hire"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto mt-6 bg-[#111] border border-green-600 text-white p-8 rounded-xl shadow-lg"
            >
              <h2 className="text-2xl font-bold text-green-400 mb-4">Hire Me</h2>
              <p className="text-sm text-gray-300 mb-4">
                I’m open to freelance, contract, or full-time work. Global, remote, or on-site — if you're building something impactful, let's build it together.
              </p>
              <a
                href="#contact"
                className="inline-block mt-2 bg-green-600 hover:bg-green-700 px-5 py-2 rounded-full text-sm font-medium transition"
              >
                Contact Me Now →
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
