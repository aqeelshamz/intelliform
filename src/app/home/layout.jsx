"use client";
import { getDefaultWallets, RainbowKitProvider, ConnectButton } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import "@rainbow-me/rainbowkit/styles.css";

export default function RootLayout({ children }) {
  const { chains, publicClient } = configureChains(
    [polygonMumbai],
    [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
  );

  var wagmiConfig;

  try {
    const { connectors } = getDefaultWallets({
      appName: "intelliform",
      projectId: "a938bee08643184fb038b8deec30437f",
      chains,
    });
    wagmiConfig = createConfig({
      autoConnect: true,
      connectors,
      publicClient,
    });
  } catch (err) {
    // console.log(err);
  }

  return (
    <WagmiConfig config={wagmiConfig} className="sticky top-0 z-50">
      <RainbowKitProvider chains={chains}>
        <div>
          {children}
        </div>
      </RainbowKitProvider>
    </WagmiConfig >
  )
}
