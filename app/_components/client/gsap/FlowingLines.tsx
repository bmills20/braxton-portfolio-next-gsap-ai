'use client';
import React from 'react';
import { svgPaths } from './svgPaths';
import Line from './Line';

const FlowingLines = () => {
  const pastelColors = [
    'hsl(25, 100%, 85%)', // Pastel Orange
    'hsl(55, 100%, 85%)', // Pastel Yellow
    'hsl(145, 100%, 85%)', // Pastel Green
    'hsl(195, 100%, 85%)', // Pastel Blue
    'hsl(275, 100%, 85%)', // Pastel Purple
    'hsl(350, 100%, 85%)', // Pastel Pink
  ];

  return (
    <div className='relative w-full h-screen overflow-hidden bg-gray-100'>
      <div className='absolute inset-0 backdrop-filter backdrop-blur-sm'></div>
      <svg
        className='absolute inset-0 w-full h-full'
        version='1.1'
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
        viewBox='0 0 1200 900'
        fill='none'
      >
        {svgPaths.map((path, i) => (
          <React.Fragment key={i}>
            <Line
              pathData={path}
              startColor={pastelColors[i % pastelColors.length]}
              endColor={pastelColors[(i + 1) % pastelColors.length]}
              delay={i}
              className={`line line${(i % 3) + 1}`}
            />
          </React.Fragment>
        ))}
      </svg>
    </div>
  );
};

export default FlowingLines;
