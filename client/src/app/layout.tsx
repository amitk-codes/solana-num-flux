"use client";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/Layouts/Header";
import ConnectWalletProvider from "@/Layouts/Header/ConnectWalletProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
          <ConnectWalletProvider>
            <Header />
            {children}
          </ConnectWalletProvider>
        </div>
      </body>
    </html>
  );
}
