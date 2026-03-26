import { NextResponse } from "next/server";
import merge from "lodash/merge";

// DELIBERATELY VULNERABLE — for DepGuard demo only
// Prototype pollution via lodash.merge:
// - This handler merges attacker-controlled JSON (`userConfig`) into a server-side object.
// - lodash.merge can treat special keys like `__proto__` / `constructor.prototype` as object-paths.
// - If the attacker supplies those keys, it may pollute Object.prototype (or the merged object's prototype chain),
//   affecting application behavior beyond this request.
export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const userConfig = body?.userConfig;

  if (typeof userConfig !== "object" || userConfig === null) {
    return NextResponse.json(
      { error: "Expected JSON body with an object field `userConfig`." },
      { status: 400 }
    );
  }

  // Server config object that should be trusted, but we intentionally merge into it unsafely.
  const serverConfig = {
    featureFlags: {
      betaAccess: false,
    },
    userRole: "guest",
  };

  // Intentionally vulnerable merge: no validation/allowlist and no removal of dangerous keys.
  merge(serverConfig, userConfig);

  return NextResponse.json({
    ok: true,
    config: serverConfig,
  });
}

