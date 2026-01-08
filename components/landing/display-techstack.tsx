"use client";

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Icons } from "../icons";

type TechStackIconType = {
	[key: string]: {
		name: string;
		icon: any;
	};
};

export const techStackIcons: TechStackIconType = {
	nextJs: {
		name: "Next.js",
		icon: <Icons.nextJS className="w-10 h-10" />,
	},
	nuxt: {
		name: "Nuxt",
		icon: <Icons.nuxt className="w-10 h-10" />,
	},
	svelteKit: {
		name: "SvelteKit",
		icon: <Icons.svelteKit className="w-10 h-10" />,
	},
	solidStart: {
		name: "SolidStart",
		icon: <Icons.solidStart className="w-10 h-10" />,
	},
	react: {
		name: "React",
		icon: <Icons.react className="w-10 h-10" />,
	},
	hono: {
		name: "Hono",
		icon: <Icons.hono className="w-10 h-10" />,
	},
	astro: {
		name: "Astro",
		icon: <Icons.astro className="w-10 h-10" />,
	},
	tanstack: {
		name: "TanStack Start",
		icon: <Icons.tanstack className="w-10 h-10" />,
	},
	expo: {
		name: "Expo",
		icon: <Icons.expo className="w-10 h-10" />,
	},
	nitro: {
		name: "Nitro",
		icon: <Icons.nitro className="w-10 h-10" />,
	},
};

export const TechStackDisplay = ({
	skills,
	className,
}: {
	skills: string[];
	className?: string;
}) => {
	return (
		<div
			className={cn(
				"flex gap-7 flex-wrap mt-3 justify-center items-center max-w-4xl",
				className,
			)}
		>
			{skills.map((key) => {
				const item = techStackIcons[key];
				if (!item) return null;
				return (
					<TooltipProvider delayDuration={50} key={key}>
						<Tooltip>
							<TooltipTrigger asChild>
								<span className="transform duration-300 hover:rotate-12 transition-transform cursor-default">
									{item.icon}
								</span>
							</TooltipTrigger>
							<TooltipContent>{item.name}</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				);
			})}
		</div>
	);
};
