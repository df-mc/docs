'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';

export function Mermaid({ chart }: { chart: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted || !ref.current) return;

        const renderChart = async () => {
            try {
                const mermaid = (await import('mermaid')).default;

                mermaid.initialize({
                    startOnLoad: false,
                    securityLevel: 'loose',
                    theme: resolvedTheme === 'dark' ? 'dark' : 'default',
                    fontFamily: 'inherit',
                });

                // Unique ID for each diagram to prevent collisions
                const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`;

                // Clean up the chart string if needed (handling escaped newlines)
                const content = chart.replace(/\\n/g, '\n');

                const { svg } = await mermaid.render(id, content);

                if (ref.current) {
                    ref.current.innerHTML = svg;
                }
            } catch (error) {
                console.error('Mermaid render error:', error);
                if (ref.current) {
                    ref.current.innerHTML = `<p class="text-red-500 text-sm">Failed to render diagram</p>`;
                }
            }
        };

        renderChart();
    }, [chart, mounted, resolvedTheme]);

    return (
        <div
            ref={ref}
            className="flex justify-center my-6 overflow-x-auto"
            aria-label="Mermaid Diagram"
        />
    );
}
