'use client';
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap-trial';
import { Observer } from 'gsap-trial/Observer';
import { SplitText } from 'gsap-trial/SplitText';
import { Box, Button, SxProps, Theme } from '@mui/material';
import image1 from '@/public/photos/photo1.jpg';
import image2 from '@/public/photos/photo2.jpg';
import image3 from '@/public/photos/photo3.jpg';
import image4 from '@/public/photos/photo4.jpg';
import image5 from '@/public/photos/photo5.jpg';

gsap.registerPlugin(Observer, SplitText);

interface SectionRefs {
  section: HTMLElement | null;
  outer: HTMLElement | null;
  inner: HTMLElement | null;
  image: HTMLElement | null;
  heading: HTMLElement | null;
}

const Landing = () => {
  const sectionsRef = useRef<SectionRefs[]>([]);
  const backgroundImages = [image1, image2, image3, image4, image5];

  useEffect(() => {
    let currentIndex = -1;
    const sections = sectionsRef.current
      .map((refs) => refs.section)
      .filter(Boolean) as HTMLElement[];
    const images = sectionsRef.current
      .map((refs) => refs.image)
      .filter(Boolean) as HTMLElement[];
    const headings = sectionsRef.current
      .map((refs) => refs.heading)
      .filter(Boolean) as HTMLElement[];
    const outerWrappers = sectionsRef.current
      .map((refs) => refs.outer)
      .filter(Boolean) as HTMLElement[];
    const innerWrappers = sectionsRef.current
      .map((refs) => refs.inner)
      .filter(Boolean) as HTMLElement[];

    const splitHeadings = headings.map(
      (heading) =>
        new SplitText(heading, {
          type: 'chars,words,lines',
          linesClass: 'clip-text',
        })
    );

    gsap.set(outerWrappers, { yPercent: 100 });
    gsap.set(innerWrappers, { yPercent: -100 });

    const gotoSection = (index: number, direction: number): void => {
      index = gsap.utils.wrap(0, sections.length, index);
      const fromTop = direction === -1;
      const dFactor = fromTop ? -1 : 1;
      const tl = gsap.timeline({
        defaults: { duration: 1.25, ease: 'power1.inOut' },
        onComplete: (): void => {
          animating = false;
        },
      });

      if (currentIndex >= 0) {
        gsap.set(sections[currentIndex], { zIndex: 0 });
        tl.to(images[currentIndex], { yPercent: -15 * dFactor }).set(
          sections[currentIndex],
          { autoAlpha: 0 }
        );
      }

      gsap.set(sections[index], { autoAlpha: 1, zIndex: 1 });
      tl.fromTo(
        [outerWrappers[index], innerWrappers[index]],
        { yPercent: (i: number) => (i ? -100 * dFactor : 100 * dFactor) },
        { yPercent: 0 },
        0
      )
        .fromTo(images[index], { yPercent: 15 * dFactor }, { yPercent: 0 }, 0)
        .fromTo(
          splitHeadings[index].chars,
          { autoAlpha: 0, yPercent: 150 * dFactor },
          {
            autoAlpha: 1,
            yPercent: 0,
            duration: 1,
            ease: 'power2',
            stagger: { each: 0.02, from: 'random' },
          },
          0.2
        );

      currentIndex = index;
    };

    let animating = false;
    Observer.create({
      type: 'wheel,touch,pointer',
      wheelSpeed: -1,
      onDown: () => !animating && gotoSection(currentIndex - 1, -1),
      onUp: () => !animating && gotoSection(currentIndex + 1, 1),
      tolerance: 10,
      preventDefault: true,
    });

    gotoSection(0, 1);

    return () => {
      splitHeadings.forEach((split) => split.revert());
    };
  }, []);

  const sectionStyle: SxProps<Theme> = {
    height: '100vh',
    width: '100vw',
    top: 0,
    position: 'fixed',
    visibility: 'hidden',
  };

  const bgStyle = (imageUrl: string): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage: `url(${imageUrl})`,
  });

  const imageStyle: SxProps<Theme> = {
    objectFit: 'cover',
    objectPosition: 'center',
  };

  const headingStyle: React.CSSProperties = {
    fontSize: 'clamp(1rem, 5vw, 5rem)',
    fontWeight: 400,
    textAlign: 'center',
    letterSpacing: '0.5em',
    marginRight: '-0.5em',
    color: 'hsl(0, 0%, 80%)',
    width: '90vw',
    maxWidth: '1200px',
  };

  const createSectionRefs =
    (index: number) => (element: HTMLElement | null) => {
      if (element) {
        sectionsRef.current[index] = sectionsRef.current[index] || {};
        const className = element.className;
        if (
          className.includes('MuiBox-root') &&
          !className.includes('outer') &&
          !className.includes('inner')
        ) {
          sectionsRef.current[index].section = element;
        } else if (className.includes('outer')) {
          sectionsRef.current[index].outer = element;
        } else if (className.includes('inner')) {
          sectionsRef.current[index].inner = element;
        } else if (element.tagName.toLowerCase() === 'h2') {
          sectionsRef.current[index].heading = element;
        } else {
          sectionsRef.current[index].image = element;
        }
      }
    };

  return (
    <>
      <Box
        component='header'
        sx={{
          position: 'fixed',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 5%',
          width: '100%',
          zIndex: 3,
          height: '7em',
          fontFamily: '"Bebas Neue", sans-serif',
          fontSize: 'clamp(0.66rem, 2vw, 1rem)',
          letterSpacing: '0.5em',
        }}
      >
        <div>Braxton Mills</div>
        <div>
          <Button variant='contained' color='primary'>
            View Projects
          </Button>
        </div>
      </Box>
      {[
        'Hello, My name is',
        'Braxton Mills',
        'CTO of Atlas Agent',
        'Redefining real estate with AI',
        'Innovative QR systems',
      ].map((text, index) => (
        <Box
          key={index}
          component='section'
          ref={createSectionRefs(index)}
          sx={{
            ...sectionStyle,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 5%',
            maxWidth: '100vw',
            width: '100vw',
          }}
        >
          <Box
            className='outer'
            ref={createSectionRefs(index)}
            sx={{ width: '100%', height: '100%', position: 'relative' }}
          >
            <Box
              className='inner'
              sx={{ width: '100%', height: '100%', position: 'relative' }}
              ref={createSectionRefs(index)}
            >
              <Image
                src={backgroundImages[index]}
                alt={`Background ${index + 1}`}
                fill
                sizes='100vw'
                priority={index === 0}
                ref={createSectionRefs(index)}
                style={imageStyle as React.CSSProperties}
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <h2 ref={createSectionRefs(index)} style={headingStyle}>
                  {text}
                </h2>
              </Box>
            </Box>
          </Box>
        </Box>
      ))}
    </>
  );
};

export default Landing;
