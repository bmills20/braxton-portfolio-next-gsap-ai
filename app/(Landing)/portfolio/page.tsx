import { Container, Typography, Button, Box } from '@mui/material';
import { motion } from 'framer-motion';

const Portfolio = () => {
  return (
    <Container maxWidth='md' style={{ textAlign: 'center', marginTop: '4rem' }}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant='h2' component='h1' gutterBottom>
          My Portfolio
        </Typography>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Typography variant='body1' paragraph>
          Welcome to my portfolio. Here you will find my projects and contact
          information.
        </Typography>
      </motion.div>
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Button variant='contained' color='primary'>
          Contact Me
        </Button>
      </motion.div>
    </Container>
  );
};

export default Portfolio;
