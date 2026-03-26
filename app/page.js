import Link from "next/link";

export default function HomePage() {
  // This demo app intentionally contains vulnerabilities so DepGuard can detect them.
  // Do NOT use any of these patterns in production.

  const endpoints = [
    {
      label: "POST /api/merge-config",
      description:
        "Demonstrates prototype pollution via lodash.merge. A malicious `userConfig` can be merged using __proto__ keys.",
      example:
        "/api/merge-config (POST) with JSON body: {\"userConfig\":{\"__proto__\":{\"polluted\":\"yes\"}}}",
      note:
        "Danger: prototype pollution can affect application logic globally (including logic outside the request scope).",
    },
    {
      label: "GET /api/fetch-data?url=...",
      description:
        "Demonstrates SSRF via axios. The server fetches any URL you provide without restricting internal networks or protocols.",
      example:
        "/api/fetch-data?url=https://example.com (try a safe URL first)",
      note:
        "Danger: SSRF can let an attacker access internal services (e.g., metadata endpoints) or reach internal-only hosts.",
    },
    {
      label: "GET /api/safe-endpoint",
      description:
        "A safe baseline endpoint. It returns a fixed message and does not perform dangerous operations (no merges, no outbound fetching).",
      example: "/api/safe-endpoint",
      note:
        "Expected: DepGuard should treat this as safe (or at least not flag the vulnerabilities from the other endpoints).",
    },
    {
      label: "lib/unused-library.js",
      description:
        "Level 0 evidence example. Lodash is imported but not called (intentionally unused) to show how DepGuard handles low-evidence patterns.",
      example: "Imported lodash, exports {}",
      note:
        "Expected: DepGuard may report low-confidence evidence, but there is no actual vulnerable data flow here.",
    },
  ];

  return (
    <main style={{ padding: 24, fontFamily: "system-ui, sans-serif" }}>
      <h1>DepGuard Vulnerable Demo App</h1>
      <p>
        This is a deliberately vulnerable Next.js app used to demonstrate how a vulnerability detection tool
        (DepGuard) can identify risky patterns.
      </p>
      <p>
        All vulnerabilities below are intentional and include comments in the corresponding files explaining why
        each issue is dangerous.
      </p>

      <h2>Endpoints & What They Demonstrate</h2>
      <ul>
        {endpoints.map((e) => (
          <li key={e.label} style={{ marginBottom: 16 }}>
            <strong>{e.label}</strong>
            <div>{e.description}</div>
            <div style={{ marginTop: 6 }}>
              <code>{e.example}</code>
            </div>
            <div style={{ marginTop: 6 }}>{e.note}</div>
          </li>
        ))}
      </ul>

      <h2>Quick Links</h2>
      <ul>
        <li>
          <Link href="/api/safe-endpoint">/api/safe-endpoint</Link>
        </li>
        <li>
          <Link href="/api/fetch-data?url=https://example.com">/api/fetch-data?url=https://example.com</Link>
        </li>
        <li>
          <span style={{ color: "#666" }}>
            POST /api/merge-config requires a JSON body (see example above).
          </span>
        </li>
      </ul>
    </main>
  );
}

