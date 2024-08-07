import { Address } from "viem";
import { Chain, optimismSepolia } from "wagmi/chains";

const config = {
  SUPPORTED_CHAINS: [optimismSepolia] as [Chain],
  COLATERAL_TOKEN: "0xd5018fA63924d1BE2C2C42aBDc24bD754499F97c" as Address,
  GRAPHQL_ENDPOINT:
    process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ||
    "https://impact-graph.serve.giveth.io/graphql",

  bondingCurveParams: {
    formula: "0x3ddE767F9DF9530DDeD47e1E012cCBf7B4A04dd7" as Address,
    reserveRatioForBuying: "333333",
    reserveRatioForSelling: "333333",
    buyFee: "0",
    sellFee: "100",
    buyIsOpen: true,
    sellIsOpen: true,
    initialIssuanceSupply: "1",
    initialCollateralSupply: "3",
  },
  SCAN_URL: "https://sepolia-optimism.etherscan.io/",
  tokenIssueMaxSupply: "1000000",
};

export default config;
