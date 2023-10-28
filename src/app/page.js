"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (

    <main className="relative flex justify-start items-center h-[100vh] overflow-hidden bg-gradient-to-tl  from-blue-500 to-blue-100">
      <div>
        <h1 className="ml-20 relative text-black text-8xl font-bold">IntelliForm</h1>
        <p className="text-black mt-5 text-2xl ml-20">An intelligent form creator for Web3</p>
        <button className="ml-20 mt-10 btn btn-primary text-xl" onClick={() => router.push("/home")}>
          GET STARTED
        </button>
      </div>
    </main>

  );
}
