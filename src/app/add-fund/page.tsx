"use client";
import { Button } from "@/components/Button";
import config, { INVERTER_FACTORY_CONTRACT_NAME } from "@/config/configuration";
import { useCollateralBalance, useFactoryAddress } from "@/hooks/useDeploy";
import React, { ChangeEvent, useEffect, useState } from "react";
import { isAddress, parseEther, getContract, formatEther } from "viem";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";
import { toast } from "sonner";
import { Erc20Abi, RestrictedPIMFactoryv1Abi } from "@/lib/abi";
import { useInverter } from "@/hooks/useInverter";
import { useAddressWhitelist } from "@/hooks/useAddressWhitelist";

export default function NotWhiteListedPage() {
  const { address } = useAccount();
  const [projectAddress, setProjectAddress] = useState<string>();
  const [isValidAddress, setIsValidAddress] = useState<boolean>();
  const { data: addressWhitelist } = useAddressWhitelist();

  useEffect(() => {
    if (!!addressWhitelist) {
      setProjectAddress((pa) => {
        if (!pa) {
          return addressWhitelist.fundingPotMultisig;
        }
      });
    }
  }, [addressWhitelist]);

  const collateralBalance = useCollateralBalance();
  const useFA = useFactoryAddress();
  const inverter = useInverter();

  const walletClient = useWalletClient();
  const publicClient = usePublicClient();
  const addFund = async () => {
    if (!projectAddress || !isAddress(projectAddress)) {
      toast.error("Invalid project address");
      return;
    }
    const collateralAmount = parseEther(
      config.bondingCurveParams.initialCollateralSupply
    );
    const collateralToken = config.COLATERAL_TOKEN;

    const collateralTokenContract = getContract({
      address: collateralToken,
      abi: Erc20Abi,
      client: walletClient?.data!,
    });

    const userCollateralBalance = (await collateralTokenContract.read.balanceOf(
      [address!]
    )) as bigint;

    console.log("collateral balance:", formatEther(userCollateralBalance));

    if (userCollateralBalance < collateralAmount) {
      toast.info("Not enough balance to add fund, minting...");
      const tx = await collateralTokenContract.write.mint([
        address!,
        collateralAmount * BigInt(1000000),
      ]);
      await publicClient!.waitForTransactionReceipt({ hash: tx });
    }

    const factoryAddress = await useFA.mutateAsync();
    if (!factoryAddress) {
      return false;
    }

    const allowance = (await collateralTokenContract.read.allowance([
      address!,
      factoryAddress!,
    ])) as bigint;

    console.log("allowance:", formatEther(allowance));
    if (allowance < collateralAmount) {
      toast.info("Approving collateral token...");
      const tx = await collateralTokenContract.write.approve([
        factoryAddress!,
        collateralAmount,
      ]);
      await publicClient!.waitForTransactionReceipt({ hash: tx });
    }

    toast.info("Adding fund...");

    // const factory = inverter?.getModule({
    //   name: INVERTER_FACTORY_CONTRACT_NAME,
    //   address: factoryAddress,
    // });

    const factory = getContract({
      abi: RestrictedPIMFactoryv1Abi,
      client: walletClient.data!,
      address: factoryAddress,
    });

    const tx = await factory?.write.addFunding([
      address,
      projectAddress!,
      address, // admin
      config.COLATERAL_TOKEN,
      collateralAmount.toString(),
    ]);

    await publicClient!.waitForTransactionReceipt({ hash: tx! });

    await getBalance();
  };

  const [balance, setBalance] = useState<string>("-");
  const [balanceLoading, setLoadingBalance] = useState(false);

  const getBalance = async () => {
    try {
      if (projectAddress && isAddress(projectAddress)) {
        setLoadingBalance(true);
        const balance = await collateralBalance.mutateAsync(projectAddress);
        setBalance(balance !== false ? balance.toString() : "-");
      } else {
        setBalance("-");
      }
    } finally {
      setLoadingBalance(false);
    }
  };

  useEffect(() => {
    getBalance();
  }, [projectAddress]);

  useEffect(() => {
    setIsValidAddress(!!projectAddress && isAddress(projectAddress));
  }, [projectAddress]);

  return (
    <main className="container flex justify-center items-center min-h-screen">
      <div className="p-10 bg-white shadow-lg rounded-lg flex flex-col items-center gap-6 w-[500px]">
        <div className="flex flex-col items-center w-full gap-4">
          <input
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              isValidAddress
                ? "border-gray-300 focus:ring-gray-400"
                : "border-red-500 focus:ring-red-500"
            }`}
            name="projectAddress"
            placeholder="Enter project address (0x...)"
            value={projectAddress}
            onChange={(e) => setProjectAddress(e.target.value)}
          />

          {/* Validation message */}
          {!isValidAddress && (
            <p className="text-sm text-red-500">Invalid Ethereum address</p>
          )}

          {/* Description */}
          <p className="text-sm text-gray-500">
            Actor Address (project funding pot)
          </p>
        </div>

        <div className="flex flex-col items-center w-full gap-4">
          <div className="flex items-center text-xl font-semibold">
            <span className="mr-2">Sponsored Balance:</span>
            {balanceLoading ? (
              <svg
                className="animate-spin h-6 w-6 text-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            ) : (
              <span>{balance}</span>
            )}
          </div>

          <button
            className={`px-4 py-2 rounded-md text-white transition-colors ${
              balanceLoading
                ? "bg-blue-400"
                : "bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
            }`}
            onClick={getBalance}
            disabled={balanceLoading}
          >
            {balanceLoading ? "Loading..." : "Refech!"}
          </button>
        </div>

        <Button className="w-full py-3 mt-4" onClick={addFund}>
          Add Fund
        </Button>
      </div>
    </main>
  );
}
