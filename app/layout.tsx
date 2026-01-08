import { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { RootProvider } from "fumadocs-ui/provider/next";
import type { ReactNode } from "react";
import "./globals.css";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: {
    template: "%s | Dragonfly",
    default: "Dragonfly",
  },
  description: "High-performance Minecraft Bedrock Edition server written in Go",
};

export const baseOptions = {
  nav: {
    enabled: true,
    transparentMode: "top" as const,
    title: "Dragonfly",
  },
};


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} bg-background font-sans relative antialiased`}
      >
        <RootProvider
          theme={{
            defaultTheme: "dark",
          }}
          search={{
            enabled: true,
          }}
        >
          <Navbar />
          {children}
        </RootProvider>
      </body>
    </html>
  );
}