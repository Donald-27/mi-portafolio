'use client';

import { motion } from 'framer-motion';
import { FaReact, FaNode, FaPython, FaDatabase, FaHtml5, FaCss3Alt } from 'react-icons/fa';
import { SiTailwindcss, SiFlask, SiJavascript } from 'react-icons/si';

const skills = [
  { name: 'React', icon: <FaReact className="text-blue-400" /> },
  { name: 'Flask', icon: <SiFlask className="text-gray-300" /> },
  { name: 'SQLAlchemy', icon: <FaDatabase className="text-red-400" /> },
  { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-teal-400" /> },
  { name: 'Node.js', icon: <FaNode className="text-green-300" /> },
  { name: 'Python', icon: <FaPython className="text-yellow-400" /> },
  {
    name: 'And of course the core Web Foundations',
    icon: (
      <div className="flex items-center gap-2">
        <FaHtml5 className="text-orange-500 text-xl" />
        <FaCss3Alt className="text-blue-500 text-xl" />
        <SiJavascript className="text-yellow-400 text-xl" />
      </div>
    ),
  },
];

export default function Skills() {
  return (
    <section id="skills" className="bg-[#0d0d0d] text-white py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-purple-400 mb-12">Skills & Tools</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center bg-[#1a1a1a] p-6 rounded-lg border border-purple-600 hover:scale-105 transition"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl mb-2">{skill.icon}</div>
              <p className="text-sm text-gray-300 text-center">{skill.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
