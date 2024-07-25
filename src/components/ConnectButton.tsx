"use client";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";

export const ConnectButton: React.FC = () => {
  const { open } = useWeb3Modal();
  const { address, isConnecting, isDisconnected } = useAccount();

  const handleConnect = () => {
    open();
  };

  const buttonLabel = isDisconnected
    ? "Connect Wallet"
    : `${address?.slice(0, 6)}...${address?.slice(-4)}`;

  return (
    <div className="relative">
      <button
        onClick={handleConnect}
        disabled={isConnecting}
        className={`px-4 py-3 font-bold rounded-full transition-colors duration-300 flex items-center justify-center gap-2
          ${
            isDisconnected
              ? "bg-pink-500 text-white hover:bg-pink-600"
              : "bg-white text-gray-400 shadow-sm hover:shadow-md"
          }
        `}
      >
        {isConnecting && (
          <svg
            className="animate-spin h-5 w-5 text-white"
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
        )}
        {!isConnecting && buttonLabel}
      </button>
    </div>
  );
};
