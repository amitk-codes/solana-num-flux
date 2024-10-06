"use client";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/app/Layouts/Header";
import ConnectWalletProvider from "@/app/Layouts/Header/ConnectWalletProvider";
import { SolanaAppProvider } from "./Providers/SolanaAppProvider";

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
      >
        <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
          <ConnectWalletProvider>
            <SolanaAppProvider>
              <Header />
              {children}
            </SolanaAppProvider>
          </ConnectWalletProvider>
        </div>
      </body>
    </html>
  );
}
