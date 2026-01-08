"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest: number) => {
    setScrolled(latest > 50);
  });

  const navMenu = [
    { name: "Documentation", path: "/docs" },
    { name: "Guides", path: "/docs/getting-started/setup" },
  ];

  return (
    <motion.nav
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed inset-x-0 z-50 mx-auto w-full px-4"
    >
      <motion.div
        initial={false}
        animate={{
          maxWidth: scrolled ? "56rem" : "100%",
          marginTop: scrolled ? 16 : 0,
          borderRadius: scrolled ? 16 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        className={cn(
          "relative mx-auto flex h-14 items-center justify-between px-5 border-b",
          scrolled
            ? "border border-zinc-200 dark:border-white/10 shadow-lg shadow-black/5 dark:shadow-black/20 backdrop-blur-xl bg-white/80 dark:bg-zinc-900/95"
            : "border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-950"
        )}
      >
        {/* Subtle glow on top when floating */}
        {scrolled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"
          />
        )}

        {/* Logo */}
        <Link href="/" className="relative flex items-center gap-2.5 font-semibold group">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative flex h-8 w-8 items-center justify-center rounded-lg overflow-hidden"
          >
            <Image
              src="https://avatars.githubusercontent.com/u/54965492?s=48&v=4"
              alt="Dragonfly Logo"
              width={32}
              height={32}
              className="object-cover"
            />
          </motion.div>
          <span className="hidden sm:inline-block tracking-tight text-zinc-900 dark:text-white">
            Dragonfly
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-0.5 p-1 rounded-full bg-zinc-100 dark:bg-white/5 ring-1 ring-zinc-200 dark:ring-white/10">
          {navMenu.map((item) => {
            const isActive = pathname === item.path || pathname.startsWith(item.path + "/");
            return (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "relative px-4 py-1.5 text-sm font-medium transition-colors rounded-full",
                  isActive
                    ? "text-zinc-900 dark:text-white"
                    : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-white dark:bg-white/10 rounded-full shadow-sm ring-1 ring-zinc-200 dark:ring-white/10"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="https://github.com/df-mc/dragonfly"
              target="_blank"
              className="flex items-center justify-center w-9 h-9 rounded-full bg-zinc-100 dark:bg-white/5 ring-1 ring-zinc-200 dark:ring-white/10 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-white/10 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"
                />
              </svg>
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href="/docs"
              className="hidden sm:inline-flex h-9 items-center justify-center rounded-full bg-zinc-900 dark:bg-white px-4 text-sm font-medium text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors"
            >
              Get Started
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </motion.nav>
  );
}
