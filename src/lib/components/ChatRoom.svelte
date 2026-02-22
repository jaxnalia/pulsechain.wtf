<script lang="ts">
    import { onMount, onDestroy, tick } from 'svelte';
    import { pb } from '$lib/pocketbase';
    import { user, login } from '$lib/stores/auth';
    import { Send, User as UserIcon, Loader2 } from 'lucide-svelte';

    interface Message {
        id: string;
        text: string;
        user: string; // Relation ID
        created: string;
        expand?: {
            user: {
                username: string;
                avatar_url: string;
                address: string;
            };
        };
    }

    let messages: Message[] = [];
    let newMessage = '';
    let isLoading = true; // For initial load
    let isLoadingOlder = false; // For loading older messages
    let messageContainer: HTMLDivElement;
    let unsubscribe: () => void;
    let hasMoreOlderMessages = true;

    async function loadOlderMessages() {
        if (isLoadingOlder || !hasMoreOlderMessages || messages.length === 0) return;
        isLoadingOlder = true;
        
        const oldestMessageCreated = messages[0].created;
        
        try {
            const resultList = await pb.collection('pulsechain_wtf_chat').getList(1, 20, {
                sort: '-created',
                filter: `created < "${oldestMessageCreated}"`,
                expand: 'user',
            });

            if (resultList.items.length === 0) {
                hasMoreOlderMessages = false;
                isLoadingOlder = false;
                return;
            }

            const oldScrollHeight = messageContainer.scrollHeight;
            
            messages = [...resultList.items.reverse(), ...messages];

            // Wait for the DOM to update
            await tick(); 

            // Restore scroll position to keep it from jumping
            messageContainer.scrollTop = messageContainer.scrollHeight - oldScrollHeight;
            
            isLoadingOlder = false;

        } catch (error) {
            console.error('Failed to load older messages:', error);
            isLoadingOlder = false;
        }
    }

    function handleScroll() {
        if (messageContainer.scrollTop < 1 && !isLoadingOlder && hasMoreOlderMessages) {
            loadOlderMessages();
        }
    }

    onMount(async () => {
        try {
            const resultList = await pb.collection('pulsechain_wtf_chat').getList(1, 20, {
                sort: '-created',
                expand: 'user',
            });
            messages = resultList.items.reverse() as Message[];
            isLoading = false;
            
            await tick();
            if (messageContainer) {
                messageContainer.scrollTop = messageContainer.scrollHeight;
            }

            unsubscribe = await pb.collection('pulsechain_wtf_chat').subscribe('*', async ({ action, record }) => {
                if (action === 'create') {
                    const expandedRecord = await pb.collection('pulsechain_wtf_chat').getOne(record.id, {
                        expand: 'user',
                    });
                    
                    const isScrolledToBottom = messageContainer.scrollHeight - messageContainer.clientHeight <= messageContainer.scrollTop + 5; // Give a 5px buffer
                    
                    messages = [...messages, expandedRecord as Message];
                    
                    if (isScrolledToBottom) {
                        await tick();
                        scrollToBottom();
                    }
                }
            });
        } catch (error) {
            console.error('Chat subscription error:', error);
            isLoading = false;
        }

        if (messageContainer) {
            messageContainer.addEventListener('scroll', handleScroll);
        }
    });

    onDestroy(() => {
        if (unsubscribe) unsubscribe();
        if (messageContainer) {
            messageContainer.removeEventListener('scroll', handleScroll);
        }
    });

    async function sendMessage() {
        if (!newMessage.trim() || !$user) return;
        
        try {
            await pb.collection('pulsechain_wtf_chat').create({
                text: newMessage,
                user: $user.id,
            });
            newMessage = '';
        } catch (error) {
            console.error('Send message error:', error);
        }
    }

    function scrollToBottom() {
        if (messageContainer) {
            messageContainer.scrollTop = messageContainer.scrollHeight;
        }
    }

    function formatTime(dateStr: string) {
        return new Date(dateStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    function shortenAddress(address: string) {
        if (!address) return '';
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    }

    function isDefaultUsername(user: { username: string, address: string }) {
        return user.username.toLowerCase() === user.address.toLowerCase();
    }
</script>

<div class="flex flex-col h-[600px] w-full bg-zinc-950 border border-zinc-900 rounded-3xl overflow-hidden shadow-2xl">
    <div class="p-4 border-b border-zinc-900 bg-zinc-900/30 flex items-center justify-between">
        <h3 class="font-bold text-lg text-white">Community Chat</h3>
        <div class="flex items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span class="text-xs text-zinc-500 font-medium">Live</span>
        </div>
    </div>

    <div 
        bind:this={messageContainer}
        class="flex-1 overflow-y-auto p-4 space-y-4"
    >
        {#if hasMoreOlderMessages && isLoadingOlder}
            <div class="flex justify-center p-2">
                <Loader2 class="animate-spin text-zinc-600" size={24} />
            </div>
        {/if}

        {#if isLoading}
            <div class="flex items-center justify-center h-full">
                <Loader2 class="animate-spin text-zinc-700" size={32} />
            </div>
        {:else if messages.length === 0}
            <div class="flex flex-col items-center justify-center h-full text-zinc-600">
                <p>No messages yet. Start the conversation!</p>
            </div>
        {:else}
            {#each messages as message (message.id)}
                <div class="flex gap-3 group">
                    <div class="flex-shrink-0">
                        {#if message.expand?.user?.avatar_url}
                            <img 
                                src={message.expand.user.avatar_url} 
                                alt={message.expand.user.username}
                                class="w-10 h-10 rounded-full border border-zinc-800 object-cover"
                            />
                        {:else}
                            <div class="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700">
                                <UserIcon size={18} class="text-zinc-600" />
                            </div>
                        {/if}
                    </div>
                    <div class="flex flex-col max-w-[85%]">
                        <div class="flex items-center gap-2 mb-1">
                            <span class="text-xs font-bold text-zinc-400">
                                {#if message.expand?.user && isDefaultUsername(message.expand.user)}
                                    {shortenAddress(message.expand.user.address)}
                                {:else}
                                    {message.expand?.user?.username || "..."}
                                {/if}
                            </span>
                            <span class="text-[10px] text-zinc-600">{formatTime(message.created)}</span>
                        </div>
                        <div class="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl px-4 py-2 text-zinc-100 break-words shadow-sm">
                            {message.text}
                        </div>
                    </div>
                </div>
            {/each}
        {/if}
    </div>

    <div class="p-4 border-t border-zinc-900 bg-zinc-900/20">
        {#if $user}
            <form on:submit|preventDefault={sendMessage} class="flex gap-2">
                <input 
                    type="text" 
                    bind:value={newMessage}
                    placeholder="Type a message..."
                    class="flex-1 bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-zinc-700 placeholder-zinc-600"
                />
                <button 
                    type="submit"
                    disabled={!newMessage.trim()}
                    class="p-3 rounded-2xl bg-white text-black hover:bg-zinc-200 disabled:opacity-50 disabled:bg-zinc-800 disabled:text-zinc-500 transition-all shadow-lg"
                >
                    <Send size={20} />
                </button>
            </form>
        {:else}
            <div class="flex items-center justify-between p-3 bg-zinc-900/50 border border-zinc-800 rounded-2xl">
                <p class="text-sm text-zinc-500 italic">Sign in to participate in the chat</p>
                <button 
                    on:click={login}
                    class="text-xs font-bold bg-white text-black px-4 py-2 rounded-xl hover:bg-zinc-200"
                >
                    Sign In
                </button>
            </div>
        {/if}
    </div>
</div>

<style>
    /* Dark scrollbar for webkit browsers */
    .overflow-y-auto::-webkit-scrollbar {
        width: 8px;
    }
    .overflow-y-auto::-webkit-scrollbar-track {
        background: transparent;
    }
    .overflow-y-auto::-webkit-scrollbar-thumb {
        background-color: #3f3f46; /* zinc-700 */
        border-radius: 20px;
        border: 3px solid #18181b; /* zinc-900 - to create padding */
    }
    .overflow-y-auto::-webkit-scrollbar-thumb:hover {
        background-color: #52525b; /* zinc-600 */
    }
</style>
