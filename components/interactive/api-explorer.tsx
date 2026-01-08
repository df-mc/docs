"use client";

import React from 'react';

export function ApiExplorer() {
    return (
        <div className="border border-border rounded-lg overflow-hidden">
            <div className="bg-muted px-4 py-2 border-b border-border flex items-center gap-2">
                <span className="bg-green-500/20 text-green-700 dark:text-green-400 px-2 py-0.5 rounded text-xs font-bold">GET</span>
                <span className="font-mono text-sm">/api/status</span>
            </div>
            <div className="p-4 bg-card">
                <pre className="text-xs font-mono">
                    {`{
  "status": "online",
  "version": "0.1.0"
}`}
                </pre>
            </div>
        </div>
    );
}
