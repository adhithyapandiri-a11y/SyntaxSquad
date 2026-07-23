"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";

export interface BackgroundPaperShadersProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  speed?: number;
  contrast?: number;
  ambientLight?: number;
  mouseInteraction?: boolean;
}

export const BackgroundPaperShaders: React.FC<BackgroundPaperShadersProps> = ({
  className,
  speed = 0.4,
  contrast = 1.2,
  ambientLight = 0.5,
  mouseInteraction = true,
  children,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const targetMouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    let animFrameId: number;
    let isVisible = true;

    // ThreeJS Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "low-power",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Custom Simplex Noise + Fluid Domain Warping Fragment Shader
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec2 uMouse;
      uniform float uSpeed;
      uniform float uContrast;
      varying vec2 vUv;

      // 2D Simplex Noise generator
      vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                 -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod(i, 289.0);
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ) );
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m ;
        m = m*m ;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      // Fractional Brownian Motion for fluid paper silk waves
      float fbm(vec2 p) {
        float val = 0.0;
        float amp = 0.5;
        float freq = 1.0;
        for (int i = 0; i < 4; i++) {
          val += amp * snoise(p * freq);
          freq *= 2.0;
          amp *= 0.5;
        }
        return val;
      }

      void main() {
        vec2 st = vUv;
        st.x *= uResolution.x / uResolution.y;

        float time = uTime * uSpeed;

        // Fluid Domain Warping
        vec2 q = vec2(0.0);
        q.x = fbm(st + 0.1 * time);
        q.y = fbm(st + vec2(1.0));

        vec2 r = vec2(0.0);
        r.x = fbm(st + 1.0 * q + vec2(1.7, 9.2) + 0.15 * time);
        r.y = fbm(st + 1.0 * q + vec2(8.3, 2.8) + 0.126 * time);

        // Mouse displacement influence
        vec2 mEffect = (uMouse - 0.5) * 0.15;
        r += mEffect;

        float f = fbm(st + r * 2.0);

        // Monochromatic Paper Dark Palette (matching sample image)
        vec3 darkBg = vec3(0.04, 0.04, 0.06);     // #0a0a0f
        vec3 midTone = vec3(0.12, 0.12, 0.15);    // #1e1e26
        vec3 lightCurve = vec3(0.65, 0.65, 0.70); // #a6a6b3
        vec3 highlight = vec3(0.95, 0.95, 0.98);  // #f2f2f9 bottom-right gleam

        // Blend color maps with exponential curve gradient
        vec3 color = mix(darkBg, midTone, clamp(f * f * 4.0, 0.0, 1.0));
        color = mix(color, lightCurve, clamp(pow(f, 3.0) * uContrast, 0.0, 1.0));

        // Soft bottom-right radial highlight matching the image
        float distBR = length(vUv - vec2(0.85, 0.05));
        float gleam = exp(-distBR * 2.2);
        color = mix(color, highlight, gleam * 0.75 * f);

        // Subtle dark vignette around edges
        float vignette = 1.0 - length(vUv - 0.5) * 0.7;
        color *= clamp(vignette, 0.2, 1.0);

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uSpeed: { value: speed },
      uContrast: { value: contrast },
    };

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      uniforms.uResolution.value.set(width, height);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!mouseInteraction) return;
      const rect = container.getBoundingClientRect();
      targetMouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: 1.0 - (e.clientY - rect.top) / rect.height,
      };
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    window.addEventListener("resize", handleResize);
    if (mouseInteraction) {
      container.addEventListener("mousemove", handleMouseMove);
    }
    const startTime = performance.now();

    const animate = () => {
      if (isVisible) {
        const elapsedTime = (performance.now() - startTime) / 1000;
        uniforms.uTime.value = elapsedTime;

        // Smoothly lerp mouse movement
        mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.05;
        mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.05;
        uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y);

        renderer.render(scene, camera);
      }
      animFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameId);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      if (mouseInteraction && container) {
        container.removeEventListener("mousemove", handleMouseMove);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [speed, contrast, mouseInteraction]);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full h-full overflow-hidden bg-slate-950", className)}
      {...props}
    >
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
};

export default BackgroundPaperShaders;
