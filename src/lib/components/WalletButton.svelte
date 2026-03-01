<script lang="ts">
    import { user, login, isAuthenticating } from '$lib/stores/auth';
    import ProfileModal from './ProfileModal.svelte';
    import WalletRequiredModal from './WalletRequiredModal.svelte';

    let showProfileModal = false;
    let showWalletRequiredModal = false;

    function handleWalletClick() {
        if ($user) {
            showProfileModal = true;
        } else {
            // Check if there is an injected wallet provider (e.g. window.ethereum)
            const hasWallet = typeof window !== 'undefined' && (
                window.ethereum !== undefined || 
                (window as any).phantom?.ethereum !== undefined ||
                (window as any).rabby !== undefined
            );

            if (hasWallet) {
                login();
            } else {
                showWalletRequiredModal = true;
            }
        }
    }

    function shortenAddress(address: string) {
        if (!address) return '';
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    }
</script>

<button
    on:click={handleWalletClick}
    class="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:bg-zinc-800 transition-colors"
    disabled={$isAuthenticating}
>
    {#if $isAuthenticating}
        <span class="animate-pulse">Connecting...</span>
    {:else if $user}
        <div class="flex items-center gap-2">
            {#if $user.avatar_url}
                <img
                    src={$user.avatar_url}
                    alt={$user.username}
                    class="w-6 h-6 rounded-full"
                />
            {:else}
                <div class="w-6 h-6 rounded-full bg-zinc-700"></div>
            {/if}
            <span class="text-sm font-medium">
                {#if $user.isDefaultUsername}
                    {shortenAddress($user.address)}
                {:else}
                    {$user.username}
                {/if}
            </span>
        </div>
    {:else}
        <span class="text-sm font-bold">Sign In</span>
    {/if}
</button>

{#if showProfileModal}
    <ProfileModal on:close={() => (showProfileModal = false)} />
{/if}

{#if showWalletRequiredModal}
    <WalletRequiredModal on:close={() => (showWalletRequiredModal = false)} />
{/if}
