import { EnvConfig } from "@/types/config";
import { Address } from "viem";
import { Chain, polygonZkEvm } from "wagmi/chains";

const config: EnvConfig = {
  SUPPORTED_CHAINS: [polygonZkEvm] as [Chain],
  COLATERAL_TOKEN: "0x22B21BedDef74FE62F031D2c5c8F7a9F8a4b304D" as Address,
  INITIAL_ADMIN: "0x8DDF607FcFb260798Ae450cfc15292a75B4D4850",
  GRAPHQL_ENDPOINT:
    process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ||
    "https://mainnet.serve.giveth.io/graphql",

  bondingCurveParams: {
    formula: "0xaAA597779bdbC7D54836FCdDDd38690787d04d6d" as Address,
    reserveRatioForBuying: 125000,
    reserveRatioForSelling: 125000,
    buyFee: "800",
    sellFee: "800",
    buyIsOpen: true,
    sellIsOpen: true,
    initialIssuanceSupply: "6400000", // human readable format
    // This will be deposited into the contract
    initialCollateralSupply: "140964.2", // human readable format,
  },
  SCAN_URL: "https://zkevm.polygonscan.com/",
  tokenIssueMaxSupply:
    "115792089237316195423570985008687907853269984665640564039457.584007913129639935",
  gotToDashboardLink: "https://q-acc.vercel.app/create",
};

export default config;
