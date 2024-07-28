'use client';
import { Link } from 'react-scroll';
import { motion, useAnimation } from 'framer-motion';
import { Box, Button, useTheme } from '@mui/material';
import { useLandingAnimation } from '../server/LandingAboutServer';
import { useEffect } from 'react';

const Landing = () => {
  const theme = useTheme();
  const controls = useAnimation();

  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5, // Delay between children animations
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 50, // Initial position (50px below)
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        type: 'spring',
      },
    },
  };

  useEffect(() => {
    controls.start('visible');
  }, [controls]);

  return (
    <Box
      id='landing'
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%',
        padding: '0 100px',
        [theme.breakpoints.down('md')]: {
          flexDirection: 'column',
          padding: '0 20px',
        },
      }}
    >
      <motion.div
        className='left'
        variants={containerVariants}
        initial='hidden'
        animate={controls}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            height: '100%',
          }}
        >
          <motion.h2 variants={itemVariants} className='intro'>
            Hello, My name is
          </motion.h2>
          <motion.div variants={itemVariants}>
            <Button variant='contained' color='primary'>
              {' '}
              Filler Button{' '}
            </Button>
          </motion.div>
          <motion.h1 variants={itemVariants} className='name'>
            Braxton Mills
          </motion.h1>
          <motion.p variants={itemVariants} className='description'>
            CTO of Atlas Agent
          </motion.p>
          <motion.p variants={itemVariants} className='description'>
            Redefining the real estate industry with cutting-edge AI-driven
            tools.
          </motion.p>
          <motion.p variants={itemVariants} className='description'>
            Developer of innovative QR code-based systems for open house events
            and property listings.
          </motion.p>
        </Box>
      </motion.div>
      <Link to='project' spy={true} smooth={true} offset={-30} duration={500}>
        <Button variant='contained' color='primary'>
          View Projects
        </Button>
      </Link>
    </Box>
  );
};

export default Landing;
