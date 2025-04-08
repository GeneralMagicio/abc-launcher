"use client";

import { useMutation } from "@tanstack/react-query";
import { RequestedModules } from "@inverter-network/sdk";
import { useInverter } from "./useInverter";
import { toast } from "sonner";
import { UserArgs } from "@/types/inverter";
import { useAccount, usePublicClient } from "wagmi";
import { Address, formatEther, getContract, PublicClient } from "viem";
import config, {
  INVERTER_FACTORY_CONTRACT_NAME,
  inverterFactoryType,
} from "@/config/configuration";
import { MintWrapperAbi, RestrictedPIMFactoryv1Abi } from "@/lib/abi";
import { useAddressWhitelist } from "./useAddressWhitelist";

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

  const getIssuanceTokenFromWrapper = async (
    address: Address
  ): Promise<Address> => {
    const mintWrapper = getContract({
      address,
      client: inverter?.publicClient!,
      abi: MintWrapperAbi,
    });
    return (await mintWrapper.read.issuanceToken()) as Address;
  };

  return {
    inverter,
    requestedModules,
    prep,
    deploy,
    getIssuanceTokenFromWrapper,
  };
};

export const useCollateralBalance = () => {
  const inverter = useInverter();
  const { address: userAddress } = useAccount();
  // const { data: addrssWhitelist } = useAddressWhitelist();

  const factoryAddress = useFactoryAddress();

  return useMutation({
    mutationFn: async (address: Address): Promise<number | false> => {
      const fa = await factoryAddress.mutateAsync();
      if (!fa) {
        return false;
      }
      // const factory = inverter?.getModule({
      //   name: INVERTER_FACTORY_CONTRACT_NAME,
      //   address: fa,
      // });

      const factory = getContract({
        abi: RestrictedPIMFactoryv1Abi,
        client: inverter?.publicClient!,
        address: fa!,
      });

      const result = (await factory?.read.getFundingAmount([
        userAddress,
        address,
        config.INITIAL_ADMIN || userAddress,
        config.COLATERAL_TOKEN,
      ])) as bigint | null;

      if (result) {
        const ethResult = formatEther(result);

        console.log("Result:", ethResult);

        return +ethResult;
      }
      return 0;
    },
  });
};
export const useCollateralCheck = () => {
  const collateralBalance = useCollateralBalance();

  return useMutation({
    mutationFn: async (address: Address) => {
      const ethResult = await collateralBalance.mutateAsync(address);
      if (ethResult === false) {
        return false;
      }
      return ethResult >= +config.bondingCurveParams.initialCollateralSupply;
    },
  });
};

export const useFactoryAddress = () => {
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
