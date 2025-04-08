import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { cookieStorage, createStorage } from "wagmi";
import config from "./configuration";

// Your WalletConnect Cloud project ID
// export const projectId = "cea85f2edebb693e0443973f37e23153";

export const projectId = process.env
  .NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string;

// Create a metadata object
export const metadata = {
  name: "qacc",
  description: "AppKit Example",
  url: "https://abclauncher.giveth.io/", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

// export const networks = config.SUPPORTED_CHAINS;

export const wagmiConfig = defaultWagmiConfig({
  chains: config.SUPPORTED_CHAINS,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  auth: {
    email: false,
    socials: undefined,
  },
});
