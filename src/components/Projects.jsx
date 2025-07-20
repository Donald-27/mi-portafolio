'use client';

import FadeInWhenVisible from '@/components/FadeInWhenVisible';
import { motion } from 'framer-motion';

const projects = [
  {
    title: 'MatatuConnekt',
    description:
      'A travel booking platform for matatus and buses across Kenya. Includes real-time vehicle registration, trip planning, and user-friendly booking flow.',
    live: 'https://relaxed-cuchufli-e6b142.netlify.app',
    github: 'https://github.com/Donald-27',
    tags: ['React', 'Tailwind', 'MongoDB', 'UI/UX'],
  },
  {
    title: 'VirtualCare (Patient)',
    description:
      'A full hospital website where patients can explore services, view departments, and book care seamlessly across responsive devices.',
    live: 'https://ephemeral-snickerdoodle-b34edb.netlify.app/',
    github: 'https://github.com/Donald-27',
    tags: ['React', 'Healthcare', 'Routing', 'Design'],
  },
  {
    title: 'VirtualCare (Doctor)',
    description:
      'Doctor dashboard to manage appointments, emergencies, and daily cases in real-time. Includes PDF reports and scheduling tools.',
    live: 'https://virtual-care-doctors.netlify.app/',
    github: 'https://github.com/Donald-27',
    tags: ['React', 'PDF', 'Dashboard', 'Admin'],
  },
  {
    title: 'Doctor Notes Generator',
    description:
      'Generate downloadable, realistic doctor notes with logos, stamps, watermarks, and signatures. Great for hospitals and clinics.',
    live: 'https://doctor-notes-generator.netlify.app/',
    github: 'https://github.com/Donald-27',
    tags: ['React', 'PDF', 'Tailwind', 'Form Generator'],
  },
  {
    title: 'LateShow',
    description:
      'App to list and schedule upcoming shows. Perfect for cinemas, events, or streaming hubs. Real-time listings and show times.',
    live: 'https://lateshow.netlify.app/',
    github: 'https://github.com/Donald-27',
    tags: ['React', 'Entertainment', 'UI', 'Tailwind'],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="bg-[#111] text-white py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <FadeInWhenVisible>
          <h2 className="text-4xl font-bold text-purple-400 mb-12 text-center">Featured Projects</h2>
        </FadeInWhenVisible>

        <div className="grid md:grid-cols-2 gap-10">
          {projects.map((project, index) => (
            <FadeInWhenVisible key={index} delay={index * 0.1}>
              <div className="bg-[#1a1a1a] p-6 rounded-xl border border-purple-800 shadow-lg hover:shadow-purple-800/40 hover:scale-[1.01] transition duration-300 ease-in-out">
                <h3 className="text-2xl font-semibold text-purple-300 mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs bg-white/10 border border-purple-600 px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-purple-600 hover:bg-purple-700 text-sm px-4 py-2 rounded-full transition"
                  >
                    Live Site
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-purple-600 text-sm px-4 py-2 rounded-full hover:bg-purple-900 transition"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </section>
  );
}
