'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const moveCursor = (e) => {
      const { clientX, clientY } = e;
      if (cursorRef.current) {
        cursorRef.current.style.left = clientX + 'px';
        cursorRef.current.style.top = clientY + 'px';
      }
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed z-[9999] pointer-events-none w-5 h-5 bg-purple-500 rounded-full opacity-60 transition-all duration-100 ease-out"
      style={{ transform: 'translate(-50%, -50%)' }}
    />
  );
}
