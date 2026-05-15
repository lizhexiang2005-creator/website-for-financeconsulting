import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "明鉴",
  description: "输入股票代码，生成公司基本面分析报告。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
