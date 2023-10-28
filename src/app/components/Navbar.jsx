"use client";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  ConnectButton,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import Link from "next/link";
import { useEffect } from "react";

import { MetaMaskUIProvider, MetaMaskButton } from '@metamask/sdk-react-ui';

function Navbar() {
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
  }
  catch (err) {
    // console.log(err);
  }

  useEffect(() => {

  }, []);

  return (
    // <WagmiConfig config={wagmiConfig} className="sticky top-0 z-50">
    //   <RainbowKitProvider chains={chains}>
    //     <div className="navbar bg-base-100 flex justify-between border-b sticky top-30 z-54">
    //       <Link href={"/home"} className="btn btn-ghost normal-case text-xl">IntelliForm</Link>
    //       <div className="m-2">
    //         <ConnectButton />
    //       </div>
    //     </div>
    //   </RainbowKitProvider>
    // </WagmiConfig>

    <MetaMaskUIProvider sdkOptions={{
      dappMetadata: {
        name: "Demo UI React App",
      },
      defaultReadOnlyChainId: "0x13881",
    }}>
      <div className="navbar bg-base-100 flex justify-between border-b sticky top-30 z-54">
        <Link href={"/home"} className="btn btn-ghost normal-case text-xl">IntelliForm</Link>
        <div className="m-2">
        <MetaMaskButton theme={"light"} color="white"></MetaMaskButton>
        </div>
      </div>
    </MetaMaskUIProvider>

  );
}

export default Navbar;
