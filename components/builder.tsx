"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";

export function Builder() {
    const [elements, setElements] = useState<string[]>([]);

    return (
        <div className="hidden">
            {/* Stub for Builder component to allow compilation */}
            <Button>Open Builder</Button>
        </div>
    );
}
