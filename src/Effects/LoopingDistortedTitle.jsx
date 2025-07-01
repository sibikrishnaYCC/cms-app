import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * @param {boolean} isAnimating - whether the animation is running
 */
export default function LoopingDistortedTitle({ isAnimating = false }) {
  const titleRef = useRef(null);
  const tlRef = useRef(null); // Store the timeline for control

  useEffect(() => {
    const title = titleRef.current;
    if (!title) return;

    // Create the timeline once
    const tl = gsap.timeline({
      paused: !isAnimating,
      repeat: -1,
      repeatDelay: 2,
    });

    tl.to(".distort feDisplacementMap", {
      duration: 1,
      attr: { scale: 100 },
      ease: "circ.out",
    })
      .to(
        ".distort feTurbulence",
        {
          duration: 1,
          attr: { baseFrequency: "2.08 .08" },
          ease: "circ.out",
        },
        "<"
      )
      .to(
        title,
        {
          duration: 1,
          fontVariationSettings: "'wght' 650",
          ease: "back.out",
        },
        "<"
      )
      .to(".distort feDisplacementMap", {
        duration: 1,
        attr: { scale: 0 },
        ease: "circ.out",
      }, "+=1")
      .to(
        ".distort feTurbulence",
        {
          duration: 1,
          attr: { baseFrequency: "2.01 .01" },
          ease: "circ.out",
        },
        "<"
      )
      .to(
        title,
        {
          duration: 1,
          fontVariationSettings: "'wght' 700",
          ease: "back.out",
        },
        "<"
      );

    tlRef.current = tl;

    return () => tl.kill(); // Clean up on unmount
  }, []);

  // React to animation toggle
  useEffect(() => {
    if (!tlRef.current) return;
    isAnimating ? tlRef.current.play() : tlRef.current.pause();
  }, [isAnimating]);

  return (
    <>
      {/* Hidden filter defs */}
      <svg
        className="distort"
        style={{ position: "absolute", width: 0, height: 0, left: "-9999px" }}
      >
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

      {/* The animated title */}
      <h1
        ref={titleRef}
        style={{
          filter: "url(#distortionFilter)",
          fontVariationSettings: "'wght' 700'",
        }}
        className="text-7xl font-bold py-2 max-sm:text-5xl"
      >
        Campus Core
      </h1>
    </>
  );
}
