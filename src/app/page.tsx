"use client";

import { Button } from "@/components/Button";
import { IconArrowRight } from "@/components/Icons/IconArrowRight";
import config from "@/config/configuration";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAccount, useSwitchChain } from "wagmi";
import { tokenExist } from "@/app/actions/tokenExist";
import React from "react";
import { checkWhitelist } from "./actions/check-whiltelist";
import { useCollateralCheck } from "@/hooks/useDeploy";
import { useAppKit } from "@reown/appkit/react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const { open: openWeb3Modal } = useAppKit();
  const { address, chainId } = useAccount();
  const { switchChainAsync } = useSwitchChain();
  const collateralCheck = useCollateralCheck();
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
        const whitelist = await checkWhitelist(address);
        if (whitelist) {
          const isCollateral = await collateralCheck.mutateAsync(
            whitelist.fundingPotMultisig
          );

          if (!isCollateral) {
            toast.error(
              "Not enough collateral is supplied to you! You are not eligible to launch a token."
            );
            setLoading(false);
            return;
          }
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

  // if user already launched token redirect to token-exist page
  useEffect(() => {
    if (address) {
      tokenExist({ userAddress: address }).then((project) => {
        if (project) {
          router.push("/token-exist");
        }
      });
    }
  }, [address, router]);

  return (
    <>
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
    </>
  );
}
