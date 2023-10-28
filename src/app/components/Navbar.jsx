"use client";
import "@rainbow-me/rainbowkit/styles.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

function Navbar() {
  return (
    <div className="navbar bg-base-100 flex justify-between border-b sticky top-30 z-54">
      <Link href={"/home"} className="btn btn-ghost normal-case text-xl">IntelliForm</Link>
      <div className="m-2">
        <ConnectButton />
      </div>
    </div>
  );
}

export default Navbar;
