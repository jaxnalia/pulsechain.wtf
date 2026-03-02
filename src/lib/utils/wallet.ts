export function hasInjectedWallet(): boolean {
    if (typeof window === 'undefined') return false;
    
    return (
        window.ethereum !== undefined || 
        (window as any).phantom?.ethereum !== undefined ||
        (window as any).rabby !== undefined
    );
}
