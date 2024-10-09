import { ethers } from 'ethers'
import config from "@/config/configuration";

// Safe Contract ABI (only the getOwners function)
const SAFE_ABI = [
    {
        "constant": true,
        "inputs": [],
        "name": "getOwners",
        "outputs": [
            {
                "name": "",
                "type": "address[]"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
]

export async function isSafeOwner(safeAddress: string, ownerAddress?: string): Promise<boolean | string> {
    if(!ownerAddress) {
        return 'Owner address is not provided'
    }
    const provider = new ethers.JsonRpcProvider(config.PROVIDER_URL)

    try {
        const safeContract = new ethers.Contract(safeAddress, SAFE_ABI, provider)

        const owners = await safeContract.getOwners()

        return owners.some((addr: string) => addr.toLowerCase() === ownerAddress.toLowerCase()) ?
            true : 'The address provided is not owner of this safe';
    } catch (error) {
        // If the function throws, it's not a Safe
        return 'Not a safe address'
    }
}
