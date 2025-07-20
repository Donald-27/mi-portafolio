'use client';

import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="bg-[#0d0d0d] text-white py-24 px-6">
      <motion.div
        className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        {/* Profile Photo */}
        <div className="flex-shrink-0">
          <div className="w-48 h-48 rounded-full overflow-hidden bg-black border-4 border-purple-700 shadow-lg">
            <img
              src="/me.jpg"
              alt="Kiprop Donald"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>

        {/* Bio and Extras */}
        <div className="flex-grow space-y-6 max-w-prose text-base md:text-lg">
          <h2 className="text-4xl font-bold text-purple-400">About Me</h2>

          <p className="text-gray-300 leading-relaxed">
            I’m Kiprop Donald, a full-stack software developer from Eldoret Kenya with a strong eye for clean
            design and functional code. I transitioned from Actuarial Science to tech, trained at
            Moringa School, and have since built apps for travel, healthcare, and productivity. I
            thrive on solving real-world problems and am open to global opportunities — remote or
            on-site.
          </p>

          {/* Quote */}
          <blockquote className="italic text-gray-400 border-l-4 border-purple-600 pl-4">
            "I Code by day && Debug by night. Ship meaningful things always."
          </blockquote>

          {/* Interactive Resume + Badges */}
          <div className="flex flex-wrap gap-4 mt-4 items-center">
            <a
              href="/resume.html"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-600 hover:bg-purple-700 transition px-6 py-2 rounded-full text-sm font-semibold"
            >
              View Interactive Resume
            </a>

            <span className="bg-white/10 border border-purple-500 px-3 py-1 rounded-full text-sm">
              Bug Hunter 🐞
            </span>
            <span className="bg-white/10 border border-purple-500 px-3 py-1 rounded-full text-sm">
              Frontend Ninja 💻
            </span>
            <span className="bg-white/10 border border-purple-500 px-3 py-1 rounded-full text-sm">
              Backend Tactician 🧠
            </span>
          </div>

          {/* Journey */}
          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4 text-purple-300">Journey</h3>
            <ul className="space-y-3 text-gray-400 text-sm leading-relaxed">
              <li>
                🚀 I began by teaching myself the fundamentals of coding — building small tools,
                breaking things, and fixing them again.
              </li>
              <li>
                🧠 That curiosity led me to pursue formal training at <strong>Moringa School</strong>,
                where I sharpened my skills in full-stack development.
              </li>
              <li>
                🛠 Since then, I’ve built working apps across sectors — from travel booking platforms
                to hospital systems, productivity tools, and PDF generators.
              </li>
              <li>
                🌍 My projects are practical, people-focused, and open to explore. You can find many of
                them on my{' '}
                <a
                  href="https://github.com/Donald-27"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 underline hover:text-purple-300"
                >
                  GitHub profile
                </a>
                .
              </li>
              <li>
                💡 I learn fast, build with intention, and love crafting smooth user experiences that
                make technology feel effortless.
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
