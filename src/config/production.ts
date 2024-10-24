import { EnvConfig } from "@/types/config";
import { Address } from "viem";
import { Chain, polygonZkEvm } from "wagmi/chains";

const config: EnvConfig = {
  SUPPORTED_CHAINS: [polygonZkEvm] as [Chain],
  COLATERAL_TOKEN: "0x0000000000000000000000000000000000000000" as Address,
  INITIAL_ADMIN: "0x8DDF607FcFb260798Ae450cfc15292a75B4D4850",
  GRAPHQL_ENDPOINT:
    process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ||
    "https://mainnet.serve.giveth.io/graphql",

  bondingCurveParams: {
    formula: "0x0000000000000000000000000000000000000000" as Address,
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
  SCAN_URL: "https://etherscan.io/",
  tokenIssueMaxSupply: "1000000",
  gotToDashboardLink: "https://q-acc.vercel.app/create",
};

export default config;
