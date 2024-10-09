import { EnvConfig } from "@/types/config";
import { UserArgs } from "@/types/inverter";
import { Address } from "viem";
import { Chain, optimismSepolia, baseSepolia } from "wagmi/chains";

const INFURA_ID = ''; // todo: how should I inject INFURA_ID in a safe way?

const config: EnvConfig = {
  SUPPORTED_CHAINS: [baseSepolia] as [Chain],
  COLATERAL_TOKEN: "0x065775C7aB4E60ad1776A30DCfB15325d231Ce4F",
  // COLATERAL_SUPPLIER: "0x0000000000000000000000000000000000000000",
  GRAPHQL_ENDPOINT:
    process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ||
    "https://impact-graph.serve.giveth.io/graphql",

  bondingCurveParams: {
    formula: "0xfaf6c989dB0582D7b31e40343dd4A41a1848E038" as Address,
    reserveRatioForBuying: 333333,
    reserveRatioForSelling: 333333,
    buyFee: "0",
    sellFee: "100",
    buyIsOpen: true,
    sellIsOpen: true,
    initialIssuanceSupply: "3000", // human readable format
    // This will be deposited into the contract
    initialCollateralSupply: "1000", // human readable format,
  },
  SCAN_URL: "https://sepolia.basescan.org/",
  tokenIssueMaxSupply: "1000000",
  gotToDashboardLink: "https://q-acc.vercel.app/create",

  PROVIDER_URL: `https://base-sepolia.infura.io/v3/${INFURA_ID}`,
};

export default config;
