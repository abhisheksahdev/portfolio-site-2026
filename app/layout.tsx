import type { Metadata } from "next";
import { DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Links } from "./ui/nav-links";

const DMSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const DMMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["500"],
});

export const metadata: Metadata = {
  title: "Abhishek",
  description: "Freelance Engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${DMSans.variable} ${DMMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Links />
        {children}
      </body>
    </html>
  );
}
