<script lang="ts">
    import { onMount } from "svelte";
    import { ArrowRight, Rocket, MessageSquare, Compass } from "lucide-svelte";
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
    import { faGithub } from "@fortawesome/free-brands-svg-icons";
    import links from "$lib/data/links.json";
    import WalletButton from "$lib/components/WalletButton.svelte";
    import { initAuth } from "$lib/stores/auth";

    onMount(() => {
        initAuth();
    });
</script>

<div class="min-h-screen bg-black text-zinc-50 font-sans flex flex-col items-center p-4 relative">
    <!-- Floating Sign In / User Button -->
    <div class="fixed top-6 right-6 z-50">
        <WalletButton />
    </div>

    <div class="w-full max-w-3xl flex-1 flex flex-col gap-8 py-12">
        <header class="text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div class="inline-flex items-center justify-center p-5">
                <img
                    src="https://pulsechain.com/favicon128.png"
                    alt="PulseChain"
                    class="w-24 h-24"
                />
            </div>
            <h1
                class="text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-200 to-zinc-500"
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

        <!-- Tabs above content -->
        <div class="w-full flex flex-shrink-0 bg-zinc-900/50 p-1.5 rounded-2xl border border-zinc-800 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            <a 
                href="/"
                class="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all text-zinc-500 hover:text-zinc-300"
            >
                <MessageSquare size={18} />
                <span class="text-sm font-bold">Chat</span>
            </a>
            <div 
                class="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all bg-zinc-800 text-white shadow-lg cursor-default"
            >
                <Compass size={18} />
                <span class="text-sm font-bold">Explore</span>
            </div>
        </div>
        
        <div class="w-full flex-1 flex flex-col">
            <main class="flex flex-col gap-3 w-full font-poppins animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
                <!-- Featured Item -->
                <a
                    href="https://pai-mkr.pages.dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="font-poppins group relative flex items-center justify-between p-3 rounded-2xl border border-zinc-800/60 overflow-hidden transition-all duration-300 hover:border-zinc-700"
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
                                src="https://pai-mkr.pages.dev/0xc40c58afff0a8908c392a752f4951eff381aa0b2.png"
                                alt="PulseMaker"
                                class="w-8 h-8 rounded-3xl"
                            />
                        </div>
                        <div class="flex flex-col text-left gap-0.5">
                            <span
                                class="text-lg font-semibold tracking-wide text-zinc-100 group-hover:text-white"
                                >PulseMaker</span
                            >
                            <span
                                class="text-xs font-semibold text-zinc-500 group-hover:text-zinc-400 transition-colors"
                                >Decentralized multi-collateral stablecoin</span
                            >
                        </div>
                    </div>

                    <div
                        class="text-zinc-700 group-hover:text-zinc-300 transition-colors transform group-hover:translate-x-1 duration-300"
                    >
                        <ArrowRight size={20} />
                    </div>
                </a>

                <!-- Links -->
                {#each links as link}
                    <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="font-poppins group relative flex items-center justify-between p-3 rounded-2xl bg-zinc-900/40 border border-zinc-800/60 hover:bg-zinc-900 hover:border-zinc-700 transition-all duration-300 hover:shadow-xl hover:shadow-black/50"
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
            </main>
        </div>

        <footer class="font-poppins mt-8 text-center text-zinc-600 text-sm">
            <div class="flex items-center justify-center gap-2">
                <div class="">
                    PulseChain.wtf v1.0.0
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

<style>
    :global(body) {
        background-color: black;
        margin: 0;
    }
</style>
