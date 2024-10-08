import { useAccount, useSwitchChain } from "wagmi";
import { toast } from "sonner";

/**
 * Custom React hook to switch the blockchain network if needed.
 * This hook fetches the `chainId` from the connected account using wagmi and
 * performs a chain switch using `switchChainAsync`.
 *
 * @param {number} targetChain - The chain ID you want to switch to.
 * @returns {Promise<boolean>} - Returns `true` if the switch is successful, otherwise `false`.
 */
export const useSwitchChainIfNeeded = () => {
  const { chainId } = useAccount();
  const { switchChainAsync } = useSwitchChain();

  const switchChainIfNeeded = async (targetChain: number): Promise<boolean> => {
    if (chainId !== targetChain) {
      try {
        const switchChainResponse = await switchChainAsync({
          chainId: targetChain,
        });

        if (switchChainResponse.id !== targetChain) {
          toast.error("Failed to switch chain. Please switch manually.");
          return false;
        }
      } catch (error) {
        toast.error("Error while switching chain. Please try manually.");
        return false;
      }
    }
    return true;
  };

  return { switchChainIfNeeded };
};
