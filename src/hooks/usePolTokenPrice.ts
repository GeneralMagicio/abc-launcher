import { fetchPolTokenPrice } from "@/services/pol-token";
import { useQuery } from "@tanstack/react-query";

export const usePolTokenPrice = () => {
  return useQuery({
    queryKey: ["polTokenPrice"],
    queryFn: fetchPolTokenPrice,
    refetchInterval: 60_000, // 1 minute
    refetchOnWindowFocus: false,
    staleTime: 5 * 60_000, // 5 minutes
  });
};
