import { useMutation } from "@tanstack/react-query";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";
import { waitForTransactionReceipt } from "@wagmi/core";
import { parseEther } from "viem";
import { toast } from "sonner";

import config from "@/config/configuration";
import { wagmiConfig } from "@/config/wagmi";

// Contract ABI
const contractABI = [
  {
    inputs: [{ internalType: "address", name: "receiver", type: "address" }],
    name: "mint",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "payable",
    type: "function",
  },
];

export const useMintNFT = () => {
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();
  const chainId = publicClient?.chain.id;

  const mintNFT = useMutation({
    mutationFn: async (valueInEther: string) => {
      if (!walletClient) {
        throw new Error("Wallet client not found");
      }

      // Call "mint" function on the contract
      const txHash = await walletClient.writeContract({
        address: config.MINT_CONTRACT_ADDRESS,
        abi: contractABI,
        functionName: "mint",
        args: [address],
        value: parseEther(valueInEther),
      });

      // Wait for the transaction to be mined (confirmed)
      const receipt = await waitForTransactionReceipt(wagmiConfig, {
        hash: txHash,
      });

      return receipt;
    },
    onError: (error: any) => {
      toast.error(`Minting failed: ${error.message}`);
    },
    onSuccess: (receipt: any) => {
      toast.success(`NFT minted successfully! Tx: ${receipt.transactionHash}`);
    },
  });

  return { mintNFT };
};
