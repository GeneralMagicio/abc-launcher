"use client";

import { useMutation } from "@tanstack/react-query";
import { GetUserArgs, RequestedModules } from "@inverter-network/sdk";
import { useInverter } from "./useInverter";
import { toast } from "sonner";
import { on } from "events";

export const requestedModules = {
  fundingManager: "FM_BC_Restricted_Bancor_Redeeming_VirtualSupply_v1",
  authorizer: "AUT_Roles_v1",
  paymentProcessor: "PP_Streaming_v1",
  optionalModules: ["LM_PC_PaymentRouter_v1"],
} satisfies RequestedModules;

export const useDeploy = () => {
  const inverter = useInverter();

  const prep = useMutation({
    mutationFn: () => {
      if (!inverter) throw new Error("Inverter instance not found");
      return inverter.getDeploy(requestedModules);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const deploy = useMutation({
    mutationFn: async ({
      userArgs,
      prepData,
    }: {
      prepData: typeof prep.data;
      userArgs: GetUserArgs<{
        fundingManager: "FM_BC_Bancor_Redeeming_VirtualSupply_v1";
        authorizer: "AUT_Roles_v1";
        paymentProcessor: "PP_Simple_v1";
      }>;
    }) => {
      const a = 3;
      if (!prepData) throw new Error("No deploy data found");

      return prepData.run(userArgs);
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: async ({ transactionHash, orchestratorAddress }) => {
      toast.info(`Waiting for confirmation: ${transactionHash}`);

      await inverter?.publicClient.waitForTransactionReceipt({
        hash: transactionHash,
      });
    },
  });

  return {
    inverter,
    requestedModules,
    prep,
    deploy,
  };
};

export type UseDeployReturn = ReturnType<typeof useDeploy>;
