import { EnvConfig } from "@/types/config";
import { Address } from "viem";
import { Chain, baseSepolia } from "wagmi/chains";

const config: EnvConfig = {
  SUPPORTED_CHAINS: [baseSepolia] as [Chain],
  COLATERAL_TOKEN: "0x065775C7aB4E60ad1776A30DCfB15325d231Ce4F",
  // COLATERAL_SUPPLIER: "0x0000000000000000000000000000000000000000",
  GRAPHQL_ENDPOINT:
    process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ||
    "https://impact-graph.serve.giveth.io/graphql",

  bondingCurveParams: {
    formula: "0xfaf6c989dB0582D7b31e40343dd4A41a1848E038" as Address,
    reserveRatioForBuying: 125000,
    reserveRatioForSelling: 125000,
    buyFee: "1000",
    sellFee: "1000",
    buyIsOpen: true,
    sellIsOpen: true,
    initialIssuanceSupply: "6400000", // human readable format
    // This will be deposited into the contract
    initialCollateralSupply: "135000", // human readable format,
  },
  SCAN_URL: "https://sepolia.basescan.org/",
  tokenIssueMaxSupply: "115792089237316195423570985008687907853269984665640564039457.584007913129639935",
  gotToDashboardLink: "https://q-acc.vercel.app/create",
};

export default config;
