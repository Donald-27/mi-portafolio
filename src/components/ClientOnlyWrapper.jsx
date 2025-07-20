'use client';

import { useEffect, useState } from 'react';
import CustomCursor from '@/components/CustomCursor';

export default function ClientOnlyWrapper({ children }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Set to true after component mounts (client only)
    setIsClient(true);
  }, []);

  if (!isClient) return null; // Avoid rendering until on client

  return (
    <>
      <CustomCursor />
      {children}
    </>
  );
}
