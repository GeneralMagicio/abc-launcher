import { AbiItem } from "viem";

export const abi: AbiItem[] = [
  {
    inputs: [
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "symbol", type: "string" },
      { internalType: "address", name: "initialOwner", type: "address" },
      { internalType: "string", name: "baseURI", type: "string" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      { internalType: "address", name: "sender", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "address", name: "owner", type: "address" },
    ],
    name: "ERC721IncorrectOwner",
    type: "error",
  },
  {
    inputs: [
      { internalType: "address", name: "operator", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "ERC721InsufficientApproval",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "approver", type: "address" }],
    name: "ERC721InvalidApprover",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "operator", type: "address" }],
    name: "ERC721InvalidOperator",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "ERC721InvalidOwner",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "receiver", type: "address" }],
    name: "ERC721InvalidReceiver",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "sender", type: "address" }],
    name: "ERC721InvalidSender",
    type: "error",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "ERC721NonexistentToken",
    type: "error",
  },
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
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
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
        name: "operator",
        type: "address",
      },
      { indexed: false, internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "ApprovalForAll",
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
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "currentTokenId",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "getApproved",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "operator", type: "address" },
    ],
    name: "isApprovedForAll",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "to", type: "address" }],
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
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "ownerOf",
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
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "bytes", name: "data", type: "bytes" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "operator", type: "address" },
      { internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "baseURI", type: "string" }],
    name: "setBaseURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
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
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "transferFrom",
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
];

