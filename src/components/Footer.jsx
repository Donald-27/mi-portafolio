'use client';

import { FaArrowUp } from 'react-icons/fa';

export default function Footer() {
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#0a0a0a] text-gray-400 py-10 px-6 border-t border-purple-900">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} Kiprop Donald. Built with ❤️ using Next.js & Tailwind.
        </p>

        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 text-purple-400 hover:text-purple-600 transition text-sm"
        >
          <FaArrowUp />
          <span>Back to top</span>
        </button>
      </div>
    </footer>
  );
}
