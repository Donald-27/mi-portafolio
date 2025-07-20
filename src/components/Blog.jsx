'use client';

import { motion } from 'framer-motion';
import { FaExternalLinkAlt } from 'react-icons/fa';

const blogPosts = [
  {
    title: 'From Sick Notes to Emergencies: Building a Full-Stack Healthcare App with Flask & React',
    link: 'https://medium.com/@donnald27/from-sick-notes-to-emergencies-building-a-full-stack-healthcare-app-with-flask-react-7b6e131a58fe',
    summary:
      'How I built a powerful hospital system for doctors and patients using Flask, React, and PDF generation.',
  },
  {
    title: 'From MatatuConnect to Full-Stack Dev: How I Went from Cyber Café to Code',
    link: 'https://medium.com/@donnald27/from-matatuconnect-to-full-stack-dev-how-i-went-from-cyber-café-to-code-083e96c614ea',
    summary:
      'My journey from fixing printers in a cyber café to building production-level travel booking systems.',
  },
  {
    title: '“It Worked in My Head”: A Developer’s Tale',
    link: 'https://medium.com/@donnald27/it-worked-in-my-head-a-developers-tale-2658444c1059',
    summary:
      'A humorous look at debugging, learning from mistakes, and the chaotic beauty of software development.',
  },
];

export default function Blog() {
  return (
    <section id="blog" className="bg-[#0d0d0d] text-white py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-purple-400 mb-12 text-center">Blog Posts</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={index}
              className="bg-[#1a1a1a] p-6 rounded-xl border border-purple-700 shadow-md hover:shadow-purple-800/30 transition-all"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold text-purple-300 mb-3">{post.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{post.summary}</p>
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-purple-500 hover:text-purple-400 text-sm font-medium"
              >
                Read More <FaExternalLinkAlt className="text-xs" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
