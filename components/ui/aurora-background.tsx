import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children?: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <main>
      <div
        className={cn(
          "absolute inset-0 overflow-hidden pointer-events-none z-0",
          className
        )}
        {...props}
      >
        <div
          className={cn(
            `
            [--white-gradient:repeating-linear-gradient(100deg,#FFFFFF_0%,#FFFFFF_7%,transparent_10%,transparent_12%,#FFFFFF_16%)]
            [--aurora:repeating-linear-gradient(100deg,rgba(0,0,0,0.04)_10%,rgba(0,0,0,0.06)_15%,rgba(0,0,0,0.02)_20%,rgba(0,0,0,0.07)_25%,rgba(0,0,0,0.03)_30%)]
            [background-image:var(--white-gradient),var(--aurora)]
            [background-size:300%,_200%]
            [background-position:50%_50%,50%_50%]
            filter blur-[10px]
            after:content-[""] after:absolute after:inset-0 
            after:[background-image:var(--white-gradient),var(--aurora)] 
            after:[background-size:200%,_100%] 
            after:animate-aurora after:[background-attachment:fixed] after:mix-blend-difference
            pointer-events-none
            absolute -inset-[10px] opacity-100 will-change-transform`,
            showRadialGradient &&
              `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]`
          )}
        ></div>
      </div>
      {children}
    </main>
  );
};
