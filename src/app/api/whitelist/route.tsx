// app/api/launch/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { address } = await request.json();

  // Perform your logic here, e.g., save the address to a database or process it as needed
  console.log("Received address:", address);

  let isWhiteListed = true;
  // Check if the address is whitelisted
  if (
    address.toLowerCase() ===
    "0x8F48094a12c8F99d616AE8F3305D5eC73cBAA6b6".toLowerCase()
  ) {
    isWhiteListed = true;
  }

  // For this example, we'll just return the received address
  return NextResponse.json({
    isWhiteListed,
    message: "Address received",
    address,
  });
}
