import { abi, bytecode } from "@/lib/nft";
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";
import { useAddressWhitelist } from "@/hooks/useAddressWhitelist";
import { ipfsGatewayURI } from "@/config/configuration";

export const useNFT = () => {
  const walletClient = useWalletClient();
  const publicClient = usePublicClient();
  const { address } = useAccount();
  const whitelist = useAddressWhitelist();
  const DEFAULT_BASE_URI = "/images/nft/nft.svg";

  const nftImageURI = whitelist?.data?.nftImageURI;

  const deploy = useMutation({
    mutationFn: async ({ name, symbol }: { name: string; symbol: string }) => {
      if (!walletClient?.data) throw new Error("Wallet client not found");
      if (!publicClient) throw new Error("Public client not found");
      // if (!nftImageURI) throw new Error("NFT image not found");

      const nftImage = nftImageURI || DEFAULT_BASE_URI;

      const hash = await walletClient.data.deployContract({
        abi,
        bytecode,
        args: [name, symbol, address, nftImage],
      });

      toast.info(`Waiting for NFT deploy confirmation: ${hash}`);
      const reciept = await publicClient?.waitForTransactionReceipt({ hash });

      return reciept.contractAddress;
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  const nftImagePath = useQuery({
    queryKey: ["nft-image", nftImageURI],
    queryFn: async () => {
      try {
        if (nftImageURI) {
          const metadataURI =
            ipfsGatewayURI + nftImageURI.replace("ipfs://", "");
          const response = await fetch(metadataURI);

          const metadata = await response.json();

          if (metadata.image) {
            return ipfsGatewayURI + metadata.image.replace("ipfs://", "");
          }
        }
      } catch (error) {
        console.error("Error fetching NFT metadata:", error);
      }
    },
    enabled: whitelist.isSuccess,
  });

  return { deploy, nftImagePath };
};
