"use server";

import { getMongoDB } from "@/lib/db";
import { Collection, Db } from "mongodb";

export async function tokenExist(param: { userAddress: string }) {
  const { userAddress } = param;

  const db: Db = await getMongoDB();
  const projectCollection: Collection = db.collection("project");

  // Find a document where the `abc` field exists and is not empty/null for the given user address
  const project = await projectCollection.findOne({
    userAddress: userAddress.toLowerCase(),
  });

  return project;
}
