import projects from '@/data/projects';
import Link from 'next/link';

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default function ProjectPage({ params }) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) return <div className="text-white p-10">Project not found</div>;

  return (
    <main className="bg-[#0d0d0d] text-white min-h-screen px-6 py-24">
      <div className="max-w-3xl mx-auto space-y-10">
        <h1 className="text-4xl font-bold text-purple-400">{project.title}</h1>
        <p className="text-lg text-gray-300">{project.description}</p>
        <p className="text-md text-gray-400 whitespace-pre-line">{project.details}</p>

        <div className="flex flex-wrap gap-3">
          {project.tech.map((t, i) => (
            <span
              key={i}
              className="bg-purple-700/30 border border-purple-500 text-sm px-3 py-1 rounded-full"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex gap-4">
          <a
            href={project.live}
            target="_blank"
            className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-full"
          >
            Visit Site
          </a>
          <a
            href={project.github}
            target="_blank"
            className="border border-purple-600 px-6 py-2 rounded-full hover:bg-purple-800"
          >
            GitHub
          </a>
        </div>

        <Link href="/" className="text-purple-400 underline text-sm">
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}
