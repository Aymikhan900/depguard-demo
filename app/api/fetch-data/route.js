import { NextResponse } from "next/server";
import axios from "axios";

// DELIBERATELY VULNERABLE — for DepGuard demo only
// SSRF via axios:
// - This endpoint accepts a user-controlled `url` query parameter.
// - It performs an outbound request to that URL from the server.
// - There is no allowlist/denylist of hosts, schemes, ports, or internal IP ranges.
// - An attacker may use this to reach internal services (SSRF), cloud metadata endpoints, or internal admin UIs.
export async function GET(request) {
  const urlObj = new URL(request.url);
  const url = urlObj.searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "Missing required query parameter `url`." }, { status: 400 });
  }

  try {
    // Intentionally unsafe: no restrictions on destination.
    const response = await axios.get(url, {
      timeout: 5000,
      maxRedirects: 3,
      // Keep going for non-2xx responses so callers can observe behavior.
      validateStatus: () => true,
    });

    // Avoid returning unlimited data; still SSRF remains the core vulnerability.
    const data =
      typeof response.data === "string" ? response.data.slice(0, 5000) : response.data;

    return NextResponse.json({
      fetchedUrl: url,
      status: response.status,
      data,
    });
  } catch (err) {
    return NextResponse.json(
      {
        error: "Request failed.",
        details: err?.message ?? String(err),
      },
      { status: 500 }
    );
  }
}

