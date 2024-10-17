import { EnvConfig } from "@/types/config";
import development from "./development";
import production from "./production";
import { FactoryType } from "@inverter-network/sdk";

export const isProduction = process.env.NEXT_PUBLIC_ENV === "production";

const envConfig: EnvConfig = isProduction ? production : development;

export const inverterFactoryType: FactoryType = "restricted-pim";
export type inverterFactoryType = typeof inverterFactoryType;
export const INVERTER_FACTORY_CONTRACT_NAME = "Restricted_PIM_Factory_v1";

// this is public pinata gateway url
export const ipfsGatewayURI = 'https://gateway.pinata.cloud/ipfs/';

const config: EnvConfig = {
  ...envConfig,
};

export default config;
