import { abi, bytecode } from "@/lib/nft";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";
import { useAddressWhitelist } from "@/hooks/useAddressWhitelist";

export const useNFT = () => {
  const walletClient = useWalletClient();
  const publicClient = usePublicClient();
  const { address } = useAccount();
  const { data: whitelist } = useAddressWhitelist();

  const deploy = useMutation({
    mutationFn: async ({ name, symbol }: { name: string; symbol: string }) => {
      if (!walletClient?.data) throw new Error("Wallet client not found");
      if (!publicClient) throw new Error("Public client not found");
      if (!whitelist?.nftImageURI) throw new Error("NFT image not found");

      const nftImage = whitelist?.nftImageURI;

      const hash = await walletClient.data.deployContract({
        abi,
        bytecode,
        args: [name, symbol, address, whitelist?.nftImageURI],
      });

      toast.info(`Waiting for NFT deploy confirmation: ${hash}`);
      const reciept = await publicClient?.waitForTransactionReceipt({ hash });

      return reciept.contractAddress;
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { deploy };
};
