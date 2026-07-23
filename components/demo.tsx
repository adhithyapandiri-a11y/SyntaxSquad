"use client";

import React from "react";
import { motion } from "framer-motion";
import AuroraBackground from "@/components/ui/aurora-background-1";

const DemoOne = () => {
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col items-center justify-center gap-4 px-4"
      >
        <div className="text-center text-3xl font-thin md:text-7xl dark:text-white">
          Aurora Background
        </div>
        <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
          A new, unique, and mesmerizing animated background effect.
        </div>
        <button className="rounded-full bg-black w-fit px-4 py-2 text-white dark:bg-white dark:text-black">
          Explore
        </button>
      </motion.div>
    </AuroraBackground>
  );
};

export default DemoOne;
