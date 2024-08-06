import { Chain, polygonZkEvm } from "wagmi/chains";

const config = {
  SUPPORTED_CHAINS: [polygonZkEvm] as [Chain],
  GRAPHQL_ENDPOINT:
    process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ||
    "https://mainnet.serve.giveth.io/graphql",
};

export default config;
