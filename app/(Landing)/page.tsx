import { Inter } from 'next/font/google';
import styles from '@/app/_styles/page.module.css';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Preloader from '@/app/_components/server/Preloader';
import LandingAboutClient from '@/app/_components/client/LandingAboutClient';
import FlowingLines from '../_components/client/gsap/FlowingLines';
// import NavBar from '@/app/_components/NavBar/NavBar';
// import Social from '@/app/_components/Social/Social';
// import Landing from '@/app/_components/Landing/Landing';
// import ProjectList from '@/app/_components/ProjectList/ProjectList';
// import About from '@/app/_components/About/About';
// import Contact from '@/app/_components/Contact/Contact';

const inter = Inter({ subsets: ['latin'] });
const PreloaderClient = dynamic(
  () => import('@/app/_components/client/PreloaderClient'),
  {
    ssr: false,
  }
);

export default function App() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between ${styles.className} ${inter.className}`}
    >
      <div id='root'>
        <div className={styles.container}>
          <LandingAboutClient />
          <FlowingLines />
        </div>
      </div>
    </main>
  );
}
