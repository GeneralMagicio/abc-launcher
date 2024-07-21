"use client";
import { callInverter } from "@/app/service/inverter";
import { Inverter } from "@inverter-network/sdk";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useEffect, type FC } from "react";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";

interface IButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export const ConnectButton: FC<IButtonProps> = ({ children }) => {
  const { open } = useWeb3Modal();
  const { isConnected } = useAccount();
  const publicClient = usePublicClient();
  const walletClient = useWalletClient();

  return (
    <button
      onClick={() => {
        // if (!isConnected) open();
        // if (isConnected && publicClient && walletClient?.data) {
        //   const sdk = new Inverter(publicClient, walletClient.data); // the clients correspond to viem's clients
        //   callInverter(sdk);
        // }
      }}
      className="inline-block text-white font-bold text-xs border-none rounded-full bg-pink-500 py-4 px-10"
    >
      {children}
    </button>
  );
};
