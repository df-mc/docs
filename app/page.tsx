import Link from "next/link";
import Features from "@/components/features";
import Hero from "@/components/landing/hero";
import Section from "@/components/landing/section";
import Footer from "@/components/footer";
import { MouseGradient } from "@/components/landing/mouse-gradient";
import { StatsMarquee } from "@/components/landing/stats-marquee";
import { CTASection } from "@/components/landing/cta-section";

async function getGitHubStars() {
	try {
		const response = await fetch(
			"https://api.github.com/repos/better-auth/better-auth",
			{
				next: {
					revalidate: 60,
				},
			},
		);
		if (!response?.ok) {
			return null;
		}
		const json = await response.json();
		const stars = parseInt(json.stargazers_count).toLocaleString();
		return stars;
	} catch {
		return null;
	}
}

export default async function HomePage() {
	const stars = await getGitHubStars();
	return (
		<main className="h-min mx-auto overflow-x-hidden pt-20">
			<MouseGradient />
			<div className="w-full bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:via-black dark:to-zinc-950 border-b border-dashed border-zinc-200 dark:border-zinc-800 transition-all duration-300 hover:border-cyan-500/30">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="w-full h-full">
						<div className="flex flex-col md:flex-row items-center justify-center h-12 group">
							<span className="font-medium flex gap-2 text-sm text-zinc-700 dark:text-zinc-300">
								<span className="text-zinc-900 dark:text-white/90 hover:text-zinc-950 text-xs md:text-sm dark:hover:text-zinc-100 transition-all duration-200">
									Introducing{" "}
									<span className="font-semibold bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
										Dragonfly Docs
									</span>
								</span>
								<span className="text-zinc-400 hidden md:block group-hover:text-cyan-500 transition-colors duration-200">|</span>
								<Link
									href="/docs"
									className="font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 hidden dark:hover:text-cyan-300 transition-all duration-200 hover:translate-x-0.5 md:block"
								>
									View Docs →
								</Link>
							</span>
							<Link
								href="/docs"
								className="font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 text-xs dark:hover:text-cyan-300 transition-all duration-200 hover:translate-x-0.5 md:hidden"
							>
								View Docs →
							</Link>
						</div>
					</div>
				</div>
			</div>
			<Section
				className="mb-1 overflow-y-clip"
				crosses
				crossesOffset="lg:translate-y-[5.25rem]"
				customPaddings
				id="hero"
			>
				<Hero />
				<StatsMarquee />
				<Features stars={stars} />
				<hr className="h-px bg-border" />
			</Section>
			<CTASection />
			<Footer />
		</main>
	);
}
