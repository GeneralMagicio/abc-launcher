// context/index.tsx

"use client";

import { createAppKit } from "@reown/appkit/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { Config, State, WagmiProvider } from "wagmi";
import { projectId, wagmiAdapter, metadata } from "@/config/wagmi";
import config from "@/config/configuration";

// Setup queryClient
const queryClient = new QueryClient();

// Create modal
createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: config.SUPPORTED_CHAINS,
  metadata,
  features: {
    analytics: true,
    email: false,
    socials: [],
    onramp: false,
    swaps: false,
  },
});

export default function Web3ModalProvider({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState?: State;
}) {
  return (
    <WagmiProvider
      config={wagmiAdapter.wagmiConfig as Config}
      initialState={initialState}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
