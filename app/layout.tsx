import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "Coway Bay Area | Premium Air & Water Purifiers | 湾区Coway净水器空气净化器",
  description:
    "Official Coway distributor serving San Francisco Bay Area. Premium air purifiers, water purifiers, and smart bidets. Rental & purchase options available. Free delivery & installation. 旧金山湾区Coway授权经销商，提供空气净化器、净水器和智能马桶盖租赁及购买服务。",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Analytics />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
