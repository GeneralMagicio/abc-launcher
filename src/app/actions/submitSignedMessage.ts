"use server";

import { getMongoDB } from "@/lib/db";
import { Db } from "mongodb";
import { Address, recoverMessageAddress } from "viem";

async function isSignatureValid({
  message,
  userAddress,
  signature,
}: {
  message: string;
  userAddress: Address;
  signature: `0x${string}`;
}): Promise<boolean> {
  try {
    const recoveredAddress = await recoverMessageAddress({
      message,
      signature: signature,
    });

    console.log("Signature Recovered Address: ", recoveredAddress);
    console.log("Claimed Address: ", userAddress);
    return (
      userAddress.toLocaleLowerCase() === recoveredAddress.toLocaleLowerCase()
    );
  } catch {
    return false;
  }
}

export async function submitSignedMessage({
  message,
  userAddress,
  signature,
  type,
}: {
  message: string;
  userAddress: Address;
  signature: `0x${string}`;
  type: string;
}) {
  if (!(await isSignatureValid({ message, userAddress, signature }))) {
    throw new Error("Failed to verify signature");
  }

  // Submit signed message to server
  console.log("Submitting signed message to server...");
  const db: Db = await getMongoDB();
  const response = await db.collection("signedMessage").insertOne({
    message,
    userAddress: userAddress.toLocaleLowerCase(),
    signature,
    type,
    submitTime: new Date().toISOString(),
  });

  if (!response.acknowledged) {
    throw new Error("Failed to insert data");
  }

  return response.insertedId.toString();
}
