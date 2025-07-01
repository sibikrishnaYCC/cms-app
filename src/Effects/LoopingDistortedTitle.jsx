import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function LoopingDistortedTitle() {
  const titleRef = useRef(null);

  useEffect(() => {
    const title = titleRef.current;

    if (!title) return;

    // Create a looping timeline
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });

    tl.to('.distort feDisplacementMap', {
      duration: 1,
      attr: { scale: 100 },
      ease: 'circ.out'
    })
      .to('.distort feTurbulence', {
        duration: 1,
        attr: { baseFrequency: '2.08 .08' },
        ease: 'circ.out'
      }, '<') // sync start with previous
      .to(title, {
        duration: 1,
        fontVariationSettings: "'wght' 650",
        ease: 'back.out'
      }, '<')
      .to('.distort feDisplacementMap', {
        duration: 1,
        attr: { scale: 0 },
        ease: 'circ.out'
      }, '+=1') // wait 1s before reversing
      .to('.distort feTurbulence', {
        duration: 1,
        attr: { baseFrequency: '2.01 .01' },
        ease: 'circ.out'
      }, '<')
      .to(title, {
        duration: 1,
        fontVariationSettings: "'wght' 700",
        ease: 'back.out'
      }, '<');

    return () => {
      tl.kill(); // clean up on unmount
    };
  }, []);

  return (
    <>
      <svg className="distort" style={{ position: 'absolute', width: 0, height: 0, left: '-9999px' }}>
        <filter id="distortionFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="2.01 .01"
            numOctaves="5"
            seed="2"
            stitchTiles="noStitch"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="0"
            xChannelSelector="R"
            yChannelSelector="B"
          />
        </filter>
      </svg>

      <h1
        ref={titleRef}
        style={{
          filter: 'url(#distortionFilter)',
          fontVariationSettings: "'wght' 700'",
        }}
        className="text-7xl font-bold text-gray-800 mb-4 max-sm:text-5xl"
      >
        Campus Core
      </h1>
    </>
  );
}
