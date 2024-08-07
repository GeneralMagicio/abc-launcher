"use server";

export async function addProject(
  tokenName: string,
  tokenTicker: string,
  iconHash: string,
  projectAddress: string,
  transactionHash: string,
  orchestratorAddress: string
) {
  // Add project to database
  console.log("Adding token to database...");
  const response = await fetch(`${process.env.MONGODB_URL}/action/insertOne`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": process.env.MONGODB_API_KEY || "",
    },
    body: JSON.stringify({
      dataSource: process.env.MONGO_DATA_SOURCE || "giveth",
      database: "abc-launcher",
      collection: "project",
      document: {
        tokenName,
        tokenTicker,
        iconHash,
        projectAddress,
        transactionHash,
        orchestratorAddress,
      },
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to insert data");
  }

  return await response.json();
}
