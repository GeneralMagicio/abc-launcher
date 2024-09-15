"use client";

import { useMutation } from "@tanstack/react-query";
import { RequestedModules } from "@inverter-network/sdk";
import { useInverter } from "./useInverter";
import { toast } from "sonner";
import { UserArgs } from "@/types/inverter";
import { useAccount, usePublicClient } from "wagmi";
import { Address, formatEther } from "viem";
import config, {
  INVERTER_FACTORY_CONTRACT_NAME,
  inverterFactoryType,
} from "@/config/configuration";

const DEPLOYMENTS_URL =
  "https://raw.githubusercontent.com/InverterNetwork/deployments/main/deployments";
const DeploymentVersion = "v1.0.0";

type DeploymentResponse = {
  bancorFormula: Record<string, Address | undefined>;
  erc20Mock: Record<string, Address | undefined>;
  orchestratorFactory: Record<string, Address | undefined>;
  restrictedPimFactory: Record<string, Address | undefined>;
  immutablePimFactory: Record<string, Address | undefined>;
};

export const requestedModules = {
  fundingManager: "FM_BC_Restricted_Bancor_Redeeming_VirtualSupply_v1",
  authorizer: "AUT_Roles_v1",
  paymentProcessor: "PP_Streaming_v1",
  optionalModules: ["LM_PC_PaymentRouter_v1"],
} as const satisfies RequestedModules;

export const useDeploy = () => {
  const inverter = useInverter();

  const prep = useMutation({
    mutationFn: async () => {
      if (!inverter) throw new Error("Inverter instance not found");

      const data = await inverter.getDeploy({
        requestedModules,
        factoryType: "restricted-pim",
      });

      return data;
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
      prepData: (typeof prep)["data"];
      userArgs: UserArgs<inverterFactoryType>;
    }) => {
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

export const useCollateralCheck = () => {
  const { address } = useAccount();
  const inverter = useInverter();

  const factoryAddress = useFactoryAddress();

  return useMutation<boolean>({
    mutationKey: ["checkCollateral", address],
    mutationFn: async () => {
      const fa = await factoryAddress.mutateAsync();
      if (!fa) {
        return false;
      }
      const factory = inverter?.getModule({
        name: INVERTER_FACTORY_CONTRACT_NAME,
        address: fa,
      });
      console.log("factory:", factory);

      const sponsor = config.COLATERAL_SUPPLIER || address!;
      console.log("Sponsor:", sponsor);

      const result = await factory?.read.fundings.run([
        sponsor,
        address!,
        config.COLATERAL_TOKEN,
      ]);

      if (!result) {
        throw new Error("Error fetching funding balance!");
      }

      // viem wei to eth  of result
      const ethResult = formatEther(BigInt(result!));

      console.log("Result:", ethResult);

      return +ethResult >= +config.bondingCurveParams.initialCollateralSupply;
    },
  });
};

const useFactoryAddress = () => {
  const publicClient = usePublicClient();
  return useMutation({
    gcTime: Infinity,
    mutationKey: ["InverterDeployment"],
    mutationFn: async (): Promise<Address | undefined> => {
      const response = await fetch(
        `${DEPLOYMENTS_URL}/${DeploymentVersion}.json`
      );
      const deployment: DeploymentResponse = await response.json();
      const chainId = publicClient?.chain.id!;
      return {
        "restricted-pim": deployment.restrictedPimFactory,
        "immutable-pim": deployment.immutablePimFactory,
        default: deployment.orchestratorFactory,
      }[inverterFactoryType]?.[chainId];
    },
  });
};
export type UseDeployReturn = ReturnType<typeof useDeploy>;
