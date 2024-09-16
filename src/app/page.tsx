"use client";

import { Button } from "@/components/Button";
import { IconArrowRight } from "@/components/Icons/IconArrowRight";
import config from "@/config/configuration";
import { useCollateralCheck } from "@/hooks/useDeploy";
import { checkWhiteList } from "@/services/check-white-list";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useAccount, useSwitchChain } from "wagmi";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const { open: openWeb3Modal } = useWeb3Modal();
  const { address, chainId } = useAccount();
  const { switchChainAsync } = useSwitchChain();

  const router = useRouter();
  const targetChain = config.SUPPORTED_CHAINS[0].id;

  const handleLaunchToken = async () => {
    setLoading(true);
    try {
      if (!address) {
        await openWeb3Modal();
      }

      if (chainId !== targetChain) {
        const swicthChangeResponse = await switchChainAsync({
          chainId: targetChain,
        });
        if (swicthChangeResponse.id !== targetChain) return;
      }

      if (address) {
        console.log("Launching Token for address:", address);
        const isWhiteListed = await checkWhiteList(address);
        if (isWhiteListed) {
          router.push("/token-form");
        } else {
          router.push("/not-whitelisted");
        }
      } else {
        toast.error("Please try again!");
        setLoading(false);
      }
    } catch (error) {
      toast.error(
        "Error in checking your eligibility to launch token!\nPlease try again!"
      );
      console.error("Error:", error);
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
        <IconArrowRight size={32} />
      </div>
      <Button
        onClick={() => (address ? handleLaunchToken() : openWeb3Modal())}
        loading={loading}
      >
        {address ? "Launch Token" : "Connect Wallet"}
      </Button>
    </main>
  );
}
