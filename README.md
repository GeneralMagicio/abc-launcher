# ABC Launcher

ABC Launcher is a Next.js dApp for launching regenerative token economies using Augmented Bonding Curves (ABCs). It enables users to connect their wallet, check eligibility, supply collateral, and deploy a token and NFT in a guided, multi-step process.

---

## Table of Contents

- [Features](#features)
- [Architecture Overview](#architecture-overview)
- [Main User Flow](#main-user-flow)
- [Directory Structure](#directory-structure)
- [Getting Started](#getting-started)
- [Developer Onboarding](#developer-onboarding)
- [Sequence Diagram](#sequence-diagram)
- [Key Technologies](#key-technologies)
- [Contributing](#contributing)

---

## Features

- **Wallet Connection**: Users connect their wallet to begin the process.
- **Eligibility Check**: Checks if the user is whitelisted and has sufficient collateral.
- **Token Launch Wizard**: Multi-step form for entering token info, agreeing to terms, setting policies, deploying NFT, and confirming.
- **Collateral Management**: Users can add funds to meet collateral requirements.
- **NFT Deployment**: Deploys an NFT as part of the token launch.
- **Success & Error Handling**: User feedback via modals and toasts.
- **API Integration**: Uses IPFS for decentralized storage and interacts with smart contracts.

---

## Architecture Overview

- **Frontend**: Next.js (App Router), React, Tailwind CSS.
- **Blockchain**: wagmi, viem, smart contract ABIs.
- **State Management**: React Context, custom hooks.
- **API**: Next.js API routes (e.g., IPFS upload).
- **Reusable Components**: Modal, Button, Form Steps, DropZone, etc.

---

## Main User Flow

1. **Landing Page**: User connects wallet.
2. **Eligibility Check**: Checks whitelist and collateral.
3. **Token Already Exists?**: Redirects if user already launched a token.
4. **Token Launch Wizard**: Multi-step form for token info, terms, policy, NFT, confirmation, and success.
5. **Collateral Management**: If insufficient, user is prompted to add funds.
6. **NFT Deployment**: NFT is deployed as part of the process.
7. **Completion**: User sees a success screen.

---

## Directory Structure

```
src/
  app/                # Next.js app routes and pages
    actions/          # Server actions (whitelist, tokenExist, etc.)
    add-fund/         # Collateral supply page
    api/              # API routes (e.g., IPFS)
    nft/              # NFT deployment page
    not-whitelisted/  # Not eligible page
    signMessage/      # Message signing page
    token-exist/      # Token already exists page
    token-form/       # Main token launch wizard
  components/         # Reusable UI components
    TokenForm/        # Multi-step form components
    DropZone/         # File upload
    ConnectButton/    # Wallet connect logic
    Loading/          # Spinners, loaders
    Icons/            # SVG icons
  config/             # App and blockchain config
  constants/          # Terms, privacy, and other constants
  context/            # React context providers
  hooks/              # Custom React hooks (blockchain, deploy, etc.)
  lib/                # Blockchain ABIs, NFT logic, DB helpers
  services/           # Business logic, API, blockchain services
  types/              # TypeScript types
  helpers/            # Utility functions
```

---

## Getting Started

1. **Install dependencies**:

   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

2. **Configure environment**:

   - Copy `.env.example` to `.env.local` and fill in required values.

3. **Run the development server**:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   bun dev
   ```

4. **Open** [http://localhost:3000](http://localhost:3000) in your browser.

---

## Developer Onboarding

- **Main Flows**: Start with `src/app/page.tsx` (landing), then follow the logic to `token-form`, `add-fund`, and `nft`.
- **Business Logic**: Check `src/app/actions/` for server actions and `src/services/` for blockchain interactions.
- **UI Components**: Located in `src/components/`. The token launch wizard is in `TokenForm/`.
- **Custom Hooks**: Encapsulate blockchain and business logic in `src/hooks/`.
- **Smart Contract ABIs**: In `src/lib/abi.ts`.
- **API**: Next.js API routes in `src/app/api/`.
- **Styling**: Tailwind CSS, configured in `tailwind.config.ts`.

**To add a new feature:**

- Add a new page in `src/app/` or a new component in `src/components/`.
- Use hooks for blockchain logic.
- Use context for global state (e.g., wallet connection).

---

## Sequence Diagram

>
![mermaid-ai-diagram-2025-06-02-141603](https://github.com/user-attachments/assets/3dc08930-ba54-4751-a6d4-8bca2ca9fa4e)

---

## Key Technologies

- **Next.js (App Router)**
- **React, React Context, Custom Hooks**
- **wagmi, viem (Web3)**
- **Tailwind CSS**
- **IPFS**
- **TypeScript**

---

## Contributing

1. Fork and clone the repo.
2. Create a new branch for your feature.
3. Follow the code style and structure.
4. Submit a pull request.

---

**For more details, check the code comments and follow the main flow from `src/app/page.tsx`.**
