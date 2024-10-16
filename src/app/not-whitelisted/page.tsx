"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { useAddressWhitelist } from "@/hooks/useAddressWhitelist";

export default function NotWhiteListedPage() {
  const { address, chainId } = useAccount();
  const router = useRouter();
  const useWhitelist = useAddressWhitelist();

  if (!!useWhitelist.data) {
    router.push("/token-form");
  }

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
