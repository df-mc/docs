"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

/**
 * Premium CTA section before footer
 * Handcrafted with subtle interactions
 */
export function CTASection() {
    const [copied, setCopied] = useState(false);
    const command = "go get github.com/df-mc/dragonfly";

    const handleCopy = () => {
        navigator.clipboard.writeText(command);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section className="relative w-full py-24 overflow-hidden">
            {/* Subtle grid background */}
            <div className="absolute inset-0 bg-grid-small text-zinc-200 dark:text-white/[0.02] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

            {/* Gradient glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-64 bg-gradient-to-b from-cyan-500/10 via-blue-500/5 to-transparent blur-3xl" />

            <div className="relative max-w-4xl mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                        <span className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 dark:from-white dark:via-zinc-100 dark:to-white bg-clip-text text-transparent">
                            Ready to Build?
                        </span>
                    </h2>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 max-w-2xl mx-auto">
                        Get started with Dragonfly in under 5 minutes. No complex setup, just pure Go.
                    </p>

                    {/* Command box */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="relative max-w-xl mx-auto mb-8"
                    >
                        <div className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg opacity-20 group-hover:opacity-30 blur transition duration-300" />
                            <div className="relative flex items-center gap-3 px-4 py-3 bg-zinc-900 dark:bg-zinc-950 rounded-lg border border-zinc-800">
                                <span className="text-emerald-400 select-none font-mono text-sm">$</span>
                                <code className="flex-1 text-left font-mono text-sm text-zinc-300">
                                    {command}
                                </code>
                                <button
                                    onClick={handleCopy}
                                    className="px-3 py-1 text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded transition-colors"
                                >
                                    {copied ? "Copied!" : "Copy"}
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Button group */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link
                            href="/docs"
                            className="inline-flex h-11 items-center justify-center rounded-full bg-zinc-900 dark:bg-white px-8 text-sm font-medium text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors shadow-lg shadow-black/20"
                        >
                            View Documentation
                        </Link>
                        <Link
                            href="https://discord.gg/U4kFWHhTNR"
                            target="_blank"
                            className="inline-flex h-11 items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-8 text-sm font-medium text-zinc-900 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                        >
                            Join Discord
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
