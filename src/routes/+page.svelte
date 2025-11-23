<script lang="ts">
	import { Github, Twitter, Globe, Mail, ArrowRight, Zap, Activity, Layers, Cpu } from 'lucide-svelte';
</script>

<div class="min-h-screen bg-zinc-950 text-zinc-50 font-sans flex flex-col items-center">
	<div class="w-full max-w-3xl px-4 py-12 sm:px-6 lg:px-8 flex flex-col gap-8">
		<header class="text-center space-y-4">
			<div
				class="inline-flex items-center justify-center p-5 rounded-full bg-zinc-900 border border-zinc-800 shadow-2xl shadow-purple-900/20 mb-2"
			>
				<Zap size={40} class="text-purple-500 fill-purple-500/20" />
			</div>
			<h1
				class="text-4xl sm:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-200 to-zinc-500"
			>
				PulseChain
			</h1>
			<p class="text-zinc-400 text-lg max-w-lg mx-auto leading-relaxed">
				Energy-efficient, cheaper, faster, and fee-burning Ethereum fork.
			</p>
		</header>

		<main class="flex flex-col gap-4 w-full">
			<!-- Official Website -->
			<a
				href="https://pulsechain.com"
				target="_blank"
				rel="noopener noreferrer"
				class="group relative flex items-center justify-between p-5 sm:p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/60 hover:bg-zinc-900 hover:border-zinc-700 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-black/50"
			>
				<div class="flex items-center gap-5">
					<div
						class="p-3.5 rounded-xl bg-zinc-800/50 text-zinc-400 group-hover:bg-zinc-800 group-hover:text-white transition-colors duration-300 ring-1 ring-white/5"
					>
						<Globe size={24} strokeWidth={2} />
					</div>
					<div class="flex flex-col text-left gap-0.5">
						<span class="text-lg sm:text-xl font-semibold tracking-wide text-zinc-100 group-hover:text-white"
							>Official Website</span
						>
						<span class="text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors"
							>The main ecosystem portal</span
						>
					</div>
				</div>

				<div
					class="text-zinc-700 group-hover:text-zinc-300 transition-colors transform group-hover:translate-x-1 duration-300"
				>
					<ArrowRight size={20} />
				</div>
			</a>

			<!-- Block Explorer -->
			<a
				href="https://scan.pulsechain.com"
				target="_blank"
				rel="noopener noreferrer"
				class="group relative flex items-center justify-between p-5 sm:p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/60 hover:bg-zinc-900 hover:border-zinc-700 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-black/50"
			>
				<div class="flex items-center gap-5">
					<div
						class="p-3.5 rounded-xl bg-zinc-800/50 text-zinc-400 group-hover:bg-zinc-800 group-hover:text-white transition-colors duration-300 ring-1 ring-white/5"
					>
						<Activity size={24} strokeWidth={2} />
					</div>
					<div class="flex flex-col text-left gap-0.5">
						<span class="text-lg sm:text-xl font-semibold tracking-wide text-zinc-100 group-hover:text-white"
							>Block Explorer</span
						>
						<span class="text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors"
							>View transactions and blocks</span
						>
					</div>
				</div>

				<div
					class="text-zinc-700 group-hover:text-zinc-300 transition-colors transform group-hover:translate-x-1 duration-300"
				>
					<ArrowRight size={20} />
				</div>
			</a>

			<!-- Bridge -->
			<a
				href="https://bridge.pulsechain.com"
				target="_blank"
				rel="noopener noreferrer"
				class="group relative flex items-center justify-between p-5 sm:p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/60 hover:bg-zinc-900 hover:border-zinc-700 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-black/50"
			>
				<div class="flex items-center gap-5">
					<div
						class="p-3.5 rounded-xl bg-zinc-800/50 text-zinc-400 group-hover:bg-zinc-800 group-hover:text-white transition-colors duration-300 ring-1 ring-white/5"
					>
						<Layers size={24} strokeWidth={2} />
					</div>
					<div class="flex flex-col text-left gap-0.5">
						<span class="text-lg sm:text-xl font-semibold tracking-wide text-zinc-100 group-hover:text-white"
							>Bridge</span
						>
						<span class="text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors"
							>Bridge assets from Ethereum</span
						>
					</div>
				</div>

				<div
					class="text-zinc-700 group-hover:text-zinc-300 transition-colors transform group-hover:translate-x-1 duration-300"
				>
					<ArrowRight size={20} />
				</div>
			</a>

			<!-- GitHub -->
			<a
				href="https://github.com/pulsechain"
				target="_blank"
				rel="noopener noreferrer"
				class="group relative flex items-center justify-between p-5 sm:p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/60 hover:bg-zinc-900 hover:border-zinc-700 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-black/50"
			>
				<div class="flex items-center gap-5">
					<div
						class="p-3.5 rounded-xl bg-zinc-800/50 text-zinc-400 group-hover:bg-zinc-800 group-hover:text-white transition-colors duration-300 ring-1 ring-white/5"
					>
						<Github size={24} strokeWidth={2} />
					</div>
					<div class="flex flex-col text-left gap-0.5">
						<span class="text-lg sm:text-xl font-semibold tracking-wide text-zinc-100 group-hover:text-white"
							>GitHub</span
						>
						<span class="text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors"
							>Open source contributions</span
						>
					</div>
				</div>

				<div
					class="text-zinc-700 group-hover:text-zinc-300 transition-colors transform group-hover:translate-x-1 duration-300"
				>
					<ArrowRight size={20} />
				</div>
			</a>

			<!-- Twitter -->
			<a
				href="https://twitter.com/pulsechain"
				target="_blank"
				rel="noopener noreferrer"
				class="group relative flex items-center justify-between p-5 sm:p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/60 hover:bg-zinc-900 hover:border-zinc-700 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-black/50"
			>
				<div class="flex items-center gap-5">
					<div
						class="p-3.5 rounded-xl bg-zinc-800/50 text-zinc-400 group-hover:bg-zinc-800 group-hover:text-white transition-colors duration-300 ring-1 ring-white/5"
					>
						<Twitter size={24} strokeWidth={2} />
					</div>
					<div class="flex flex-col text-left gap-0.5">
						<span class="text-lg sm:text-xl font-semibold tracking-wide text-zinc-100 group-hover:text-white"
							>Twitter</span
						>
						<span class="text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors"
							>Latest news and updates</span
						>
					</div>
				</div>

				<div
					class="text-zinc-700 group-hover:text-zinc-300 transition-colors transform group-hover:translate-x-1 duration-300"
				>
					<ArrowRight size={20} />
				</div>
			</a>

			<!-- Validator Info -->
			<a
				href="https://launchpad.pulsechain.com"
				target="_blank"
				rel="noopener noreferrer"
				class="group relative flex items-center justify-between p-5 sm:p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/60 hover:bg-zinc-900 hover:border-zinc-700 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-black/50"
			>
				<div class="flex items-center gap-5">
					<div
						class="p-3.5 rounded-xl bg-zinc-800/50 text-zinc-400 group-hover:bg-zinc-800 group-hover:text-white transition-colors duration-300 ring-1 ring-white/5"
					>
						<Cpu size={24} strokeWidth={2} />
					</div>
					<div class="flex flex-col text-left gap-0.5">
						<span class="text-lg sm:text-xl font-semibold tracking-wide text-zinc-100 group-hover:text-white"
							>Validator Info</span
						>
						<span class="text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors"
							>Become a validator</span
						>
					</div>
				</div>

				<div
					class="text-zinc-700 group-hover:text-zinc-300 transition-colors transform group-hover:translate-x-1 duration-300"
				>
					<ArrowRight size={20} />
				</div>
			</a>
		</main>

		<footer class="mt-8 text-center text-zinc-600 text-sm">
			<p>© 2025 PulseChain Community.</p>
		</footer>
	</div>
</div>

<style>
	:global(body) {
		background-color: #09090b;
		margin: 0;
	}
</style>
