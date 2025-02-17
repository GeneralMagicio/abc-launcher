import { Abi } from "viem";

export const Erc20Abi: Abi = [
  {
    inputs: [
      { internalType: "string", name: "_name", type: "string" },
      { internalType: "string", name: "_symbol", type: "string" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "allowance", type: "uint256" },
      { internalType: "uint256", name: "needed", type: "uint256" },
    ],
    name: "ERC20InsufficientAllowance",
    type: "error",
  },
  {
    inputs: [
      { internalType: "address", name: "sender", type: "address" },
      { internalType: "uint256", name: "balance", type: "uint256" },
      { internalType: "uint256", name: "needed", type: "uint256" },
    ],
    name: "ERC20InsufficientBalance",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "approver", type: "address" }],
    name: "ERC20InvalidApprover",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "receiver", type: "address" }],
    name: "ERC20InvalidReceiver",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "sender", type: "address" }],
    name: "ERC20InvalidSender",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "spender", type: "address" }],
    name: "ERC20InvalidSpender",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "user", type: "address" }],
    name: "blockAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "callData",
    outputs: [{ internalType: "bytes", name: "", type: "bytes" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "callSuccessful",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "user", type: "address" }],
    name: "isBlockedAddress",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes", name: "data", type: "bytes" }],
    name: "setReentrancyOnTransfer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "toggleReturnFalse",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "user", type: "address" }],
    name: "unblockAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export const MintWrapperAbi: Abi = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_issuanceToken",
        type: "address",
        internalType: "contract IERC20Issuance_v1",
      },
      {
        name: "_owner",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "allowedMinters",
    inputs: [
      {
        name: "minter",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [{ name: "allowed", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "burn",
    inputs: [
      {
        name: "_from",
        type: "address",
        internalType: "address",
      },
      {
        name: "_amount",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "decimals",
    inputs: [],
    outputs: [{ name: "", type: "uint8", internalType: "uint8" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "issuanceToken",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract IERC20Issuance_v1",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "mint",
    inputs: [
      {
        name: "_to",
        type: "address",
        internalType: "address",
      },
      {
        name: "_amount",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "name",
    inputs: [],
    outputs: [{ name: "", type: "string", internalType: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "renounceOwnership",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setMinter",
    inputs: [
      {
        name: "_minter",
        type: "address",
        internalType: "address",
      },
      { name: "_allowed", type: "bool", internalType: "bool" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "symbol",
    inputs: [],
    outputs: [{ name: "", type: "string", internalType: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "transferOwnership",
    inputs: [
      {
        name: "newOwner",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "MinterSet",
    inputs: [
      {
        name: "minter",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "allowed",
        type: "bool",
        indexed: false,
        internalType: "bool",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "MinterSet",
    inputs: [
      {
        name: "minter",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "allowed",
        type: "bool",
        indexed: false,
        internalType: "bool",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OwnershipTransferred",
    inputs: [
      {
        name: "previousOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "newOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "IERC20Issuance__CallerIsNotMinter",
    inputs: [],
  },
  {
    type: "error",
    name: "IERC20Issuance__CallerIsNotMinter",
    inputs: [],
  },
  {
    type: "error",
    name: "OwnableInvalidOwner",
    inputs: [
      {
        name: "owner",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "OwnableUnauthorizedAccount",
    inputs: [
      {
        name: "account",
        type: "address",
        internalType: "address",
      },
    ],
  },
];

export const RestrictedPIMFactoryv1Abi: Abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_orchestratorFactory",
        type: "address",
      },
      { internalType: "address", name: "_trustedForwarder", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [{ internalType: "address", name: "target", type: "address" }],
    name: "AddressEmptyCode",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "AddressInsufficientBalance",
    type: "error",
  },
  { inputs: [], name: "FactoryNotActive", type: "error" },
  { inputs: [], name: "FailedInnerCall", type: "error" },
  { inputs: [], name: "FundingAlreadyAddedByDifferentSponsor", type: "error" },
  {
    inputs: [
      { internalType: "uint256", name: "availableFunding", type: "uint256" },
    ],
    name: "InsufficientFunding",
    type: "error",
  },
  { inputs: [], name: "NotAuthorized", type: "error" },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "token", type: "address" }],
    name: "SafeERC20FailedOperation",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "bool", name: "isActive", type: "bool" },
    ],
    name: "FactorySetActive",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sponsor",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "deployer",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "beneficiary",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "admin",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "FundingAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sponsor",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "deployer",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "beneficiary",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "admin",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "FundingRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "orchestrator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "issuanceToken",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "beneficiary",
        type: "address",
      },
    ],
    name: "PIMWorkflowCreated",
    type: "event",
  },
  {
    inputs: [
      { internalType: "address", name: "deployer", type: "address" },
      { internalType: "address", name: "beneficiary", type: "address" },
      { internalType: "address", name: "admin", type: "address" },
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "addFunding",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "bool", name: "independentUpdates", type: "bool" },
          {
            internalType: "address",
            name: "independentUpdateAdmin",
            type: "address",
          },
        ],
        internalType: "struct IOrchestratorFactory_v1.WorkflowConfig",
        name: "workflowConfig",
        type: "tuple",
      },
      {
        components: [
          {
            components: [
              {
                internalType: "uint256",
                name: "majorVersion",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "minorVersion",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "patchVersion",
                type: "uint256",
              },
              { internalType: "string", name: "url", type: "string" },
              { internalType: "string", name: "title", type: "string" },
            ],
            internalType: "struct IModule_v1.Metadata",
            name: "metadata",
            type: "tuple",
          },
          { internalType: "bytes", name: "configData", type: "bytes" },
        ],
        internalType: "struct IOrchestratorFactory_v1.ModuleConfig",
        name: "fundingManagerConfig",
        type: "tuple",
      },
      {
        components: [
          {
            components: [
              {
                internalType: "uint256",
                name: "majorVersion",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "minorVersion",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "patchVersion",
                type: "uint256",
              },
              { internalType: "string", name: "url", type: "string" },
              { internalType: "string", name: "title", type: "string" },
            ],
            internalType: "struct IModule_v1.Metadata",
            name: "metadata",
            type: "tuple",
          },
          { internalType: "bytes", name: "configData", type: "bytes" },
        ],
        internalType: "struct IOrchestratorFactory_v1.ModuleConfig",
        name: "authorizerConfig",
        type: "tuple",
      },
      {
        components: [
          {
            components: [
              {
                internalType: "uint256",
                name: "majorVersion",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "minorVersion",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "patchVersion",
                type: "uint256",
              },
              { internalType: "string", name: "url", type: "string" },
              { internalType: "string", name: "title", type: "string" },
            ],
            internalType: "struct IModule_v1.Metadata",
            name: "metadata",
            type: "tuple",
          },
          { internalType: "bytes", name: "configData", type: "bytes" },
        ],
        internalType: "struct IOrchestratorFactory_v1.ModuleConfig",
        name: "paymentProcessorConfig",
        type: "tuple",
      },
      {
        components: [
          {
            components: [
              {
                internalType: "uint256",
                name: "majorVersion",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "minorVersion",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "patchVersion",
                type: "uint256",
              },
              { internalType: "string", name: "url", type: "string" },
              { internalType: "string", name: "title", type: "string" },
            ],
            internalType: "struct IModule_v1.Metadata",
            name: "metadata",
            type: "tuple",
          },
          { internalType: "bytes", name: "configData", type: "bytes" },
        ],
        internalType: "struct IOrchestratorFactory_v1.ModuleConfig[]",
        name: "moduleConfigs",
        type: "tuple[]",
      },
      {
        components: [
          { internalType: "string", name: "name", type: "string" },
          { internalType: "string", name: "symbol", type: "string" },
          { internalType: "uint8", name: "decimals", type: "uint8" },
          { internalType: "uint256", name: "maxSupply", type: "uint256" },
        ],
        internalType: "struct IBondingCurveBase_v1.IssuanceToken",
        name: "issuanceTokenParams",
        type: "tuple",
      },
      { internalType: "address", name: "beneficiary", type: "address" },
    ],
    name: "createPIMWorkflow",
    outputs: [
      { internalType: "contract IOrchestrator_v1", name: "", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "deployer", type: "address" },
      { internalType: "address", name: "beneficiary", type: "address" },
      { internalType: "address", name: "admin", type: "address" },
      { internalType: "address", name: "token", type: "address" },
    ],
    name: "getFundingAmount",
    outputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "deployer", type: "address" },
      { internalType: "address", name: "beneficiary", type: "address" },
      { internalType: "address", name: "admin", type: "address" },
      { internalType: "address", name: "token", type: "address" },
      { internalType: "address", name: "sponsor", type: "address" },
    ],
    name: "getFundingSponsorship",
    outputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isActive",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "forwarder", type: "address" }],
    name: "isTrustedForwarder",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "orchestratorFactory",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "bool", name: "_isActive", type: "bool" }],
    name: "setActive",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "trustedForwarder",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "deployer", type: "address" },
      { internalType: "address", name: "beneficiary", type: "address" },
      { internalType: "address", name: "admin", type: "address" },
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "withdrawFunding",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
