'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import DrawSVGPlugin from 'gsap/DrawSVGPlugin';

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

const Line = (props: LineProps) => {
  const lineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const line = lineRef.current;

    if (line) {
      gsap.set(line, { attr: { stroke: props.startColor } });

      gsap
        .timeline({
          defaults: { duration: 2 },
          repeat: -1,
          repeatDelay: (27 - props.delay) / 25,
        })
        .to(
          line,
          {
            duration: 4,
            attr: { stroke: props.endColor },
            ease: 'power2.inOut',
          },
          0
        )
        .fromTo(
          line,
          { drawSVG: 0 },
          { drawSVG: '35% 70%', ease: 'sine.in', duration: 2 },
          props.delay / 25
        )
        .to(
          line,
          { drawSVG: '100% 100%', ease: 'sine.out', duration: 2 },
          2 + props.delay / 25
        )
        .progress(props.delay / 20);
    }
  }, [props.startColor, props.endColor, props.delay]);

  return <path ref={lineRef} className={props.className} d={props.pathData} />;
};

export default Line;
