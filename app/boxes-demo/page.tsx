"use client";

import React from "react";
import { Boxes } from "@/components/ui/background-boxes";
import { cn } from "@/lib/utils";

export default function BackgroundBoxesDemo() {
  return (
    <div className="h-[500px] relative w-full overflow-hidden bg-slate-950 flex flex-col items-center justify-center rounded-lg border border-slate-800">
      <div className="absolute inset-0 w-full h-full bg-slate-950 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      <Boxes />

      <h1 className={cn("md:text-4xl text-xl text-white relative z-20 font-bold tracking-tight text-center")}>
        Interactive Grid Background
      </h1>
      <p className="text-center mt-2 text-slate-400 relative z-20 text-sm max-w-md mx-auto px-4">
        Hover over the skewed matrix blocks to trigger custom glowing color transitions.
      </p>
    </div>
  );
}
