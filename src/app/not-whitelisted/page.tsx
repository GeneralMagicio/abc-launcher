"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";

import { checkWhiteList } from "@/services/check-white-list";

export default function NotWhiteListedPage() {
  const { address, chainId } = useAccount();
  const router = useRouter();

  // Handle address changes
  useEffect(() => {
    async function fetchData() {
      if (address) {
        const isWhiteListed = await checkWhiteList(address);
        if (isWhiteListed) {
          router.push("/token-form");
        }
      }
    }
    fetchData();
  }, [address, router]);

  return (
    <main className="container text-center">
      <div className="p-10 bg-white rounded-2xl shadow-sm flex flex-col items-center gap-4 max-w-3xl mx-auto">
        <h1 className="text-2xl font-medium">Hold On!</h1>
        <p className="text-2xl font-thin">
          That address is not on the allowlist.
        </p>
      </div>
    </main>
  );
}
