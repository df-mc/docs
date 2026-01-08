import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { baseOptions } from '@/app/layout';
import source from '@/lib/source';

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="pt-20">
            <DocsLayout
                tree={source.pageTree}
                {...baseOptions}
                sidebar={{
                    defaultOpenLevel: 1,
                    banner: (
                        <div className="space-y-2 mb-2">
                            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10 border border-cyan-500/20">
                                <svg className="w-4 h-4 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                <span className="text-xs font-medium text-cyan-600 dark:text-cyan-400">
                                    v0.10.7
                                </span>
                            </div>
                            <div className="flex items-center justify-between px-4 py-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                                <span className="flex items-center gap-1.5">
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    Search
                                </span>
                                <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded">⌘K</kbd>
                            </div>
                        </div>
                    ),
                    collapsible: true,
                }}
            >
                {children}
            </DocsLayout>
        </div>
    );
}