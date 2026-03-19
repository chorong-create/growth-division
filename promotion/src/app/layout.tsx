import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const pretendard = localFont({
  src: [
    {
      path: "../fonts/PretendardVariable.woff2",
      style: "normal",
    },
  ],
  variable: "--font-pretendard",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://promotion-gray.vercel.app"),
  title: "리스닝마인드 비즈니스 액셀러레이터 | 3월 한정 프로모션",
  description:
    "지금 해결해야 할 비즈니스 과제에 맞춰, 리스닝마인드와 함께 3개월간 성과를 만들어가는 프로그램",
  keywords: [
    "리스닝마인드",
    "ListeningMind",
    "허블",
    "검색 데이터",
    "마케팅 전략",
    "CEP",
    "패스파인더",
    "클러스터파인더",
  ],
  openGraph: {
    title: "리스닝마인드 비즈니스 액셀러레이터 | 3월 한정 프로모션",
    description:
      "지금 해결해야 할 비즈니스 과제에 맞춰, 리스닝마인드와 함께 3개월간 성과를 만들어가는 프로그램",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${pretendard.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
