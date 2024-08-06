import { Chain, optimismSepolia } from "wagmi/chains";

const config = {
  SUPPORTED_CHAINS: [optimismSepolia] as [Chain],
  GRAPHQL_ENDPOINT:
    process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ||
    "https://impact-graph.serve.giveth.io/graphql",
};

export default config;
