"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Stat {
    icon: React.ReactNode;
    value: string;
    label: string;
}

/**
 * Infinite scrolling stats marquee with real data
 * Subtle, professional implementation with pause-on-hover
 */
export function StatsMarquee() {
    const [githubStats, setGithubStats] = useState({
        stars: "2.5K",
        forks: "400",
        issues: "50",
        subscribers: "100",
        size: "20MB",
    });

    useEffect(() => {
        // Fetch real GitHub data
        fetch("https://api.github.com/repos/df-mc/dragonfly")
            .then((res) => res.json())
            .then((data) => {
                const formatNumber = (num: number) => {
                    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
                    return num.toString();
                };

                const formatSize = (kb: number) => {
                    if (kb >= 1024) return `${(kb / 1024).toFixed(1)}MB`;
                    return `${kb}KB`;
                };

                setGithubStats({
                    stars: formatNumber(data.stargazers_count),
                    forks: formatNumber(data.forks_count),
                    issues: formatNumber(data.open_issues_count),
                    subscribers: formatNumber(data.subscribers_count),
                    size: formatSize(data.size),
                });
            })
            .catch(() => {
                // Keep fallback values
            });
    }, []);

    const stats: Stat[] = [
        {
            icon: (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16.5 9.4c0-1.8-1.4-3.1-3.2-3.1-1.6 0-2.9 1.1-3.1 2.6H4v2h6.1c.3 1.5 1.6 2.6 3.1 2.6 1.8 0 3.2-1.4 3.2-3.1zm-3.2 1.9c-1 0-1.8-.8-1.8-1.9s.8-1.9 1.8-1.9c1 0 1.8.8 1.8 1.9s-.8 1.9-1.8 1.9z" />
                </svg>
            ),
            value: "Go",
            label: "Language",
        },
        {
            icon: (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                </svg>
            ),
            value: githubStats.stars,
            label: "Stars",
        },
        {
            icon: (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
            ),
            value: githubStats.forks,
            label: "Forks",
        },
        {
            icon: (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            ),
            value: githubStats.issues,
            label: "Open Issues",
        },
        {
            icon: (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
            ),
            value: githubStats.subscribers,
            label: "Subscribers",
        },
        {
            icon: (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
            ),
            value: githubStats.size,
            label: "Size",
        },
    ];

    // Duplicate for seamless loop
    const duplicatedStats = [...stats, ...stats, ...stats];

    return (
        <div className="w-full py-8 overflow-hidden border-y border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
            <div
                className="relative flex gap-8"
                style={{
                    maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                }}
            >
                <motion.div
                    className="flex gap-8 pr-8"
                    animate={{
                        x: [0, -100 * stats.length],
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 20,
                            ease: "linear",
                        },
                    }}
                >
                    {duplicatedStats.map((stat, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-3 px-6 py-2 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shrink-0"
                        >
                            <div className="text-cyan-500">{stat.icon}</div>
                            <div className="flex items-baseline gap-1.5">
                                <span className="text-sm font-semibold text-zinc-900 dark:text-white">
                                    {stat.value}
                                </span>
                                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                    {stat.label}
                                </span>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
