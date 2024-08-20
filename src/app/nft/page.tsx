"use client";
import { Button } from "@/components/Button";
import { abi, bytecode } from "@/lib/nft";
import React from "react";
import { usePublicClient, useWalletClient } from "wagmi";

export default function NotWhiteListedPage() {
  const walletClient = useWalletClient();
  const publicClient = usePublicClient();
  const handleMint = async () => {
    if (walletClient?.data && publicClient) {
      console.log("deploying...");
      const hash = await walletClient.data.deployContract({
        abi,
        bytecode,
        args: ["AAA", "BBB"],
      });

      console.log("Hash:", hash);

      const reciept = await publicClient?.waitForTransactionReceipt({ hash });

      console.log("Reciept:", reciept.contractAddress);
    }
  };
  return (
    <main className="container flex items-center">
      <div className="p-10 flex flex-col items-center gap-4 max-w-3xl mx-auto">
        <Button onClick={handleMint}>Mint NFT</Button>
      </div>
    </main>
  );
}
