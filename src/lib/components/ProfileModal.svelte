<script lang="ts">
    import { user, updateProfile, logout } from '$lib/stores/auth';
    import { createEventDispatcher } from 'svelte';
    import { X, LogOut, Check, AlertCircle } from 'lucide-svelte';

    const dispatch = createEventDispatcher();
    
    let username = $user?.username || '';
    let avatar_url = $user?.avatar_url || '';
    let isSaving = false;
    let validationError = '';

    function validateAndSave() {
        const trimmedUsername = username.trim();
        if (trimmedUsername.length > 0 && trimmedUsername.length < 4) {
            validationError = 'Username must be at least 4 characters.';
            return;
        }
        
        validationError = '';
        handleSave();
    }

    async function handleSave() {
        if (!$user) return;
        isSaving = true;
        try {
            // The logic to default to address will be in the auth store
            await updateProfile(username, avatar_url);
            dispatch('close');
        } catch (error) {
            console.error('Save error:', error);
            validationError = 'Failed to save profile.';
        } finally {
            isSaving = false;
        }
    }

    function handleLogout() {
        logout();
        dispatch('close');
    }

    function onInput() {
        if (validationError) {
            validationError = '';
        }
    }
</script>

<div
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
    style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; display: flex; align-items: center; justify-content: center;"
    on:click|self={() => dispatch('close')}
    role="dialog"
    aria-modal="true"
>
    <div
        class="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-3xl p-6 shadow-2xl transition-all scale-100 opacity-100"
    >
        <div class="flex items-center justify-between mb-8">
            <h2 class="text-xl font-bold text-white">Profile Settings</h2>
            <button
                on:click={() => dispatch('close')}
                class="p-2 rounded-full hover:bg-zinc-800 transition-colors"
                aria-label="Close modal"
            >
                <X size={20} class="text-zinc-400" />
            </button>
        </div>

        <div class="space-y-6">
            <div class="flex flex-col items-center gap-4 mb-4">
                {#if avatar_url}
                    <img
                        src={avatar_url}
                        alt="Profile Preview"
                        class="w-24 h-24 rounded-full object-cover border-4 border-zinc-800 shadow-lg"
                    />
                {:else}
                    <div class="w-24 h-24 rounded-full bg-zinc-800 flex items-center justify-center border-4 border-zinc-800 shadow-lg">
                        <span class="text-zinc-600 text-3xl">?</span>
                    </div>
                {/if}
            </div>

            <div class="space-y-2">
                <label for="username" class="text-sm font-medium text-zinc-400">Username</label>
                <div class="relative">
                    <input
                        id="username"
                        type="text"
                        bind:value={username}
                        on:input={onInput}
                        class="w-full px-4 py-2.5 bg-zinc-900 border rounded-xl focus:outline-none focus:ring-2 text-white placeholder-zinc-600 {validationError ? 'border-red-500/50 focus:ring-red-500/50' : 'border-zinc-800 focus:ring-zinc-600'}"
                        placeholder="Leave blank to use address"
                    />
                </div>
                {#if validationError}
                    <div class="flex items-center gap-2 text-red-500 text-xs pt-1">
                        <AlertCircle size={14} />
                        <p>{validationError}</p>
                    </div>
                {/if}
            </div>

            <div class="space-y-2">
                <label for="pfp" class="text-sm font-medium text-zinc-400">Avatar URL</label>
                <input
                    id="pfp"
                    type="url"
                    bind:value={avatar_url}
                    class="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-600 text-white placeholder-zinc-600"
                    placeholder="https://example.com/image.png"
                />
            </div>

            <div class="pt-4 flex flex-col gap-3">
                <button
                    on:click={validateAndSave}
                    disabled={isSaving}
                    class="w-full flex items-center justify-center gap-2 py-3 bg-white text-black font-bold rounded-2xl hover:bg-zinc-200 transition-colors disabled:opacity-50"
                >
                    {#if isSaving}
                        <div class="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    {:else}
                        <Check size={18} />
                        Save Changes
                    {/if}
                </button>

                <button
                    on:click={handleLogout}
                    class="w-full flex items-center justify-center gap-2 py-3 bg-zinc-900 border border-zinc-800 text-red-500 font-medium rounded-2xl hover:bg-zinc-800 transition-colors"
                >
                    <LogOut size={18} />
                    Logout
                </button>
            </div>
        </div>
    </div>
</div>
