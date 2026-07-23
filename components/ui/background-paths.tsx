"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function FloatingPaths({ position }: { position: number }) {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!mounted) return null;

  const numPaths = isMobile ? 12 : 20;
  const paths = Array.from({ length: numPaths }, (_, i) => {
    const width = isMobile ? 400 : 800;
    const startY = (i / numPaths) * 1200 - 200; // Spread vertically
    const curve1X = width * 0.4 + Math.random() * (width * 0.2);
    const curve1Y = startY + (Math.random() * 200 - 100);
    const curve2X = width * 0.6 + Math.random() * (width * 0.2);
    const curve2Y = startY + (Math.random() * 200 - 100);
    const endY = startY + (Math.random() * 300 - 150);

    return `M0,${startY} C${curve1X},${curve1Y} ${curve2X},${curve2Y} ${width},${endY}`;
  });

  return (
    <div
      className={`absolute inset-y-0 ${
        position === 1 ? "left-0" : "right-0"
      } w-full md:w-1/2 pointer-events-none flex items-center justify-center`}
      style={{ transform: "translateZ(0)" }} // Force GPU to fix Lenis scroll glitch
    >
      <svg
        className={`w-full h-full ${
          position === -1 ? "scale-x-[-1]" : ""
        }`}
        viewBox={`0 0 ${isMobile ? 400 : 800} 1000`}
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {paths.map((path, index) => {
          const duration = 20 + Math.random() * 20; // 20-40 seconds for continuous flow
          const dashLength = 200 + Math.random() * 300;
          const dashGap = 200 + Math.random() * 300;
          const totalDash = dashLength + dashGap;

          return (
            <motion.path
              key={index}
              d={path}
              stroke="#0A0A0A"
              strokeWidth={Math.random() * 1 + 0.5} // 0.5 - 1.5px
              strokeOpacity={Math.random() * 0.15 + 0.1} // 0.1 - 0.25 opacity
              initial={{ strokeDasharray: `${dashLength} ${dashGap}`, strokeDashoffset: 0 }}
              animate={{
                strokeDashoffset: -totalDash,
              }}
              transition={{
                duration: duration,
                ease: "linear",
                repeat: Infinity,
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}

export function BackgroundPaths() {
  return (
    <div 
      className="absolute inset-0 overflow-hidden pointer-events-none z-1"
      style={{
        maskImage: "radial-gradient(circle at center, black, transparent 80%)",
        WebkitMaskImage: "radial-gradient(circle at center, black, transparent 80%)",
        transform: "translateZ(0)" // Fix scroll glitching
      }}
    >
      <FloatingPaths position={1} />
      <FloatingPaths position={-1} />
    </div>
  );
}
