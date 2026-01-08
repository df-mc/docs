"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import useMeasure from "react-use-measure";

export default function Features({ stars }: { stars: string | null }) {
	// Create refs for each feature section
	const feature1Ref = useRef(null);
	const feature2Ref = useRef(null);
	const feature3Ref = useRef(null);
	const feature4Ref = useRef(null);

	// Track each feature's visibility
	const feature1InView = useInView(feature1Ref, { once: true, margin: "-100px" });
	const feature2InView = useInView(feature2Ref, { once: true, margin: "-100px" });
	const feature3InView = useInView(feature3Ref, { once: true, margin: "-100px" });
	const feature4InView = useInView(feature4Ref, { once: true, margin: "-100px" });

	// Flip states for code blocks
	const [isFlipped1, setIsFlipped1] = useState(false);
	const [isFlipped3, setIsFlipped3] = useState(false);

	// Measure refs for dynamic height
	const [feature1FrontRef, feature1FrontBounds] = useMeasure();
	const [feature1BackRef, feature1BackBounds] = useMeasure();
	const [feature3FrontRef, feature3FrontBounds] = useMeasure();
	const [feature3BackRef, feature3BackBounds] = useMeasure();

	return (
		<div className="w-full max-w-6xl mx-auto px-4 py-24 relative z-10">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6 }}
				className="text-center mb-20"
			>
				<p className="text-sm font-medium text-cyan-600 dark:text-cyan-400 mb-3 tracking-wide uppercase">
					Why Dragonfly
				</p>
				<h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
					Built Different
				</h2>
			</motion.div>

			<div className="space-y-32">
				{/* Feature 1: Written in Go */}
				<motion.div
					ref={feature1Ref}
					initial={{ opacity: 0, y: 50 }}
					animate={feature1InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
					transition={{ duration: 0.7, ease: "easeOut" }}
					className="grid md:grid-cols-2 gap-12 items-center"
				>
					<div>
						<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
							<div className="w-2 h-2 rounded-full bg-cyan-500" />
							<span className="text-xs font-medium text-cyan-600 dark:text-cyan-400">
								Core Architecture
							</span>
						</div>
						<h3 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-4">
							Written in Go
						</h3>
						<p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
							GoLang's features serve the best features for Minecraft server development. Compiles to a single binary, no RAM-intensive VM, and goroutines allow parallel processing for thousands of players without worry of thread safety.
						</p>
						<ul className="space-y-3">
							{[
								"One binary, zero dependencies — just drop it on your server",
								"No GC lag spikes ruining your players' experience",
								"Build for Linux, Windows, ARM — whatever you need",
							].map((item, i) => (
								<motion.li
									key={i}
									initial={{ opacity: 0, x: -20 }}
									animate={feature1InView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
									transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
									className="flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-400"
								>
									<svg className="w-5 h-5 text-cyan-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
									</svg>
									{item}
								</motion.li>
							))}
						</ul>
					</div>
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={feature1InView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
						whileHover={{ y: -4 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="relative group"
						style={{ perspective: "1000px" }}
					>
						<div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl blur-2xl group-hover:blur-3xl transition-all duration-300" />

						{/* Animated height wrapper */}
						<motion.div
							className="relative"
							animate={{
								height: isFlipped1
									? (feature1BackBounds.height > 0 ? feature1BackBounds.height : "auto")
									: (feature1FrontBounds.height > 0 ? feature1FrontBounds.height : "auto")
							}}
							transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
						>
							<motion.div
								className="relative"
								style={{ transformStyle: "preserve-3d" }}
								animate={{ rotateY: isFlipped1 ? 180 : 0 }}
								transition={{
									duration: 0.6,
									ease: [0.23, 1, 0.32, 1]
								}}
							>
								{/* Front of card - main.go */}
								<div
									ref={feature1FrontRef}
									className="relative bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden"
									style={{
										backfaceVisibility: "hidden",
										WebkitBackfaceVisibility: "hidden",
									}}
								>
									<div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800">
										<div className="flex gap-1.5">
											<div className="w-3 h-3 rounded-full bg-zinc-700" />
											<div className="w-3 h-3 rounded-full bg-zinc-700" />
											<div className="w-3 h-3 rounded-full bg-zinc-700" />
										</div>
										<div className="flex gap-2 ml-2">
											<button
												onClick={() => setIsFlipped1(false)}
												className={`text-xs px-2 py-0.5 rounded transition-colors ${!isFlipped1
													? "text-cyan-400 bg-cyan-500/10"
													: "text-zinc-500 hover:text-zinc-400"
													}`}
											>
												main.go
											</button>
											<button
												onClick={() => setIsFlipped1(true)}
												className={`text-xs px-2 py-0.5 rounded transition-colors ${isFlipped1
													? "text-cyan-400 bg-cyan-500/10"
													: "text-zinc-500 hover:text-zinc-400"
													}`}
											>
												config.go
											</button>
										</div>
									</div>
									<pre className="p-4 text-sm overflow-x-auto">
										<code className="text-zinc-300">
											<span className="text-purple-400">func</span>{" "}
											<span className="text-cyan-400">main</span>() {"{"}
											{"\n"}{"  "}cfg <span className="text-zinc-500">:=</span> server.<span className="text-cyan-400">DefaultConfig</span>()
											{"\n"}{"  "}srv <span className="text-zinc-500">:=</span> cfg.<span className="text-cyan-400">New</span>()
											{"\n"}{"  "}srv.<span className="text-cyan-400">Listen</span>()
											{"\n"}{"}"}
										</code>
									</pre>
									<div className="px-4 py-3 bg-zinc-950/50 border-t border-zinc-800">
										<div className="flex items-center gap-2 text-xs">
											<span className="text-emerald-400">$</span>
											<span className="text-zinc-400">go build && ./server</span>
										</div>
										<div className="mt-2 text-xs text-zinc-500">
											Server running on <span className="text-emerald-400">0.0.0.0:19132</span> <span className="text-zinc-600">(started in 12ms)</span>
										</div>
									</div>
								</div>

								{/* Back of card - config.go */}
								<div
									ref={feature1BackRef}
									className="absolute inset-0 bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden"
									style={{
										backfaceVisibility: "hidden",
										WebkitBackfaceVisibility: "hidden",
										transform: "rotateY(180deg)",
									}}
								>
									<div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800">
										<div className="flex gap-1.5">
											<div className="w-3 h-3 rounded-full bg-zinc-700" />
											<div className="w-3 h-3 rounded-full bg-zinc-700" />
											<div className="w-3 h-3 rounded-full bg-zinc-700" />
										</div>
										<div className="flex gap-2 ml-2">
											<button
												onClick={() => setIsFlipped1(false)}
												className={`text-xs px-2 py-0.5 rounded transition-colors ${!isFlipped1
													? "text-cyan-400 bg-cyan-500/10"
													: "text-zinc-500 hover:text-zinc-400"
													}`}
											>
												main.go
											</button>
											<button
												onClick={() => setIsFlipped1(true)}
												className={`text-xs px-2 py-0.5 rounded transition-colors ${isFlipped1
													? "text-cyan-400 bg-cyan-500/10"
													: "text-zinc-500 hover:text-zinc-400"
													}`}
											>
												config.go
											</button>
										</div>
									</div>
									<pre className="p-4 text-sm overflow-x-auto">
										<code className="text-zinc-300">
											<span className="text-purple-400">type</span> <span className="text-cyan-400">Config</span> <span className="text-purple-400">struct</span> {"{"}
											{"\n"}{"  "}<span className="text-zinc-500">// Max players</span>
											{"\n"}{"  "}MaxPlayers <span className="text-purple-400">int</span>
											{"\n"}{"  "}<span className="text-zinc-500">// Network settings</span>
											{"\n"}{"  "}Network <span className="text-cyan-400">NetworkConfig</span>
											{"\n"}{"}"}
											{"\n"}
											{"\n"}<span className="text-purple-400">func</span> <span className="text-cyan-400">DefaultConfig</span>() <span className="text-cyan-400">Config</span> {"{"}
											{"\n"}{"  "}<span className="text-purple-400">return</span> <span className="text-cyan-400">Config</span>{"{"}
											{"\n"}{"    "}MaxPlayers: <span className="text-amber-400">20</span>,
											{"\n"}{"  "}{"}"}
											{"\n"}{"}"}
										</code>
									</pre>
									<div className="px-4 py-3 bg-zinc-950/50 border-t border-zinc-800">
										<div className="text-xs text-zinc-500">
											Fully customizable configuration system
										</div>
									</div>
								</div>
							</motion.div>
						</motion.div>
					</motion.div>
				</motion.div>

				{/* Feature 2: Protocol Compliance */}
				<motion.div
					ref={feature2Ref}
					initial={{ opacity: 0, y: 50 }}
					animate={feature2InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
					transition={{ duration: 0.7, ease: "easeOut" }}
					className="grid md:grid-cols-2 gap-12 items-center"
				>
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={feature2InView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="order-2 md:order-1"
					>
						<div className="relative bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6">
							<div className="space-y-4">
								{[
									{ version: "1.21.50", protocol: "766", date: "Dec 2024", supported: true },
									{ version: "1.21.40", protocol: "748", date: "Oct 2024", supported: true },
									{ version: "1.21.60", protocol: "TBD", date: "early 2025", supported: false },
								].map((item, i) => (
									<motion.div
										key={i}
										initial={{ opacity: 0, x: -20 }}
										animate={feature2InView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
										transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
										className={`flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 ${!item.supported && "opacity-50"}`}
									>
										<div className={`w-10 h-10 rounded-lg ${item.supported ? "bg-emerald-500/10" : "bg-zinc-500/10"} flex items-center justify-center`}>
											<svg className={`w-5 h-5 ${item.supported ? "text-emerald-500" : "text-zinc-400"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.supported ? "M5 13l4 4L19 7" : "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"} />
											</svg>
										</div>
										<div className="flex-1">
											<div className="flex items-center justify-between">
												<span className="text-sm font-medium text-zinc-900 dark:text-white">{item.version}</span>
												<span className={`text-xs font-medium ${item.supported ? "text-emerald-500" : "text-zinc-500"}`}>
													{item.supported ? "Supported" : "Coming Soon"}
												</span>
											</div>
											<span className="text-xs text-zinc-500">Protocol {item.protocol} — Released {item.date}</span>
										</div>
									</motion.div>
								))}
							</div>
						</div>
					</motion.div>
					<div className="order-1 md:order-2">
						<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
							<div className="w-2 h-2 rounded-full bg-emerald-500" />
							<span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
								Protocol Support
							</span>
						</div>
						<h3 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-4">
							Day-One Updates
						</h3>
						<p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
							Mojang pushes an update? We're usually ready same day. The people maintaining the protocol code actually understand how Bedrock works under the hood. Your server won't be stuck on an old version while your players are updating.
						</p>
						<p className="text-sm text-zinc-500 dark:text-zinc-500">
							We keep an eye on beta releases, so we're usually ready before the update even hits the app stores.
						</p>
					</div>
				</motion.div>

				{/* Feature 3: Developer Experience */}
				<motion.div
					ref={feature3Ref}
					initial={{ opacity: 0, y: 50 }}
					animate={feature3InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
					transition={{ duration: 0.7, ease: "easeOut" }}
					className="grid md:grid-cols-2 gap-12 items-center"
				>
					<div>
						<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
							<div className="w-2 h-2 rounded-full bg-purple-500" />
							<span className="text-xs font-medium text-purple-600 dark:text-purple-400">
								Developer Experience
							</span>
						</div>
						<h3 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-4">
							Unmatched DX
						</h3>
						<p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
							No extra bloat. No reflection nonsense. No 500-line YAML files to configure a single feature. You write Go, your IDE actually helps you, and the compiler catches your type errors before they crash your server at 3am.
						</p>
						<div className="space-y-4">
							{[
								{ title: "Type-Safe Events", desc: "Events are just structs. No casting from interface{}, no event.getString() nonsense. Your IDE tells you exactly what's available." },
								{ title: "Compile-Time Checks", desc: "Typo in a function name? Compiler catches it. Wrong argument type? Compiler catches it. Forgot to handle a case? Yep, compiler." },
								{ title: "Zero Boilerplate", desc: "No plugin.yml, no annotation processing, no service locators. Just import the package and start coding." },
							].map((item, i) => (
								<motion.div
									key={i}
									initial={{ opacity: 0, x: -20 }}
									animate={feature3InView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
									transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
									className="flex items-start gap-4"
								>
									<div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0 mt-0.5">
										<span className="text-sm font-bold text-purple-500">{i + 1}</span>
									</div>
									<div>
										<h4 className="text-sm font-semibold text-zinc-900 dark:text-white mb-1">{item.title}</h4>
										<p className="text-sm text-zinc-500">{item.desc}</p>
									</div>
								</motion.div>
							))}
						</div>
					</div>
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={feature3InView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
						whileHover={{ y: -4 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="relative group"
						style={{ perspective: "1000px" }}
					>
						<div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl blur-2xl group-hover:blur-3xl transition-all duration-300" />

						{/* Animated height wrapper */}
						<motion.div
							className="relative"
							animate={{
								height: isFlipped3
									? (feature3BackBounds.height > 0 ? feature3BackBounds.height : "auto")
									: (feature3FrontBounds.height > 0 ? feature3FrontBounds.height : "auto")
							}}
							transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
						>
							<motion.div
								className="relative"
								style={{ transformStyle: "preserve-3d" }}
								animate={{ rotateY: isFlipped3 ? 180 : 0 }}
								transition={{
									duration: 0.6,
									ease: [0.23, 1, 0.32, 1]
								}}
							>
								{/* Front of card - handler.go */}
								<div
									ref={feature3FrontRef}
									className="relative bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden"
									style={{
										backfaceVisibility: "hidden",
										WebkitBackfaceVisibility: "hidden",
									}}
								>
									<div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800">
										<div className="flex gap-1.5">
											<div className="w-3 h-3 rounded-full bg-zinc-700" />
											<div className="w-3 h-3 rounded-full bg-zinc-700" />
											<div className="w-3 h-3 rounded-full bg-zinc-700" />
										</div>
										<div className="flex gap-2 ml-2">
											<button
												onClick={() => setIsFlipped3(false)}
												className={`text-xs px-2 py-0.5 rounded transition-colors ${!isFlipped3
													? "text-purple-400 bg-purple-500/10"
													: "text-zinc-500 hover:text-zinc-400"
													}`}
											>
												handler.go
											</button>
											<button
												onClick={() => setIsFlipped3(true)}
												className={`text-xs px-2 py-0.5 rounded transition-colors ${isFlipped3
													? "text-purple-400 bg-purple-500/10"
													: "text-zinc-500 hover:text-zinc-400"
													}`}
											>
												events.go
											</button>
										</div>
									</div>
									<pre className="p-4 text-sm overflow-x-auto">
										<code className="text-zinc-300">
											<span className="text-purple-400">type</span> <span className="text-cyan-400">MyHandler</span> <span className="text-purple-400">struct</span> {"{"}
											{"\n"}{"  "}player.<span className="text-cyan-400">NopHandler</span>
											{"\n"}{"}"}
											{"\n"}
											{"\n"}<span className="text-zinc-500">// Full type info, IDE autocomplete</span>
											{"\n"}<span className="text-purple-400">func</span> (h <span className="text-zinc-500">*</span>MyHandler) <span className="text-cyan-400">HandleChat</span>(
											{"\n"}{"  "}ctx <span className="text-zinc-500">*</span>player.<span className="text-cyan-400">Context</span>,
											{"\n"}{"  "}message <span className="text-zinc-500">*</span><span className="text-purple-400">string</span>,
											{"\n"}) {"{"}
											{"\n"}{"  "}<span className="text-zinc-500">// ctx.Val() gives you the *player.Player</span>
											{"\n"}{"  "}name <span className="text-zinc-500">:=</span> ctx.<span className="text-cyan-400">Val</span>().<span className="text-cyan-400">Name</span>()
											{"\n"}{"  "}fmt.<span className="text-cyan-400">Printf</span>(<span className="text-amber-400">"%s: %s\n"</span>, name, <span className="text-zinc-500">*</span>message)
											{"\n"}{"}"}
										</code>
									</pre>
								</div>

								{/* Back of card - events.go */}
								<div
									ref={feature3BackRef}
									className="absolute inset-0 bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden"
									style={{
										backfaceVisibility: "hidden",
										WebkitBackfaceVisibility: "hidden",
										transform: "rotateY(180deg)",
									}}
								>
									<div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800">
										<div className="flex gap-1.5">
											<div className="w-3 h-3 rounded-full bg-zinc-700" />
											<div className="w-3 h-3 rounded-full bg-zinc-700" />
											<div className="w-3 h-3 rounded-full bg-zinc-700" />
										</div>
										<div className="flex gap-2 ml-2">
											<button
												onClick={() => setIsFlipped3(false)}
												className={`text-xs px-2 py-0.5 rounded transition-colors ${!isFlipped3
													? "text-purple-400 bg-purple-500/10"
													: "text-zinc-500 hover:text-zinc-400"
													}`}
											>
												handler.go
											</button>
											<button
												onClick={() => setIsFlipped3(true)}
												className={`text-xs px-2 py-0.5 rounded transition-colors ${isFlipped3
													? "text-purple-400 bg-purple-500/10"
													: "text-zinc-500 hover:text-zinc-400"
													}`}
											>
												events.go
											</button>
										</div>
									</div>
									<pre className="p-4 text-sm overflow-x-auto">
										<code className="text-zinc-300">
											<span className="text-purple-400">func</span> (h <span className="text-zinc-500">*</span>MyHandler) <span className="text-cyan-400">HandleBlockBreak</span>(
											{"\n"}{"  "}ctx <span className="text-zinc-500">*</span>event.<span className="text-cyan-400">Context</span>,
											{"\n"}{"  "}pos <span className="text-cyan-400">BlockPos</span>,
											{"\n"}{"  "}drops <span className="text-zinc-500">*</span>[]<span className="text-cyan-400">ItemStack</span>,
											{"\n"}) {"{"}
											{"\n"}{"  "}p <span className="text-zinc-500">:=</span> ctx.<span className="text-cyan-400">Val</span>()
											{"\n"}{"  "}
											{"\n"}{"  "}<span className="text-zinc-500">// Modify drops, cancel event, etc</span>
											{"\n"}{"  "}<span className="text-purple-400">if</span> p.<span className="text-cyan-400">GameMode</span>() <span className="text-zinc-500">==</span> <span className="text-cyan-400">world.GameModeCreative</span> {"{"}
											{"\n"}{"    "}ctx.<span className="text-cyan-400">Cancel</span>()
											{"\n"}{"  "}{"}"}
											{"\n"}{"}"}
										</code>
									</pre>
									<div className="px-4 py-3 bg-zinc-950/50 border-t border-zinc-800">
										<div className="text-xs text-zinc-500">
											Type-safe event handlers with full control
										</div>
									</div>
								</div>
							</motion.div>
						</motion.div>
					</motion.div>
				</motion.div>

				{/* Feature 4: Parallel Architecture */}
				<motion.div
					ref={feature4Ref}
					initial={{ opacity: 0, y: 50 }}
					animate={feature4InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
					transition={{ duration: 0.7, ease: "easeOut" }}
					className="grid md:grid-cols-2 gap-12 items-center"
				>
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={feature4InView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="order-2 md:order-1"
					>
						<div className="relative">
							<div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-red-500/10 rounded-2xl blur-2xl" />
							<div className="relative bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden">
								<div className="px-4 py-3 border-b border-zinc-800">
									<span className="text-xs text-zinc-500">Runtime Architecture</span>
								</div>
								<div className="p-6">
									<div className="flex items-center justify-center mb-6">
										<div className="px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700">
											<span className="text-sm font-mono text-zinc-300">Server</span>
										</div>
									</div>
									<div className="flex items-center justify-center gap-2 mb-4">
										<div className="h-px flex-1 bg-zinc-800" />
										<span className="text-xs text-zinc-600">spawns</span>
										<div className="h-px flex-1 bg-zinc-800" />
									</div>
									<div className="grid grid-cols-3 gap-3 mb-6">
										{["Player 1", "Player 2", "Player 3"].map((p, i) => (
											<motion.div
												key={i}
												initial={{ opacity: 0, scale: 0.8 }}
												animate={feature4InView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
												transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
												className="text-center"
											>
												<div className="w-full py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 mb-2">
													<span className="text-xs font-mono text-cyan-400">goroutine</span>
												</div>
												<span className="text-xs text-zinc-500">{p}</span>
											</motion.div>
										))}
									</div>
									<div className="flex items-center justify-center gap-2 mb-4">
										<div className="h-px flex-1 bg-zinc-800" />
										<span className="text-xs text-zinc-600">isolated handlers</span>
										<div className="h-px flex-1 bg-zinc-800" />
									</div>
									<div className="p-4 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
										<div className="flex items-center justify-between mb-3">
											<span className="text-xs text-zinc-400">World Transactions</span>
											<span className="text-xs text-emerald-400 font-medium">Thread-Safe</span>
										</div>
										<div className="text-xs text-zinc-500 font-mono">
											world.<span className="text-cyan-400">Exec</span>(<span className="text-purple-400">func</span>(tx <span className="text-zinc-500">*</span>world.<span className="text-cyan-400">Tx</span>) {"{"}{"..."}{"}"})
										</div>
									</div>
								</div>
							</div>
						</div>
					</motion.div>
					<div className="order-1 md:order-2">
						<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
							<div className="w-2 h-2 rounded-full bg-amber-500" />
							<span className="text-xs font-medium text-amber-600 dark:text-amber-400">
								Concurrency Model
							</span>
						</div>
						<h3 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-4">
							True Parallelism
						</h3>
						<p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
							Each player gets their own goroutine. No single tick loop that everything has to wait on. Packets, handlers, game logic — all running in parallel.
						</p>
						<div className="space-y-4 text-sm">
							{[
								{ title: "Per-Player Handlers", desc: "Every player has their own handler. You don't need to think about locks or shared state for player logic — it's just not a problem." },
								{ title: "Safe World Transactions", desc: "Need to modify the world from multiple goroutines? The transaction API handles the synchronization. No manual mutex wrangling required." },
							].map((item, i) => (
								<motion.div
									key={i}
									initial={{ opacity: 0, x: 20 }}
									animate={feature4InView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
									transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
									className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800"
								>
									<div className="font-semibold text-zinc-900 dark:text-white mb-1">{item.title}</div>
									<p className="text-zinc-500">{item.desc}</p>
								</motion.div>
							))}
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
}
