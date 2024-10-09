import { Abi, Address, isAddress } from "viem";
import { readContract } from "wagmi/actions";
import { wagmiConfig } from "@/config/wagmi";

// Safe Contract ABI (only the getOwners function)
const SAFE_ABI = [
  {
    constant: true,
    inputs: [],
    name: "getOwners",
    outputs: [
      {
        name: "",
        type: "address[]",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
] as Abi;

export async function isSafeOwner(
  safeAddress: Address,
  ownerAddress?: Address
): Promise<boolean | string> {
  if (!ownerAddress) {
    return "Owner address is not provided";
  }
  try {
    const owners = (await readContract(wagmiConfig, {
      abi: SAFE_ABI,
      address: safeAddress,
      functionName: "getOwners",
    })) as Address[];

    return owners.some(
      (addr: string) => addr.toLowerCase() === ownerAddress.toLowerCase()
    );
  } catch (error) {
    // If the function throws, it's not a Safe
    console.log("error", error);
    return "Not a safe address";
  }
}
