import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
  ConnectButton
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  polygonMumbai
} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

function Navbar() {
  const { chains, publicClient } = configureChains(
    [polygonMumbai],
    [
      alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
      publicProvider()
    ]
  );
  const { connectors } = getDefaultWallets({
    appName: 'My RainbowKit App',
    projectId: 'a938bee08643184fb038b8deec30437f',
    chains
  });
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient
  })

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <div className="navbar bg-base-100 flex justify-between">
          <a className="btn btn-ghost normal-case text-xl">IntelliForm</a>
          <div className="m-2">
            <ConnectButton />
          </div>
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default Navbar;
