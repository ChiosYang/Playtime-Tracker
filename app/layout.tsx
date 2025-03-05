import type { Metadata } from "next";
import Navigation from "../components/header/navigation";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Playtime Tracker",
  description: "追踪您在 Steam 和 PSN 上的游戏时间",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body className={inter.className}>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
