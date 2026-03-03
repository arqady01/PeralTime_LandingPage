import type { Metadata } from "next";
import { Inter, Noto_Sans_SC } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoSansSc = Noto_Sans_SC({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PeralTime | 智能排班协作系统",
  description:
    "PeralTime 是一款面向轮班与团队协作场景的智能排班应用，把排班管理、团队协同、数据洞察、AI 助手整合到一个移动端体验里。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${inter.variable} ${notoSansSc.variable} text-[#1a1a1a] antialiased selection:bg-amber-200/50 selection:text-neutral-900 leading-relaxed`}
      >
        {children}
      </body>
    </html>
  );
}
