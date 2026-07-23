"use client";

import RippleGrid from "@/components/ui/ripple-grid";

export default function RippleGridDemo() {
  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-xl border border-slate-800 bg-slate-950 flex items-center justify-center">
      <RippleGrid
        enableRainbow={false}
        gridColor="#3b82f6"
        rippleIntensity={0.05}
        gridSize={10}
        gridThickness={15}
        mouseInteraction={true}
        mouseInteractionRadius={1.2}
        opacity={0.8}
      />
      <div className="absolute z-10 text-center pointer-events-none p-6">
        <h2 className="text-3xl font-bold text-white tracking-tight">Ripple Grid Component</h2>
        <p className="text-slate-400 mt-2 text-sm max-w-md mx-auto">
          Hover or move your cursor over the grid to interact with the WebGL interactive wave effect.
        </p>
      </div>
    </div>
  );
}
