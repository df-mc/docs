"use client";

import { useEffect, useRef } from "react";
import { useMotionValue, motion, useSpring } from "framer-motion";

/**
 * Subtle mouse-following gradient effect for hero section
 * GPU-accelerated, throttled for 60fps performance
 * Only active on desktop (pointer: fine)
 */
export function MouseGradient() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animation for natural movement
    const springConfig = { damping: 25, stiffness: 150 };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);

    useEffect(() => {
        // Only run on devices with precise pointer (desktop)
        const hasFinePoin = window.matchMedia("(pointer: fine)").matches;
        if (!hasFinePoin) return;

        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <motion.div
            className="pointer-events-none fixed inset-0 z-0 opacity-0 transition-opacity duration-500 [.pointer-fine_&]:opacity-100"
            style={{
                background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(6, 182, 212, 0.08), transparent 80%)`,
                // @ts-ignore - CSS variable assignment
                "--mouse-x": smoothX,
                "--mouse-y": smoothY,
            }}
        />
    );
}
