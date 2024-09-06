import { Address } from "viem";
import { Chain, polygonZkEvm } from "wagmi/chains";

const config = {
  SUPPORTED_CHAINS: [polygonZkEvm] as [Chain],
  COLATERAL_TOKEN: "0x0000000000000000000000000000000000000000" as Address,
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

  // TODO: remove this with real one @aminlatifi
  MINT_CONTRACT_ADDRESS: "0x5D551A1fc7DA45F9761CE5FBE052897E34C1DFbd" as Address,
};

export default config;
