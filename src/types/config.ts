import { Address, Chain } from "viem";
import { UserArgs } from "./inverter";
import type { inverterFactoryType } from "@/config/configuration";

export type EnvConfig = {
  SUPPORTED_CHAINS: [Chain];
  COLATERAL_TOKEN: Address;
  COLATERAL_SUPPLIER?: Address;
  INITIAL_ADMIN?: Address;
  GRAPHQL_ENDPOINT: string;
  bondingCurveParams: UserArgs<inverterFactoryType>["fundingManager"]["bondingCurveParams"];
  SCAN_URL: string;
  tokenIssueMaxSupply: string;
  gotToDashboardLink: string;
};
