interface StepLineProps {
    steps: string[];
    current?: number;
}

export function StepLine({ steps, current = 0 }: StepLineProps) {
    return (
        <div className="w-full overflow-x-auto pb-4">
            <div className="flex items-center min-w-max space-x-2">
                {steps.map((step, index) => {
                    const isCompleted = index < current;
                    const isCurrent = index === current;
                    const isUpcoming = index > current;

                    return (
                        <div key={index} className="flex items-center">
                            <div className={`flex items-center px-4 py-2 rounded-full border text-sm font-medium transition-colors ${isCompleted || isCurrent
                                    ? "bg-cyan-50 dark:bg-cyan-950/30 border-cyan-200 dark:border-cyan-800 text-cyan-700 dark:text-cyan-300"
                                    : "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400"
                                }`}>
                                <span className={`flex items-center justify-center w-5 h-5 mr-2 text-xs rounded-full ${isCompleted || isCurrent
                                        ? "bg-cyan-100 dark:bg-cyan-900 text-cyan-700 dark:text-cyan-300"
                                        : "bg-zinc-200 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-500"
                                    }`}>
                                    {index + 1}
                                </span>
                                {step}
                            </div>

                            {index < steps.length - 1 && (
                                <div className="w-8 h-px bg-zinc-200 dark:bg-zinc-800 mx-2" />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
