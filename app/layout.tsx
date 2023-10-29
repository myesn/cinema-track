import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import { Providers } from "./providers";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// https://nextjs.org/docs/app/api-reference/functions/generate-metadata
export const metadata: Metadata = {
  title: "cinema records",
  description: "myEsn2E9's cinema records",
  // 非常重要，不设置会导致出现横向滚动条
  viewport: {
    width: "device-width",
    minimumScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
