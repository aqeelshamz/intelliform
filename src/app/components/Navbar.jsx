import { FiUser } from "react-icons/fi";
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
  ConnectButton
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  zora,
} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

function Navbar() {
  const { chains, publicClient } = configureChains(
    [polygon],
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
        <div className="navbar bg-base-100">
          {/* <div className="flex-none">
          <button className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-5 h-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div> */}
          <div className="flex-1">
            <a className="btn btn-ghost normal-case text-xl">IntelliForm</a>
          </div>
          <div className="flex-none">
            <ConnectButton />
          </div>
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default Navbar;
