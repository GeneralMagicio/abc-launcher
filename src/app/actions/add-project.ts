"use server";

import { getMongoDB } from "@/lib/db";
import { Collection, Db } from "mongodb";

export async function addProject(param: {
  tokenName: string;
  tokenTicker: string;
  iconHash: string;
  projectAddress: string;
  transactionHash: string;
  orchestratorAddress: string;
  userAddress: string;
  fundingManagerAddress: string;
  issuanceTokenAddress: string;
  nftContractAddress: string;
  chainId: number;
  policyAcceptTime: Date;
}) {
  const {
    tokenName,
    tokenTicker,
    iconHash,
    projectAddress,
    transactionHash,
    orchestratorAddress,
    userAddress,
    issuanceTokenAddress,
    fundingManagerAddress,
    nftContractAddress,
    chainId,
    policyAcceptTime,
  } = param;
  // Add project to database
  console.log("Adding project to database...");

  const db: Db = await getMongoDB();
  const projectCollection: Collection = db.collection("project");
  const response = await projectCollection.insertOne({
    tokenName,
    tokenTicker,
    iconHash,
    projectAddress: projectAddress.toLocaleLowerCase(),
    transactionHash: transactionHash.toLocaleLowerCase(),
    orchestratorAddress: orchestratorAddress.toLocaleLowerCase(),
    userAddress: userAddress.toLocaleLowerCase(),
    issuanceTokenAddress: issuanceTokenAddress.toLocaleLowerCase(),
    fundingManagerAddress: fundingManagerAddress.toLocaleLowerCase(),
    nftContractAddress: nftContractAddress.toLocaleLowerCase(),
    chainId,
    policyAcceptTime: policyAcceptTime.toISOString(),
  });
  if (!response?.acknowledged) {
    throw new Error("Failed to insert project data");
  }

  return {
    insertedId: response.insertedId.toString(),
  };
}
