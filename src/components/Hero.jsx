'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative py-24 md:py-32 flex items-center justify-center bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#1a1a1a] text-white overflow-hidden">
      {/* Background animated circles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500 opacity-20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 opacity-20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Hero Content */}
      <motion.div
        className="relative z-10 text-center max-w-2xl px-4 backdrop-blur-md bg-white/5 rounded-2xl p-8 border border-white/10 shadow-xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight mb-4">
          Hi, I'm <span className="text-purple-400">Kiprop Donald</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-6">
          My code compiles. My designs don’t lie. <br />
          I build fast, clean, and unreasonably good software.
        </p>
        <a
          href="#projects"
          className="inline-block mt-4 text-sm uppercase tracking-widest bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-full transition duration-300"
        >
          View My Work
        </a>
      </motion.div>
    </section>
  );
}
