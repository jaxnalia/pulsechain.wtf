import { writable, get } from 'svelte/store';
import { pb } from '$lib/pocketbase';
import { config, connect, getAccount, signMessage, disconnect, watchAccount, injected } from '$lib/web3';
import { SiweMessage } from 'siwe';

export interface User {
    id: string;
    username: string;
    avatar_url: string;
    address: string;
    isDefaultUsername: boolean; // New property
}

export const user = writable<User | null>(null);
export const isAuthenticating = writable(false);

export async function login() {
    isAuthenticating.set(true);
    try {
        let account = getAccount(config);
        
        if (!account.address) {
            await connect(config, { connector: injected() });
            account = getAccount(config);
        }

        const address = account.address;
        if (!address) throw new Error('Failed to get address');

        const chainId = account.chainId || 369;
        
        const message = new SiweMessage({
            domain: window.location.host,
            address,
            statement: 'Sign in with Ethereum to pulsechain.wtf',
            uri: window.location.origin,
            version: '1',
            chainId,
            nonce: Math.random().toString(36).substring(2),
        });

        await signMessage(config, {
            message: message.prepareMessage(),
        });

        let record;
        try {
            record = await pb.collection('pulsechain_wtf_users').getFirstListItem(`address="${address.toLowerCase()}"`);
        } catch (e) {
            record = await pb.collection('pulsechain_wtf_users').create({
                address: address.toLowerCase(),
                username: address, // Default username to address on creation
                avatar_url: '',
            });
        }

        user.set({
            id: record.id,
            username: record.username,
            avatar_url: record.avatar_url,
            address: record.address,
            isDefaultUsername: record.username.toLowerCase() === record.address.toLowerCase(), // Set isDefault
        });
        
        localStorage.setItem('auth_address', address.toLowerCase());

    } catch (error) {
        console.error('Login error:', error);
    } finally {
        isAuthenticating.set(false);
    }
}

export async function logout() {
    await disconnect(config);
    pb.authStore.clear();
    user.set(null);
    localStorage.removeItem('auth_address');
}

export async function updateProfile(username: string, avatar_url: string) {
    const currentUser = get(user);
    if (!currentUser) return;

    const finalUsername = username.trim() === '' ? currentUser.address : username;

    const record = await pb.collection('pulsechain_wtf_users').update(currentUser.id, {
        username: finalUsername,
        avatar_url
    });
    
    user.set({
        id: record.id,
        username: record.username,
        avatar_url: record.avatar_url,
        address: record.address,
        isDefaultUsername: record.username.toLowerCase() === record.address.toLowerCase(), // Update isDefault
    });
}

watchAccount(config, {
    onChange(account) {
        if (!account.address) {
            logout();
        } else {
            const storedAddress = localStorage.getItem('auth_address');
            if (storedAddress && storedAddress !== account.address.toLowerCase()) {
                login();
            }
        }
    }
});

export async function initAuth() {
    const account = getAccount(config);
    const storedAddress = localStorage.getItem('auth_address');
    
    if (account.address && storedAddress === account.address.toLowerCase()) {
        try {
            const record = await pb.collection('pulsechain_wtf_users').getFirstListItem(`address="${account.address.toLowerCase()}"`);
            user.set({
                id: record.id,
                username: record.username,
                avatar_url: record.avatar_url,
                address: record.address,
                isDefaultUsername: record.username.toLowerCase() === record.address.toLowerCase(), // Set isDefault
            });
        } catch (e) {
            localStorage.removeItem('auth_address');
        }
    }
}
