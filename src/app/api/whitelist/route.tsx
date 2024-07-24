// app/api/launch/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { address } = await request.json();

  // Perform your logic here, e.g., save the address to a database or process it as needed
  console.log("Received address:", address);

  // For this example, we'll just return the received address
  return NextResponse.json({
    isWhiteListed: true,
    message: "Address received",
    address,
  });
}
