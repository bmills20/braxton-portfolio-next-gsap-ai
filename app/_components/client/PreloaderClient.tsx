'use client';

import { useEffect, useState } from 'react';
import Preloader from '@/app/_components/server/Preloader';

const PreloaderClient = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulate a 2-second loading time

    return () => clearTimeout(timer); // Clear timeout on component unmount
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return <div></div>;
};

export default PreloaderClient;
