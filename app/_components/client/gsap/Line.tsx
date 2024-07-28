'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { DrawSVGPlugin } from 'gsap-trial/DrawSVGPlugin';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(DrawSVGPlugin);
}

type LineProps = {
  pathData: string;
  startColor: string;
  endColor: string;
  delay: number;
  className: string;
};

const Line = ({
  pathData,
  startColor,
  endColor,
  delay,
  className,
}: LineProps) => {
  const lineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const line = lineRef.current;
    let strokeWidth: number;

    if (line) {
      switch (className) {
        case 'line1':
          strokeWidth = 6;
          break;
        case 'line2':
          strokeWidth = 50;
          break;
        case 'line3':
          strokeWidth = 20;
          break;
        default:
          strokeWidth = 6; // Default stroke width
      }

      gsap.set(line, {
        attr: { stroke: startColor, 'stroke-width': strokeWidth },
      });

      gsap
        .timeline({
          defaults: { duration: 2 },
          repeat: -1,
          repeatDelay: (27 - delay) / 25,
        })
        .to(
          line,
          {
            duration: 4,
            attr: { stroke: endColor },
            ease: 'power2.inOut',
          },
          0
        )
        .fromTo(
          line,
          { drawSVG: 0 },
          { drawSVG: '35% 70%', ease: 'sine.in', duration: 2 },
          delay / 25
        )
        .to(
          line,
          { drawSVG: '100% 100%', ease: 'sine.out', duration: 2 },
          2 + delay / 25
        )
        .progress(delay / 20);
    }
  }, [startColor, endColor, delay, className]);

  return <path ref={lineRef} className={className} d={pathData} />;
};

export default Line;
