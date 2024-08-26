import { Inverter } from "@inverter-network/sdk";
import { useQuery } from "@tanstack/react-query";
import { usePublicClient, useWalletClient } from "wagmi";

export const useInverter = () => {
  const publicClient = usePublicClient(),
    walletClient = useWalletClient(),
    chainId = publicClient?.chain.id;

  const inverter = useQuery({
    queryKey: ["inverter", chainId, walletClient.dataUpdatedAt],
    queryFn: async () => {
      const instance = new Inverter({
        publicClient: publicClient!,
        walletClient: walletClient.data,
      });

      // use math.random() as fallback for crypto.randomUUID() between 1 and 10000
      const instanceId =
        crypto?.randomUUID?.() ?? Math.floor(Math.random() * 10000);

      return Object.assign(instance, { instanceId });
    },
    enabled: !!chainId && (walletClient.isSuccess || walletClient.isError),
    refetchOnWindowFocus: false,
    gcTime: 0,
    staleTime: 30 * 60_000, // 30 minutes
  });

  return inverter.data;
};
