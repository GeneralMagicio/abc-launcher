import { Address } from "viem";
import { Chain, optimismSepolia } from "wagmi/chains";

const config = {
  SUPPORTED_CHAINS: [optimismSepolia] as [Chain],
  COLATERAL_TOKEN: "0x065775C7aB4E60ad1776A30DCfB15325d231Ce4F" as Address,
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
  SCAN_URL: "https://sepolia-optimism.etherscan.io/",
  tokenIssueMaxSupply: "1000000",
  gotToDashboardLink: "https://q-acc.vercel.app/create",

  // TODO: remove this with real one @aminlatifi
  MINT_CONTRACT_ADDRESS: "0x5D551A1fc7DA45F9761CE5FBE052897E34C1DFbd" as Address,
};

export default config;
