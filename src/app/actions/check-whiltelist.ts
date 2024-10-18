"use server";

import { getMongoDB } from "@/lib/db";
import { Address } from "viem";
import { Db } from "mongodb";

export type AddressWhitelist = {
  deployerEOA: Address;
  fundingPotMultisig: Address;
  projectMultisig: Address;
  nftImageURI: string;
};

export async function checkWhitelist(
  deployerAddress?: Address
): Promise<AddressWhitelist | null> {
  if (!deployerAddress) {
    return null;
  }
  const db: Db = await getMongoDB();
  const result = await db
    .collection<AddressWhitelist>("addressWhitelist")
    .findOne({
      deployerEOA: {
        $regex: new RegExp(`^${deployerAddress}$`, "i"),
      },
    });

  return result
    ? {
        deployerEOA: result.deployerEOA,
        fundingPotMultisig: result.fundingPotMultisig,
        projectMultisig: result.projectMultisig,
        nftImageURI: result.nftImageURI,
      }
    : null;
}
