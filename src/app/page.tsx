"use client";

import { Button } from "@/components/Button";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAccount, useConnect, useDisconnect } from "wagmi";

export default function Home() {
  const { open: openWeb3Modal } = useWeb3Modal();
  const { address } = useAccount();
  const router = useRouter();

  const handleLaunchToken = async () => {
    if (!address) {
      await openWeb3Modal();
    }
    if (address) {
      console.log("Launching Token for address:", address);
      // Send the address to your endpoint
      fetch("/api/whitelist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          if (data.isWhiteListed) {
            router.push("/token-form");
          } else {
            router.push("/not-whitelisted");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <main className="container text-center flex flex-col items-center gap-8">
      <div className="flex flex-col items-center gap-6 py-10">
        <h1 className="text-5xl	font-bold leading-normal">
          Launch your token economy
        </h1>
        <p className="font-semibold text-2xl max-w-[620px]">
          Create your regenerative economy with Augmented Bonding Curves.
        </p>
      </div>
      <div className="flex gap-4">
        <p className="text-2xl font-light">
          Start the process by connecting your wallet
        </p>
        <Image
          src="/images/icons/arrow-right.svg"
          alt="logo"
          width={32}
          height={32}
        />
      </div>
      <Button onClick={handleLaunchToken}>Launch Token</Button>
    </main>
  );
}
