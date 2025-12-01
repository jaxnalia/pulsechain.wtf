<script lang="ts">
    import { ArrowRight, Rocket } from "lucide-svelte";
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
    import { faGithub } from "@fortawesome/free-brands-svg-icons";
    import links from "$lib/data/links.json";
</script>

<div class="">
    <div
        class="min-h-screen bg-gray-950 text-zinc-50 font-sans flex flex-col items-center m-4 rounded-3xl"
    >
        <div
            class="w-full max-w-3xl px-2 py-12 sm:px-6 lg:px-8 flex flex-col gap-8"
        >
            <header class="text-center space-y-4">
                <div class="inline-flex items-center justify-center p-5">
                    <img
                        src="https://pulsechain.com/favicon128.png"
                        alt="PulseChain"
                    />
                </div>
                <h1
                    class="text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-200 to-zinc-500"
                >
                    PulseChain
                </h1>
                <p
                    class="text-zinc-400 text-md max-w-lg mx-auto leading-relaxed"
                >
                    Energy-efficient, cheaper, faster, and fee-burning Ethereum
                    fork.
                </p>
            </header>

            <main class="flex flex-col gap-2 w-full font-poppins">
                <!-- Featured Item -->
                <!-- <a
                href="https://leantoken.org"
                target="_blank"
                rel="noopener noreferrer"
                class="font-poppins group relative flex items-center justify-between p-2.5 rounded-2xl border border-zinc-800/60 overflow-hidden transition-all duration-300 hover:border-zinc-700"
            >
                <div class="absolute inset-0">
                    <img
                        src="https://c.tenor.com/MHKfTqZCZrQAAAAd/tenor.gif"
                        alt="Featured Background"
                        class="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div
                        class="absolute inset-0 bg-zinc-950/40 group-hover:bg-zinc-950/30 transition-colors duration-300"
                    ></div>
                </div>

                <div class="relative flex items-center gap-5 duration-300">
                    <div
                        class="p-2.5 rounded-xl bg-zinc-800/50 text-zinc-400 group-hover:bg-zinc-800 group-hover:text-white transition-colors duration-300"
                    >
                        <img
                            src="https://leantoken.org/lean.png"
                            alt="Provex Sacrifice"
                            class="w-8 h-8"
                        />
                    </div>
                    <div class="flex flex-col text-left gap-0.5">
                        <span
                            class="text-lg font-semibold tracking-wide text-zinc-100 group-hover:text-white"
                            >LEAN Token</span
                        >
                        <span
                            class="text-sm font-semibold text-zinc-500 group-hover:text-zinc-400 transition-colors"
                            >Grass roots hood coin on PulseChain</span
                        >
                    </div>
                </div>

                <div
                    class="text-zinc-700 group-hover:text-zinc-300 transition-colors transform group-hover:translate-x-1 duration-300"
                >
                    <ArrowRight size={20} />
                </div>
            </a> -->

                <!-- Featured Item -->
                <a
                    href="https://provex.info/#/?ref=0xb770163A0CFDE7F5F3C5bd6EAb7587eC64b8837b"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="font-poppins group relative flex items-center justify-between p-2.5 rounded-2xl border border-zinc-800/60 overflow-hidden transition-all duration-300 hover:border-zinc-700"
                >
                    <div class="absolute inset-0">
                        <img
                            src="https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&w=800&q=80"
                            alt="Featured Background"
                            class="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                        />
                        <div
                            class="absolute inset-0 bg-zinc-950/40 group-hover:bg-zinc-950/30 transition-colors duration-300"
                        ></div>
                    </div>

                    <div class="relative flex items-center gap-5 duration-300">
                        <div
                            class="p-2.5 rounded-xl bg-zinc-800/50 text-zinc-400 group-hover:bg-zinc-800 group-hover:text-white transition-colors duration-300"
                        >
                            <img
                                src="https://provex.info/provex.png"
                                alt="Provex Sacrifice"
                                class="w-8 h-8"
                            />
                        </div>
                        <div class="flex flex-col text-left gap-0.5">
                            <span
                                class="text-lg font-semibold tracking-wide text-zinc-100 group-hover:text-white"
                                >ProveX Sacrifice</span
                            >
                            <span
                                class="text-xs font-semibold text-zinc-500 group-hover:text-zinc-400 transition-colors"
                                >Zero-knowledge peer-to-peer fiat onramp</span
                            >
                        </div>
                    </div>

                    <div
                        class="text-zinc-700 group-hover:text-zinc-300 transition-colors transform group-hover:translate-x-1 duration-300"
                    >
                        <ArrowRight size={20} />
                    </div>
                </a>

                <!-- PulseX -->
                {#each links as link}
                    <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="font-poppins group relative flex items-center justify-between p-2.5 rounded-2xl bg-zinc-900/40 border border-zinc-800/60 hover:bg-zinc-900 hover:border-zinc-700 transition-all duration-300 hover:shadow-xl hover:shadow-black/50"
                    >
                        <div class="flex items-center gap-5">
                            <div
                                class="p-2.5 rounded-xl bg-zinc-800/50 text-zinc-400 group-hover:bg-zinc-800 group-hover:text-white transition-colors duration-300 ring-1 ring-white/5"
                            >
                                {#if link.iconType === "image"}
                                    <img
                                        src={link.icon}
                                        alt={link.title}
                                        class="w-8 h-8"
                                    />
                                {:else if link.iconType === "lucide" && link.icon === "rocket"}
                                    <Rocket size={24} strokeWidth={2} />
                                {/if}
                            </div>
                            <div class="flex flex-col text-left gap-0.5">
                                <span
                                    class="text-lg font-semibold tracking-wide text-zinc-100 group-hover:text-white"
                                    >{link.title}</span
                                >
                                <span
                                    class="text-xs font-semibold text-zinc-500 group-hover:text-zinc-400 transition-colors"
                                    >{link.description}</span
                                >
                            </div>
                        </div>

                        <div
                            class="text-zinc-700 group-hover:text-zinc-300 transition-colors transform group-hover:translate-x-1 duration-300"
                        >
                            <ArrowRight size={20} />
                        </div>
                    </a>
                {/each}

                <!-- GitHub
            <a
                href="https://github.com/pulsechain"
                target="_blank"
                rel="noopener noreferrer"
                class="group relative flex items-center justify-between p-2.5 sm:p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/60 hover:bg-zinc-900 hover:border-zinc-700 transition-all duration-300 hover:shadow-xl hover:shadow-black/50"
            >
                <div class="flex items-center gap-5">
                    <div
                        class="p-3.5 rounded-xl bg-zinc-800/50 text-zinc-400 group-hover:bg-zinc-800 group-hover:text-white transition-colors duration-300 ring-1 ring-white/5"
                    >
                        <Github size={24} strokeWidth={2} />
                    </div>
                    <div class="flex flex-col text-left gap-0.5">
                        <span
                            class="text-lg font-semibold tracking-wide text-zinc-100 group-hover:text-white"
                            >GitHub</span
                        >
                        <span
                            class="text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors"
                            >Open source contributions</span
                        >
                    </div>
                </div>

                <div
                    class="text-zinc-700 group-hover:text-zinc-300 transition-colors transform group-hover:translate-x-1 duration-300"
                >
                    <ArrowRight size={20} />
                </div>
            </a> -->

                <!-- Twitter -->
                <!-- <a
                href="https://twitter.com/pulsechain"
                target="_blank"
                rel="noopener noreferrer"
                class="group relative flex items-center justify-between p-2.5 sm:p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/60 hover:bg-zinc-900 hover:border-zinc-700 transition-all duration-300 hover:shadow-xl hover:shadow-black/50"
            >
                <div class="flex items-center gap-5">
                    <div
                        class="p-3.5 rounded-xl bg-zinc-800/50 text-zinc-400 group-hover:bg-zinc-800 group-hover:text-white transition-colors duration-300 ring-1 ring-white/5"
                    >
                        <Twitter size={24} strokeWidth={2} />
                    </div>
                    <div class="flex flex-col text-left gap-0.5">
                        <span
                            class="text-lg font-semibold tracking-wide text-zinc-100 group-hover:text-white"
                            >Twitter</span
                        >
                        <span
                            class="text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors"
                            >Latest news and updates</span
                        >
                    </div>
                </div>

                <div
                    class="text-zinc-700 group-hover:text-zinc-300 transition-colors transform group-hover:translate-x-1 duration-300"
                >
                    <ArrowRight size={20} />
                </div>
            </a> -->

                <!-- Validator Info -->
            </main>

            <footer class="font-poppins mt-8 text-center text-zinc-600 text-sm">
                <div class="flex items-center justify-center gap-2">
                    <div class="">
                        © 2025 PulseChain.wtf
                        <span class="text-lg px-2"> • </span>
                        <a
                            href="https://github.com/jaxnalia/pulsechain.wtf"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="inline-flex items-center text-zinc-600 hover:text-zinc-400 transition-colors duration-200"
                            aria-label="View source on GitHub"
                        >
                            <FontAwesomeIcon
                                icon={faGithub}
                                class="w-3 h-3 pr-1"
                            />
                            GitHub
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    </div>
</div>

<style>
    :global(body) {
        background-color: black;
        margin: 0;
    }
</style>
