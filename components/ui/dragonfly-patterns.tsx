"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function DragonflyGrid({ className }: { className?: string }) {
  return (
    <div 
      className={cn(
        "absolute inset-0 -z-10 overflow-hidden",
        className
      )}
    >
      <div className="absolute inset-0 bg-hexagonal opacity-20" />
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-dragonfly-primary/5 via-transparent to-dragonfly-secondary/5"
        animate={{
          background: [
            "linear-gradient(to bottom right, var(--dragonfly-primary) 0%, transparent 50%, var(--dragonfly-secondary) 100%)",
            "linear-gradient(to bottom right, var(--dragonfly-secondary) 0%, transparent 50%, var(--dragonfly-primary) 100%)",
            "linear-gradient(to bottom right, var(--dragonfly-primary) 0%, transparent 50%, var(--dragonfly-secondary) 100%)",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          opacity: 0.1,
        }}
      />
    </div>
  );
}

export function DragonflyWings({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      className={cn(
        "absolute inset-0 h-full w-full",
        className
      )}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="wing-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--dragonfly-primary)" stopOpacity="0.2" />
          <stop offset="50%" stopColor="var(--dragonfly-secondary)" stopOpacity="0.1" />
          <stop offset="100%" stopColor="var(--dragonfly-accent)" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      
      {/* Left wing pattern */}
      <motion.g
        animate={{
          rotate: [-2, 2, -2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <path
          d="M200 200 Q150 150, 100 180 T80 250 Q120 280, 200 200"
          fill="url(#wing-gradient)"
          stroke="var(--dragonfly-primary)"
          strokeWidth="0.5"
          opacity="0.6"
        />
        <path
          d="M200 200 Q160 160, 120 190 T100 240 Q140 260, 200 200"
          fill="none"
          stroke="var(--dragonfly-secondary)"
          strokeWidth="0.3"
          opacity="0.4"
        />
      </motion.g>

      {/* Right wing pattern */}
      <motion.g
        animate={{
          rotate: [2, -2, 2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <path
          d="M200 200 Q250 150, 300 180 T320 250 Q280 280, 200 200"
          fill="url(#wing-gradient)"
          stroke="var(--dragonfly-primary)"
          strokeWidth="0.5"
          opacity="0.6"
        />
        <path
          d="M200 200 Q240 160, 280 190 T300 240 Q260 260, 200 200"
          fill="none"
          stroke="var(--dragonfly-secondary)"
          strokeWidth="0.3"
          opacity="0.4"
        />
      </motion.g>

      {/* Wing veins */}
      <g opacity="0.3">
        <line x1="200" y1="200" x2="120" y2="180" stroke="var(--dragonfly-accent)" strokeWidth="0.5" />
        <line x1="200" y1="200" x2="100" y2="220" stroke="var(--dragonfly-accent)" strokeWidth="0.5" />
        <line x1="200" y1="200" x2="280" y2="180" stroke="var(--dragonfly-accent)" strokeWidth="0.5" />
        <line x1="200" y1="200" x2="300" y2="220" stroke="var(--dragonfly-accent)" strokeWidth="0.5" />
      </g>
    </svg>
  );
}

export function DualSpotlight({ className }: { className?: string }) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {/* Left spotlight - dragonfly eye */}
      <motion.div
        className="absolute top-0 left-0 h-96 w-96 rounded-full"
        style={{
          background: "radial-gradient(circle, var(--dragonfly-primary) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Right spotlight - dragonfly eye */}
      <motion.div
        className="absolute top-0 right-0 h-96 w-96 rounded-full"
        style={{
          background: "radial-gradient(circle, var(--dragonfly-secondary) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      
      {/* Central glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: "radial-gradient(circle, var(--dragonfly-accent) 0%, transparent 60%)",
          filter: "blur(60px)",
          opacity: 0.3,
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}