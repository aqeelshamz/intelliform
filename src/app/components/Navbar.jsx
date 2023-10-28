"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import "@rainbow-me/rainbowkit/styles.css";
import { useAccount } from "wagmi";

function Navbar() {
  const { address } = useAccount();

  return (
    <div className="navbar bg-base-100 flex justify-between border-b sticky top-30 z-54">
      <Link href={"/home"} className="btn btn-ghost normal-case text-xl">IntelliForm</Link>
      {address ? <div className="m-2">
        <ConnectButton />
      </div> : ""}
    </div>
  );
}

export default Navbar;
