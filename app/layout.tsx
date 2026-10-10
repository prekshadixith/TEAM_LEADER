import type { Metadata } from "next";
import "./globals.css";
import { PortalProvider } from "@/context/PortalContext";
import ClientShell from "@/components/layout/ClientShell";

export const metadata: Metadata = {
  title: "VICEVERSE // ADVANCED TEAM LEADER PORTAL",
  description: "Advanced Team Leader Control Deck for ViceVerse Ideathon - IVC Club, VVCE.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500;600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body style={{ background: "#060811" }}>
        <PortalProvider>
          <ClientShell>{children}</ClientShell>
        </PortalProvider>
      </body>
    </html>
  );
}