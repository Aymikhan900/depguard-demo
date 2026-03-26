// Minimal Next.js App Router layout.
// This file intentionally contains no security-sensitive logic and is not part of the vulnerable demo.
export const metadata = {
  title: "DepGuard Demo (Deliberately Vulnerable)",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

