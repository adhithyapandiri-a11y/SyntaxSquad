"use client";

import React from "react";
import { BackgroundPaperShaders } from "@/components/ui/background-paper-shaders";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Sparkles, ArrowRight, Layers, Shield, Zap } from "lucide-react";

export default function PaperShadersDemo() {
  return (
    <div className="min-h-screen w-full bg-slate-950 flex flex-col items-center justify-center p-4 md:p-8">
      {/* Container Card with Motion Paper Shader Background */}
      <div className="relative w-full max-w-5xl h-[650px] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
        <BackgroundPaperShaders className="flex flex-col items-center justify-center text-center p-6 md:p-12">
          
          {/* Overlay Dark Blur Gradient for perfect contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent pointer-events-none" />

          {/* Centered Hero Content */}
          <div className="relative z-20 max-w-3xl flex flex-col items-center gap-6">
            
            <Badge variant="outline" className="px-4 py-1.5 rounded-full border-slate-700 bg-slate-900/80 backdrop-blur-md text-slate-300 text-xs tracking-wide uppercase flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Motion Paper Shader
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white font-sans drop-shadow-md leading-tight">
              Silky Liquid Paper Motion Shader
            </h1>

            <p className="text-base md:text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
              Dynamic WebGL domain-warping liquid shader inspired by organic paper folds, custom lighting gleams, and interactive fluid motion.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
              <Button size="lg" className="rounded-xl bg-white text-slate-950 hover:bg-slate-200 font-semibold px-6 py-3 flex items-center gap-2 transition-all shadow-lg hover:shadow-white/20">
                Explore Shaders <ArrowRight className="w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-xl border-slate-700 bg-slate-900/60 backdrop-blur-md text-white hover:bg-slate-800/80 px-6 py-3">
                Documentation
              </Button>
            </div>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-8">
              <Card className="p-4 bg-slate-900/50 backdrop-blur-md border-slate-800/80 text-left hover:border-slate-700 transition-all">
                <Layers className="w-5 h-5 text-sky-400 mb-2" />
                <h3 className="text-sm font-semibold text-white">WebGL Simplex Noise</h3>
                <p className="text-xs text-slate-400 mt-1">Real-time domain-warped fluid algorithm running smoothly on GPU.</p>
              </Card>

              <Card className="p-4 bg-slate-900/50 backdrop-blur-md border-slate-800/80 text-left hover:border-slate-700 transition-all">
                <Zap className="w-5 h-5 text-amber-400 mb-2" />
                <h3 className="text-sm font-semibold text-white">Ultra Lightweight</h3>
                <p className="text-xs text-slate-400 mt-1">Includes IntersectionObserver offscreen frame pausing and DPR caps.</p>
              </Card>

              <Card className="p-4 bg-slate-900/50 backdrop-blur-md border-slate-800/80 text-left hover:border-slate-700 transition-all">
                <Shield className="w-5 h-5 text-emerald-400 mb-2" />
                <h3 className="text-sm font-semibold text-white">Interactive Motion</h3>
                <p className="text-xs text-slate-400 mt-1">Displaces liquid lighting relative to mouse cursor movements.</p>
              </Card>
            </div>

          </div>
        </BackgroundPaperShaders>
      </div>
    </div>
  );
}
