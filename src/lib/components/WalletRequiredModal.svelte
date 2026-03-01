<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    const wallets = [
        {
            name: 'MetaMask',
            url: 'https://metamask.io/download/',
            icon: 'https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg'
        },
        {
            name: 'Rabby',
            url: 'https://rabby.io/',
            icon: 'https://raw.githubusercontent.com/RabbyHub/logo/297c81228f53e1db863ee44e49faf68d96719951/symbol.svg'
        },
        {
            name: 'Phantom',
            url: 'https://phantom.app/download',
            icon: 'https://mintcdn.com/phantom-e50e2e68/fkWrmnMWhjoXSGZ9/resources/images/Phantom_SVG_Icon.svg?fit=max&auto=format&n=fkWrmnMWhjoXSGZ9&q=85&s=2d31b98ce2d16ed7999e42466a5140b1'
        }
    ];
</script>

<div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
    <div class="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-2xl p-6 shadow-2xl">
        <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-bold text-white">Wallet Required</h2>
            <button 
                on:click={() => dispatch('close')}
                class="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>

        <p class="text-zinc-400 mb-8">
            To use pulsechain.wtf, you need a Web3 wallet. Please install one of the following to continue:
        </p>

        <div class="space-y-3">
            {#each wallets as wallet}
                <a 
                    href={wallet.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="flex items-center justify-between p-4 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/50 rounded-xl transition-all group"
                >
                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center overflow-hidden">
                            <img src={wallet.icon} alt={wallet.name} class="w-6 h-6 object-contain rounded-md" />
                        </div>
                        <span class="font-medium text-zinc-200">{wallet.name}</span>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-zinc-500 group-hover:text-zinc-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                </a>
            {/each}
        </div>

        <button 
            on:click={() => dispatch('close')}
            class="w-full mt-8 py-3 px-4 bg-zinc-100 hover:bg-white text-black font-bold rounded-xl transition-colors"
        >
            Close
        </button>
    </div>
</div>
