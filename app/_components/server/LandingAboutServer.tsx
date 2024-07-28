'use client';
import { useAnimation } from 'framer-motion';
import { useEffect } from 'react';

export const useLandingAnimation = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start('visible');
  }, [controls]);

  return controls;
};
