import { useAccount, useSignMessage } from "wagmi";
import { useMutation } from "@tanstack/react-query";
import { submitSignedMessage } from "@/app/actions/submitSignedMessage";

export const useSignAndSubmit = () => {
  const { signMessageAsync } = useSignMessage();
  const { address } = useAccount();

  const signAndSubmit = useMutation({
    mutationFn: async ({
      message,
      type,
    }: {
      message: string;
      type: string;
    }) => {
      if (!address) {
        throw new Error("Address not found");
      }
      const signature = await signMessageAsync({ message });
      return submitSignedMessage({
        message,
        signature,
        type,
        userAddress: address,
      });
    },
  });

  return { signAndSubmit };
};