export const bytecode =
  "0x608060405234801561001057600080fd5b506040516114cb3803806114cb83398101604081905261002f916101b8565b818484600061003e83826102f6565b50600161004b82826102f6565b5050506001600160a01b03811661007c57604051631e4fbdf760e01b81526000600482015260240160405180910390fd5b6100858161009d565b506001600755610094816100ef565b505050506103b4565b600680546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b60086100fb82826102f6565b5050565b634e487b7160e01b600052604160045260246000fd5b600082601f83011261012657600080fd5b81516001600160401b0381111561013f5761013f6100ff565b604051601f8201601f19908116603f011681016001600160401b038111828210171561016d5761016d6100ff565b60405281815283820160200185101561018557600080fd5b60005b828110156101a457602081860181015183830182015201610188565b506000918101602001919091529392505050565b600080600080608085870312156101ce57600080fd5b84516001600160401b038111156101e457600080fd5b6101f087828801610115565b602087015190955090506001600160401b0381111561020e57600080fd5b61021a87828801610115565b604087015190945090506001600160a01b038116811461023957600080fd5b60608601519092506001600160401b0381111561025557600080fd5b61026187828801610115565b91505092959194509250565b600181811c9082168061028157607f821691505b6020821081036102a157634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156102f157806000526020600020601f840160051c810160208510156102ce5750805b601f840160051c820191505b818110156102ee57600081556001016102da565b50505b505050565b81516001600160401b0381111561030f5761030f6100ff565b6103238161031d845461026d565b846102a7565b6020601f821160018114610357576000831561033f5750848201515b600019600385901b1c1916600184901b1784556102ee565b600084815260208120601f198516915b828110156103875787850151825560209485019460019092019101610367565b50848210156103a55786840151600019600387901b60f8161c191681555b50505050600190811b01905550565b611108806103c36000396000f3fe608060405234801561001057600080fd5b50600436106101205760003560e01c80636a627842116100ad578063a22cb46511610071578063a22cb4651461024b578063b88d4fde1461025e578063c87b56dd14610271578063e985e9c514610284578063f2fde38b1461029757600080fd5b80636a6278421461020457806370a0823114610217578063715018a61461022a5780638da5cb5b1461023257806395d89b411461024357600080fd5b8063095ea7b3116100f4578063095ea7b3146101a357806323b872dd146101b857806342842e0e146101cb57806355f804b3146101de5780636352211e146101f157600080fd5b80629a9b7b1461012557806301ffc9a71461014057806306fdde0314610163578063081812fc14610178575b600080fd5b61012d6102aa565b6040519081526020015b60405180910390f35b61015361014e366004610bfe565b6102c0565b6040519015158152602001610137565b61016b610312565b6040516101379190610c68565b61018b610186366004610c7b565b6103a4565b6040516001600160a01b039091168152602001610137565b6101b66101b1366004610cb0565b6103cd565b005b6101b66101c6366004610cda565b6103dc565b6101b66101d9366004610cda565b61046c565b6101b66101ec366004610da7565b61048c565b61018b6101ff366004610c7b565b6104a0565b6101b6610212366004610df0565b6104ab565b61012d610225366004610df0565b6104d7565b6101b661051f565b6006546001600160a01b031661018b565b61016b610533565b6101b6610259366004610e0b565b610542565b6101b661026c366004610e47565b61054d565b61016b61027f366004610c7b565b610564565b610153610292366004610ec3565b610578565b6101b66102a5366004610df0565b6105a6565b600060016007546102bb9190610f0c565b905090565b60006001600160e01b031982166380ac58cd60e01b14806102f157506001600160e01b03198216635b5e139f60e01b145b8061030c57506301ffc9a760e01b6001600160e01b03198316145b92915050565b60606000805461032190610f1f565b80601f016020809104026020016040519081016040528092919081815260200182805461034d90610f1f565b801561039a5780601f1061036f5761010080835404028352916020019161039a565b820191906000526020600020905b81548152906001019060200180831161037d57829003601f168201915b5050505050905090565b60006103af826105e1565b506000828152600460205260409020546001600160a01b031661030c565b6103d882823361061a565b5050565b6001600160a01b03821661040b57604051633250574960e11b8152600060048201526024015b60405180910390fd5b6000610418838333610627565b9050836001600160a01b0316816001600160a01b031614610466576040516364283d7b60e01b81526001600160a01b0380861660048301526024820184905282166044820152606401610402565b50505050565b6104878383836040518060200160405280600081525061054d565b505050565b610494610720565b61049d8161074d565b50565b600061030c826105e1565b6104b3610720565b6104bf81600754610759565b600780549060006104cf83610f59565b919050555050565b60006001600160a01b038216610503576040516322718ad960e21b815260006004820152602401610402565b506001600160a01b031660009081526003602052604090205490565b610527610720565b6105316000610773565b565b60606001805461032190610f1f565b6103d83383836107c5565b6105588484846103dc565b61046684848484610864565b606061056f826105e1565b5061030c61098d565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b6105ae610720565b6001600160a01b0381166105d857604051631e4fbdf760e01b815260006004820152602401610402565b61049d81610773565b6000818152600260205260408120546001600160a01b03168061030c57604051637e27328960e01b815260048101849052602401610402565b610487838383600161099c565b6000828152600260205260408120546001600160a01b039081169083161561065457610654818486610aa2565b6001600160a01b038116156106925761067160008560008061099c565b6001600160a01b038116600090815260036020526040902080546000190190555b6001600160a01b038516156106c1576001600160a01b0385166000908152600360205260409020805460010190555b60008481526002602052604080822080546001600160a01b0319166001600160a01b0389811691821790925591518793918516917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4949350505050565b6006546001600160a01b031633146105315760405163118cdaa760e01b8152336004820152602401610402565b60086103d88282610fb9565b6103d8828260405180602001604052806000815250610b06565b600680546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6001600160a01b0382166107f757604051630b61174360e31b81526001600160a01b0383166004820152602401610402565b6001600160a01b03838116600081815260056020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b6001600160a01b0383163b1561046657604051630a85bd0160e11b81526001600160a01b0384169063150b7a02906108a6903390889087908790600401611078565b6020604051808303816000875af19250505080156108e1575060408051601f3d908101601f191682019092526108de918101906110b5565b60015b61094a573d80801561090f576040519150601f19603f3d011682016040523d82523d6000602084013e610914565b606091505b50805160000361094257604051633250574960e11b81526001600160a01b0385166004820152602401610402565b805181602001fd5b6001600160e01b03198116630a85bd0160e11b1461098657604051633250574960e11b81526001600160a01b0385166004820152602401610402565b5050505050565b60606008805461032190610f1f565b80806109b057506001600160a01b03821615155b15610a725760006109c0846105e1565b90506001600160a01b038316158015906109ec5750826001600160a01b0316816001600160a01b031614155b80156109ff57506109fd8184610578565b155b15610a285760405163a9fbf51f60e01b81526001600160a01b0384166004820152602401610402565b8115610a705783856001600160a01b0316826001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45b505b5050600090815260046020526040902080546001600160a01b0319166001600160a01b0392909216919091179055565b610aad838383610b1d565b610487576001600160a01b038316610adb57604051637e27328960e01b815260048101829052602401610402565b60405163177e802f60e01b81526001600160a01b038316600482015260248101829052604401610402565b610b108383610b83565b6104876000848484610864565b60006001600160a01b03831615801590610b7b5750826001600160a01b0316846001600160a01b03161480610b575750610b578484610578565b80610b7b57506000828152600460205260409020546001600160a01b038481169116145b949350505050565b6001600160a01b038216610bad57604051633250574960e11b815260006004820152602401610402565b6000610bbb83836000610627565b90506001600160a01b03811615610487576040516339e3563760e11b815260006004820152602401610402565b6001600160e01b03198116811461049d57600080fd5b600060208284031215610c1057600080fd5b8135610c1b81610be8565b9392505050565b6000815180845260005b81811015610c4857602081850181015186830182015201610c2c565b506000602082860101526020601f19601f83011685010191505092915050565b602081526000610c1b6020830184610c22565b600060208284031215610c8d57600080fd5b5035919050565b80356001600160a01b0381168114610cab57600080fd5b919050565b60008060408385031215610cc357600080fd5b610ccc83610c94565b946020939093013593505050565b600080600060608486031215610cef57600080fd5b610cf884610c94565b9250610d0660208501610c94565b929592945050506040919091013590565b634e487b7160e01b600052604160045260246000fd5b60008067ffffffffffffffff841115610d4857610d48610d17565b50604051601f19601f85018116603f0116810181811067ffffffffffffffff82111715610d7757610d77610d17565b604052838152905080828401851015610d8f57600080fd5b83836020830137600060208583010152509392505050565b600060208284031215610db957600080fd5b813567ffffffffffffffff811115610dd057600080fd5b8201601f81018413610de157600080fd5b610b7b84823560208401610d2d565b600060208284031215610e0257600080fd5b610c1b82610c94565b60008060408385031215610e1e57600080fd5b610e2783610c94565b915060208301358015158114610e3c57600080fd5b809150509250929050565b60008060008060808587031215610e5d57600080fd5b610e6685610c94565b9350610e7460208601610c94565b925060408501359150606085013567ffffffffffffffff811115610e9757600080fd5b8501601f81018713610ea857600080fd5b610eb787823560208401610d2d565b91505092959194509250565b60008060408385031215610ed657600080fd5b610edf83610c94565b9150610eed60208401610c94565b90509250929050565b634e487b7160e01b600052601160045260246000fd5b8181038181111561030c5761030c610ef6565b600181811c90821680610f3357607f821691505b602082108103610f5357634e487b7160e01b600052602260045260246000fd5b50919050565b600060018201610f6b57610f6b610ef6565b5060010190565b601f82111561048757806000526020600020601f840160051c81016020851015610f995750805b601f840160051c820191505b818110156109865760008155600101610fa5565b815167ffffffffffffffff811115610fd357610fd3610d17565b610fe781610fe18454610f1f565b84610f72565b6020601f82116001811461101b57600083156110035750848201515b600019600385901b1c1916600184901b178455610986565b600084815260208120601f198516915b8281101561104b578785015182556020948501946001909201910161102b565b50848210156110695786840151600019600387901b60f8161c191681555b50505050600190811b01905550565b6001600160a01b03858116825284166020820152604081018390526080606082018190526000906110ab90830184610c22565b9695505050505050565b6000602082840312156110c757600080fd5b8151610c1b81610be856fea264697066735822122033d5c24a137df1df7ce356eb56103505e12867f599a7f8662eefe2e355534c8464736f6c634300081a0033";
