"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface BackgroundBoxesProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  rowsCount?: number;
  colsCount?: number;
}

export const BoxesCore = ({
  className,
  rowsCount = 50,
  colsCount = 30,
  ...rest
}: BackgroundBoxesProps) => {
  const rows = React.useMemo(() => new Array(rowsCount).fill(1), [rowsCount]);
  const cols = React.useMemo(() => new Array(colsCount).fill(1), [colsCount]);

  const colors = [
    "#38bdf8", // sky-400
    "#f472b6", // pink-400
    "#4ade80", // green-400
    "#facc15", // yellow-400
    "#f87171", // red-400
    "#c084fc", // purple-400
    "#60a5fa", // blue-400
    "#818cf8", // indigo-400
    "#a78bfa", // violet-400
  ];

  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div
      style={{
        transform: `translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)`,
      }}
      className={cn(
        "absolute left-1/4 p-4 -top-1/4 flex -translate-x-1/2 -translate-y-1/2 w-full h-full z-0 pointer-events-auto",
        className
      )}
      {...rest}
    >
      {rows.map((_, i) => (
        <motion.div
          key={`row-${i}`}
          className="w-16 h-8 border-l border-slate-700/40 relative"
        >
          {cols.map((_, j) => (
            <motion.div
              whileHover={{
                backgroundColor: getRandomColor(),
                transition: { duration: 0 },
              }}
              animate={{
                transition: { duration: 2 },
              }}
              key={`col-${j}`}
              className="w-16 h-8 border-r border-t border-slate-700/40 relative transition-colors duration-500"
            >
              {j % 2 === 0 && i % 2 === 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="absolute h-6 w-6 -top-[14px] -left-[14px] text-slate-700/50 pointer-events-none"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m6-6H6"
                  />
                </svg>
              ) : null}
            </motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

export const Boxes = React.memo(BoxesCore);
export default Boxes;
