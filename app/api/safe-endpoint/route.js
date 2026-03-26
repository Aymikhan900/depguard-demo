import { NextResponse } from "next/server";

// Safe baseline endpoint for DepGuard:
// - Does not perform outbound network requests.
// - Does not merge attacker-controlled objects into server state.
// - Does not use risky libraries/patterns used by the vulnerable endpoints.
export async function GET() {
  return NextResponse.json({ message: "Hello world" });
}

