import { createConfig, http, connect, reconnect, getAccount, disconnect, signMessage, watchAccount } from '@wagmi/core';
import { mainnet, pulsechain } from '@wagmi/core/chains';
import { injected } from '@wagmi/connectors';

export const config = createConfig({
  chains: [pulsechain, mainnet],
  connectors: [injected()],
  transports: {
    [pulsechain.id]: http(),
    [mainnet.id]: http(),
  },
});

// Initialize connection state
reconnect(config);

export { connect, getAccount, disconnect, signMessage, watchAccount, injected };
