"use client";

import React, { useState } from 'react';
import { Button } from "../ui/button";

export function FormBuilder() {
    const [elements, setElements] = useState<string[]>([]);

    return (
        <div className="space-y-4">
            <div className="flex gap-2">
                <Button onClick={() => setElements([...elements, "Input"])}>Add Input</Button>
                <Button onClick={() => setElements([...elements, "Toggle"])}>Add Toggle</Button>
            </div>
            <div className="border border-border p-4 rounded-md min-h-[200px] bg-card">
                {elements.length === 0 ? (
                    <p className="text-muted-foreground">Drag and drop elements here</p>
                ) : (
                    <div className="space-y-2">
                        {elements.map((el, i) => (
                            <div key={i} className="p-2 bg-muted rounded">{el} Component</div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
