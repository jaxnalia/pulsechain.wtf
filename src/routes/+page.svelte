<script lang="ts">
    import { onMount } from "svelte";
    import { MessageSquare, Compass } from "lucide-svelte";
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
    import { faGithub } from "@fortawesome/free-brands-svg-icons";
    import WalletButton from "$lib/components/WalletButton.svelte";
    import ChatRoom from "$lib/components/ChatRoom.svelte";
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

    <div class="w-full max-w-3xl flex flex-col gap-8 py-12">
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
            <div 
                class="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all bg-zinc-800 text-white shadow-lg cursor-default"
            >
                <MessageSquare size={18} />
                <span class="text-sm font-bold">Chat</span>
            </div>
            <a 
                href="/explore"
                class="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all text-zinc-500 hover:text-zinc-300"
            >
                <Compass size={18} />
                <span class="text-sm font-bold">Explore</span>
            </a>
        </div>
        
        <div class="w-full">
            <div class="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                <ChatRoom />
            </div>
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
